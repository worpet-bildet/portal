/-  *portal-data, *portal-update, *portal-front-end-update, *portal-message
/+  default-agent, dbug, *portal, *agentio
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0
  $:  %0
      =all-items
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
  =^  cards-1  all-items
    (validity-store:default:portal-store all-items our.bowl now.bowl)
  =^  cards-2  all-items
    (groups-list:default:portal-store all-items our.bowl now.bowl)
  =^  cards-3  all-items
    (apps-list:default:portal-store all-items our.bowl now.bowl)
  =^  cards-4  all-items
    (ships-list:default:portal-store all-items our.bowl now.bowl)
  =^  cards-5  all-items
    (other-list:default:portal-store all-items our.bowl now.bowl)
  =^  cards-6  all-items
    (list-list:default:portal-store all-items our.bowl now.bowl)
  :_  this
  (zing ~[cards-1 cards-2 cards-3 cards-4 cards-5 cards-6])
::
++  on-save  !>(state)
++  on-load
  |=  old=vase
  ^-  (quip card _this)
  `this(state !<(state-0 old))
::
::  all portal-action and portal-message go into portal-update
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?+    mark    (on-poke:default mark vase)
      %portal-action
    ?.  =(our.bowl src.bowl)  `this
    =/  act  `action`!<(action vase)
    ?+    -.act    (on-poke:default mark vase)
        %add
      =^  cards  all-items
        (add:on-action:portal-store [all-items our.bowl src.bowl now.bowl %.n act])
      [cards this]
      ::
        %add-with-time
      =^  cards  all-items
        (add-with-time:on-action:portal-store [all-items our.bowl src.bowl now.bowl act])
      [cards this]
      ::
        %edit
      =^  cards  all-items
        (edit:on-action:portal-store [all-items our.bowl src.bowl now.bowl act])
      [cards this]
      ::
        %edit-general
      =^  cards  all-items
        (edit-general:on-action:portal-store [all-items our.bowl src.bowl now.bowl act])
      [cards this]
      ::
        %sub
      :_  this
        (sub:on-action:portal-store [our.bowl src.bowl now.bowl wex.bowl act])
      ::
        %del
      =^  cards  all-items
        (del:on-action:portal-store [all-items our.bowl src.bowl now.bowl act])
      [cards this]
      ::
        %add-to-default-list
      =^  cards  all-items
        (add-to-default-list:on-action:portal-store all-items our.bowl now.bowl act)
      [cards this]
      ::
        %overwrite-list
      =^  cards  all-items
        (overwrite-list:on-action:portal-store all-items our.bowl now.bowl act)
      [cards this]
      ::
        %put-nonitem
      =^  cards  all-items
        (put-nonitem:on-action:portal-store all-items our.bowl src.bowl act)
      [cards this]
      ::
        %edit-docket
      =^  cards  all-items
        (edit-docket:on-action:portal-store all-items our.bowl src.bowl now.bowl act)
      [cards this]
      ::
        %add-item-to-list
      =^  cards  all-items
        (add-item-to-list:on-action:portal-store all-items our.bowl src.bowl now.bowl act)
      [cards this]
      ::
      ::  TODO probably after purge send nested-all-items to frontend
        %purge
      =^  cards  all-items
        (purge:portal-store [all-items our.bowl src.bowl now.bowl act])
      [cards this]
    ==
      %portal-message
    ?.  =(our.bowl src.bowl)  `this
    =/  msg  `message`!<(message vase)
    ?-    -.msg
        %comment
      =^  cards  all-items
        (comment:on-message:portal-store [all-items our.bowl src.bowl now.bowl msg])
      [cards this]
      ::
        %edit-comment
      =^  cards  all-items
        (edit-comment:on-message:portal-store [all-items our.bowl src.bowl now.bowl msg])
      [cards this]
      ::
        %del-comment
      =^  cards  all-items
        (del-comment:on-message:portal-store [all-items our.bowl src.bowl now.bowl msg])
      [cards this]
      ::
        %rate
      =^  cards  all-items
        (rate:on-message:portal-store [all-items our.bowl src.bowl now.bowl msg])
      [cards this]
      ::
        %unrate
      =^  cards  all-items
        (unrate:on-message:portal-store [all-items our.bowl src.bowl now.bowl msg])
      [cards this]
      ::
        %review
      =^  cards  all-items
        (review:on-message:portal-store [all-items our.bowl src.bowl now.bowl msg])
      [cards this]
      ::
        %del-review
      =^  cards  all-items
        (del-review:on-message:portal-store [all-items our.bowl src.bowl now.bowl msg])
      [cards this]
      ::
        %sign-app
      =^  cards  all-items
        (sign-app:on-message:portal-store [all-items our.bowl src.bowl now.bowl msg])
      [cards this]
    ==
  ==
::
++  on-arvo   on-arvo:default
::
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?:  =(path /all-items)
    :_  this
    [%give %fact ~ %portal-all-items !>(`^all-items`all-items)]~
  ::
  ?:  =(path /front-end-update)
    =/  vase  !>(`^nested-all-items`(all-items-to-nested:conv all-items))
    :_  this
    [%give %fact ~ %portal-nested-all-items vase]~
  ::
  =/  item  (~(gut by all-items) (path-to-key:conv path) ~)
  :_  this
  ?~  item  ~
  [%give %fact ~ %portal-update !>(`update`[%put key.bespoke.data.item item])]~
::
++  on-leave  on-leave:default
::
++  on-agent
  |=  [=wire =sign:agent:gall]
  ^-  (quip card _this)
  ?+    -.sign  (on-agent:default wire sign)
      %watch-ack
    ?~  p.sign
      ~&  "%portal-store: subscribe to {(spud wire)} succeeded"
      `this
    ~&  "%portal-store: subscribe to {(spud wire)} failed"
    `this
    ::
      %kick
    =/  key  (path-to-key:conv wire)
    ~&  "%portal-store: got kick from {(spud wire)}, resubscribing..."
    :_  this
    [%pass wire %agent [ship.key %portal-store] %watch wire]~
    ::
      %fact
    =/  key  (path-to-key:conv wire)
    =/  upd  !<(update q.cage.sign)
    ~&  "%portal-store: received update from {(spud wire)}"
    ?+    -.upd    `this
      ::
      ::  basically %init/%add/%edit
        %put
      =^  cards  all-items
        (put:on-agent:portal-store all-items our.bowl src.bowl upd)
      [cards this]
      ::
      ::  receiving a delete (distinct from unsubbing)
        %del
      =^  cards  all-items
        (del:on-agent:portal-store all-items our.bowl src.bowl upd)
      [cards this]
    ==
  ==
