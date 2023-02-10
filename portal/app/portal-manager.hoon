/-  *portal-data, *portal-action, *portal-message, groups
/+  default-agent, dbug, *portal, *agentio, sig
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
  =/  groups-list-upd  (default-groups-list:make-update:portal-manager our.bowl now.bowl)
  =/  apps-list-upd  (default-apps-list:make-update:portal-manager our.bowl now.bowl)
  =/  ships-list-upd  (default-ships-list:make-update:portal-manager our.bowl now.bowl)
  =/  other-list-upd  (default-other-list:make-update:portal-manager our.bowl now.bowl)
  =/  list-list-upd  (default-list-list:make-update:portal-manager our.bowl now.bowl)
  =/  validity-store-upd  (default-validity-store:make-update:portal-manager our.bowl now.bowl)
  :_  this
  :~
    [%pass /add-valid %agent [our.bowl %portal-store] %poke %portal-update !>(validity-store-upd)]
    [%pass /add-groups %agent [our.bowl %portal-store] %poke %portal-update !>(groups-list-upd)]
    [%pass /add-apps %agent [our.bowl %portal-store] %poke %portal-update !>(apps-list-upd)]
    [%pass /add-ships %agent [our.bowl %portal-store] %poke %portal-update !>(ships-list-upd)]
    [%pass /add-others %agent [our.bowl %portal-store] %poke %portal-update !>(other-list-upd)]
    [%pass /add-cur %agent [our.bowl %portal-store] %poke %portal-update !>(list-list-upd)]
  ==
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
    ?-    -.act
        %add
      =/  upd  (add:make-update:portal-manager [our.bowl src.bowl now.bowl %.n act])
      :_  this
      [%pass /add %agent [our.bowl %portal-store] %poke %portal-update !>(upd)]~
    ::
        %edit
      =/  upd  (edit:make-update:portal-manager [our.bowl src.bowl now.bowl act])
      :_  this
      [%pass /edit %agent [our.bowl %portal-store] %poke %portal-update !>(upd)]~
    ::
        %sub
      =/  upd  (sub:make-update:portal-manager [our.bowl act])
      :_  this
      [%pass /sub %agent [our.bowl %portal-store] %poke %portal-update !>(upd)]~
    ::
        %del
      =/  upd  (del:make-update:portal-manager [our.bowl act])
      :_  this
      [%pass /del %agent [our.bowl %portal-store] %poke %portal-update !>(upd)]~
    ::
    ::
        %add-to-default-list
      =/  upd  (add-to-default-list:make-update:portal-manager our.bowl now.bowl act)
      :_  this
      [%pass /add-to-def-list %agent [our.bowl %portal-store] %poke %portal-update !>(upd)]~
    ::
        %overwrite-list
      =/  upd  (overwrite-list:make-update:portal-manager our.bowl now.bowl act)
      :_  this
      [%pass /overwrite-list %agent [our.bowl %portal-store] %poke %portal-update !>(upd)]~
    ::
    ::  TODO test local and foreign commenting (and all else)
    ::  how does scries work when you comment on a foreign item (do you need scries for that)
