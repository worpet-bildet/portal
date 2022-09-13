/-  *app-store-usr-action, *app-store-usr-data
/-  *app-store-cur-choice, *app-store-dev-page
/+  default-agent, dbug
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0
  $:  usr-data
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
  
::  on-poke is for subscribing to Curators
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?>  ?=(%app-store-usr-action mark)
  =/  act  !<(usr-action vase)
  =/  cur-name-wire  ~[`@tas`(crip (slag 1 (scow %p +.act)))]
  ?-    -.act
    %sub    
      :_  this
      [%pass cur-name-wire %agent [+.act %cur-server] %watch /cur-choice]~
    %unsub  
      :_  this
      [%pass cur-name-wire %agent [+.act %cur-server] %leave ~]~
  ==
  
++  on-arvo   on-arvo:default
++  on-watch  on-watch:default
++  on-leave  on-leave:default
++  on-peek   on-peek:default

::  on-agent is for receiving subscription updates from Curators
++  on-agent 
  |=  [=wire =sign:agent:gall]
  ~&  sign
  ^-  (quip card _this)
  ?+    -.sign  (on-agent:default wire sign)
      %watch-ack
    ?~  p.sign
      ((slog 'subscribe succeeded!' ~) `this)
    ((slog 'subscribe failed!' ~) `this)
  ::
      %kick
    %-  (slog 'Got kick, resubscribing...' ~)
    =/  cur-name  `@p`(slav %p (crip (weld "~" `tape`wire)))
    :_  this
    [%pass wire %agent [cur-name %cur-server] %watch /cur-choice]~
  ::
      %fact
    =/  cur-choice  !<(cur-choice q.cage.sign)
    =/  cur-name  `@p`(slav %p (crip (weld "~" `tape`wire)))
    ::?>  =(%dev-page `^dev-page`dev-page) ::TODO type assertion for cur-choice
    ::TODO define what ~ means (maybe for delete), for now nothing changes 
    ?~  cur-choice  `this  
    `this(state (~(put by `usr-data`state) `^cur-name`cur-name `^cur-choice`cur-choice))
  ==

++  on-fail   on-fail:default
--




















