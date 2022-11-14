/-  *app-store-data, *app-store-action
/+  sig
|%
++  usr  2
::
::
::
++  cur
  |%
  ::  when selecting new cur-choice
  ++  select
    |=  [=cur-data act=[%select =key-list =cat-map]]
    ^-  [?(%changed %unchanged) ^cur-data]
    ?.  ?&
      (cat-map-cat-set:validator cat-map.act cat-set.cur-choice.cur-data)
      (key-list-cat-map:validator key-list.act cat-map.act)
      (key-list-cur-map:validator key-list.act cur-map.cur-data)
    ==
      ~&  "%cur-server: select failed"
      [%unchanged cur-data]
    :-  %changed
    %=  cur-data
      cur-choice  [key-list.act cat-map.act cat-set.cur-choice.cur-data]
    ==
::
  ::  when writing categories
  ++  cats
    |=  [=cur-data act=[%cats =cat-set]]
    ^-  ^cur-data
    ?.  (cat-map-cat-set:validator cat-map.cur-choice.cur-data cat-set.act)
      ~&  "%cur-server: adding categories failed"
      cur-data
    cur-data(cat-set.cur-choice cat-set.act)
::
  ::  when dev adds an app-page, or app-page is changed
  ++  put  
    |=  [=cur-data our=@p now=@da =dev-name dev-update=[?(%add %change) =key =app-page]]
    ^-  [?(%changed %unchanged %deleted) ^cur-data]
    ?.  (new-app-page:validator [dev-name our now key.dev-update app-page.dev-update])
      =^  changed  cur-data  (del [cur-data dev-name [%del key.dev-update]])
      ?:  =(changed %unchanged)  [%unchanged cur-data]
      [%deleted cur-data]
    =/  new-cur-map  (~(put by cur-map.cur-data) key.dev-update app-page.dev-update)
    =/  app-set  (~(get by aux-map.cur-data) dev-name)
    ?~  app-set  
      ~&  "error" 
      [%unchanged cur-data]
    =/  new-app-set  (~(put in u.app-set) app-name.key.dev-update)
    =/  new-aux-map  (~(put by aux-map.cur-data) dev-name new-app-set)
    ?.  ?&
      (cur-map-aux-map:validator new-cur-map new-aux-map)
      (key-list-cur-map:validator key-list.cur-choice.cur-data new-cur-map)
    ==
      ~&  "error: updating cur-data after dev adding/editing an app, failed"
      [%unchanged cur-data]
    :-  %changed
    cur-data(cur-map new-cur-map, aux-map new-aux-map)
::
  ::  receiving intial data from dev
  ::  cur should only use %init when not having dev-data and then adding it
  ::  if cur-receives less data from dev than he already had,
  :: ~(uni by cur-map) doesn't work
  ++  init    
    |=  [=cur-data our=@p now=@da =dev-name dev-update=[%init =dev-data]]
    ^-  ^cur-data
    =/  new-dev-data  (dev-data-init:validator [dev-name dev-data.dev-update our now])
    ?.  (dev-map-app-set:validator dev-map.new-dev-data app-set.new-dev-data)
      ~&  "%cur-server: new dev-map and app-set inconsistent"
      cur-data
    =/  new-aux-map  (~(put by aux-map.cur-data) dev-name app-set.new-dev-data)
    =/  new-cur-map  (~(uni by cur-map.cur-data) `dev-map`dev-map.new-dev-data)
    ?.  (cur-map-aux-map:validator new-cur-map new-aux-map)
      ~&  "%cur-server: receiving data failed"
      cur-data
    [cur-choice.cur-data new-cur-map new-aux-map]
::
  ::  after unsubbing from dev removes dev from cur-choice and cur-map and aux-map
  ++  unsub  
    |=  [=cur-data =dev-name]
    ^-  [?(%changed %unchanged) ^cur-data]
    ?.  (~(has by aux-map.cur-data) dev-name)
      ~&  "%cur-server: already not subscribed to dev"
      [%unchanged cur-data]
    =/  new-aux-map  (~(del by aux-map.cur-data) dev-name)
    =/  new-cur-map  (del-dev-from-cur-map:aux [dev-name cur-map.cur-data aux-map.cur-data])
    =/  new-cur-choice  (del-dev-from-cur-choice:aux [dev-name cur-choice.cur-data aux-map.cur-data])
    ?.  ?&
      (key-list-cat-map:validator key-list.new-cur-choice cat-map.new-cur-choice)
      (key-list-cur-map:validator key-list.new-cur-choice new-cur-map)
      (cur-map-aux-map:validator new-cur-map new-aux-map)
    ==
      ~&  "%cur-server: updating cur-data after unsub, failed"
      [%unchanged cur-data]
    :-  %changed
    [new-cur-choice new-cur-map new-aux-map]
