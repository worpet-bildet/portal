/-  *portal-data, *portal-action, *portal-front-end-update
/+  *portal, docket
|%
++  enjs
  =,  enjs:format
  |%
  ++  enjs-front-end-update
    |=  =front-end-update
    ^-  json
    %-  pairs
    :~  ['srcIsOur' b+src-is-our.front-end-update]
        ['action' s+`@t`update.front-end-update]
        ['keyObj' (enjs-key key.front-end-update)]
        ['keyStr' (enjs-jam-key key.front-end-update)]
        ['item' ?~(item.front-end-update ~ (enjs-item item.front-end-update))]
        ['map' (enjs-end-map end-map.front-end-update)]
        ['face' s+(crip (weld (trip update.front-end-update) (spud type.key.front-end-update)))]
    ==
  ++  enjs-nested-all-items
    |=  =nested-all-items
    ^-  json
    =/  transform
      |=  [=key =cur-obj]
      [(@t p.+:(enjs-jam-key key)) (enjs-cur-object cur-obj)]
    =/  l  (turn ~(tap by nested-all-items) transform)
    [%o `(map @t json)`(malt l)]
  ++  enjs-cur-object
    |=  =cur-obj
    ^-  json
    %-  pairs
    :~  ['item' (enjs-item item.cur-obj)]
        ['map' (enjs-list-map lis-map.cur-obj)]
    ==
  ++  enjs-list-map
    |=  =lis-map
    ^-  json
    =/  transform
      |=  [=key =lis-obj]
      [(@t p.+:(enjs-jam-key key)) (enjs-list-object lis-obj)]
    =/  l  (turn ~(tap by lis-map) transform)
    [%o `(map @t json)`(malt l)]
  ++  enjs-list-object
    |=  =lis-obj
    ^-  json
    %-  pairs
    :~  ['item' (enjs-item item.lis-obj)]
        ['map' (enjs-end-map end-map.lis-obj)]
    ==
  ++  enjs-end-map
    |=  =end-map
    ^-  json
    =/  transform
      |=  [=key item=?(~ item)]
      [(@t p.+:(enjs-jam-key key)) ?~(item ~ (enjs-item item))]
    =/  l  (turn ~(tap by end-map) transform)
    [%o `(map @t json)`(malt l)]
  ++  enjs-item
    |=  [=item]
    ^-  json
    %-  pairs
    :~  ['keyStr' (enjs-jam-key key.bespoke.data.item)]
        ['keyObj' (enjs-key key.bespoke.data.item)]
        ['data' (enjs-data data.item)]
        ['meta' (enjs-meta meta.item)]
        ['social' (enjs-social social.item)]
        ['sig' (enjs-sig sig.item)]
    ==
  ++  enjs-key-and-item
    |=  [=key =item]
    ^-  json
    (enjs-item item)
  ++  enjs-all-items
    |=  =all-items
    ^-  json
    =/  lis  ~(tap by all-items)
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
          %nonitem-ship
        %-  pairs
        :~  ['keyStr' (enjs-jam-key key.bespoke)]
            ['keyObj' (enjs-key key.bespoke)]
            ['payload' s+'']
        ==
          %nonitem-group
        %-  pairs
        :~  ['keyStr' (enjs-jam-key key.bespoke)]
            ['keyObj' (enjs-key key.bespoke)]
            ['payload' s+'']
        ==
          %enditem-app
        %-  pairs
        :~  ['keyStr' (enjs-jam-key key.bespoke)]
            ['keyObj' (enjs-key key.bespoke)]
            :-  'payload'
            %-  pairs
            :~  ['distDesk' s+dist-desk.bespoke]
                ['signature' (enjs-sig sig.bespoke)]
                ['deskHash' s+`@t`(scot %uv desk-hash.bespoke)]
                ['docket' (docket:enjs:docket docket.bespoke)]
            ==
        ==
          %enditem-other
        %-  pairs
        :~  ['keyStr' (enjs-jam-key key.bespoke)]
            ['keyObj' (enjs-key key.bespoke)]
            ['payload' s+'']
        ==
          %list-enditem-other
        %-  pairs
        :~  ['keyStr' (enjs-jam-key key.bespoke)]
            ['keyObj' (enjs-key key.bespoke)]
            ['payload' (enjs-key-text-list other-key-list.bespoke)]
        ==
          %list-enditem-app
        %-  pairs
        :~  ['keyStr' (enjs-jam-key key.bespoke)]
            ['keyObj' (enjs-key key.bespoke)]
            ['payload' (enjs-key-text-list app-key-list.bespoke)]
        ==
          %list-nonitem-group
        %-  pairs
        :~  ['keyStr' (enjs-jam-key key.bespoke)]
            ['keyObj' (enjs-key key.bespoke)]
            ['payload' (enjs-key-text-list group-key-list.bespoke)]
        ==
          %list-nonitem-ship
        %-  pairs
        :~  ['keyStr' (enjs-jam-key key.bespoke)]
            ['keyObj' (enjs-key key.bespoke)]
            ['payload' (enjs-key-text-list ship-key-list.bespoke)]
        ==
          %list-list
        %-  pairs
        :~  ['keyStr' (enjs-jam-key key.bespoke)]
            ['keyObj' (enjs-key key.bespoke)]
            ['payload' (enjs-key-text-list list-key-list.bespoke)]
        ==
          %validity-store
        %-  pairs
        :~  ['keyStr' (enjs-jam-key key.bespoke)]
            ['keyObj' (enjs-key key.bespoke)]
            ['payload' s+'']
        ==
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
  ++  enjs-key-text-list
    |=  =key-text-list
    ^-  json
    :-  %a
    %+  turn  key-text-list
    |=([=key text=cord] (enjs-key-text key text))
  ++  enjs-key-text
    |=  [=key text=cord]
    ^-  json
    %-  pairs
    :~  ['keyStr' (enjs-jam-key key)]
        ['keyObj' (enjs-key key)]
        ['text' s+text]
    ==
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
    s+(spat (key-to-path:conv key))
  ++  enjs-key
    |=  =key
    ^-  json
    %-  pairs
    :~  ['ship' s+`@t`(scot %p ship.key)]
        ['type' s+(spat type.key)]
        ['cord' s+cord.key]
    ==
    ::
  ++  enjs-key-set
    |=  =key-set
    ^-  json
    =/  key-list  ~(tap in key-set)
    [%a (turn key-list |=(=key (enjs-key)))]
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
        [%edit (ot ~[key+dejs-key general+dejs-general bespoke-input+dejs-bespoke-input])]
        [%sub (ot ~[key+dejs-key])]
        [%del (ot ~[key+dejs-key])]
        [%overwrite-list (ot ~[key+dejs-key key-text-list+dejs-key-text-list])]
        [%comment (ot ~[key+dejs-key text+so])]
        [%edit-comment (ot ~[key+dejs-key created-at+so text+so])]
        [%del-comment (ot ~[key+dejs-key created-at+so])]
        [%rate (ot ~[key+dejs-key rating-num+ni])]
        [%unrate (ot ~[key+dejs-key])]
        [%review (ot ~[key+dejs-key text+so hash+dejs-hash is-safe+bo])]
        [%del-review (ot ~[key+dejs-key])]
        [%join-group (ot ~[key+dejs-key])]
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
    :~  [%list-enditem-other (ot ~[other-key-list+dejs-key-text-list])]
        [%list-enditem-app (ot ~[app-key-list+dejs-key-text-list])]
        [%list-nonitem-ship (ot ~[ship-key-list+dejs-key-text-list])]
        [%list-nonitem-group (ot ~[group-key-list+dejs-key-text-list])]
        [%enditem-app (ot ~[dist-desk+so])]
        [%enditem-other so]
        [%list-list (ot ~[list-key-list+dejs-key-text-list])]
    ==
  ++  dejs-key-text-list
    |=  jon=json
    ^-  key-text-list
    %.  jon
    (ar dejs-key-text)
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
    (stab (so jon))
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
