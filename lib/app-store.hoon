/-  *app-store-data, *app-store-action
|%
++  usr  1
++  cur
  |%
  ::  algorithm for rearranging the order of cur-choice
  ++  order
    =-
    |=  [=cur-choice new-order=dev-app-list]
    ^-  ^cur-choice
    =/  mapp  (mapping [dev-app-list.cur-choice new-order])
    `^cur-choice`[new-order (rearrange [app-page-list.cur-choice cat-list.cur-choice mapp])]
    |%
    ++  mapping
      |=  [old=dev-app-list new=dev-app-list]
      ^-  (list @ud)
      =/  len  (lent new)
      ?>  =(len (lent old))
      =/  mapp  `(list @ud)`~
      =/  n  0
      |-  ?:  =(n len)  mapp
      =/  dev-app  (snag n old)
      =/  index  (find [dev-app]~ new)
      ?~  index  !!
      $(n +(n), mapp (snoc mapp u.index))
    ++  rearrange
      |=  [=app-page-list =cat-list mapp=(list @ud)]
      ^-  [^app-page-list ^cat-list]
      =/  len  (lent mapp)
      ?>  =(len (lent cat-list))
      =/  new-app-page-list  `^app-page-list`~
      =/  new-cat-list  `^cat-list`~
      =/  n  0
      |-  ?:  =(n len)  [new-app-page-list new-cat-list]
      =/  index  (find [n]~ mapp)
      ?~  index  !!
      %=  $
        n  +(n)
        new-cat-list  (snoc new-cat-list (snag u.index cat-list))
        new-app-page-list  (snoc new-app-page-list (snag u.index app-page-list))
      ==
    --
::
  ::  receiving intial data from dev
  ++  init    
    |=  [=cur-data =dev-name =dev-update]
    ^-  ^cur-data
    =/  new-aux-map  (~(put by aux-map.cur-data) dev-name +>+.dev-update)
    =/  new-cur-map  (~(uni by cur-map.cur-data) `dev-map`+>-.dev-update)
    [cur-choice.cur-data new-cur-map new-aux-map]
::
  ::  maybe smaller functions: del dev from cur-choice, from cur-map...
  ::  after unsubbing from dev
  ::  removes dev from cur-choice and cur-map and aux-map
  ++  unsub  
    |=  [=cur-data =dev-name]
    ^-  ^cur-data
    =/  new-aux-map  (~(del by aux-map.cur-data) dev-name)
  ::
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
    =/  new-cur-choice
    =/  n  0
    |-  ?:  =(n len)  cur-choice
    =/  loc  (find [[dev-name (snag n apps)]]~ dev-app-list.cur-choice)
    ?~  loc  cur-choice
    %=  $
      n  +(n)
      dev-app-list.cur-choice   (oust [u.loc 1] dev-app-list.cur-choice)
      app-page-list.cur-choice  (oust [u.loc 1] app-page-list.cur-choice)
      cat-list.cur-choice       (oust [u.loc 1] cat-list.cur-choice)
    ==
  ::
    `^cur-data`[new-cur-choice new-cur-map new-aux-map]
::    
  :: when dev adds an app
  ++  add  
    |=  [=cur-data =dev-name =dev-update]
    ^-  ^cur-data
    =/  new-aux-map  (~(put by aux-map.cur-data) dev-name +>+.dev-update)
    =/  new-cur-map  (~(uni by cur-map.cur-data) `dev-map`+>-.dev-update)
    [cur-choice.cur-data new-cur-map new-aux-map]
::
  ::  when dev edits an app
  ++  edit  
    |=  [=cur-data =dev-name =dev-update]
    ^-  ^cur-data
    =/  dev-map  `dev-map`+>-.dev-update
    =/  new-cur-map  (~(uni by cur-map.cur-data) dev-map)
    =/  cur-choice  cur-choice.cur-data
    =/  new-cur-choice  
      =/  app-name  +<+>.dev-update
      =/  loc  (find [[dev-name app-name]]~ dev-app-list.cur-choice)
      ?~  loc  cur-choice
      =/  app-page  (~(got by dev-map) [dev-name app-name])
      =/  new-app-page-list  (snap app-page-list.cur-choice u.loc app-page)
      [dev-app-list.cur-choice new-app-page-list cat-list.cur-choice] 
    [new-cur-choice new-cur-map aux-map.cur-data]
::
  ::  when dev dels an app
  ++  del  
    |=  [=cur-data =dev-name =dev-update]
    ^-  ^cur-data
    =/  new-aux-map  (~(put by aux-map.cur-data) dev-name +>+.dev-update)
    =/  dev-map  `dev-map`+>-.dev-update
    =/  app-name  +<+>.dev-update
    =/  new-cur-map  (~(del by cur-map.cur-data) [dev-name app-name])
    =/  cur-choice  cur-choice.cur-data
    =/  new-cur-choice       
      =/  loc  (find [[dev-name app-name]]~ dev-app-list.cur-choice)
      ?~  loc  cur-choice
      =/  new-dev-app-list   (oust [u.loc 1] dev-app-list.cur-choice)
      =/  new-app-page-list  (oust [u.loc 1] app-page-list.cur-choice)
      =/  new-cat-list       (oust [u.loc 1] cat-list.cur-choice)
      [new-dev-app-list new-app-page-list new-cat-list] 
    [new-cur-choice new-cur-map new-aux-map]
::
  ++  usr-visit  ::after user leaves comment/review/rating to dev
  6
  ++  check-dev-map  :: TU SAM STAO
    |=  [=dev-name =dev-map]
    ^-  ?
    =/  keys  ~(tap in ~(key by dev-map))
    =/  len  (lent keys)
    =/  n  0
    |-  ?:  =(n len)  %.y
    =/  key  (snag n keys)
    ?.  =(dev-name -.key)  %.n
    $(n +(n)) 
  --
::
::
::
++  dev
  |%
  ++  add  
  |=  [=dev-name =dev-data act=dev-action]
  ^-  ^dev-data
  ?>  =(-.act %add)
  =/  app-name  +<.act
  =/  app-page  +>.act
  =/  key  [dev-name app-name]    
  ?:  (~(has by dev-map.dev-data) key)  
    ~&  "dev-server: app-page already exists"
    ~&  "dev-server: use %edit (not %add) to change existing app-page"
    dev-data
  :-  
  (~(put by dev-map.dev-data) key app-page)
  (~(put in app-set.dev-data) app-name)
::
  ++  edit  
  |=  [=dev-name =dev-data act=dev-action]
  ^-  ^dev-data
  ?>  =(-.act %edit)
  =/  app-name  +<.act
  =/  app-page  +>.act
  =/  key  [dev-name app-name]    
  ?.  (~(has by dev-map.dev-data) key)  
    ~&  "dev-server: app-page doesn't exist"
    ~&  "dev-server: use %add (not %edit) to add new app-page"
    dev-data     
  :-  
  (~(put by dev-map.dev-data) key app-page)
  (~(put in app-set.dev-data) app-name)
::  
  ++  del  
  |=  [=dev-name =dev-data act=dev-action]
  ^-  ^dev-data
  ?>  =(-.act %del)
  =/  app-name  +.act
  =/  key  [dev-name app-name]        
  :-  
  (~(del by dev-map.dev-data) key)
  (~(del in app-set.dev-data) app-name)
::
  ++  usr-visit 
  1
  --
--
