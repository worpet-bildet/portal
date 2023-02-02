/-  *portal-data, *portal-action, *portal-front-end-update
/+  *portal, docket, mip
|%
::  TODO  fix key fix, p q r, type on q
::  do fixes for seth
++  enjs
  =,  enjs:format
  |%
  ++  enjs-front-end-update
    |=  =front-end-update
    ^-  json
    %-  pairs
    :~  ['action' s+`@t`update.front-end-update]
        ['key' (enjs-key key.front-end-update)]
        ['key-str' (enjs-jam-key key.front-end-update)]
        ['face' s+(@t (weld (trip update.front-end-update) (spud type.key.front-end-update)))]
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
      |=  [=key =item]
      [(@t p.+:(enjs-jam-key key)) (enjs-item item)]
    =/  l  (turn ~(tap by end-map) transform)
    [%o `(map @t json)`(malt l)]
  ++  enjs-item
    |=  [=item]
    ^-  json
    %-  pairs
    :~  ['key' (enjs-jam-key key.bespoke.data.item)]
        ['data' (enjs-data data.item)]
        ['meta-data' (enjs-meta-data meta-data.item)]
        ['social' (enjs-social social.item)]
        ['item-sig' (enjs-sig item-sig.item)]
    ==
  ++  enjs-all-items
    |=  =all-items
    ^-  json
    =/  lis  ~(tap by all-items)
    [%a (turn lis enjs-key-and-item)]
  ++  enjs-key-and-item
    |=  [=key =item]
    ^-  json
    %-  pairs
    :~  ['key' (enjs-jam-key key)]
        ['data' (enjs-data data.item)]
        ['meta-data' (enjs-meta-data meta-data.item)]
        ['social' (enjs-social social.item)]
        ['item-sig' (enjs-sig item-sig.item)]
    ==
  ++  enjs-meta-data
    |=  [=meta-data]
    ^-  json
    %-  pairs
    :~  ['updated-at' s+updated-at.meta-data]
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
      |^
      %-  pairs
      :~  :-  -.bespoke
          ?-    -.bespoke
              %enditem-app
            %-  pairs
            :~  ['key' (enjs-key key.bespoke)]
                ['dist-desk' s+dist-desk.bespoke]
                ['signature' (enjs-sig sig.bespoke)]
                ['desk-hash' s+`@t`(scot %uv desk-hash.bespoke)]
                ['docket' (docket:enjs:docket docket.bespoke)]
            ==
              %enditem-other
            %-  pairs
            :~  ['key' (enjs-key key.bespoke)]
                ['other' s+'']
            ==
              %list-enditem-other
            %-  pairs
            :~  ['key' (enjs-key key.bespoke)]
                ['list-enditem-other' (enjs-key-list other-key-list.bespoke)]
            ==
              %list-enditem-app
            %-  pairs
            :~  ['key' (enjs-key key.bespoke)]
                ['list-enditem-app' (enjs-key-list app-key-list.bespoke)]
            ==
              %list-nonitem-group
            %-  pairs
            :~  ['key' (enjs-key key.bespoke)]
                ['list-nonitem-group' (enjs-key-list group-key-list.bespoke)]
            ==
              %list-nonitem-ship
            %-  pairs
            :~  ['key' (enjs-key key.bespoke)]
                ['list-nonitem-ship' (enjs-key-list ship-key-list.bespoke)]
            ==
              %list-list
            %-  pairs
            :~  ['key' (enjs-key key.bespoke)]
                ['list-list' (enjs-key-list list-key-list.bespoke)]
            ==
              %validity-store
            %-  pairs
            :~  ['key' (enjs-key key.bespoke)]
                ['validity-store N/A' s+'']
            ==
          ==
      ==
      ++  enjs-key-list
        |=  =key-list
        ^-  json
        %-  frond
        ['key-list' (enjs-jammed-key-list key-list)]
      --
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
            ['rating-num' (numb rating-num.rating)]
            ['updated-at' s+updated-at.rating]
            ['created-at' s+created-at.rating]
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
            ['ship' s+`@t`(scot %p ship.com-key)]
            ['text' s+text.comment]
            ['updated-at' s+updated-at.comment]
            ['created-at' s+created-at.com-key]
        ==
      ++  enjs-jam-com-key
        |=  =com-key
        ^-  json
        %-  wall
        ~[(scow %p ship.com-key) (trip created-at.com-key)]
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
            ['is-current' b+is-current.review]
            ['is-safe' b+is-safe.review]
            ['updated-at' s+updated-at.review]
            ['created-at' s+created-at.review]
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
    s+(spat (key-to-sub-path:conv key))
  ++  enjs-key
    |=  =key
    ^-  json
    %-  pairs
    :~  ['ship' s+`@t`(scot %p ship.key)]
        ['type' s+(spat type.key)]
        ['cord' s+cord.key]
    ==
    ::

  :: ++  enjs-app-set
  ::   |=  =app-set
  ::   ^-  json
  ::   =/  app-list  ~(tap in app-set)
  ::   [%a (turn app-list |=(app=@tas s+`@t`app))]
  :: ++  enjs-aux-map
  ::   |=  =aux-map
  ::   ^-  json
  ::   =/  lis  ~(tap by aux-map)
  ::   =/  modify
  ::     |=  [=dev-name =app-set]
  ::     [`@t`(scot %p dev-name) (enjs-app-set app-set)]
  ::   (pairs (turn lis modify))
  :: ++  enjs-cat-set
  ::   |=  =cat-set
  ::   ^-  json
  ::   =/  cat-list  ~(tap in cat-set)
  ::   [%a (turn cat-list |=(=category s+`@t`category))]
  --
::
::
++  dejs
  =,  dejs:format
  |%
  ++  dejs-action
    |=  jon=json
    ^-  action
    %.  jon
    %-  of
    :~  [%add (ot ~[ship+dejs-ship type+dejs-type general+dejs-general bespoke-input+dejs-bespoke-input])]
        [%edit (ot ~[key+dejs-key general+dejs-general bespoke-input+dejs-bespoke-input])]
        [%sub (ot ~[key+dejs-key])]
        [%del (ot ~[key+dejs-key])]
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
    :~  [%list-enditem-other (ot ~[other-key-list+dejs-key-list])]
        [%list-enditem-app (ot ~[app-key-list+dejs-key-list])]
        [%list-nonitem-ship (ot ~[ship-key-list+dejs-key-list])]
        [%list-nonitem-group (ot ~[group-key-list+dejs-key-list])]
        [%enditem-app (ot ~[dist-desk+so])]
        [%enditem-other so]
        [%list-list (ot ~[list-key-list+dejs-key-list])]
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
  :: ++  dejs-cat-map
  ::   |=  jon=json
  ::   ^-  cat-map
  ::   |^
  ::   (malt ((ar dejs-key-cat) jon))
  ::   ++  dejs-key-cat
  ::     |=  jon=json
  ::     ^-  [=key =category]
  ::     %.  jon
  ::     %-  ot
  ::     :~  key+dejs-key
  ::         category+so
  ::     ==
  ::   --
  :: ++  dejs-cat-set
  ::   |=  jon=json
  ::   ^-  cat-set
  ::   %-  silt
  ::   %.  jon
  ::   (ar so)
  ::
  --
--
