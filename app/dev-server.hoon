/-  *app-store-action, *app-store-data
/+  default-agent, dbug
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0
  $:  %0
      =dev-page
  ==
+$  card  card:agent:gall
--
%-  agent:dbug
=|  state-0
=*  state  -
^-  agent:gall
|_  =bowl:gall
+*  this      .
    default   ~(. (default-agent this %|) bowl)
++  on-init
  ^-  (quip card _this)
  =.  state  [%0 ~]
  `this
::  
++  on-save   !>(state)
++  on-load   
  |=  old=vase
  ^-  (quip card _this)
  `this(state !<(state-0 old))
::  
::  on-poke is for entering app data and sending it to subscribers (Curators)
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?>  =(our.bowl src.bowl)
  ?>  ?=(%app-store-dev-action mark)  
  =/  act  !<(dev-action vase)
  
  ?-    -.act
      %add
    =/  key  [our.bowl app-name.act]
    ~&  "%dev-server: adding app page"
    ?:  (~(has by dev-page.state) key)  
      ~&  "dev-server: use %edit (not %add) to change existing app-page"
      `this
    =/  new-dev-page  (~(put by dev-page.state) key app-page.act)
    :_  this(dev-page.state `^dev-page`new-dev-page)
    [%give %fact [/dev-update]~ %app-store-dev-update !>(`dev-update`(some [`change`[%add key] `^dev-page`new-dev-page]))]~
  ::
      %edit
    =/  key  [our.bowl app-name.act]
    ~&  "%dev-server: editing app page"
    ?.  (~(has by dev-page.state) key)  
      ~&  "dev-server: use %add (not %edit) to add new app-page"
      `this
    =/  new-dev-page  (~(put by dev-page.state) [our.bowl app-name.act] app-page.act)
    :_  this(dev-page.state new-dev-page)  ::usporedi ovu liniju sa onom kod %add
    [%give %fact [/dev-update]~ %app-store-dev-update !>(`dev-update`(some [`change`[%edit key] `^dev-page`new-dev-page]))]~
  ::
      %del
    =/  key  [our.bowl app-name.act]
    ~&  "%dev-server: deleting app page"
    ?.  (~(has by dev-page.state) key)  
      ~&  "dev-server: app-page does not exist"
      `this
    =/  new-dev-page  (~(del by dev-page.state) key)
    :_  this(dev-page.state new-dev-page)
    [%give %fact [/dev-update]~ %app-store-dev-update !>(`dev-update`(some [`change`[%del key] new-dev-page]))]~ 
  ::
      %wipe
    ~&  "%dev-server: wiping all data"
    :_  this(dev-page.state ~)
    [%give %fact [/dev-update]~ %app-store-dev-update !>(`dev-update`(some [`change`[%wipe ~] `^dev-page`~]))]~ 
  ==
::
++  on-arvo   on-arvo:default
::
::  on watch is for receiving Curators' subscription requests
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?>  =([%dev-update ~] path)
  ~&  "%dev-server: received subscription request"
  :_  this
  [%give %fact ~ %app-store-dev-update !>(`dev-update`(some [`change`[%init ~] dev-page.state]))]~
::  
++  on-leave  on-leave:default
++  on-peek   on-peek:default
++  on-agent  on-agent:default
++  on-fail   on-fail:default
--

