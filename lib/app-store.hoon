/-  *app-store-data, *app-store-action
|%
++  com  ((on @da comment) lth)
++  usr  ~
++  cur
  |%
  ::  receiving intial data from dev
  ++  init    
  |=  [=cur-data =dev-name dev-update=[~ [[%init ~] =dev-data]]]
  ^-  ^cur-data
  =/  dev-update  (need dev-update) 
  =/  new-aux-map  (~(put by aux-map.cur-data) dev-name app-set.dev-data.dev-update)
  =/  new-cur-map  (~(uni by cur-map.cur-data) `dev-map`dev-map.dev-data.dev-update)
  ?>  (cur-map-aux-map:validator new-cur-map new-aux-map)
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
    cat-map.cur-choice     (~(del by cat-map.cur-choice) key)   ==
  ::
  ?>  ?&
    (key-list-cat-map:validator key-list.new-cur-choice cat-map.new-cur-choice)
    (key-list-cur-map:validator key-list.new-cur-choice new-cur-map)
    (cur-map-aux-map:validator new-cur-map new-aux-map)
  ==
  [new-cur-choice new-cur-map new-aux-map]
::
  ::  when selecting new cur-choice
  ++  select
  |=  [=cur-data act=[%select =key-list =cat-map]]
  ^-  ^cur-data
  ?>  ?&
    (cat-map-cat-set:validator cat-map.act cat-set.cur-choice.cur-data)
    (key-list-cat-map:validator key-list.act cat-map.act)
    (key-list-cur-map:validator key-list.act cur-map.cur-data)
  ==
  %=  cur-data
    cur-choice  [key-list.act cat-map.act cat-set.cur-choice.cur-data]
  ==
::
  ::  when writing categories
  ++  cats
  |=  [=cur-data act=[%cats =cat-set]]
  ^-  ^cur-data
  ?>  (cat-map-cat-set:validator cat-map.cur-choice.cur-data cat-set.act)
  cur-data(cat-set.cur-choice cat-set.act)
::
  :: when dev adds an app
  ++  add  
  |=  [=cur-data =dev-name dev-update=[~ [[%add =key] =dev-data]]]
  ^-  ^cur-data
  =/  dev-update  (need dev-update)
  =/  new-cur-map  (~(uni by cur-map.cur-data) `dev-map`dev-map.dev-data.dev-update)
  =/  new-aux-map  (~(put by aux-map.cur-data) dev-name app-set.dev-data.dev-update)
  ?>  ?&
    (cur-map-aux-map:validator new-cur-map new-aux-map)
    (key-list-cur-map:validator key-list.cur-choice.cur-data new-cur-map)
  ==
  cur-data(cur-map new-cur-map, aux-map new-aux-map)
::
  ::  when dev edits an app
  ++  edit  
  |=  [=cur-data =dev-name dev-update=[~ [[%edit =key] =dev-data]]]
  ^-  ^cur-data
  =/  dev-update  (need dev-update)
  =/  new-cur-map  (~(uni by cur-map.cur-data) dev-map.dev-data.dev-update)
  ?>  ?&
    (cur-map-aux-map:validator new-cur-map aux-map.cur-data)
    (key-list-cur-map:validator key-list.cur-choice.cur-data new-cur-map)
  ==
  cur-data(cur-map new-cur-map)
::
  ::  when dev dels an app
  ++  del  
  |=  [=cur-data =dev-name dev-update=[~ [change=[%del =key] =dev-data]]]
  ^-  ^cur-data
  =/  dev-update  (need dev-update)
  =/  loc  (find [key]~ key-list.cur-choice.cur-data)
  ?~  loc  !!
  =/  new-key-list  (oust [u.loc 1] key-list.cur-choice.cur-data)
  =/  new-cat-map  (~(del by cat-map.cur-choice.cur-data) key)
  =/  new-cur-map  (~(del by cur-map.cur-data) [dev-name app-name.key.change.dev-update])
  =/  new-aux-map  (~(put by aux-map.cur-data) dev-name app-set.dev-data.dev-update)
  ?>  ?&
    (cat-map-cat-set:validator new-cat-map cat-set.cur-choice.cur-data)
    (key-list-cat-map:validator new-key-list new-cat-map)
    (key-list-cur-map:validator new-key-list new-cur-map)
    (cur-map-aux-map:validator new-cur-map new-aux-map)
  ==
  [[new-key-list new-cat-map cat-set.cur-choice.cur-data] new-cur-map new-aux-map]
