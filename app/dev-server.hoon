/-  *app-store-action, *app-store-data
/+  default-agent, dbug, app-store
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0
  $:  %0
      =dev-data
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
  =.  state  [%0 [~ ~]]
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
    ?:  (~(has by dev-map.dev-data) [our.bowl app-name.act])  
      ~&  "%dev-server: app-page already exists"
      ~&  "%dev-server: use %edit (not %add) to change existing app-page"
      `this
    ~&  "%dev-server: adding app page"
    =/  change  `change`[%add our.bowl app-name.act]
    =/  new-dev-data  (add:dev:app-store [our.bowl dev-data.state act])
    :_  this(dev-data.state new-dev-data)
    [%give %fact [/dev-update]~ %app-store-dev-update !>(`dev-update``[change new-dev-data])]~
  ::
      %edit
    ?.  (~(has by dev-map.dev-data) [our.bowl app-name.act])  
      ~&  "dev-server: app-page doesn't exist"
      ~&  "dev-server: use %add (not %edit) to add new app-page"
      `this 
    ~&  "%dev-server: editing app page"
    =/  change  `change`[%edit our.bowl app-name.act]
    =/  new-dev-data  (edit:dev:app-store [our.bowl dev-data.state act])
    :_  this(dev-data.state new-dev-data)
    [%give %fact [/dev-update]~ %app-store-dev-update !>(`dev-update``[change new-dev-data])]~ 
  ::
      %del
    ?.  (~(has by dev-map.dev-data.state) [our.bowl app-name.act])  
      ~&  "dev-server: app-page does not exist"
      `this
    ~&  "%dev-server: deleting app page"
    =/  change  `change`[%del our.bowl app-name.act]
    =/  new-dev-data  (del:dev:app-store [our.bowl dev-data.state act])
    :_  this(dev-data.state new-dev-data)
    [%give %fact [/dev-update]~ %app-store-dev-update !>(`dev-update``[change new-dev-data])]~ 
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
  =/  dev-update  (some [`change`[%init ~] dev-data.state])
  :_  this
  [%give %fact ~ %app-store-dev-update !>(`^dev-update`dev-update)]~
::  
++  on-leave  on-leave:default
++  on-peek   on-peek:default
++  on-agent  on-agent:default
++  on-fail   on-fail:default
--

