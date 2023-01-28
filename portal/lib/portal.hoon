/-  *portal-data, *portal-update
/+  sig, mip
|%
+$  card  card:agent:gall
::
++  conv
  |%
  ++  pointer-to-sub-path
    |=  [=pointer]
    ^-  path
    :~  (scot %ud `@`-:pointer)
        (scot %p p.id.pointer)
        q.id.pointer
        r.id.pointer
    ==
  ::
  ++  sub-path-to-pointer
    |=  [=path]
    ^-  pointer
    :^  ?:(=(0 (slav %ud -.path)) %.y %.n)
        (slav %p +<.path)
        +>-.path
        +>+<.path
  ::
  ::  find all cur pages
  ::  for each,create a map with lists
  ::  for each list, create a map with list of end items
  ++  all-items-to-nested
    |=  [our=ship now=time]
    ^-  nested-all-items
    ::=/  all-items  (get-all-items:scry our now) (ovo crasha? mozda kad je pije inita?)
    =/  pointer-set  (get-all-pointers:scry our now)
    =/  cur-page-pointer-list  (skim-types:pointers ~(tap in pointer-set) ~[%curator-page])

    ::  (map cur-pointer cur-item)
    =/  cur-map  (malt (turn cur-page-pointer-list |=(=pointer [pointer (get-item:scry our now pointer)])))

    ::  (map cur-pointer [cur-item (map liss-pointer lis-item)])
    =/  cur-lis-map  (~(run by cur-map) |=(=item (list-item-to-map our now item)))
    ::
    ::  (map cur-pointer [cur-item (map liss-pointer [lis-item (map end-pointer end-item)])])
    =/  cur-lis-end-map  (~(run by cur-lis-map) |=(val=[=item (map pointer item)] (inner-maps-transform our now val)))

    cur-lis-end-map
  ::
  ++  inner-maps-transform
    |=  [our=ship now=time val=[=item mapp=(map pointer item)]]
    ^-  [^item (map pointer [^item (map pointer item)])]
    [item.val (~(run by mapp.val) |=(=item (list-item-to-map our now item)))]
  ::
  ++  list-item-to-map
    |=  [our=ship now=time =item]
    ^-  [^item (map pointer ^item)]
    ?+    -.bespoke.data.item    !!
        %curator-page
      =/  lists-map  (malt (turn list-pointer-list.recommendations.bespoke.data.item |=(=pointer [pointer (get-item:scry our now pointer)])))
      [item lists-map]
        %list
      =/  items-map  (malt (turn end-item-pointer-list.recommendations.bespoke.data.item |=(=pointer [pointer (get-item:scry our now pointer)])))
      [item items-map]
    ==
  --
::
++  scry
  |%
  ::  gets item locally (no remote scry yet)
  ++  get-item
    |=  [our=ship now=time =pointer]
    ^-  item
    =/  path  (weld (weld /(scot %p our)/portal-store/(scot %da now) (pointer-to-sub-path:conv pointer)) /item)
    .^(item %gx path)
  ::
  ::  gets all-items
  ++  get-all-items
    |=  [our=ship now=time]
    ^-  all-items
    =/  path  /(scot %p our)/portal-store/(scot %da now)/all/items/all-items
    .^(all-items %gx path)
  ::
  ::  gets all pointers in local all-items
  ++  get-all-pointers
    |=  [our=ship now=time]
    ^-  pointer-set
    =/  path  /(scot %p our)/portal-store/(scot %da now)/all/pointers/pointer-set
    .^(pointer-set %gx path)
  ::
  ::  TODO  get-verified-items scry

  ::  TODO scry all-items (as map, as list?)
  --
::
++  pointers
  |%
  ++  set-difference
    |=  [set-1=pointer-set set-2=pointer-set]
    ^-  pointer-set
    (~(dif in set-1) set-2)
  ::
  ++  skip-cen-no
    |=  [=pointer-list]
    ^-  ^pointer-list
    (skip pointer-list |=([=pointer] ?:(=(-.pointer %.n) %.y %.n)))
  ::
  ++  skip-types
    |=  [=pointer-list types=(list type)]
    ^-  ^pointer-list
    (skip pointer-list |=([=pointer] ?~((find [r.id.pointer]~ types) %.n %.y)))
  ::
  ++  skim-types
    |=  [=pointer-list types=(list type)]
    ^-  ^pointer-list
    (skim pointer-list |=([=pointer] ?~((find [r.id.pointer]~ types) %.n %.y)))
  ::
  --

