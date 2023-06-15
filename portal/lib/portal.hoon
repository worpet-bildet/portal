/-  *portal-data, portal-config, *portal-action, *portal-message,
    portal-data-0, gr=social-graph, treaty
/+  sig, io=agentio, mip, sss
|%
+$  card  card:agent:gall
::
++  conv
  |%
  ::
  ::  TODO what if time looks like '/some-blog-path'
  ::  or '/some/blog/path'
  ++  key-to-path
    |=  [=key]
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
    ;;  key
    ~&  >  "new feat: path-to-key depending on path length"
    :^  ;;  struc  -:path
        `ship`(slav %p +<:path)
        ?:((gte (lent path) 3) `cord`+>-:path '')
        ?:((gte (lent path) 4) `cord`+>+<:path '')
  ::
  ++  key-to-node
    |=  [=key]
    ;;  node:gr
    [%entity %portal-store (spat (key-to-path key))]
  ::  
  ++  node-to-key  
    |=  [=node:gr]
    ;;  key
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
  --
::
++  scry
  |_  [our=ship now=time]
  ::  gets item, and if doesn't exist returns ~
  ++  item-exists
    |=  [=key]
    ;;  ?
    .^  store-result  %gx
      ;:  weld
        /(scot %p our)/portal-store/(scot %da now)/item-exists
        (key-to-path:conv key)
        /noun
    ==  ==
  ::
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
  ++  get-all-items
    |.
    ;;  items
    %-  tail
    .^(store-result %gx /(scot %p our)/portal-store/(scot %da now)/items/noun)
  ::
  ++  get-all-keys
    |.
    ;;  key-set
    %-  tail
    .^  store-result
      %gx
      /(scot %p our)/portal-store/(scot %da now)/keys/noun
    ==
  ::
  --
::
++  keys
  |%
  ++  skid-temp
    |=  [=key-list]
    ^-  [temp=^key-list def=^key-list]
    (skid key-list |=([=key] ?~(time.key %.y %.n)))
  ::
  ++  skim-temp
    |=  [=key-list]
    ^-  ^key-list
    (skim key-list |=([=key] ?~(time.key %.y %.n)))
  ::
  ++  skip-temp
    |=  [=key-list]
    ^-  ^key-list
    (skip key-list |=([=key] ?~(time.key %.y %.n)))
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
        %collection
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
  ::
  ++  msg
    |=  =message
    ^-  card
    [(~(poke pass:io /msg) dock [%portal-message !>(message)])]
  ::
  ++  upd
    |=  =item
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
          %collection  key-list.bespoke.item
      ==
  --
::
::  so I can use item-methods wherever, without needing bowl
++  pure
  |%
  ++  edit
    |=  [now=time =item act=action]
    ::  should output item
    ~&  >  "new feat: different edit implementation"
    ^-  ^item
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
  --
::
++  item-methods  ::  all arms here should output item
  |_  =bowl:gall
  ++  edit 
    ~&  >  "new feat: curried edit implementation"
    (cury edit:pure now.bowl)
  ::
  ++  replace
    |=  [=item act=action]
    ^-  ^item
    ?>  ?=([%replace *] act)
    ?>  =(key.item key.act)
    %=  item
      lens             lens.act
      bespoke          bespoke.act
      updated-at.meta  `@t`(scot %da now.bowl)
    ==
  ::
  ++  create
    |=  [act=action]
    ^-  item
    ?>  ?=([%create *] act)     ::  assert that action is %create
    =/  bespoke  (fall bespoke.act *bespoke)
    :^  :^  -.bespoke
            (fall ship.act our.bowl)
            (fall cord.act '')
            (fall time.act `@t`(scot %da now.bowl))
        (fall lens.act *lens)
        bespoke
        :^  created-at=`@t`(scot %da now.bowl)
            updated-at=''
            permissions=~[our.bowl]
            reach=[%public ~]
  ::
  ++  prepend-to-feed
    |=  [feed=item act=action]
    ^-  item
    ?>  ?=([%prepend-to-feed *] act)
    ?>  ?=(%feed -.bespoke.feed)
    ?>  =(key.feed feed-key.act)
    =/  new-feed  %+  oust  [1.000 (lent feed.act)]
      (weld feed.act feed.bespoke.feed)
    (edit feed [%edit key.feed ~ `[%feed `new-feed]])
  ::
  ::  TODO abstract collection methods?
  ::  such that it takes in a gate that arbitrarily modifies the key list
  ++  append-to-col
    |=  [col=item act=action]
    ^-  item
    ?>  ?=([%append *] act)
    ?>  ?=(%collection -.bespoke.col)
    ?>  =(col-key.act key.col)
    =/  new-key-list  (weld key-list.bespoke.col key-list.act)
    %+  edit  col
      [%edit col-key.act ~ `[%collection ~ ~ ~ `new-key-list]]
  ::
  ++  prepend-to-col
    |=  [col=item act=action]
    ^-  item
    ?>  ?=([%prepend *] act)
    ?>  ?=(%collection -.bespoke.col)
    ?>  =(col-key.act key.col)
    =/  new-key-list  (weld key-list.act key-list.bespoke.col)
    %+  edit  col
      [%edit col-key.act ~ `[%collection ~ ~ ~ `new-key-list]]
  ::
  ++  remove-from-col
    |=  [col=item act=action]
    ^-  item
    ?>  ?=([%remove *] act)
    ?>  ?=(%collection -.bespoke.col)
    ?>  =(col-key.act key.col)
    =/  new-key-list  %+  skip  key-list.bespoke.col
      |=(=key ?~((find [key]~ key-list.act) %.n %.y))
    %+  edit  col
      [%edit col-key.act ~ `[%collection ~ ~ ~ `new-key-list]]
  ::
  ++  delete
    |=  [=item act=action]
    ^-  ^item
    ?>  ?=([%delete *] act)
    ?>  =(key.item key.act)
    %=  item
      lens             %deleted
      updated-at.meta  `@t`(scot %da now.bowl)
    ==
  --
::
++  validate-sig
  |=  [dist-desk=@t dev=ship our=ship now=time sig=signature]
  ?~  dist-desk  %.y
  =/  dist-desk  (parse-dist-desk:misc dist-desk)
  ?~  dist-desk  %.n
  ::  note: src is allowed to be different from dist-ship
  ?.  =(ship.sig dist-name.u.dist-desk)  %.n
  ?:  =((get-ship-type:misc our) %comet)  %.n
  ~&  "validating... w/ input:"
  ~&  [%sign-app dev ^dist-desk]
  ~&  "and sig:"
  ~&  sig
  (validate:^sig our sig [%sign-app dev ^dist-desk] now)
::
--
