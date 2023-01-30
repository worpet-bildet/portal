/-  *portal-data, *portal-action
/+  *portal, docket, mip
|%
::  TODO  fix pointer fix, p q r, type on q
::  do fixes for seth
++  enjs
  =,  enjs:format
  |%
  ++  enjs-nested-all-items
    |=  =nested-all-items
    ^-  json
    =/  transform
      |=  [=pointer =cur-obj]
      [(@t p.+:(enjs-jam-pointer pointer)) (enjs-cur-object cur-obj)]
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
      |=  [=pointer =lis-obj]
      [(@t p.+:(enjs-jam-pointer pointer)) (enjs-list-object lis-obj)]
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
      |=  [=pointer =item]
      [(@t p.+:(enjs-jam-pointer pointer)) (enjs-item item)]
    =/  l  (turn ~(tap by end-map) transform)
    [%o `(map @t json)`(malt l)]
  ++  enjs-item
    |=  [=item]
    ^-  json
    %-  pairs
    :~  ['key' (enjs-jam-pointer [%.y id.meta-data.item])]
        ['data' (enjs-data data.item)]
        ['meta-data' (enjs-meta-data meta-data.item)]
        ['social' (enjs-social social.item)]
        ['item-sig' (enjs-sig item-sig.item)]
    ==
  ++  enjs-all-items
    |=  =all-items
    ^-  json
    =/  lis  ~(tap by all-items)
    [%a (turn lis enjs-pointer-and-item)]
  ++  enjs-pointer-and-item
    |=  [=pointer =item]
    ^-  json
    %-  pairs
    :~  ['key' (enjs-jam-pointer pointer)]
        ['data' (enjs-data data.item)]
        ['meta-data' (enjs-meta-data meta-data.item)]
        ['social' (enjs-social social.item)]
        ['item-sig' (enjs-sig item-sig.item)]
    ==
  ++  enjs-meta-data
    |=  [=meta-data]
    ^-  json
    %-  pairs
    :~  ['id' (enjs-id id.meta-data)]
        ['updated-at' s+updated-at.meta-data]
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
              %app
            %-  pairs
            :~  ['dist-desk' s+dist-desk.bespoke]
                ['signature' (enjs-sig sig.bespoke)]
                ['desk-hash' s+`@t`(scot %uv desk-hash.bespoke)]
                ['docket' (docket:enjs:docket docket.bespoke)]
            ==
              %curator-page
            %-  pairs
            :~  ['curator-page' (enjs-cur-page-recs recommendations.bespoke)]
            ==
              %validity-store
            %-  pairs
            :~  ['validity-store N/A' s+'']
            ==
              %list
            %-  pairs
            :~  ['list' (enjs-list-recs recommendations.bespoke)]
            ==
              %other
            %-  pairs
            :~  ['other' s+'']
            ==
          ==
      ==
      ++  enjs-list-recs
        |=  list-recs=[type=?(%other %app %ship %group) =end-item-pointer-list]
        ^-  json
        %-  pairs
        :~  ['type' s+`@t`type.list-recs]
            ['pointer-list' (enjs-jammed-pointer-list end-item-pointer-list.list-recs)]
        ==
      ++  enjs-cur-page-recs
        |=  cur-page-recs=[type=%list =list-pointer-list]
        ^-  json
        %-  pairs
        :~  ['type' s+`@t`type.cur-page-recs]
            ['pointer-list' (enjs-jammed-pointer-list list-pointer-list.cur-page-recs)]
        ==
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
  ++  enjs-jammed-pointer-list
    |=  =pointer-list
    ^-  json
    :-  %a
    %+  turn  pointer-list
    |=(=pointer (enjs-jam-pointer pointer))
  ++  enjs-pointer-list
    |=  =pointer-list
    ^-  json
    :-  %a
    %+  turn  pointer-list
    |=(=pointer (enjs-pointer pointer))
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
  ++  enjs-jam-pointer
    |=  =pointer
    ^-  json
    s+(spat (pointer-to-sub-path:conv pointer))
  ++  enjs-pointer
    |=  =pointer
    ^-  json
    %-  pairs
    :~  ['points-to-item' b+points-to-item.pointer]
        ['id' (enjs-id id.pointer)]
    ==
  ++  enjs-id
    |=  =id
    ^-  json
    %-  pairs
    :~  ['ship' s+`@t`(scot %p p.id)]
        ['type' s+`@t`q.id]
        ['time' s+r.id]
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
    :~  [%add (ot ~[p+dejs-ship r+so general+dejs-general bespoke-input+dejs-bespoke-input])]
        [%edit (ot ~[id+dejs-id general+dejs-general bespoke-input+dejs-bespoke-input])]
        [%sub (ot ~[pointer+dejs-pointer])]
        [%del (ot ~[pointer+dejs-pointer])]
        [%comment (ot ~[pointer+dejs-pointer text+so])]
        [%edit-comment (ot ~[pointer+dejs-pointer created-at+so text+so])]
        [%del-comment (ot ~[pointer+dejs-pointer created-at+so])]
        [%rate (ot ~[pointer+dejs-pointer rating-num+ni])]
        [%unrate (ot ~[pointer+dejs-pointer])]
        [%review (ot ~[pointer+dejs-pointer text+so hash+dejs-hash is-safe+bo])]
        [%del-review (ot ~[pointer+dejs-pointer])]
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
    :~  [%curator-page (ot ~[recommendations+dejs-recommendations])]
        [%list (ot ~[recommendations+dejs-recommendations])]
        [%app (ot ~[dist-desk+so])]
        [%other so]
    ==
  ++  dejs-recommendations
    |=  jon=json
    %-  recommendations
    %.  jon
    %-  of
    :~  [%list (ot ~[list-pointer-list+dejs-pointer-list])]
        [%other (ot ~[end-item-pointer-list+dejs-pointer-list])]
        [%app (ot ~[end-item-pointer-list+dejs-pointer-list])]
        [%group (ot ~[end-item-pointer-list+dejs-pointer-list])]
        [%ship (ot ~[end-item-pointer-list+dejs-pointer-list])]
    ==
  ++  dejs-pointer-list
    |=  jon=json
    ^-  pointer-list
    %.  jon
    (ar dejs-pointer)
  ++  dejs-pointer
    |=  jon=json
    ^-  pointer
    %.  jon
    %-  ot
    :~  points-to-item+bo
        id+dejs-id
    ==
  ++  dejs-id
    |=  jon=json
    ^-  id
    %.  jon
    %-  ot
    :~  p+dejs-ship
        q+so
        r+so
    ==
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
