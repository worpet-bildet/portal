/-  *portal-data, *portal-action, *portal-message, groups
/+  default-agent, dbug, *portal, io=agentio, sig
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0
  $:  %0
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
  ?+    mark    (on-poke:default mark vase)
      %portal-action
    ?.  =(our.bowl src.bowl)  `this
    =/  act  !<(action vase)
    ::
    =/  act-set  %-  silt   ^-  (list term)
      ~[%add %edit %sub %del %add-to-default-list %overwrite-list %put-nonitem]
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
        %send-app-data
      =/  hash  .^(@uvI %cz /(scot %p our.bowl)/(scot %tas desk-name.act)/(scot %da now.bowl))
      =/  docket  .^(docket %cx /(scot %p our.bowl)/(scot %tas desk-name.act)/(scot %da now.bowl)/desk/docket-0)
      =/  cage  portal-message+!>([%send-app-data key.act hash docket])
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
      =/  wire  /groups/(scot %p ship.flag.act)/[term.flag.act]/preview
      :_  this
      [%pass /get-group-preview %agent [ship.flag.act %groups] %watch wire]~
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
      [%get-group-preview ~]
    ?+    -.sign    (on-agent:default wire sign)
        %watch-ack  `this
        %kick       `this
      ::
        %fact
      =/  preview  !<(preview:groups q.cage.sign)
      =/  act
        :*  %put-nonitem-group
          [p.flag.preview [%nonitem %group ~] q.flag.preview]
          title.meta.preview
          description.meta.preview
          image.meta.preview
        ==
      :_  this
      ~[(put-nonitem-group:portal-manager [our.bowl %.n act])]
    ==
  ==
::
++  on-fail   on-fail:default
--
