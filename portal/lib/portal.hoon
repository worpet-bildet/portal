/-  *portal-data, *portal-update, *portal-action
/+  sig, mip
|%
+$  card  card:agent:gall
::
++  conv
  |%
  ++  key-to-sub-path
    |=  [=key]
    ^-  path
    %+  weld  ~[(scot %p ship.key)]
    %+  weld  type.key
              ~[cord.key]
  ::
  ++  sub-path-to-key
    |=  [=path]
    ^-  key
    :+  (slav %p -:path)
        (flop (snip (flop (snip path))))
        (rear path)
  ::
  ::  find all cur pages
  ::  for each,create a map with lists
  ::  for each list, create a map with list of end items
  ++  all-items-to-nested
    |=  [our=ship now=time]
    ^-  nested-all-items
    ::=/  all-items  (get-all-items:scry our now) (ovo crasha? mozda kad je pije inita?)
    =/  key-set  (get-all-keys:scry our now)
    =/  list-key-list  (skim-types:keys ~(tap in key-set) ~[[%list %list ~]])
    ~&  >  "list-key-list"
    ~&  list-key-list
    ::  (map cur-pointer cur-item)
    =/  cur-map  (malt (turn list-key-list |=(=key [key (get-item:scry our now key)])))
    ~&  >  "cur-map"
    ~&  cur-map
    ::  (map cur-pointer [cur-item (map liss-pointer lis-item)])
    =/  cur-lis-map  (~(run by cur-map) |=(=item (list-item-to-map our now item)))
    ~&  >  "cur-lis-map"
    ~&  cur-lis-map
    ::
    ::  (map cur-pointer [cur-item (map liss-pointer [lis-item (map end-pointer end-item)])])
    =/  cur-lis-end-map  (~(run by cur-lis-map) |=(val=[=item (map key item)] (inner-maps-transform our now val)))
    ~&  >  "cur-lis-end-map"
    ~&  cur-lis-end-map
    cur-lis-end-map
  ::
  ::  TODO
  ++  inner-maps-transform
    |=  [our=ship now=time val=[=item mapp=(map key item)]]
    ^-  [^item (map key [^item (map key item)])]
    [item.val (~(run by mapp.val) |=(=item (list-item-to-map our now item)))]
  ::
  ++  list-item-to-map
    |=  [our=ship now=time =item]
    ^-  [^item (map key ^item)]
    ?+    -.bespoke.data.item    !!
        %list-list
      =/  lists-map  (malt (turn list-key-list.bespoke.data.item |=(=key [key (get-item:scry our now key)])))
      [item lists-map]
        %list-enditem-other
      =/  items-map  (malt (turn other-key-list.bespoke.data.item |=(=key [key (get-item:scry our now key)])))
      [item items-map]
        %list-enditem-app
      =/  items-map  (malt (turn app-key-list.bespoke.data.item |=(=key [key (get-item:scry our now key)])))
      [item items-map]
        %list-nonitem-group
      =/  items-map  (malt (turn group-key-list.bespoke.data.item |=(=key [key (get-item:scry our now key)])))
      [item items-map]
        %list-nonitem-ship
      =/  items-map  (malt (turn ship-key-list.bespoke.data.item |=(=key [key (get-item:scry our now key)])))
      [item items-map]
    ==
  --
::
++  scry
  |%
  ::  gets item locally (no remote scry yet)
  ++  get-item
    |=  [our=ship now=time =key]
    ^-  item
    =/  path  (weld (weld /(scot %p our)/portal-store/(scot %da now)/item (key-to-sub-path:conv key)) /item)
    .^(item %gx path)
  ::
  ::  gets all-items
  ++  get-all-items
    |=  [our=ship now=time]
    ^-  all-items
    =/  path  /(scot %p our)/portal-store/(scot %da now)/all/items/all-items
    .^(all-items %gx path)
  ::
  ::  gets all keys in local all-items
  ++  get-all-keys
    |=  [our=ship now=time]
    ^-  key-set
    =/  path  /(scot %p our)/portal-store/(scot %da now)/all/keys/key-set
    .^(key-set %gx path)
  ::
  ::  TODO  get-verified-items scry

  ::  TODO scry all-items (as map, as list?)
  --
