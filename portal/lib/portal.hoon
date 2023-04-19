/-  *portal-data, *portal-update, *portal-action, *portal-front-end-update,
    *portal-config
/+  sig, io=agentio, mip
|%
+$  card  card:agent:gall
::
++  conv
  |%
  ::
  ::  TODO figure out how to do key as path
  ::  :
  :: -->  key-path
        :: /inner/other:comment/[timestamp]
        ::  ~zod:enditem/app:something/1
        ::  TODO find the most practical separator in hoon

  ++  key-to-path-key
    |=  [=key]
    ;;  path-key
    ;:  weld
      /(spat struc.type.key)  ::TODO maybe not spat? no cords(as in nested path) in path
      /(spat lens.type.key)
      ~[(scot %p ship.key)]
      ~[time.key]
    ==
  ::
  ++  path-key-to-key
    |*  [=path-key]
    ;;  key
    :^  (stab -:path-key)
        (stab +<:path-key)
        (slav %p +>-:path-key)
        (rear path-key)
  --
::
::  add ++store and ++manager or put into ++store and ++manager?
++  scry
  |_  [our=ship now=time]
  ::  gets item, and if doesn't exist returns ~
  ++  get-item
    |=  [=key]
    ;;  item
    %-  tail
    .^  store-result  %gx
      ;:  weld
        /(scot %p our)/portal-store/(scot %da now)/item
        (key-to-path-key:conv key)
        /noun
    ==  ==
  ::
  ++  get-items
    |=  [=key-list]
    ^-  (map key ?(~ item))
    (get-items:misc `items`(get-all-items) key-list)
  ::
  ::  gets all items
  ++  get-all-items
    |.
    ;;  items
    %-  tail
    .^(store-result %gx /(scot %p our)/portal-store/(scot %da now)/items/noun)
  ::
  ::  gets all keys in local items
  ++  get-all-keys
    |.
    ;;  key-set
    %-  tail
    .^  store-result
      %gx
      /(scot %p our)/portal-store/(scot %da now)/keys/noun
    ==
  ::
  ++  get-item-latest-validity
    |=  [=key]
    ;;  valid
    %-  tail
    .^  store-result
      %gx
      ;:  weld
        /(scot %p our)/portal-store/(scot %da now)/item-valid
        (key-to-path-key:conv key)
        /noun
      ==
    ==
  ::
  --
++  keys
  |%
  ::
  ::  do this stuff (and other) with wet gates
  ::  so that I can input key-list or key-text-list and it doesnt matter
  ++  skip-outer
    |=  [=key-list]
    ^-  ^key-list
    (skip key-list |=([=key] ?:(=(lens.type.key [%outer ~]) %.y %.n)))
  ::
  ++  skim-outer
    |=  [=key-list]
    ^-  ^key-list
    (skim key-list |=([=key] ?:(=(lens.type.key [%outer ~]) %.y %.n)))
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
  ::
  ++  key-in-collection
    |=  [=key col=item]
    ^-  ?
    ?+    -.bespoke.col    !!
        [%collection ~]
      (key-in-key-list key key-list.bespoke.col)
    ==
  ::  check whether key is in key-list
  ++  key-in-key-list
    |=  [=key =key-list]
    ^-  ?
    ?~((fand ~[key] key-list) %.n %.y)
  --
::
++  cards
  |_  =dock
  ++  act
    |=  =action
    ^-  card
    [(~(poke pass:io /act) dock [%portal-action !>(action)])]
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
    |=  [=items =key-list]
    ^-  ^items
    =|  new-map=(map key item)
    =.  new-map  (~(gas by new-map) (turn key-list |=(=key [key *item])))
    (~(int by new-map) items)
  ::
  ::  takes list item and outputs key-list
  ++  collection-to-key-list
      |=  [=item]
      ^-  key-list
      ?+    -.bespoke.item    ~
          [%collection ~]  key-list.bespoke.item
      ==
  --
::

