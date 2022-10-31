/-  *app-store-data, *app-store-action
/+  sig
|%
++  com  ((on @da comment) lth)
++  usr  ~
++  cur
  |%
  ::  receiving intial data from dev
  ++  init    
  |=  [=cur-data our=@p now=@da =dev-name dev-update=[%init =dev-data]]
  ^-  ^cur-data
  =/  apps  ~(tap in app-set.dev-data.dev-update)
  =/  signed-app-set  *app-set
  =/  signed-dev-map  *dev-map
  =/  n  0
  =/  len  ~(wyt in app-set.dev-data.dev-update)
  =/  validated-dev-data
  |-  ?:  =(n len)  [signed-dev-map signed-app-set]
    =/  app-name  (snag n apps)
    =/  key  [dev-name app-name]
    =/  app-page  (~(get by dev-map.dev-data.dev-update) key)
    ?~  app-page  ~&("%cur-server: error adding data" [*dev-map *app-set])
    ?.  =(q.signature.u.app-page -:(parse-dst-desk dst-desk.u.app-page))
      $(n +(n))
    ?.  (validate:sig [our signature.u.app-page key now])
      $(n +(n))
    %=  $
      n  +(n)
      signed-app-set  (~(put in signed-app-set) app-name)
      signed-dev-map  (~(put by signed-dev-map) key u.app-page)
    ==  
  ?.  (dev-map-app-set:validator -.validated-dev-data +.validated-dev-data)
    ~&  "cur-server: new dev-map and app-set inconsistent"
    cur-data  
  =/  new-aux-map  (~(put by aux-map.cur-data) dev-name +.validated-dev-data)
  ::  cur should only use %init when not having dev-data and then adding it
  ::  if cur-receives less data on dev than he had, ~(uni by cur-map) doesn't work
  =/  new-cur-map  (~(uni by cur-map.cur-data) `dev-map`-.validated-dev-data)
  ?.  (cur-map-aux-map:validator new-cur-map new-aux-map)
    ~&  "%cur-server: receiving data failed"
    cur-data
  [cur-choice.cur-data new-cur-map new-aux-map]
::
  ::  after unsubbing from dev removes dev from cur-choice and cur-map and aux-map
  ++  unsub  
  |=  [=cur-data =dev-name]
  ^-  ^cur-data
  =/  new-aux-map  (~(del by aux-map.cur-data) dev-name)
  =/  cur-map  cur-map.cur-data
  =/  cur-choice  cur-choice.cur-data
  =/  apps  ~(tap in (~(got by aux-map.cur-data) dev-name))
  =/  len  (lent apps)
  ::
  =/  new-cur-map  
  =/  n  0
  |-  ?:  =(n len)  cur-map
  %=  $
    n  +(n)
    cur-map  (~(del by cur-map) [dev-name (snag n apps)])
  ==
  ::
  =/  new-cur-choice  ^-  ^cur-choice
  =/  n  0
  |-  ?:  =(n len)  cur-choice
  =/  key  [dev-name (snag n apps)]
  =/  loc  (find [key]~ key-list.cur-choice)
  ?~  loc  cur-choice
  %=  $
    n  +(n)
    key-list.cur-choice    (oust [u.loc 1] key-list.cur-choice)
    cat-map.cur-choice     (~(del by cat-map.cur-choice) key)   
  ==
  ::
  ?.  ?&
    (key-list-cat-map:validator key-list.new-cur-choice cat-map.new-cur-choice)
    (key-list-cur-map:validator key-list.new-cur-choice new-cur-map)
    (cur-map-aux-map:validator new-cur-map new-aux-map)
  ==
    ~&  "%cur-server: updating cur-data after unsub, failed"
    cur-data
  [new-cur-choice new-cur-map new-aux-map]
