/-  *portal-data, *portal-message, portal-item
/+  default-agent, dbug, *portal, sss
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0
  $:  %0
      =items
  ==
+$  card  card:agent:gall
--
%-  agent:dbug
=/  sub-item  (mk-subs:sss portal-item ,[%item @ @ @ @ ~])
=/  pub-item  (mk-pubs:sss portal-item ,[%item @ @ @ @ ~])
=|  state-0
=*  state  -
^-  agent:gall
|_  =bowl:gall
+*  this      .
    default   ~(. (default-agent this %|) bowl)
    du-item  =/  du  (du:sss portal-item ,[%item @ @ @ @ ~])
      (du pub-item bowl -:!>(*result:du))
    da-item  =/  da  (da:sss portal-item ,[%item @ @ @ @ ~])
      (da sub-item bowl -:!>(*result:da) -:!>(*from:da) -:!>(*fail:da))
++  on-init
  ^-  (quip card _this)
  =.  state  *state-0
  =*  store-core  ~(. store [bowl items ~])
  =^  cards  sub-item
    (surf:da-item ~ronwex-naltyp-dilryd-mopreg %portal-store [%item %feed ~ronwex-naltyp-dilryd-mopreg '' 'global' ~])
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
  ::  TODO get it right in state transition  
  ::  (maybe not a problem if %create crashes on existing items)
  ?:  =(our.bowl ~ronwex-naltyp-dilryd-mopreg)  
    =/  global-feed-create  [%create ~ ~ `'global' `%global `[%feed ~] ~]
    =/  index-create  [%create ~ ~ `'index' `%def `[%collection '' '' '' ~] ~]
    =^  cards-4  items  (create:on-poke:store-core global-feed-create)
    =^  cards-5  pub-item  (give:du-item [%item %feed our.bowl '' 'global' ~] [%init (~(got by items) [%feed our.bowl '' 'global'])])
    =^  cards-6  items  (create:on-poke:store-core index-create)
    :_  this
    (zing ~[cards cards-1 cards-2 cards-3 cards-4 cards-5 cards-6])
  :_  this  
  (zing ~[cards cards-1 cards-2 cards-3])
::
++  on-save  !>([state pub-item sub-item])
++  on-load
  |=  old=vase
  ^-  (quip card _this)
  =/  old  !<([=state-0 =_pub-item =_sub-item] old)
  `this(state state-0.old, pub-item pub-item.old, sub-item sub-item.old)
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
      %sub-to-item
    =^  cards  sub-item
      (surf:da-item ~ronwex-naltyp-dilryd-mopreg %portal-store [%item ;;([@ @ @ @ ~] (key-to-path:conv key.act))])
    [cards this]
      ::
      %prepend-to-feed  
    =^  cards-1  items 
      (prepend-to-feed:on-poke:store act)
    ?:  =(time.key.act 'global')
      =^  cards-2  pub-item  (give:du-item [%item key.act] [%prepend-to-feed feed.act])
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
    =/  msg  !<(into:du-item (fled:sss vase))
    =^  cards  pub-item  (apply:du-item msg)
    [cards this]
    ::
      %sss-item
    =^  cards  sub-item  (apply:da-item !<(into:da-item (fled:sss vase)))
    [cards this]
    ::
      %sss-on-rock
    =/  msg  !<(from:da-item (fled:sss vase))
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
    [~ %sss %behn @ @ @ %item @ @ @ @ ~]  [(behn:da-item |3:wire) this]
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
        [~ %sss %on-rock @ @ @ %item @ @ @ @ ~]
      =.  sub-item  (chit:da-item |3:wire sign)
      `this
        [~ %sss %scry-request @ @ @ %item @ @ @ @ ~]
      =^  cards  sub-item  (tell:da-item |3:wire sign)
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
      [%item @ @ @ @ ~]  item+(~(gut by items) (path-to-key:conv t.path) ~)
    ::
      [%item-exists @ @ @ @ ~]  (~(has by items) (path-to-key:conv t.path))
    ::
      [%item-valid @ @ @ @]
    valid+(get-latest:validator our.bowl now.bowl (path-to-key:conv t.path))
  ==
  ::
++  on-fail   on-fail:default
--