:: ovisi o: src, our, jel pointer na our ili na src
::  skontat kak da mogu cardove slat iz libraryja, da izgleda ljepse (da ne moram svugdje ?. radit)
        %comment
      :_  this
      [%pass /comment %agent [ship.key.act %portal-manager] %poke %portal-message !>(act)]~
    ::
        %edit-comment
      :_  this
      [%pass /edit-comment %agent [ship.key.act %portal-manager] %poke %portal-message !>(act)]~
    ::
        %del-comment
      :_  this
      [%pass /del-comment %agent [ship.key.act %portal-manager] %poke %portal-message !>(act)]~
    ::
        %rate
      :_  this
      [%pass /rate %agent [ship.key.act %portal-manager] %poke %portal-message !>(act)]~
    ::
        %unrate
      :_  this
      [%pass /unrate %agent [ship.key.act %portal-manager] %poke %portal-message !>(act)]~
    ::
        %review
      :_  this
      [%pass /review %agent [ship.key.act %portal-manager] %poke %portal-message !>(act)]~
    ::
        %del-review
      :_  this
      [%pass /del-review %agent [ship.key.act %portal-manager] %poke %portal-message !>(act)]~
    ::
        %sign-app
      =/  msg  [%sign-app key.act (sign:sig our.bowl now.bowl [%app key.act desk-name.act])]
      :_  this
      [%pass /sign-app %agent [ship.key.act %portal-manager] %poke %portal-message !>(msg)]~
    ::
        %send-app-data
      =/  hash  .^(@uvI %cz /(scot %p our.bowl)/(scot %tas desk-name.act)/(scot %da now.bowl))
      =/  docket  .^(docket %cx /(scot %p our.bowl)/(scot %tas desk-name.act)/(scot %da now.bowl)/desk/docket-0)
      :_  this
      [%pass /send-send-app-data %agent [ship.key.act %portal-manager] %poke %portal-message !>([%send-app-data key.act hash docket])]~
    ::
        %join-group
      ?.  ?=([%nonitem %group *] type.key.act)  `this
      :_  this
      [%pass /group-join %agent [our.bowl %groups] %poke %group-join !>([flag=[ship.key.act `@tas`cord.key.act] join-all=&])]~
    ::
        %get-group-preview
      :_  this
      [%pass /get-group-preview %agent [ship.flag.act %groups] %watch /groups/(scot %p ship.flag.act)/[term.flag.act]/preview]~
    ==
  ::
  ::  eventually should also be able to receive a message which can add/edit an item. with the right perms obviously
      %portal-message
    ::  ?<  =(src.bowl our.bowl)  -  make permissions later such that it is basically for foreign ships
    ::  even though we can send a message to ourselves
    =/  msg  !<(message vase)
    ::  ?>  =(our.bowl p:id:pointer:msg)  do I need to do this on every branch of switch statement?
    ?-    -.msg
        %comment
      =/  upd  (comment:make-update:portal-manager [our.bowl src.bowl now.bowl msg])
      :_  this
      [%pass /comment %agent [our.bowl %portal-store] %poke %portal-update !>(upd)]~
    ::
        %edit-comment
      =/  upd  (edit-comment:make-update:portal-manager [our.bowl src.bowl now.bowl msg])
      :_  this
      [%pass /edit-comment %agent [our.bowl %portal-store] %poke %portal-update !>(upd)]~
    ::
        %del-comment
      =/  upd  (del-comment:make-update:portal-manager [our.bowl src.bowl now.bowl msg])
      :_  this
      [%pass /del-comment %agent [our.bowl %portal-store] %poke %portal-update !>(upd)]~
    ::
        %rate
      =/  upd  (rate:make-update:portal-manager [our.bowl src.bowl now.bowl msg])
      :_  this
      [%pass /rate %agent [our.bowl %portal-store] %poke %portal-update !>(upd)]~
    ::
        %unrate
      =/  upd  (unrate:make-update:portal-manager [our.bowl src.bowl now.bowl msg])
      :_  this
      [%pass /unrate %agent [our.bowl %portal-store] %poke %portal-update !>(upd)]~
    ::
        %review
      =/  upd  (review:make-update:portal-manager [our.bowl src.bowl now.bowl msg])
      :_  this
      [%pass /review %agent [our.bowl %portal-store] %poke %portal-update !>(upd)]~
    ::
        %del-review
      =/  upd  (del-review:make-update:portal-manager [our.bowl src.bowl now.bowl msg])
      :_  this
      [%pass /del-review %agent [our.bowl %portal-store] %poke %portal-update !>(upd)]~
    ::
    ::  should assert/specify that can only receive signature from specific ship, as defined in link for %app items
    ::  for other types a different definition which ship can send an outside-sig
    ::  TODO look thru ++sig from app-store.hoon
        %sign-app
      =/  upd  (sign-app:make-update:portal-manager our.bowl src.bowl now.bowl msg)
      :_  this
      [%pass /sign-app %agent [ship.key.msg %portal-store] %poke %portal-update !>(upd)]~
    ::
    :: look thru ++data in app-store.hoon
    ::  needs a bunch of assertions etc. probably try to systematically figure out what needs to go where
        %send-app-data
      =/  upd  (send-app-data:make-update:portal-manager our.bowl src.bowl now.bowl msg)
      :_  this
      [%pass /send-app-data %agent [ship.key.msg %portal-store] %poke %portal-update !>(upd)]~
    ==
  ::
    ::  when %portal-store receives an update, sometimes it is necessary to notify portal manager
    ::  %portal-manager should receive all updates, whether we did them or somebody else.
    ::  then %portal-manager decides if it needs to do anything with it
    ::  maybe there should be more metadata except just the item itself?
      %portal-update
    ?.  =(our.bowl src.bowl)  `this
    =/  upd  !<(update vase)
    ?+    -.upd    (on-poke:default mark vase)
        %put
      :_  this
      (put:respond-to-update:portal-manager our.bowl now.bowl upd)
    ::
        %del
      :_  this
      (del:respond-to-update:portal-manager upd)
    ::
        %empty
      :_  this
      (empty:respond-to-update:portal-manager upd)
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
      =/  act  [%put-nonitem-group [p.flag.preview [%nonitem %group ~] q.flag.preview] title.meta.preview description.meta.preview image.meta.preview]
      =/  upd  (put-nonitem-group:make-update:portal-manager [our.bowl src.bowl now.bowl %.n act])
      :_  this
      [%pass /put-nonitem-group %agent [our.bowl %portal-store] %poke %portal-update !>(upd)]~
    ==
  ==
::
++  on-fail   on-fail:default
--