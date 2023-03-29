/-  *portal-data, *portal-update, *portal-action, *portal-front-end-update,
    *portal-config
/+  sig, agentio, mip
|%
+$  card  card:agent:gall
::
++  conv
  |%
  ::
  ++  key-to-path-key
    |=  [=key]
    ;;  path-key
    ;:(weld ~[(scot %p ship.key)] ~[(spat type.key)] ~[cord.key])
  ::
  ++  path-key-to-key
    |*  [=path-key]
    ^-  key
    :+  (slav %p -:path-key)
        (stab +<:path-key)
        (rear path-key)
  ::
  ++  boat-to-outgoing-subs
    |=  wex=boat:gall
    ^-  outgoing-subs
    =|  subs=(mip:mip ship key ?)
    =/  l  ~(val by wex)
    =/  n  0
    |-
    ?:  =(n (lent l))  subs
    %=  $
      n  +(n)
      subs
        =/  pair=[acked=? =path]  (snag n l)
        =/  key  (path-key-to-key:conv path.pair)
        (~(put bi:mip subs) ship.key key acked.pair)
    ==
  ::
  --
::
::  add ++store and ++manager
++  scry
  |_  [our=ship now=time]
  ::  gets item locally (no remote scry yet)
  ++  get-item
    |=  [=key]
    .^  item
      %gx
      ;:  weld
        /(scot %p our)/portal-store/(scot %da now)/item
        (key-to-path-key:conv key)
        /portal-item
      ==
    ==
  ::
  ::  gets item, and if doesn't exist returns ~
  ++  get-item-or-null
    |=  [=key]
    .^  ?(~ item)
      %gx
      ;:  weld
        /(scot %p our)/portal-store/(scot %da now)/item
        (key-to-path-key:conv key)
        /noun
      ==
    ==
  ::
  ++  get-items
    |=  [=key-set]
    ^-  (map key ?(~ item))
    (get-items:misc (get-all-items) key-set)
  ::
  ::  gets all items
  ++  get-all-items
    |.
    .^(items %gx /(scot %p our)/portal-store/(scot %da now)/all/items/portal-items)
  ::
  ::  gets all keys in local items
  ++  get-all-keys
    |.
    .^  key-set
      %gx
      /(scot %p our)/portal-store/(scot %da now)/all/keys/portal-key-set
    ==
  ::
  ++  get-item-latest-validity
    |=  [=key]
    .^  v-result
      %gx
      ;:  weld
        /(scot %p our)/portal-store/(scot %da now)/valid/latest
        (key-to-path-key:conv key)
        /portal-v-result
      ==
    ==
  ::
  ++  in-default-list
    |=  [=key]
    .^  ?
      %gx
      ;:  weld
        /(scot %p our)/portal-store/(scot %da now)/in-default-list
        (key-to-path-key:conv key)
        /noun
      ==
    ==
  --
::
++  keys
  |%
  ++  set-difference
    |=  [set-1=key-set set-2=key-set]
    ^-  key-set
    (~(dif in set-1) set-2)
  ::
  ::  do this stuff (and other) with wet gates
  ::  so that I can input key-list or key-text-list and it doesnt matter
  ++  skip-nonitem
    |=  [=key-list]
    ^-  ^key-list
    (skip key-list |=([=key] ?:(=(-.type.key %nonitem) %.y %.n)))
  ::
  ++  skim-nonitem
    |=  [=key-list]
    ^-  ^key-list
    (skim key-list |=([=key] ?:(=(-.type.key %nonitem) %.y %.n)))
  ::
  ++  skip-types
    |=  [=key-list types=(list type)]
    ^-  ^key-list
    (skip key-list |=([=key] ?~((find [type.key]~ types) %.n %.y)))
  ::
  ++  skim-types
    |=  [=key-list types=(list type)]
    ^-  ^key-list
    (skim key-list |=([=key] ?~((find [type.key]~ types) %.n %.y)))
  ::
  ++  skip-ships
    |=  [=key-list ships=(list ship)]
    ^-  ^key-list
    (skip key-list |=([=key] ?~((find [ship.key]~ ships) %.n %.y)))
  ::
  ++  skim-ships
    |=  [=key-list ships=(list ship)]
    ^-  ^key-list
    (skim key-list |=([=key] ?~((find [ship.key]~ ships) %.n %.y)))
  --