::
  ::  when selecting new cur-choice
  ++  select
  |=  [=cur-data act=[%select =key-list =cat-map]]
  ^-  ^cur-data
  ?.  ?&
    (cat-map-cat-set:validator cat-map.act cat-set.cur-choice.cur-data)
    (key-list-cat-map:validator key-list.act cat-map.act)
    (key-list-cur-map:validator key-list.act cur-map.cur-data)
  ==
    ~&  "%cur-server: select failed"
    cur-data
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

  :: when dev adds an app
  ++  add  
  |=  [=cur-data our=@p now=@da =dev-name dev-update=[%add =key =app-page]]
  ^-  ^cur-data
  ?.  (verify-dev-update [dev-name our now dev-update])  cur-data
  =/  new-cur-map  (~(put by cur-map.cur-data) key.dev-update app-page.dev-update)
  =/  app-set  (~(get by aux-map.cur-data) dev-name)
  ?~  app-set  ~&("%cur-server: error" cur-data)
  =/  new-app-set  (~(put in u.app-set) app-name.key.dev-update)
  =/  new-aux-map  (~(put by aux-map.cur-data) dev-name new-app-set)
  ?.  ?&
    (cur-map-aux-map:validator new-cur-map new-aux-map)
    (key-list-cur-map:validator key-list.cur-choice.cur-data new-cur-map)
  ==
    ~&  "%cur-server: updating cur-data after dev adding an app, failed"
    cur-data
  cur-data(cur-map new-cur-map, aux-map new-aux-map)
::
  ::  when dev edits an app
  ++  edit  
  |=  [=cur-data our=@p now=@da =dev-name dev-update=[%edit =key =app-page]]
  ^-  ^cur-data
  ?.  (verify-dev-update [dev-name our now dev-update])  cur-data
  =/  new-cur-map  (~(put by cur-map.cur-data) key.dev-update app-page.dev-update)
  =/  app-set  (~(get by aux-map.cur-data) dev-name)
  ?~  app-set  ~&("%cur-server: error" cur-data)
  =/  new-app-set  (~(put in u.app-set) app-name.key.dev-update)
  =/  new-aux-map  (~(put by aux-map.cur-data) dev-name new-app-set)
  ?.  ?&
    (cur-map-aux-map:validator new-cur-map new-aux-map)
    (key-list-cur-map:validator key-list.cur-choice.cur-data new-cur-map)
  ==
    ~&  "%cur-server: updating cur-data after dev editing an app, failed"
    cur-data
  cur-data(cur-map new-cur-map, aux-map new-aux-map)
::
  ::  when dev dels an app
  ++  del  
  |=  [=cur-data =dev-name dev-update=[%del =key]]
  ^-  ^cur-data
  ?.  =(dev-name dev-name.key.dev-update)
    ~&  "%cur-server: dev-name and key don't correspond"
    cur-data
  =/  new-cat-map  (~(del by cat-map.cur-choice.cur-data) key.dev-update)
  =/  new-cur-map  (~(del by cur-map.cur-data) key.dev-update)
  =/  app-set  (~(get by aux-map.cur-data) dev-name)
  ?~  app-set  ~&("%cur-server: error" cur-data)
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
      ~&  "%cur-server: updating cur-data after dev deleting an app, failed"
      cur-data
    :+  [key-list.cur-choice.cur-data new-cat-map cat-set.cur-choice.cur-data] 
        new-cur-map  new-aux-map
  =/  new-key-list  (oust [u.loc 1] key-list.cur-choice.cur-data)
  ?.  ?&
    (cat-map-cat-set:validator new-cat-map cat-set.cur-choice.cur-data)
    (key-list-cat-map:validator new-key-list new-cat-map)
    (key-list-cur-map:validator new-key-list new-cur-map)
    (cur-map-aux-map:validator new-cur-map new-aux-map)
  ==
    ~&  "%cur-server: updating cur-data after dev deleting an app, failed"
    cur-data
  [[new-key-list new-cat-map cat-set.cur-choice.cur-data] new-cur-map new-aux-map]
::
  ::  after user leaves comment/review/rating to dev
  ++  usr-visit  
  |=  [=cur-data our=@p now=@da =dev-name dev-update=[%usr-visit =key =app-page]]
  ?.  (verify-dev-update [dev-name our now dev-update])  cur-data
  %=  cur-data
    cur-map  (~(put by cur-map.cur-data) key.dev-update app-page.dev-update)
  ==
::
  :: when dev sends signed app-page
  ++  sign
  |=  [=cur-data our=@p now=@da =dev-name dev-update=[%sig =key =app-page]]
  ^-  ^cur-data
  ?.  (verify-dev-update [dev-name our now dev-update])  cur-data
  =/  new-cur-map  (~(put by cur-map.cur-data) key.dev-update app-page.dev-update)
  =/  app-set  (~(get by aux-map.cur-data) dev-name)
  ?~  app-set  ~&("%cur-server: error" cur-data)
  =/  new-app-set  (~(put in u.app-set) app-name.key.dev-update)
  =/  new-aux-map  (~(put by aux-map.cur-data) dev-name new-app-set)
  ?.  ?&
    (cur-map-aux-map:validator new-cur-map new-aux-map)
    (key-list-cur-map:validator key-list.cur-choice.cur-data new-cur-map)
  ==
    ~&  "%cur-server: updating cur-data after dev editing an app, failed"
    cur-data
  cur-data(cur-map new-cur-map, aux-map new-aux-map)
