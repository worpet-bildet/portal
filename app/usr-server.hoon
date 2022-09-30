/-  *app-store-action, *app-store-data
/+  default-agent, dbug
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0
  $:  %0
      =usr-data
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
::  on-poke is for subscribing to Curators
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?>  =(our.bowl src.bowl)
  ?>  ?=(%app-store-usr-action mark)
  =/  act  !<(usr-action vase)
  =/  cur-name-wire  /(scot %p +.act)
  ?-    -.act
      %sub    
    ~&  "%usr-server: subscribing to {(scow %p +.act)}"
    :_  this
    [%pass cur-name-wire %agent [+.act %cur-server] %watch /cur-choice]~
  ::
      %unsub  
    ~&  "%usr-server: unsubscribing from {(scow %p +.act)}"
    :-  [%pass cur-name-wire %agent [+.act %cur-server] %leave ~]~
    this(usr-data.state `^usr-data`(~(del by usr-data.state) +.act))       
  ==
::  
++  on-arvo   on-arvo:default
++  on-watch  on-watch:default
++  on-leave  on-leave:default
::
::  on-agent is for receiving subscription updates from Curators
++  on-agent 
  |=  [=wire =sign:agent:gall]
  ^-  (quip card _this)
  =/  cur-name-tape  (trip `@t`-.wire)
  ?+    -.sign  (on-agent:default wire sign)
      %watch-ack
    ?~  p.sign
      ~&  "%usr-server: subscribe to {cur-name-tape} succeeded"
      `this
    ~&  "%usr-server: subscribe to {cur-name-tape} failed"
    `this
  ::
      %kick
    ~&  "%usr-server: got kick from {cur-name-tape}, resubscribing..."
    =/  cur-name  `@p`(slav %p -.wire)
    :_  this
    [%pass wire %agent [cur-name %cur-server] %watch /cur-choice]~
  ::
      %fact
    =/  cur-choice  !<(cur-choice q.cage.sign)
    ~&  "%usr-server: received cur-choice from {cur-name-tape}"
    =/  cur-name  `@p`(slav %p -.wire)
    ?~  cur-choice  
      `this(+.state (~(del by `^usr-data`+.state) `^cur-name`cur-name))
    ?>  =(cur-name cur-name.u.cur-choice)
    `this(+.state (~(put by `^usr-data`+.state) `^cur-name`cur-name.u.cur-choice `^cur-data`cur-data.u.cur-choice))
  ==
::
++  on-fail   on-fail:default
::
++  on-peek   
  |=  =path
  ^-  (unit (unit cage)) 
  ?+  path  (on-peek:default path)
      [%x %all ~]  ``usr-data+!>(+.state)
  ::  
      [%x %is-cur @ ~]
    =/  cur=@p  (slav %p i.t.t.path)
    ``noun+!>(`?`(~(has by `^usr-data`+.state) cur))
  ::
      [%x %get-cur @ ~]
    =/  cur=@p  (slav %p i.t.t.path)
    =/  maybe-cur  (~(get by `^usr-data`+.state) cur)
    ?~  maybe-cur  ``cur-data+!>(`^cur-data`maybe-cur)
    ``cur-data+!>(`^cur-data`u.maybe-cur)
  ==
--
