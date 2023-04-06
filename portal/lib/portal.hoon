/-  *portal-data, *portal-update, *portal-action, *portal-front-end-update,
    *portal-config, *portal-message
/+  sig, agentio, mip
|%
+$  card  card:agent:gall
::
++  conv
  |%
  ++  bespoke-write
    |=  [=key =bespoke-input act=$%([%add ~] [%edit =bespoke])]
    ^-  bespoke
    ?-    -.bespoke-input
        %nonitem-ship        [%nonitem-ship key(type [%nonitem %ship ~]) ~]
        %nonitem-group       [%nonitem-group key(type [%nonitem %group ~]) ~]
        %nonitem-app
      ?-    -.act
          %add
        [%nonitem-app key(type [%nonitem %app ~]) *treaty]
      ::
          %edit
        bespoke.act
      ==
        %enditem-other       [%enditem-other key(type [%enditem %other ~]) ~]
        %enditem-app
      ?-    -.act
          %add
        [%enditem-app key(type [%enditem %app ~]) dist-desk.bespoke-input *signature *treaty]
        ::
          %edit
        ?+    -.bespoke.act    !!                     ::  this really needs to be done smarter (the whole type system)
            %enditem-app                              ::  I shouldn't need to confirm things twice. (maybe better sur? lib arms?)
          bespoke.act(dist-desk dist-desk.bespoke-input)
        ==
      ==
      ::
        %list-enditem-other  [%list-enditem-other key(type [%list %enditem %other ~]) other-key-list.bespoke-input]
        %list-enditem-app    [%list-enditem-app key(type [%list %enditem %app ~]) enditem-app-key-list.bespoke-input]
        %list-nonitem-app    [%list-nonitem-app key(type [%list %nonitem %app ~]) nonitem-app-key-list.bespoke-input]
        %list-app            [%list-app key(type [%list %app ~]) app-key-list.bespoke-input]
        %list-nonitem-group  [%list-nonitem-group key(type [%list %nonitem %group ~]) group-key-list.bespoke-input]
        %list-nonitem-ship   [%list-nonitem-ship key(type [%list %nonitem %ship ~]) ship-key-list.bespoke-input]
        %list-list           [%list-list key(type [%list %list ~]) list-key-list.bespoke-input]
        %validity-store      [%validity-store key(type [%validity-store ~]) validity-records.bespoke-input]
    ==
  ::
  ++  key-to-path
    |=  [=key]
    ^-  path
    %+  weld  ~[(scot %p ship.key)]
    %+  weld  type.key
              ~[cord.key]
  ::
  ++  path-to-key
    |=  [=path]
    ^-  key
    :+  (slav %p -:path)
        (flop (snip (flop (snip path))))
        (rear path)
  ::
  ++  feed-to-key-list
    |=  [=feed]
    ^-  key-list
    (turn feed |=([time=cord =ship =key] key))
  ::
  ++  key-list-to-key-text-list  :: make key-text-list with empty comments
    |=  [=key-list]
    ^-  key-text-list
    (turn key-list |=(=key [key '']))
  ::
  ++  key-text-list-to-key-list
    |=  [=key-text-list]:: ?(app-key-list other-key-list group-key-list ship-key-list)
    ^-  key-list
    (turn key-text-list |=([cel=[=key text=cord]] (head cel)))
  ::
  ++  boat-to-outgoing-subs
    |=  wex=boat:gall
    ^-  outgoing-subs
    =/  new-mip  *(map ship (map key ?))
    =/  l  ~(val by wex)
    =/  n  0
    |-
    ?:  =(n (lent l))  new-mip
    %=  $
      n  +(n)
      new-mip
        =/  pair=[acked=? =path]  (snag n l)
        =/  key  (path-to-key:conv path.pair)
        (~(put bi:mip new-mip) ship.key key acked.pair)
    ==
  ::
  ++  all-items-to-nested-one-cur
    |=  [cur-key=key =all-items]
    ^-  nested-all-items
    =/  key-set  ~(key by all-items)
    =/  list-key-list  ~[cur-key]
    ::
    ::  (map list-list-key list-list-item)
    =/  list-list-list  ;;  (list [key ?(~ item)])  (turn list-key-list |=(=key [key (~(gut by all-items) key ~)]))
    =.  list-list-list  ;;  (list [key item])  (skip list-list-list |=([=key item=?(~ item)] ?~(item %.y %.n)))
    =/  list-list-map  ;;  (map key item)  (malt list-list-list)
    ::
    ::  (map list-list-key [list-list-item (map list-pointer list-item)])
    =/  list-list-list-map  (~(run by list-list-map) |=(=item (list-list-item-to-map all-items item)))
    ::
    ::  (map list-list-key [list-list-item (map list-pointer [lis-item (map end-key end-item)])])
    (~(run by list-list-list-map) |=(val=[=item (map key ?(~ item))] (inner-maps-transform all-items val)))
  ::
  ::  find all lists of lists
  ::  for each, create a map with lists
  ::  for each list, create a map with end items
  ++  all-items-to-nested
    |=  [=all-items]
    ^-  nested-all-items
    =/  key-set  ~(key by all-items)
    =/  list-key-list  (skim-types:keys ~(tap in key-set) ~[[%list %list ~]])
    ::
    ::  (map list-list-key list-list-item)
    =/  list-list-map  (malt (turn list-key-list |=(=key [key (~(got by all-items) key)])))
    ::
    ::  (map list-list-key [list-list-item (map list-pointer list-item)])
    =/  list-list-list-map  (~(run by list-list-map) |=(=item (list-list-item-to-map all-items item)))
    ::
    ::  (map list-list-key [list-list-item (map list-pointer [lis-item (map end-key end-item)])])
    (~(run by list-list-list-map) |=(val=[=item (map key ?(~ item))] (inner-maps-transform all-items val)))
  ::
  ++  inner-maps-transform
    |=  [=all-items val=[=item mapp=(map key ?(~ item))]]
    ^-  [item (map key [?(~ item) (map key ?(~ item))])]
    [item.val (~(run by mapp.val) |=(item=?(~ item) (list-item-to-map all-items item)))]
  ::
  ++  list-list-item-to-map
    |=  [=all-items =item]
    ^-  [^item (map key ?(~ ^item))]
    ?+    -.bespoke.data.item    [item ~]
        %list-list
      =/  lists-map  (malt (turn list-key-list.bespoke.data.item |=([=key =cord] [key (~(gut by all-items) key ~)])))
      [item lists-map]
    ==
  ::
  ++  list-item-to-map
    |=  [=all-items item=?(~ item)]
    ^-  [?(~ ^item) (map key ?(~ ^item))]
    ?~  item  [~ ~]
    ?+    -.bespoke.data.item    [item ~]
        %list-enditem-other
      =/  items-map  (malt (turn other-key-list.bespoke.data.item |=([=key =cord] [key (~(gut by all-items) key ~)])))
      [item items-map]
        %list-enditem-app
      =/  items-map  (malt (turn enditem-app-key-list.bespoke.data.item |=([=key =cord] [key (~(gut by all-items) key ~)])))
      [item items-map]
        %list-app
      =/  items-map  (malt (turn app-key-list.bespoke.data.item |=([=key =cord] [key (~(gut by all-items) key ~)])))
      [item items-map]
        %list-nonitem-app
      =/  items-map  (malt (turn nonitem-app-key-list.bespoke.data.item |=([=key =cord] [key (~(gut by all-items) key ~)])))
      [item items-map]
        %list-nonitem-group
      =/  items-map  (malt (turn group-key-list.bespoke.data.item |=([=key =cord] [key (~(gut by all-items) key ~)])))
      [item items-map]
        %list-nonitem-ship
      =/  items-map  (malt (turn ship-key-list.bespoke.data.item |=([=key =cord] [key (~(gut by all-items) key ~)])))
      [item items-map]
    ==
  ::
  --