::
++  loob
  |%
  ::  check whether pointer is in pointer-list
  ++  pointer-in-pointer-list
    |=  [=pointer =pointer-list]
    ^-  ?
    ?~  (fand ~[pointer] pointer-list)
      %.n
    %.y
  ::
  ::  check whether pointer (item) is in all-items
  ++  item-in-all-items
    |=  [=pointer =all-items]
    ^-  ?
    (~(has by all-items) pointer)
  ::
  ::  verify that a list doesn't repeat apps
  ++  list-has-duplicates
    |=  [=pointer-list]
    ^-  ?
    =(~(wyt in (silt pointer-list)) (lent pointer-list))
  ::
  ::  verify whether pointer-list is subset of all-items
  ++  pointer-list-subset-of-all-items
    |=  [=pointer-list =all-items]
    (levy pointer-list |=(=pointer (~(has in ~(key by all-items)) pointer)))
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
    |=  [src=ship our=ship =all-items upd=[%del =pointer]]
    ^-  [?(%changed %unchanged) ^all-items]
    ~&  "%portal: deleting {(trip q.id.pointer.upd)}"
    ?.  (~(has by all-items) pointer.upd)
      ~&  "%portal: item {(trip q.id.pointer.upd)} does not exist"
      [%unchanged all-items]
    [%changed (~(del by all-items) pointer.upd)]
  ::
  ::  for receiving items, from local %portal-manager or foreign %portal-store
  ++  put-item
    |=  [our=ship =all-items upd=[%put =item]]
    ~&  "%portal: putting {(trip q.id.meta-data.item.upd)}"
    =/  pointer  `^pointer`[%.y id.meta-data.item.upd]
    (~(put by all-items) pointer item.upd)
  --
::
++  cards
  |%
  ++  sub-to-cur-page-pointers
    |=  [our=ship now=time =item]
    ^-  (list card)
    ?>  =(r.id.meta-data.item %curator-page)
    ?+    -.bespoke.data.item    !!
        %curator-page
      ::  ?>  =(%list -.recommendations.bespoke.data.item) - assert this here or somewhere else (likely on input)
      ::  and also on input confirm that all pointers are of type list
      ::
      ::  filter out %.n pointers
      ::=/  filtered-list  (skip-cen-no:pointers pointer-list.recommendations.bespoke.data.item)
      ::
      ::  filter out pointers already subbed to
      =/  filtered-set  (set-difference:pointers (silt list-pointer-list.recommendations.bespoke.data.item) (get-all-pointers:scry our now))
      ::
      ::  it can point to %curator-page, the only problem is if the number of curator pages severely escalates
      ::  make sure that you can have only one curator page for now (e.g. no action to create a curator page except the init one)
      =/  filtered-list  ~(tap in filtered-set)
      (turn filtered-list (cury pointer-to-sub-card:cards our))
    ==
  ::
  ::  current criterion: fetch all from this list which are not list
  ::  another possible criterion: fetch all only if this list is in one of curator pages
  ::  make recommendations assert type of each items somehow in the right place
  ++  sub-to-list-pointers
    |=  [our=ship now=time =item]
    ^-  (list card)
    ?>  =(r.id.meta-data.item %list)
    ?+    -.bespoke.data.item    !!
        %list
      ::  filter out %.n pointers
      =/  filtered-list  (skip-cen-no:pointers end-item-pointer-list.recommendations.bespoke.data.item)
      ::
      ::  filtered-recommendations excludes pointers to lists
      =/  filtered-list  (skip-types:pointers filtered-list ~[%list])
      ::
      ::  filter out pointers already subbed to
      =/  filtered-set  (set-difference:pointers (silt filtered-list) (get-all-pointers:scry our now))
      ::
      ::  filter our pointers to lists
      =/  filtered-list  ~(tap in filtered-set)
      (turn filtered-list (cury pointer-to-sub-card:cards our))
    ==
  ::
  ++  pointers-to-sub-cards
    |=  [our=ship =pointer-list]
    ^-  (list card)
    (turn pointer-list (cury pointer-to-sub-card our))
  ::
  ::  TODO figure out where to assert %.y on pointer
  ::  doing like pointer=[%.y =id] complicates things elsewhere
  ++  pointer-to-sub-card
    |=  [our=ship =pointer]
    ^-  card
    [%pass /sub %agent [our %portal-manager] %poke %portal-action !>([%sub pointer])]
  ::
  ++  item-to-put-card
    |=  [our=ship =item]
    ^-  card
    [%pass /put %agent [our %portal-manager] %poke %portal-action !>([%put item])]
  ::
  --
