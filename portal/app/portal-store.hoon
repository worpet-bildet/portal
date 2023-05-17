/-  *portal-data, *portal-message, portal-item, portal-data-0
/+  default-agent, dbug, *portal, sss
=/  item-sub  (mk-subs:sss portal-item ,[%item @ @ @ @ ~])
=/  item-pub  (mk-pubs:sss portal-item ,[%item @ @ @ @ ~])
|%
+$  versioned-state
  $%  state-0
      state-1
  ==
+$  state-0
  $:  %0
      =all-items:portal-data-0
  ==
+$  state-1
  $:  %1
      =items
      =_item-sub
      =_item-pub
  ==
+$  card  card:agent:gall
--
%-  agent:dbug
=|  state-1
=*  state  -
^-  agent:gall
=<
|_  =bowl:gall
+*  this      .
    default   ~(. (default-agent this %|) bowl)
    stor      ~(. +> bowl)
    du-item   =/  du  (du:sss portal-item ,[%item @ @ @ @ ~])
              (du item-pub bowl -:!>(*result:du))
    da-item   =/  da  (da:sss portal-item ,[%item @ @ @ @ ~])
              (da item-sub bowl -:!>(*result:da) -:!>(*from:da) -:!>(*fail:da))
++  on-init
  ^-  (quip card _this)
  =.  state  *state-1
  =^  cards  item-sub
    (surf:da-item ~worpet-bildet %portal-store [%item %feed '~worpet-bildet' '' 'global' ~])
  =/  col-create  :*  %create  ~  ~  `'~2000.1.1'  `%def
    `[%collection 'Main Collection' 'Your first collection.' '' ~]
    [%collection our.bowl '' '~2000.1.1']~  ~  ==
  =/  val-create  :*  %create  ~  ~  `'~2000.1.1'  `%def
    `[%validity-store *validity-records]  ~  ~  ==
  =/  feed-create  [%create ~ ~ `'~2000.1.1' `%personal `[%feed ~] ~ ~]
  =^  cards-1  state  (create:handle-poke:stor col-create)
  =^  cards-2  state  (create:handle-poke:stor val-create)
  =^  cards-3  state  (create:handle-poke:stor feed-create)
  :: ::  TODO get it right in state transition
  :: ::  (maybe not a problem if %create crashes on existing items)
  ?:  =(our.bowl ~worpet-bildet)
    =/  global-feed-create  [%create ~ ~ `'global' `%global `[%feed ~] ~ ~]
    =/  index-create  [%create ~ ~ `'index' `%def `[%collection '' '' '' ~] ~ ~]
    =^  cards-4  state  (create:handle-poke:stor global-feed-create)
    =^  cards-5  state  (create:handle-poke:stor index-create)
    :_  this
    (zing ~[cards cards-1 cards-2 cards-3 cards-4 cards-5 cards-5])
  :_  this
  (zing ~[cards cards-1 cards-2 cards-3]):: cards-2 cards-3])
::
++  on-save  !>(state)
++  on-load
  |=  =vase
  ^-  (quip card _this)
  =/  old  !<(versioned-state vase)
  ?:  ?=(%1 -.old)
    ::state empty, old full
    =.  state  old
    =+  ~(val by items.state)
    =^  cards  state
      %-  tail  %^  spin  -  [*(list card) state]
      |=  [=item q=[cards=(list card) state=state-1]]
      :-  item
      =.  state  state.q
      =^  cards  item-pub.state.q  
        (give:du-item [%item (key-to-path:conv key.item)] [%whole item])
      [(welp cards.q cards) state.q]
    [cards this]
  ?>  ?=(%0 -.old)
  =-  =.  state  (state-0-to-1.- old)
  =/  feed-create  [%create ~ ~ `'~2000.1.1' `%personal `[%feed ~] ~ ~]
  =^  cards  state  (create:handle-poke:stor feed-create)
  =^  cards-1  item-sub
    (surf:da-item ~worpet-bildet %portal-store [%item %feed '~worpet-bildet' '' 'global' ~])
  ?:  =(our.bowl ~worpet-bildet)
    =/  global-feed-create  [%create ~ ~ `'global' `%global `[%feed ~] ~ ~]
    =^  cards-2  state  (create:handle-poke:stor global-feed-create)
    [;:(welp cards cards-1 cards-2) this]
  [(welp cards cards-1) this]
  |%
  ++  state-0-to-1
    |=  =state-0
    ^-  state-1
    =+  ~(tap by all-items.state-0)
    =/  new-items  ^-  ^items  %-  malt  %+  murn  -
      |=  [key-0=key:portal-data-0 item-0=item:portal-data-0]
      (key-item-0-to-1 key-0 item-0)
    =/  s1  *state-1
    s1(items new-items)
  ::
  ++  key-item-0-to-1
    |=  [key-0=key:portal-data-0 item-0=item:portal-data-0]
    ^-  (unit [key item])
    ?:  !=(our.bowl ship.key-0)
      ~
    ?:  ?=(%nonitem -.type.key-0)
      ~
    ?:  ?=([%enditem %other ~] type.key-0)
      =/  key  [%other our.bowl '' cord.key-0]
      =/  lens  %def
      =/  bespoke  :*  %other
                       title.general.data.item-0
                       description.general.data.item-0
                       link.general.data.item-0
                       image.general.data.item-0
                   ==
      =/  meta  [cord.key-0 (scot %da now.bowl) ~ [%public ~]]
      =/  sig  (sign:sig our.bowl now.bowl [%item key lens bespoke meta])
      (some [key [key lens bespoke meta sig]])
    ?:  ?=([%validity-store *] bespoke.data.item-0)
      =/  key  [%validity-store our.bowl '' cord.key-0]
      =/  lens  %def
      =/  bespoke  [%validity-store *validity-records]
      =/  meta  [cord.key-0 (scot %da now.bowl) ~ [%public ~]]
      =/  sig  (sign:sig our.bowl now.bowl [%item key lens bespoke meta])
      (some [key [key lens bespoke meta sig]])
    ?:  =(key-0 [our.bowl [%list %enditem %other ~] '~2000.1.2'])
      ~
    ?:  ?=([%list *] type.key-0)
      =/  list-key-conv
        |=  key-0=[=ship type=[%list *] =cord]
        ?.  =(cord.key-0 '~2000.1.1')
          [%collection our.bowl '' cord.key-0]
        ?+    type.key-0    !!  :: what to do as default?
            [%list %app ~]
          [%collection our.bowl '' (scot %da now.bowl)]
            [%list %nonitem %group ~]
          [%collection our.bowl '' (crip (weld (scow %da now.bowl) ".0001"))]
            [%list %nonitem %ship ~]
          [%collection our.bowl '' (crip (weld (scow %da now.bowl) ".0002"))]
            [%list %enditem %other ~]
          [%collection our.bowl '' (crip (weld (scow %da now.bowl) ".0003"))]
            [%list %list ~]
          [%collection our.bowl '' '~2000.1.1']
        ==
      =/  key  (list-key-conv key-0)
      =/  meta  [cord.key-0 (scot %da now.bowl) ~ [%public ~]]  ::  CORD? if ~2000.1.1
      =/  lens  %def
      =/  bespoke
        :*  %collection
            title.general.data.item-0
            description.general.data.item-0
            image.general.data.item-0
            ?+    -.bespoke.data.item-0    !!
                %list-nonitem-group
              %+  turn  group-key-list.bespoke.data.item-0
              |=  [key=[=ship type=[%nonitem %group ~] time=cord] text=cord]
              [%group ship.key time.key '']
              ::
                %list-nonitem-ship
              %+  turn  ship-key-list.bespoke.data.item-0
              |=  [key=[=ship type=[%nonitem %ship ~] time=cord] text=cord]
              [%ship ship.key '' '']
              ::
                %list-app
              %+  turn  app-key-list.bespoke.data.item-0
              |=  [key=[=ship type=[?(%enditem %nonitem) %app ~] time=cord] text=cord]
              [%app ship.key time.key '']
              ::
                %list-enditem-other
              %+  turn  other-key-list.bespoke.data.item-0
              |=  [key=[=ship type=[%enditem %other ~] time=cord] text=cord]
              [%other ship.key '' time.key]
              ::
                %list-list
              ::  TODO apply the same conversions here
              %+  turn  list-key-list.bespoke.data.item-0
              |=  [key=[=ship type=[%list *] time=cord] text=cord]
              (list-key-conv key)
            ==
        ==
      =/  sig  (sign:sig our.bowl now.bowl [%item key lens bespoke meta])
      (some [key [key lens bespoke meta sig]])
    ~
  --
::
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?+    mark    (on-poke:default mark vase)
      %portal-action
    ?.  =(our.bowl src.bowl)  `this
    =/  act  !<(action vase)
    ?+    -.act    (on-poke:default mark vase)
      %create   =^(cards state (create:handle-poke:stor act) [cards this])
      %replace  =^(cards state (replace:handle-poke:stor act) [cards this])
      %edit     =^(cards state (edit:handle-poke:stor act) [cards this])
      %sub      =^(cards state (sub:handle-poke:stor act) [cards this])
      %prepend-to-feed   =^(cards state (prepend-to-feed:handle-poke:stor act) [cards this])
      %append  =^(cards state (append:handle-poke:stor act) [cards this])
      %prepend  =^(cards state (prepend:handle-poke:stor act) [cards this])
      %remove  =^(cards state (remove:handle-poke:stor act) [cards this])
      %delete  =^(cards state (delete:handle-poke:stor act) [cards this])
      %purge   =^(cards state (purge:handle-poke:stor act) [cards this])
    ==
    ::
      %portal-message
    =/  msg  !<(message vase)
    ?>  =(our.bowl ~worpet-bildet)
    ?>  =(src.bowl src.msg)
    ?+    -.msg  !!
        %feed-update
      =/  act  [%prepend-to-feed feed.msg [%feed our.bowl '' 'global']]
      =^(cards state (prepend-to-feed:handle-poke:stor act) [cards this])
    ==
    ::
      %sss-to-pub
    =/  msg  !<(into:du-item (fled:sss vase))
    =^  cards  item-pub  (apply:du-item msg)
    [cards this]
    ::
      %sss-item
    =^  cards  item-sub  (apply:da-item !<(into:da-item (fled:sss vase)))
    [cards this]
    ::
      %sss-on-rock
    =/  msg  !<(from:da-item (fled:sss vase))
    ?<  ?=([%crash *] rock.msg)
    ?~  wave.msg  `this
    ?-  -.u.wave.msg
        %whole            :_  this  (upd:cards-methods:stor item.u.wave.msg)
        %prepend-to-feed  :_  this  (upd:cards-methods:stor rock.msg)
    ==
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
      =.  item-sub  (chit:da-item |3:wire sign)
      `this
        [~ %sss %scry-request @ @ @ %item @ @ @ @ ~]
      =^  cards  item-sub  (tell:da-item |3:wire sign)
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
      [%items ~]
    =+  ~(tap by read:da-item)
    =+  %-  malt  %+  turn  -
      |=  [k=[=ship =dude:gall p=^^path] v=[? ? =rock:portal-item]]
      `[key item]`[(path-to-key:conv +.p.k) rock.v]
    items+(~(uni by items) -)
    ::
    ::  TODO
      [%keys ~]  keys+~(key by items)
    ::
      [%item @ @ @ @ ~]
    :-  %item
    =/  key  (path-to-key:conv t.path)
    ?:  |(=(our.bowl ship.key) =(lens.item %temp))
      (~(gut by items) key ~)
    =/  item  (~(gut by read:da-item) [ship.key %portal-store [%item t.path]] ~)
    ?~  item  item
    rock:item
    ::
    ::  TODO
      [%item-exists @ @ @ @ ~]  (~(has by items) (path-to-key:conv t.path))
    ::
    ::  TODO
      [%item-valid @ @ @ @]
    valid+(get-latest:validator our.bowl now.bowl (path-to-key:conv t.path))
  ==
  ::
++  on-fail   on-fail:default
--
::
|_  [=bowl:gall]
+*  this      .
    itm       ~(. item-methods bowl)
    du-item   =/  du  (du:sss portal-item ,[%item @ @ @ @ ~])
              (du item-pub bowl -:!>(*result:du))
    da-item   =/  da  (da:sss portal-item ,[%item @ @ @ @ ~])
              (da item-sub bowl -:!>(*result:da) -:!>(*from:da) -:!>(*fail:da))
::
++  has-item
  |=  =key
  ^-  ?
  (~(has by items) key)
::
++  get-item
  |=  =key
  ^-  item
  =+  (~(gut by items) key ~)
  ?~  -
    =/  path  (key-to-path:conv key)
    rock:(~(got by read:da-item) [ship.key %portal-store [%item path]])
  -
::
++  put-item
  |=  =item
  ^-  ^items
  ?>  |(=(our.bowl ship.key.item) =(lens.item %temp))
  (~(put by items) key.item item)
::
++  del-item  ::  only used in %purge, %delete just labels item as deleted
              ::  and it's actually removed during purge
  |=  =key
  ^-  ^items
  (~(del by items) key)
::
++  del-items
  |=  =key-list
  ^-  ^items
  =+  `(map key item)`(malt (turn key-list |=(=key [key *item])))
  (~(del by items) -)
::
++  cards-methods
  ::  TODO
  :: - on-action sub
  |%
  ::  TODO exception for temp and not our
  ::  for upd and for cards from sss
  :: OVO sa give:da/u-read is sss-a
  ++  upd
    |=  =item
    ^-  (list card)
    [%give %fact [/updates]~ %portal-update !>(item)]~
  ::  whether its on-agent or on-poke
    ::    fe-update
    ::    PM update
    ::    subs update
    ::  previous card making exception:  validity store -> no cards
  ::
  --
::
++  handle-poke  ::  all arms here should output [cards items]
    |%
    ::  TODO unsubs
    ::  kill  -  publisher side
    ::  quit  -  subscriber side
    ::
    ::  MVP - purges temp and deleted
    ++  purge
      |=  [act=action]
      ^+  [*(list card) state]
      ?>  ?=([%purge *] act)
      =+  ~(tap in ~(key by items))
      =^  cards  state
        %-  tail  %^  spin  -  [*(list card) state]
        |=  [=key q=[cards=(list card) state=state-1]]
        :-  key
        =.  state  state.q
        ?:  ?|  =(lens.item %temp)
                ::not our, onda unsub (dleet)
            ==
          =^  cards  state.q  (delete [%delete key])
          [(welp cards.q cards) state.q]
        q
      =+  ~(tap by items)
      =.  items  %-  malt  %+  skip  -
                 |=([=key =item] ?=(?(%deleted) lens.item))
      ~&  >  "%portal-store: purge done"
      [cards state]
    ::
    ++  sub
      |=  [act=action]
      ^+  [*(list card) state]
      ?>  ?=([%sub *] act)
      ::  don't subscribe to our item
      ?:  &(=(ship.key.act our.bowl) =(cord.key.act ''))         `state
      =/  path  [%item (key-to-path:conv key.act)]
      ::  don't subscribe to what you are already subbed to
      ?:  (~(has by read:da-item) [ship.key.act %portal-store path])  `state
      =^  cards  item-sub  (surf:da-item ship.key.act %portal-store path)
      :-  cards
      state(item-sub item-sub)
    ::
    ++  replace
      |=  [act=action]
      ^+  [*(list card) state]
      ?>  ?=([%replace *] act)
      =/  item  (replace:itm (get-item key.act) act)
      =/  path  [%item (key-to-path:conv key.item)]
      ?:  =(lens.item %temp)
        :-  (upd:cards-methods item)
        state(items (put-item item))
      =^  cards  item-pub  (give:du-item path [%whole item])
      :-  (welp cards (upd:cards-methods item))
      state(items (put-item item))
    ::
    ++  create
      |=  [act=action]
      ^+  [*(list card) state]
      ?>  ?=([%create *] act)
      =/  item  (create:itm act)
      =/  path  [%item (key-to-path:conv key.item)]
      ?<  (has-item key.item)  :: should other actions have these checks?
      =.  items  (put-item item)
      ::  TODO check if already in list/items (if doing put with temp)
      =^  cards  state
        ?:  =(lens.item %temp)
          :-  (upd:cards-methods item)
          state
        =^  cards  item-pub  (give:du-item path [%whole item])
        :-  (welp cards (upd:cards-methods item))
        state
      ::  add to collections
      =^  cards  state
        %-  tail  %^  spin  `key-list`append-to.act  [cards state]
        |=  [col-key=key q=[cards=(list card) state=state-1]]
        :-  col-key
        ?>  ?=(%collection struc.col-key)
        =.  state  state.q  ::  append takes state from subj, so it is modified
        =^  cards  state.q  (append [%append [key.item]~ col-key])
        [(welp cards.q cards) state.q]
      ::  add to feeds
      =^  cards  state
        %-  tail  %^  spin  `key-list`prepend-to-feed.act  [cards state]
        |=  [feed-key=key q=[cards=(list card) state=state-1]]
        :-  feed-key
        ?>  ?=(%feed struc.feed-key)
        =.  state  state.q
        =/  feed  ~[[(scot %da now.bowl) our.bowl key.item]]
        =^  cards  state.q  (prepend-to-feed [%prepend-to-feed feed feed-key])
        [(welp cards.q cards) state.q]
      [cards state]
    ::  also -> main collection deduplication
    ::  (preventing duplication in the first place)
    ::
    ++  edit
      |=  [act=action]
      ^+  [*(list card) state]
      ?>  ?=([%edit *] act)
      =/  path  [%item (key-to-path:conv key.act)]
      =/  item  (edit:itm (get-item key.act) act)
      ?:  =(lens.item %temp)
        :-  (upd:cards-methods item)
        state(items (put-item item))
      =^  cards  item-pub  (give:du-item path [%whole item])
      :_  state(items (put-item item))
      (welp cards (upd:cards-methods item))
    ::
    ++  prepend-to-feed
      |=  [act=action]
      ^+  [*(list card) state]
      ?>  ?=([%prepend-to-feed *] act)
      =/  path  [%item (key-to-path:conv feed-key.act)]
      =/  feed  (prepend-to-feed:itm (get-item feed-key.act) act)
      =/  cards  (upd:cards-methods feed)
      =.  items  (put-item feed)
      =^  cards-1  item-pub  (give:du-item path [%prepend-to-feed feed.act])
      ?.  =(time.feed-key.act 'global')
        =/  msg  [%feed-update our.bowl feed.act]
        :_  state
        %+  snoc  (welp cards cards-1)
        (~(poke pass:io /msg) [~worpet-bildet %portal-store] portal-message+!>(msg))
      :-  (welp cards cards-1)
      state
    ::
    ++  append
      |=  [act=action]
      ^+  [*(list card) state]
      ?>  ?=([%append *] act)
      =/  path  [%item (key-to-path:conv col-key.act)]
      =/  col  (append-to-col:itm (get-item col-key.act) act)
      =.  items  (put-item col)
      =^  cards  item-pub  (give:du-item path [%whole col])
      :_  state
      (welp cards (upd:cards-methods col))
    ::
    ++  prepend
      |=  [act=action]
      ^+  [*(list card) state]
      ?>  ?=([%prepend *] act)
      =/  path  [%item (key-to-path:conv col-key.act)]
      =/  col  (prepend-to-col:itm (get-item col-key.act) act)
      =^  cards  item-pub  (give:du-item path [%whole col])
      :_  state(items (put-item col))
      (welp cards (upd:cards-methods col))
    ::
    ++  remove
      |=  [act=action]
      ^+  [*(list card) state]
      ?>  ?=([%remove *] act)
      =/  path  [%item (key-to-path:conv col-key.act)]
      =/  col  (prepend-to-col:itm (get-item col-key.act) act)
      =^  cards  item-pub  (give:du-item path [%whole col])
      :_  state(items (put-item col))
      (welp cards (upd:cards-methods col))
    ::
    ::  purge should remove from main collection, not delete
    ::  TODO what if not our???
    ++  delete
      |=  [act=action]
      ^+  [*(list card) state]
      ?>  ?=([%delete *] act)
      ?:  =(lens.item %deleted)  `state
      ?:  &(=(time.key.act '~2000.1.1') =(ship.key.act our.bowl))
        ~&  "%portal: item is default, not allowed to delete"  `state
      =/  path  [%item (key-to-path:conv key.act)]
      =/  item  (get-item key.act)
      =/  deleted  (delete:itm item act)
      =/  cards  (upd:cards-methods deleted)
      =.  state  state(items (put-item deleted))
      ?:  =(lens.item %temp)
        :_  state
        %+  welp  cards
        =-  [%pass [- +.path] %agent [ship.key.act -] %leave ~]~
          ?+    struc.key.act    !!
            %app    %treaty
            %group  %get-group-preview
          ==
      ?:  =(our.bowl ship.key.act)
        =^  cards-1  item-pub  (give:du-item path [%whole deleted])
        :_  state  (welp cards cards-1)
      =.  item-sub  (quit:da-item ship.key.act %portal-store path)
      [cards state]
    --
--