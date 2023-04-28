/-  *portal-data, *portal-action, *portal-config
/+  sig, io=agentio, mip
|%
+$  card  card:agent:gall
::
++  conv
  |%
  ::
  ++  key-to-path
    |=  [=key]
    ^-  path
    ;:  weld
      struc.key
      ~[(scot %p ship.key)]
      ~[cord.key]
      ~[time.key]
    ==
  ::
  ++  path-to-key
    |=  [=path]
    ;;  key
    :^  ;;  struc  (scag (sub (lent path) 3) `(list @tas)`path)
        `ship`(slav %p +<:path)
        `cord`+>-:path
        `cord`+>+<:path
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
        (key-to-path:conv key)
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
        (key-to-path:conv key)
        /noun
      ==
    ==
  ::
  --
++  keys
  |%
  ::
  ++  skip-strucs
    |=  [=key-list strucs=(list struc)]
    ^-  ^key-list
    (skip key-list |=([=key] ?~((find [struc.key]~ strucs) %.n %.y)))
  ::
  ++  skim-strucs
    |=  [=key-list strucs=(list struc)]
    ^-  ^key-list
    (skim key-list |=([=key] ?~((find [struc.key]~ strucs) %.n %.y)))
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
::

::  'macros' of commands happen on portal-manager level
::  TODO fundamental commands (actions) and composite commands
++  manager
  |_  [=bowl:gall cards=_*(list card)]
  ++  on-poke
    |%
    ::   ++  put-empty-temp
    :: |=  [our=ship =key]
    :: ^-  (list card)
    :: =/  meta
    ::   :*  created-at=''
    ::       updated-at=''
    ::       permissions=~[our]
    ::       reach=[%public blacklist=~]
    ::   ==
    :: ?+    struc.key    !!
    ::     [%group ~]
    ::   =/  bespoke  [[%group ~] [%temp ~] *data:group-preview]
    ::   :~  (~(act cards [our %portal-store]) [%put-temp key [key bespoke meta *signature]])
    ::       (~(act cards [our %portal-manager]) [%get-group-preview key ship.key time.key])
    ::   ==
    ::     [%ship ~]
    ::   =/  bespoke  [[%ship ~] [%temp ~] ~]
    ::   ~[(~(act cards [our %portal-store]) [%put-temp key [key bespoke meta *signature]])]
    ::     [%app ~]
    ::   =/  bespoke  [[[%app ~] [%temp ~] *@t *signature *treaty]]
    ::   :~  (~(act cards [our %portal-store]) [%put-temp key [key bespoke meta *signature]])
    ::       (~(act cards [our %portal-manager]) [%get-docket key ship.key time.key])
    ::   ==
    :: ==
    ++  on-act  ::  all arms here should output cards
                ::  TODO cleanup PM state and maybe output that then
      |%
      ++  sub
      ::  - do nothing if sub already exists for temp items (DO NOT CREATE ANOTHER)
      ::  (also create should not overwrite, but do nothing if item already exists)
      ::  - purge: remove all temp items (and unsub, automatically via delete), and them subscribe to them again


        |=  [act=action]
        ^-  (list card)
        ?.  ?=([%sub *] act)  !!
        ?.  =(time.key.act '')   ::  branch on whether is %temp (empty time.key)  
          :: if not temp
          ~[(~(poke pass:io /act) [our.bowl %portal-store] portal-action+!>(act))]
        ::  if temp
        ::  not sub -> not perfectly updated, either too much or too little
        ?+    struc.key.act    !!          ::  TODO wires state transition
        ::TODO 
        :: check if temp exists -> create empty one first (or dont touch) -> send sub -> on -agent should edit/replace
        ::                                                                  if temp exists sub again and overwrite, or dont touch?
        ::  also what with ship?
            [%group ~]
          =/  path  /groups/(scot %p ship.key.act)/[`@tas`cord.key.act]/preview
          =/  wire  [%get-group-preview (key-to-path:conv key.act)]
          =/  sub-status  (~(gut by wex.bowl) [wire ship.key.act %groups] ~)
          ?~  sub-status
            ~&  >  "not subbed, subbing"
            [%pass wire %agent [ship.key.act %groups] %watch path]~
          ~&  >>  "subbed, not subbing"
          ~
          ::
            [%app ~]
          =/  path  /treaty/(scot %p ship.key.act)/[`@tas`cord.key.act]
          ~&  path
          =/  wire  [%treaty (key-to-path:conv key.act)]
          =/  sub-status  (~(gut by wex.bowl) [wire ship.key.act %treaty] ~)
          ~&  sub-status
          ?~  sub-status
            ~&  >  "not subbed, subbing"
            [%pass wire %agent [ship.key.act %treaty] %watch path]~
          ~&  >>  "subbed, not subbing"
          ~
          :: :~  [%pass wire %agent [ship.key.act %treaty] %leave ~]
          ::     [%pass wire %agent [ship.key.act %treaty] %watch path]
          :: ==
        ==
      --
    --

  ++  on-update
    |%
    ::  does this has to respond to foreign
    ::  or it can also respond to us?
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
  --
