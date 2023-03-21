/-  *portal-data, *portal-action, *portal-message, *portal-logs, *portal-config,
    groups, treaty
/+  default-agent, dbug, *portal, io=agentio, sig
|%
+$  versioned-state
  $%  state-0
      state-1
  ==
+$  state-0
  $:  %0
      =default-curators
      =portal-curator
  ==
+$  state-1
  $:  %1
      =default-curators
      =portal-curator
      purge-timer=?
      purge-time=@dr
      portal-indexer=@p
      indexed-as-curator=?
  ==
+$  card  card:agent:gall
--
%-  agent:dbug
=|  state-1
=*  state  -
^-  agent:gall
|_  =bowl:gall
+*  this      .
    default   ~(. (default-agent this %|) bowl)
++  on-init
  ^-  (quip card _this)
  =/  new-user-event      [%join now.bowl (get-ship-type:misc our.bowl) `@ux`(shax our.bowl)]
  =/  default-curators    (silt (limo ~[[~worpet-bildet /list/list '~2000.1.1']]))
  =/  portal-curator      [~worpet-bildet /list/list '~2000.1.1']
  =/  purge-timer         %.y
  =/  purge-time          ~d1
  =/  portal-indexer      ~nec   ::  TODO change to ~worpet-bildet
  =/  indexed-as-curator  %.n
  :_  %=  this
        default-curators    default-curators
        portal-curator      portal-curator
        purge-timer         purge-timer
        purge-time          purge-time
        portal-indexer      portal-indexer
        indexed-as-curator  indexed-as-curator
      ==
  :~  (~(poke pass:io /act) [our.bowl %portal-store] %portal-action !>([%sub portal-curator]))
      (~(poke pass:io /new-user) [-.portal-curator %portal-logs] %portal-new-user-event !>(new-user-event))
      [%pass /purge-timer %arvo %k %fard q.byk.bowl %purge-timer %noun !>((some purge-time))]
  ==