::
++  loob
  |%
  ::  check whether key is in key-list
  ++  key-in-key-list
    |=  [=key =key-list]
    ^-  ?
    ?~  (fand ~[key] key-list)
      %.n
    %.y
  ::
  ::  check whether key (item) is in items
  ++  item-in-items
    |=  [=key =items]
    ^-  ?
    (~(has by items) key)
  ::
  ::  verify that a list doesn't repeat apps
  ++  list-has-duplicates
    |=  [=key-list]
    ^-  ?
    =(~(wyt in (silt key-list)) (lent key-list))
  ::
  ::  verify whether key-list is subset of items
  ++  key-list-subset-of-items
    |=  [=key-list =items]
    (levy key-list |=(=key (~(has in ~(key by items)) key)))
  ::
  ++  key-in-list-item
    |=  [=key list-item=item]
    ^-  ?
    ?+    -.bespoke.data.list-item    !!
        %list
      (key-in-key-list:loob key key-list.bespoke.data.list-item)
        %list-list
      (key-in-key-list:loob key list-key-list.bespoke.data.list-item)
    ==
  --
::
++  cards
  |%
  ++  keys-to-sub-cards
    |=  [our=ship =key-list]
    ^-  (list card)
    (turn key-list (cury key-to-sub-card our))
  ::
  :: ++  nuke-soc-graph-card
  ::
  :: ::
  :: ++  add-to-soc-graph-card

  ::
  ++  key-to-sub-card
    |=  [our=ship =key]
    ^-  card
    [%pass /sub %agent [our %portal-store] %poke %portal-action !>([%sub key])]
  ::
  ++  act-to-act-card
    |=  [=action our=ship app=term]
    ^-  card
    [%pass /act %agent [our app] %poke %portal-action !>(action)]
  ::
  ++  upd-to-upd-card
    |=  [our=ship =update]
    ^-  card
    [%pass /upd %agent [our %portal-store] %poke %portal-update !>(update)]
  --
::
::
++  misc
  |%
  ::  input @p, output ship-type:portal-data
  ++  get-ship-type
    |=  [=ship]
    ^-  ship-type
    =/  hex  `@ux`ship
    ?:  &((gte hex 0x0) (lte hex 0xff))  %galaxy
    ?:  &((gte hex 0x100) (lte hex 0xffff))  %star
    ?:  &((gte hex 0x1.0000) (lte hex 0xffff.ffff))  %planet
    ?:  &((gte hex 0x1.0000.0000) (lte hex 0xffff.ffff.ffff.ffff))  %moon
    %comet
  ::
  ::  %.y if one ship is moon of another
  ++  ships-related
    |=  [ship1=ship ship2=ship]
    ^-  ?
    ?:  ?|  =((get-ship-type ship1) %comet)
            =((get-ship-type ship2) %comet)
        ==
      %.n
    ?:  (gte ship1 ship2)
      ?:  =(0 (mod (sub ship1 ship2) 4.294.967.296))
        %.y
      %.n
    ?:  =(0 (mod (sub ship2 ship1) 4.294.967.296))
      %.y
    %.n
  ::
  ::  takes dst-desk, outputs unit of dst-name and app-name
  ++  parse-dist-desk
    |=  [dist-desk=@t]
    ^-  (unit [dist-name=ship desk-name=@tas])
    =/  dist-desk  (trip dist-desk)
    =/  loc  (find ['/']~ dist-desk)
    ?~  loc  ~
    =/  ship-unit  (slaw %p (crip (scag u.loc dist-desk)))
    ?~  ship-unit  ~
    %-  some  :-  (need ship-unit)
    `@tas`(crip (slag +(u.loc) dist-desk))
  ::
  ::  takes items and key-set and retrieves the desired items
  ++  get-items
    |=  [=items =key-set]
    ^-  (map key ?(~ item))
    %-  malt
    %+  turn  ~(tap in key-set)
    |=  =key
    [key (~(gut by items) key ~)]
  ::
  ::  takes list item and outputs key-list
  ++  list-item-to-key-list
      |=  [=item]
      ^-  key-list
      ?+    -.bespoke.data.item    ~
          %list  key-list.bespoke.data.item
          %list-list  list-key-list.bespoke.data.item
      ==
  --
