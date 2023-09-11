/-  portal-item::, m=portal-move ::, st=portal-states
/+  default-agent, p=portal, sss ::, dbug, tr=portal-transition
:: /$  items-to-json  %portal-items  %json
:: /$  item-to-json  %portal-item  %json
:: /$  store-result-to-json  %portal-store-result  %json
:: /$  portal-update-to-json  %portal-update  %json
::/*  indexer  %ship  /desk/ship
=/  indexer  ~faster-dilryd-mopreg
|%
+$  card  $+  gall-card  card:agent:gall
+$  state-3
  $+  store-state-3
  $:  %3
      =items:d:m:p
      item-sub=_(mk-subs:sss portal-item ,[%item @ @ @ @ ~])
      item-pub=_(mk-pubs:sss portal-item ,[%item @ @ @ @ ~])
  ==
--
::%-  agent:dbug
=|  state-3
=*  state  -
^-  agent:gall
=<
|_  =bowl:gall
+*  this      .
    default   ~(. (default-agent this %|) bowl)
    stor      ~(. +> bowl)
    :: state-transition  ~(. tr bowl)
    du-item   =/  du  (du:sss portal-item ,[%item @ @ @ @ ~])
              (du item-pub bowl -:!>(*result:du))
    da-item   =/  da  (da:sss portal-item ,[%item @ @ @ @ ~])
              (da item-sub bowl -:!>(*result:da) -:!>(*from:da) -:!>(*fail:da))
++  on-init
  ^-  (quip card _this)
  =.  state  *state-3
  =^  cards  state  init-sequence:stor
  [cards this]
::
++  on-save  
  !>(state)
++  on-load
  |=  =vase
  ^-  (quip card _this)
  =/  old  !<(state-3 vase)  ::!<(versioned-state:st vase)
  ::  -  get state up to date!
  :: =/  old
  ::   ?:  ?=(%0 -.old)
  ::     (state-0-to-1:state-transition old)
  ::   old
  :: =/  old
  ::   ?:  ?=(%1 -.old)
  ::     (state-1-to-2:state-transition old)
  ::   old
  :: =/  old
  ::   ?:  ?=(%2 -.old)
  ::     (state-2-to-3:state-transition old)
  ::   old
  ?>  ?=(%3 -.old)
  =.  state  old
  `this
  ::
  :: ::  -  destroy empty collections
  :: =/  output
  ::   =+  ~(tap by items.state)
  ::   %-  tail  %^  spin  -  [*key-list:d:m:p *(list card) state]
  ::   |=  [p=[=key:d:m:p =item:d:m:p] q=[to-remove=key-list:d:m:p cards=(list card) state=state-3]]
  ::   :-  p
  ::   =.  state  state.q
  ::   ?:  ?=([%collection *] bespoke.item.p)
  ::     ?~  key-list.bespoke.item.p
  ::       ~&  >  "destroying {<key.p>}!"
  ::       =^  cards  state  (destroy:handle-poke:stor [%destroy key.p])
  ::       [(snoc to-remove.q key.p) ;:(welp cards cards.q) state]
  ::     [to-remove.q cards.q state]
  ::   [to-remove.q cards.q state]
  :: =^  cards-1  state  +.output
  :: ::  -  remove empty collections + ~2000.1.2 from main collection
  :: =^  cards-2  state
  ::   %-  remove:handle-poke:stor  :+  %remove
  ::   (snoc -.output [%collection our.bowl '' '~2000.1.2'])
  ::   [%collection our.bowl '' '~2000.1.1']
  :: ::  - init-sequence to create and sub if sth was missed previously
  :: =^  cards-3  state  init-sequence:stor
  :: ::  - cleanup past mistakes
  :: ::  - publish all items which are unpublished
  :: ::    ->  either to rem scry or sss
  :: :: =/  item-paths
  :: ::   .^((list path) %gt /(scot %p our.bowl)/portal-store/(scot %da now.bowl)//item)
  :: =+  ~(val by items.state)
  :: =^  cards-4  state
  ::   %-  tail  %^  spin  -  [*(list card) state]
  ::   |=  [=item:d:m:p q=[cards=(list card) state=state-3]]
  ::   :-  item
  ::   =/  path  [%item (key-to-path:conv:p key.item)]
  ::   =.  state  state.q
  ::   ?:  =(lens.item %temp)  q                        ::  if %temp, no need
  ::   ?.  ?=(?(%collection %feed %app %blog) struc.key.item)      ::  if not %col or %feed or %app
  ::     q
  ::     :: ?~  (find [path]~ item-paths)
  ::       :: :_  state.q
  ::       :: (welp cards.q (gro:cards-methods item))
  ::     :: :_  state.q
  ::     :: (welp cards.q (cul:cards-methods key.item 0))
  ::   ?:  (~(has by read:du-item) path)  q   ::  if already published, no need
  ::   =^  cards  item-pub.state.q  (give:du-item path [%whole item])
  ::   [(welp cards.q cards) state.q]
  :: ::  - unsub from all which are not %feed or %col because of rem scry transition
  :: =.  state
  ::   =+  ~(tap in ~(key by read:da-item))
  ::   %-  tail
  ::   %^  spin  -  state
  ::   |=  [p=[=ship =dude:gall =path] q=[state=state-3]]
  ::   =/  key  (path-to-key:conv:^p +:path.p)
  ::   =.  state  state.q
  ::   ?.  ?=(?(%feed %collection %app %blog) struc.key)
  ::     =.  item-sub.state.q  (quit:da-item ship.key %portal-store path.p)
  ::     [p state.q]
  ::   [p state.q]
  :: :_  this
  :: ;:(welp cards-1 cards-2 cards-3 cards-4)
::
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?+    mark    (on-poke:default mark vase)
      %portal-action
    ?.  =(our.bowl src.bowl)  `this
    =/  act  !<(action:m:p vase)
    ?+    -.act    (on-poke:default mark vase)
      %create   =^(cards state (create:handle-poke:stor act) [cards this])
      %replace  =^(cards state (replace:handle-poke:stor act) [cards this])
      %edit     =^(cards state (edit:handle-poke:stor act) [cards this])
      %prepend-to-feed  =^(cards state (prepend-to-feed:handle-poke:stor act) [cards this])
      %append   =^(cards state (append:handle-poke:stor act) [cards this])
      %remove   =^(cards state (remove:handle-poke:stor act) [cards this])
      %destroy  =^(cards state (destroy:handle-poke:stor act) [cards this])
      %sub      =^(cards state (sub:handle-poke:stor act) [cards this])
      %sub-to-many      =^(cards state (sub-to-many:handle-poke:stor act) [cards this])
      %add-tag-request  =^(cards state (add-tag-request:handle-poke:stor act) [cards this])
    ==
    ::
      %portal-message
    =/  msg  !<(message:m:p vase)
    ?+    -.msg    !!
        %get-item
      :_  this
      :~  (~(msg cards:p [src.bowl %portal-store]) [%item (~(get by items) key.msg)])
      ==
      ::
        %item
      ?~  item.msg  `this
      ?:  ?&  ?=(%tip -.bespoke.u.item.msg)
          !=(beneficiary.bespoke.u.item.msg src.bowl)
      ==
        `this
      =.  items  (~(put by items) key.u.item.msg u.item.msg)
      :_  this
      (upd:cards-methods:stor u.item.msg)
      ::
        %add-tag-request
      ?>  =(src.bowl src.msg)
      ?>  !=('tip-from' (snag 1 tag.msg))
      :_  this
      (gra:cards-methods:stor portal-store+[%add-tag [tag from to]:msg])
      ::
        %feed-update
      ?>  =(src.bowl src.msg)
      ?>  =(our.bowl indexer)
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
        %whole
      ?:  ?&  ?=(%app -.bespoke.item.u.wave.msg)
              ?=(%def lens.item.u.wave.msg)
          ==
          :_  this  :_  ~
          :*  %pass  /validate-sig  %arvo  %k  %fard  %portal  %validate-sig  %noun
             !>([dist-desk.bespoke.item.u.wave.msg src.msg our.bowl now.bowl sig.bespoke.item.u.wave.msg item.u.wave.msg])
          ==
      =/  cards
        ?.  ?&  =('global' time.key.item.u.wave.msg)
                ?=([%feed *] bespoke.item.u.wave.msg)
            ==
          ~
        [(~(act cards:p [our.bowl %portal-manager]) [%sub-to-many (feed-to-key-list:conv:p (scag 20 feed.bespoke.item.u.wave.msg))])]~
      :_  this  (welp cards (upd:cards-methods:stor item.u.wave.msg))
      ::
        %prepend-to-feed
      :_  this
      %+  welp  (upd:cards-methods:stor rock.msg)
      [(~(act cards:p [our.bowl %portal-manager]) [%sub-to-many (feed-to-key-list:conv:p feed.u.wave.msg)])]~
    ==
      %sss-fake-on-rock
    =/  msg  !<(from:da-item (fled:sss vase))
    :_  this  (handle-fake-on-rock:da-item msg)
  ==
::
++  on-arvo
  |=  [=wire sign=sign-arvo]
  ^-  (quip card:agent:gall _this)
  ?+  wire  `this
    [%validate-sig ~]
  ?>  ?=([%khan %arow *] sign)
  ?.  ?=(%.y -.p.sign)
    ~&  >>  "app validation thread failed"
    `this
  =+  !<  $:  result=?
              dist-desk=@t
              src=@p
              our=@p 
              now=@da 
              sig=signature:d:m:p
              =item:d:m:p
          ==
      q.p.p.sign
  ?:  result
    ~&  >  "app sig valid"
    :_  this
    (upd:cards-methods:stor item)
  ~&  >>>  "Bad sig on app! Malicious!"
  =.  item-sub
    (quit:da-item ship.key.item %portal-store [%item (key-to-path:conv:p key.item)])
  `this
  ==
::
++  on-watch  _`this
++  on-leave  on-leave:default
::
++  on-agent
  |=  [=wire =sign:agent:gall]
  ^-  (quip card _this)
  ?+    wire    (on-agent:default wire sign)
        [~ %sss *]
    ?+    wire   `this
        [~ %sss %on-rock @ @ @ %item @ @ @ @ ~]
      =.  item-sub  (chit:da-item |3:wire sign)
      `this
        [~ %sss %scry-request @ @ @ %item @ @ @ @ ~]
      =^  cards  item-sub  (tell:da-item |3:wire sign)
      [cards this]
        [~ %sss %scry-response @ @ @ %item @ @ @ @ ~]
      =^  cards  item-pub  (tell:du-item |3:wire sign)
      [cards this]
    ==
  ==
::
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  ?:  |(?=(~ path) !=(%x i.path) ?=(~ t.path))  !!
  :^  ~  ~  %portal-store-result
  !>  ^-  store-result:d:m:p
  =/  path  t.path
  ?+    path    ~|("unexpected scry into {<dap.bowl>} on path {<path>}" !!)
    ::
    [%items ~]
    =+  ~(tap by read:da-item)
    =+  %-  malt  %+  turn  -
      |=  [k=[=ship =dude:gall p=^^path] v=[? ? =rock:portal-item]]
      `[key:d:m:p item:d:m:p]`[(path-to-key:conv:p +.p.k) rock.v]
    =+  (~(uni by items) -)
    ::  take feedpoasts from last 14 days (%other and %retweet type)
    ::  don't take %ship items
    items+(filter-items:stor - ~d14)
    ::
    [%keys ~]
    =+  ~(tap by read:da-item)
    =+  %-  silt  %+  turn  -
      |=  [k=[=ship =dude:gall p=^^path] v=[? ? =rock:portal-item]]
      `key:d:m:p`(path-to-key:conv:p +.p.k)
    keys+(~(uni in ~(key by items)) -)
    ::
    ::  TODO what do if time starts with '/', like blog ids '/some-blog-path'
      [%item @ @ @ @ ~]
    ::  because scries from threads cut off the path after empty slot
    =?  path  =('use_as_empty_path_slot' i.t.t.t.path)
      path(t.t.t ['' t.t.t.t.path])
    =?  path  =('use_as_empty_path_slot' i.t.t.t.t.path)
      path(t.t.t.t ['' t.t.t.t.t.path])
    :-  %item
    =/  key  (path-to-key:conv:p t.path)
    ?:  |(=(our.bowl ship.key) =(time.key ''))
      (~(gut by items) key ~)
    =/  item  (~(gut by read:da-item) [ship.key %portal-store [%item t.path]] ~)
    ?~  item  item
    rock:item
    ::
      [%item-exists @ @ @ @ ~]
    =?  path  =('use_as_empty_path_slot' i.t.t.t.path)
      path(t.t.t ['' t.t.t.t.path])
    =?  path  =('use_as_empty_path_slot' i.t.t.t.t.path)
      path(t.t.t.t ['' t.t.t.t.t.path])
    =/  key  (path-to-key:conv:p t.path)
    ?:  |(=(our.bowl ship.key) =(time.key ''))
      (~(has by items) key)
    (~(has by read:da-item) [ship.key %portal-store [%item t.path]])
  ==
  ::
++  on-fail   on-fail:default
--
::
|_  [=bowl:gall]
+*  this      .
    itm       ~(. item-methods:p bowl)
    du-item   =/  du  (du:sss portal-item ,[%item @ @ @ @ ~])
              (du item-pub bowl -:!>(*result:du))
    da-item   =/  da  (da:sss portal-item ,[%item @ @ @ @ ~])
              (da item-sub bowl -:!>(*result:da) -:!>(*from:da) -:!>(*fail:da))
::
++  get-item
  |=  =key:d:m:p
  ^-  item:d:m:p
  =+  (~(gut by items) key ~)
  ?~  -
    =/  path  (key-to-path:conv:p key)
    rock:(~(got by read:da-item) [ship.key %portal-store [%item path]])
  -
::
::  be careful where using this. get-item is supposed to take other people's def items into our items
++  put-item
  |=  =item:d:m:p
  ^-  items:d:m:p
  ?>  |(=(our.bowl ship.key.item) =(lens.item %temp))
  (~(put by items) key.item item)
::
::  items from e.g. last 14 days, remove ships
++  filter-items
  |=  [itms=items:d:m:p x=@dr]
  ^-  items:d:m:p
  =+  ~(tap by itms)
  %-  malt
  %+  skim  -
  |=  [=key:d:m:p =item:d:m:p]
  ^-  ?
  ?+    struc.key    %.y
      ?(%other %retweet)
    ?~  t=(slaw %da time.key)
      %.y
    (gte u.t (sub now.bowl x))
    ::
      %ship
    %.n
  ==
::
++  cards-methods
  |%
  ++  track-gr
    |=  =ship
    ^-  (list card)
    (~(track-gr cards:p [our.bowl %portal-graph]) ship)^~
  ::
  ::  adds tag, and makes it public
  ++  gra
    |=  edit=[=app:gr:m:p [%add-tag tag=path from=node:gr:m:p to=node:gr:m:p]]
    ^-  (list card)
    (~(edit-gr cards:p [our.bowl %portal-graph]) edit)^~
  ::
  ++  upd
    |=  =item:d:m:p
    ^-  (list card)
    [%give %fact [/updates]~ %portal-update !>(item)]^~  ::  FE update
  ::
  ::  puts into remote scry namespace
  :: ++  gro
  ::   |=  =item:d:m:p
  ::   ^-  (list card)
  ::   :~  [%pass /set-scry %grow [%item (key-to-path:conv:p key.item)] portal-item+item]
  ::   ==
  ::
  ::  removes from remote scry namespace
  :: ++  cul
  ::   |=  [=key:d:m:p n=@ud]
  ::   ^-  (list card)
  ::   :~  [%pass /cull-scry %cull ud+n [%item (key-to-path:conv:p key)]]
  ::   ==
  --
::
++  handle-poke  ::  all arms here should output [cards items]
    |%
      ::  TODO unsubs
      ::  kill  -  publisher side
      ::  quit  -  subscriber side
      ::
    ::
    ++  sub-to-many
      |=  [act=action:m:p]
      ^+  [*(list card) state]
      ?>  ?=([%sub-to-many *] act)
      %-  tail  %^  spin  key-list.act  [*(list card) state]
      |=  [=key:d:m:p q=[cards=(list card) state=state-3]]
      :-  key
      =.  state  state.q
      =^  cards  state.q  (sub [%sub key])
      [(welp cards.q cards) state.q]
    ::
    ++  sub
      |=  [act=action:m:p]
      ^+  [*(list card) state]
      ?>  ?=([%sub *] act)
      ::  don't subscribe to our item
      ?:  &(=(ship.key.act our.bowl) =(cord.key.act ''))         `state
      =/  path  [%item (key-to-path:conv:p key.act)]
      ::  note SSS only for feeds and collections is also temporary fix
      ::  because it is not scalable as well
      ?.  ?=(?(%feed %collection %app %blog) struc.key.act)
        ?:  (~(has by items) key.act)  
          :_  state
          (upd:cards-methods (get-item key.act))
        :_  state
        %+  snoc  `(list card)`(track-gr:cards-methods ship.key.act)
        `card`(~(msg cards:p [ship.key.act %portal-store]) [%get-item key.act])
      ::  don't subscribe to what you are already subbed to
      ::  stronger fence than the one in %portal-graph
      ?:  ?&  (~(has by read:da-item) [ship.key.act %portal-store path])
              !=(key.act [%feed indexer '' 'global'])  ==
              ::  stupid hack bcs sss sometimes loses the subscriber from the mem pool
              ::  so we are allowing the global feed sub to go thru if someone was
              ::  `accidentally` unsubscribed
          :_  state
          (upd:cards-methods (get-item key.act))
      =^  cards  item-sub.state  (surf:da-item ship.key.act %portal-store path)
      :_  state
      (welp (track-gr:cards-methods ship.key.act) cards)
    ::
    ++  replace
      |=  [act=action:m:p]
      ^+  [*(list card) state]
      ?>  ?=([%replace *] act)
      =/  item  (replace:itm (get-item key.act) act)
      =/  path  [%item (key-to-path:conv:p key.item)]
      ?:  =(lens.item %temp)
        :-  (upd:cards-methods item)
        state(items (put-item item))
      =^  cards  item-pub  (give:du-item path [%whole item])
      :-  (welp cards (upd:cards-methods item))
      state(items (put-item item))
    ::
    ++  create
      |=  [act=action:m:p]
      ^+  [*(list card) state]
      ?>  ?=([%create *] act)
      =/  item  (create:itm act)
      =/  path  [%item (key-to-path:conv:p key.item)]
      ?:  (~(has by items) key.item)  `state :: which other actions need these checks?
      =.  items  (put-item item)
      ::  TODO check if already in list/items (if doing put with temp)
      =^  cards  state
        ?:  =(lens.item %temp)
          :-  (upd:cards-methods item)
          state
        =^  cards  item-pub  (give:du-item path [%whole item])
        :_  state
        ;:  welp  cards
                  (upd:cards-methods item)
                  ::(gro:cards-methods item)
        ==
      ::  add to collections
      =^  cards-1  state
        %-  tail  %^  spin  `key-list:d:m:p`append-to.act  [cards state]
        |=  [col-key=key:d:m:p q=[cards=(list card) state=state-3]]
        :-  col-key
        ?>  ?=(%collection struc.col-key)
        =.  state  state.q  ::  append takes state from subj, so it is modified
        =^  cards  state.q  (append [%append [key.item]~ col-key])
        [(welp cards.q cards) state.q]
      ::  add to feeds
      =^  cards-2  state
        %-  tail  %^  spin  `key-list:d:m:p`prepend-to-feed.act  [cards state]
        |=  [feed-key=key:d:m:p q=[cards=(list card) state=state-3]]
        :-  feed-key
        ?>  ?=(%feed struc.feed-key)
        =.  state  state.q
        =/  feed  ~[[(scot %da now.bowl) our.bowl key.item]]
        =^  cards  state.q  (prepend-to-feed [%prepend-to-feed feed feed-key])
        [(welp cards.q cards) state.q]
      ::  add tags to soc-graph (outward pointing),
      ::  and send corresponding messages that backward pointing tags be created
      =^  cards-3  state
        %-  tail  %^  spin
        `(list [=key:d:m:p tag-to=^path tag-from=^path])`tags-to.act  [cards state]
        |=  [[=key:d:m:p tag-to=^path tag-from=^path] q=[cards=(list card) state=state-3]]
        :-  [key tag-to tag-from]
        =/  our  (key-to-node:conv:p key.item)
        =/  their    (key-to-node:conv:p key)
        :_  state.q
        %+  snoc  (gra:cards-methods portal-store+[%add-tag tag-to our their])
        %-  ~(msg cards:p [ship.key %portal-store])
            [%add-tag-request our.bowl tag-from their our]
      [;:(welp cards cards-1 cards-2 cards-3) state]
    ::  also -> main collection deduplication
    ::  (preventing duplication in the first place)
    ::
    ++  edit
      |=  [act=action:m:p]
      ^+  [*(list card) state]
      ?>  ?=([%edit *] act)
      =/  path  [%item (key-to-path:conv:p key.act)]
      =/  item  (edit:itm (get-item key.act) act)
      ?:  =(lens.item %temp)
        :-  (upd:cards-methods item)
        state(items (put-item item))
      =^  cards  item-pub  (give:du-item path [%whole item])
      :_  state(items (put-item item))
      (welp cards (upd:cards-methods item))
    ::
    ++  prepend-to-feed
      |=  [act=action:m:p]
      ^+  [*(list card) state]
      ?>  ?=([%prepend-to-feed *] act)
      =/  path  [%item (key-to-path:conv:p feed-key.act)]
      =/  feed  (prepend-to-feed:itm (get-item feed-key.act) act)
      =/  cards  (upd:cards-methods feed)
      =.  items  (put-item feed)
      =^  cards-1  item-pub  (give:du-item path [%prepend-to-feed feed.act])
      ?.  =(time.feed-key.act 'global')
        =/  msg  [%feed-update our.bowl feed.act]
        :_  state
        %+  snoc  (welp cards cards-1)
        (~(msg cards:p [indexer %portal-store]) msg)
      :-  (welp cards cards-1)
      state
    ::
    ++  append  ::  deduplicates
      |=  [act=action:m:p]
      ^+  [*(list card) state]
      ?>  ?=([%append *] act)
      =/  path  [%item (key-to-path:conv:p col-key.act)]
      =/  col  (append-no-dupe:itm (get-item col-key.act) act)
      =.  items  (put-item col)
      =^  cards  item-pub  (give:du-item path [%whole col])
      :_  state
      (welp cards (upd:cards-methods col))
    ::
    ++  remove
      |=  [act=action:m:p]
      ^+  [*(list card) state]
      ?>  ?=([%remove *] act)
      =/  path  [%item (key-to-path:conv:p col-key.act)]
      =/  col  (remove-from-col:itm (get-item col-key.act) act)
      =^  cards  item-pub  (give:du-item path [%whole col])
      :_  state(items (put-item col))
      (welp cards (upd:cards-methods col))
    ::
    ++  destroy
      |=  [act=action:m:p]
      ^+  [*(list card) state]
      ?>  ?=([%destroy *] act)
      ?:  &(=(time.key.act '~2000.1.1') =(ship.key.act our.bowl))
        ~&  "%portal: don't destroy default items"  `state
      =/  path  [%item (key-to-path:conv:p key.act)]
      =.  items.state  (~(del by items.state) key.act)
      ?:  =(time.key.act '')  ::  is temp
        :_  state
        =-  [%pass [- +.path] %agent [ship.key.act -] %leave ~]~
          ?+    struc.key.act    !!
            %app    %treaty
            %group  %get-group-preview
          ==
      ?:  =(our.bowl ship.key.act)
        ::  =.  item-pub  (kill:du-item path^~)  No killing paths,
        ::  because then I have to live it if I want to publish there again
        `state
      =.  item-sub  (quit:da-item ship.key.act %portal-store path)
      `state
    ::
    ++  add-tag-request
      |=  [act=action:m:p]
      ^+  [*(list card) state]
      ?>  ?=([%add-tag-request *] act)
      ::  no safeguards built yet
      =/  our  (key-to-node:conv:p our.act)
      =/  their    (key-to-node:conv:p their.act)
      :_  state
      %+  snoc  (gra:cards-methods portal-store+[%add-tag tag-to.act our their])
      %-  ~(msg cards:p [ship.their.act %portal-store])
          [%add-tag-request our.bowl tag-from.act their our]
    --
::
++  init-sequence
  ^+  [*(list card) state]
  =/  feed-path  [%item %feed (scot %p indexer) '' 'global' ~]
  =^  cards  item-sub  (surf:da-item indexer %portal-store feed-path)
  =.  cards  (welp cards (track-gr:cards-methods indexer))
  =^  cards-1  state
    %-  create:handle-poke
    :*  %create  ~  ~  `'~2000.1.1'  `%def
    `[%collection 'Main Collection' 'Your first collection.' '' ~]
    [%collection our.bowl '' '~2000.1.1']~  ~  ~  ==
  =^  cards-2  state
    %-  create:handle-poke
    :*  %create  ~  ~  `'~2000.1.1'  `%def
    `[%validity-store *validity-records:d:m:p]  ~  ~  ~  ==
  =^  cards-3  state
    %-  create:handle-poke
    [%create ~ ~ `'~2000.1.1' `%personal `[%feed ~] ~ ~ ~]
  =^  cards-4  state
    %-  create:handle-poke
    :*  %create  ~  ~  `'all'  `%def
    `[%collection 'All' 'Collection of all apps, groups and ships.' '' ~]
    [%collection our.bowl '' '~2000.1.1']~  ~  ~  ==
  =/  cards-5    ::  - make your tags public
    :~  :*  %pass  /gr-perm  %agent  [our.bowl %portal-graph]  %poke
            %social-graph-edit
            !>(portal-store+[%set-perms /(scot %p our.bowl) %public])
    ==  ==
  =^  cards-6  state
    %-  create:handle-poke
    :*  %create  ~  ~  `'published-apps'  `%def
    `[%collection 'My Apps' 'Collection of all apps I have published.' '' ~]
    [%collection our.bowl '' '~2000.1.1']~  ~  ~  ==
  ::
  ?:  =(our.bowl indexer)
    =^  cards-7  state
      %-  create:handle-poke
      [%create ~ ~ `'global' `%global `[%feed ~] ~ ~ ~]
    =^  cards-8  state
      %-  create:handle-poke
      [%create ~ ~ `'index' `%def `[%collection '' '' '' ~] ~ ~ ~]
    :_  state
    (zing ~[cards cards-1 cards-2 cards-3 cards-4 cards-5 cards-6 cards-7 cards-8])
  :_  state
  (zing ~[cards cards-1 cards-2 cards-3 cards-4 cards-5 cards-6])
::
--