++  store
  |%
  ::  deletes an item (yours or foreign)
  ::
  ::  put-item should be doing the checks because it's the last line of defense
  ::  for receiving items, from local %portal-manager or foreign %portal-store
  ++  put-item
    |=  [our=ship src=ship =items upd=[%put =key =item]]
    ^-  ^items
    ?>  =(src our)
    ?:  &(=(lens.type.key.upd [%outer ~]) !=(ship.key.upd our))  !!
    ~&  "%portal: putting {(spud (key-to-path-key:conv key.upd))}"
    (~(put by items) key.upd item.upd)
  ::

  ::  TODO entire purge is based upon nested data structure
  ::  needs to be rebuilt
  ::  purges all foreign items except those from default-curators and portal-curator
  :: ++  purge
  ::   |=  [=items our=ship src=ship now=time act=[%purge =default-curators =portal-curator]]
  ::   ^-  [(list card) ^items]
  ::   =/  items-key-set  ~(key by items)
  ::   =/  key-list  ~(tap in items-key-set)
  ::   ::make list/set of items
  ::   ::diff from items
  ::   =/  ships  (silt (limo ~[our ship.portal-curator.act]))  ::TODO also default curators in here
  ::   =/  our-keys  (skim-ships:keys key-list ~(tap in ships))  ::  LISTLIST KEY LIST
  ::   =/  our-list-lists-keys  (skim-types:keys our-keys ~[[%list %list ~]])  :: LISTLIST KEYLIST
  ::   =/  our-list-lists-items  ::list items
  ::     %-  (list item)  %+  skip
  ::       ~(val by (get-items:misc items our-list-lists-keys))
  ::       |=(item=?(~ item) ?~(item %.y %.n))
  ::   =/  our-lists-keys  `(list key)`(zing (turn our-list-lists-items |=(=item (list-item-to-key-list:misc item))))  :: LIST KEYLIST
  ::   =/  our-lists-items
  ::     %-  (list item)  %+  skip
  ::       (turn our-lists-keys |=(=key (~(gut by items) key ~)))  :: LIST ITEMLIST
  ::       |=(item=?(~ item) ?~(item %.y %.n))
  ::   =/  our-items-keys  `(list key)`(zing (turn our-lists-items |=(=item (list-item-to-key-list:misc item))))  :: ITEM KEYLIST
  ::   =/  keys-to-keep  (~(uni in (silt our-keys)) (silt our-lists-keys))
  ::   =.  keys-to-keep  (~(uni in keys-to-keep) (silt our-items-keys))
  ::   :: our-list-lists-keys is redundant
  ::   =/  keys-to-purge  (~(dif in items-key-set) keys-to-keep)
  ::   =/  keys  ~(tap in keys-to-purge)
  ::   =/  len  (lent keys)
  ::   =/  n  0
  ::   =/  return  [*(list card) items=items]
  ::   :: ~&  "items-key-set"
  ::   :: ~&  >  ~(wyt in items-key-set)
  ::   :: ~&  "item number to keep"
  ::   :: ~&  >  ~(wyt in keys-to-keep)
  ::   :: ~&  "item number to purge"
  ::   :: ~&  >  len
  ::   =.  return
  ::     |-  ?:  =(n len)  return
  ::     :: ~&  "items kept"
  ::     :: ~&  >  ~(wyt by `^items`+.return)
  ::     =/  new  (del:on-action items.return our src now [%del (snag n keys)])
  ::     %=  $
  ::       -.return  (weld -.return -.new)
  ::       +.return  +.new
  ::       n  +(n)
  ::     ==
  ::   =/  key-set  ~(key by items.return)
  ::   =/  key-list  ~(tap in key-set)
  ::   ~&  "%portal: purge done"
  ::   :: refreshes outer items kept after purge
  ::   [(weld (get-outer-items:manager our key-list) -.return) +.return]
  ::
    ::  bespoke-write can live separately and input into add-1 and edit-1
    ::  as a filter/funnel before the pure functions
    ::  whenever modifying bespoke, go thru this
  ::  do I even need this?
  ++  bespoke-write
    |*  [=key =bespoke act=$%([%add ~] [%edit =bespoke])]
    ::  left bespoke overwrites the right bespoke
    ^-  ^bespoke
    ?-    -.bespoke
        [%ship ~]        bespoke
        [%group ~]       bespoke
        [%other ~]       bespoke
        [%app ~]
          ?-    -.act
            %add             [[%app ~] dist-desk.bespoke *signature *treaty]
            %edit            ?+(-.bespoke.act !! [%app ~] bespoke.act(dist-desk dist-desk.bespoke))
          ==
        [%collection ~]            bespoke
        [%validity-store ~]       bespoke
    ==
  ++  on-action
    |%
    ++  add
      |=  [=items our=ship src=ship now=time default=?(%.y %.n) act=[%add ==type =ship =bespoke]]
      ^-  [(list card) ^items]
      =/  key  [type.act ship.act time=?:(=(default %.y) '~2000.1.1' `@t`(scot %da now))]
      (add-with-time items our src now [%add-with-time key bespoke.act])
    ::
    ::  TODO portal-store should be able to add a bunch of items in one arvo cycle (once card)
    ::  used with +add-other-items-and-list from portal-manager, trying out new pattern
    ++  add-with-time
      |=  [=items our=ship src=ship now=time act=[%add-with-time =key =bespoke]]
      ^-  [(list card) ^items]
      =/  bespoke  (bespoke-write key.act bespoke.act [%add ~])
      =/  meta
        :*  created-at='~2000.1.1'
            updated-at='~2000.1.1'
            permissions=~[our]
            reach=[%public blacklist=~]
        ==
      =/  item-sig  (sign:sig our now `sig-input`[%item key.act bespoke meta])
      =/  upd  [%put key.act [key.act bespoke meta item-sig]]
      :-  (put:on-poke:make-cards our src upd)
      (put-item our src items upd)
    ::
    ::  key-text-list u listama, metadata za svaki key
    ::  create item, create bespoke (should accept a gate for creating it)
    ::  create item is likewise one of many gates for itm creation?
    ::  maybe add validators somewhere outside before e.g. saving item
    :: ++  add-1  :: rename to create item?
    ::   |=  [our=ship now=time act=action]
    ::   ^-  item
    ::   ?+  -.act  !!  %add-1
    ::   =-  [key data meta social (sign:sig our now [%item -])]
    ::   :^  ^=  key   :+  (fall ship.act our)
    ::                     (fall type.act [%inner %other ~])
    ::                     (fall time.act `@t`(scot %da now))
    ::       ^=  data  :-  (fall bespoke.act [[%inner %other ~] ~])  ::use bond here to make a function call?
    ::                                                                 ::  use input functions for everything?
    ::                                                                 ::  how to sync type and bespoke when creating items?
    ::                 :*  (fall title.act '')
    ::                     (fall link.act '')
    ::                     (fall description.act '')
    ::                     (fall tags.act ~)
    ::                     (fall properties.act ~)
    ::                     (fall pictures.act ~)
    ::                     (fall image.act '')
    ::                     (fall color.act '')
    ::                 ==
    ::       ^=  meta  :^  updated-at='~2000.1.1'
    ::                     permissions=~[our]
    ::                     reach=[%public blacklist=~]
    ::                     outside-sigs=~
    ::       ^=  social    *social
    ::   ==
    :: ::  stuff like sub to items in list, and effects from editing should live outside of the edit func
    :: ::  people should build separate handlers for what to do with edited items
    :: ++  edit-1  ::edit item
    ::   |=  [our=ship now=time =item act=action]
    ::   ^-  ^item
    ::   ?+  -.act  !!  %edit-1
    ::   =-  item(sig (sign:^sig our now [%item key.act - meta.- social.-]))
    ::   %=  item
    ::     updated-at.meta           `@t`(scot %da now)
    ::     title.general.data        (fall title.act title.general.item)
    ::     link.general.data         (fall link.act link.general.item)
    ::     description.general.data  (fall description.act description.general.item)
    ::     tags.general.data         (fall tags.act tags.general.item)
    ::     properties.general.data   (fall properties.act properties.general.item)
    ::     pictures.general.data     (fall pictures.act pictures.general.item)
    ::     image.general.data        (fall image.act image.general.item)
    ::     color.general.data        (fall color.act color.general.item)
    ::     bespoke.data              (fall bespoke.act bespoke.item)
    ::   ==  ==
    :: ::
    ++  edit
      |=  [=items our=ship src=ship now=time act=[%edit =key =bespoke]]
      ^-  [(list card) ^items]
      ::  TODO  can-edit function to abstract permissions
      =/  item  (~(gut by items) key.act ~)
      ?~  item  ~&  "%portal-store: item doesn't exist"  [~ items]
      =/  bespoke  (bespoke-write key.act bespoke.act [%edit bespoke.item])
      =/  item
        %=  item
          updated-at.meta  `@t`(scot %da now)
          bespoke                  bespoke
        ==
      =/  item-sig  (sign:sig our now [%item key.act bespoke meta.item])
      =/  upd  [%put key.act [key.act bespoke meta.item item-sig]]
      :-  (put:on-poke:make-cards our src upd)
      (put-item our src items upd)
    ::
    ++  sub
      |=  [our=ship src=ship now=time wex=boat:gall act=[%sub =key]]
      ^-  (list card)
      ?:  =(lens.type.key.act [%outer ~])  ~
      ?:  =(ship.key.act our)  ~
      =/  wire  (key-to-path-key:conv key.act)
      ?:  (~(has by wex) [wire ship.key.act %portal-store])
        ~&  "%portal-store: already subscribed to {(spud wire)}"
        ~
      ::~&  "%portal-store: subscribing to {(spud wire)}"
      [%pass wire %agent [ship.key.act %portal-store] %watch wire]~
    ::
    ++  del
      |=  [=items our=ship src=ship now=time act=[%del =key]]
      ^-  [(list card) ^items]
      ::~&  "%portal: deleting {(spud (key-to-path:conv key.act))}"
      ?:  &(=(time.key.act '~2000.1.1') =(ship.key.act our))
        ~&  "%portal: item is default, not allowed to delete"
        `items
      ?.  (~(has by items) key.act)
        ::~&  "%portal: {(spud (key-to-path:conv key.act))} does not exist"
        `items
      :_  (~(del by items) key.act)
        ::~&  "%portal-store: unsubscribing from {(spud (key-to-path:conv key.act))}"
      =/  path-key  (key-to-path-key:conv key.act)
      :~  [%pass /del %agent [our %portal-manager] %poke %portal-update !>(act)]
          [%give %fact [/front-end-update]~ %portal-front-end-update !>((make-front-end-update our src act))]
          ?+    lens.type.key.act
          ::  default
            ?:  =(our ship.key.act)
              [%give %fact [path-key]~ [%portal-update !>(act)]]
            [%pass path-key %agent [ship.key.act %portal-store] %leave ~]
          ::  if outer
              [%outer ~]
            =-  [%pass [- path-key] %agent [ship.key.act -] %leave ~]
            ?+    struc.type.key.act    !!
                [%app ~]    %treaty
                [%group ~]  %get-group-preview
            ==
          ==
      ==
    ::
    ++  add-item-to-col  ::TODO /list/app
      |=  [=items our=ship src=ship now=time act=[%add-item-to-col col-key=[type=[[%collection ~] [%def ~]] =ship time=cord] =type =ship =bespoke]]
      ^-  [(list card) ^items]
      =/  col  (~(got by items) col-key.act)
      ?+    -.bespoke.col    [~ items]
          [%collection ~]
        =/  bespoke  bespoke.col(key-list (snoc key-list.bespoke.col [[[%other ~] [%def ~]] ship.act `@t`(scot %da now)]))
        =/  col-act  [%edit col-key.act bespoke]
        =^  cards1  items
          (add-with-time items our src now [%add-with-time [type.act ship.act `@t`(scot %da now)] bespoke.act])
        =^  cards2  items
          (edit items our our now col-act)
        [(weld cards1 cards2) items]
      ==
    ::
    ::
    ::  for now just overwrites
    ::  long term outer items should be able to sync with their source
    ::  and not be overwritten every time
    ++  put-outer
      |=  [=items our=ship src=ship act=[%put-outer =key =item]]
      ^-  [(list card) ^items]
      :-  (put:on-poke:make-cards our src [%put key.act item.act])
      (put-item our src items [%put key.act item.act])
    ::
    ++  edit-docket
      |=  [=items our=ship src=ship now=time act=[%edit-docket =key =treaty]]
      ^-  [(list card) ^items]
      =/  item  (~(gut by items) key.act ~)
      ?~  item  ~&  "%portal-store: item doesn't exist"  [~ items]
      ?+    -.bespoke.item    !!
          [%app ~]
        =/  item
          %=  item
            updated-at.meta         `@t`(scot %da now)
            treaty.bespoke     treaty.act
          ==
        =/  item-sig  (sign:sig our now (sig-input [%item key.act item meta.item]))
        =/  upd  [%put key.act item(sig item-sig)]
        :-  (put:on-poke:make-cards our src upd)
        (put-item our src items upd)
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
      =/  index-key  [[[%collection ~] [%def ~]] our 'index']
      =/  index  (~(gut by items) index-key ~)
      ?~  index  ~&  "%portal-store: index doesn't exist"  [~ items]
      ?+    -.bespoke.index    [~ items]
          [%collection ~]
        =/  loc  (find [[[[%ship ~] [%outer ~]] src.act '']]~ key-list.bespoke.index)
        ?~  loc
          ?.  =(toggle.act %.y)  [~ items]
          =/  bespoke  bespoke.index(key-list (snoc key-list.bespoke.index [[[%ship ~] [%outer ~]] src.act '']))
          =/  col-act  [%edit index-key bespoke]
          (edit:on-action items our our now col-act)
        ?.  =(toggle.act %.n)  [~ items]
        =/  bespoke  bespoke.index(key-list (oust [u.loc 1] key-list.bespoke.index))
        =/  col-act  [%edit index-key bespoke]
        ::  TODO edit permission when its coming from on-message
        (edit:on-action items our our now col-act)
      ==
    --
  ::
  ++  on-agent
    |%
    ++  put
      |=  [=items our=ship src=ship upd=[%put =key =item]]
      ^-  [(list card) ^items]
      ~&  "%portal: putting {(spud (key-to-path-key:conv key.upd))}"
      :_  (~(put by items) key.upd item.upd)
      :~  [%pass /put %agent [our %portal-manager] %poke %portal-update !>(upd)]
          [%give %fact [/front-end-update]~ %portal-front-end-update !>((make-front-end-update our src upd))]
      ==
    ::
    ++  del
      |=  [=items our=ship src=ship upd=[%del =key]]
      ^-  [(list card) ^items]
      ?:  =(lens.type.key.upd [%outer ~])  [~ items]
      ?.  (~(has by items) key.upd)  `items
      ::~&  "%portal: {(spud (key-to-path:conv key.upd))} does not exist"
      :_  (~(del by items) key.upd)
      ::~&  "%portal-store: unsubscribing from {(spud (key-to-path:conv key.upd))}"
      :~  [%pass /del %agent [our %portal-manager] %poke %portal-update !>(upd)]
          [%give %fact [/front-end-update]~ %portal-front-end-update !>((make-front-end-update our src upd))]
      ==
    --
  ::
  ++  make-cards
    |%
    ++  on-poke
      |%
      ++  put
        |=  [our=ship src=ship upd=[%put =key =item]]
        ^-  (list card)
        ?:  =(type.key.upd /validity-store)  ~
        %+  welp
        :~  [%pass /put %agent [our %portal-manager] %poke %portal-update !>(upd)]
            [%give %fact [/front-end-update]~ %portal-front-end-update !>((make-front-end-update our src upd))]
        ==
        ?.  &(=(our ship.key.upd) ?!(=(lens.type.key.upd [%outer ~])))  ~
        [%give %fact [(key-to-path-key:conv key.upd)]~ [%portal-update !>(upd)]]~
      --

    --
  ::
  ++  make-front-end-update
    |=  [our=ship src=ship upd=update]
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
  ::  no more autoadding to list?
  ::  otherwise there are weird edge cases, e.g.
  ::  once you remove item from default list, then edit it, it gets added back to the default list
  ++  on-update
    |%
    ::  does this has to respond to foreign
    ::  or it can also respond to us?
    ::  how do we as a user/curator go around discovering/addign items
    ::  do lists from those items get auto fetched if we added them?
    ++  put
      |=  [our=ship now=time upd=[%put =key =item]]
      ^-  (list card)
      :: %+  welp
      :: ?+    -.bespoke.item.upd
      ::     ::  default
      ::     ~
      ::   ::  if inner app
      ::   ::  [%app ~]
      ::   ::    ?.  =(our ship.key.upd)  ~ Do i need this?
      ::   :: =/  dist-desk  (parse-dist-desk:misc dist-desk.bespoke.item.upd)
      ::   :: ?~  dist-desk  ~
      ::   :: ~[(~(act cards our %portal-manager) [%get-docket key.upd -.u.dist-desk +.u.dist-desk])]
      ::
      ::   ::  if list
      ::   ::   [%collection *]
      ::   :: (sub-to-col-keys our now item.upd)
      :: ==
      (default-v1:validator our now key.upd item.upd)
    ::
    ++  del
      |=  [upd=[%del =key]]
      ^-  (list card)
      ~
    --
  ::
  ::  based on nested data structure
  ::  subs should be done from the frontend when needed, not automatically
  :: ++  sub-to-col-keys ::  + get-list-outer-items
  ::   |=  [our=ship now=time =item]
  ::   ^-  (list card)
  ::   ?+    -.bespoke.item    ~
  ::       [%list %list ~]
  ::     =/  key-list  (skip-ships:keys list-key-list.bespoke.item ~[our])
  ::     =/  filtered-set  (~(dif in (silt key-list)) (~(get-all-keys scry our now)))
  ::     =/  filtered-list  ~(tap in filtered-set)
  ::     (turn filtered-list |=(=key (~(act cards [our %portal-store]) sub+key)))
  ::
  ::   ::
  ::       [%list ~]
  ::     ::  outer items
  ::     :: if you do set-difference you keep old data, if you don't do set difference you constantly overwrite fine data
  ::     :: after purge new outer items are taken daily
  ::     =/  outer-key-list   (skim-outer:keys key-list.bespoke.item)
  ::     =/  filtered-set  (~(dif in (silt outer-key-list)) (~(get-all-keys scry our now)))
  ::     =/  filtered-list  ~(tap in filtered-set)
  ::     =/  outer-cards  ^-  (list card)
  ::        %-  zing
  ::       (turn filtered-list |=(=key (put-empty-outer:manager our key)))
  ::     ::  inners
  ::     =/  key-list  (skip-outer:keys key-list.bespoke.item)
  ::     =/  key-list  (skip-ships:keys key-list ~[our])
  ::     =/  filtered-set  (~(dif in (silt key-list)) (~(get-all-keys scry our now)))
  ::     =/  filtered-list  ~(tap in filtered-set)
  ::     =/  inner-cards  (turn filtered-list |=(=key (~(act cards [our %portal-store]) sub+key)))
  ::     (weld inner-cards outer-cards)
  ::   ==
  ::
  ++  get-outer-items
    |=  [our=ship =key-list]
    ^-  (list card)
    =/  filtered-list  (skim-outer:keys key-list)
    %-  zing
    (turn filtered-list |=(=key (put-empty-outer:manager our key)))
  ::
  ::  whatever outer you are adding, use this
  ++  put-empty-outer
    |=  [our=ship =key]
    ^-  (list card)
    ?>  =(lens.type.key [%outer ~])
    =/  meta
      :*  created-at='~2000.1.1'
          updated-at='~2000.1.1'
          permissions=~[our]
          reach=[%public blacklist=~]
      ==
    ?+    struc.type.key    !!
        [%group ~]
      =/  bespoke  [[%group ~] *data:group-preview]
      :~  (~(act cards [our %portal-store]) [%put-outer key [key bespoke meta *signature]])
          (~(act cards [our %portal-manager]) [%get-group-preview key ship.key time.key])
      ==
        [%ship ~]
      =/  bespoke  [[%ship ~] ~]
      ~[(~(act cards [our %portal-store]) [%put-outer key [key bespoke meta *signature]])]
        [%app ~]
      =/  bespoke  [[[%app ~] *@t *signature *treaty]]
      :~  (~(act cards [our %portal-store]) [%put-outer key [key bespoke meta *signature]])
          (~(act cards [our %portal-manager]) [%get-docket key ship.key time.key])
      ==
    ==
  ::
  ::  TODO get created-at and updated-at right here, and everywhere else
  ++  fill-outer
    |=  [our=ship act=$%([%fill-outer-group =key =data:group-preview] [%fill-outer-app =key =treaty])]
    ^-  card
    ?>  =(lens.type.key.act [%outer ~])
    =/  bespoke
      ?-  -.act
        %fill-outer-group  [[%group ~] data.act]
        %fill-outer-app    [[%app ~] *@t *signature treaty.act]
      ==
    =/  meta
      :*  created-at='~2000.1.1'
          updated-at='~2000.1.1'
          permissions=~[our]
          reach=[%public blacklist=~]
      ==
    (~(act cards our %portal-store) [%put-outer key.act [key.act bespoke meta *signature]])
  --
::
::  includes arms which are used to validate data
++  validator
  |%
  ++  default-v1
    |=  [our=ship now=time item-key=key =item]
    ^-  (list card)
    ::  slight amount of time after this
    ?.  =(type.item-key [[%app ~] [%inner ~]])  ~
    =/  v-store-key  `key`[[[%validity-store ~] [%def ~]] our '~2000.1.1']
    =/  validity-store
      ;;  ^item  (~(get-item scry our now) v-store-key)
    ?+    -.bespoke.validity-store    ~
        [%validity-store ~]
      =/  validation-result  ['default-v1' (new-item our now item-key item) 'default']
      =/  validity-records  validity-records.bespoke.validity-store
      =/  validation-time-map  (~(gut by validity-records) item-key *validation-time-map)
      =/  validation-time-map  (put:valid-mop validation-time-map now validation-result)
      =/  validity-records  (~(put by validity-records) item-key validation-time-map)
      =/  edit-action  `action`[%edit v-store-key [[%validity-store ~] validity-records]]
      [%pass /edit %agent [our %portal-manager] %poke %portal-action !>(edit-action)]~   :: why send card instead of calling edit function?
    ==

  ++  get-latest
    |=  [our=ship now=time =key]
    ^-  valid
    =/  validity-store
      ;;  item  (~(get-item scry our now) [[[%validity-store ~] [%def ~]] our '~2000.1.1'])
    ?+    -.bespoke.validity-store    ~
        [%validity-store ~]
      =/  validity-records  validity-records.bespoke.validity-store
      =/  validation-time-map  (~(gut by validity-records) key *validation-time-map)
      ?~  validation-time-map  ~
      =/  maybe-valid  (pry:valid-mop (^validation-time-map validation-time-map))
      ?~  maybe-valid  ~
      =/  maybe-valid  `validation-result`val.u.maybe-valid
      valid.maybe-valid
    ==
  ::
  ::  validates item for signature
  ::  if app- dist-desk, signature, id
  ++  new-item
    |=  [our=@p now=@da =key =item]
    ^-  valid
    ?+    -.bespoke.item    ~
        [%app ~]
      =/  dist-desk  (parse-dist-desk:misc dist-desk.bespoke.item)
      ?~  dist-desk  [~ %.n]
      (sig key dist-name.u.dist-desk desk-name.u.dist-desk sig.bespoke.item our now)
    ==

  ::
  ::  validates signature
  ++  sig
    |=  [=key dist-ship=@p desk-name=@tas =signature our=@p now=@da]
    ^-  valid
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
  --
::
::  convenience
++  create-default
  |%
  ++  simple-collection
    |=  [=items our=ship now=time]
    ^-  [(list card) ^items]
    =/  act  [%add [[%collection ~] [%def ~]] our [[%collection ~] 'Main Collection' 'Your first collection.' '' ~]]
    (add:on-action:store items our our now %.y act)
  ::
  ++  validity-store
    |=  [=items our=ship now=time]
    ^-  [(list card) ^items]
    =/  act  [%add [[%validity-store ~] [%def ~]] our [[%validity-store ~] *validity-records]]
    (add:on-action:store items our our now %.y act)
  --
::
--
