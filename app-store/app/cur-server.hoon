/-  *app-store-action, *app-store-data
/+  default-agent, dbug, app-store, sig
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0
  $:  %0
      =cur-page
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
    ~&  "%cur-server: subscribing to {(scow %p +.act)}"
    =/  dev-name-wire  /(scot %p +.act)
    :_  this
    [%pass dev-name-wire %agent [+.act %dev-server] %watch /dev-update]~
  ::
      %unsub
    ~&  "%cur-server: unsubscribing from {(scow %p +.act)}"
    =^  changed  cur-data.cur-page
    (del-dev:cur-data-lib:app-store [cur-data.cur-page.state dev-name.act])
    ?:  =(changed %unchanged)  `this
    =/  dev-name-wire  /(scot %p +.act)
    :_  this
    :~
      [%pass dev-name-wire %agent [+.act %dev-server] %leave ~]
      [%give %fact [/cur-update]~ %app-store-cur-update !>([%del-dev +.act])]
      [%give %fact [/render]~ %app-store-cur-update !>([%all cur-page.state])]
    ==
  ::
      %cur-info
    ~&  "%cur-server: adding title to curator page"
    =/  new-cur-page  cur-page.state(cur-info +.act)
    :_  this(cur-page new-cur-page)
    :~
      [%give %fact [/cur-update]~ %app-store-cur-update !>(act)]
      [%give %fact [/render]~ %app-store-cur-update !>([%all new-cur-page])]
    ==
  ::
      %select
    ~&  "%cur-server: adding cur-choice to curator page"
    =^  changed  cur-data.cur-page
    (select:cur-data-lib:app-store [cur-data.cur-page.state act])
    ?:  =(changed %unchanged)  `this
    :_  this
    :~
      [%give %fact [/cur-update]~ %app-store-cur-update !>(act)]
      [%give %fact [/render]~ %app-store-cur-update !>([%all cur-page.state])]
    ==
  ::
      %cats
    ~&  "%cur-server: changing categories"
    =/  new-cur-data  (cats:cur-data-lib:app-store [cur-data.cur-page.state act])
    :_  this(cur-data.cur-page new-cur-data)
    :~
      [%give %fact [/cur-update]~ %app-store-cur-update !>(act)]
      [%give %fact [/render]~ %app-store-cur-update !>([%all cur-info.cur-page.state new-cur-data])]
    ==
  ==
::
++  on-arvo   on-arvo:default
::
::  on-watch is for receiving Users' subscription requests
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?+    -.path    (on-watch:default path)
      %cur-update
    ~&  "%cur-server: received subscription request"
    =/  cur-update  `cur-update`[%all cur-info.cur-page.state cur-data.cur-page.state]
    :_  this
    [%give %fact ~ %app-store-cur-update !>(cur-update)]~
      %render
    ~&  "%cur-server: received subscription request from front-end"
    =/  cur-update  `cur-update`[%all cur-info.cur-page.state cur-data.cur-page.state]
    :_  this
    [%give %fact ~ %app-store-cur-update !>(cur-update)]~
  ==
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
        %all
      =/  new-cur-data
        (add-dev:cur-data-lib:app-store [cur-data.cur-page.state our.bowl now.bowl dev-name dev-data.dev-update])
      =/  cur-update  [%add-dev dev-name dev-data.dev-update]
      :_  this(cur-data.cur-page new-cur-data)
      :~
        [%give %fact [/cur-update]~ %app-store-cur-update !>(cur-update)]
        [%give %fact [/render]~ %app-store-cur-update !>([%all cur-info.cur-page.state new-cur-data])]
      ==
    ::
        %add
      =^  changed  cur-data.cur-page
      (put-app:cur-data-lib:app-store [cur-data.cur-page.state our.bowl now.bowl dev-name key.dev-update app-page.dev-update])
      ?:  =(changed %unchanged)  `this
      =/  cur-update  [%add-app key.dev-update app-page.dev-update]
      :_  this
      :~
        [%give %fact [/cur-update]~ %app-store-cur-update !>(cur-update)]
        [%give %fact [/render]~ %app-store-cur-update !>([%all cur-page.state])]
      ==
    ::
        %change
      =^  changed  cur-data.cur-page
      (put-app:cur-data-lib:app-store [cur-data.cur-page.state our.bowl now.bowl dev-name key.dev-update app-page.dev-update])
      ?-    changed
          %unchanged
        `this
      ::
          %deleted
        =/  cur-update  [%del-app key.dev-update]
        :_  this
        :~
          [%give %fact [/cur-update]~ %app-store-cur-update !>(cur-update)]
          [%give %fact [/render]~ %app-store-cur-update !>([%all cur-page.state])]
        ==
      ::
          %changed
        =/  cur-update  [%change-app key.dev-update app-page.dev-update]
        :_  this
        :~
          [%give %fact [/cur-update]~ %app-store-cur-update !>(cur-update)]
          [%give %fact [/render]~ %app-store-cur-update !>([%all cur-page.state])]
        ==
      ==
    ::
        %del
      =^  changed  cur-data.cur-page
      (del-app:cur-data-lib:app-store [cur-data.cur-page.state dev-name key.dev-update])
      ?:  =(changed %unchanged)  `this
      =/  cur-update  [%del-app key.dev-update]
      :_  this
      :~
        [%give %fact [/cur-update]~ %app-store-cur-update !>(cur-update)]
        [%give %fact [/render]~ %app-store-cur-update !>([%all cur-page.state])]
      ==
    ==
  ==
::
++  on-fail   on-fail:default
--
