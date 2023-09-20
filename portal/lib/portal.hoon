/-  m=portal-move
/+  io=agentio, ethereum
|%
+$  card  card:agent:gall
::
++  conv
  |%
  ::  uniformizes unhashed and hashed to hashed keys
  ::  expected to be idempotent
  ++  to-key
    |=  [=struc:d:m =ship =cord time=cord]
    ?+    struc
      [struc ship cord time]
      ::
        ?(%groups-chat-msg %groups-diary-note %groups-heap-curio)
      ?:  ?&  =(ship ~zod)
              =((scag 2 (trip cord)) "0v")
          ==
        ::
        [struc ship cord time]
        ::
      :^  struc
          ~zod
          (scot %uv (shax (jam [ship cord])))
          ''
    ==
  ::
  ::  runs to-key over key-list
  ++  to-key-list
    |=  [=key-list:d:m]
    (turn key-list to-key)
  ::
  ::  runs to-key over feed
  ++  to-feed
    |=  [=feed:d:m]
    %+  turn  feed
    |=  [time=cord =ship =key:d:m]
    [time ship (to-key key)]
  ::
  ::  TODO what if time looks like '/some-blog-path'
  ::  or '/some/blog/path'
  ++  key-to-path
    |=  [=key:d:m]
    ;;  [@ @ @ @ ~]
    ;:  weld
      ~[struc.key]
      ~[(scot %p ship.key)]
      ~[cord.key]
      ~[time.key]
    ==
  ::
  ++  path-to-key
    |=  [=path]
    ;;  key:d:m
    :^  ;;  struc:d:m  -:path
        `ship`(slav %p +<:path)
        ?:((gte (lent path) 3) `cord`+>-:path '')
        ?:((gte (lent path) 4) `cord`+>+<:path '')
  ::
  ++  key-to-node
    |=  [=key:d:m]
    ;;  node:gr:m
    [%entity %portal-store (spat (key-to-path key))]
  ::  
  ++  node-to-key  
    |=  [=node:gr:m]
    ;;  key:d:m
    ?>  ?=([%entity *] node)
    =/  p  (trip name.node)
    ::  TODO if blog paths allowed to have trailing /, we needs to be fixed
    =?  p  
        =('/' (rear p))
      (snip p)
    =?  p  
        =('/' (rear p))
      (snip p)
    (path-to-key (stab (crip p)))
  ::
  ++  node-to-path
    |=  [=node:gr:m]
    ^-  path
    ?>  ?=(%entity -.node)
    :~  %entity
        app.node
        name.node
    ==

  ::
  ++  feed-to-key-list
    |=  =feed:d:m
    ^-  key-list:d:m
    %+  turn  feed
    |=  [* * =key:d:m]
    key
  --
::
++  scry
  |_  [our=ship now=time]
  ++  construct
    |=  [care=@tas =dude:gall =path]
    [care (scot %p our) dude (scot %da now) path]
  ::
  ::  gets item, and if doesn't exist returns ~
  ++  item-exists
    |=  [=key:d:m]
    ;;  ?
    .^  store-result:d:m  %gx
      ;:  weld
        /(scot %p our)/portal-store/(scot %da now)/item-exists
        (key-to-path:conv key)
        /noun
    ==  ==
  ::
  ++  get-item
    |=  [=key:d:m]
    ;;  item:d:m
    %-  tail
    .^  store-result:d:m  %gx
      ;:  weld
        /(scot %p our)/portal-store/(scot %da now)/item
        (key-to-path:conv key)
        /noun
    ==  ==
  ::
  ++  get-items
    |=  [=key-list:d:m]
    ^-  (map key:d:m ?(~ item:d:m))
    (get-items:misc `items:d:m`(get-all-items) key-list)
  ::
  ++  get-all-items
    |.
    ;;  items:d:m
    %-  tail
    .^(store-result:d:m %gx /(scot %p our)/portal-store/(scot %da now)/items/noun)
  ::
  ++  get-all-keys
    |.
    ;;  key-set:d:m
    %-  tail
    .^  store-result:d:m
      %gx
      /(scot %p our)/portal-store/(scot %da now)/keys/noun
    ==
  ::
  ++  get-item-latest-validity
    |=  [=key:d:m]
    ;;  valid:d:m
    %-  tail
    .^  store-result:d:m
      %gx
      ;:  weld
        /(scot %p our)/portal-store/(scot %da now)/item-valid
        (key-to-path:conv key)
        /noun
    ==  ==
  ::
  --
