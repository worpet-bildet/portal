/-  *portal-data, *portal-update, *portal-front-end-update, *portal-message
/+  default-agent, dbug, *portal, *agentio
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0
  $:  %0
      =items
  ==
::  TODO state-transition
::  how to do it if variable name is same (items) but state is diff?
::  probably should have old items still defined
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
  =^  cards-1  items
    (validity-store:default:store items our.bowl now.bowl)
  =^  cards-2  items
    (simple-list:default:store items our.bowl now.bowl)
  =^  cards-3  items
    (list-list:default:store items our.bowl now.bowl)
  =/  index-key  [our.bowl [%list ~] 'index']
  ?:  &(=(our.bowl ~worpet-bildet) !(~(has by items) index-key))
    =/  act  [%add-with-time index-key *general [%list ~]]
    =^  cards-4  items
      (add-with-time:on-action:store [items our.bowl src.bowl now.bowl act])
    :_  this
    (zing ~[cards-1 cards-2 cards-3 cards-4])
  :_  this
  (zing ~[cards-1 cards-2 cards-3])
::
++  on-save  !>(state)
++  on-load
  |=  old=vase
  ^-  (quip card _this)
  =/  old  !<(state-0 old)
  =/  items  items.old
  =/  index-key  [our.bowl [%list ~] 'index']
  ?:  &(=(our.bowl ~worpet-bildet) !(~(has by items) index-key))
    =/  act  [%add-with-time index-key *general [%list ~]]
    ::  rename add-with-time to add-with-cord?
    =^  cards  items
      (add-with-time:on-action:store [items our.bowl src.bowl now.bowl act])
    [cards this(items items)]
  `this(state old)
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
      =^  cards  items
        (add:on-action:store [items our.bowl src.bowl now.bowl %.n act])
      [cards this]
      ::
        %add-with-time
      =^  cards  items
        (add-with-time:on-action:store [items our.bowl src.bowl now.bowl act])
      [cards this]
      ::
        %edit
      =^  cards  items
        (edit:on-action:store [items our.bowl src.bowl now.bowl act])
      [cards this]
      ::
        %sub
      :_  this
        (sub:on-action:store [our.bowl src.bowl now.bowl wex.bowl act])
      ::
        %del
      =^  cards  items
        (del:on-action:store [items our.bowl src.bowl now.bowl act])
      [cards this]
      ::
        %add-to-default-list
      =^  cards  items
        (add-to-default-list:on-action:store items our.bowl now.bowl act)
      [cards this]
      ::
        %put-nonitem
      =^  cards  items
        (put-nonitem:on-action:store items our.bowl src.bowl act)
      [cards this]
      ::
        %edit-docket
      =^  cards  items
        (edit-docket:on-action:store items our.bowl src.bowl now.bowl act)
      [cards this]
      ::
        %add-item-to-list
      =^  cards  items
        (add-item-to-list:on-action:store items our.bowl src.bowl now.bowl act)
      [cards this]
      ::
        %purge
      =^  cards  items
        (purge:store [items our.bowl src.bowl now.bowl act])
      [cards this]
    ==
      %portal-message
    ?.  =(our.bowl src.bowl)  `this
    =/  msg  `message`!<(message vase)
      =^  cards  items
        (index-as-curator:on-message:store [items our.bowl src.bowl now.bowl msg])
      [cards this]
  ==
::
++  on-arvo   on-arvo:default
::
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?:  =(path /items)
    :_  this
    [%give %fact ~ %portal-items !>(`^items`items)]~
  ::
  ?:  =(path /front-end-update)
    :_  this
    [%give %fact ~ %portal-items !>(`^items`items)]~
  ::
  =/  item  (~(gut by items) (path-key-to-key:conv path) ~)
  :_  this
  ?~  item  ~
  [%give %fact ~ %portal-update !>(`update`[%put key.item item])]~
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
    =/  key  (path-key-to-key:conv wire)
    ~&  "%portal-store: got kick from {(spud wire)}, resubscribing..."
    :_  this
    [%pass wire %agent [ship.key %portal-store] %watch wire]~
    ::
      %fact
    =/  key  (path-key-to-key:conv wire)
    =/  upd  !<(update q.cage.sign)
    ~&  "%portal-store: received update from {(spud wire)}"
    ?+    -.upd    `this
      ::
      ::  basically %init/%add/%edit
        %put
      =^  cards  items
        (put:on-agent:store items our.bowl src.bowl upd)
      [cards this]
      ::
      ::  receiving a delete (distinct from unsubbing)
        %del
      =^  cards  items
        (del:on-agent:store items our.bowl src.bowl upd)
      [cards this]
    ==
  ==
::
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  ?+    path    ``noun+!>(~)
    ::
      [%x %items ~]
    ``portal-store-result+!>([%items items])
    ::
      [%x %keys ~]
    ``portal-store-result+!>([%keys ~(key by items)])
    ::
      [%x %item @ @ @ ~]
    ~&  i.t.t.path
    ~&  i.t.t.t.path
    ~&  i.t.t.t.t.path
    ::=/  sh  `ship`(slav %p i.t.t.t.path)
    ::~&  `store-result`[%ship i.t.t.t.path]
    ``portal-store-result+!>(%.y)

    :: =/  key  (path-to-key:conv t.t.t.path)
    :: ``portal-store-result+!>((~(has by items) key))
    ::
      [%x %item *]
    =/  key  (path-key-to-key:conv t.t.path)
    =/  maybe-item  (~(gut by items) key ~)
    ?~  maybe-item  ``noun+!>(~)
    ``portal-item+!>(maybe-item)
    ::
      [%x %in-default-list *]
    =/  key  (path-key-to-key:conv t.t.path)
    =/  list
      ?:  =(-.type.key %list)
        (~(got by items) [our.bowl [%list %list ~] '~2000.1.1'])
      (~(got by items) [our.bowl [%list ~] '~2000.1.1'])
    ``noun+!>((key-in-list-item:loob key list))
    ::
      [%x %subs %outgoing ~]
    ``portal-outgoing-subs+!>((boat-to-outgoing-subs:conv wex.bowl))
    ::
      [%x %subs %incoming ~]
    ``noun+!>(~)
    ::
      [%x %valid %latest *]
    =/  key  (path-key-to-key:conv t.t.t.path)
    ``portal-v-result+!>((get-latest:validator our.bowl now.bowl key))
  ==
  ::
++  on-fail   on-fail:default
--
