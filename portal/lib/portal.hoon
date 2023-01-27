/-  *portal-data, *portal-update
/+  sig
|%
+$  card  card:agent:gall
::
++  helper-arms
  |%
  ++  pointer-to-path
    |=  [=pointer]
    ^-  path
    :~  (scot %ud `@`-:pointer)
        (scot %p p.id.pointer)
        q.id.pointer
        r.id.pointer
    ==
  ::
  ++  path-to-pointer
    |=  [=path]
    ^-  pointer
    :^  ?:(=(0 (slav %ud -.path)) %.y %.n)
        (slav %p +<.path)
        +>-.path
        +>+<.path
  ::
  ::  gets item locally (no remote scry yet)
  ++  get-item
    |=  [our=ship now=time =pointer]
    ^-  item
    =/  path  (weld (weld /(scot %p our)/portal-store/(scot %da now) (pointer-to-path pointer)) /item)
    .^(item %gx path)
  ::
  ::  gets all pointers in local all-items
  ++  get-all-pointers
    |=  [our=ship now=time]
    ^-  pointer-set
    =/  path  /(scot %p our)/portal-store/(scot %da now)/all/pointers/pointer-set
    .^(pointer-set %gx path)
  ::
  ++  pointer-set-difference
    |=  [set-1=pointer-set set-2=pointer-set]
    ^-  pointer-set
    (~(dif in set-1) set-2)
  ::
  ++  skip-cen-no-pointers
    |=  [=pointer-list]
    ^-  ^pointer-list
    (skip pointer-list |=([=pointer] ?:(=(-.pointer %.n) %.y %.n)))
  ::
  ++  skip-pointers-of-types
    |=  [=pointer-list types=(list type)]
    ^-  ^pointer-list
    (skip pointer-list |=([=pointer] ?~((find [r.id.pointer]~ types) %.n %.y)))
  ::
  ++  skim-pointers-of-types
    |=  [=pointer-list types=(list type)]
    ^-  ^pointer-list
    (skim pointer-list |=([=pointer] ?~((find [r.id.pointer]~ types) %.n %.y)))


  ::
  ::  figure out where to assert %.y on pointer
  ::  doing like pointer=[%.y =id] complicates things elsewhere
  ++  pointer-to-sub-card
    |=  [our=ship =pointer]
    ^-  card
    [%pass /sub %agent [our %portal-manager] %poke %portal-action !>([%sub pointer])]
    ::

  ::  verify that a list doesn't repeat apps
  ++  list-has-duplicates
    |=  [=pointer-list]
    ^-  ?
    =(~(wyt in (silt pointer-list)) (lent pointer-list))

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

  ::  verify whether pointer-list is subset of all-items
  ++  pointer-list-subset-of-all-items
    |=  [=pointer-list =all-items]
    (levy pointer-list |=(=pointer (~(has in ~(key by all-items)) pointer)))

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
  ::  for sub updates (%edit to foreign items) also to local
  ::  eventually should have different inputs (e.g. just take soft data + bespoke data)
  ::  assert that you can only edit your item
  ::__
  ::  assert in pointer that it must be yours. or no? both for sub init and for your add
  ::  make signature
  ++  put-item
    |=  [our=ship =all-items upd=[%put =item]]
    ~&  "%portal: putting {(trip q.id.hard-data.item.upd)}"
    =/  pointer  `^pointer`[%.y id.hard-data.item.upd]
    (~(put by all-items) pointer item.upd)
  ::
  --
::
::
::  think about all the assertions which need to happen in each of these arms
++  portal-manager
  |%
  ++  respond-to-update
    |%
    :: TODO THISTHISHTISTHIS + VALIDATOR
    ::  you need to run validation, and then save it, and then take the cache an use it
    ::  how to do validator - writes , validator reads
    ::  or just use it in the same run as validating it. Probably it's cleaner to separate them
    ++  put
      |=  [our=ship now=time upd=[%put =item]]
      ^-  (list card)
      :: :-
      :: =/  validity-store  (get-item:helper-arms our now [%.y our '~2000.1.1' %validity-store])
      :: =/  validity-records  validity-records.bespoke-data.validity-store
      :: =/  validation-by-time
      :: (~(put by validity-records) [%.y id.hard-data.item.upd] validation-by-time)
      :: :-
      ::   pointer: [%.y id.hard-data.item.upd]
      ::   check-date: now
      ::   validity-checker: 'default-v1'
      ::   validation-result: [?(%.y %.n) reason='default']
      ::[%put validity-store]
      ?+    r.id.hard-data.item.upd     ~
          %curator-page
        (sub-to-cur-page-pointers:portal-manager our now item.upd)
      ::
          %list
        (sub-to-list-pointers:portal-manager our now item.upd)
      ==
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
  ::  define the funciton for traversing/subs (dont write it inline, so its easier to chagne later)
  ::
  ::
  ::  get-verified-items scry

  ::  do validation on each sub update

  ::  separate validation function, so we can do arbitrary stuff later
  ::  then diff validation based on type
  ::  how to abstract type layer which people can edit, and not have to go everywhere to do it
  ::
  ::  - a default peer which we monitor to see the growth of the size and number items, and if we should do sth

