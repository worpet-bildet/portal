/-  *portal-data, *portal-action, *portal-message, *portal-logs, *portal-config,
    groups, treaty
/+  default-agent, dbug, *portal, io=agentio, sig
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0
  $:  %0
      =default-curators
      =portal-curator
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
  =.  state  *state-0
  =/  default-curators  (silt (limo ~[[~dister-doznec-dilryd-mopreg /list/list '~2000.1.1']]))
  =/  portal-curator    [~dister-doznec-dilryd-mopreg /list/list '~2000.1.1']
  =/  new-user-event    [%join now.bowl (get-ship-type:misc our.bowl) `@ux`(shax our.bowl)]
  :_  %=  this
        default-curators  default-curators
        portal-curator    portal-curator
      ==
  :~  (~(poke pass:io /act) [our.bowl %portal-store] %portal-action !>([%sub portal-curator]))
      (~(poke pass:io /new-user) [-.portal-curator %portal-logs] %portal-new-user-event !>(new-user-event))
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
  `this(state !<(state-0 old))
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
    =/  act-set  %-  silt   ^-  (list term)
      ~[%add %edit %edit-general %sub %del %add-to-default-list %overwrite-list %put-nonitem %edit-docket]
    ?:  (~(has in act-set) -.act)
      :_  this
      ~[(~(poke pass:io /act) [our.bowl %portal-store] portal-action+vase)]
    ::
    =/  poke-msg  ~(poke pass:io /msg)
    ?+    -.act    `this
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
      :_  this
      [%pass [%get-group-preview /(scot %p ship.flag.act)/[term.flag.act]] %agent [ship.flag.act %groups] %watch path]~
      ::
        %get-docket
      =/  path  /treaty/(scot %p ship.act)/[desk.act]
      =/  wire  [%treaty (key-to-path:conv key.act)]
      ?:  (~(has by wex.bowl) [wire ship.act %portal-manager])
        ~&  "%portal-store: already subscribed to {(spud wire)}"
        [~ this]
      :_  this
      [%pass wire %agent [ship.act %treaty] %watch path]~
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
++  on-arvo   on-arvo:default
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
        ~[(fill-nonitem-app-data:portal-manager [our.bowl [%fill-nonitem-app key treaty]])]
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
