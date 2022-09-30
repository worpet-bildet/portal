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
  ?>  =(-.act %put)
  ~&  "%dev-server: putting dev page"
  ?~  dev-page.act  
    :_  this(dev-page.state ~)  
    [%give %fact [/dev-page]~ %app-store-dev-page !>(`^dev-page`~)]~
  ?>  =(dev-name.u.dev-page.act src.bowl)
  :_  this(dev-page.state dev-page.act)
  [%give %fact [/dev-page]~ %app-store-dev-page !>(`^dev-page`dev-page.act)]~
::
++  on-arvo   on-arvo:default
::
::  on watch is for receiving Curators' subscription requests
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?>  =([%dev-page ~] path)
  ~&  "%dev-server: received subscription request"
  :_  this
  [%give %fact ~ %app-store-dev-page !>(`^dev-page`dev-page.state)]~
::  
++  on-leave  on-leave:default
++  on-peek   on-peek:default
++  on-agent  on-agent:default
++  on-fail   on-fail:default
--

