/-  *app-store-action, *app-store-data
/+  default-agent, dbug, app-store
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
::
::  subscribe to ~dister-dilryd-mopreg as Curator
++  on-init
  ^-  (quip card _this)
  =.  state  [%0 ~]
  :_  this
  [%pass /~dister-dilryd-mopreg %agent [~dister-dilryd-mopreg %cur-server] %watch /cur-update]~
::
++  on-save   !>(state)
++  on-load
  |=  old=vase
  ^-  (quip card _this)
  `this(state !<(state-0 old))
::
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?>  =(our.bowl src.bowl)
  ?:  ?=(%app-store-visit-dev-action mark)
    =/  act  !<(visit-dev-action vase)
    ?-    -.act
      %rate
    ~&  "%usr-server: rating app"
    :_  this
    [%pass /visit-dev %agent [dev-name.key.act %dev-server] %poke %app-store-visit-dev-action !>(act)]~
      %unrate
    ~&  "%usr-server: unrating app"
    :_  this
    [%pass /visit-dev %agent [dev-name.key.act %dev-server] %poke %app-store-visit-dev-action !>(act)]~
      %add-com
    ~&  "%usr-server: adding comment"
    :_  this
    [%pass /visit-dev %agent [dev-name.key.act %dev-server] %poke %app-store-visit-dev-action !>(act)]~
      %edit-com
    ~&  "%usr-server: editing comment"
    :_  this
    [%pass /visit-dev %agent [dev-name.key.act %dev-server] %poke %app-store-visit-dev-action !>(act)]~
      %del-com
    ~&  "%usr-server: deleting comment"
    :_  this
    [%pass /visit-dev %agent [dev-name.key.act %dev-server] %poke %app-store-visit-dev-action !>(act)]~
      %put-rev
    ~&  "%usr-server: putting review"
    :_  this
    [%pass /visit-dev %agent [dev-name.key.act %dev-server] %poke %app-store-visit-dev-action !>(act)]~
      %del-rev
    ~&  "%usr-server: deleting review"
    :_  this
    [%pass /visit-dev %agent [dev-name.key.act %dev-server] %poke %app-store-visit-dev-action !>(act)]~
    ==
  ::
  ?>  ?=(%app-store-usr-action mark)
  =/  act  !<(usr-action vase)
  =/  cur-name-wire  /(scot %p +.act)
  ?-    -.act
      %sub
    ~&  "%usr-server: subscribing to {(scow %p +.act)}"
    :_  this
    [%pass cur-name-wire %agent [+.act %cur-server] %watch /cur-update]~
  ::
      %unsub
    ~&  "%usr-server: unsubscribing from {(scow %p +.act)}"
    :-  [%pass cur-name-wire %agent [+.act %cur-server] %leave ~]~
    this(usr-data.state `^usr-data`(~(del by usr-data.state) +.act))
  ==
::
++  on-arvo   on-arvo:default
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?+    -.path    (on-watch:default path)
      %render
    ::~&  "%usr-server: received subscription request from front-end"
    =/  usr-update  `usr-update`[%all usr-data.state]
    :_  this
    [%give %fact ~ %app-store-usr-update !>(usr-update)]~
  ==
::
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
    [%pass wire %agent [cur-name %cur-server] %watch /cur-update]~
  ::
      %fact
    =/  cur-update  !<(cur-update q.cage.sign)
    ~&  "%usr-server: received cur-update from {cur-name-tape}"
    =/  cur-name  `@p`(slav %p -.wire)
    ?-    -.cur-update
        %all
      =/  args  [usr-data.state cur-name cur-page.cur-update our.bowl now.bowl]
      `this(usr-data (add-cur:usr:app-store args))
    ::
        %cur-info
      =/  cur-page  (~(got by usr-data) cur-name)
      `this(usr-data (~(put by usr-data) cur-name cur-page(cur-info cur-info.cur-update)))
    ::
        %select
      =/  cur-page  (~(got by usr-data) cur-name)
      =^  changed  cur-data.cur-page
      (select:cur-data-lib:app-store [cur-data.cur-page cur-update])
      `this(usr-data (~(put by usr-data) cur-name cur-page))
    ::
        %cats
      =/  cur-page  (~(got by usr-data) cur-name)
      =/  new-cur-data  (cats:cur-data-lib:app-store [cur-data.cur-page cur-update])
      `this(usr-data (~(put by usr-data) cur-name cur-page(cur-data new-cur-data)))
    ::
        %add-dev
      =/  cur-page  (~(got by usr-data) cur-name)
      =/  cel  [cur-data.cur-page our.bowl now.bowl dev-name.cur-update dev-data.cur-update]
      =/  new-cur-data  (add-dev:cur-data-lib:app-store cel)
      `this(usr-data (~(put by usr-data) cur-name cur-page(cur-data new-cur-data)))
    ::
        %del-dev
      =/  cur-page  (~(got by usr-data) cur-name)
      =^  changed  cur-data.cur-page
      (del-dev:cur-data-lib:app-store [cur-data.cur-page dev-name.cur-update])
      `this(usr-data (~(put by usr-data) cur-name cur-page))
    ::
        %add-app
      =/  cur-page  (~(got by usr-data) cur-name)
      =/  cel  [cur-data.cur-page our.bowl now.bowl dev-name.key.cur-update key.cur-update app-page.cur-update]
      =^  changed  cur-data.cur-page
      (put-app:cur-data-lib:app-store cel)
      `this(usr-data (~(put by usr-data) cur-name cur-page))
    ::
        %change-app
      =/  cur-page  (~(got by usr-data) cur-name)
      =/  cel  [cur-data.cur-page our.bowl now.bowl dev-name.key.cur-update key.cur-update app-page.cur-update]
      =^  changed  cur-data.cur-page
      (put-app:cur-data-lib:app-store cel)
      `this(usr-data (~(put by usr-data) cur-name cur-page))
    ::
        %del-app
      =/  cur-page  (~(got by usr-data) cur-name)
      =^  changed  cur-data.cur-page
      (del-app:cur-data-lib:app-store [cur-data.cur-page dev-name.key.cur-update key.cur-update])
      `this(usr-data (~(put by usr-data) cur-name cur-page))
    ==
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
    ?~  maybe-cur  ``noun+!>(~)
    ``cur-page+!>(`^cur-page`u.maybe-cur)
  ==
--
