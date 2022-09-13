/-  *app-store-cur-action, *app-store-dev-page
/-  *app-store-cur-data, *app-store-cur-choice
/+  default-agent, dbug
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0
  $:  cur-data
      cur-choice
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
  =.  state  [~ ~]
  `this
  
++  on-save   !>(state)
++  on-load   
  |=  old=vase
  ^-  (quip card _this)
  `this(state !<(state-0 old))
  
::  on-poke is for subscribing to Developers
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?>  ?=(%app-store-cur-action mark)
  =/  act  !<(cur-action vase)
  =/  dev-name-wire  ~[`@tas`(crip (slag 1 (scow %p +.act)))]
  ?-    -.act
    %sub    
      :_  this
      [%pass dev-name-wire %agent [+.act %dev-server] %watch /dev-page]~
    %unsub  
      :_  this
      [%pass dev-name-wire %agent [+.act %dev-server] %leave ~]~
  ==
  
++  on-arvo   on-arvo:default

::  on-watch is for receiving Users' subscription requests
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?>  =([%cur-choice ~] path)
  :_  this
  [%give %fact ~ %app-store-cur-choice !>(`cur-choice`+.state)]~
  
++  on-leave  on-leave:default
++  on-peek   on-peek:default

::  on-agent is for receiving subscriptions updates from Developers
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
    =/  dev-name  `@p`(slav %p (crip (weld "~" `tape`wire)))
    :_  this
    [%pass wire %agent [dev-name %dev-server] %watch /dev-page]~
  ::
      %fact
    =/  dev-page  !<(dev-page q.cage.sign)
    ::?>  =(%dev-page `^dev-page`dev-page) ::doesn't work
    ::TODO define what ~ means (maybe for delete), for now nothing changes 
    ?~  dev-page  `this  
    =/  new-cur-data  (~(put by `cur-data`-.state) -.dev-page +.dev-page)
    =/  new-cur-choice  (~(put by `cur-choice`+.state) -.dev-page +.dev-page)
    :_  this(-.state new-cur-data, +.state new-cur-choice)
    [%give %fact [/cur-choice]~ %app-store-cur-choice !>(`cur-choice`new-cur-choice)]~
  ==

++  on-fail   on-fail:default
--




