::
  ::  when dev dels an app
  ++  del  
    |=  [=cur-data =dev-name dev-update=[%del =key]]
    ^-  [?(%changed %unchanged) ^cur-data]
    ?.  =(dev-name dev-name.key.dev-update)
      ~&  "error: dev-name and key don't correspond"
      [%unchanged cur-data]
    =/  new-cat-map  (~(del by cat-map.cur-choice.cur-data) key.dev-update)
    =/  new-cur-map  (~(del by cur-map.cur-data) key.dev-update)
    =/  app-set  (~(get by aux-map.cur-data) dev-name)
    ?~  app-set  
      ~&  "error" 
      [%unchanged cur-data]
    =/  new-app-set  (~(del in u.app-set) app-name.key.dev-update)
    =/  new-aux-map  (~(put by aux-map.cur-data) dev-name new-app-set)
    =/  loc  (find [key.dev-update]~ key-list.cur-choice.cur-data)
    ?~  loc  
      ?.  ?&
        (cat-map-cat-set:validator new-cat-map cat-set.cur-choice.cur-data)
        (key-list-cat-map:validator key-list.cur-choice.cur-data new-cat-map)
        (key-list-cur-map:validator key-list.cur-choice.cur-data new-cur-map)
        (cur-map-aux-map:validator new-cur-map new-aux-map)
      ==
        ~&  "error: updating cur-data after dev deleting an app, failed"
        [%unchanged cur-data]
      :^  %changed
      [key-list.cur-choice.cur-data new-cat-map cat-set.cur-choice.cur-data] 
      new-cur-map  new-aux-map
    =/  new-key-list  (oust [u.loc 1] key-list.cur-choice.cur-data)
    ?.  ?&
      (cat-map-cat-set:validator new-cat-map cat-set.cur-choice.cur-data)
      (key-list-cat-map:validator new-key-list new-cat-map)
      (key-list-cur-map:validator new-key-list new-cur-map)
      (cur-map-aux-map:validator new-cur-map new-aux-map)
    ==
      ~&  "error: updating cur-data after dev deleting an app, failed"
      [%unchanged cur-data]
    :-  %changed
    [[new-key-list new-cat-map cat-set.cur-choice.cur-data] new-cur-map new-aux-map]
::
  ++  aux
    |%
    ++  del-dev-from-cur-choice
      |=  [=dev-name =cur-choice =aux-map]
      ^-  ^cur-choice
      =/  apps  ~(tap in (~(got by aux-map) dev-name))
      =/  len  (lent apps)
      =/  n  0
      |-  ?:  =(n len)  cur-choice
        =/  key  [dev-name (snag n apps)]
        =/  loc  (find [key]~ key-list.cur-choice)
        ?~  loc  $(n +(n))
        %=  $
          n  +(n)
          key-list.cur-choice    (oust [u.loc 1] key-list.cur-choice)
          cat-map.cur-choice     (~(del by cat-map.cur-choice) key)   
        ==
    ::
    ++  del-dev-from-cur-map
      |=  [=dev-name =cur-map =aux-map]
      ^-  ^cur-map
      =/  apps  ~(tap in (~(got by aux-map) dev-name))
      =/  len  (lent apps)
      =/  n  0
      |-  ?:  =(n len)  cur-map
      %=  $
        n  +(n)
        cur-map  (~(del by cur-map) [dev-name (snag n apps)])
      ==
    ::
    
    --
  --