::
++  keys
  |%
  ++  set-difference
    |=  [set-1=key-set set-2=key-set]
    ^-  key-set
    (~(dif in set-1) set-2)
  ::
  ++  skip-nonitem
    |=  [=key-list]
    ^-  ^key-list
    (skip key-list |=([=key] ?:(=(-.type.key %nonitem) %.y %.n)))
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
  --
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
    %-  some  :-
    (slav %p (crip (scag u.loc dist-desk)))
    `@tas`(crip (slag +(u.loc) dist-desk))
  --
::
++  portal-store
  |%
  ::  deletes an item (yours or foreign)
  ++  del-item
    |=  [src=ship our=ship =all-items upd=[%del =key]]
    ^-  [?(%changed %unchanged) ^all-items]
    ~&  "%portal: deleting item"
    ?.  (~(has by all-items) key.upd)
      ~&  "%portal: item does not exist"
      [%unchanged all-items]
    [%changed (~(del by all-items) key.upd)]
  ::
  ::  for receiving items, from local %portal-manager or foreign %portal-store
  ++  put-item
    |=  [our=ship =all-items upd=[%put =key =item]]
    ~&  "%portal: putting item"
    (~(put by all-items) key.upd item.upd)
  --
::
++  cards
  |%
  ::
  ::  current criterion: fetch all from this list which are not list
  ::  another possible criterion: fetch all only if this list is in one of curator pages
  ::  make recommendations assert type of each items somehow in the right place
  ::  TODO
  ++  sub-to-list-keys
    |=  [our=ship now=time =item]
    ^-  (list card)
    ?+    -.bespoke.data.item    ~
        %list-list
      =/  filtered-set  (set-difference:keys (silt list-key-list.bespoke.data.item) (get-all-keys:scry our now))
      =/  filtered-list  ~(tap in filtered-set)
      (turn filtered-list (cury key-to-sub-card:cards our))
    ::
        %list-enditem-other
      =/  filtered-set  (set-difference:keys (silt other-key-list.bespoke.data.item) (get-all-keys:scry our now))
      =/  filtered-list  ~(tap in filtered-set)
      (turn filtered-list (cury key-to-sub-card:cards our))
    ::
        %list-enditem-app
      ::  filter out %.n pointers
      ::=/  filtered-list  (skip-cen-no:pointers end-item-pointer-list.recommendations.bespoke.data.item)
      ::
      ::  filtered-recommendations excludes pointers to lists
      ::=/  filtered-list  (skip-types:keys filtered-list ~[%list])
      ::
      ::  filter out pointers already subbed to
      =/  filtered-set  (set-difference:keys (silt app-key-list.bespoke.data.item) (get-all-keys:scry our now))
      ::
      ::  filter our pointers to lists
      =/  filtered-list  ~(tap in filtered-set)
      (turn filtered-list (cury key-to-sub-card:cards our))
    ==
  ::
  ++  keys-to-sub-cards
    |=  [our=ship =key-list]
    ^-  (list card)
    (turn key-list (cury key-to-sub-card our))
  ::
  ::  TODO figure out where to assert %.y on pointer
  ::  doing like pointer=[%.y =id] complicates things elsewhere
  ++  key-to-sub-card
    |=  [our=ship =key]
    ^-  card
    [%pass /sub %agent [our %portal-manager] %poke %portal-action !>([%sub key])]
  ::
  ::
  --
::
::  TODO think about all the assertions which need to happen in each of these arms
++  portal-manager
  |%

  ::
  ::  TODO
  ++  respond-to-update
    |%

