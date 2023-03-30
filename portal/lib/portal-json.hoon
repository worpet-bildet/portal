/-  *portal-data, *portal-action, *portal-front-end-update
/+  *portal, docket, treaty
|%
++  enjs
  =,  enjs:format
  |%
  ++  enjs-outgoing-subs
    |=  =outgoing-subs
    ^-  json
    |^
    =/  transform
      |=  [ship=@p map=(map key acked=?)]
      ^-  [@t json]
      [(scot %p ship) (enjs-key-acked-map map)]
    =/  l  (turn ~(tap by outgoing-subs) transform)
    [%o `(map @t json)`(malt l)]
    ++  enjs-key-acked-map
      |=  mapp=(map key acked=?)
      ^-  json
      =/  transform
        |=  [=key acked=?]
        ^-  [@t json]
        [(spat (key-to-path-key:conv key)) b+acked]
      =/  l  (turn ~(tap by mapp) transform)
      [%o `(map @t json)`(malt l)]
    --
  ++  enjs-valid
    |=  =valid
    ^-  json
    ?~  valid
      %-  pairs
      :~  ['valid' ~]
          ['noResult' b+%.y]
      ==
    %-  pairs
    :~  ['valid' b++.valid]
        ['noResult' b+%.n]
    ==
  ++  enjs-front-end-update
    |=  =front-end-update
    ^-  json
    %-  pairs
    :~  ['srcIsOur' b+src-is-our.front-end-update]
        ['action' s+`@t`update.front-end-update]
        ['keyObj' (enjs-key key.front-end-update)]
        ['keyStr' (enjs-jam-key key.front-end-update)]
        ['item' ?~(item.front-end-update ~ (enjs-item-or-null item.front-end-update))]
        ['face' s+(crip (weld (trip update.front-end-update) (spud type.key.front-end-update)))]
    ==
  ++  enjs-item-or-null
    |=  [item=?(~ item)]
    ^-  json
    ?~  item  ~
    %-  pairs
    :~  ['keyStr' (enjs-jam-key key.item)]
        ['keyObj' (enjs-key key.item)]
        ['data' (enjs-data data.item)]
        ['meta' (enjs-meta meta.item)]
        ['social' (enjs-social social.item)]
        ['sig' (enjs-sig sig.item)]
    ==
  ++  enjs-key-and-item
    |=  [=key =item]
    ^-  json
    (enjs-item-or-null item)
  ++  enjs-items
    |=  =items
    ^-  json
    =/  lis  ~(tap by items)
    [%a (turn lis enjs-key-and-item)]
  ++  enjs-meta
    |=  [=meta]
    ^-  json
    %-  pairs
    :~  ['updatedAt' s+updated-at.meta]
        ['permissions N/A' s+'']
        ['reach N/A' s+'']
        ['outside-sigs N/A' s+'']
    ==
  ++  enjs-data
    |=  [=data]
    ^-  json
    |^
    %-  pairs
    :~  ['general' (enjs-general general.data)]
        ['bespoke' (enjs-bespoke bespoke.data)]
    ==
    ++  enjs-general
      |=  [=general]
      ^-  json
      %-  pairs
      :~  ['title' s+title.general]
          ['link' s+link.general]
          ['description' s+description.general]
          ['tags' (enjs-cord-list tags.general)]
          ::['properties' o+properties.general]
          ['pictures' (enjs-cord-list pictures.general)]
          ['image' s+image.general]
          ['color' s+color.general]
      ==
    ++  enjs-bespoke
      |=  [=bespoke]
      ^-  json
      ?-    -.bespoke
        [%nonitem %ship ~]    s+''
        [%nonitem %group ~]   s+''
        [%nonitem %app ~]     (treaty:enjs:treaty treaty.bespoke)
        [%enditem %app ~]     %-  pairs
                         :~  ['distDesk' s+dist-desk.bespoke]
                             ['signature' (enjs-sig sig.bespoke)]
                             ['treaty' (treaty:enjs:treaty treaty.bespoke)]
                         ==
        [%enditem %other ~]   s+''
        [%list ~]            (enjs-key-list key-list.bespoke)
        [%list %list ~]       (enjs-key-list list-key-list.bespoke)
        [%validity-store ~]  s+''
      ==
    --
  ++  enjs-social
    |=  =social
    ^-  json
    |^
    %-  pairs
    :~  ['ratings' (enjs-rats ratings.social)]
        ['comments' (enjs-coms comments.social)]
        ['reviews' (enjs-revs reviews.social)]
    ==
    ++  enjs-rats
      |=  =ratings
      ^-  json
      |^
      =/  lis  ~(tap by ratings)
      [%a (turn lis enjs-rat)]
      ++  enjs-rat
        |=  [usr-name=@p rating=[rating-num=@ud =updated-at =created-at]]
        ^-  json
        %-  pairs
        :~  ['key' s+`@t`(scot %p usr-name)]
            ['ship' s+`@t`(scot %p usr-name)]
            ['ratingNum' (numb rating-num.rating)]
            ['updatedAt' s+updated-at.rating]
            ['createdAt' s+created-at.rating]
        ==
      --
    ++  enjs-coms
      |=  =comments
      ^-  json
      |^
      =/  lis  ~(tap by comments)
      [%a (turn `(list [com-key comment])`lis enjs-com)]
      ++  enjs-com
        |=  [=com-key =comment]
        ^-  json
        %-  pairs
        :~  ['key' (enjs-jam-com-key com-key)]
            ['keyObj' (enjs-com-key com-key)]
            ['ship' s+`@t`(scot %p ship.com-key)]
            ['text' s+text.comment]
            ['updatedAt' s+updated-at.comment]
            ['createdAt' s+created-at.com-key]
        ==
      ++  enjs-com-key
        |=  =com-key
        ^-  json
        %-  pairs
        :~  ['ship' s+`@t`(scot %p ship.com-key)]
            ['createdAt' s+created-at.com-key]
        ==
      ++  enjs-jam-com-key
        |=  =com-key
        ^-  json
        s+(crip (weld (scow %p ship.com-key) (trip created-at.com-key)))
      --
    ++  enjs-revs
      |=  =reviews
      ^-  json
      |^
      =/  lis  ~(tap by reviews)
      [%a (turn lis enjs-rev)]
      ++  enjs-rev
        |=  [reviewer=@p =review]
        ^-  json
        %-  pairs
        :~  ['key' s+`@t`(scot %p reviewer)]
            ['ship' s+`@t`(scot %p reviewer)]
            ['text' s+text.review]
            ['hash' s+`@t`(scot %uv hash.review)]
            ['isCurrent' b+is-current.review]
            ['isSafe' b+is-safe.review]
            ['updatedAt' s+updated-at.review]
            ['createdAt' s+created-at.review]
        ==
      --
    --
  ++  enjs-jammed-key-list
    |=  =key-list
    ^-  json
    :-  %a
    %+  turn  key-list
    |=(=key (enjs-jam-key key))
  ++  enjs-key-list
    |=  =key-list
    ^-  json
    :-  %a
    %+  turn  key-list
    |=(=key (enjs-key key))
  ++  enjs-sig
    |=  =signature
    ^-  json
    %-  pairs
    :~  ['hex' s+`@t`(scot %ux hex.signature)]
        ['ship' s+`@t`(scot %p ship.signature)]
        ['life' n+(scot %ud life.signature)]
    ==
  ++  enjs-cord-list
    |=  cords=(list @t)
    ^-  json
    :-  %a
    %+  turn  cords
    |=(cor=@t s+cor)
  ++  enjs-jam-key
    |=  =key
    ^-  json
    s+(spat (key-to-path-key:conv key))
  ++  enjs-key
    |=  =key
    ^-  json
    %-  pairs
    :~  ['ship' (enjs-ship ship.key)]
        ['type' s+(spat type.key)]
        ['cord' s+cord.key]
    ==
    ::
  ++  enjs-key-set
    |=  =key-set
    ^-  json
    =/  key-list  ~(tap in key-set)
    [%a (turn key-list |=(=key (enjs-key)))]
  ::
  ++  enjs-ship
    |=  ship=@p
    ^-  json
    s+`@t`(scot %p ship)
  --