::
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  ?+    path    ``noun+!>(~)
    ::
      [%x %all %items ~]
    ``portal-all-items+!>(all-items)
    ::
      [%x %all %keys ~]
    ``portal-key-set+!>(~(key by all-items))
    ::
      [%x %all %nested ~]
    ``portal-nested-all-items+!>((all-items-to-nested:conv all-items))
    ::
      [%x %valid %latest *]
    =/  key  (path-to-key:conv t.t.t.path)
    ``portal-result+!>((get-latest:validator our.bowl now.bowl key))
    ::
      [%x %item %exists *]
    =/  key  (path-to-key:conv t.t.t.path)
    ``noun+!>((~(has by all-items) key))
    ::
      [%x %item %nested *]
    =/  key  (path-to-key:conv t.t.t.path)
    ?.  =([%list %list ~] type.key)  ``noun+!>(~)
    ``portal-nested-all-items+!>((all-items-to-nested-one-cur:conv key all-items))
    ::
      [%x %item *]
    =/  key  (path-to-key:conv t.t.path)
    =/  maybe-item  (~(gut by all-items) key ~)
    ?~  maybe-item  ``noun+!>(~)
    ``portal-item+!>(maybe-item)
    ::
      [%x %in-default-list *]
    =/  key  (path-to-key:conv t.t.path)
    =/  list
      ?:  =(-.type.key %list)
        (~(got by all-items) [our.bowl /list/list '~2000.1.1'])
      (~(got by all-items) [our.bowl [%list type.key] '~2000.1.1'])
    ``noun+!>((key-in-list-item:loob key list))
    ::
      [%x %subs %outgoing ~]
    ``portal-outgoing-subs+!>((boat-to-outgoing-subs:conv wex.bowl))
    ::
      [%x %subs %incoming ~]
    ``noun+!>(~)
  ==
  ::
++  on-fail   on-fail:default
--