:: MAKE APP LIST
::     /-  *portal-action, *portal-data
::     /+  *portal
::     !:
::     :-  %say
::     |=   [[now=@da eny=@uvJ bek=beak] ~ ~]
::     :-  %portal-action
::     =/  pointer-set  (get-all-pointers:scry p.bek now)
::     =/  pointer-list  ~(tap in pointer-set)
::     =/  end-item-pointer-list  (end-item-pointer-list (skim-types:pointers pointer-list ~[%app]))
::     [%add p.bek %list *general:data [%list [type=%app end-item-pointer-list]]]



    ::  does this has to respond to foreign
    ::  or it can also respond to us?
    ::  how do we as a user/curator go around discovering/addign items
    ::  do lists from those items get auto fetched if we added them?
    ++  put
      |=  [our=ship now=time upd=[%put =key =item]]
      ^-  (list card)
      ?:  &(=(-.type.key.upd %validity-store) =(our ship.key.upd))
        ~
      :: %+  weld
      ::   ?.  =(our p.id.meta.item.upd)  ~
      ::   edit:portal-manager
      %+  weld
        ?+    -.type.key.upd    ~
            %list
          (sub-to-list-keys:cards our now item.upd)
        ==
      =/  val  (default-v1:validator our now key.upd item.upd)
      ?~  val  ~
      val
  ::
    ++  del
      |=  [upd=[%del =key]]
      ^-  (list card)
      ~
  ::
    ++  empty-init
      |=  [upd=[%empty-init ~]]
      ^-  (list card)
      ~
    --
  ::
  :: TODO
  ++  make-update
    |%
    ++  default-groups-list
      |=  [our=ship now=time]
      ^-  update
      =/  general  `general`['Main Groups List' '' 'Your first groups list.' *tags *properties *pictures '' '#e8e8e8']
      =/  act  [%add our [%list %nonitem %group ~] general [%list-nonitem-group ~]]
      (add:make-update our our now %.y act)
  ::
    ++  default-apps-list
      |=  [our=ship now=time]
      ^-  update
      =/  general  ['Main Apps List' '' 'Your first apps list.' *tags *properties *pictures '' '#e8e8e8']
      =/  act  [%add our [%list %enditem %app ~] general [%list-enditem-app ~]]
      (add:make-update [our our now %.y act])
  ::
    ++  default-ships-list
      |=  [our=ship now=time]
      ^-  update
      =/  general  ['Main Ships List' '' 'Your first ships list.' *tags *properties *pictures '' '#e8e8e8']
      =/  act  [%add our [%list %nonitem %ship ~] general [%list-nonitem-ship ~]]
      (add:make-update [our our now %.y act])
  ::
    ++  default-other-list
      |=  [our=ship now=time]
      ^-  update
      =/  general  ['Main Other List' '' 'Your first other items list.' *tags *properties *pictures '' '#e8e8e8']
      =/  act  [%add our [%list %enditem %other ~] general [%list-enditem-other ~]]
      (add:make-update [our our now %.y act])
  ::
    ++  default-list-list
      |=  [our=ship now=time]
      ^-  update
      =/  general  ['Main Curator Page' '' 'Your first curator page.' *tags *properties *pictures '' '#e8e8e8']
      =/  act  [%add our [%list %list ~] general [%list-list `list-key-list`~[[our [%list %enditem %app ~] '~2000.1.1'] [our [%list %enditem %other ~] '~2000.1.1'] [our [%list %nonitem %group ~] '~2000.1.1'] [our [%list %nonitem %ship ~] '~2000.1.1']]]]
      (add:make-update [our our now %.y act])
  ::
    ++  default-validity-store
      |=  [our=ship now=time]
      ^-  update
      =/  general  ['Main Validity Store' '' 'Storage of validity of your items.' *tags *properties *pictures '' '#e8e8e8']
      =/  act  [%add our [%validity-store ~] general [%validity-store *validity-records]]
      (add:make-update [our our now %.y act])
  ::
    ++  bespoke-write
      |=  [=key =bespoke-input act=$%([%add ~] [%edit =bespoke])]
      ^-  bespoke
      ?-    -.bespoke-input
          %enditem-other       [%enditem-other key(type [%enditem %other ~]) ~]
          %enditem-app
        ?-    -.act
            %add
          [%enditem-app key(type [%enditem %app ~]) dist-desk.bespoke-input *signature 0v0 *docket]
        ::
            %edit
          ?+    -.bespoke.act    !!  ::  this really needs to be done smarter (the whole type system)
              %enditem-app                              ::  I shouldn't need to confirm things twice. (maybe better sur?)
            bespoke.act(dist-desk dist-desk.bespoke-input)
          ==
        ==
        ::
          %list-enditem-other  [%list-enditem-other key(type [%list %enditem %other ~]) other-key-list.bespoke-input]
          %list-enditem-app    [%list-enditem-app key(type [%list %enditem %app ~]) app-key-list.bespoke-input]
          %list-nonitem-group  [%list-nonitem-group key(type [%list %nonitem %group ~]) group-key-list.bespoke-input]
          %list-nonitem-ship   [%list-nonitem-ship key(type [%list %nonitem %ship ~]) ship-key-list.bespoke-input]
          %list-list           [%list-list key(type [%list %list ~]) list-key-list.bespoke-input]
          %validity-store      [%validity-store key(type [%validity-store ~]) validity-records.bespoke-input]
      ==
  ::
    ::  these are not the right places to assert -.bespoke correspond to type.id
    ::  if =(%.y default), created-at becomes '~2000.1.1'
    ++  add
      |=  [our=ship src=ship now=time default=?(%.y %.n) act=[%add =ship =type =general =bespoke-input]]
      ^-  update
      ?>  =(our src)
      ?>  =(ship.act our)
      =/  key  [ship.act type.act cord=?:(=(default %.y) '~2000.1.1' `@t`(scot %da now))]
      =/  data  [(bespoke-write key bespoke-input.act [%add ~]) general.act]
      =/  meta
        :*  updated-at='~2000.1.1'
            permissions=~[our]
            reach=[%public blacklist=~]
            outside-sigs=~
        ==
      =/  item-sig  (sign:sig our now `sig-input`[%item data meta *social])
      [%put key [data meta *social item-sig]]
  ::
  ::  we can make edits more granular if necessary, e.g. edit only some part of bespoke data
    ++  edit
      |=  [our=ship src=ship now=time act=[%edit =key =general =bespoke-input]]
      ^-  update
      ?>  =(our src)
      ?>  =(ship.key.act our)
      =/  item  `item`(get-item:scry our now key.act)
      =/  data  [(bespoke-write key.act bespoke-input.act [%edit bespoke.data.item]) general.act]
      =/  item
        %=  item
          updated-at.meta  `@t`(scot %da now)
          data                  data
        ==
      =/  item-sig  (sign:sig our now [%item data meta.item social.item])
      [%put key.act [data meta.item social.item item-sig]]
  ::
    ++  sub
      |=  [our=ship act=[%sub =key]]
      ^-  update
      ?<  =(-.type.key.act %nonitem)
      ?<  =(ship.key.act our)
      act
  ::
    ++  del
      |=  [our=ship act=[%del =key]]
      ^-  update
      ?<  =(-.type.key.act %nonitem)
      act