::
::
++  dejs
  =,  dejs:format
  |%
  ++  dejs-action
    |=  jon=json
    %-  action
    %.  jon
    %-  of
    :~  [%add (ot ~[ship+dejs-ship type+dejs-type general+dejs-general bespoke-input+dejs-bespoke-input])]
        [%add-item-to-list (ot ~[list-key+dejs-key ship+dejs-ship type+dejs-type general+dejs-general bespoke-input+dejs-bespoke-input])]
        [%edit (ot ~[key+dejs-key general+dejs-general bespoke-input+dejs-bespoke-input])]
        [%sub (ot ~[key+dejs-key])]
        [%del (ot ~[key+dejs-key])]
        [%index-as-curator (ot ~[toggle+bo])]
    ==
  ++  dejs-general
    |=  jon=json
    ^-  general
    %.  jon
    %-  ot
    :~  title+so
        link+so
        description+so
        tags+(ar so)
        properties+(om so)
        pictures+(ar so)
        image+so
        color+so
    ==
  ++  dejs-bespoke-input
    |=  jon=json
    %-  bespoke-input
    %.  jon
    %-  of
    :~  [%list (ot ~[key-list+dejs-key-list])]
        [%enditem-app (ot ~[dist-desk+so])]
        [%enditem-other so]
        [%list-list (ot ~[list-key-list+dejs-key-list])]
    ==
  ++  dejs-key-text
    |=  jon=json
    ^-  [key cord]
    %.  jon
    %-  ot
    :~  key+dejs-key
        text+so
    ==
  ++  dejs-key-list
    |=  jon=json
    ^-  key-list
    %.  jon
    (ar dejs-key)
  ++  dejs-key
    |=  jon=json
    ^-  key
    %.  jon
    %-  ot
    :~  ship+dejs-ship
        type+dejs-type
        cord+so
    ==
  ++  dejs-type
    |=  jon=json
    ^-  ^type
    (^type (stab (so jon)))
  ++  dejs-ship
    |=  jon=json
    ^-  @p
    ((se %p) jon)
  ++  dejs-hash
    |=  jon=json
    ^-  @uv
    `@uv`(slav %uv (so jon))
  ++  dejs-key-set
    |=  jon=json
    ^-  key-set
    %-  silt
    %.  jon
    (ar dejs-key)
  --
--
