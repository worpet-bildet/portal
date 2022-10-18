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
::  on-poke is for modifiying app data and sending it to subscribers (Curators)
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  
::  
  ::  when poke is from visitors to app-page (can also be from our.bowl)
  ?:  ?=(%app-store-visit-dev-action mark) 
  :: TODO maybe create a print if there is a wrong poke?
    =/  act  !<(visit-dev-action vase)
    ?-    -.act
      %rate  
    ?.  (~(has in app-set.dev-data.state) app-name.key.act)
      ~&   "%dev-server: app-page doesn't exist"
      `this
    ~&  "%dev-server: rating app"
    =/  change  `change`[%usr-visit key.act]
    =/  new-dev-data  (rate:dev:app-store [src.bowl dev-data.state act])
    :_  this(dev-data new-dev-data)
    [%give %fact [/dev-update]~ %app-store-dev-update !>(`dev-update``[change new-dev-data])]~
  ::    
      %unrate  
    ?.  (~(has in app-set.dev-data.state) app-name.key.act)
      ~&   "%dev-server: app-page doesn't exist"
      `this
    ::  currently it also sends sub update even if %unrate
    ::  was done on a rating that never existed
    ~&  "%dev-server: removing rating from app"
    =/  change  `change`[%usr-visit key.act]
    =/  new-dev-data  (unrate:dev:app-store [src.bowl dev-data.state act])
    :_  this(dev-data new-dev-data)
    [%give %fact [/dev-update]~ %app-store-dev-update !>(`dev-update``[change new-dev-data])]~
  ::
      %add-com 
    ?.  (~(has in app-set.dev-data.state) app-name.key.act)
      ~&   "%dev-server: app-page doesn't exist"
      `this
    ~&  "%dev-server: adding comment"    
    =/  change  `change`[%usr-visit key.act]
    =/  new-dev-data  (add-com:dev:app-store [src.bowl dev-data.state act now.bowl])
    :_  this(dev-data new-dev-data)
    [%give %fact [/dev-update]~ %app-store-dev-update !>(`dev-update``[change new-dev-data])]~
      %del-com  
   =/  new-dev-data  (del-com:dev:app-store [src.bowl dev-data.state act])
      :: TODO
      
      `this(dev-data new-dev-data)
      %add-rev  `this
      %del-rev  `this
    ==
::  
  ::  when poke is from our.bowl
  ?>  =(our.bowl src.bowl)
  ?>  ?=(%app-store-dev-action mark)  
  =/  act  !<(dev-action vase)
  ?-    -.act
      %add
    ?:  (~(has in app-set.dev-data.state) app-name.act)  
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
    ?.  (~(has in app-set.dev-data.state) app-name.act)  
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
    ?.  (~(has in app-set.dev-data.state) app-name.act)  
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