::
++  keys
  |%
  ++  skid-temp
    |=  [=key-list:d:m]
    ^-  [temp=key-list:d:m def=key-list:d:m]
    (skid key-list |=([=key:d:m] ?~(time.key %.y %.n)))
  ::
  ++  skip-strucs
    |=  [=key-list:d:m strucs=(list struc:d:m)]
    ^-  key-list:d:m
    (skip key-list |=([=key:d:m] ?~((find [struc.key]~ strucs) %.n %.y)))
  ::
  ++  skim-strucs
    |=  [=key-list:d:m strucs=(list struc:d:m)]
    ^-  key-list:d:m
    (skim key-list |=([=key:d:m] ?~((find [struc.key]~ strucs) %.n %.y)))
  ::
  ++  skip-ships
    |=  [=key-list:d:m ships=(list ship)]
    ^-  key-list:d:m
    (skip key-list |=([=key:d:m] ?~((find [ship.key]~ ships) %.n %.y)))
  ::
  ++  skim-ships
    |=  [=key-list:d:m ships=(list ship)]
    ^-  key-list:d:m
    (skim key-list |=([=key:d:m] ?~((find [ship.key]~ ships) %.n %.y)))
  ::
  ++  deduplicate
    |=  [a=(list key:d:m)]
    %-  flop  %-  tail
    %^  spin  a  *(list key:d:m)  
    |=  [el=key:d:m st=(list key:d:m)]
    ?~  (find [el]~ st)
      el^[el st]
    [el st]
  --
::
++  loob
  |%
  ::
  ++  key-in-collection
    |=  [=key:d:m col=item:d:m]
    ^-  ?
    ?+    -.bespoke.col    !!
        %collection
      (key-in-key-list key key-list.bespoke.col)
    ==
  ::  check whether key is in key-list
  ++  key-in-key-list
    |=  [=key:d:m =key-list:d:m]
    ^-  ?
    ?~((fand ~[key] key-list) %.n %.y)
  --
::
++  cards
  |_  =dock
  ++  act
    |=  =action:m
    ^-  card
    [(~(poke pass:io /act) dock [%portal-action !>(action)])]
  ::
  ++  msg
    |=  =message:m
    ^-  card
    [(~(poke pass:io /msg) dock [%portal-message !>(message)])]
  ::
  ++  track-gr
    |=  [=ship]
    %+  ~(poke pass:io /gr-track) 
        dock
        %social-graph-track^!>(portal-store+[%start ship /(scot %p ship)])
  ::
  ++  edit-gr
    |=  edit=[=app:gr:m [%add-tag tag=path from=node:gr:m to=node:gr:m]]
    %+  ~(poke pass:io /gr-tag)
        dock 
        %social-graph-edit^!>(edit)
  --
::
::
++  misc
  |%
  ::  input @p, output ship-type:portal-data
  ++  get-ship-type
    |=  [=ship]
    ^-  ship-type:d:m
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
    |=  [=items:d:m =key-list:d:m]
    ^-  items:d:m
    =|  new-map=(map key:d:m item:d:m)
    =.  new-map  (~(gas by new-map) (turn key-list |=(=key:d:m [key *item:d:m])))
    (~(int by new-map) items)
  ::
  ::  takes list item and outputs key-list
  ++  collection-to-key-list
      |=  [=item:d:m]
      ^-  key-list:d:m
      ?+    -.bespoke.item    ~
          %collection  key-list.bespoke.item
      ==
  --
