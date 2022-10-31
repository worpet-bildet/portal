/-  *app-store-action, *app-store-data
/+  default-agent, dbug, app-store, sig
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0
  $:  %0
      =cur-info
      =cur-data
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
  =.  state  [%0 ['' '' ''] [[~ ~ ~] ~ ~]]
  `this
::
++  on-save  !>(state)
++  on-load   
  |=  old=vase
  ^-  (quip card _this)
  `this(state !<(state-0 old))
::
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?>  =(our.bowl src.bowl)
  ?>  ?=(%app-store-cur-action mark)
  =/  act  !<(cur-action vase)  
  ?-    -.act
      %sub    
    =/  dev-name-wire  /(scot %p +.act)
    ~&  "%cur-server: subscribing to {(scow %p +.act)}"
    :_  this
    [%pass dev-name-wire %agent [+.act %dev-server] %watch /dev-update]~
  ::  
      %unsub
    =/  dev-name-wire  /(scot %p +.act)
    ~&  "%cur-server: unsubscribing from {(scow %p +.act)}" 
    =/  new-cur-data  (unsub:cur:app-store [cur-data.state dev-name.act])
    =/  new-cur-page  `cur-page`(some [our.bowl cur-info.state new-cur-data])
    :_  this(cur-data.state new-cur-data)
    :~  
      [%pass dev-name-wire %agent [+.act %dev-server] %leave ~]
      [%give %fact [/cur-page]~ %app-store-cur-page !>(new-cur-page)]
    ==
  ::
      %cur-info
    ~&  "%cur-server: adding title to curator page"
    =/  new-cur-page  `cur-page`(some [our.bowl +.act cur-data.state])
    :_  this(cur-info.state +.act)
    [%give %fact [/cur-page]~ %app-store-cur-page !>(new-cur-page)]~
  ::
      %select  
    ~&  "%cur-server: adding cur-choice to curator page"
    =/  new-cur-data  (select:cur:app-store [cur-data.state act])
    =/  new-cur-page  `cur-page`(some [our.bowl cur-info.state new-cur-data])
    :_  this(cur-data.state new-cur-data)
    [%give %fact [/cur-page]~ %app-store-cur-page !>(new-cur-page)]~
  ::
      %cats
    ~&  "%cur-server: changing categories"
    =/  new-cur-data  (cats:cur:app-store [cur-data.state act])
    `this(cur-data new-cur-data)
  == 
::  
++  on-arvo   on-arvo:default
::
::  on-watch is for receiving Users' subscription requests
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?>  =([%cur-page ~] path)
  ~&  "%cur-server: received subscription request"
  =/  cur-page  `cur-page`(some [our.bowl cur-info.state cur-data.state])
  :_  this
  [%give %fact ~ %app-store-cur-page !>(cur-page)]~
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
    [%pass wire %agent [dev-name %dev-server] %watch /dev-update]~
  ::
      %fact
    =/  dev-update  !<(dev-update q.cage.sign)
    ~&  "%cur-server: received dev update from {dev-name-tape}"
    =/  dev-name  `@p`(slav %p -.wire)
    ?-    -.dev-update
        %sig
      =/  new-cur-data  (sign:cur:app-store [cur-data.state our.bowl now.bowl dev-name dev-update])
      `this(cur-data.state new-cur-data)
        %init
      =/  new-cur-data  (init:cur:app-store [cur-data.state our.bowl now.bowl dev-name dev-update])
      `this(cur-data.state new-cur-data)
    ::  
        %add
      `this
      ::=/  new-cur-data  (add:cur:app-store [cur-data.state our.bowl now.bowl dev-name dev-update])
      ::`this(cur-data.state new-cur-data)
    ::  
        %edit
      =/  new-cur-data  (edit:cur:app-store [cur-data.state our.bowl now.bowl dev-name dev-update])
      ?~  (find [key.dev-update]~ key-list.cur-choice.cur-data.state)
        `this(cur-data new-cur-data)
      =/  new-cur-page  `cur-page`(some [our.bowl cur-info.state new-cur-data]) 
      :_  this(cur-data.state new-cur-data)
      [%give %fact [/cur-page]~ %app-store-cur-page !>(new-cur-page)]~
    ::  
        %del
      =/  new-cur-data  (del:cur:app-store [cur-data.state dev-name dev-update])
      ?~  (find [key.dev-update]~ key-list.cur-choice.cur-data.state)
        `this(cur-data new-cur-data)
      =/  new-cur-page  `cur-page`(some [our.bowl cur-info.state new-cur-data])
      :_  this(cur-data.state new-cur-data)
      [%give %fact [/cur-page]~ %app-store-cur-page !>(new-cur-page)]~
    ::  
        %usr-visit
      =/  new-cur-data  (usr-visit:cur:app-store [cur-data.state our.bowl now.bowl dev-name dev-update])
      ?~  (find [key.dev-update]~ key-list.cur-choice.cur-data.state)
        `this(cur-data new-cur-data)
      =/  new-cur-page  `cur-page`(some [our.bowl cur-info.state new-cur-data])
      :_  this(cur-data.state new-cur-data)
      [%give %fact [/cur-page]~ %app-store-cur-page !>(new-cur-page)]~
    ::
        %wipe  `this
        
    ==
  ==
::
++  on-fail   on-fail:default
--

