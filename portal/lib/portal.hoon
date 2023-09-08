/-  *portal-message, *portal-action
/+  io=agentio, ethereum
|%
+$  card  card:agent:gall
::
++  conv
  |%
  ::
  ::  TODO what if time looks like '/some-blog-path'
  ::  or '/some/blog/path'
  ++  key-to-path
    |=  [=key:d]
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
    ;;  key:d
    :^  ;;  struc:d  -:path
        `ship`(slav %p +<:path)
        ?:((gte (lent path) 3) `cord`+>-:path '')
        ?:((gte (lent path) 4) `cord`+>+<:path '')
  ::
  ++  key-to-node
    |=  [=key:d]
    ;;  node:gr
    [%entity %portal-store (spat (key-to-path key))]
  ::  
  ++  node-to-key  
    |=  [=node:gr]
    ;;  key:d
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
  ++  feed-to-key-list
    |=  =feed:d
    ^-  key-list:d
    %+  turn  feed
    |=  [* * =key:d]
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
    |=  [=key:d]
    ;;  ?
    .^  store-result:d  %gx
      ;:  weld
        /(scot %p our)/portal-store/(scot %da now)/item-exists
        (key-to-path:conv key)
        /noun
    ==  ==
  ::
  ++  get-item
    |=  [=key:d]
    ;;  item:d
    %-  tail
    .^  store-result:d  %gx
      ;:  weld
        /(scot %p our)/portal-store/(scot %da now)/item
        (key-to-path:conv key)
        /noun
    ==  ==
  ::
  ++  get-items
    |=  [=key-list:d]
    ^-  (map key:d ?(~ item:d))
    (get-items:misc `items:d`(get-all-items) key-list)
  ::
  ++  get-all-items
    |.
    ;;  items:d
    %-  tail
    .^(store-result:d %gx /(scot %p our)/portal-store/(scot %da now)/items/noun)
  ::
  ++  get-all-keys
    |.
    ;;  key-set:d
    %-  tail
    .^  store-result:d
      %gx
      /(scot %p our)/portal-store/(scot %da now)/keys/noun
    ==
  ::
  ++  get-item-latest-validity
    |=  [=key:d]
    ;;  valid:d
    %-  tail
    .^  store-result:d
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
    |=  [=key-list:d]
    ^-  [temp=key-list:d def=key-list:d]
    (skid key-list |=([=key:d] ?~(time.key %.y %.n)))
  ::
  ++  skip-strucs
    |=  [=key-list:d strucs=(list struc:d)]
    ^-  key-list:d
    (skip key-list |=([=key:d] ?~((find [struc.key]~ strucs) %.n %.y)))
  ::
  ++  skim-strucs
    |=  [=key-list:d strucs=(list struc:d)]
    ^-  key-list:d
    (skim key-list |=([=key:d] ?~((find [struc.key]~ strucs) %.n %.y)))
  ::
  ++  skip-ships
    |=  [=key-list:d ships=(list ship)]
    ^-  key-list:d
    (skip key-list |=([=key:d] ?~((find [ship.key]~ ships) %.n %.y)))
  ::
  ++  skim-ships
    |=  [=key-list:d ships=(list ship)]
    ^-  key-list:d
    (skim key-list |=([=key:d] ?~((find [ship.key]~ ships) %.n %.y)))
  ::
  ++  deduplicate
    |=  [a=(list key:d)]
    %-  flop  %-  tail
    %^  spin  a  *(list key:d)  
    |=  [el=key:d st=(list key:d)]
    ?~  (find [el]~ st)
      el^[el st]
    [el st]
  --
::
++  loob
  |%
  ::
  ++  key-in-collection
    |=  [=key:d col=item:d]
    ^-  ?
    ?+    -.bespoke.col    !!
        %collection
      (key-in-key-list key key-list.bespoke.col)
    ==
  ::  check whether key is in key-list
  ++  key-in-key-list
    |=  [=key:d =key-list:d]
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
  ::
  ++  msg
    |=  =message
    ^-  card
    [(~(poke pass:io /msg) dock [%portal-message !>(message)])]
  ::
  ++  upd
    |=  =item:d
    ^-  card
    [%give %fact [/updates]~ %portal-update !>(item)]
  --
::
::
++  misc
  |%
  ::  input @p, output ship-type:portal-data
  ++  get-ship-type
    |=  [=ship]
    ^-  ship-type:d
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
    |=  [=items:d =key-list:d]
    ^-  items:d
    =|  new-map=(map key:d item:d)
    =.  new-map  (~(gas by new-map) (turn key-list |=(=key:d [key *item:d])))
    (~(int by new-map) items)
  ::
  ::  takes list item and outputs key-list
  ++  collection-to-key-list
      |=  [=item:d]
      ^-  key-list:d
      ?+    -.bespoke.item    ~
          %collection  key-list.bespoke.item
      ==
  --