::
::  TODO think about all the assertions which need to happen in each of these arms
++  portal-manager
  |%
  ::
  ++  bespoke-write
    |=  [=bespoke-input]
    ^-  bespoke
    ?-    -.bespoke-input
        %other
      bespoke-input
        %curator-page
      bespoke-input
        %list
      bespoke-input
        %app
      [%app dist-desk.bespoke-input *signature 0v0 *docket]
        %validity-store
      bespoke-input
    ==
  ::
  ++  respond-to-update
    |%
    ::  does this has to respond to foreign
    ::  or it can also respond to us?
    ::  how do we as a user/curator go around discovering/addign items
    ::  do lists from those items get auto fetched if we added them?
    ++  put
      |=  [our=ship now=time upd=[%put =item]]
      ^-  (list card)
      %+  weld
        ?+    r.id.meta-data.item.upd    ~
            %curator-page
          (sub-to-cur-page-pointers:cards our now item.upd)
        ::
            %list
          (sub-to-list-pointers:cards our now item.upd)
        ==
      =/  val  (default-v1:validator our now item.upd)
      ?~  val  ~
      val
  ::
    ++  del
      |=  [upd=[%del =pointer]]
      ^-  (list card)
      ~
  ::
    ++  empty-init
      |=  [upd=[%empty-init ~]]
      ^-  (list card)
      ~
    --
  ::
  ++  make-update
    |%
    ++  default-cur-page
      |=  [our=ship now=time]
      ^-  update
      =/  general  ['Main Curator Page' '' 'Your first curator page.' *tags *properties *pictures '' '#e8e8e8']
      =/  act  [%add our %curator-page general [%curator-page [%list ~]]]
      (add:make-update [our our now %.y act])
  ::
    ++  default-validity-store
      |=  [our=ship now=time]
      ^-  update
      =/  general  ['Main Validity Store' '' 'Storage of validity of your items.' *tags *properties *pictures '' '#e8e8e8']
      =/  act  [%add our %validity-store general [%validity-store *validity-records]]
      (add:make-update [our our now %.y act])
  ::
    ::  these are not the right places to assert -.bespoke correspond to type.id
    ::  if =(%.y default), created-at becomes '~2000.1.1'
    ++  add
      |=  [our=ship src=ship now=time default=?(%.y %.n) act=[%add p=@p r=type =general =bespoke-input]]
      ^-  update
      ?>  =(our src)
      ?>  =(p.act our)
      ?>  =(r.act -.bespoke-input.act)
      =/  data  [general.act (bespoke-write bespoke-input.act)]
      =/  meta-data
        :*  id=[p=p.act q=?:(=(default %.y) '~2000.1.1' `@t`(scot %da now)) r=r.act]
            updated-at='~2000.1.1'
            permissions=~[our]
            reach=[%public blacklist=~]
            outside-sigs=~
        ==
      =/  item-sig  (sign:sig our now `sig-input`[%item data meta-data *social])
      [%put [data meta-data *social item-sig]]
  ::
  ::  we can make edits more granular if necessary, e.g. edit only some part of bespoke data
    ++  edit
      |=  [our=ship src=ship now=time act=[%edit =id =general =bespoke-input]]
      ^-  update
      ?>  =(our src)
      ?>  =(p.id.act our)
      ?>  =(r.id.act -.bespoke-input.act)
      =/  data  [general.act (bespoke-write bespoke-input.act)]
      =/  item  `item`(get-item:scry our now [%.y id.act])
      =/  item
        %=  item
          updated-at.meta-data  `@t`(scot %da now)
          data                  data
        ==
      =/  item-sig  (sign:sig our now [%item data meta-data.item social.item])
      [%put [data meta-data.item social.item item-sig]]
  ::
    ++  sub
      |=  [our=ship act=[%sub =pointer]]
      ^-  update
      ?>  =(points-to-item.pointer.act %.y)
      ?<  =(p.id.pointer.act our)
      act
  ::
    ++  del
      |=  [our=ship act=[%del =pointer]]
      ^-  update
      ?>  =(points-to-item.pointer.act %.y)
      act