::
::  so I can use item-methods wherever, without needing bowl
++  pure
  |%
  ++  edit
    |=  [now=time =item:d:m act=action:m]
    ::  should output item
    ^-  item:d:m
    ?>  ?=([%edit *] act)
    ?>  =(key.item key.act)
    %=  item
        updated-at.meta
      `@t`(scot %da now)
      ::
        lens
      (fall lens.act lens.item)
      ::
        meta  
      meta.item(reach (fall reach.act reach.meta.item))
      ::
        bespoke
      ?~  bespoke.act  bespoke.item
      ?-  -.u.bespoke.act
          %other
        ?>  ?=(%other -.bespoke.item)
        :*  %other
            (fall title.u.bespoke.act title.bespoke.item)
            (fall blurb.u.bespoke.act blurb.bespoke.item)
            (fall link.u.bespoke.act link.bespoke.item)
            (fall image.u.bespoke.act image.bespoke.item)
        ==
        ::
          %app
        ?>  ?=(%app -.bespoke.item)
        :*  %app
            (fall screenshots.u.bespoke.act screenshots.bespoke.item)
            (fall blurb.u.bespoke.act blurb.bespoke.item)
            (fall dist-desk.u.bespoke.act dist-desk.bespoke.item)
            (fall sig.u.bespoke.act sig.bespoke.item)
            (fall treaty.u.bespoke.act treaty.bespoke.item)
            (fall eth-price.u.bespoke.act eth-price.bespoke.item)
        ==
        ::
          %group
        ?>  ?=(%group -.bespoke.item)
        :*  %group
            (fall data.u.bespoke.act data.bespoke.item)
        ==
        ::
          %collection
        ?>  ?=(%collection -.bespoke.item)
        :*  %collection
            (fall title.u.bespoke.act title.bespoke.item)
            (fall blurb.u.bespoke.act blurb.bespoke.item)
            (fall image.u.bespoke.act image.bespoke.item)
            (fall key-list.u.bespoke.act key-list.bespoke.item)
        ==
        ::
          %feed
        ?>  ?=(%feed -.bespoke.item)
        :*  %feed
            (fall feed.u.bespoke.act feed.bespoke.item)
        ==
        ::
          %retweet
        ?>  ?=(%retweet -.bespoke.item)
        :*  %retweet
            (fall blurb.u.bespoke.act blurb.bespoke.item)
            (fall ref.u.bespoke.act ref.bespoke.item)
        ==
        ::
          %blog
        ?>  ?=(%blog -.bespoke.item)
        :*  %blog
            (fall title.u.bespoke.act title.bespoke.item)
            (fall blurb.u.bespoke.act blurb.bespoke.item)
            (fall uri.u.bespoke.act uri.bespoke.item)
            (fall path.u.bespoke.act path.bespoke.item)
            (fall image.u.bespoke.act image.bespoke.item)
        ==
      ==
    ==
  ::
  ++  create
    |=  [[our=ship now=time] act=action:m]
    ^-  item:d:m
    ?>  ?=([%create *] act)     ::  assert that action is %create
    =/  bespoke  (fall bespoke.act *bespoke:d:m)
    :^  :^  -.bespoke
            (fall ship.act our)
            (fall cord.act '')
            (fall time.act `@t`(scot %da now))
        ::
        (fall lens.act *lens:d:m)
        ::
        ?+    -.bespoke    bespoke
            %groups-chat-msg  :: path: '/chat/~sampel-dilryd-mopreg/new-channel/writs/writ/id/~sampel-dilryd-mopreg/170.141.184.506.367.604.306.531.861.944.396.949.749'
          ?.  ?|  =(*flag:w:d:m group.bespoke)
                  =(*content:w:d:m content.bespoke)
              ==
            bespoke
          =/  =path
            =,  bespoke
            /chat/(scot %p p.channel)/[q.channel]/writs/writ/id/(scot %p p.id)/(scot %ud `@`q.id)/writ
          =/  writ
            .^(writ:w:d:m (~(construct scry [our now]) %gx %portal-manager path))
          =/  chatmap
            .^  (map flag:w:d:m [* * * perm=[* group=flag:w:d:m] *])
                %gx
                /(scot %p our)/chat/(scot %da now)/chats/noun
            ==
          =/  group-flag  group:perm:(~(got by chatmap) channel.bespoke)
          :*  %groups-chat-msg
            group-flag
            channel:bespoke
            id:bespoke
            content:writ
            ~(wyt by feels:writ)
            ~(wyt in replied:writ)
          ==
          ::
            %groups-diary-note  :: path: '/diary/~worpet-bildet/announcements/notes/note/170.141.184.506.311.745.994.155.289.567.817.629.696'
          =/  =path
            =,  bespoke
            /diary/(scot %p p.channel)/[q.channel]/notes/note/(scot %ud `@`time)/diary-note
          =/  note  ;;  note:n:d:m
            .^(noun (~(construct scry [our now]) %gx %diary path))
          =/  diarymap
            .^  (map flag:n:d:m [* * * perm=[* group=flag:w:d:m] *])
                %gx
                /(scot %p our)/diary/(scot %da now)/shelf/noun
            ==
          =/  group-flag  group:perm:(~(got by diarymap) channel.bespoke)
          :*  %groups-diary-note
            group-flag
            channel:bespoke
            time:bespoke
            essay:note
            ~(wyt by feels:note)
            (wyt:on:quips:n:d:m quips:note)
          ==
          ::
            %groups-heap-curio  :: path: '/heap/~toptyr-bilder/links/curios/curio/id/170.141.184.506.270.899.144.208.463.636.562.182.144
          =/  =path
            =,  bespoke
            /heap/(scot %p p.channel)/[q.channel]/curios/curio/id/(scot %ud `@`time)/curio
          =/  curio
            .^(curio:cur:d:m (~(construct scry [our now]) %gx %heap path))
          =/  heapmap
            .^  (map flag:n:d:m [* * perm=[* group=flag:w:d:m] *])
                %gx
                /(scot %p our)/heap/(scot %da now)/stash/noun
            ==
          =/  group-flag  group:perm:(~(got by heapmap) channel.bespoke)
          :*  %groups-heap-curio
            group-flag
            channel:bespoke
            time:bespoke
            heart:curio
            ~(wyt by feels:curio)
            ~(wyt in replied:curio)
          ==
        ==
        ::
        :^  created-at=`@t`(scot %da now)
            updated-at=''
            permissions=~[our]
            reach=(fall reach.act [%public ~])
  ::
  ++  prepend-to-feed
    |=  [now=time feed=item:d:m act=action:m]
    ^-  item:d:m
    ?>  ?=([%prepend-to-feed *] act)
    ?>  ?=(%feed -.bespoke.feed)
    ?>  =(key.feed feed-key.act)
    =/  new-feed  %+  oust  [1.000 (lent feed.act)]
      (weld feed.act feed.bespoke.feed)
    (edit now feed [%edit key.feed ~ ~ `[%feed `new-feed]])
  ::
  ++  append-no-dupe
    |=  [now=time col=item:d:m act=action:m]
    ^-  item:d:m
    ?>  ?=([%append *] act)
    ?>  ?=(%collection -.bespoke.col)
    ?>  =(col-key.act key.col)
    =+  (welp key-list.bespoke.col key-list.act)
    %^  edit  now  col
      [%edit col-key.act ~ ~ `[%collection ~ ~ ~ `(deduplicate:keys -)]]
  ::
  ++  append-to-col
    |=  [now=time col=item:d:m act=action:m]
    ^-  item:d:m
    ?>  ?=([%append *] act)
    ?>  ?=(%collection -.bespoke.col)
    ?>  =(col-key.act key.col)
    =/  new-key-list  (weld key-list.bespoke.col key-list.act)
    %^  edit  now  col
      [%edit col-key.act ~ ~ `[%collection ~ ~ ~ `new-key-list]]
  ::
  ++  remove-from-col
    |=  [now=time col=item:d:m act=action:m]
    ^-  item:d:m
    ?>  ?=([%remove *] act)
    ?>  ?=(%collection -.bespoke.col)
    ?>  =(col-key.act key.col)
    =/  new-key-list  %+  skip  key-list.bespoke.col
      |=(=key:d:m ?~((find [key]~ key-list.act) %.n %.y))
    %^  edit  now  col
      [%edit col-key.act ~ ~ `[%collection ~ ~ ~ `new-key-list]]
  ::
  --