::
    ++  comment
      |=  [our=ship src=ship now=time act=[%comment =key text=@t]]
      ^-  update
      =/  item  `item`(get-item:scry our now key.act)
      =/  new-comments  (~(put by comments.social.item) [src `@t`(scot %da now)] [text.act '~2000.1.1'])
      [%put key.act item(comments.social new-comments)]
  ::
  ::  TODO test wrong pointer, on every action, local and foreign
    ++  edit-comment
      |=  [our=ship src=ship now=time act=[%edit-comment =key =created-at text=@t]]
      ^-  update
      =/  item  `item`(get-item:scry our now key.act)
      ?.  (~(has by comments.social.item) [src created-at.act])  !!
      =/  new-comments  (~(put by comments.social.item) [src created-at.act] [text.act `@t`(scot %da now)])
      [%put key.act item(comments.social new-comments)]
  ::
    ++  del-comment
      |=  [our=ship src=ship now=time act=[%del-comment =key =created-at]]
      ^-  update
      =/  item  `item`(get-item:scry our now key.act)
      ?.  (~(has by comments.social.item) [src created-at.act])  !!
      =/  new-comments  (~(del by comments.social.item) [src created-at.act])
      [%put key.act item(comments.social new-comments)]
  ::
    ++  rate
      |=  [our=ship src=ship now=time act=[%rate =key rating-num=@ud]]
      ^-  update
      ?>  &((gte rating-num.act 1) (lte rating-num.act 5))
      =/  item  `item`(get-item:scry our now key.act)
      =/  rating  (~(get by ratings.social.item) src)
      =/  new-rating
        ?~  rating  [rating-num.act '~2000.1.1' `@t`(scot %da now)]
        [rating-num.act `@t`(scot %da now) created-at.u.rating]
      =/  new-ratings  (~(put by ratings.social.item) src new-rating)
      [%put key.act item(ratings.social new-ratings)]
  ::
    ++  unrate
      |=  [our=ship src=ship now=time act=[%unrate =key]]
      ^-  update
      =/  item  `item`(get-item:scry our now key.act)
      ?.  (~(has by ratings.social.item) src)  !!
      =/  new-ratings  (~(del by ratings.social.item) src)
      [%put key.act item(ratings.social new-ratings)]
  ::
  ::  no review signatures for now
    ++  review
      |=  [our=ship src=ship now=time act=[%review =key text=@t hash=@uv is-safe=?]]
      ^-  update
      =/  item  `item`(get-item:scry our now key.act)
      :: TODO is-current for apps
      ::=/  is-current  =(hash desk-hash.dst-input.app-page)
      =/  is-current  %.n
      =/  rev  (~(get by reviews.social.item) src)
      =/  new-review
        ?~  rev  [text.act hash.act is-current is-safe.act '~2000.1.1' `@t`(scot %da now) *signature]
        [text.act hash.act is-current is-safe.act `@t`(scot %da now) created-at.u.rev *signature]
      =/  new-reviews  (~(put by reviews.social.item) src new-review)
      [%put key.act item(reviews.social new-reviews)]
  ::
    ++  del-review
      |=  [our=ship src=ship now=time act=[%del-review =key]]
      ^-  update
      =/  item  `item`(get-item:scry our now key.act)
      ?.  (~(has by reviews.social.item) src)  !!
      =/  new-reviews  (~(del by reviews.social.item) src)
      [%put key.act item(reviews.social new-reviews)]

    ::  TODO  should I put the whole logic in here? (including making cards etc)
    ++  sign-app
      |=  [our=ship src=ship now=time msg=[%sign-app =key sig=signature]]
      ^-  update
      ?>  =(our ship.key.msg)
      ::  what if item doesnt exist?
      =/  item  `item`(get-item:scry our now key.msg)
      ?>  ?=(signature sig.msg)
      ?+    -.bespoke.data.item    !!
          %enditem-app
        ?>  =(src -:(need (parse-dist-desk:misc dist-desk.bespoke.data.item)))
        [%put key.msg item(sig.bespoke.data sig.msg)]
      ==
  ::
  ::  how to do correct item type assertions etc?
    ++  send-app-data
      |=  [our=ship src=ship now=time msg=[%send-app-data =key data=[desk-hash=@uv =docket]]]   :: use app-name=@tas when inputting
      ^-  update
      ?>  =(our ship.key.msg)
      ::  what if item doesnt exist?
      =/  item  `item`(get-item:scry our now key.msg)
      ::?<  ?=(@tas data.act)
      ::  ?=([@uv docket] data.act)
      ?+    -.bespoke.data.item   !!
          %enditem-app
        ?>  =(src -:(need (parse-dist-desk:misc dist-desk.bespoke.data.item)))
        =/  bespoke  bespoke.data.item(desk-hash desk-hash.data.msg, docket docket.data.msg)
        [%put key.msg item(bespoke.data bespoke)]
      ==
    --
  --

