/-  *portal-data, *portal-action, *portal-message, *portal-logs, *portal-config,
    groups, treaty
/+  default-agent, dbug, *portal, io=agentio, sig
|%
+$  versioned-state
  $%  state-0
      state-1
      state-2
  ==
+$  card  card:agent:gall
--
%-  agent:dbug
=|  state-2
=*  state  -
^-  agent:gall
|_  =bowl:gall
+*  this        .
    default     ~(. (default-agent this %|) bowl)
    timer-card  :*  %pass  /purge-timer  %arvo  %k  %fard  q.byk.bowl
                 %purge-timer  noun+!>(`purge-time)  ==
++  on-init
  ^-  (quip card _this)
  =/  join  [%join now.bowl (get-ship-type:misc our.bowl) `@ux`(shax our.bowl)]
  =/  sub-init  [%sub [%collection portal-indexer '' '~2000.1.1']]
  :_  this
  :~  ::  initialize purge timer
      timer-card
      ::  sub to home page
      (~(act cards [[our.bowl %portal-store]]) sub-init)
      ::  log new user
      :*  %pass  /new-user  %agent  [portal-curator %portal-logs]  %poke
          portal-new-user-event+!>(join)
      ==
  ==
::
++  on-save  !>(state)
++  on-load
  |=  old=vase
  ^-  (quip card _this)
  =/  old  !<(versioned-state old)
  ?>  ?=(%2 -.old)
  `this(state old)
::
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  =/  manager  ~(. manager [bowl state ~])
  ?+    mark    (on-poke:default mark vase)
      %portal-action
    ?>  =(our.bowl src.bowl)
    =/  act  !<(action vase)
    ?+    -.act
      ::  default:  forward to %portal-store
      :_  this  [(~(act cards [our.bowl %portal-store]) act)]~
      ::
        %sub
      =^  cards  state  (sub:on-poke:manager act)  [cards this]
      ::
        %prepend-to-feed
      =^  cards  state  (prepend-to-feed:on-poke:manager act)  [cards this]
      ::
        %onboarded
      `this(onboarded toggle.act)
      ::
        %index-as-curator
      =/  msg  [%index-as-curator src.bowl toggle.act]
      :_  this(indexed-as-curator toggle.act)
      [(~(msg cards [portal-indexer.state %portal-manager]) msg)]~
    ==
    ::
      %portal-message
    ::  TODO src.bowl src.msg problem kad store misli da je src our
    ::  a ne vanjski jer dolazi od portal-managera
    =/  msg  !<(message vase)
    ?>  =(our.bowl ~ronwex-naltyp-dilryd-mopreg)
    ?>  =(src.bowl src.msg)
    ?-    -.msg
        %index-as-curator
      =/  act  ~(act cards [our.bowl %portal-store])
      =/  index-key  [%collection our.bowl '' 'index']
      =/  ship-key   [%ship src.msg '' '']
      =/  cards  `(list card)`~[(act [%remove ~[ship-key] index-key])]
      =?  cards  toggle.msg  (snoc cards (act [%prepend ~[ship-key] index-key]))
      [cards this]
      ::
        %feed-update
      =/  act  [%prepend-to-feed [%feed our.bowl '' 'global'] feed.msg]
      =^  cards  state  (prepend-to-feed:on-poke:manager act)
      [cards this]
    ==
  ==
::
++  on-arvo
  |=  [=wire sign=sign-arvo]
  ^-  (quip card _this)
  ?>  ?=([%purge-timer ~] wire)
  ?>  ?=([%khan %arow *] sign)
  :_  this
  :~  (~(act cards [our.bowl %portal-store]) [%purge portal-curator])
      timer-card
  ==
::
++  on-watch  on-watch:default
++  on-leave  on-leave:default
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  ?+    path    (on-peek:default path)
    [%x %indexed-as-curator ~]  ``manager-result+!>(indexed-as-curator)
    [%x %onboarded ~]           ``manager-result+!>(onboarded)
  ==
++  on-agent
  |=  [=wire =sign:agent:gall]
  ^-  (quip card _this)
  ?+    wire    (on-agent:default wire sign)
    ::
      [%treaty @ @ @ @ ~]
    ?+    -.sign    (on-agent:default wire sign)
        %fact
      =/  treaty  !<(treaty:treaty q.cage.sign)
      =/  key  (path-to-key:conv +.wire)
      =/  act  [%replace key %temp [%app '' *signature treaty]]
      :_  this
      :~  [(~(act cards [our.bowl %portal-store]) act)]
          [%pass wire %agent [ship.key %treaty] %leave ~]
      ==
    ==
    ::
      [%get-group-preview @ @ @ @ ~]
    ?+    -.sign    (on-agent:default wire sign)
        %fact
      =/  preview  !<(preview:groups q.cage.sign)
      =/  key  (path-to-key:conv +.wire)
      =/  act  [%replace key %temp [%group meta.preview]]
      :_  this
      :~  [(~(act cards [our.bowl %portal-store]) act)]
          [%pass wire %agent [p.flag.preview %groups] %leave ~]
      ==
    ==
  ==
::
++  on-fail   on-fail:default
--