::
  ::  after user leaves comment/review/rating to dev
  ++  usr-visit  
  |=  [=cur-data =dev-name dev-update=[~ [change=[%usr-visit =key] =dev-data]]]
  ^-  ^cur-data
  %=  cur-data
    cur-map  (~(uni by cur-map.cur-data) `dev-map`dev-map.dev-data.dev-update)
  ==
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
  ?>  (dev-map-app-set:validator [new-dev-map new-app-set])
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
  ?>  (dev-map-app-set:validator [new-dev-map new-app-set])
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
  ?>  (dev-map-app-set:validator [new-dev-map new-app-set])
  [%changed new-dev-map new-app-set]
::
  ++  usr-visit
  |=  [=dev-data usr-name=@p =key act=visit-dev-action now=@da]
  ^-  [?(%changed %unchanged) ^dev-data]
  ?.  (~(has in app-set.dev-data) app-name.key)
      ~&   "%dev-server: app-page doesn't exist"
      [%unchanged dev-data]
  =/  app-page  (~(got by dev-map.dev-data) key)
  ?-    -.act
    %rate
  =/  new-app-page  (rate:visit-app-page app-page usr-name rating.act)
  :-  %changed
  dev-data(dev-map (~(put by dev-map.dev-data) key.act new-app-page))
    %unrate 
  =/  new-app-page  (unrate:visit-app-page app-page usr-name)
  :-  %changed
  dev-data(dev-map (~(put by dev-map.dev-data) key.act new-app-page))
    %add-com
  =/  new-app-page  (add-com:visit-app-page app-page now [usr-name text.act])
  :-  %changed
  dev-data(dev-map (~(put by dev-map.dev-data) key.act new-app-page))
    %del-com
  =/  new-app-page  (del-com:visit-app-page app-page usr-name time.act)
  :-  %changed
  dev-data(dev-map (~(put by dev-map.dev-data) key.act new-app-page))
    %add-rev
  =/  new-app-page  (add-rev:visit-app-page app-page usr-name now text.act hash.act is-safe.act)
  :-  %changed
  dev-data(dev-map (~(put by dev-map.dev-data) key.act new-app-page))
    %del-rev
  =/  new-app-page  (del-rev:visit-app-page app-page usr-name)
  :-  %changed
  dev-data(dev-map (~(put by dev-map.dev-data) key.act new-app-page))
  ==
::  
  ++  visit-app-page
    |%
    ++  rate
    |=  [=app-page usr-name=@p rating=@ud]
    ^-  ^app-page
    =/  new-ratings  (~(put by ratings.visitor-data.app-page) usr-name (^rating rating))
    %=  app-page
      visitor-data
    [new-ratings comments.visitor-data.app-page reviews.visitor-data.app-page]
    ==
    ++  unrate
    |=  [=app-page usr-name=@p]
    ^-  ^app-page
    =/  new-ratings  (~(del by ratings.visitor-data.app-page) usr-name)
    %=  app-page
      visitor-data  
    [new-ratings comments.visitor-data.app-page reviews.visitor-data.app-page]
    ==
    ++  add-com
    |=  [=app-page now=@da =comment]
    ^-  ^app-page
    =/  new-comments  (put:com comments.visitor-data.app-page now comment)
    %=  app-page
      visitor-data  
    [ratings.visitor-data.app-page new-comments reviews.visitor-data.app-page]
    ==
    ++  del-com
    |=  [=app-page usr-name=@p time=@da]
    ^-  ^app-page
    ?>  =(usr-name (head (got:com comments.visitor-data.app-page time)))
    =/  new-comments  (tail (del:com comments.visitor-data.app-page time))
    %=  app-page
      visitor-data
    [ratings.visitor-data.app-page new-comments reviews.visitor-data.app-page]
    ==
    ++  add-rev
    |=  [=app-page usr-name=@p now=@da text=@t hash=@uv is-safe=?]
    ^-  ^app-page
    =/  is-current  =(hash desk-hash.app-page)
    =/  new-reviews  %+  ~(put by reviews.visitor-data.app-page)  
      usr-name  `review`[now text hash is-current is-safe] 
    %=  app-page
      visitor-data
    [ratings.visitor-data.app-page comments.visitor-data.app-page new-reviews]
    ==
    ++  del-rev
    |=  [=app-page usr-name=@p]
    ^-  ^app-page
    =/  new-reviews  (~(del by reviews.visitor-data.app-page) usr-name)
    %=  app-page
      visitor-data
    [ratings.visitor-data.app-page comments.visitor-data.app-page new-reviews]
    ==
    --
  --
::
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