::
  ++  verify-dev-update
  |=  [=dev-name our=@p now=@da dev-update=[?(%add %edit %sig %usr-visit) =key =app-page]]
  ^-  ?
  ?.  =(dev-name dev-name.key.dev-update)
    ~&  "%cur-server: dev-name and key don't correspond"
    %.n
  ?.  =(q.signature.app-page.dev-update -:(parse-dst-desk dst-desk.app-page.dev-update))
    ~&  "%cur-server: ship in sig and distributor ship are not the same"
    %.n
  ?.  (validate:sig [our signature.app-page.dev-update key.dev-update now])
    ~&  "%cur-server: distributor signature validation failed, not adding new app by dev"
    %.n
  %.y  
::
  :: verify whether dev-map keys all contain dev-name
  ++  check-dev-data  
  |=  [=dev-name =dev-data]
  ^-  ?
  =/  keys  ~(tap in ~(key by dev-map.dev-data))
  =/  len  (lent keys)
  =/  n  0
  |-  ?:  =(n len)  %.y
  =/  key  (snag n keys)
  ?.  =(dev-name -.key)  %.n
  $(n +(n))
::
  --
::
::
::
++  dev
  |%
  ++  add  
  |=  [=dev-name =dev-data act=[%add =app-name =app-page]]
  ^-  [?(%changed %unchanged) ^dev-data]
  =/  key  `^key`[dev-name app-name.act]    
  ?:  (~(has by dev-map.dev-data) key)  
    ~&  "dev-server: app-page already exists"
    ~&  "dev-server: use %edit (not %add) to change existing app-page"
    [%unchanged dev-data]
  =/  new-dev-map  (~(put by dev-map.dev-data) key app-page.act)
  =/  new-app-set  (~(put in app-set.dev-data) app-name.act)
  ?.  (dev-map-app-set:validator [new-dev-map new-app-set])
    ~&  "%dev-server: updating dev-data failed"
    [%unchanged dev-data]
  [%changed new-dev-map new-app-set]
::
  ++  edit  
  |=  [=dev-name =dev-data act=[%edit =app-name =app-page]]
  ^-  [?(%changed %unchanged) ^dev-data]
  =/  key  `^key`[dev-name app-name.act]    
  ?.  (~(has by dev-map.dev-data) key)  
    ~&  "dev-server: app-page doesn't exist"
    ~&  "dev-server: use %add (not %edit) to add new app-page"
    [%unchanged dev-data]     
  =/  new-dev-map  (~(put by dev-map.dev-data) key app-page.act)
  =/  new-app-set  (~(put in app-set.dev-data) app-name.act)
  ?.  (dev-map-app-set:validator [new-dev-map new-app-set])
    ~&  "%dev-server: updating dev-data failed"
    [%unchanged dev-data]
  [%changed new-dev-map new-app-set]
::  
  ++  del  
  |=  [=dev-name =dev-data act=[%del =app-name]]
  ^-  [?(%changed %unchanged) ^dev-data]
  =/  key  `^key`[dev-name app-name.act] 
  ?.  (~(has in app-set.dev-data) app-name.act)  
    ~&  "dev-server: app-page does not exist"
    [%unchanged dev-data]         
  =/  new-dev-map  (~(del by dev-map.dev-data) key)
  =/  new-app-set  (~(del in app-set.dev-data) app-name.act)
  ?.  (dev-map-app-set:validator [new-dev-map new-app-set])
    ~&  "%dev-server: updating dev-data failed"
    [%unchanged dev-data]
  [%changed new-dev-map new-app-set]
