/-  *portal-data, *portal-update, *portal-front-end-update
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
        [(fact [%portal-update !>(upd)] [(key-to-sub-path:conv key.upd)]~)]
        [%give %fact [/front-end-update]~ %portal-front-end-update !>([%put key.upd])]
      ==
    ::
        %del
      =^  changed  all-items  (del-item:portal-store src.bowl our.bowl all-items upd)
      ~&  "%portal-store: unsubscribing from {(key-to-sub-path:conv key.upd)}"
      :_  this
      :~
        [%pass /del %agent [our.bowl %portal-manager] %poke %portal-update !>(upd)]
        [(fact [%portal-update !>(upd)] [(key-to-sub-path:conv key.upd)]~)]
        [%pass (key-to-sub-path:conv key.upd) %agent [ship.key.upd %portal-store] %leave ~]
        [%give %fact [/front-end-update]~ %portal-front-end-update !>([%put key.upd])]
      ==
    ::
    ::  you can only sub to /0/ pointers
        %sub
      =/  wire  (key-to-sub-path:conv key.upd)
      ~&  "%portal-store: subscribing to {wire}"
      :_  this
      [%pass wire %agent [ship.key.upd %portal-store] %watch wire]~
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
  ?:  =(path /front-end-update)
    ::~&  (all-items-to-nested:conv our.bowl now.bowl)
    :_  this
    [%give %fact ~ %portal-nested-all-items !>(`^nested-all-items`(all-items-to-nested:conv our.bowl now.bowl))]~
  =/  item  (~(gut by all-items) (sub-path-to-key:conv path) ~)
  :_  this
  ?~  item
    [%give %fact ~ %portal-update !>(`update`[%empty-init ~])]~
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
      ~&  "%portal-store: subscribe to {wire} succeeded"
      `this
    ~&  "%portal-store: subscribe to {wire} failed"
    `this
  ::
      %kick
    =/  key  (sub-path-to-key:conv wire)
    ~&  "%portal-store: got kick from {wire}, resubscribing..."
    :_  this
    [%pass wire %agent [ship.key %portal-store] %watch wire]~
  ::
      %fact
    =/  key  (sub-path-to-key:conv wire)
    =/  upd  !<(update q.cage.sign)
    ~&  "%portal-store: received update from {wire}"
    ?+    -.upd    `this
        %empty-init
      ~&  "%portal-store: item doesn't exist"
      :_  this
      [%pass /empty-init %agent [our.bowl %portal-manager] %poke %portal-update !>(upd)]~
      ::
      ::  basically %init/%add/%edit
        %put
      =/  new  (put-item:portal-store our.bowl all-items upd)
      :_  this(all-items new)
      :~
      [%pass /put %agent [our.bowl %portal-manager] %poke %portal-update !>(upd)]
      [%give %fact [/front-end-update]~ %portal-front-end-update !>([%put key.upd])]
      ==
    ::
    ::  receiving a delete (distinct from unsubbing)
        %del
      =^  changed  all-items  (del-item:portal-store src.bowl our.bowl all-items upd)
      :_  this
      :~
      [%pass /del %agent [our.bowl %portal-manager] %poke %portal-update !>(upd)]
      [%give %fact [/front-end-update]~ %portal-front-end-update !>([%del key.upd])]
      ==
    ==
  ==
::
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  ::  maybe add all-item-paths scry?
  ?+    path    !!
  ::
      [%x %all %items ~]
    ``all-items+!>(all-items)
  ::
      [%x %all %keys ~]
    ``key-set+!>(~(key by all-items))
  ::
      [%x %all %nested ~]
    ``nested-all-items+!>((all-items-to-nested:conv our.bowl now.bowl))
  ::
  ::  TODO
      [%x %valid %latest @ @ @ @ ~]
    =/  key  (sub-path-to-key:conv t.t.t.path)
    ``noun+!>((get-latest:validator our.bowl now.bowl key))
  ::
      [%x %item *]
    =/  key  (sub-path-to-key:conv t.t.path)
    =/  maybe-item  (~(get by all-items) key)
    ?~  maybe-item  ``noun+!>(~)
    ``item+!>(u.maybe-item)
  ==
  ::
++  on-fail   on-fail:default
--