::
++  on-save  !>(state)
++  on-load
  |=  old=vase
  ^-  (quip card _this)
  ::  later:
  ::  upon update, new default curators can be added by us
  ::  and added to portal-curators
  ::  if user unsubs from a curator, then they are not added
  =/  old  !<(versioned-state old)
  =/  purge-time  ~d1
  ?-    -.old
      %0
    :_  this(state [%1 default-curators.old portal-curator.old %.y purge-time ~worpet-bildet %.n])
    [%pass /purge-timer %arvo %k %fard q.byk.bowl %purge-timer %noun !>((some purge-time))]~
      %1
    ?:  =(purge-timer %.y)  `this(state old)
      ::  TODO
      ::  cancel old timer
      ::  add new one with new purge-time
    :_  this(purge-timer %.y)
    [%pass /purge-timer %arvo %k %fard q.byk.bowl %purge-timer %noun !>((some purge-time))]~
  ==
::
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?+    mark    (on-poke:default mark vase)
      %portal-action
    ?.  =(our.bowl src.bowl)  `this
    =/  act  !<(action vase)
    ::
    ::  TODO abstract a portal-manager add/edit/etc function which does stuff based on action and type
    ::  maybe not needed? aim for simplicity.
    =/  act-set  %-  silt   ^-  (list term)
      ~[%add %edit %edit-general %sub %del %add-to-default-list %overwrite-list %put-nonitem %edit-docket %add-item-to-list %purge]
    ?:  (~(has in act-set) -.act)
      :_  this
      ~[(~(poke pass:io /act) [our.bowl %portal-store] portal-action+vase)]
    ::
    ?:  =(-.act %add-items-and-list)
      :_  this
      (add-items-and-list:on-action:portal-manager our.bowl src.bowl now.bowl act)
    ::
    ?:  =(-.act %add-items-and-edit-list)
      :_  this
      (add-items-and-edit-list:on-action:portal-manager our.bowl src.bowl now.bowl act)
    ::
    =/  poke-msg  ~(poke pass:io /msg)
    ?+    -.act    `this
        %index-as-curator
      :_  this(indexed-as-curator toggle.act)
      [(poke-msg [portal-indexer %portal-manager] portal-message+!>([%index-as-curator src.bowl toggle.act]))]~
      ::
        %comment
      :_  this
      [(poke-msg [ship.key.act %portal-manager] portal-message+vase)]~
      ::
        %edit-comment
      :_  this
      [(poke-msg [ship.key.act %portal-manager] portal-message+vase)]~
      ::
        %del-comment
      :_  this
      [(poke-msg [ship.key.act %portal-manager] portal-message+vase)]~
      ::
        %rate
      :_  this
      [(poke-msg [ship.key.act %portal-manager] portal-message+vase)]~
      ::
        %unrate
      :_  this
      [(poke-msg [ship.key.act %portal-manager] portal-message+vase)]~
      ::
        %review
      :_  this
      [(poke-msg [ship.key.act %portal-manager] portal-message+vase)]~
      ::
        %del-review
      :_  this
      [(poke-msg [ship.key.act %portal-manager] portal-message+vase)]~
      ::
        %sign-app
      =/  sig  (sign:sig our.bowl now.bowl [%app key.act desk-name.act])
      =/  cage  portal-message+!>([%sign-app key.act sig])
      :_  this
      ~[(poke-msg [ship.key.act %portal-manager] cage)]
      ::
        %join-group
      ?.  ?=([%nonitem %group *] type.key.act)  `this
      =/  cage  group-join+!>([flag=[ship.key.act `@tas`cord.key.act] join-all=&])
      :_  this
      [%pass /group-join %agent [our.bowl %groups] %poke cage]~
      ::
        %get-group-preview
      ::  not sub -> not perfectly updated, either too much or too little
      =/  path  /groups/(scot %p ship.flag.act)/[term.flag.act]/preview
      =/  wire  [%get-group-preview /(scot %p ship.flag.act)/[term.flag.act]]
      =/  sub-status  (~(gut by wex.bowl) [wire ship.flag.act %groups] ~)
      :_  this
      ?~  sub-status
        [%pass wire %agent [ship.flag.act %groups] %watch path]~
      ?:  =(acked.sub-status %.n)
        [%pass wire %agent [ship.flag.act %groups] %watch path]~
      ~
      ::
        %get-docket
      ::  not sub -> not perfectly updated, either too much or too little
      =/  path  /treaty/(scot %p ship.act)/[desk.act]
      =/  wire  [%treaty (key-to-path:conv key.act)]
      =/  sub-status  (~(gut by wex.bowl) [wire ship.act %treaty] ~)
      :_  this
      ?~  sub-status
        [%pass wire %agent [ship.act %treaty] %watch path]~
      ?:  =(acked.sub-status %.n)
        [%pass wire %agent [ship.act %treaty] %watch path]~
      ~
    ==
    ::
      %portal-message
    =/  msg  !<(message vase)
    :_  this
    ~[(~(poke pass:io /msg) [our.bowl %portal-store] portal-message+vase)]
    ::
    ::  when %portal-store makes/receives an update, it notifies %portal-manager
    ::  then %portal-manager decides what it needs to do with it
      %portal-update
    ::  TODO assert that it comes from our %portal-store
    ?.  =(our.bowl src.bowl)  `this
    =/  upd  !<(update vase)
    ?+    -.upd    (on-poke:default mark vase)
        %put
      :_  this
      (put:on-update:portal-manager our.bowl now.bowl upd)
      ::
        %del
      :_  this
      (del:on-update:portal-manager upd)
    ==
  ==
::
++  on-arvo
  |=  [=wire sign=sign-arvo]
  ^-  (quip card:agent:gall _this)
  ?>  ?=([%purge-timer ~] wire)
  ?>  ?=([%khan %arow *] sign)
  :_  this
  :~  [(~(poke pass:io /act) [our.bowl %portal-store] portal-action+!>([%purge default-curators portal-curator]))]
      [%pass /purge-timer %arvo %k %fard q.byk.bowl %purge-timer %noun !>((some purge-time))]
  ==
::
++  on-watch  on-watch:default
++  on-leave  on-leave:default
++  on-peek   on-peek:default
++  on-agent
  |=  [=wire =sign:agent:gall]
  ^-  (quip card _this)
  ?+    wire    (on-agent:default wire sign)
      [%treaty *]
    ?+    -.sign    (on-agent:default wire sign)
        %watch-ack  `this
        %kick       `this
      ::
        %fact
      =/  treaty  !<(treaty:treaty q.cage.sign)
      =/  key  (path-to-key:conv +.wire)
      ?+    type.key    !!
          [%enditem %app ~]
        :_  this
        ~[(act-to-act-card:cards [%edit-docket key treaty] our.bowl %portal-store)]
          [%nonitem %app ~]
        :_  this
        :~  [(fill-nonitem-app-data:portal-manager [our.bowl [%fill-nonitem-app key treaty]])]
            [%pass wire %agent [ship.key %treaty] %leave ~]
        ==
      ==
    ==
      [%get-group-preview *]
    ?+    -.sign    (on-agent:default wire sign)
        %watch-ack  `this
        %kick       `this
      ::
        %fact
      =/  preview  !<(preview:groups q.cage.sign)
      =/  act
        :*  %fill-nonitem-group
          [p.flag.preview [%nonitem %group ~] q.flag.preview]
          title.meta.preview
          description.meta.preview
          image.meta.preview
        ==
      :_  this
      :~  (fill-group-data:portal-manager [our.bowl act])
          [%pass wire %agent [p.flag.preview %groups] %leave ~]
      ==
    ==
  ==
::
++  on-fail   on-fail:default
--