::
  ++  sign
  |=  [=dev-data act=[%send-sig =key =signature]]
  ^-  [?(%changed %unchanged) ^app-page ^dev-data]
  =/  app-page  (need (~(get by dev-map.dev-data) key.act))
  ?.  (~(has in app-set.dev-data) app-name.key.act)  
    ~&  "dev-server: app-page does not exist"
    [%unchanged app-page dev-data]  
  =/  dst-desk  (parse-dst-desk dst-desk.app-page)
  ?.  =(-.dst-desk q.signature.act)
    ~&  "%dev-server: dst-desk and ship in signature don't correspond"
    [%unchanged app-page dev-data]
  =/  new-app-page  app-page(signature signature.act)
  =/  new-dev-map
    (~(put by dev-map.dev-data) key.act new-app-page)
  [%changed new-app-page dev-data(dev-map new-dev-map)]
::
  ++  usr-visit
  |=  [=dev-data usr-name=@p =key act=visit-dev-action now=@da]
  ^-  [?(%changed %unchanged) ^app-page ^dev-data]
  =/  app-page  (~(got by dev-map.dev-data) key)
  ?.  (~(has in app-set.dev-data) app-name.key)
      ~&   "%dev-server: app-page doesn't exist"
      [%unchanged app-page dev-data]
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
    =/  new-ratings  (~(put by ratings.visitor-data.app-page) usr-name (^rating rating))
    =/  new-visitor-data  visitor-data.app-page(ratings new-ratings)
    app-page(visitor-data new-visitor-data)
    ::
    ++  unrate
    |=  [=app-page usr-name=@p]
    ^-  ^app-page
    =/  new-ratings  (~(del by ratings.visitor-data.app-page) usr-name)
    =/  new-visitor-data  visitor-data.app-page(ratings new-ratings)
    app-page(visitor-data new-visitor-data)
    ::
    ++  add-com
    |=  [=app-page now=@da =comment]
    ^-  ^app-page
    =/  new-comments  (put:com comments.visitor-data.app-page now comment)
    =/  new-visitor-data  visitor-data.app-page(comments new-comments)
    app-page(visitor-data new-visitor-data)
    ::
    ++  del-com
    |=  [=app-page usr-name=@p time=@da]
    ^-  ^app-page
    ?>  =(usr-name (head (got:com comments.visitor-data.app-page time)))
    =/  new-comments  (tail (del:com comments.visitor-data.app-page time))
    =/  new-visitor-data  visitor-data.app-page(comments new-comments)
    app-page(visitor-data new-visitor-data)
    ::
    ++  add-rev
    |=  [=app-page usr-name=@p now=@da text=@t hash=@uv is-safe=?]
    ^-  ^app-page
    =/  is-current  =(hash desk-hash.app-page)
    =/  new-reviews  %+  ~(put by reviews.visitor-data.app-page)  
      usr-name  `review`[now text hash is-current is-safe] 
    =/  new-visitor-data  visitor-data.app-page(reviews new-reviews)
    app-page(visitor-data new-visitor-data)
    ::
    ++  del-rev
    |=  [=app-page usr-name=@p]
    ^-  ^app-page
    =/  new-reviews  (~(del by reviews.visitor-data.app-page) usr-name)
    =/  new-visitor-data  visitor-data.app-page(reviews new-reviews)
    app-page(visitor-data new-visitor-data)
    --
  --
::
::
++  parse-dst-desk
  |=  [dst-desk=@t]
  ^-  [dst-name app-name]
  =/  dst-desk  (trip dst-desk)
  =/  loc  (find ['/']~ dst-desk)
  ?~  loc  !!
  :-  
  (slav %p (crip (scag u.loc dst-desk)))
  (crip (slag +(u.loc) dst-desk))
::
::
++  validator
  |%
  ::  assert that dev-map and app-set correspond
  ++  dev-map-app-set
    |=  [=dev-map =app-set]
    =/  keys  ~(key by dev-map)
    =/  app-names  `^app-set`(~(run in keys) tail)
    ?:  =(app-set app-names)
      %.y
    %.n
::
  ::  assert that cats in cat-map exist in cat-set
  ++  cat-map-cat-set
    |=  [=cat-map =cat-set]
    (~(all by cat-map) |=(cat=category (~(has in cat-set) cat))) 
::
  ::  assert that keys in key-list the same as those in cat-map
  ++  key-list-cat-map
    |=  [=key-list =cat-map]
    =((silt key-list) ~(key by cat-map))
::
  ::  assert cur-choice(key-list) is subset of cur-map
  ++  key-list-cur-map
    |=  [=key-list =cur-map]
    (levy key-list |=(=key (~(has in ~(key by cur-map)) key)))
::  
  ::  assert that keys of cur-map correspond to aux-map
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