::
++  scry
  |%
  ::  gets item locally (no remote scry yet)
  ++  get-item
    |=  [our=ship now=time =key]
    ^-  item
    =/  path  (weld (weld /(scot %p our)/portal-store/(scot %da now)/item (key-to-path:conv key)) /portal-item)
    .^(item %gx path)
  ::
  ::  gets item, and if doesn't exist returns ~
  ++  get-item-or-null
    |=  [our=ship now=time =key]
    ^-  ?(~ item)
    =/  path  (weld (weld /(scot %p our)/portal-store/(scot %da now)/item (key-to-path:conv key)) /noun)
    .^(?(~ item) %gx path)
  ::
  ++  get-items
    |=  [our=ship now=time =key-set]
    ^-  (map key ?(~ item))
    =/  all-items  (get-all-items our now)
    (get-items:misc all-items key-set)
  ::
  ::  gets all-items
  ++  get-all-items
    |=  [our=ship now=time]
    ^-  all-items
    =/  path  /(scot %p our)/portal-store/(scot %da now)/all/items/portal-all-items
    .^(all-items %gx path)
  ::
  ::  gets all keys in local all-items
  ++  get-all-keys
    |=  [our=ship now=time]
    ^-  key-set
    =/  path  /(scot %p our)/portal-store/(scot %da now)/all/keys/portal-key-set
    .^(key-set %gx path)
  ::
  ::  gets all-items in nested form
  ++  get-nested-all-items
    |=  [our=ship now=time]
    ^-  nested-all-items
    =/  path  /(scot %p our)/portal-store/(scot %da now)/all/nested/portal-nested-all-items
    .^(nested-all-items %gx path)
  ::
  ++  get-item-latest-validity
    |=  [our=ship now=time =key]
    ^-  result
    =/  path  (weld (weld /(scot %p our)/portal-store/(scot %da now)/valid/latest (key-to-path:conv key)) /portal-result)
    .^(result %gx path)
  ::
  ++  in-default-list
    |=  [our=ship now=time =key]
    ^-  ?
    =/  path  (weld (weld /(scot %p our)/portal-store/(scot %da now)/in-default-list (key-to-path:conv key)) /noun)
    .^(? %gx path)
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
  ::  check whether key (item) is in all-items
  ++  item-in-all-items
    |=  [=key =all-items]
    ^-  ?
    (~(has by all-items) key)
  ::
  ::  verify that a list doesn't repeat apps
  ++  list-has-duplicates
    |=  [=key-list]
    ^-  ?
    =(~(wyt in (silt key-list)) (lent key-list))
  ::
  ::  verify whether key-list is subset of all-items
  ++  key-list-subset-of-all-items
    |=  [=key-list =all-items]
    (levy key-list |=(=key (~(has in ~(key by all-items)) key)))
  ::
  ++  key-in-list-item
    |=  [=key list-item=item]
    ^-  ?
    ?+    -.bespoke.data.list-item    !!
        %list-enditem-other
      =/  key-list  (key-text-list-to-key-list:conv other-key-list.bespoke.data.list-item)
      (key-in-key-list:loob key key-list)
        %list-enditem-app
      =/  key-list  (key-text-list-to-key-list:conv enditem-app-key-list.bespoke.data.list-item)
      (key-in-key-list:loob key key-list)
        %list-nonitem-app
      =/  key-list  (key-text-list-to-key-list:conv nonitem-app-key-list.bespoke.data.list-item)
      (key-in-key-list:loob key key-list)
        %list-app
      =/  key-list  (key-text-list-to-key-list:conv app-key-list.bespoke.data.list-item)
      (key-in-key-list:loob key key-list)
        %list-nonitem-group
      =/  key-list  (key-text-list-to-key-list:conv group-key-list.bespoke.data.list-item)
      (key-in-key-list:loob key key-list)
        %list-nonitem-ship
      =/  key-list  (key-text-list-to-key-list:conv ship-key-list.bespoke.data.list-item)
      (key-in-key-list:loob key key-list)
        %list-list
      =/  key-list  (key-text-list-to-key-list:conv list-key-list.bespoke.data.list-item)
      (key-in-key-list:loob key key-list)
    ==
  --
::
++  cards
  |%
  ++  keys-to-sub-cards
    |=  [our=ship =key-list]
    ^-  (list card)
    =-  (turn - (cury key-to-sub-card our))
    (skip-nonitem:keys key-list)
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
  ++  msg-to-msg-card
    |=  [=message our=ship app=term]
    ^-  card
    [%pass /act %agent [our app] %poke %portal-message !>(message)]
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
  ::  takes all-items and key-set and retrieves the desired items
  ++  get-items
    |=  [=all-items =key-set]
    ^-  (map key ?(~ item))
    %-  malt
    %+  turn  ~(tap in key-set)
    |=  =key
    [key (~(gut by all-items) key ~)]
  ::
  ::  takes list item and outputs key-set
  ++  list-item-to-key-set
    |=  [=item]
    ^-  key-set
    ?+    -.bespoke.data.item    ~
        %list-enditem-other
      %-  silt
      (key-text-list-to-key-list:conv other-key-list.bespoke.data.item)
        %list-enditem-app
      %-  silt
      (key-text-list-to-key-list:conv enditem-app-key-list.bespoke.data.item)
        %list-app
      %-  silt
      (key-text-list-to-key-list:conv app-key-list.bespoke.data.item)
        %list-nonitem-app
      %-  silt
      (key-text-list-to-key-list:conv nonitem-app-key-list.bespoke.data.item)
        %list-nonitem-group
      %-  silt
      (key-text-list-to-key-list:conv group-key-list.bespoke.data.item)
        %list-nonitem-ship
      %-  silt
      (key-text-list-to-key-list:conv ship-key-list.bespoke.data.item)
        %list-list
      %-  silt
      (key-text-list-to-key-list:conv list-key-list.bespoke.data.item)
    ==
  ::
  ::  takes list item and outputs key-list
  ++  list-item-to-key-list
      |=  [=item]
      ^-  key-list
      ?+    -.bespoke.data.item    ~
          %list-enditem-other
        (key-text-list-to-key-list:conv other-key-list.bespoke.data.item)
          %list-enditem-app
        (key-text-list-to-key-list:conv enditem-app-key-list.bespoke.data.item)
          %list-app
        (key-text-list-to-key-list:conv app-key-list.bespoke.data.item)
          %list-nonitem-app
        (key-text-list-to-key-list:conv nonitem-app-key-list.bespoke.data.item)
          %list-nonitem-group
        (key-text-list-to-key-list:conv group-key-list.bespoke.data.item)
          %list-nonitem-ship
        (key-text-list-to-key-list:conv ship-key-list.bespoke.data.item)
          %list-list
        (key-text-list-to-key-list:conv list-key-list.bespoke.data.item)
      ==
  --