::
::
::
++  dev
  |%
  ::  when dev adds an app-page
  ++  add  
    |=  [=dev-name =dev-data act=[%add =app-name =dev-input]]
    ^-  [?(%changed %unchanged) ^dev-data]
    =/  key  `^key`[dev-name app-name.act]    
    ?:  (~(has by dev-map.dev-data) key)  
      ~&  "%dev-server: app-page already exists"
      ~&  "%dev-server: use %edit (not %add) to change existing app-page"
      [%unchanged dev-data]
    =/  new-app-page  :+  
      dev-input.act 
      [[0x0 dev-name 0] 0v0 *docket]
      *usr-input 
    =/  new-dev-map  (~(put by dev-map.dev-data) key new-app-page)
    ?.  (dev-map-keys:validator [dev-name new-dev-map])
      ~&  "%dev-server: updating dev-data failed"
      [%unchanged dev-data]
    =/  new-app-set  (~(put in app-set.dev-data) app-name.act)
    ?.  (dev-map-app-set:validator [new-dev-map new-app-set])
      ~&  "%dev-server: updating dev-data failed"
      [%unchanged dev-data]
    [%changed new-dev-map new-app-set]
  ::
  ::  when dev edits and app-page
  ++  edit  
    |=  [=dev-name =dev-data act=[%edit =app-name =dev-input]]
    ^-  [?(%changed %unchanged) ^dev-data]
    =/  key  `^key`[dev-name app-name.act]    
    ?.  (~(has by dev-map.dev-data) key)  
      ~&  "%dev-server: app-page doesn't exist"
      ~&  "%dev-server: use %add (not %edit) to add new app-page"
      [%unchanged dev-data]   
    =/  app-page  (~(got by dev-map.dev-data) key)  
    =/  new-dev-map  (~(put by dev-map.dev-data) key app-page(dev-input dev-input.act))
    =/  new-app-set  (~(put in app-set.dev-data) app-name.act)
    ?.  (dev-map-app-set:validator [new-dev-map new-app-set])
      ~&  "%dev-server: updating dev-data failed"
      [%unchanged dev-data]
    [%changed new-dev-map new-app-set]
  ::  
  ::  when dev deletes an app-page
  ++  del  
    |=  [=dev-name =dev-data act=[%del =app-name]]
    ^-  [?(%changed %unchanged) ^dev-data]
    =/  key  `^key`[dev-name app-name.act] 
    ?.  (~(has in app-set.dev-data) app-name.act)  
      ~&  "%dev-server: app-page does not exist"
      [%unchanged dev-data]         
    =/  new-dev-map  (~(del by dev-map.dev-data) key)
    =/  new-app-set  (~(del in app-set.dev-data) app-name.act)
    ?.  (dev-map-app-set:validator [new-dev-map new-app-set])
      ~&  "%dev-server: updating dev-data failed"
      [%unchanged dev-data]
    [%changed new-dev-map new-app-set]
  ::
  ::  when dev receives a signature from %dst-server
  ++  sign
    |=  [=dev-data dst-ship=@p act=[%sig =key =signature]]
    ^-  [?(%changed %unchanged) ^app-page ^dev-data]
    ?.  (~(has in app-set.dev-data) app-name.key.act)  
      ~&  "%dev-server: app-page does not exist"
      [%unchanged *app-page dev-data]  
    =/  app-page  (need (~(get by dev-map.dev-data) key.act))
    =/  dst-desk  (parse-dst-desk dst-desk.dev-input.app-page)
    ?.  ?&  
      -.dst-desk
      =(dst-name.+.dst-desk q.signature.act)
      =(dst-name.+.dst-desk dst-ship)
    == 
      ~&  "%dev-server: bad distributor ship or signature or desk"
      [%unchanged app-page dev-data]
    =/  new-app-page  app-page(signature.dst-input signature.act)
    =/  new-dev-map
      (~(put by dev-map.dev-data) key.act new-app-page)
    [%changed new-app-page dev-data(dev-map new-dev-map)]
  ::
  ::  when dev receives docket data + hash from %dst-server
  ++  data
    |=  [=dev-data dst-ship=@p act=[%data =key =docket hash=@uvI]]
    ^-  [?(%changed %unchanged) ^app-page ^dev-data]
    ?.  (~(has in app-set.dev-data) app-name.key.act)  
      ~&  "%dev-server: app-page does not exist"
      [%unchanged *app-page dev-data]  
    =/  app-page  (need (~(get by dev-map.dev-data) key.act))
    =/  dst-desk  (parse-dst-desk dst-desk.dev-input.app-page)
    ?.  &(=(dst-name.+.dst-desk dst-ship) -.dst-desk)
      ~&  "%dev-server: bad distributor ship or desk"
      [%unchanged app-page dev-data]   
    =/  new-reviews  %-  ~(run by reviews.usr-input.app-page)
      |=(=review review(is-current =(hash.act desk-hash.dst-input.app-page)))
    =/  new-app-page  
      %=  app-page
        docket.dst-input  docket.act
        desk-hash.dst-input  hash.act
        reviews.usr-input  new-reviews
      ==     
    =/  new-dev-map  (~(put by dev-map.dev-data) key.act new-app-page)
    [%changed new-app-page dev-data(dev-map new-dev-map)]
  ::
  ::  when user visits an app page and (un)rates, (un)comments or (un)reviews it
  ++  usr-visit
    |=  [=dev-data usr-name=@p =key act=visit-dev-action now=@da]
    ^-  [?(%changed %unchanged) ^app-page ^dev-data]
    ?.  (~(has in app-set.dev-data) app-name.key)
      ~&   "%dev-server: app-page doesn't exist"
      [%unchanged *app-page dev-data]
    =/  app-page  (~(got by dev-map.dev-data) key)
    ?-    -.act
        %rate
      =/  new-app-page  (rate:visit-app-page app-page usr-name rating.act)
      :+  %changed  new-app-page
      dev-data(dev-map (~(put by dev-map.dev-data) key.act new-app-page))
        %unrate 
      =/  new-app-page  (unrate:visit-app-page app-page usr-name)
      :+  %changed  new-app-page
      dev-data(dev-map (~(put by dev-map.dev-data) key.act new-app-page))
        %add-com
      =/  new-app-page  (add-com:visit-app-page app-page now [usr-name text.act])
      :+  %changed  new-app-page
      dev-data(dev-map (~(put by dev-map.dev-data) key.act new-app-page))
        %del-com
      =/  new-app-page  (del-com:visit-app-page app-page usr-name time.act)
      :+  %changed  new-app-page
      dev-data(dev-map (~(put by dev-map.dev-data) key.act new-app-page))
        %add-rev
      =/  new-app-page  (add-rev:visit-app-page app-page usr-name now text.act hash.act is-safe.act)
      :+  %changed  new-app-page
      dev-data(dev-map (~(put by dev-map.dev-data) key.act new-app-page))
        %del-rev
      =/  new-app-page  (del-rev:visit-app-page app-page usr-name)
      :+  %changed  new-app-page
      dev-data(dev-map (~(put by dev-map.dev-data) key.act new-app-page))
    ==
