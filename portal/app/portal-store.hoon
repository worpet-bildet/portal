/-  *portal-data, *portal-message, portal-feed
/+  default-agent, dbug, *portal, sss
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
=/  sub-feed  (mk-subs:sss portal-feed ,[%feed ~])
=/  pub-feed  (mk-pubs:sss portal-feed ,[%feed ~])
=|  state-0
=*  state  -
^-  agent:gall
|_  =bowl:gall
+*  this      .
    default   ~(. (default-agent this %|) bowl)
    du-feed  =/  du  (du:sss portal-feed ,[%feed ~])
      (du pub-feed bowl -:!>(*result:du))
    da-feed  =/  da  (da:sss portal-feed ,[%feed ~])
      (da sub-feed bowl -:!>(*result:da) -:!>(*from:da) -:!>(*fail:da))
++  on-init
  ^-  (quip card _this)
  =.  state  *state-0
  =*  store-core  ~(. store [bowl items ~])
  =^  cards  sub-feed
    (surf:da-feed ~ronwex-naltyp-dilryd-mopreg %portal-store [%feed ~])
  ::  don't worry about putting everything in main collection?
  ::  we dont need a MAIN COLLECTION at all?
  ::  the ONLY(?) point of it is being able to share it with others easily
  =/  col-create  :*  %create  ~  ~  `'~2000.1.1'  `%def
    `[%collection 'Main Collection' 'Your first collection.' '' ~]  
    [%collection our.bowl '' '~2000.1.1']~  ==
  =/  val-create  :*  %create  ~  ~  `'~2000.1.1'  `%def
    `[%validity-store *validity-records]
    [%collection our.bowl '' '~2000.1.1']~  ==
  =/  feed-create  [%create ~ ~ `'~2000.1.1' `%personal `[%feed ~] ~]
  =^  cards-1  items  (create:on-poke:store-core col-create)
  =^  cards-2  items  (create:on-poke:store-core val-create)
  =^  cards-3  items  (create:on-poke:store-core feed-create)
  ::  TODO list of all items examples keys to see if there is a better way
  ::  to organize the naming structure
  ::  'global' and 'index' in time=cord feel weird
    ::  [%feed ~zod '' 'global']
    ::  [%collection ~zod '' 'index']
    ::  [%collection ~zod '' '~2000.1.1']
    ::  maybe switch convetion from '~2000.1.1' to e.g. 'default'
    ::  but then the time=cord label doesn't make sense
  ::  TODO get it right in state transition  
  ::  (maybe not a problem if %create crashes on existing items)
  ?:  =(our.bowl ~ronwex-naltyp-dilryd-mopreg)  
    =/  global-feed-create  [%create ~ ~ `'global' `%global `[%feed ~] ~]
    =/  index-create  [%create ~ ~ `'index' `%def `[%collection '' '' '' ~] ~]
    =^  cards-4  items  (create:on-poke:store-core global-feed-create)
    =^  cards-5  items  (create:on-poke:store-core index-create)
    :_  this
    (zing ~[cards cards-1 cards-2 cards-3 cards-4 cards-5])
  :_  this  
  (zing ~[cards cards-1 cards-2 cards-3])
::
::  SCRY TO GET TEMP APPS
::  .^((map desk [ship desk]) %gx /=hood=/kiln/sources/noun)
::  triggered on poke from the front end
::  scries (maybe subs) and makes a collection with our installed apps
::
++  on-save  !>([state pub-feed sub-feed])
++  on-load
  |=  old=vase
  ^-  (quip card _this)
  =/  old  !<([=state-0 =_pub-feed =_sub-feed] old)
  `this(state state-0.old, pub-feed pub-feed.old, sub-feed sub-feed.old)
  :: =/  items  items.old
  :: =/  index-key  [[[%collection ~] [%def ~]] our.bowl 'index']
  :: ?:  &(=(our.bowl ~ronwex-naltyp-dilryd-mopreg) !(~(has by items) index-key))
  ::   =/  act  [%add-with-time index-key [[%collection ~] '' '' '' ~]]
  ::   ::  rename add-with-time to add-with-cord?
  ::   =^  cards  items
  ::     (add-with-time:on-action:store [items our.bowl src.bowl now.bowl act])
  ::   [cards this(items items)]
::
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  =/  store  ~(. store [bowl items ~])
  ?+    mark    (on-poke:default mark vase)
      %portal-action
    ?.  =(our.bowl src.bowl)  `this
    =/  act  !<(action vase)
    ?+    -.act    (on-poke:default mark vase)
      %create  =^(cards items (create:on-poke:store act) [cards this])
      ::
      %replace  =^(cards items (replace:on-poke:store act) [cards this])
      ::
      %edit  =^(cards items (edit:on-poke:store act) [cards this])
      ::
      %sub  =^(cards items (sub:on-poke:store act) [cards this])
      ::
      %sub-to-feed
        =^  cards  sub-feed
         (surf:da-feed ~ronwex-naltyp-dilryd-mopreg %portal-store [%feed ~])
      [cards this]
      ::
      %prepend-to-feed  
    =^  cards-1  items 
      (prepend-to-feed:on-poke:store act)
    ::  TODO clarify 'global' nomenclature
    ?:  =(time.key.act 'global')
      =^  cards-2  pub-feed  (give:du-feed [%feed ~] [%prepend-to-feed feed.act])
      :_  this  (zing ~[cards-1 cards-2])
    [cards-1 this]
      ::
      %append  =^(cards items (append:on-poke:store act) [cards this])
      ::
      %prepend  =^(cards items (prepend:on-poke:store act) [cards this])
      ::
      %remove  =^(cards items (remove:on-poke:store act) [cards this])
      ::
      %delete  =^(cards items (delete:on-poke:store act) [cards this])
      ::
      %purge   =^(cards items (purge:on-poke:store act) [cards this])
    ==
    ::  no need for %portal-message
    ::
      %sss-to-pub
    =/  msg  !<(into:du-feed (fled:sss vase))
    =^  cards  pub-feed  (apply:du-feed msg)
    [cards this]
    ::
      %sss-feed
    =^  cards  sub-feed  (apply:da-feed !<(into:da-feed (fled:sss vase)))
    [cards this]
    ::
      %sss-on-rock
    =/  msg  !<(from:da-feed (fled:sss vase))
    :: ~?  ?=(^ rock.msg)
    ::   "last message from {<from.msg>} on {<src.msg>} is {<,.-.rock.msg>}"
    ?<  ?=([%crash *] rock.msg)
    ?~  wave.msg  `this
    `this

  ==
::
++  on-arvo 
  |=  [=wire sign=sign-arvo]
  ^-  (quip card:agent:gall _this)
  ?+  wire  `this
    [~ %sss %behn @ @ @ %feed ~]  [(behn:da-feed |3:wire) this]
  ==
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
  ?+    wire    (on-agent:default wire sign)
        [~ %sss *]
    ?>  ?=(%poke-ack -.sign)
    ?~  p.sign  `this
    %-  (slog u.p.sign)
    ?+    wire   `this
        [~ %sss %on-rock @ @ @ %feed ~]
      =.  sub-feed  (chit:da-feed |3:wire sign)
      `this
        [~ %sss %scry-request @ @ @ %feed ~]
      =^  cards  sub-feed  (tell:da-feed |3:wire sign)
      [cards this]
    ==
    ::
        [@ @ @ @ ~]
    ?+    -.sign  (on-agent:default wire sign)
        %fact
      =/  store  ~(. store [bowl items ~])
      =/  key  (path-to-key:conv wire)
      =/  upd  !<(update:item q.cage.sign)
      ~&  "%portal-store: received update from {(spud wire)}"
      =^  cards  items  (put:on-agent:store upd)
      [cards this]
    ==
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
    ::  TODO @ @ @
      [%item *]  item+(~(gut by items) (path-to-key:conv t.path) ~)
    ::  TODO @ @ @
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
