/-  *portal-data, *portal-message
/+  default-agent, dbug, *portal
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
  =*  store-core  ~(. store [bowl items ~])
  =/  col-create  :*  %create  ~  ~  `'~2000.1.1'  `[%def ~]
    `[[%collection ~] 'Main Collection' 'Your first collection.' '' ~]  
    `[[%collection ~] our.bowl '' '~2000.1.1']  ==
  =/  val-create  :*  %create  ~  ~  `'~2000.1.1'  `[%def ~]
    `[[%validity-store ~] *validity-records]
    `[[%collection ~] our.bowl '' '~2000.1.1']  ==
  =^  cards-1  items  (create:on-act:on-poke:store-core col-create)
  =^  cards-2  items  (create:on-act:on-poke:store-core val-create)
  :_  this  
  (zing ~[cards-1 cards-2])
  :: =/  index-key  [[[%collection ~] [%def ~]] our.bowl 'index']
  :: ?:  &(=(our.bowl ~worpet-bildet) !(~(has by items) index-key))
  ::   =/  act  [%add-with-time index-key [[%collection ~] '' '' '' ~]]
  ::   =^  cards-3  items
  ::     (add-with-time:on-action:store [items our.bowl src.bowl now.bowl act])
  ::   :_  this
  ::   (zing ~[cards-1 cards-2 cards-3])
::
::
::  SCRY TO GET TEMP APPS
::  .^((map desk [ship desk]) %gx /=hood=/kiln/sources/noun)
::  triggered on poke from the front end
::  scries (maybe subs) and makes a collection with our installed apps
::
++  on-save  !>(state)
++  on-load
  |=  old=vase
  ^-  (quip card _this)
  =/  old  !<(state-0 old)
  `this(state old)
  :: =/  items  items.old
  :: =/  index-key  [[[%collection ~] [%def ~]] our.bowl 'index']
  :: ?:  &(=(our.bowl ~worpet-bildet) !(~(has by items) index-key))
  ::   =/  act  [%add-with-time index-key [[%collection ~] '' '' '' ~]]
  ::   ::  rename add-with-time to add-with-cord?
  ::   =^  cards  items
  ::     (add-with-time:on-action:store [items our.bowl src.bowl now.bowl act])
  ::   [cards this(items items)]
::
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?.  =(our.bowl src.bowl)  `this
  =/  store  ~(. store [bowl items ~])
  ?+    mark    (on-poke:default mark vase)
      %portal-action
    =/  act  !<(action vase)
    ?+    -.act    (on-poke:default mark vase)
      %create  =^(cards items (create:on-act:on-poke:store act) [cards this])
      ::
      %replace  =^(cards items (replace:on-act:on-poke:store act) [cards this])
      ::
      %edit  =^(cards items (edit:on-act:on-poke:store act) [cards this])
      ::
      %sub  =^(cards items (sub:on-act:on-poke:store act) [cards this])
      ::
      %append  =^(cards items (append:on-act:on-poke:store act) [cards this])
      ::
      %prepend  =^(cards items (prepend:on-act:on-poke:store act) [cards this])
      ::
      %remove  =^(cards items (remove:on-act:on-poke:store act) [cards this])
      ::
      %delete  =^(cards items (delete:on-act:on-poke:store act) [cards this])
      ::
      ::   %purge
      :: =^  cards  items
      ::   (purge:store [items our.bowl src.bowl now.bowl act])
      :: [cards this]
    ==
      %portal-message  `this
    :: ?.  =(our.bowl src.bowl)  `this
    :: =/  msg  `message`!<(message vase)
    ::   =^  cards  items
    ::     (index-as-curator:on-message:store [items our.bowl src.bowl now.bowl msg])
    ::   [cards this]
  ==
::
++  on-arvo   on-arvo:default
::
++  on-watch  ::  should it return items on initial sub?
  |=  =path
  ^-  (quip card _this)
  ?:  =(path /updates)  `this
  =/  item  (~(gut by items) (path-to-key:conv path) ~)
  :_  this
  ?~  item  ~
  [%give %fact ~ %portal-update !>(item)]~

::
++  on-leave  on-leave:default
::
++  on-agent
  |=  [=wire =sign:agent:gall]
  ^-  (quip card _this)
  ?+    -.sign  (on-agent:default wire sign)
      %fact
    =/  store  ~(. store [bowl items ~])
    =/  key  (path-to-key:conv wire)
    =/  upd  !<(update:item q.cage.sign)
    ~&  "%portal-store: received update from {(spud wire)}"
    =^  cards  items  (put:on-agent:store upd)
    [cards this]
  ==
::
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  ?:  |(?=(~ path) !=(%x i.path) ?=(~ t.path))  !!
  :^  ~  ~  %portal-store-result
  !>  ^-  store-result
  =/  path  t.path
  ?+    path    ~|("unexpected scry into {<dap.bowl>} on path {<path>}" !!)
    ::
      [%items ~]  items+items
    ::
      [%keys ~]  keys+~(key by items)
    ::
    ::  TODO maybe s+'"/a/'/a/b'/c"' would work?
      [%item *]  item+(~(gut by items) (path-to-key:conv t.path) ~)
    ::
    ::  /item-exists/[ship]/'[type]'/'[cord]'
      [%item-exists *]  (~(has by items) (path-to-key:conv t.path))
    ::
    ::  /in-list/[list-ship]/'[list-type]'/'[list-cord]/'[ship]/'[type]'/'[cord]'
    ::   [%in-list @ @ @ @ @ @ ~]
    :: =/  item-key  (path-to-key:conv t.t.t.t.path)
    :: =/  list  =-  (~(gut by items) - ~)
    ::   (path-to-key:conv [i.t.path i.t.t.path i.t.t.t.path ~])
    :: ?~(list %.n (key-in-collection:loob item-key list))
    ::
    ::  /item-valid/[ship]/'[type]'/'[cord]'
      [%item-valid *]
    valid+(get-latest:validator our.bowl now.bowl (path-to-key:conv t.path))
  ==
  ::
++  on-fail   on-fail:default
--