::  let's keep ONE curator page per person. for now.
::  BOOTAT NEKOLIKO MJESECA ASAP, I TESTIRAT NA LIVE NETWORKU
  ::  poke from FE to sub to some item
  ::  purges on a daily/weekly basis or sth
  ++  sub-to-cur-page-pointers
    |=  [our=ship now=time =item]
    ^-  (list card)
    ?>  =(r.id.hard-data.item %curator-page)
    ?+    -.bespoke-data.item    !!
        %curator-page
      ::  maybe it doesnt help us much technically to say that cur-page has to be a bunch of lists
      ::  it is a bunch of lists?, so you need to sub to all of them
      ::  ?>  =(%list -.recommendations.bespoke-data.item)

      ::  filter out %.n pointers
      =/  filtered-list  (skip-cen-no-pointers:helper-arms pointer-list.recommendations.bespoke-data.item)
      ::
      ::  filter out pointers already subbed to
      =/  filtered-set  (pointer-set-difference:helper-arms (silt filtered-list) (get-all-pointers:helper-arms our now))
      ::
      ::  it can point to %curator-page, the only problem is if the number of curator pages severely escalates

      =/  filtered-list  ~(tap in filtered-set)

      (turn filtered-list (cury pointer-to-sub-card:helper-arms our))
    ==
  ::
  ::  current criterion: fetch all from this list which are not list
  ::  another possible criterion: fetch all only if this list is in one of curator pages
  ::  or we can make %list not allowed to have lists (maybe something for the validator)
  ++  sub-to-list-pointers
    |=  [our=ship now=time =item]
    ^-  (list card)
    ?>  =(r.id.hard-data.item %list)
    ?+    -.bespoke-data.item    !!
        %list
      ::  filter out %.n pointers
      =/  filtered-list  (skip-cen-no-pointers:helper-arms pointer-list.recommendations.bespoke-data.item)
      ::
      ::  filtered-recommendations excludes pointers to lists
      =/  filtered-list  (skip-pointers-of-types:helper-arms filtered-list ~[%list])
      ::
      ::  filter out pointers already subbed to
      =/  filtered-set  (pointer-set-difference:helper-arms (silt filtered-list) (get-all-pointers:helper-arms our now))
      ::
      ::  filter our pointers to lists
      =/  filtered-list  ~(tap in filtered-set)

      (turn filtered-list (cury pointer-to-sub-card:helper-arms our))
    ==
  ::  the only way for this to get messed up is to have too many curator pages which point to more curator pages
  ::
  ::
  ++  bespoke-write
    |=  [=bespoke-input]
    ^-  bespoke-data
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



  ++  make-default-cur-page
    |=  [our=ship now=time]
    ^-  update
    =/  editable-data  ['Main Curator Page' '' 'Your first curator page.' *tags *properties *pictures '' '#e8e8e8']
    =/  act  [%add our %curator-page editable-data [%curator-page [%list ~]]]
    (add:make-update [our our now %.y act])

  ++  make-default-validity-store
    |=  [our=ship now=time]
    ^-  update
    =/  editable-data  ['Main Validity Store' '' 'Storage of validity of your items.' *tags *properties *pictures '' '#e8e8e8']
    =/  act  [%add our %validity-store editable-data [%validity-store *validity-records]]
    (add:make-update [our our now %.y act])


  ::  should bespoke-read only read bespoke-data?
  ::  or should it be able to interpret the whole item based on its type?
  ::  whole item is better
  ::++  bespoke-read
  ::  |=  [=item]
  ::  ^-  what should it output???
  ::

  ++  make-update
    |%
    ::  TODO add, edit etc should have ?+ that branches based on type/bespoke-data
    ::  %other, %curator-page, %list, %validity-store?, %app
    ::  TODO write a separate type specific - bespoke data handler arm??
    ::  if =(%.y default), created-at becomes '~2000.1.1'
    ++  add
      |=  [our=ship src=ship now=time default=?(%.y %.n) act=[%add p=@p r=type =editable-data =bespoke-input]]
      ^-  update
      ?>  =(our src)
      ?>  =(p.act our)
      ?>  =(r.act -.bespoke-input.act)
      =/  hard-data  [id=`id`[p=p.act q=?:(=(default %.y) '~2000.1.1' `@t`(scot %da now)) r=r.act]]
      =/  meta-data  [permissions=~[our] updated-at='~2000.1.1' reach=[%public blacklist=~] outside-sig=*signature]
      =/  bespoke-data  (bespoke-write bespoke-input.act)
      =/  item-sig  (sign:sig our now [%item hard-data meta-data editable-data.act bespoke-data *usr-data])
      [%put [hard-data meta-data editable-data.act bespoke-data *usr-data item-sig]]
  ::
  ::  we can make edits more granular if necessary, e.g. edit only some part of bespoke data
    ++  edit
      |=  [our=ship src=ship now=time act=[%edit =id =editable-data =bespoke-input]]
      ^-  update
      ?>  =(our src)
      ?>  =(p.id.act our)
      ?>  =(r.id.act -.bespoke-input.act)
      =/  meta-data  [permissions=~[our] updated-at=`@t`(scot %da now) reach=[%public blacklist=~] outside-sig=*signature]
      =/  bespoke-data  (bespoke-write bespoke-input.act)
      =/  item-sig  (sign:sig our now [%item id.act meta-data editable-data.act bespoke-data *usr-data])
      [%put [id.act meta-data editable-data.act bespoke-data *usr-data item-sig]]
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
::  what happens when you try to comment on an item you are not subbed to?
::  TODO razmislit o error handlingu
  ::  pogotovo sa ovim scryevima ako failaju
    ++  comment
      |=  [our=ship src=ship now=time act=[%comment =pointer text=@t]]
      ^-  update
      =/  item  (get-item:helper-arms our now pointer.act)
      =/  new-comments  (~(put by comments.usr-data.item) [src `@t`(scot %da now)] [text.act '~2000.1.1'])
      [%put item(comments.usr-data new-comments)]
  ::
  ::  TODO test wrong pointer, on every action, local and foreign
    ++  edit-comment
      |=  [our=ship src=ship now=time act=[%edit-comment =pointer =created-at text=@t]]
      ^-  update
      =/  item  (get-item:helper-arms our now pointer.act)
      ?.  (~(has by comments.usr-data.item) [src created-at.act])  !!
      =/  new-comments  (~(put by comments.usr-data.item) [src created-at.act] [text.act `@t`(scot %da now)])
      [%put item(comments.usr-data new-comments)]
  ::
    ++  del-comment
      |=  [our=ship src=ship now=time act=[%del-comment =pointer =created-at]]
      ^-  update
      =/  item  (get-item:helper-arms our now pointer.act)
      ?.  (~(has by comments.usr-data.item) [src created-at.act])  !!
      =/  new-comments  (~(del by comments.usr-data.item) [src created-at.act])
      [%put item(comments.usr-data new-comments)]
  ::
    ++  rate
      |=  [our=ship src=ship now=time act=[%rate =pointer rating-num=@ud]]
      ^-  update
      ?>  &((gte rating-num.act 1) (lte rating-num.act 5))
      =/  item  (get-item:helper-arms our now pointer.act)
      =/  rating  (~(get by ratings.usr-data.item) src)
      =/  new-rating
        ?~  rating  [rating-num.act '~2000.1.1' `@t`(scot %da now)]
        [rating-num.act `@t`(scot %da now) created-at.u.rating]
      =/  new-ratings  (~(put by ratings.usr-data.item) src new-rating)
      [%put item(ratings.usr-data new-ratings)]
  ::
    ++  unrate
      |=  [our=ship src=ship now=time act=[%unrate =pointer]]
      ^-  update
      =/  item  (get-item:helper-arms our now pointer.act)
      ?.  (~(has by ratings.usr-data.item) src)  !!
      =/  new-ratings  (~(del by ratings.usr-data.item) src)
      [%put item(ratings.usr-data new-ratings)]
  ::
  ::  no review signatures for now
    ++  review
      |=  [our=ship src=ship now=time act=[%review =pointer text=@t hash=@uv is-safe=?]]
      ^-  update
      =/  item  (get-item:helper-arms our now pointer.act)
      :: TODO is-current for apps
      ::=/  is-current  =(hash desk-hash.dst-input.app-page)
      =/  is-current  %.n
      =/  rev  (~(get by reviews.usr-data.item) src)
      =/  new-review
        ?~  rev  [text.act hash.act is-current is-safe.act '~2000.1.1' `@t`(scot %da now) *signature]
        [text.act hash.act is-current is-safe.act `@t`(scot %da now) created-at.u.rev *signature]
      =/  new-reviews  (~(put by reviews.usr-data.item) src new-review)
      [%put item(reviews.usr-data new-reviews)]
  ::
    ++  del-review
      |=  [our=ship src=ship now=time act=[%del-review =pointer]]
      ^-  update
      =/  item  (get-item:helper-arms our now pointer.act)
      ?.  (~(has by reviews.usr-data.item) src)  !!
      =/  new-reviews  (~(del by reviews.usr-data.item) src)
      [%put item(reviews.usr-data new-reviews)]

    ::  TODO VALIDATION OF APPS, SIGN-APP POKE DOESNT WORK
    ::  TODO  prebacit cijelu logiku, idealno i sa cardovima ovdje
    ++  sign-app
      |=  [our=ship src=ship now=time msg=[%sign-app =pointer sig=signature]]
      ^-  update
      ?>  =(our p.id.pointer.msg)
      ::  what if item doesnt exist?
      =/  item  (get-item:helper-arms our now pointer.msg)
      ?>  ?=(signature sig.msg)
      ?>  =(r.id.hard-data.item %app)
      ?+    -.bespoke-data.item    !!
          %app
        ?>  =(src -:(parse-dist-desk:helper-arms dist-desk.bespoke-data.item))
        [%put item(sig.bespoke-data sig.msg)]
      ==
  ::
  ::  how to do correct item type assertions etc?
    ++  send-app-data
      |=  [our=ship src=ship now=time act=[%send-app-data =pointer data=[desk-hash=@uv =docket]]]   :: use app-name=@tas when inputting
      ^-  update
      ?>  =(our p.id.pointer.act)
      ::  what if item doesnt exist?
      =/  item  (get-item:helper-arms our now pointer.act)
      ?<  ?=(@tas data.act)
      ::  ?=([@uv docket] data.act)
      =/  bespoke-data  bespoke-data.item
      ?+    -.bespoke-data   !!
          %app
        =/  bespoke-data  bespoke-data(desk-hash desk-hash.data.act)
        =/  bespoke-data  bespoke-data(docket docket.data.act)
        [%put item(bespoke-data bespoke-data)]
      ==
    --
  --

