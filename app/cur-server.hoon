/-  *app-store-action, *app-store-data
/+  default-agent, dbug
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0
  $:  %0
      =cur-title
      =cur-intro
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
  =.  state  [%0 '' '' [[~ ~ ~] ~ ~]]
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
  ?-    -.act
      %choose  `this
      %title  `this
      %intro  `this
      %sub    
    =/  dev-name-wire  /(scot %p +.act)
    ~&  "%cur-server: subscribing to {(scow %p +.act)}"
    :_  this
    [%pass dev-name-wire %agent [+.act %dev-server] %watch /dev-update]~
  ::  
      %unsub  ::  removes from cur-choice, put warning before unsubbing on frontend
::::::::::::::::
::::::::::::::::
    =/  dev-name-wire  /(scot %p +.act)
    ~&  "%cur-server: unsubscribing from {(scow %p +.act)}" 
    =/  cur-choice    `cur-choice`cur-choice.cur-data.+.state
    =/  cur-map             `cur-map`cur-map.cur-data.+.state
    =/  aux-map          `aux-map`aux-map.cur-data.+.state
    ::
    =/  apps  (~(got by aux-map) dev-name.act)
    =/  n  0
    =/  len  (lent apps)
    ::
    =/  new-cur-choice
      |-
        ?:  =(n len)  `^cur-choice`cur-choice
        =/  loc  (find [[dev-name.act (snag n apps)]]~ `dev-app-list`dev-app-list.cur-choice)
        ?~  loc  !!  ::what if find doesnt find?
        %=  $
          n  +(n)
          dev-app-list.cur-choice   (oust [u.loc 1] `dev-app-list`dev-app-list.cur-choice)
          app-page-list.cur-choice  (oust [u.loc 1] app-page-list.cur-choice)
          cat-list.cur-choice       (oust [u.loc 1] cat-list.cur-choice)
        ==
    =/  new-cur-map  
      |-  
        ?:  =(n len)  `^cur-map`cur-map
        %=  $
          n  +(n)
          cur-map  (~(del by `^cur-map`cur-map) [+.act (snag n apps)])
        ==
    =/  new-aux-map  (~(del by `^aux-map`aux-map) +.act)
    =/  new-cur-data  `^cur-data`[new-cur-choice new-cur-map new-aux-map]
    ::with or without ^ `cur-data`
::::::::::::::::
::::::::::::::::
    =/  new-cur-page  ^-  cur-page  %-  some
    :^  our.bowl  `^cur-title`cur-title.+.state  
    `^cur-intro`cur-intro.+.state  new-cur-choice
    :_  this(cur-data.+.state new-cur-data)
    :~  
      [%pass dev-name-wire %agent [+.act %dev-server] %leave ~]
      [%give %fact [/cur-page]~ %app-store-cur-page !>(`^cur-page`new-cur-page)]
    ==
    ::  when receiveing a poke for entering cur-choice, it should be asserted that curchoice be subset of cur-data
    ::  %choose
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
  =/  cur-page  ^-  cur-page  %-  some
  :^  our.bowl  `^cur-title`cur-title.+.state  
  `^cur-intro`cur-intro.+.state  `^cur-choice`cur-choice.cur-data.+.state
  :_  this
  [%give %fact ~ %app-store-cur-page !>(`^cur-page`cur-page)]~
::  
++  on-leave  on-leave:default
++  on-peek   on-peek:default
::
::  changes, and deletes of app pages should be forwarded to changes of cur-choice
::  adding app pages should not be forwarded to changes of cur-choice
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
    =/  dev-update  !<(dev-update q.cage.sign)
    ~&  "%cur-server: received dev update from {dev-name-tape}"
    =/  dev-name  `@p`(slav %p -.wire)
    ?~  dev-update  `this
    ::?~  dev-page.u.dev-update  ::probably remove dev completely, (probly not have his name left)
      ::`this                         ::subscription stays tho
      ::=/  new-cur-data  (~(del by `^cur-data`cur-data.+.state) dev-name)
      :::_  this(cur-data.+.state new-cur-data, cur-choice.+.state new-cur-choice)
      ::[%give %fact [/cur-page]~ %app-store-cur-page !>(`^cur-choice`new-cur-choice)]~
    ::  ?>  =(dev-name dev-name.u.dev-page)  should check for every key in map
    `this
    ::?-    change.u.dev-update
    ::    %init  `this
    ::    %add   `this
    ::    %edit  `this 
    ::    %del   `this
    ::    %wipe  `this
    ::==
    
    ::=/  key  dev-name.dev-page.u.dev-update
    ::=/  value  app-pages.u.dev-page
    ::=/  new-cur-data  (~(put by `^cur-data`cur-data.+.state) key value)
    ::=/  new-cur-choice  (some [our.bowl new-cur-data])
    :::_  this(cur-data.+.state new-cur-data, cur-choice.+.state new-cur-choice)
    ::[%give %fact [/cur-page]~ %app-store-cur-page !>(`^cur-choice`new-cur-choice)]~
  ==
::
++  on-fail   on-fail:default
--

