/-  *portal-data, *portal-update
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
      %portal-update
    ?>  =(our.bowl src.bowl)
    =/  upd  !<(update vase)
    ?+    -.upd    `this
    ::  TODO printove popravit tu i u libu da da kazu title a ne samo pointer
        %put
      =/  new  (put-item:portal-store our.bowl all-items upd)
      :_  this(all-items new)
      ::  figure out how to make -.-.+.upd into id.hard-data.item.upd
      :~
        [%pass /put %agent [our.bowl %portal-manager] %poke %portal-update !>(upd)]
        [(fact [%portal-update !>(upd)] [(pointer-to-path:helper-arms [%.y -.+.upd])]~)]
      ==
    ::
        %del
      =^  changed  all-items  (del-item:portal-store src.bowl our.bowl all-items upd)
      ::  figure out how to make +.upd into pointer.upd
      ~&  "%portal-store: unsubscribing from {(pointer-to-path:helper-arms pointer.upd)}"
      ::  few cases
      ::  if it's our item and others are subbed to us - and we are subbed to ourselves
      ::                                               - and we are not subbed to outselves
      ::  sometimes you del a non existing item. do you send update then?
      ::  is it a problem if you redundantly send a leave? even if you are not subbed to yourself?
      :_  this
      :~
        [%pass /del %agent [our.bowl %portal-manager] %poke %portal-update !>(upd)]
        [(fact [%portal-update !>(upd)] [(pointer-to-path:helper-arms +.upd)]~)]
        [%pass (pointer-to-path:helper-arms +.upd) %agent [p.id.pointer.upd %portal-store] %leave ~]
      ==
    ::
    ::  you can only sub to /0/ pointers
    ::  ONLY /0/ POINTERS ALLOWED IN ALL-ITEMS  ->  needs to be enforced somewhere?
    ::  wire equals path
    ::  maybe if we allow sub to yourself we get some nice properties later?
        %sub
      =/  wire  (pointer-to-path:helper-arms pointer.upd)
      ~&  "%portal-store: subscribing to {wire}"
      :_  this
      [%pass wire %agent [p.id.pointer.upd %portal-store] %watch wire]~
    ::
    ::  if something stops being in your %curated, then everyone who is subscribed to that
    ::  autoupdates their subscriptions to match your list of recommended e.g. apps
    ::  or they dont have to unsub and its okay to stay subbed to those items?
    ::  there will probably accumulate too many items. and we want to keep it clean
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
  =/  item  (~(gut by all-items) (path-to-pointer:helper-arms path) ~)
  :_  this
  ?~  item
    [%give %fact ~ %portal-update !>(`update`[%empty-init ~])]~
  [%give %fact ~ %portal-update !>(`update`[%put item])]~
::
++  on-leave  on-leave:default
::
::  TODO fix prints with {wire}
::  TODO  annotate code everywhere with comments
++  on-agent
  |=  [=wire =sign:agent:gall]
  ^-  (quip card _this)
  ?+    -.sign  (on-agent:default wire sign)
      %watch-ack
    ?~  p.sign
      ~&  "%portal-store: subscribe to {wire} succeeded"
      `this
    ~&  "%portal-store: subscribe to {wire} failed"
    `this
  ::
      %kick
    =/  pointer  (path-to-pointer:helper-arms wire)
    ~&  "%portal-store: got kick from {wire}, resubscribing..."
    :_  this
    [%pass wire %agent [p.id.pointer %portal-store] %watch wire]~
  ::
      %fact
    =/  pointer  (path-to-pointer:helper-arms wire)
    =/  upd  !<(update q.cage.sign)
    ~&  "%portal-store: received update from {wire}"
    ?+    -.upd    `this
        %empty-init
      ~&  "%portal-store: item doesn't exist"
      :_  this
      :~
        [%pass /empty-init %agent [our.bowl %portal-manager] %poke %portal-update !>(upd)]
        [%pass wire %agent [p.id.pointer %portal-store] %leave ~]
      ==
      ::
      ::  basically %init/%add/%edit
        %put
      =/  new  (put-item:portal-store our.bowl all-items upd)
      :_  this(all-items new)
      [%pass /put %agent [our.bowl %portal-manager] %poke %portal-update !>(upd)]~
    ::
    ::  receiving a delete (distinct from unsubbing)
        %del
      =^  changed  all-items  (del-item:portal-store src.bowl our.bowl all-items upd)
      :_  this
      [%pass /del %agent [our.bowl %portal-manager] %poke %portal-update !>(upd)]~


    ==
  ==
::
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  ::  maybe add all-paths scry?
  ?:   =(path [%x %all %items ~])
    ``all-items+!>(all-items)
  ?:  =(path [%x %all %pointers ~])
    ``pointer-set+!>(~(key by all-items))

  ::?+    path    (on-peek:default path)
  ::  jel mogu pattern match, e.g. [%x %0 *]?
    =/  pointer  (path-to-pointer:helper-arms +.path)
    =/  maybe-item  (~(get by all-items) pointer)
    ?~  maybe-item  ``noun+!>(~)
    ``item+!>(u.maybe-item)
  ::==
::=sur -build-file /=portal=/sur/portal/data/hoon
  ::


::.^(item:sur %gx /=portal-store=/0/~zod/~2023.1.21..21.25.50..88d0/other/item)
::
++  on-fail   on-fail:default
--