::  TODO IN REGARDS TO VALIDATION
::  build send and receive for
::  1. app signature (see how it generalizes to outside signature), and where is it specified from whom the signature needs to come
::  2. app data, where is it specced from whom it needs to  come? (when generalized)

::  sign item ima krivu logiku. treba bit action koji salje message koji se prima i stvara update
::  (dvije razlicite funkcije?)
::  send-app-data isto vjv ima krivu logiku?
::
::  app signature (sign-app) when receiving:
::  link/dst-desk has to be written correctly (maybe have that as a criterion when inputting rather then reading)
::  put it in bespoke data (better that than having to build custom readers for link for each type)

::  src has to correspond to dst-desk
::  dst-name == ship.signature
::  dst-name == src

::  then edit existing app page, add signature

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

::  when/where update the is-current from review?
::  at each %put update? after receiving, or before making?
::  before making %put update of app, update reviews. (should there be a general checker for stuff (based on type) after doing an input?)

::
::
::  reject invalid apps
::



::  here should also be stuff like validating that pointerlist [%other (list pointer)]
::  actually has only pointer which point to %other items
::  what to do with it from there?
::  probably put it in the validity store, and then use that information in many possible ways

::  includes arms which are used to validate data
::  TODO
++  validator
  |%
  ++  default-v1
    |=  [our=ship now=time item-key=key =item]
    ^-  (list card)
    =/  v-store-key  `key`[our [%validity-store ~] '~2000.1.1']
    =/  validity-store  `^item`(get-item:scry our now v-store-key)
    ?+    -.bespoke.data.validity-store    ~
        %validity-store
      =/  validation-result  ['default-v1' (new-item our now item-key item) 'default']
      =/  validity-records  validity-records.bespoke.data.validity-store
      =/  validation-time-map  (~(gut by validity-records) item-key *validation-time-map)
      =/  validation-time-map  (put:valid-mop validation-time-map now validation-result)
      =/  validity-records  (~(put by validity-records) item-key validation-time-map)
      :: TODO bolji nacin za handleat typeove da nemoram svugdje ?+
      ::  mozda izvuc sve ?+  na jedno mjesto, i za svaki type definirat sve funkcije koje se onda nestaju okolo
      =/  edit-action  `action`[%edit v-store-key general.data.validity-store [%validity-store validity-records]]
      [%pass /edit %agent [our %portal-manager] %poke %portal-action !>(edit-action)]~
    ==

  ++  get-latest
    |=  [our=ship now=time =key]
    ^-  ?
    =/  all-items  (get-all-items:scry our now)
    =/  validity-store  (~(gut by all-items) [our [%validity-store ~] '~2000.1.1'] ~)
    ?~  validity-store  !!
    ?+    -.bespoke.data.validity-store    !!
        %validity-store
      =/  validity-records  validity-records.bespoke.data.validity-store
      =/  validation-time-map  (~(gut by validity-records) key *validation-time-map ~)
      ?~  validation-time-map  !!
      =/  maybe-valid  (pry:valid-mop (^validation-time-map validation-time-map))
      ?~  maybe-valid  !!
      =/  maybe-valid  `validation-result`val.u.maybe-valid
      result.maybe-valid
    ==
  ::
  ::  validates item for
  ::  signature
  ::  if app- dist-desk, signature, id
  ++  new-item
    |=  [our=@p now=@da =key =item]
    ^-  ?
    ?+    -.bespoke.data.item    %.y
        %enditem-app
      =/  dist-desk  (parse-dist-desk:misc dist-desk.bespoke.data.item)
      ?~  dist-desk  %.n
      (sig key dist-name.u.dist-desk desk-name.u.dist-desk sig.bespoke.data.item our now)
    ==

  ::
  ::  validates signature
  ++  sig
    |=  [=key dist-ship=@p desk-name=@tas =signature our=@p now=@da]
    ?:  (ships-related:misc ship.key dist-ship)
      %.y
    ?.  =(ship.signature dist-ship)
      ~&  "signature fail: ship in sig ({(scow %p ship.signature)}) and distributor ship ({(scow %p dist-ship)}) are not the same"
      %.n
    ?:  =((get-ship-type:misc our) %comet)
      ~&  "our ship is a comet - skipping signature validation of {(trip desk-name)} by {(scow %p dist-ship)}. beware, apps may be unsafe and/or pirated"
      %.y
    ?.  (validate:^sig [our signature [%app key desk-name] now])
      ~&  "signature fail: distributor signature validation failed, not adding new app {(trip desk-name)} by {(scow %p dist-ship)}"
      ~&  >>>  signature
      %.n
    %.y