::
++  item-methods  ::  all arms here should output item
  |_  =bowl:gall
  ++  edit             (cury edit:pure now.bowl)
  ++  create           (cury create:pure [our now]:bowl)
  ++  prepend-to-feed  (cury prepend-to-feed:pure now.bowl)
  ++  append-no-dupe   (cury append-no-dupe:pure now.bowl)
  ++  append-to-col    (cury append-to-col:pure now.bowl)
  ++  remove-from-col  (cury remove-from-col:pure now.bowl)
  --
::
::
++  eth
  |%
  ::  we modify some things from ethereum.hoon
  ++  parse-transaction-result
    =,  dejs:format
    |=  jon=json
    ~|  jon=jon
    ^-  transaction-result
    =-  ((ot -) jon)
    ::  why are some of these units and some not?
    ::  doesn't seem to correspond to (non)required values in eth schemas
    :~  'blockHash'^_~  :: TODO: fails if maybe-num?
        'blockNumber'^maybe-num:rpc:ethereum
        'transactionIndex'^maybe-num:rpc:ethereum
        from+so::(cu hex-to-num:ethereum so)
        to+so:dejs-soft:format:: maybe-num:rpc:ethereum
        input+so
        value+so:dejs-soft:format ::maybe-num:rpc:ethereum
    ==
  ::
  ++  transaction-result
    $:  block-hash=(unit @ux)
        block-number=(unit @ud)
        transaction-index=(unit @ud)
        from=@t
        to=(unit @t)
        input=@t
        value=(unit @t)  ::  assuming this will always be hex!
    ==
  ::
  ::  paid is hex
  ::  price is decimal integer
  ++  paid-enough
    |=  [paid=@t price=@t]
    ^-  ?
    %+  gte
    `@ud`(hex-to-num:ethereum paid)
    `@ud`(scan (trip price) dem)
  ::
  --