::
::  so I can use item-methods wherever, without needing bowl
++  pure
  |%
  ++  edit
    |=  [now=time =item:d act=action]
    ::  should output item
    ^-  item:d
    ?>  ?=([%edit *] act)
    ?>  =(key.item key.act)
    %=  item
        updated-at.meta
      `@t`(scot %da now)
      ::
        lens
      (fall lens.act lens.item)
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
  ++  replace
    |=  [now=time =item:d act=action]
    ^-  item:d
    ?>  ?=([%replace *] act)
    ?>  =(key.item key.act)
    %=  item
      lens             lens.act
      bespoke          bespoke.act
      updated-at.meta  `@t`(scot %da now)
    ==
  ::
  ++  create
    |=  [[our=ship now=time] act=action]
    ^-  item:d
    ?>  ?=([%create *] act)     ::  assert that action is %create
    =/  bespoke  (fall bespoke.act *bespoke:d)
    :^  :^  -.bespoke
            (fall ship.act our)
            (fall cord.act '')
            (fall time.act `@t`(scot %da now))
        ::
        (fall lens.act *lens:d)
        ::
        ?+    -.bespoke    bespoke
            %groups-chat-msg  :: path: '/chat/~sampel-dilryd-mopreg/new-channel/writs/writ/id/~sampel-dilryd-mopreg/170.141.184.506.367.604.306.531.861.944.396.949.749'
          =/  =path
            =,  bespoke
            /chat/(scot %p p.channel)/[q.channel]/writs/writ/id/(scot %p p.id)/(scot %ud `@`q.id)/writ
          =/  writ
            .^(writ:w:d (~(construct scry [our now]) %gx %portal-manager path))
          =/  chatmap
            .^  (map flag:w:d [* * * perm=[* group=flag:w:d] *])
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
          =/  note
            .^(note:n:d (~(construct scry [our now]) %gx %diary path))
          =/  diarymap
            .^  (map flag:n:d [* * * perm=[* group=flag:w:d] *])
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
            (wyt:on:quips:n:d quips:note)
          ==
          ::
            %groups-heap-curio  :: path: '/heap/~toptyr-bilder/links/curios/curio/id/170.141.184.506.270.899.144.208.463.636.562.182.144
          =/  =path
            =,  bespoke
            /heap/(scot %p p.channel)/[q.channel]/curios/curio/id/(scot %ud `@`time)/curio
          =/  curio
            .^(curio:cur:d (~(construct scry [our now]) %gx %heap path))
          =/  heapmap
            .^  (map flag:n:d [* * perm=[* group=flag:w:d] *])
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
            reach=[%public ~]
  ::
  ++  prepend-to-feed
    |=  [now=time feed=item:d act=action]
    ^-  item:d
    ?>  ?=([%prepend-to-feed *] act)
    ?>  ?=(%feed -.bespoke.feed)
    ?>  =(key.feed feed-key.act)
    =/  new-feed  %+  oust  [1.000 (lent feed.act)]
      (weld feed.act feed.bespoke.feed)
    (edit now feed [%edit key.feed ~ `[%feed `new-feed]])
  ::
  ++  append-no-dupe
    |=  [now=time col=item:d act=action]
    ^-  item:d
    ?>  ?=([%append *] act)
    ?>  ?=(%collection -.bespoke.col)
    ?>  =(col-key.act key.col)
    =+  (welp key-list.bespoke.col key-list.act)
    %^  edit  now  col
      [%edit col-key.act ~ `[%collection ~ ~ ~ `(deduplicate:keys -)]]
  ::
  ++  append-to-col
    |=  [now=time col=item:d act=action]
    ^-  item:d
    ?>  ?=([%append *] act)
    ?>  ?=(%collection -.bespoke.col)
    ?>  =(col-key.act key.col)
    =/  new-key-list  (weld key-list.bespoke.col key-list.act)
    %^  edit  now  col
      [%edit col-key.act ~ `[%collection ~ ~ ~ `new-key-list]]
  ::
  ++  prepend-to-col
    |=  [now=time col=item:d act=action]
    ^-  item:d
    ?>  ?=([%prepend *] act)
    ?>  ?=(%collection -.bespoke.col)
    ?>  =(col-key.act key.col)
    =/  new-key-list  (weld key-list.act key-list.bespoke.col)
    %^  edit  now  col
      [%edit col-key.act ~ `[%collection ~ ~ ~ `new-key-list]]
  ::
  ++  remove-from-col
    |=  [now=time col=item:d act=action]
    ^-  item:d
    ?>  ?=([%remove *] act)
    ?>  ?=(%collection -.bespoke.col)
    ?>  =(col-key.act key.col)
    =/  new-key-list  %+  skip  key-list.bespoke.col
      |=(=key:d ?~((find [key]~ key-list.act) %.n %.y))
    %^  edit  now  col
      [%edit col-key.act ~ `[%collection ~ ~ ~ `new-key-list]]

  ::
  ++  delete
    |=  [now=time =item:d act=action]
    ^-  item:d
    ?>  ?=([%delete *] act)
    ?>  =(key.item key.act)
    %=  item
      lens             %deleted
      updated-at.meta  `@t`(scot %da now)
    ==
  ::
  --
::
++  item-methods  ::  all arms here should output item
  |_  =bowl:gall
  ++  edit             (cury edit:pure now.bowl)
  ++  replace          (cury replace:pure now.bowl)
  ++  create           (cury create:pure [our now]:bowl)
  ++  prepend-to-feed  (cury prepend-to-feed:pure now.bowl)
  ++  append-no-dupe   (cury append-no-dupe:pure now.bowl)
  ++  append-to-col    (cury append-to-col:pure now.bowl)
  ++  prepend-to-col   (cury prepend-to-col:pure now.bowl)
  ++  remove-from-col  (cury remove-from-col:pure now.bowl)
  ++  delete           (cury delete:pure now.bowl)
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
  |=  [dist-desk=@t dev=ship our=ship now=time sig=signature:d]
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
    ^-  signature:d
    =+  (jael-scry ,=life our %life now /(scot %p our))
    =+  (jael-scry ,=ring our %vein now /(scot %ud life))
    :+  `@ux`(sign:as:(nol:nu:crub:crypto ring) (jam sig-input))
      our
    life
  ::
  ++  validate
    |=  [our=ship =signature:d sig-input=* now=time]
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