::
++  store
  |%
  ::  whenever modifying bespoke, go thru this
  ++  bespoke-write
    |*  [=key =bespoke-input act=$%([%add ~] [%edit =bespoke])]
    ^-  [(list card) bespoke]
    ?-    -.bespoke-input
        %nonitem-ship        `[%nonitem-ship ~]
        %nonitem-group       `[%nonitem-group ~]
        %nonitem-app
          ?-    -.act
            %add             `[%nonitem-app *treaty]
            %edit            `bespoke.act
          ==
        %enditem-other       `[%enditem-other ~]
        %enditem-app
          ?-    -.act
            %add             `[%enditem-app dist-desk.bespoke-input *signature *treaty]
            %edit            `?+(-.bespoke.act !! %enditem-app bespoke.act(dist-desk dist-desk.bespoke-input))
          ==
        %list                `[%list key-list.bespoke-input]
      :: (turn
      :: :~
      :: ==
        %list-list           `[%list-list list-key-list.bespoke-input]
        %validity-store      `[%validity-store validity-records.bespoke-input]
    ==
  ::  deletes an item (yours or foreign)
  ++  del-item
    |=  [our=ship src=ship =items upd=[%del =key]]
    ^-  [?(%changed %unchanged) ^items]
    ::~&  "%portal: deleting {(spud (key-to-path:conv key.upd))}"
    ?:  &(=(cord.key.upd '~2000.1.1') =(ship.key.upd our))
      ~&  "%portal: item is default, not allowed to delete"
      [%unchanged items]
    ?.  (~(has by items) key.upd)
      ::~&  "%portal: {(spud (key-to-path:conv key.upd))} does not exist"
      [%unchanged items]
    [%changed (~(del by items) key.upd)]
  ::
  ::  for receiving items, from local %portal-manager or foreign %portal-store
  ++  put-item
    |=  [our=ship =items upd=[%put =key =item]]
    ^-  ^items
    ::  TODO remove before pushing to network
    ~&  "%portal: putting {(spud (key-to-path-key:conv key.upd))}"
    (~(put by items) key.upd item.upd)
  ::
  ++  default
    |%
    ++  simple-list
      |=  [=items our=ship now=time]
      ^-  [(list card) ^items]
      =/  general  `general`['Mani List' '' 'Your first list.' *tags *properties *pictures '' '#e8e8e8']
      =/  act  [%add our [%list ~] general [%list ~]]
      (add:on-action:store items our our now %.y act)
    ::
    ++  list-list
      |=  [=items our=ship now=time]
      ^-  [(list card) ^items]
      =/  general  ['Main Curator Page' '' 'Your first curator page.' *tags *properties *pictures '' '#e8e8e8']
      =/  =list-key-list
        :~  [our [%list ~] '~2000.1.1']
            [our [%list ~] '~2000.1.1']
            [our [%list ~] '~2000.1.1']
            [our [%list ~] '~2000.1.1']
        ==
      =/  act  [%add our [%list %list ~] general [%list-list list-key-list]]
      (add:on-action:store items our our now %.y act)
    ::
    ++  validity-store
      |=  [=items our=ship now=time]
      ^-  [(list card) ^items]
      =/  general  ['Main Validity Store' '' 'Storage of validity of your items.' *tags *properties *pictures '' '#e8e8e8']
      =/  act  [%add our `type`[%validity-store ~] general [%validity-store *validity-records]]
      (add:on-action:store items our our now %.y act)
    --
  ::
  ::  purges all foreign items except those from default-curators and portal-curator
  ++  purge
    |=  [=items our=ship src=ship now=time act=[%purge =default-curators =portal-curator]]
    ^-  [(list card) ^items]
    =/  items-key-set  ~(key by items)
    =/  key-list  ~(tap in items-key-set)
    ::make list/set of items
    ::diff from items
    =/  ships  (silt (limo ~[our ship.portal-curator.act]))  ::TODO also default curators in here
    =/  our-keys  (skim-ships:keys key-list ~(tap in ships))  ::  LISTLIST KEY LIST
    =/  our-list-lists-keys  (silt (skim-types:keys our-keys ~[[%list %list ~]]))  :: LISTLIST KEYSET
    =/  our-list-lists-items  ::list items
      %-  (list item)  %+  skip
        ~(val by (get-items:misc items our-list-lists-keys))
        |=(item=?(~ item) ?~(item %.y %.n))
    =/  our-lists-keys  `(list key)`(zing (turn our-list-lists-items |=(=item (list-item-to-key-list:misc item))))  :: LIST KEYLIST
    =/  our-lists-items
      %-  (list item)  %+  skip
        (turn our-lists-keys |=(=key (~(gut by items) key ~)))  :: LIST ITEMLIST
        |=(item=?(~ item) ?~(item %.y %.n))
    =/  our-items-keys  `(list key)`(zing (turn our-lists-items |=(=item (list-item-to-key-list:misc item))))  :: ITEM KEYLIST
    =/  keys-to-keep  (~(uni in (silt our-keys)) (silt our-lists-keys))
    =.  keys-to-keep  (~(uni in keys-to-keep) (silt our-items-keys))
    :: our-list-lists-keys is redundant
    =/  keys-to-purge  (~(dif in items-key-set) keys-to-keep)
    =/  keys  ~(tap in keys-to-purge)
    =/  len  (lent keys)
    =/  n  0
    =/  return  [*(list card) items=items]
    :: ~&  "items-key-set"
    :: ~&  >  ~(wyt in items-key-set)
    :: ~&  "item number to keep"
    :: ~&  >  ~(wyt in keys-to-keep)
    :: ~&  "item number to purge"
    :: ~&  >  len
    =.  return
      |-  ?:  =(n len)  return
      :: ~&  "items kept"
      :: ~&  >  ~(wyt by `^items`+.return)
      =/  new  (del:on-action items.return our src now [%del (snag n keys)])
      %=  $
        -.return  (weld -.return -.new)
        +.return  +.new
        n  +(n)
      ==
    =/  key-set  ~(key by items.return)
    =/  key-list  ~(tap in key-set)
    ~&  "%portal: purge done"
    :: refreshes nonitems kept after purge
    [(weld (get-nonitems:manager our key-list) -.return) +.return]
  ::
  ++  on-action
    |%
    ++  add
      |=  [=items our=ship src=ship now=time default=?(%.y %.n) act=[%add =ship =type =general =bespoke-input]]
      ::  these are not the right places to assert -.bespoke correspond to type.id
      ::  if =(%.y default), created-at becomes '~2000.1.1'
      ^-  [(list card) ^items]
      ?.  =(our src)  [~ items]
      ?.  =(ship.act our)
        ~&  "%portal: not adding item, ship in key must be our"
        [~ items]
      =/  key  [ship.act type.act cord=?:(=(default %.y) '~2000.1.1' `@t`(scot %da now))]
      =/  data  [+:(bespoke-write key bespoke-input.act [%add ~]) general.act]
      =/  meta
        :*  updated-at='~2000.1.1'
            permissions=~[our]
            reach=[%public blacklist=~]
            outside-sigs=~
        ==
      =/  item-sig  (sign:sig our now `sig-input`[%item key data meta *social])
      =/  upd  [%put key [key data meta *social item-sig]]
      :-  (put:on-poke:make-cards items our src upd)
      (put-item our items upd)
    ::
    ++  edit
      |=  [=items our=ship src=ship now=time act=[%edit =key =general =bespoke-input]]
      ^-  [(list card) ^items]
      ::  TODO  can-edit function to abstract permissions
      ?.  =(our src)  [~ items]
      ?.  =(ship.key.act our)  [~ items]
      =/  item  (~(gut by items) key.act ~)
      ?~  item  ~&  "%portal-store: item doesn't exist"  [~ items]
      =/  data  [+:(bespoke-write key.act bespoke-input.act [%edit bespoke.data.item]) general.act]
      =/  item
        %=  item
          updated-at.meta  `@t`(scot %da now)
          data                  data
        ==
      =/  item-sig  (sign:sig our now [%item key.act data meta.item social.item])
      =/  upd  [%put key.act [key.act data meta.item social.item item-sig]]
      :-  (put:on-poke:make-cards items our src upd)
      (put-item our items upd)
    ::
    ::  TODO portal-store should be able to add a bunch of items in one arvo cycle (once card)
    ::  used with +add-other-items-and-list from portal-manager, trying out new pattern
    ++  add-with-time
      |=  [=items our=ship src=ship now=time act=[%add-with-time =key =general =bespoke-input]]
      ^-  [(list card) ^items]
      ?.  =(our src)  [~ items]
      ?.  =(ship.key.act our)
        ~&  "%portal: not adding item, ship in key must be our"
        [~ items]
      =/  data  [+:(bespoke-write key.act bespoke-input.act [%add ~]) general.act]
      =/  meta
        :*  updated-at='~2000.1.1'
            permissions=~[our]
            reach=[%public blacklist=~]
            outside-sigs=~
        ==
      =/  item-sig  (sign:sig our now `sig-input`[%item key.act data meta *social])
      =/  upd  [%put key.act [key.act data meta *social item-sig]]
      :-  (put:on-poke:make-cards items our src upd)
      (put-item our items upd)
    ::
    ++  sub
      |=  [our=ship src=ship now=time wex=boat:gall act=[%sub =key]]
      ^-  (list card)
      ?:  =(-.type.key.act %nonitem)  ~
      ?:  =(ship.key.act our)  ~
      ~&  "cards"
      (sub:on-poke:make-cards our src wex act)
    ::
    ++  del
      |=  [=items our=ship src=ship now=time act=[%del =key]]
      ^-  [(list card) ^items]
      ::?:  =(-.type.key.act %nonitem)  [~ items]
      =^  changed  items  (del-item our src items act)
      :-  (del:on-poke:make-cards items our src changed act)
      items
    ::
    ++  add-to-default-list
      |=  [=items our=ship now=time act=[%add-to-default-list =key]]
      ^-  [(list card) ^items]
      =/  list-key
        ?:  =(-.type.key.act %list)
          [our [%list %list ~] '~2000.1.1']
        [our [%list ~] '~2000.1.1']
      =/  list  (~(got by items) list-key)
      ?+    -.bespoke.data.list    [~ items]
          %list
        =/  bespoke-input  [%list (snoc key-list.bespoke.data.list key.act)]
        =/  act  [%edit list-key general.data.list bespoke-input]
        (edit items our our now act)
       ::
          %list-list
        ?+    type.key.act    !!
            [%list ~]
          =/  bespoke-input  [%list-list (snoc list-key-list.bespoke.data.list key.act)]
          =/  act  [%edit list-key general.data.list bespoke-input]
          (edit items our our now act)
        ==
      ==
    ::
    ++  add-item-to-list  ::TODO /list/app
      |=  [=items our=ship src=ship now=time act=[%add-item-to-list list-key=[=ship type=[%list ~] =cord] =ship =type =general =bespoke-input]]
      ^-  [(list card) ^items]
      =/  list  (~(got by items) list-key.act)
      ?+    -.bespoke.data.list    [~ items]
          %list
        =/  bespoke-input  [%list (snoc key-list.bespoke.data.list [ship.act [%enditem %other ~] `@t`(scot %da now)])]
        =/  list-act  [%edit list-key.act general.data.list bespoke-input]
        =^  cards1  items
          (add-with-time items our src now [%add-with-time [ship.act type.act `@t`(scot %da now)] general.act bespoke-input.act])
        =^  cards2  items
          (edit items our our now list-act)
        [(weld cards1 cards2) items]
      ==
    ::
    ::
    ::  for now just overwrites
    ::  long term nonitems should be able to sync with their source
    ::  and not be overwritten every time
    ++  put-nonitem
      |=  [=items our=ship src=ship act=[%put-nonitem =key =item]]
      ^-  [(list card) ^items]
      :-  (put:on-poke:make-cards items our src [%put key.act item.act])
      (put-item our items [%put key.act item.act])
    ::
    ++  edit-docket
      |=  [=items our=ship src=ship now=time act=[%edit-docket =key =treaty]]
      ^-  [(list card) ^items]
      ::  ?.  =(our src)  [~ items]  -  this doesn't make sense here
      ::  how to make it so that =(our src) makes sense as a validation in general
      ?.  =(ship.key.act our)  [~ items]
      =/  item  (~(gut by items) key.act ~)
      ?~  item  ~&  "%portal-store: item doesn't exist"  [~ items]
      ?+    -.bespoke.data.item    !!
          %enditem-app
        =/  item
          %=  item
            updated-at.meta         `@t`(scot %da now)
            treaty.bespoke.data     treaty.act     ::  TODO thru bespoke-write
          ==
        =/  item-sig  (sign:sig our now (sig-input [%item key.act data.item meta.item social.item]))
        =/  upd  [%put key.act item(sig item-sig)]
        :-  (put:on-poke:make-cards items our src upd)
        (put-item our items upd)
      ==
    ::

    --
  ::
  ++  on-message
    |%
    ++  index-as-curator  ::idempotent toggle
      |=  [=items our=ship src=ship now=time act=[%index-as-curator src=ship toggle=?]]
      ^-  [(list card) ^items]
      ?>  =(our ~worpet-bildet)
      =/  index-key  [our [%list ~] 'index']
      =/  index  (~(gut by items) index-key ~)
      ?~  index  ~&  "%portal-store: index doesn't exist"  [~ items]
      ?+    -.bespoke.data.index    [~ items]
          %list
        =/  loc  (find [[src.act [%nonitem %ship ~] '']]~ key-list.bespoke.data.index)
        ?~  loc
          ?.  =(toggle.act %.y)  [~ items]
          =/  bespoke-input  [%list (snoc key-list.bespoke.data.index [src.act [%nonitem %ship ~] ''])]
          =/  list-act  [%edit index-key general.data.index bespoke-input]
          (edit:on-action items our our now list-act)
        ?.  =(toggle.act %.n)  [~ items]
        =/  bespoke-input  [%list (oust [u.loc 1] key-list.bespoke.data.index)]
        =/  list-act  [%edit index-key general.data.index bespoke-input]
        (edit:on-action items our our now list-act)
      ==
    --
  ::
  ++  on-agent
    |%
    ++  put
      |=  [=items our=ship src=ship upd=[%put =key =item]]
      ^-  [(list card) ^items]
      :-  (put:on-agent:make-cards items our src upd)
      (put-item:store our items upd)
    ::
    ++  del
      |=  [=items our=ship src=ship upd=[%del =key]]
      ^-  [(list card) ^items]
      ?:  =(-.type.key.upd %nonitem)  [~ items]
      =^  changed  items  (del-item our src items upd)
      :-  (del:on-agent:make-cards items our src changed upd)
      items
    --
  ::
  ++  make-cards
    |%
    ++  on-poke
      |%
      ++  put
        |=  [=items our=ship src=ship upd=[%put =key =item]]
        ^-  (list card)
        ?:  =(type.key.upd /validity-store)  ~
        %+  welp
        :~  [%pass /put %agent [our %portal-manager] %poke %portal-update !>(upd)]
            [%give %fact [/front-end-update]~ %portal-front-end-update !>((make-front-end-update items our src upd))]
        ==
        ?.  &(=(our ship.key.upd) ?!(=(-.type.key.upd %nonitem)))  ~
        [%give %fact [(key-to-path-key:conv key.upd)]~ [%portal-update !>(upd)]]~
      ::
      ++  del
        |=  [=items our=ship src=ship changed=?(%changed %unchanged) upd=[%del =key]]
        ^-  (list card)
        ?:  =(changed %unchanged)  ~
        ::~&  "%portal-store: unsubscribing from {(spud (key-to-path:conv key.upd))}"
        %+  welp
          :~  [%pass /del %agent [our %portal-manager] %poke %portal-update !>(upd)]
              [%give %fact [/front-end-update]~ %portal-front-end-update !>((make-front-end-update items our src upd))]
          ==
        ?:  =(-.type.key.upd %nonitem)
          %+  welp
          ?+    type.key.upd    ~
              [%nonitem %app ~]
            =/  wire  [%treaty (key-to-path-key:conv key.upd)]
            [%pass wire %agent [ship.key.upd %treaty] %leave ~]~
              [%nonitem %group ~]
            =/  wire  [%get-group-preview /(scot %p ship.key.upd)/[`@tas`cord.key.upd]]
            [%pass wire %agent [ship.key.upd %groups] %leave ~]~
          ==
          ?:  =(our ship.key.upd)
            [%give %fact [(key-to-path-key:conv key.upd)]~ [%portal-update !>(upd)]]~
          ~
        ?:  =(our ship.key.upd)
          [%give %fact [(key-to-path-key:conv key.upd)]~ [%portal-update !>(upd)]]~
        [%pass (key-to-path-key:conv key.upd) %agent [ship.key.upd %portal-store] %leave ~]~
      ::
      ++  sub
        |=  [our=ship src=ship wex=boat:gall upd=[%sub =key]]
        ^-  (list card)
        =/  wire  (key-to-path-key:conv key.upd)
        ?:  (~(has by wex) [wire ship.key.upd %portal-store])
          ~&  "%portal-store: already subscribed to {(spud wire)}"
          ~
        ::~&  "%portal-store: subscribing to {(spud wire)}"
        [%pass wire %agent [ship.key.upd %portal-store] %watch wire]~
      ::
      --
    ++  on-agent
      |%
      ++  put
        |=  [=items our=ship src=ship upd=[%put =key =item]]
        ^-  (list card)
        :~  [%pass /put %agent [our %portal-manager] %poke %portal-update !>(upd)]
            [%give %fact [/front-end-update]~ %portal-front-end-update !>((make-front-end-update items our src upd))]
        ==
      ::
      ++  del
        |=  [=items our=ship src=ship changed=?(%changed %unchanged) upd=[%del =key]]
        ^-  (list card)
        ?:  =(changed %unchanged)  ~
        ::~&  "%portal-store: unsubscribing from {(spud (key-to-path:conv key.upd))}"
        :~  [%pass /del %agent [our %portal-manager] %poke %portal-update !>(upd)]
            [%give %fact [/front-end-update]~ %portal-front-end-update !>((make-front-end-update items our src upd))]
        ==
      --
    --
  ::
  ++  make-front-end-update
    |=  [=items our=ship src=ship upd=update]
    ^-  front-end-update
    :*  ?:(=(src our) %.y %.n)
        ?+    -.upd    !!
          %put  [-.upd key.upd item.upd]
          %del  [-.upd key.upd ~]
        ==
    ==
  ::
  --
::
::  'macros' of commands happen on portal-manager level
::  TODO fundamental commands (actions) and composite commands
++  manager
  |%
  ::
  ++  on-update
    |%
    ::  does this has to respond to foreign
    ::  or it can also respond to us?
    ::  how do we as a user/curator go around discovering/addign items
    ::  do lists from those items get auto fetched if we added them?
    ++  put
      |=  [our=ship now=time upd=[%put =key =item]]
      ^-  (list card)
      ?:  &(=(-.type.key.upd %validity-store) =(our ship.key.upd))
        ~
      ?:  =(-.type.key.upd %nonitem)
        ~
      %+  weld
        ?.  =(our ship.key.upd)  ~
        ?+    type.key.upd    ~
          ::   [%enditem %other ~]
          :: ?:  (in-default-list:scry our now key.upd)  ~
          :: ~[(act-to-act-card:cards [%add-to-default-list key.upd] our %portal-store)]
            [%enditem %app ~]
          ?+    -.bespoke.data.item.upd    !!
              %enditem-app
            =/  dist-desk  (parse-dist-desk:misc dist-desk.bespoke.data.item.upd)
            ::%+  weld
            ?~  dist-desk  ~
            ~[(act-to-act-card:cards [%get-docket key.upd -.u.dist-desk +.u.dist-desk] our %portal-manager)]
            :: ?:  (in-default-list:scry our now key.upd)  ~
            :: ~[(act-to-act-card:cards [%add-to-default-list key.upd] our %portal-store)]
          ==
        ==
      %+  weld
        ?+    -.type.key.upd    ~
            %list
          %-  zing
          :~  (sub-to-list-keys our now item.upd)
              ?.  =(our ship.key.upd)  ~
              ?+    type.key.upd    ~
                  [%list ~]

                ?:  (~(in-default-list scry our now) key.upd)  ~
                ~[(act-to-act-card:cards [%add-to-default-list key.upd] our %portal-store)]
              ==
          ==
        ==
      =/  val  (default-v1:validator our now key.upd item.upd)
      ?~  val  ~
      val
    ::
    ++  del
      |=  [upd=[%del =key]]
      ^-  (list card)
      ~
    --
  ::
  ++  sub-to-list-keys ::  + get-list-nonitems
    |=  [our=ship now=time =item]
    ^-  (list card)
    ?+    -.bespoke.data.item    ~
        %list-list
      =/  key-list  (skip-ships:keys list-key-list.bespoke.data.item ~[our])
      =/  filtered-set  (set-difference:keys (silt key-list) (~(get-all-keys scry our now)))
      =/  filtered-list  ~(tap in filtered-set)
      (turn filtered-list (cury key-to-sub-card:cards our))
    ::
        %list
      ::  nonitems
      :: if you do set-difference you keep old data, if you don't do set difference you constantly overwrite fine data
      :: after purge new nonitems are taken daily
      =/  nonitem-key-list   (skim-nonitem:keys key-list.bespoke.data.item)
      =/  filtered-set  (set-difference:keys (silt nonitem-key-list) (~(get-all-keys scry our now)))
      =/  filtered-list  ~(tap in filtered-set)
      =/  nonitem-cards  ^-  (list card)
         %-  zing
        (turn filtered-list |=(=key (put-empty-nonitem:manager our key)))
      ::  enditems
      =/  key-list  (skip-nonitem:keys key-list.bespoke.data.item)
      =/  key-list  (skip-ships:keys key-list ~[our])
      =/  filtered-set  (set-difference:keys (silt key-list) (~(get-all-keys scry our now)))
      =/  filtered-list  ~(tap in filtered-set)
      =/  enditem-cards  (turn filtered-list (cury key-to-sub-card:cards our))
      (weld enditem-cards nonitem-cards)
    ==
  ::
  ++  get-nonitems
    |=  [our=ship =key-list]
    ^-  (list card)
    =/  filtered-list  (skim-nonitem:keys key-list)
    %-  zing
    (turn filtered-list |=(=key (put-empty-nonitem:manager our key)))
  ::
  ::  whatever nonitem you are adding, use this
  ++  put-empty-nonitem
    |=  [our=ship =key]
    ^-  (list card)
    =/  meta
      :*  updated-at='~2000.1.1'
          permissions=~[our]
          reach=[%public blacklist=~]
          outside-sigs=~
      ==
    ?+    type.key    !!
        [%nonitem %group ~]
      =/  data  [[%nonitem-group ~] *general]
      :~  (act-to-act-card:cards [%put-nonitem key [key data meta *social *signature]] our %portal-store)
          (act-to-act-card:cards [%get-group-preview key ship.key cord.key] our %portal-manager)
      ==
        [%nonitem %ship ~]
      =/  data  [[%nonitem-ship ~] *general]
      ~[(act-to-act-card:cards [%put-nonitem key [key data meta *social *signature]] our %portal-store)]
        [%nonitem %app ~]
      =/  data  [[%nonitem-app *treaty] *general]
      :~  (act-to-act-card:cards [%put-nonitem key [key data meta *social *signature]] our %portal-store)
          (act-to-act-card:cards [%get-docket key ship.key cord.key] our %portal-manager)
      ==
    ==
  ::
  ++  fill-group-data
    |=  [our=ship act=[%fill-nonitem-group =key title=@t description=@t image=@t]]
    ^-  card
    =/  general  *general
    =/  data  [[%nonitem-group ~] general(title title.act, description description.act, image image.act)]
    =/  meta
      :*  updated-at='~2000.1.1'
          permissions=~[our]
          reach=[%public blacklist=~]
          outside-sigs=~
      ==
    (act-to-act-card:cards [%put-nonitem key.act [key.act data meta *social *signature]] our %portal-store)
  ::
  ++  fill-nonitem-app-data
    |=  [our=ship act=[%fill-nonitem-app =key =treaty]]
    ^-  card
    =/  general  *general
    =/  data  [[%nonitem-app treaty.act] general]
    =/  meta
      :*  updated-at='~2000.1.1'
          permissions=~[our]
          reach=[%public blacklist=~]
          outside-sigs=~
      ==
    (act-to-act-card:cards [%put-nonitem key.act [key.act data meta *social *signature]] our %portal-store)
  ::
  --
::
::  includes arms which are used to validate data
++  validator
  |%
  ++  default-v1
    |=  [our=ship now=time item-key=key =item]
    ^-  (list card)
    ::  slight amount of time after this
    ?.  =(type.item-key [%enditem %app ~])  ~
    =/  v-store-key  `key`[our [%validity-store ~] '~2000.1.1']
    =/  validity-store  `^item`(~(get-item scry our now) v-store-key)
    ?+    -.bespoke.data.validity-store    ~
        %validity-store
      =/  validation-result  ['default-v1' (new-item our now item-key item) 'default']
      =/  validity-records  validity-records.bespoke.data.validity-store
      =/  validation-time-map  (~(gut by validity-records) item-key *validation-time-map)
      =/  validation-time-map  (put:valid-mop validation-time-map now validation-result)
      =/  validity-records  (~(put by validity-records) item-key validation-time-map)
      =/  edit-action  `action`[%edit v-store-key general.data.validity-store [%validity-store validity-records]]
      [%pass /edit %agent [our %portal-manager] %poke %portal-action !>(edit-action)]~   :: why send card instead of calling edit function?
    ==

  ++  get-latest
    |=  [our=ship now=time =key]
    ^-  v-result
    =/  validity-store  (~(get-item scry our now) [our [%validity-store ~] '~2000.1.1'])
    ?+    -.bespoke.data.validity-store    ~
        %validity-store
      =/  validity-records  validity-records.bespoke.data.validity-store
      =/  validation-time-map  (~(gut by validity-records) key *validation-time-map)
      ?~  validation-time-map  ~
      =/  maybe-valid  (pry:valid-mop (^validation-time-map validation-time-map))
      ?~  maybe-valid  ~
      =/  maybe-valid  `validation-result`val.u.maybe-valid
      v-result.maybe-valid
    ==
  ::
  ::  validates item for signature
  ::  if app- dist-desk, signature, id
  ++  new-item
    |=  [our=@p now=@da =key =item]
    ^-  v-result
    ?+    -.bespoke.data.item    ~
        %enditem-app
      =/  dist-desk  (parse-dist-desk:misc dist-desk.bespoke.data.item)
      ?~  dist-desk  [~ %.n]
      (sig key dist-name.u.dist-desk desk-name.u.dist-desk sig.bespoke.data.item our now)
    ==

  ::
  ::  validates signature
  ++  sig
    |=  [=key dist-ship=@p desk-name=@tas =signature our=@p now=@da]
    ^-  v-result
    ?:  (ships-related:misc ship.key dist-ship)
      [~ %.y]
    ?.  =(ship.signature dist-ship)
      ~&  "signature fail: ship in sig ({(scow %p ship.signature)}) and distributor ship ({(scow %p dist-ship)}) are not the same"
      [~ %.n]
    ?:  =((get-ship-type:misc our) %comet)
      ~&  "our ship is a comet - skipping signature validation of {(trip desk-name)} by {(scow %p dist-ship)}. beware, apps may be unsafe and/or pirated"
      ~
    ?.  (validate:^sig [our signature [%app key desk-name] now])
      ~&  "signature fail: distributor signature validation failed"
      ~&  >>  signature
      [~ %.n]
    [~ %.y]
::
  --
--