::
++  validate-sig
  |=  [dist-desk=@t dev=ship our=ship now=time sig=signature:d:m]
  :: ~&  "dist-desk: {<dist-desk>}"
  :: ~&  "dev: {<dev>}"
  :: ~&  "our: {<our>}"
  :: ~&  "now: {<now>}"
  :: ~&  "sig: {<sig>}"  
  ?~  dist-desk  %.y
  =/  dist-desk  (parse-dist-desk:misc dist-desk)
  ?~  dist-desk  %.n
  ::  note: src is allowed to be different from dist-ship
  ?.  =(ship.sig dist-name.u.dist-desk)  %.n
  ?:  =((get-ship-type:misc our) %comet) 
    ~&  "we are a comet, cannot validate app sigs" 
    %.y
  :: ~&  "validating... w/ input:"
  :: ~&  [%sign-app dev ^dist-desk]
  :: ~&  "and sig:"
  :: ~&  sig
  (validate:^sig our sig [%sign-app dev ^dist-desk] now)
::
++  sig
  |%
  ++  jael-scry
    |*  [=mold our=ship desk=term now=time =path]
    .^  mold
      %j
      (scot %p our)
      desk
      (scot %da now)
      path
    ==
  ::
  ++  sign
    |=  [our=ship now=time sig-input=*]
    ^-  signature:d:m
    =+  (jael-scry ,=life our %life now /(scot %p our))
    =+  (jael-scry ,=ring our %vein now /(scot %ud life))
    :+  `@ux`(sign:as:(nol:nu:crub:crypto ring) (jam sig-input))
      our
    life
  ::
  ++  validate
    |=  [our=ship =signature:d:m sig-input=* now=time]
    ^-  ?
    =+  (jael-scry ,lyf=(unit @) our %lyfe now /(scot %p ship.signature))
    ::  we do not have a public key from ship at this life
    ::
    ?~  lyf  %.n
    ?.  =(u.lyf life.signature)  %.n
    =+  %:  jael-scry
          ,deed=[a=life b=pass c=(unit @ux)]
          our  %deed  now  /(scot %p ship.signature)/(scot %ud life.signature)
        ==
    ::  if signature is from a past life, skip validation
    ::  XX: should be visualised on frontend, not great.
    ?.  =(a.deed life.signature)  %.n
    ::  verify signature from ship at life
    ::
    =/  them  (com:nu:crub:crypto b.deed)
    =(`(jam sig-input) (sure:as.them hex.signature))
  --
--
