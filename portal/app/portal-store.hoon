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
    =/  upd  `update`!<(update vase)
    ?+    -.upd    `this
        %put
      =/  new  (put-item:portal-store our.bowl all-items upd)
      :_  this(all-items new)
      :~
        [%pass /put %agent [our.bowl %portal-manager] %poke %portal-update !>(upd)]
        [(fact [%portal-update !>(upd)] [(pointer-to-sub-path:conv [%.y id.meta-data.item.upd])]~)]
      ==
    ::
        %del
      =^  changed  all-items  (del-item:portal-store src.bowl our.bowl all-items upd)
      ~&  "%portal-store: unsubscribing from {(pointer-to-sub-path:conv pointer.upd)}"
      :_  this
      :~
        [%pass /del %agent [our.bowl %portal-manager] %poke %portal-update !>(upd)]
        [(fact [%portal-update !>(upd)] [(pointer-to-sub-path:conv pointer.upd)]~)]
        [%pass (pointer-to-sub-path:conv pointer.upd) %agent [p.id.pointer.upd %portal-store] %leave ~]
      ==
    ::
    ::  you can only sub to /0/ pointers
        %sub
      =/  wire  (pointer-to-sub-path:conv pointer.upd)
      ~&  "%portal-store: subscribing to {wire}"
      :_  this
      [%pass wire %agent [p.id.pointer.upd %portal-store] %watch wire]~
    ::
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
  ?:  =(path /nested-all-items)
    :_  this
    [%give %fact ~ %portal-nested-all-items !>(`^nested-all-items`(all-items-to-nested:conv our.bowl now.bowl))]~
  =/  item  (~(gut by all-items) (sub-path-to-pointer:conv path) ~)
  :_  this
  ?~  item
    [%give %fact ~ %portal-update !>(`update`[%empty-init ~])]~
  [%give %fact ~ %portal-update !>(`update`[%put item])]~
::
++  on-leave  on-leave:default
::
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
    =/  pointer  (sub-path-to-pointer:conv wire)
    ~&  "%portal-store: got kick from {wire}, resubscribing..."
    :_  this
    [%pass wire %agent [p.id.pointer %portal-store] %watch wire]~
  ::
      %fact
    =/  pointer  (sub-path-to-pointer:conv wire)
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
  ?:  =(path [%x %all %nested ~])
    ``nested-all-items+!>((all-items-to-nested:conv our.bowl now.bowl))
  ::
  ::  jel mogu pattern match, e.g. [%x %0 *]?
  =/  pointer  (sub-path-to-pointer:conv +.path)
  =/  maybe-item  (~(get by all-items) pointer)
  ?~  maybe-item  ``noun+!>(~)
  ``item+!>(u.maybe-item)
  ::==
  ::
++  on-fail   on-fail:default
--