::  
  ++  visit-app-page
    |%
    ++  rate
      |=  [=app-page usr-name=@p rating=@ud]
      ^-  ^app-page
      =/  new-ratings  (~(put by ratings.usr-input.app-page) usr-name (^rating rating))
      app-page(ratings.usr-input new-ratings)
    ::
    ++  unrate
      |=  [=app-page usr-name=@p]
      ^-  ^app-page
      =/  new-ratings  (~(del by ratings.usr-input.app-page) usr-name)
      app-page(ratings.usr-input new-ratings)
    ::
    ++  add-com
      |=  [=app-page now=@da =comment]
      ^-  ^app-page
      =/  new-comments  (put:com comments.usr-input.app-page now comment)
      app-page(comments.usr-input new-comments)
    ::
    ++  del-com
      |=  [=app-page usr-name=@p time=@da]
      ^-  ^app-page
      ~&  usr-name
      ?>  =(usr-name (head (got:com comments.usr-input.app-page time)))
      =/  new-comments  (tail (del:com comments.usr-input.app-page time))
      app-page(comments.usr-input new-comments)
    ::
    ++  add-rev
      |=  [=app-page usr-name=@p now=@da text=@t hash=@uv is-safe=?]
      ^-  ^app-page
      =/  is-current  =(hash desk-hash.dst-input.app-page)
      =/  new-reviews  %+  ~(put by reviews.usr-input.app-page)  
        usr-name  `review`[now text hash is-current is-safe] 
      app-page(reviews.usr-input new-reviews)
    ::
    ++  del-rev
      |=  [=app-page usr-name=@p]
      ^-  ^app-page
      =/  new-reviews  (~(del by reviews.usr-input.app-page) usr-name)
      app-page(reviews.usr-input new-reviews)
    --
  --
::
::
::
::
::
::  for comments, ordered map
++  com  ((on @da comment) lth)
::
::  %.y if one ship is moon of another
++  ships-related
  |=  [=dev-name dst-name=@p]
  ^-  ?
  ?:  (gte dev-name dst-name)
    ?:  =(0 (mod (sub dev-name dst-name) 4.294.967.296))
      %.y  
    %.n
  ?:  =(0 (mod (sub dst-name dev-name) 4.294.967.296))
    %.y
  %.n
