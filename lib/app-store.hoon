/-  *app-store-data, *app-store-action
|%
++  usr  1
::  too for all possible actions
--
++  cur
::  todo for all possible actions
  |%
  ::  come up with clearer/consitent names
  ++  init::sub   ::  after inital subscription to dev 
  1
  ++  add  :: when dev adds an app
  2
  ++  edit  ::  when dev edits an app
  3
  ++  del  ::  when dev dels an app
  4
  ++  unsub  ::  after unsubbing from dev
  5
  --
::
::
::
++  dev
::  todo for all possible actions
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
  --
--