::
++  portal-store
  |%
  ::  deletes an item (yours or foreign)
  ++  del-item
    |=  [our=ship src=ship =all-items upd=[%del =key]]
    ^-  [?(%changed %unchanged) ^all-items]
    ::~&  "%portal: deleting {(spud (key-to-path:conv key.upd))}"
    ?:  &(=(cord.key.upd '~2000.1.1') =(ship.key.upd our))
      ~&  "%portal: item is default, not allowed to delete"
      [%unchanged all-items]
    ?.  (~(has by all-items) key.upd)
      ::~&  "%portal: {(spud (key-to-path:conv key.upd))} does not exist"
      [%unchanged all-items]
    [%changed (~(del by all-items) key.upd)]
  ::
  ::  for receiving items, from local %portal-manager or foreign %portal-store
  ++  put-item
    |=  [our=ship =all-items upd=[%put =key =item]]
    ^-  ^all-items
    ::~&  "%portal: putting {(spud (key-to-path:conv key.upd))}"
    (~(put by all-items) key.upd item.upd)
  ::
  ++  default
    |%
    ++  groups-list
      |=  [=all-items our=ship now=time]
      ^-  [(list card) ^all-items]
      =/  general  `general`['Main Groups List' '' 'Your first groups list.' *tags *properties *pictures '' '#e8e8e8']
      =/  act  [%add our [%list %nonitem %group ~] general [%list-nonitem-group ~]]
      (add:on-action:portal-store all-items our our now %.y act)
    ::
    ++  enditem-apps-list
      |=  [=all-items our=ship now=time]
      ^-  [(list card) ^all-items]
      =/  general  ['Main Enditem Apps List' '' 'Your first apps list.' *tags *properties *pictures '' '#e8e8e8']
      =/  act  [%add our [%list %enditem %app ~] general [%list-enditem-app ~]]
      (add:on-action:portal-store all-items our our now %.y act)
    ::
    ++  nonitem-apps-list
      |=  [=all-items our=ship now=time]
      ^-  [(list card) ^all-items]
      =/  general  ['Main Nonitem Apps List' '' 'Your first apps list.' *tags *properties *pictures '' '#e8e8e8']
      =/  act  [%add our [%list %nonitem %app ~] general [%list-nonitem-app ~]]
      (add:on-action:portal-store all-items our our now %.y act)
    ::
    ++  apps-list
      |=  [=all-items our=ship now=time]
      ^-  [(list card) ^all-items]
      =/  general  ['Main Apps List' '' 'Your first apps list.' *tags *properties *pictures '' '#e8e8e8']
      =/  act  [%add our [%list %app ~] general [%list-app ~]]
      (add:on-action:portal-store all-items our our now %.y act)
    ::
    ++  ships-list
      |=  [=all-items our=ship now=time]
      ^-  [(list card) ^all-items]
      =/  general  ['Main Ships List' '' 'Your first ships list.' *tags *properties *pictures '' '#e8e8e8']
      =/  act  [%add our [%list %nonitem %ship ~] general [%list-nonitem-ship ~]]
      (add:on-action:portal-store all-items our our now %.y act)
    ::
    ++  other-list
      |=  [=all-items our=ship now=time]
      ^-  [(list card) ^all-items]
      =/  general  ['Main Other List' '' 'Your first other items list.' *tags *properties *pictures '' '#e8e8e8']
      =/  act  [%add our [%list %enditem %other ~] general [%list-enditem-other ~]]
      (add:on-action:portal-store all-items our our now %.y act)
    ::
    ++  list-list
      |=  [=all-items our=ship now=time]
      ^-  [(list card) ^all-items]
      =/  general  ['Main Curator Page' '' 'Your first curator page.' *tags *properties *pictures '' '#e8e8e8']
      =/  =list-key-list
        :~  [[our [%list %app ~] '~2000.1.1'] 'These are the apps I recommend']
            [[our [%list %enditem %other ~] '~2000.1.1'] 'These are miscellaneous items I recommend']
            [[our [%list %nonitem %group ~] '~2000.1.1'] 'These are groups I recommend']
            [[our [%list %nonitem %ship ~] '~2000.1.1'] 'These are ships I recommend']
        ==
      =/  act  [%add our [%list %list ~] general [%list-list list-key-list]]
      (add:on-action:portal-store all-items our our now %.y act)
    ::
    ++  validity-store
      |=  [=all-items our=ship now=time]
      ^-  [(list card) ^all-items]
      =/  general  ['Main Validity Store' '' 'Storage of validity of your items.' *tags *properties *pictures '' '#e8e8e8']
      =/  act  [%add our [%validity-store ~] general [%validity-store *validity-records]]
      (add:on-action:portal-store all-items our our now %.y act)
    --
  ::
  ::  purges all foreign items except those from default-curators and portal-curator
  ++  purge
    |=  [=all-items our=ship src=ship now=time act=[%purge =default-curators =portal-curator to-keep=key-list]]
    ^-  [(list card) ^all-items]
    =/  all-items-key-set  ~(key by all-items)
    =/  key-list  ~(tap in all-items-key-set)
    ::make list/set of items
    ::diff from all-items
    =/  ships  (silt (limo ~[our ship.portal-curator.act]))  ::TODO also default curators in here
    =/  our-keys  (skim-ships:keys key-list ~(tap in ships))  ::  LISTLIST KEY LIST
    =/  our-list-lists-keys  (silt (skim-types:keys our-keys ~[[%list %list ~]]))  :: LISTLIST KEYSET
    =/  our-list-lists-items  ::list items
      %-  (list item)  %+  skip
        ~(val by (get-items:misc all-items our-list-lists-keys))
        |=(item=?(~ item) ?~(item %.y %.n))
    =/  our-lists-keys  `(list key)`(zing (turn our-list-lists-items |=(=item (list-item-to-key-list:misc item))))  :: LIST KEYLIST
    =/  our-lists-items
      %-  (list item)  %+  skip
        (turn our-lists-keys |=(=key (~(gut by all-items) key ~)))  :: LIST ITEMLIST
        |=(item=?(~ item) ?~(item %.y %.n))
    =/  our-items-keys  `(list key)`(zing (turn our-lists-items |=(=item (list-item-to-key-list:misc item))))  :: ITEM KEYLIST
    =/  keys-to-keep  (~(uni in (silt our-keys)) (silt our-lists-keys))
    =.  keys-to-keep  (~(uni in keys-to-keep) (silt our-items-keys))
    =.  keys-to-keep  (~(uni in keys-to-keep) (silt to-keep.act))
    :: our-list-lists-keys is redundant
    =/  keys-to-purge  (~(dif in all-items-key-set) keys-to-keep)
    =/  keys  ~(tap in keys-to-purge)
    =/  len  (lent keys)
    =/  n  0
    =/  return  [*(list card) items=all-items]
    =.  return
    |-  ?:  |(=(n len) =(keys ~))  return
      =/  new  (del:on-action items.return our src now [%del (snag n keys)])
      %=  $
        -.return  (weld -.return -.new)
        +.return  +.new
        n  +(n)
      ==
    =/  key-set  ~(key by items.return)
    =/  key-list  ~(tap in key-set)
    ~&  "%portal: purge done"
    :: refreshes kept nonitems kept after purge
    [(weld (get-nonitems:portal-manager our key-list) -.return) +.return]

  ::
  ++  on-action
    |%
    ++  add
      |=  [=all-items our=ship src=ship now=time default=?(%.y %.n) act=[%add =ship =type =general =bespoke-input]]
      ::  these are not the right places to assert -.bespoke correspond to type.id
      ::  if =(%.y default), created-at becomes '~2000.1.1'
      ^-  [(list card) ^all-items]
      ?.  =(our src)  [~ all-items]
      ?.  =(ship.act our)
        ~&  "%portal: not adding item, ship in key must be our"
        [~ all-items]
      =/  key  [ship.act type.act cord=?:(=(default %.y) '~2000.1.1' `@t`(scot %da now))]
      =/  data  [(bespoke-write:conv key bespoke-input.act [%add ~]) general.act]
      =/  meta
        :*  updated-at='~2000.1.1'
            permissions=~[our]
            reach=[%public blacklist=~]
            outside-sigs=~
        ==
      =/  item-sig  (sign:sig our now `sig-input`[%item data meta *social])
      =/  upd  [%put key [data meta *social item-sig]]
      :-  (put:on-poke:make-cards all-items our src upd)
      (put-item our all-items upd)
    ::
    ++  edit
      |=  [=all-items our=ship src=ship now=time act=[%edit =key =general =bespoke-input]]
      ^-  [(list card) ^all-items]
      ::  TODO  can-edit function to abstract permissions
      ?.  =(our src)  [~ all-items]
      ?.  =(ship.key.act our)  [~ all-items]
      =/  item  (~(gut by all-items) key.act ~)
      ?~  item  ~&  "%portal-store: item doesn't exist"  [~ all-items]
      =/  data  [(bespoke-write:conv key.act bespoke-input.act [%edit bespoke.data.item]) general.act]
      =/  item
        %=  item
          updated-at.meta  `@t`(scot %da now)
          data                  data
        ==
      =/  item-sig  (sign:sig our now [%item data meta.item social.item])
      =/  upd  [%put key.act [data meta.item social.item item-sig]]
      :-  (put:on-poke:make-cards all-items our src upd)
      (put-item our all-items upd)
    ::
    ++  edit-general
      |=  [=all-items our=ship src=ship now=time act=[%edit-general =key =general]]
      ^-  [(list card) ^all-items]
      ?.  =(our src)  [~ all-items]
      ?.  =(ship.key.act our)  [~ all-items]
      =/  item  (~(gut by all-items) key.act ~)
      ?~  item  ~&  "%portal-store: item doesn't exist"  [~ all-items]
      =/  item
        %=  item
          updated-at.meta  `@t`(scot %da now)
          general.data      general.act
        ==
      =/  item-sig  (sign:sig our now [%item data.item meta.item social.item])
      =/  upd  [%put key.act [data.item meta.item social.item item-sig]]
      :-  (put:on-poke:make-cards all-items our src upd)
      (put-item our all-items upd)
    ::
    ::  TODO portal-store should be able to add a bunch of items in one arvo cycle (once card)
    ::  used with +add-other-items-and-list from portal-manager, trying out new pattern
    ++  add-with-time
      |=  [=all-items our=ship src=ship now=time act=[%add-with-time =key =general =bespoke-input]]
      ^-  [(list card) ^all-items]
      ?.  =(our src)  [~ all-items]
      ?.  =(ship.key.act our)
        ~&  "%portal: not adding item, ship in key must be our"
        [~ all-items]
      =/  data  [(bespoke-write:conv key.act bespoke-input.act [%add ~]) general.act]
      =/  meta
        :*  updated-at='~2000.1.1'
            permissions=~[our]
            reach=[%public blacklist=~]
            outside-sigs=~
        ==
      =/  item-sig  (sign:sig our now `sig-input`[%item data meta *social])
      =/  upd  [%put key.act [data meta *social item-sig]]
      :-  (put:on-poke:make-cards all-items our src upd)
      (put-item our all-items upd)
    ::
    ++  sub
      |=  [our=ship src=ship now=time wex=boat:gall act=[%sub =key]]
      ^-  (list card)
      ?:  =(-.type.key.act %nonitem)  ~
      ?:  =(ship.key.act our)  ~
      (sub:on-poke:make-cards our src wex act)
    ::
    ++  del
      |=  [=all-items our=ship src=ship now=time act=[%del =key]]
      ^-  [(list card) ^all-items]
      ::?:  =(-.type.key.act %nonitem)  [~ all-items]
      =^  changed  all-items  (del-item our src all-items act)
      :-  (del:on-poke:make-cards all-items our src changed act)
      all-items
    ::
    ++  add-to-default-list
      |=  [=all-items our=ship now=time act=[%add-to-default-list key=[=ship type=?([%list %app ~] [%list %enditem %other ~] [%list %nonitem %group ~] [%list %nonitem %ship ~] [%enditem %other ~] [%enditem %app ~]) =cord]]]
      ^-  [(list card) ^all-items]
      =/  list-key
        ?:  |(=(type.key.act [%enditem %app ~]) =(type.key.act [%nonitem %app ~]))
          [our [%list %app ~] '~2000.1.1']
        ?:  =(-.type.key.act %list)
          [our [%list %list ~] '~2000.1.1']
        [our [%list type.key.act] '~2000.1.1']
      =/  list  (~(got by all-items) list-key)
      ?+    -.bespoke.data.list    [~ all-items]
          %list-enditem-other
        =/  bespoke-input  [%list-enditem-other (snoc other-key-list.bespoke.data.list [[ship.key.act [%enditem %other ~] cord.key.act] 'Auto-recommended'])]
        =/  act  [%edit list-key general.data.list bespoke-input]
        (edit all-items our our now act)
        ::
          %list-enditem-app
        =/  bespoke-input  [%list-enditem-app (snoc enditem-app-key-list.bespoke.data.list [[ship.key.act [%enditem %app ~] cord.key.act] 'Auto-recommended'])]
        =/  act  [%edit list-key general.data.list bespoke-input]
        (edit all-items our our now act)
        ::
          %list-nonitem-app
        =/  bespoke-input  [%list-nonitem-app (snoc nonitem-app-key-list.bespoke.data.list [[ship.key.act [%nonitem %app ~] cord.key.act] 'Auto-recommended'])]
        =/  act  [%edit list-key general.data.list bespoke-input]
        (edit all-items our our now act)
        ::
          %list-app
        =/  bespoke-input
          :-  %list-app
          %+   snoc  app-key-list.bespoke.data.list
          :_  'Auto-recommended'
          ?+    type.key.act    !!
              [%enditem %app ~]
            ::key.act(type [%enditem %app ~])
            [ship.key.act [%enditem %app ~] cord.key.act]
            ::   [%nonitem %app ~]
            :: ::key.act(type [%nonitem %app ~])
            :: [ship.key.act [%nonitem %app ~] cord.key.act]
          ==
        =/  act  [%edit list-key general.data.list bespoke-input]
        (edit all-items our our now act)
        ::
          %list-nonitem-group
        =/  bespoke-input  [%list-nonitem-group (snoc group-key-list.bespoke.data.list [[ship.key.act [%nonitem %group ~] cord.key.act] 'Auto-recommended'])]
        =/  act  [%edit list-key general.data.list bespoke-input]
        (edit all-items our our now act)
       ::
          %list-nonitem-ship
        =/  bespoke-input  [%list-nonitem-ship (snoc ship-key-list.bespoke.data.list [[ship.key.act [%nonitem %ship ~] cord.key.act] 'Auto-recommended'])]
        =/  act  [%edit list-key general.data.list bespoke-input]
        (edit all-items our our now act)
        ::
          %list-list
        ?+    -.type.key.act    !!
            %list
          =/  bespoke-input  [%list-list (snoc list-key-list.bespoke.data.list [key.act 'Auto-recommended'])]
          =/  act  [%edit list-key general.data.list bespoke-input]
          (edit all-items our our now act)
        ==
      ==
    ::
    ++  add-item-to-list  ::TODO /list/app
      |=  [=all-items our=ship src=ship now=time act=[%add-item-to-list list-key=[=ship type=?([%list %app ~] [%list %enditem %other ~]) =cord] =ship =type =general =bespoke-input text=cord]]
      ^-  [(list card) ^all-items]
      =/  list  (~(got by all-items) list-key.act)
      ?+    -.bespoke.data.list    [~ all-items]
          %list-enditem-other
        =/  bespoke-input  [%list-enditem-other (snoc other-key-list.bespoke.data.list [[ship.act [%enditem %other ~] `@t`(scot %da now)] text.act])]
        =/  list-act  [%edit list-key.act general.data.list bespoke-input]
        =^  cards1  all-items
          (add-with-time all-items our src now [%add-with-time [ship.act type.act `@t`(scot %da now)] general.act bespoke-input.act])
        =^  cards2  all-items
          (edit all-items our our now list-act)
        [(weld cards1 cards2) all-items]
      ==
    ::
    ++  overwrite-list
      |=  [=all-items our=ship now=time act=[%overwrite-list list-key=[=ship type=[%list type] =cord] =key-text-list]]
      ^-  [(list card) ^all-items]
      ?.  =(ship.list-key.act our)  [~ all-items]
      =/  list  (~(gut by all-items) list-key.act ~)
      ?~  list  ~&  "%portal-store: list doesn't exist"  [~ all-items]
      ?+    -.bespoke.data.list    [~ all-items]
          %list-enditem-other
        =/  bespoke-input  [%list-enditem-other (other-key-list key-text-list.act)]
        =/  act  [%edit list-key.act general.data.list bespoke-input]
        (edit all-items our our now act)
        ::
          %list-enditem-app
        =/  bespoke-input  [%list-enditem-app (enditem-app-key-list key-text-list.act)]
        =/  act  [%edit list-key.act general.data.list bespoke-input]
        (edit all-items our our now act)
        ::
          %list-nonitem-app
        =/  bespoke-input  [%list-nonitem-app (nonitem-app-key-list key-text-list.act)]
        =/  act  [%edit list-key.act general.data.list bespoke-input]
        (edit all-items our our now act)
        ::
          %list-app
        =/  bespoke-input  [%list-app (app-key-list key-text-list.act)]
        =/  act  [%edit list-key.act general.data.list bespoke-input]
        (edit all-items our our now act)
        ::
          %list-nonitem-group
        =/  bespoke-input  [%list-nonitem-group (group-key-list key-text-list.act)]
        =/  act  [%edit list-key.act general.data.list bespoke-input]
        (edit all-items our our now act)
      ::
          %list-nonitem-ship
        =/  bespoke-input  [%list-nonitem-ship (ship-key-list key-text-list.act)]
        =/  act  [%edit list-key.act general.data.list bespoke-input]
        (edit all-items our our now act)
      ==
    ::
    ::  for now just overwrites
    ::  long term nonitems should be able to sync with their source
    ::  and not be overwritten every time
    ++  put-nonitem
      |=  [=all-items our=ship src=ship act=[%put-nonitem =key =item]]
      ^-  [(list card) ^all-items]
      :-  (put:on-poke:make-cards all-items our src [%put key.act item.act])
      (put-item our all-items [%put key.act item.act])
    ::
    ++  edit-docket
      |=  [=all-items our=ship src=ship now=time act=[%edit-docket =key =treaty]]
      ^-  [(list card) ^all-items]
      ::  ?.  =(our src)  [~ all-items]  -  this doesn't make sense here
      ::  how to make it so that =(our src) makes sense as a validation in general
      ?.  =(ship.key.act our)  [~ all-items]
      =/  item  (~(gut by all-items) key.act ~)
      ?~  item  ~&  "%portal-store: item doesn't exist"  [~ all-items]
      ?+    -.bespoke.data.item    !!
          %enditem-app
        =/  item
          %=  item
            updated-at.meta         `@t`(scot %da now)
            treaty.bespoke.data     treaty.act
          ==
        =/  item-sig  (sign:sig our now (sig-input [%item data.item meta.item social.item]))
        =/  upd  [%put key.act item(sig item-sig)]
        :-  (put:on-poke:make-cards all-items our src upd)
        (put-item our all-items upd)
      ==
    ::

    --
  ::
  ++  on-message
    |%
    ++  comment
      |=  [=all-items our=ship src=ship now=time act=[%comment =key text=@t]]
      ^-  [(list card) ^all-items]
      ?.  =(our ship.key.act)  [~ all-items]
      =/  item  (~(gut by all-items) key.act ~)
      ?~  item  ~&  "%portal-store: item doesn't exist"  [~ all-items]
      =/  new-comments  (~(put by comments.social.item) [src `@t`(scot %da now)] [text.act '~2000.1.1'])
      =/  upd  [%put key.act item(comments.social new-comments)]
      :-  (put:on-poke:make-cards all-items our src upd)
      (put-item our all-items upd)
    ::
    ++  edit-comment
      |=  [=all-items our=ship src=ship now=time act=[%edit-comment =key =created-at text=@t]]
      ::  TODO test wrong pointer, on every action, local and foreign
      ::  TODO check is-current on revs for apps
      ^-  [(list card) ^all-items]
      ?.  =(our ship.key.act)  [~ all-items]
      =/  item  (~(gut by all-items) key.act ~)
      ?~  item  ~&  "%portal-store: item doesn't exist"  [~ all-items]
      ?.  (~(has by comments.social.item) [src created-at.act])  [~ all-items]
      =/  new-comments  (~(put by comments.social.item) [src created-at.act] [text.act `@t`(scot %da now)])
      =/  upd  [%put key.act item(comments.social new-comments)]
      :-  (put:on-poke:make-cards all-items our src upd)
      (put-item our all-items upd)
    ::
    ++  del-comment
      |=  [=all-items our=ship src=ship now=time act=[%del-comment =key =created-at]]
      ^-  [(list card) ^all-items]
      ?.  =(our ship.key.act)  [~ all-items]
      =/  item  (~(gut by all-items) key.act ~)
      ?~  item  ~&  "%portal-store: item doesn't exist"  [~ all-items]
      ?.  (~(has by comments.social.item) [src created-at.act])  [~ all-items]
      =/  new-comments  (~(del by comments.social.item) [src created-at.act])
      =/  upd  [%put key.act item(comments.social new-comments)]
      :-  (put:on-poke:make-cards all-items our src upd)
      (put-item our all-items upd)
    ::
    ++  rate
      |=  [=all-items our=ship src=ship now=time act=[%rate =key rating-num=@ud]]
      ^-  [(list card) ^all-items]
      ?.  =(our ship.key.act)  [~ all-items]
      ?.  &((gte rating-num.act 1) (lte rating-num.act 5))  [~ all-items]
      =/  item  (~(gut by all-items) key.act ~)
      ?~  item  ~&  "%portal-store: item doesn't exist"  [~ all-items]
      =/  rating  (~(get by ratings.social.item) src)
      =/  new-rating
        ?~  rating  [rating-num.act '~2000.1.1' `@t`(scot %da now)]
        [rating-num.act `@t`(scot %da now) created-at.u.rating]
      =/  new-ratings  (~(put by ratings.social.item) src new-rating)
      =/  upd  [%put key.act item(ratings.social new-ratings)]
      :-  (put:on-poke:make-cards all-items our src upd)
      (put-item our all-items upd)
    ::
    ++  unrate
      |=  [=all-items our=ship src=ship now=time act=[%unrate =key]]
      ^-  [(list card) ^all-items]
      ?.  =(our ship.key.act)  [~ all-items]
      =/  item  (~(gut by all-items) key.act ~)
      ?~  item  ~&  "%portal-store: item doesn't exist"  [~ all-items]
      ?.  (~(has by ratings.social.item) src)  [~ all-items]
      =/  new-ratings  (~(del by ratings.social.item) src)
      =/  upd  [%put key.act item(ratings.social new-ratings)]
      :-  (put:on-poke:make-cards all-items our src upd)
      (put-item our all-items upd)
    ::
    ++  review
      |=  [=all-items our=ship src=ship now=time act=[%review =key text=@t hash=@uv is-safe=?]]
      ::  no review signatures for now
      ^-  [(list card) ^all-items]
      ?.  =(our ship.key.act)  [~ all-items]
      =/  item  (~(gut by all-items) key.act ~)
      ?~  item  ~&  "%portal-store: item doesn't exist"  [~ all-items]
      :: TODO is-current for apps
      ::=/  is-current  =(hash desk-hash.dst-input.app-page)
      =/  is-current  %.n
      =/  rev  (~(get by reviews.social.item) src)
      =/  new-review
        ?~  rev  [text.act hash.act is-current is-safe.act '~2000.1.1' `@t`(scot %da now) *signature]
        [text.act hash.act is-current is-safe.act `@t`(scot %da now) created-at.u.rev *signature]
      =/  new-reviews  (~(put by reviews.social.item) src new-review)
      =/  upd  [%put key.act item(reviews.social new-reviews)]
      :-  (put:on-poke:make-cards all-items our src upd)
      (put-item our all-items upd)
    ::
    ++  del-review
      |=  [=all-items our=ship src=ship now=time act=[%del-review =key]]
      ^-  [(list card) ^all-items]
      ?.  =(our ship.key.act)  [~ all-items]
      =/  item  (~(gut by all-items) key.act ~)
      ?~  item  ~&  "%portal-store: item doesn't exist"  [~ all-items]
      ?.  (~(has by reviews.social.item) src)  [~ all-items]
      =/  new-reviews  (~(del by reviews.social.item) src)
      =/  upd  [%put key.act item(reviews.social new-reviews)]
      :-  (put:on-poke:make-cards all-items our src upd)
      (put-item our all-items upd)
    ::
    ++  index-as-curator  ::idempotent toggle
      |=  [=all-items our=ship src=ship now=time act=[%index-as-curator src=ship toggle=?]]
      ^-  [(list card) ^all-items]
      ?>  =(our ~worpet-bildet)
      =/  index-key  [our [%list %nonitem %ship ~] 'index']
      =/  index  (~(gut by all-items) index-key ~)
      ?~  index  ~&  "%portal-store: index doesn't exist"  [~ all-items]
      ?+    -.bespoke.data.index    [~ all-items]
          %list-nonitem-ship
        =/  loc  (find [[[src.act [%nonitem %ship ~] ''] 'Auto-recommended']]~ ship-key-list.bespoke.data.index)
        ?~  loc
          ?.  =(toggle.act %.y)  [~ all-items]
          =/  bespoke-input  [%list-nonitem-ship (snoc ship-key-list.bespoke.data.index [[src.act [%nonitem %ship ~] ''] 'Auto-recommended'])]
          =/  list-act  [%edit index-key general.data.index bespoke-input]
          (edit:on-action all-items our our now list-act)
        ?.  =(toggle.act %.n)  [~ all-items]
        =/  bespoke-input  [%list-nonitem-ship (oust [u.loc 1] ship-key-list.bespoke.data.index)]
        =/  list-act  [%edit index-key general.data.index bespoke-input]
        (edit:on-action all-items our our now list-act)
      ==
    ::
    ::  should assert/specify that can only receive signature from specific ship, as defined in link for %app items
    ::  for other types a different definition which ship can send an outside-sig
    ::  TODO look thru ++sig from app-store.hoon
    ++  sign-app
      |=  [=all-items our=ship src=ship now=time msg=[%sign-app =key sig=signature]]
      ::  TODO  should I put the whole logic in here? (including making cards etc)
      ^-  [(list card) ^all-items]
      ?.  =(our ship.key.msg)  [~ all-items]
      =/  item  (~(gut by all-items) key.msg ~)
      ?~  item  ~&  "%portal-store: item doesn't exist"  [~ all-items]
      ?+    -.bespoke.data.item    [~ all-items]
          %enditem-app
        ?.  =(src -:(need (parse-dist-desk:misc dist-desk.bespoke.data.item)))  [~ all-items]
        =/  upd  [%put key.msg item(sig.bespoke.data sig.msg)]
        :-  (put:on-poke:make-cards all-items our src upd)
        (put-item our all-items upd)
      ==
    ::
    :: ++  send-app-data
    ::   |=  [=all-items our=ship src=ship now=time msg=[%send-app-data =key data=[desk-hash=@uv =docket]]]   :: use app-name=@tas when inputting
    ::   ::  how to do correct item type assertions etc?
    ::   ^-  [(list card) ^all-items]
    ::   ?.  =(our ship.key.msg)  [~ all-items]
    ::   =/  item  (~(gut by all-items) key.msg ~)
    ::   ?~  item  ~&  "%portal-store: item doesn't exist"  [~ all-items]
    ::   ::?<  ?=(@tas data.act)
    ::   ::  ?=([@uv docket] data.act)
    ::   ?+    -.bespoke.data.item   [~ all-items]
    ::       %enditem-app
    ::     ?.  =(src -:(need (parse-dist-desk:misc dist-desk.bespoke.data.item)))  [~ all-items]
    ::     =/  bespoke  bespoke.data.item(desk-hash desk-hash.data.msg, docket docket.data.msg)
    ::     =/  upd  [%put key.msg item(bespoke.data bespoke)]
    ::     :-  (put:on-poke:make-cards all-items our src upd)
    ::     (put-item our all-items upd)
    ::   ==
    --
  ::
  ++  on-agent
    |%
    ++  put
      |=  [=all-items our=ship src=ship upd=[%put =key =item]]
      ^-  [(list card) ^all-items]
      :-  (put:on-agent:make-cards all-items our src upd)
      (put-item:portal-store our all-items upd)
    ::
    ++  del
      |=  [=all-items our=ship src=ship upd=[%del =key]]
      ^-  [(list card) ^all-items]
      ?:  =(-.type.key.upd %nonitem)  [~ all-items]
      =^  changed  all-items  (del-item our src all-items upd)
      :-  (del:on-agent:make-cards all-items our src changed upd)
      all-items
    --
  ::
  ++  make-cards
    |%
    ++  on-poke
      |%
      ++  put
        |=  [=all-items our=ship src=ship upd=[%put =key =item]]
        ^-  (list card)
        ?:  =(type.key.upd /validity-store)  ~
        %+  welp
        :~  [%pass /put %agent [our %portal-manager] %poke %portal-update !>(upd)]
            [%give %fact [/front-end-update]~ %portal-front-end-update !>((make-front-end-update all-items our src upd))]
        ==
        ?.  &(=(our ship.key.upd) ?!(=(-.type.key.upd %nonitem)))  ~
        [%give %fact [(key-to-path:conv key.upd)]~ [%portal-update !>(upd)]]~
      ::
      ++  del
        |=  [=all-items our=ship src=ship changed=?(%changed %unchanged) upd=[%del =key]]
        ^-  (list card)
        ?:  =(changed %unchanged)  ~
        ::~&  "%portal-store: unsubscribing from {(spud (key-to-path:conv key.upd))}"
        %+  welp
          :~  [%pass /del %agent [our %portal-manager] %poke %portal-update !>(upd)]
              [%give %fact [/front-end-update]~ %portal-front-end-update !>((make-front-end-update all-items our src upd))]
          ==
        ?:  =(-.type.key.upd %nonitem)
          %+  welp
          ?+    type.key.upd    ~
              [%nonitem %app ~]
            =/  wire  [%treaty (key-to-path:conv key.upd)]
            [%pass wire %agent [ship.key.upd %treaty] %leave ~]~
              [%nonitem %group ~]
            =/  wire  [%get-group-preview /(scot %p ship.key.upd)/[`@tas`cord.key.upd]]
            [%pass wire %agent [ship.key.upd %groups] %leave ~]~
          ==
          ?:  =(our ship.key.upd)
            [%give %fact [(key-to-path:conv key.upd)]~ [%portal-update !>(upd)]]~
          ~
        ?:  =(our ship.key.upd)
          [%give %fact [(key-to-path:conv key.upd)]~ [%portal-update !>(upd)]]~
        [%pass (key-to-path:conv key.upd) %agent [ship.key.upd %portal-store] %leave ~]~
      ::
      ++  sub
        |=  [our=ship src=ship wex=boat:gall upd=[%sub =key]]
        ^-  (list card)
        =/  wire  (key-to-path:conv key.upd)
        ?:  (~(has by wex) [wire ship.key.upd %portal-store])
          ::~&  "%portal-store: already subscribed to {(spud wire)}"
          ~
        ::~&  "%portal-store: subscribing to {(spud wire)}"
        [%pass wire %agent [ship.key.upd %portal-store] %watch wire]~
      ::
      --
    ++  on-agent
      |%
      ++  put
        |=  [=all-items our=ship src=ship upd=[%put =key =item]]
        ^-  (list card)
        :~  [%pass /put %agent [our %portal-manager] %poke %portal-update !>(upd)]
            [%give %fact [/front-end-update]~ %portal-front-end-update !>((make-front-end-update all-items our src upd))]
        ==
      ::
      ++  del
        |=  [=all-items our=ship src=ship changed=?(%changed %unchanged) upd=[%del =key]]
        ^-  (list card)
        ?:  =(changed %unchanged)  ~
        ::~&  "%portal-store: unsubscribing from {(spud (key-to-path:conv key.upd))}"
        :~  [%pass /del %agent [our %portal-manager] %poke %portal-update !>(upd)]
            [%give %fact [/front-end-update]~ %portal-front-end-update !>((make-front-end-update all-items our src upd))]
        ==
      --
    --
  ::
  ++  make-front-end-update
    |=  [=all-items our=ship src=ship upd=update]
    ^-  front-end-update
    :*  ?:(=(src our) %.y %.n)
        ?+    -.upd    !!
            %put
          :^  -.upd  key.upd  item.upd
          ?+    -.bespoke.data.item.upd    ~
              %list-enditem-other
            =/  key-list
              %-  key-text-list-to-key-list:conv
              other-key-list.bespoke.data.item.upd
            (get-items:misc all-items (silt key-list))
              %list-enditem-app
            =/  key-list
              %-  key-text-list-to-key-list:conv
              enditem-app-key-list.bespoke.data.item.upd
            (get-items:misc all-items (silt key-list))
              %list-nonitem-app
            =/  key-list
              %-  key-text-list-to-key-list:conv
              nonitem-app-key-list.bespoke.data.item.upd
            (get-items:misc all-items (silt key-list))
              %list-app
            =/  key-list
              %-  key-text-list-to-key-list:conv
              app-key-list.bespoke.data.item.upd
            (get-items:misc all-items (silt key-list))
              %list-nonitem-group
            =/  key-list
              %-  key-text-list-to-key-list:conv
              group-key-list.bespoke.data.item.upd
            (get-items:misc all-items (silt key-list))
              %list-nonitem-ship
            =/  key-list
              %-  key-text-list-to-key-list:conv
              ship-key-list.bespoke.data.item.upd
            (get-items:misc all-items (silt key-list))
          ==
          ::
            %del  [-.upd key.upd ~ ~]
        ==
    ==
  ::
  --