::
++  parse-dst-desk
  |=  [dst-desk=@t]
  ^-  [? [=dst-name =app-name]]
  =/  dst-desk  (trip dst-desk)
  =/  loc  (find ['/']~ dst-desk)
  ?~  loc  [%.n [~zod %fail]]
  :+  %.y
  (slav %p (crip (scag u.loc dst-desk)))
  `@tas`(crip (slag +(u.loc) dst-desk))
::
::
++  validator
  |%
  ++  new-app-page
    |=  [=dev-name our=@p now=@da =key =app-page]
    ^-  ?
    ?.  =(dev-name dev-name.key)
      ~&  "signature fail: dev-name and key don't correspond"
      %.n
    =/  dst-desk  (parse-dst-desk dst-desk.dev-input.app-page)
    ?.  -.dst-desk  
      %.n
    ?.  =(app-name.+.dst-desk app-name.key)
      %.n
    ?:  (ships-related dev-name dst-name.+.dst-desk)
      %.y
    ?.  =(q.signature.dst-input.app-page dst-name.+.dst-desk)
      ~&  "signature fail: ship in sig and distributor ship are not the same"
      %.n
    ?.  (validate:sig [our signature.dst-input.app-page key now])
      ~&  "signature fail: distributor signature validation failed, not adding new app by dev"
      %.n
    %.y  
  ::
  ::  takes dev-data and outputs the subset of dev-data with valid signatures
  ++  dev-data-init
    |=  [=dev-name =dev-data our=@p now=@da]
    ^-  ^dev-data
    =/  apps  ~(tap in app-set.dev-data)
    =/  signed-app-set  *app-set
    =/  signed-dev-map  *dev-map
    =/  n  0
    =/  len  ~(wyt in app-set.dev-data)
    |-  ?:  =(n len)  [signed-dev-map signed-app-set]
      =/  app-name  (snag n apps)
      =/  key  [dev-name app-name]
      =/  app-page  (~(get by dev-map.dev-data) key)
      ?~  app-page  !!
      ?.  (new-app-page [dev-name our now key u.app-page])  $(n +(n))
      %=  $
        n  +(n)
        signed-app-set  (~(put in signed-app-set) app-name)
        signed-dev-map  (~(put by signed-dev-map) key u.app-page)
      ==  
  :: 
  ::  verify whether dev-map keys all contain dev-name
  ++  dev-map-keys
    |=  [=dev-name =dev-map]
    ^-  ?
    =/  keys  ~(tap in ~(key by dev-map))
    =/  len  (lent keys)
    =/  n  0
    |-  ?:  =(n len)  %.y
    =/  key  (snag n keys)
    ?.  =(dev-name -.key)  %.n
    $(n +(n))
  ::
  ::  verify whether dev-map and app-set correspond
  ++  dev-map-app-set
    |=  [=dev-map =app-set]
    =/  keys  ~(key by dev-map)
    =/  app-names  `^app-set`(~(run in keys) tail)
    ?:  =(app-set app-names)
      %.y
    %.n
  ::
  ::  verify whether cats in cat-map exist in cat-set
  ++  cat-map-cat-set
    |=  [=cat-map =cat-set]
    (~(all by cat-map) |=(cat=category (~(has in cat-set) cat))) 
  ::
  ::  verify whether keys in key-list the same as those in cat-map
  ++  key-list-cat-map
    |=  [=key-list =cat-map]
    =((silt key-list) ~(key by cat-map))
  ::
  ::  verify whether cur-choice(key-list) is subset of cur-map
  ++  key-list-cur-map
    |=  [=key-list =cur-map]
    (levy key-list |=(=key (~(has in ~(key by cur-map)) key)))
  ::  
  ::  verify whether keys of cur-map correspond to aux-map
  ++  cur-map-aux-map
    |=  [=cur-map =aux-map]
    =/  cur-map-keys  ~(key by cur-map)
    =/  dev-name-add  |=  [=dev-name =app-set]  
    ^-  (set [^dev-name app-name])
    (~(run in app-set) |=(=app-name [dev-name app-name]))
    =/  aux-map-1  (~(rut by aux-map) dev-name-add)
    =/  aux-map-2  (~(run by aux-map-1) |=(set=(set key) ~(tap in set)))
    =/  vals  (silt `(list key)`(zing ~(val by aux-map-2)))
    =(cur-map-keys vals)
  --
--
