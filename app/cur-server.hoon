/-  *app-store-action, *app-store-data
/+  default-agent, dbug
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0
  $:  %0
      =cur-data
      =cur-choice
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
  =.  state  [%0 ~ `^cur-choice`[~ [our.bowl ~]]]
  `this
::  
++  on-save   !>(state)
++  on-load   
  |=  old=vase
  ^-  (quip card _this)
  `this(state !<(state-0 old))
::  
::  on-poke is for subscribing to Developers
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?>  =(our.bowl src.bowl)
  ?>  ?=(%app-store-cur-action mark)
  =/  act  !<(cur-action vase)
  =/  dev-name-wire  /(scot %p +.act)
  ?-    -.act
      %sub    
    ~&  "%cur-server: subscribing to {(scow %p +.act)}"
    :_  this
    [%pass dev-name-wire %agent [+.act %dev-server] %watch /dev-page]~
  ::  
      %unsub  
    ~&  "%cur-server: unsubscribing from {(scow %p +.act)}" 
    =/  cur1  cur-data.+.state
    =/  cur2  cur-data.+.cur-choice.+.state  
    :-  [%pass dev-name-wire %agent [+.act %dev-server] %leave ~]~
    %=  this  
      cur-data.+.state               `^cur-data`(~(del by cur1) +.act)
      cur-data.+.cur-choice.+.state  `^cur-data`(~(del by cur2) +.act)
    ==
  == 
::  
++  on-arvo   on-arvo:default
::
::  on-watch is for receiving Users' subscription requests
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?>  =([%cur-choice ~] path)
  ~&  "%cur-server: received subscription request"
  :_  this
  [%give %fact ~ %app-store-cur-choice !>(`^cur-choice`cur-choice.+.state)]~
::  
++  on-leave  on-leave:default
++  on-peek   on-peek:default
::
::  on-agent is for receiving subscriptions updates from Developers
++  on-agent  
  |=  [=wire =sign:agent:gall]
  ^-  (quip card _this)
  =/  dev-name-tape  (trip `@t`-.wire)
  ?+    -.sign  (on-agent:default wire sign)
      %watch-ack
    ?~  p.sign
      ~&  "%cur-server: subscribe to {dev-name-tape} succeeded"
      `this
    ~&  "%cur-server: subscribe to {dev-name-tape} failed"
    `this
  ::
      %kick
    ~&  "%cur-server: got kick from {dev-name-tape}, resubscribing..."
    =/  dev-name  `@p`(slav %p -.wire)
    :_  this
    [%pass wire %agent [dev-name %dev-server] %watch /dev-page]~
  ::
      %fact
    =/  dev-page  !<(dev-page q.cage.sign)
    ~&  "%cur-server: received dev page from {dev-name-tape}"
    =/  dev-name  `@p`(slav %p -.wire)
    ?>  =(dev-name dev-name.dev-page)
    =/  key  dev-name.+.dev-page
    =/  value  app-pages.+.dev-page
    =/  new-cur-data  (~(put by `^cur-data`cur-data.+.state) key value)
    =/  new-cur-choice  [~ [our.bowl new-cur-data]]
    :_  this(cur-data.+.state new-cur-data, cur-choice.+.state new-cur-choice)
    [%give %fact [/cur-choice]~ %app-store-cur-choice !>(`^cur-choice`new-cur-choice)]~
  ==
::
++  on-fail   on-fail:default
--