::
::  'macros' of commands happen on portal-manager level
::  TODO fundamental commands (actions) and composite commands
++  portal-manager
  |%
  ++  on-action
    |%
    ::[%add-other-items-and-list list-ship=ship list-type=$%(/list/enditem/other /list/app) list-general=general add-items=(list [%add =ship =type =general =bespoke-input])]]
    ::  note: makes key-text-list with empty texts
    ::  action must be %add-items-and-list
    ++  add-items-and-list
      |=  [our=ship src=ship now=time act=action]
      ^-  (list card)        ::  first item cards, then list card
      ?+    -.act    !!
          %add-items-and-list
        ?.  =(our src)  ~
        ?.  =(list-ship.act our)
          ~&  "%portal: not adding item, ship in key must be our"
          ~
        ::  TODO validate ships in item keys (fine for now since its also done in portal store)
        ::
        =/  n  0
        =/  len  (lent add-items.act)
        =/  time-state  now
        =/  item-keys   *(list key)
        =/  item-cards  *(list card)
        =/  keys-and-cards
          |-  ?:  =(n len)  [item-keys item-cards]
            =/  add-act  (snag n add-items.act)
            =/  key  [ship.add-act type.add-act `@t`(scot %da time-state)]
            =/  item-card  %^  act-to-act-card:cards
              [%add-with-time key general.add-act bespoke-input.add-act]
              our  %portal-store
            %=  $
              n  +(n)
              time-state  `@da`(add time-state `@dr`~s0..0000.0001)
              item-keys   (snoc item-keys key)
              item-cards  (snoc item-cards item-card)
            ==
        =/  key-text-list  (key-list-to-key-text-list:conv -.keys-and-cards)
        =/  bespoke-input
          ?-    list-type.act
              [%list %enditem %other ~]
            [%list-enditem-other key-text-list]
              [%list %app ~]
            [%list-app key-text-list]
          ==
        %+  snoc  +.keys-and-cards
        %^  act-to-act-card:cards
        (action [%add list-ship.act list-type.act list-general.act bespoke-input])
          our  %portal-store
      ==
    ::
    ++  add-items-and-edit-list
      |=  [our=ship src=ship now=time act=action]
      ^-  (list card)        ::  first item cards, then list card
      ?+    -.act    !!
          %add-items-and-edit-list
        ?.  =(our src)  ~
        ?.  =(ship.list-key.act our)
          ~&  "%portal: not adding item, ship in key must be our"
          ~
        ::  TODO validate ships in item keys (fine for now since its also done in portal store)
        ::
        =/  n  0
        =/  len  (lent add-items.act)
        =/  time-state  now
        =/  item-keys   *(list key)
        =/  item-cards  *(list card)
        =/  keys-and-cards
          |-  ?:  =(n len)  [item-keys item-cards]
            =/  add-act  (snag n add-items.act)
            =/  key  [ship.add-act type.add-act `@t`(scot %da time-state)]
            =/  item-card  %^  act-to-act-card:cards
              [%add-with-time key general.add-act bespoke-input.add-act]
              our  %portal-store
            %=  $
              n  +(n)
              time-state  `@da`(add time-state `@dr`~s0..0000.0001)
              item-keys   (snoc item-keys key)
              item-cards  (snoc item-cards item-card)
            ==
        =/  key-text-list  (key-list-to-key-text-list:conv -.keys-and-cards)
        =/  bespoke-input
          ?-    type.list-key.act
              [%list %enditem %other ~]
            [%list-enditem-other key-text-list]
              [%list %app ~]
            [%list-app key-text-list]
          ==
        %+  snoc  +.keys-and-cards
        %^  act-to-act-card:cards
        (action [%edit list-key.act list-general.act bespoke-input])
          our  %portal-store
      ==
    --
  ::
  ++  on-update
    |%
    ::  TODO clean up and write clear comments here and everywhere
    ::  does this has to respond to foreign
    ::  or it can also respond to us?
    ::  how do we as a user/curator go around discovering/addign items
    ::  do lists from those items get auto fetched if we added them?
    ++  put
      |=  [our=ship now=time my-feed=feed portal-indexer=@p upd=[%put =key =item]]
      ^-  [(list card) feed]
      :: %+  welp
      ?+    type.key.upd
        ::  default
          [~ my-feed]
        ::
          [%validity-store ~]  [~ my-feed]
        ::
          [%nonitem @ ~]  [~ my-feed]
        ::
        ::   [%enditem %app ~]
        :: ?.  =(our ship.key.upd)  ~
        :: =/  dist-desk  (parse-dist-desk:misc dist-desk.bespoke.data.item.upd)
        :: ?~  dist-desk  ~
        :: ~[(act-to-act-card:cards [%get-docket key.upd -.u.dist-desk +.u.dist-desk] our %portal-manager)]
        ::
          [%list *]
        =/  [cards=(list card) new-my-feed=feed]
          ?.  =(our ship.key.upd)  [~ my-feed]
          ?+    -.bespoke.data.item.upd    [~ my-feed]
              %list-app
            =/  out  (update-my-feed portal-indexer our app-key-list.bespoke.data.item.upd my-feed)
            :-  %+  weld
            ?:  (in-default-list:scry our now key.bespoke.data.item.upd)  ~
            ~[(act-to-act-card:cards [%add-to-default-list key.bespoke.data.item.upd] our %portal-store)]
              -.out
            +.out
              %list-nonitem-group
            =/  out  (update-my-feed portal-indexer our group-key-list.bespoke.data.item.upd my-feed)
            :-  %+  weld
            ?:  (in-default-list:scry our now key.bespoke.data.item.upd)  ~
            ~[(act-to-act-card:cards [%add-to-default-list key.bespoke.data.item.upd] our %portal-store)]
              -.out
            +.out
              %list-enditem-other
            =/  out  (update-my-feed portal-indexer our other-key-list.bespoke.data.item.upd my-feed)
            :-  %+  weld
            ?:  (in-default-list:scry our now key.bespoke.data.item.upd)  ~
            ~[(act-to-act-card:cards [%add-to-default-list key.bespoke.data.item.upd] our %portal-store)]
              -.out
            +.out
              %list-nonitem-ship
            =/  out  (update-my-feed portal-indexer our ship-key-list.bespoke.data.item.upd my-feed)
            :-  %+  weld
            ?:  (in-default-list:scry our now key.bespoke.data.item.upd)  ~
            ~[(act-to-act-card:cards [%add-to-default-list key.bespoke.data.item.upd] our %portal-store)]
              -.out
            +.out
          ==
        :_  new-my-feed
        %-  zing
        :~  (sub-to-list-keys our now item.upd)
            (get-list-nonitems our now item.upd)
            cards
        ==
      ==
      :: (default-v1:validator our now key.upd item.upd)
    ::
    ++  del
      |=  [upd=[%del =key]]
      ^-  (list card)
      ~
    ::
      :: find ship + key
      ::   ship+key=ship+key
      ::   - if yes -> if time=time -> nothing
      ::            -> if no -> prepend, and DONT delete previous
      ::   - if no -> prepend

    ++  update-my-feed
      |=  [portal-indexer=ship our=ship =key-text-list my-feed=feed]
      ^-  [(list card) feed]
      =/  feed-upd  (turn key-text-list |=([=key text=cord] [text our key]))
      =/  n  0
      =/  len  (lent feed-upd)
      =/  new-feed-upd  *feed
      |-  ?:  =(n len)
        ::  NOTE revisit the 1000 limit of edit history. if the person gets over it,
        ::  old stuff starts showing up in portal-indexer full-feed
        :_  (oust [1.000 (lent new-feed-upd)] (weld new-feed-upd my-feed))
        ~[(msg-to-msg-card:cards [%feed-update our new-feed-upd] portal-indexer %portal-manager)]
      =/  key-text  (snag n feed-upd)
      %=  $
        n  +(n)
        new-feed-upd  ?~((find [key-text]~ my-feed) (snoc new-feed-upd key-text) new-feed-upd)
      ==
    --
  ::
  ++  get-list-nonitems
    |=  [our=ship now=time =item]
    ^-  (list card)
    ?+    -.bespoke.data.item    ~
        %list-nonitem-group
      =/  key-list  (key-text-list-to-key-list:conv group-key-list.bespoke.data.item)
      ::  if you do set-difference you keep old data, if you don't do set difference you constantly overwrite fine data
      =/  filtered-set  (set-difference:keys (silt key-list) (get-all-keys:scry our now))
      =/  filtered-list  ~(tap in filtered-set)
       %-  zing
      (turn filtered-list |=(=key (put-empty-nonitem:portal-manager our key)))
    ::
        %list-app
      =/  key-list  (key-text-list-to-key-list:conv app-key-list.bespoke.data.item)
      =/  filtered-set  (set-difference:keys (silt key-list) (get-all-keys:scry our now))
      =/  filtered-list  ~(tap in filtered-set)
      =/  nonitem-app-key-list  (skim-nonitem:keys filtered-list)
      :: =/  get-docket-act-list  (turn nonitem-app-key-list |=(=key [%get-docket ship.key cord.key]))
      :: %+  weld
      %-  zing
      (turn nonitem-app-key-list |=(=key (put-empty-nonitem:portal-manager our key)))
      :: (turn get-docket-act-list (curr act-to-act-card:cards our %portal-manager))
      ::
        %list-nonitem-app
      =/  key-list  (key-text-list-to-key-list:conv nonitem-app-key-list.bespoke.data.item)
      =/  filtered-set  (set-difference:keys (silt key-list) (get-all-keys:scry our now))
      =/  filtered-list  ~(tap in filtered-set)
      :: =/  get-docket-act-list  (turn key-list |=(=key [%get-docket ship.key cord.key]))
      :: %+  weld
      %-  zing
      (turn filtered-list |=(=key (put-empty-nonitem:portal-manager our key)))
      :: (turn get-docket-act-list (curr act-to-act-card:cards our %portal-manager))
    ::
        %list-nonitem-ship
      =/  key-list  (key-text-list-to-key-list:conv ship-key-list.bespoke.data.item)
      =/  filtered-set  (set-difference:keys (silt key-list) (get-all-keys:scry our now))
      =/  filtered-list  ~(tap in filtered-set)
      %-  zing
      (turn filtered-list |=(=key (put-empty-nonitem:portal-manager our key)))
    ==
  ::
  ++  sub-to-list-keys
    |=  [our=ship now=time =item]
    ^-  (list card)
    ?+    -.bespoke.data.item    ~
        %list-list
      =/  key-list  (key-text-list-to-key-list:conv list-key-list.bespoke.data.item)
      =/  key-list  (skip-ships:keys key-list ~[our])
      =/  filtered-set  (set-difference:keys (silt key-list) (get-all-keys:scry our now))
      =/  filtered-list  ~(tap in filtered-set)
      (turn filtered-list (cury key-to-sub-card:cards our))
    ::
        %list-enditem-other
      =/  key-list  (key-text-list-to-key-list:conv other-key-list.bespoke.data.item)
      =/  key-list  (skip-ships:keys key-list ~[our])
      =/  filtered-set  (set-difference:keys (silt key-list) (get-all-keys:scry our now))
      =/  filtered-list  ~(tap in filtered-set)
      (turn filtered-list (cury key-to-sub-card:cards our))
    ::
        %list-app
      =/  key-list  (key-text-list-to-key-list:conv app-key-list.bespoke.data.item)
      =/  key-list  (skip-nonitem:keys key-list)
      =/  key-list  (skip-ships:keys key-list ~[our])
      =/  filtered-set  (set-difference:keys (silt key-list) (get-all-keys:scry our now))
      =/  filtered-list  ~(tap in filtered-set)
      (turn filtered-list (cury key-to-sub-card:cards our))
    ::
        %list-enditem-app
      =/  key-list  (key-text-list-to-key-list:conv enditem-app-key-list.bespoke.data.item)
      =/  key-list  (skip-ships:keys key-list ~[our])
      ::  filter out %.n pointers
      ::=/  filtered-list  (skip-cen-no:pointers end-item-pointer-list.recommendations.bespoke.data.item)
      ::
      ::  filtered-recommendations excludes pointers to lists
      ::=/  filtered-list  (skip-types:keys filtered-list ~[%list])
      ::
      ::  filter out pointers already subbed to
      =/  filtered-set  (set-difference:keys (silt key-list) (get-all-keys:scry our now))
      ::
      ::  filter our pointers to lists
      =/  filtered-list  ~(tap in filtered-set)
      (turn filtered-list (cury key-to-sub-card:cards our))
    ::
      ::   %list-nonitem-group
      :: =/  key-list  (key-text-list-to-key-list:conv group-key-list.bespoke.data.item)
      :: =/  filtered-set  (set-difference:keys (silt key-list) (get-all-keys:scry our now))
      :: =/  filtered-list  ~(tap in filtered-set)
      :: [%get-group-preview ship.key `@tas`cord.key]
      :: (turn filtered-list
      :: (turn filtered-list (cury act-to-act-card:cards our))
    ==
  ::
  ++  get-nonitems
    |=  [our=ship =key-list]
    ^-  (list card)
    =/  filtered-list  (skim-nonitem:keys key-list)
    %-  zing
    (turn filtered-list |=(=key (put-empty-nonitem:portal-manager our key)))
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
        =/  data  [[%nonitem-group key(type [%nonitem %group ~]) ~] *general]
        :~  (act-to-act-card:cards [%put-nonitem key [data meta *social *signature]] our %portal-store)
            (act-to-act-card:cards [%get-group-preview ship.key cord.key] our %portal-manager)
        ==
          [%nonitem %ship ~]
        =/  data  [[%nonitem-ship key(type [%nonitem %ship ~]) ~] *general]
        ~[(act-to-act-card:cards [%put-nonitem key [data meta *social *signature]] our %portal-store)]
          [%nonitem %app ~]
        =/  data  [[%nonitem-app key(type [%nonitem %app ~]) *treaty] *general]
        :~  (act-to-act-card:cards [%put-nonitem key [data meta *social *signature]] our %portal-store)
            (act-to-act-card:cards [%get-docket key ship.key cord.key] our %portal-manager)
        ==
      ==
  ::
  ++  fill-group-data
    |=  [our=ship act=[%fill-nonitem-group =key title=@t description=@t image=@t]]
    ^-  card
    =/  general  *general
    =/  data  [[%nonitem-group key.act(type [%nonitem %group ~]) ~] general(title title.act, description description.act, image image.act)]
    =/  meta
      :*  updated-at='~2000.1.1'
          permissions=~[our]
          reach=[%public blacklist=~]
          outside-sigs=~
      ==
    (act-to-act-card:cards [%put-nonitem key.act [data meta *social *signature]] our %portal-store)
  ::
  ++  fill-nonitem-app-data
    |=  [our=ship act=[%fill-nonitem-app =key =treaty]]
    ^-  card
    =/  general  *general
    =/  data  [[%nonitem-app key.act(type [%nonitem %app ~]) treaty.act] general]
    =/  meta
      :*  updated-at='~2000.1.1'
          permissions=~[our]
          reach=[%public blacklist=~]
          outside-sigs=~
      ==
    (act-to-act-card:cards [%put-nonitem key.act [data meta *social *signature]] our %portal-store)
  ::
  --
::
::  when receiving app-data (docket + desk-hash)
::  check the right app exists
::  make sure dst-desk is right (at input, not at read)
::  make sure that dstship from dst-desk corresponds to src
::  update review
:: =/  new-reviews  %-  ~(run by reviews.usr-input.app-page)
::   |=(=review review(is-current =(hash.act desk-hash.dst-input.app-page)))
:: =/  new-app-page
::   %=  app-page
::     docket.dst-input  docket.act
::     desk-hash.dst-input  hash.act
::     reviews.usr-input  new-reviews
::   ==
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
    =/  validity-store  `^item`(get-item:scry our now v-store-key)
    ?+    -.bespoke.data.validity-store    ~
        %validity-store
      =/  validation-result  ['default-v1' (new-item our now item-key item) 'default']
      =/  validity-records  validity-records.bespoke.data.validity-store
      =/  validation-time-map  (~(gut by validity-records) item-key *validation-time-map)
      =/  validation-time-map  (put:valid-mop validation-time-map now validation-result)
      =/  validity-records  (~(put by validity-records) item-key validation-time-map)
      =/  edit-action  `action`[%edit v-store-key general.data.validity-store [%validity-store validity-records]]
      [%pass /edit %agent [our %portal-manager] %poke %portal-action !>(edit-action)]~
    ==

  ++  get-latest
    |=  [our=ship now=time =key]
    ^-  result
    =/  validity-store  (get-item:scry our now [our [%validity-store ~] '~2000.1.1'])
    ?+    -.bespoke.data.validity-store    ~
        %validity-store
      =/  validity-records  validity-records.bespoke.data.validity-store
      =/  validation-time-map  (~(gut by validity-records) key *validation-time-map)
      ?~  validation-time-map  ~
      =/  maybe-valid  (pry:valid-mop (^validation-time-map validation-time-map))
      ?~  maybe-valid  ~
      =/  maybe-valid  `validation-result`val.u.maybe-valid
      result.maybe-valid
    ==
  ::
  ::  validates item for signature
  ::  if app- dist-desk, signature, id
  ++  new-item
    |=  [our=@p now=@da =key =item]
    ^-  result
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
    ^-  result
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
::   ::
::   ::  app store leftover
::   ::
::   ::
::   ::  takes cur-data and outputs the subset of cur-data with valid signatures
::   ++  cur-data-all
::     |=  [=cur-data our=@p now=@da]
::     ^-  ^cur-data
::     =/  keys  ~(tap in ~(key by cur-map.cur-data))
::     =/  n  0
::     =/  len  (lent keys)
::     |-  ?:  =(n len)  cur-data
::       =/  key  (snag n keys)
::       =/  app-page  (~(get by cur-map.cur-data) key)
::       ?~  app-page  !!
::       ?:  (new-app-page [our now dev-name.key key u.app-page])  $(n +(n))
::       :: cat-set stays redundant, categories are not deleted if their app page is invalid
::       =/  app-set  (~(got by aux-map.cur-data) dev-name.key)
::       =/  new-app-set  (~(del in app-set) app-name.key)
::       %=  $
::         n  +(n)
::         cur-map.cur-data  (~(del by cur-map.cur-data) key)
::         aux-map.cur-data  (~(put by aux-map.cur-data) dev-name.key new-app-set)
::         key-list.cur-choice.cur-data  (skip key-list.cur-choice.cur-data |=(k=^key =(k key)))
::         cat-map.cur-choice.cur-data  (~(del by cat-map.cur-choice.cur-data) key)
::       ==
  --
--