::
::   ::
::   ::  app store legacy
::   ::
::   ::  dev-data validators
::   ::
::   ::  takes dev-data and outputs the subset of dev-data with valid signatures
::   ++  dev-data-all
::     |=  [=dev-name =dev-data our=@p now=@da]
::     ^-  ^dev-data
::     =/  keys  ~(tap in ~(key by dev-map.dev-data))
::     =/  signed-app-set  *app-set
::     =/  signed-dev-map  *dev-map
::     =/  n  0
::     =/  len  ~(wyt in app-set.dev-data)
::     |-  ?:  =(n len)  [signed-dev-map signed-app-set]
::       =/  key  (snag n keys)
::       =/  app-page  (~(get by dev-map.dev-data) key)
::       ?~  app-page  !!
::       ?.  (new-app-page [our now dev-name key u.app-page])  $(n +(n))
::       %=  $
::         n  +(n)
::         signed-app-set  (~(put in signed-app-set) app-name.key)
::         signed-dev-map  (~(put by signed-dev-map) key u.app-page)
::       ==
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
::
::
:: ::  verify whether keys of cur-map correspond to aux-map
:: ::  relevant if we create aux-maps by type or ship
:: ++  cur-map-aux-map
::   |=  [=cur-map =aux-map]
::   =/  cur-map-keys  ~(key by cur-map)
::   =/  dev-name-add  |=  [=dev-name =app-set]
::   ^-  (set [^dev-name app-name])
::   (~(run in app-set) |=(=app-name [dev-name app-name]))
::   =/  aux-map-1  (~(rut by aux-map) dev-name-add)
::   =/  aux-map-2  (~(run by aux-map-1) |=(set=(set key) ~(tap in set)))
::   =/  vals  (silt `(list key)`(zing ~(val by aux-map-2)))
::   =(cur-map-keys vals)
  --
--