::
    ++  comment
      |=  [our=ship src=ship now=time act=[%comment =pointer text=@t]]
      ^-  update
      =/  item  `item`(get-item:scry our now pointer.act)
      =/  new-comments  (~(put by comments.social.item) [src `@t`(scot %da now)] [text.act '~2000.1.1'])
      [%put item(comments.social new-comments)]
  ::
  ::  TODO test wrong pointer, on every action, local and foreign
    ++  edit-comment
      |=  [our=ship src=ship now=time act=[%edit-comment =pointer =created-at text=@t]]
      ^-  update
      =/  item  `item`(get-item:scry our now pointer.act)
      ?.  (~(has by comments.social.item) [src created-at.act])  !!
      =/  new-comments  (~(put by comments.social.item) [src created-at.act] [text.act `@t`(scot %da now)])
      [%put item(comments.social new-comments)]
  ::
    ++  del-comment
      |=  [our=ship src=ship now=time act=[%del-comment =pointer =created-at]]
      ^-  update
      =/  item  `item`(get-item:scry our now pointer.act)
      ?.  (~(has by comments.social.item) [src created-at.act])  !!
      =/  new-comments  (~(del by comments.social.item) [src created-at.act])
      [%put item(comments.social new-comments)]
  ::
    ++  rate
      |=  [our=ship src=ship now=time act=[%rate =pointer rating-num=@ud]]
      ^-  update
      ?>  &((gte rating-num.act 1) (lte rating-num.act 5))
      =/  item  `item`(get-item:scry our now pointer.act)
      =/  rating  (~(get by ratings.social.item) src)
      =/  new-rating
        ?~  rating  [rating-num.act '~2000.1.1' `@t`(scot %da now)]
        [rating-num.act `@t`(scot %da now) created-at.u.rating]
      =/  new-ratings  (~(put by ratings.social.item) src new-rating)
      [%put item(ratings.social new-ratings)]
  ::
    ++  unrate
      |=  [our=ship src=ship now=time act=[%unrate =pointer]]
      ^-  update
      =/  item  `item`(get-item:scry our now pointer.act)
      ?.  (~(has by ratings.social.item) src)  !!
      =/  new-ratings  (~(del by ratings.social.item) src)
      [%put item(ratings.social new-ratings)]
  ::
  ::  no review signatures for now
    ++  review
      |=  [our=ship src=ship now=time act=[%review =pointer text=@t hash=@uv is-safe=?]]
      ^-  update
      =/  item  `item`(get-item:scry our now pointer.act)
      :: TODO is-current for apps
      ::=/  is-current  =(hash desk-hash.dst-input.app-page)
      =/  is-current  %.n
      =/  rev  (~(get by reviews.social.item) src)
      =/  new-review
        ?~  rev  [text.act hash.act is-current is-safe.act '~2000.1.1' `@t`(scot %da now) *signature]
        [text.act hash.act is-current is-safe.act `@t`(scot %da now) created-at.u.rev *signature]
      =/  new-reviews  (~(put by reviews.social.item) src new-review)
      [%put item(reviews.social new-reviews)]
  ::
    ++  del-review
      |=  [our=ship src=ship now=time act=[%del-review =pointer]]
      ^-  update
      =/  item  `item`(get-item:scry our now pointer.act)
      ?.  (~(has by reviews.social.item) src)  !!
      =/  new-reviews  (~(del by reviews.social.item) src)
      [%put item(reviews.social new-reviews)]

    ::  TODO  should I put the whole logic in here? (including making cards etc)
    ++  sign-app
      |=  [our=ship src=ship now=time msg=[%sign-app =pointer sig=signature]]
      ^-  update
      ?>  =(our p.id.pointer.msg)
      ::  what if item doesnt exist?
      =/  item  `item`(get-item:scry our now pointer.msg)
      ?>  ?=(signature sig.msg)
      ?>  =(r.id.meta-data.item %app)
      ?+    -.bespoke.data.item    !!
          %app
        ?>  =(src -:(need (parse-dist-desk:misc dist-desk.bespoke.data.item)))
        [%put item(sig.bespoke.data sig.msg)]
      ==
  ::
  ::  how to do correct item type assertions etc?
    ++  send-app-data
      |=  [our=ship src=ship now=time act=[%send-app-data =pointer data=[desk-hash=@uv =docket]]]   :: use app-name=@tas when inputting
      ^-  update
      ?>  =(our p.id.pointer.act)
      ::  what if item doesnt exist?
      =/  item  `item`(get-item:scry our now pointer.act)
      ?<  ?=(@tas data.act)
      ::  ?=([@uv docket] data.act)
      =/  bespoke  bespoke.data.item
      ?+    -.bespoke   !!
          %app
        =/  bespoke  bespoke(desk-hash desk-hash.data.act)
        =/  bespoke  bespoke(docket docket.data.act)
        [%put item(bespoke.data bespoke)]
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
++  validator
  |%
  ++  default-v1
    |=  [our=ship now=time =item]
    ^-  (list card)
    =/  validity-store  `^item`(get-item:scry our now [%.y our '~2000.1.1' %validity-store])
    ?+    -.bespoke.data.validity-store    ~
        %validity-store
      =/  validity-records  validity-records.bespoke.data.validity-store
      =/  validation-by-time  (~(gut by validity-records) [%.y id.meta-data.item] ~)
      ?~  validation-by-time  ~
      =/  validation-result  ['default-v1' (new-item our now [%.y id.meta-data.item] item) 'default']
      =/  validation-by-time  (put:valid-mop validation-by-time now validation-result)
      =/  validity-records  (~(put by validity-records) [%.y id.meta-data.item] validation-by-time)
      :: TODO bolji nacin za handleat typeove da nemoram svugdje ?+
      ::  mozda izvuc sve ?+  na jedno mjesto, i za svaki type definirat sve funkcije koje se onda nestaju okolo
      ~[(item-to-put-card:cards our validity-store(validity-records.bespoke.data validity-records))]
      ::
    ==

  ::
  ::  validates item for
  ::  signature
  ::  if app- dist-desk, signature, id
  ++  new-item
    |=  [our=@p now=@da =pointer =item]
    ^-  ?
    ?+    -.bespoke.data.item    %.y
        %other
      %.y
        %app
      =/  dist-desk  (parse-dist-desk:misc dist-desk.bespoke.data.item)
      ?~  dist-desk  %.n
      (sig pointer dist-name.u.dist-desk desk-name.u.dist-desk sig.bespoke.data.item our now)
        %list
      %.y
        %curator-page
      %.y
    ==

  ::
  ::  validates signature
  ++  sig
    |=  [=pointer dist-ship=@p desk-name=@tas =signature our=@p now=@da]
    ?:  (ships-related:misc p.id.pointer dist-ship)
      %.y
    ?.  =(ship.signature dist-ship)
      ~&  "signature fail: ship in sig ({(scow %p ship.signature)}) and distributor ship ({(scow %p dist-ship)}) are not the same"
      %.n
    ?:  =((get-ship-type:misc our) %comet)
      ~&  "our ship is a comet - skipping signature validation of {(trip desk-name)} by {(scow %p dist-ship)}. beware, apps may be unsafe and/or pirated"
      %.y
    ?.  (validate:^sig [our signature [%app id.pointer desk-name] now])
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
