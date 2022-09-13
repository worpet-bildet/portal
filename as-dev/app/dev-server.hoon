/-  *app-store-dev-action, *app-store-dev-page
/+  default-agent, dbug
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0
  $:  =dev-page
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
  =.  state  ~
  `this
  
++  on-save   !>(state)
++  on-load   
  |=  old=vase
  ^-  (quip card _this)
  `this(state !<(state-0 old))
  
::  on-poke is for entering app data and sending it to subscribers (Curators)
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?>  ?=(%app-store-dev-action mark)
  =/  act  !<(dev-action vase)
  ?>    =(-.act %add)
  ?>  =(our.bowl src.bowl)
  ?>  =(-.dev-page.act src.bowl) 
  :_  this(state dev-page.act)
  [%give %fact [/dev-page]~ %app-store-dev-page !>(`^dev-page`dev-page.act)]~

++  on-arvo   on-arvo:default

::  on watch is for receiving Curators' subscription requests
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?>  =([%dev-page ~] path)
  :_  this
  [%give %fact ~ %app-store-dev-page !>(`^dev-page`state)]~
  
++  on-leave  on-leave:default  ::  TODO, or is the default enough?
++  on-peek   on-peek:default
++  on-agent  on-agent:default
++  on-fail   on-fail:default
--
