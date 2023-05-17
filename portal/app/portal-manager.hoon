/-  *portal-data, *portal-action, *portal-message, portal-config,
    groups, treaty
/+  default-agent, dbug, *portal, io=agentio, sig
|%
+$  versioned-state
  $%  state-0:portal-config
      state-1:portal-config
      state-2:portal-config
      state-3:portal-config
  ==
+$  card  card:agent:gall
--
%-  agent:dbug
=|  state-3:portal-config
=*  state  -
^-  agent:gall
|_  =bowl:gall
+*  this        .
    default     ~(. (default-agent this %|) bowl)
    timer-card  :*  %pass  /purge-timer  %arvo  %k  %fard  q.byk.bowl
                 %purge-timer  noun+!>(`purge-time)  ==
++  on-init
  ^-  (quip card _this)
  =/  sub-init  [%sub [%collection portal-indexer '' '~2000.1.1']]
  :_  this
  :~  ::  initialize purge timer
      timer-card
      ::  sub to home page
      (~(act cards [[our.bowl %portal-store]]) sub-init)
  ==
::
++  on-save  !>(state)
++  on-load
  |=  =vase
  ^-  (quip card _this)
  ?:  =(%1 -.q.vase)    `this(state *state-3:portal-config)
  ?:  =(%2 -.q.vase)    `this(state *state-3:portal-config)
  =/  old  !<(state-3 vase)
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
    ?>  =(our.bowl ~worpet-bildet)
    ?>  =(src.bowl src.msg)
    ?+    -.msg  !!
        %index-as-curator
      =/  act  ~(act cards [our.bowl %portal-store])
      =/  index-key  [%collection our.bowl '' 'index']
      =/  ship-key   [%ship src.msg '' '']
      =/  cards  `(list card)`~[(act [%remove ~[ship-key] index-key])]
      =?  cards  toggle.msg  (snoc cards (act [%prepend ~[ship-key] index-key]))
      [cards this]
    ==
  ==
::
++  on-arvo  on-arvo:default
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