::  TODO
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
  ++  default-v1  ~
  ::
  ::
::   ::
::   ::  helper arms
::   ::
::   ::  validates app-page for key, dst-desk and signature correctness
::   ++  new-app-page
::     |=  [our=@p now=@da =dev-name =key =app-page]
::     ^-  ?
::     ?.  (dev-name-in-key dev-name key)
::       %.n
::     =/  dst-desk  (parse-dst-desk dst-desk.dev-input.app-page)
::     ?~  dst-desk  %.n
::     ?.  =(app-name.u.dst-desk app-name.key)
::       %.n
::     (sig key dst-name.u.dst-desk signature.dst-input.app-page our now)
:: +
::   ::
::   ::  validates signature
::   ++  sig
::     |=  [=key =dst-name =signature our=@p now=@da]
::     ?:  (ships-related dev-name.key dst-name)
::       %.y
::     ?.  =(q.signature dst-name)
::       ~&  "signature fail: ship in sig ({(scow %p q.signature)}) and distributor ship ({(scow %p dst-name)}) are not the same"
::       %.n
::     ?:  =((get-ship-type our) %comet)
::       ~&  "our ship is a comet - skipping signature validation of {(trip app-name.key)} by {(scow %p dev-name.key)}. beware, apps may be unsafe and/or pirated"
::       %.y
::     ?.  (validate:^sig [our signature key now])
::       ~&  "signature fail: distributor signature validation failed, not adding new app {(trip app-name.key)} by {(scow %p dev-name.key)}"
::       ~&  >>>  signature
::       %.n
::     %.y
::   ::
::   ::  %.y if one ship is moon of another
::   ++  ships-related
::     |=  [=dev-name dst-name=@p]
::     ^-  ?
::     ?:  (gte dev-name dst-name)
::       ?:  =(0 (mod (sub dev-name dst-name) 4.294.967.296))
::         %.y
::       %.n
::     ?:  =(0 (mod (sub dst-name dev-name) 4.294.967.296))
::       %.y
::     %.n
::   ::
::   ::

::   ::
::   ::
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
::   ::
::   ::
::   ::
  --
::
::
::


--