::
::  TODO where to put validators? --->  upstream rather than downstream?
::  - permissions (vjv izvuc tako da se ne ponavlja stalno ?> =(src our)
::  - actions validators su takoder boilerplate
::  -  ?> =(key act) i ovo isto
::  - sve rascistit tak da mogu reasonat o tim stvarima
++  store
  |_  [=bowl:gall =items cards=_*(list card)]
  ::
  ++  get-item
    |=  =key
    ^-  item
    (~(got by items) key)
  ::
  ++  put-item
    |=  =item
    ^-  ^items
    (~(put by items) key.item item)
  ::
  ++  del-item  ::  only used in %purge, %delete just labels item as deleted
                ::  and it's actually removed during purge
    |=  =key
    ^-  ^items
    (~(del by items) key)
  ::
  ::
  ::
  ::  helper methods
  ++  cards-methods  ::  all arms here should append to the list of cards
    ::  TODO
    :: - on-action sub
    |%
    ::  whether its on-agent or on-poke
    ++  put  ::  for on action, on message
      ::  TODO eventually specify diffs for SSS
      |=  [=item]
      ^-  (list card)
      ;:  welp
        cards
        ::  all changes in local state
        [%give %fact [/updates]~ %portal-update !>(item)]~
        ::  all changes in items that are ours
        ?.  &(=(our.bowl ship.key.item) ?!(=(lens.item [%temp ~])))
          ~
        [%give %fact [(key-to-path:conv key.item)]~ %portal-update !>(item)]~
      ==
      ::    fe-update
      ::    PM update
      ::    subs update
      ::  previous card making exception:  validity store -> no cards
    ::
    ++  del
      |=  [=item]
      ^-  (list card)
      =/  path-key  (key-to-path:conv key.item)
      ;:  welp
        cards
        [%give %fact [path-key]~ [%portal-update !>(item)]]~  ::  general updates
        ?+    lens.item    ::  sub path handle
        ::  default
          ?:  =(our.bowl ship.key.item)
            [%give %fact [(key-to-path:conv key.item)]~ %portal-update !>(item)]~
          [%pass path-key %agent [ship.key.item %portal-store] %leave ~]~
        ::  if temp
          [%temp ~]
        =-  [%pass [- path-key] %agent [ship.key.item -] %leave ~]~
          ?+    struc.key.item    !!
            [%app ~]    %treaty
            [%group ~]  %get-group-preview
          ==
        ==
      ==
    --
  ::  helper methods
  ++  item-methods  ::  all arms here should output item
    |%
    ++  edit
      |=  [=item act=action]
      ^-  ^item
      ?.  ?=([%edit *] act)  !!
      ?>  =(key.item key.act)
      =.  item
        %=  item
            updated-at.meta
          `@t`(scot %da now.bowl)
          ::
            lens
          (fall lens.act lens.item)
          ::
            bespoke
          ?~  bespoke.act  bespoke.item
          ?-  -.u.bespoke.act
              [%other ~]
            ?.  ?=([%other ~] -.bespoke.item)  !!
            :*  [%other ~]
                (fall title.u.bespoke.act title.bespoke.item)
                (fall blurb.u.bespoke.act blurb.bespoke.item)
                (fall link.u.bespoke.act link.bespoke.item)
                (fall image.u.bespoke.act image.bespoke.item)
            ==
            ::
              [%app ~]
            ?.  ?=([%app ~] -.bespoke.item)  !!
            :*  [%app ~]
                (fall dist-desk.u.bespoke.act dist-desk.bespoke.item)
                (fall sig.u.bespoke.act sig.bespoke.item)
                (fall treaty.u.bespoke.act treaty.bespoke.item)
            ==
            ::
              [%collection ~]
            ?.  ?=([%collection ~] -.bespoke.item)  !!
            :*  [%collection ~]
                (fall title.u.bespoke.act title.bespoke.item)
                (fall blurb.u.bespoke.act blurb.bespoke.item)
                (fall image.u.bespoke.act image.bespoke.item)
                (fall key-list.u.bespoke.act key-list.bespoke.item)
            ==
          ==
        ==
      =/  sig  %^  sign:sig  our.bowl  now.bowl
        [%item key.act lens.item bespoke.item meta.item]
      item(sig sig)
    ::
    ++  replace
      |=  [=item act=action]
      ^-  ^item
      ?.  ?=([%replace *] act)  !!
      ?>  =(key.item key.act)
      =.  item
        %=  item
          lens             lens.act
          bespoke          bespoke.act
          updated-at.meta  `@t`(scot %da now.bowl)
        ==
      =/  sig  %^  sign:sig  our.bowl  now.bowl
        [%item key.act lens.act bespoke.act meta.item]
      item(sig sig)
    ::
    ++  create
      |=  [act=action]
      ^-  item
      ?.  ?=([%create *] act)  !!     ::  assert that action is %create
      =/  lens      (fall lens.act *lens)
      =/  bespoke   (fall bespoke.act *bespoke)
      =/  key  :^   -.bespoke
                    (fall ship.act our.bowl)
                    (fall cord.act '')
                    (fall time.act `@t`(scot %da now.bowl))
      =/  meta  :^  created-at=`@t`(scot %da now.bowl)
                    updated-at=''
                    permissions=~[our.bowl]
                    reach=[%public ~]
      ?:  =(lens [%temp ~])
        [key lens bespoke meta *signature]  ::  return item
      =/  sig  %^  sign:sig  our.bowl  now.bowl
        [%item key lens bespoke meta]
      [key lens bespoke meta sig]  ::  return item
    ::
    ::  TODO abstract collection methods?
    ::  such that it takes in a gate that arbitrarily modifies the key list
    ++  append-to-col
      |=  [col=item act=action]
      ^-  ^item
      ?.  ?=([%append *] act)  !!
      ?.  ?=([%collection ~] -.bespoke.col)  !!
      =/  new-key-list  (snoc key-list.bespoke.col item-key.act)
      %+  edit  col
        [%edit col-key.act ~ `[[%collection ~] ~ ~ ~ `new-key-list]]
    ::
    ++  prepend-to-col
      |=  [col=item act=action]
      ^-  ^item
      ?.  ?=([%prepend *] act)  !!
      ?.  ?=([%collection ~] -.bespoke.col)  !!
      =/  new-key-list  [item-key.act key-list.bespoke.col]
      %+  edit  col
        [%edit col-key.act ~ `[[%collection ~] ~ ~ ~ `new-key-list]]
    ::
    ++  remove-from-col
      |=  [col=item act=action]
      ^-  ^item
      ?.  ?=([%remove *] act)  !!
      ?.  ?=([%collection ~] -.bespoke.col)  !!
      =/  new-key-list  (skip key-list.bespoke.col |=(=key =(key item-key.act)))
      %+  edit  col
        [%edit col-key.act ~ `[[%collection ~] ~ ~ ~ `new-key-list]]
    ::
    ++  delete
      |=  [=item act=action]
      ^-  ^item
      ?.  ?=([%delete *] act)  !!
      ?>  =(key.item key.act)
      =.  item
        %=  item
          lens             [%deleted ~]
          updated-at.meta  `@t`(scot %da now.bowl)
        ==
      =/  sig  %^  sign:sig  our.bowl  now.bowl
        [%item key.act lens.item bespoke.item meta.item]
      item(sig sig)
    ::
    --
  ::
  ++  on-agent
    |%
    ++  put  ::  delete is also here, it adds %deleted lens
      |=  [item=update:item]
      ^-  [(list card) ^items]
      [(put:cards-methods item) (put-item item)]
    --
  ::
  ++  on-poke  ::  all arms here should output [cards items]
    |%
    ++  on-act
      |%

        ::
  ::  based on nested data structure
  ::  subs should be done from the frontend when needed, not automatically
  :: ++  sub-to-col-keys ::  + get-list-temp-items
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
  ::     ::  temp items
  ::     :: if you do set-difference you keep old data, if you don't do set difference you constantly overwrite fine data
  ::     :: after purge new temp items are taken daily
  ::     =/  temp-key-list   (skim-temp:keys key-list.bespoke.item)
  ::     =/  filtered-set  (~(dif in (silt temp-key-list)) (~(get-all-keys scry our now)))
  ::     =/  filtered-list  ~(tap in filtered-set)
  ::     =/  temp-cards  ^-  (list card)
  ::        %-  zing
  ::       (turn filtered-list |=(=key (put-empty-temp:manager our key)))
  ::     ::  inners
  ::     =/  key-list  (skip-temp:keys key-list.bespoke.item)
  ::     =/  key-list  (skip-ships:keys key-list ~[our])
  ::     =/  filtered-set  (~(dif in (silt key-list)) (~(get-all-keys scry our now)))
  ::     =/  filtered-list  ~(tap in filtered-set)
  ::     =/  inner-cards  (turn filtered-list |=(=key (~(act cards [our %portal-store]) sub+key)))
  ::     (weld inner-cards temp-cards)
  ::   ==
  ::

          ::  for now just overwrites
    ::  long term temp items should be able to sync with their source
    ::  and not be overwritten every time
    ::  TODO use create/replace/edit
    ::  clarify where to conceptually put methods like this
    :: ++  put-temp
    ::   |=  [=items our=ship src=ship act=[%put-temp =key =item]]
    ::   ^-  [(list card) ^items]
    ::   :-  (put:on-poke:add-cards our src [%put key.act item.act])
    ::   (put-item our src items [%put key.act item.act])
    :: ::
    :: ++  edit-docket
    ::   |=  [=items our=ship src=ship now=time act=[%edit-docket =key =treaty]]
    ::   ^-  [(list card) ^items]
    ::   =/  item  (~(gut by items) key.act ~)
    ::   ?~  item  ~&  "%portal-store: item doesn't exist"  [~ items]
    ::   ?+    -.bespoke.item    !!
    ::       [%app ~]
    ::     =/  item
    ::       %=  item
    ::         updated-at.meta         `@t`(scot %da now)
    ::         treaty.bespoke     treaty.act
    ::       ==
    ::     =/  item-sig  (sign:sig our now (sig-input [%item key.act item meta.item]))
    ::     =/  upd  [%put key.act item(sig item-sig)]
    ::     :-  (put:on-poke:add-cards our src upd)
    ::     (put-item our src items upd)
    ::   ==
    ::
  ::
      ::
      ++  sub  ::  TODO modify just for PS
        |=  [act=action]
        ^-  [(list card) ^items]
        ?.  ?=([%sub *] act)  !!
        ::  don't subscribe to our item
        ?:  &(=(ship.key.act our.bowl) =(cord.key.act ''))         `items
        =/  wire  (key-to-path:conv key.act)
        ::  don't subscribe to what you are already subbed to
        ?:  (~(has by wex.bowl) [wire ship.key.act %portal-store])  `items
        :: ?+  cord.key.act
          ::  default
          :_  items
          [%pass wire %agent [ship.key.act %portal-store] %watch wire]~
          ::
        :: ==

      ::
      ++  edit
        |=  [act=action]
        ^-  [(list card) ^items]
        ?.  ?=([%edit *] act)  !!
        =/  item  (edit:item-methods (get-item key.act) act)
        [(put:cards-methods item) (put-item item)]
      ::
      ++  replace
        |=  [act=action]
        ^-  [(list card) ^items]
        ?.  ?=([%replace *] act)  !!
        =/  item  (replace:item-methods (get-item key.act) act)
        [(put:cards-methods item) (put-item item)]
      ::
      ++  create
        |=  [act=action]
        ^-  [(list card) ^items]
        ?.  ?=([%create *] act)  !!
        =/  item  (create:item-methods act)
        =.  cards  (put:cards-methods item)
        =.  items  (put-item item)
        ?~  append-to.act  [cards items]
        ::  TODO check if already in list (if doing put with temp)
        ::  or a mechanism for always removing before adding
        (append [%append key.item (need append-to.act)])
        ::  also -> main collection deduplication
        ::  (preventing duplication in the first place)
      ::
      ++  append
        |=  [act=action]
        ^-  [(list card) ^items]
        ?.  ?=([%append *] act)  !!
        =/  col  (append-to-col:item-methods (get-item col-key.act) act)
        [(put:cards-methods col) (put-item col)]
      ::
      ++  prepend
        |=  [act=action]
        ^-  [(list card) ^items]
        ?.  ?=([%prepend *] act)  !!
        =/  col  (prepend-to-col:item-methods (get-item col-key.act) act)
        [(put:cards-methods col) (put-item col)]
      ::
      ++  remove
        |=  [act=action]
        ^-  [(list card) ^items]
        ?.  ?=([%remove *] act)  !!
        =/  col  (remove-from-col:item-methods (get-item col-key.act) act)
        [(put:cards-methods col) (put-item col)]
      ::
      ::  purge should remove from main collection, not delete
      ++  delete
        |=  [act=action]
        ^-  [(list card) ^items]
        ?.  ?=([%delete *] act)  !!
        ?:  &(=(time.key.act '~2000.1.1') =(ship.key.act our.bowl))
          ~&  "%portal: item is default, not allowed to delete"  `items
        =/  item  (delete:item-methods (get-item key.act) act)
        [(del:cards-methods item) (put-item item)]
      --
    --

      ::
  --
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
      ::   :: refreshes temp items kept after purge
      ::   [(weld (get-temp-items:manager our key-list) -.return) +.return]
      ::

    ::

  ::
  :: ++  on-message
  ::   |%
  ::   ++  index-as-curator  ::idempotent toggle
  ::     |=  [=items our=ship src=ship now=time act=[%index-as-curator src=ship toggle=?]]
  ::     ^-  [(list card) ^items]
  ::     ?>  =(our ~worpet-bildet)
  ::     =/  index-key  [[[%collection ~] [%def ~]] our 'index']
  ::     =/  index  (~(gut by items) index-key ~)
  ::     ?~  index  ~&  "%portal-store: index doesn't exist"  [~ items]
  ::     ?+    -.bespoke.index    [~ items]
  ::         [%collection ~]
  ::       =/  loc  (find [[[[%ship ~] [%temp ~]] src.act '']]~ key-list.bespoke.index)
  ::       ?~  loc
  ::         ?.  =(toggle.act %.y)  [~ items]
  ::         =/  bespoke  bespoke.index(key-list (snoc key-list.bespoke.index [[[%ship ~] [%temp ~]] src.act '']))
  ::         =/  col-act  [%edit index-key bespoke]
  ::         (edit:on-action items our our now col-act)
  ::       ?.  =(toggle.act %.n)  [~ items]
  ::       =/  bespoke  bespoke.index(key-list (oust [u.loc 1] key-list.bespoke.index))
  ::       =/  col-act  [%edit index-key bespoke]
  ::       ::  TODO edit permission when its coming from on-message
  ::       (edit:on-action items our our now col-act)
  ::     ==
  ::   --
  ::

::
::  includes arms which are used to validate data
++  validator
  |%
  ++  default-v1
    |=  [our=ship now=time item-key=key =item]
    ^-  (list card)
    ::  slight amount of time after this
    ?.  &(=(struc.bespoke.item [%app ~]) !=(lens.item [%temp ~]))  ~
    =/  v-store-key  `key`[[%validity-store ~] our '' '~2000.1.1']
    =/  validity-store
      ;;  ^item  (~(get-item scry our now) v-store-key)
    ?+    -.bespoke.validity-store    ~
        [%validity-store ~]
      =/  validation-result  ['default-v1' (new-item our now item-key item) 'default']
      =/  validity-records  validity-records.bespoke.validity-store
      =/  validation-time-map  (~(gut by validity-records) item-key *validation-time-map)
      =/  validation-time-map  (put:valid-mop validation-time-map now validation-result)
      =/  validity-records  (~(put by validity-records) item-key validation-time-map)
      =/  edit-action  `action`[%replace v-store-key [%def ~] [[%validity-store ~] validity-records]]
      [%pass /edit %agent [our %portal-manager] %poke %portal-action !>(edit-action)]~   :: why send card instead of calling edit function?
    ==

  ++  get-latest
    |=  [our=ship now=time =key]
    ^-  valid
    =/  validity-store
      ;;  item  (~(get-item scry our now) [[%validity-store ~] our '' '~2000.1.1'])
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
--
