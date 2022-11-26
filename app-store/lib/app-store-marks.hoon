/-  *app-store-data, *app-store-action
/+  app-store, docket
|%
++  enjs
  =,  enjs:format
  |%
  ++  enjs-usr-update
    |=  uup=usr-update
    ^-  json
    ?-    -.uup
        %all
      =/  lis  ~(tap by usr-data.uup)
      [%a (turn lis enjs-cur-name-cur-page)]
    ==
  ++  enjs-cur-name-cur-page
    |=  [=cur-name =cur-page]
    ^-  json
    %-  pairs
    :~  ['id' s+`@t`(scot %p cur-name)]
        ['cur-name' s+`@t`(scot %p cur-name)]
        ['cur-page' (enjs-cur-page cur-page)]
    ==
  ::
  ++  enjs-cur-update
    |=  cup=cur-update
    ^-  json
    ?+    -.cup    ~
        %all
      (enjs-cur-page cur-page.cup)
    ==
  ::
  ++  enjs-cur-page
    |=  =cur-page
    ^-  json
    %-  pairs
    :~  ['cur-info' (enjs-cur-info cur-info.cur-page)]
        ['cur-data' (enjs-cur-data cur-data.cur-page)]
    ==
  ::
  ++  enjs-cur-info
    |=  =cur-info
    ^-  json
    %-  pairs
    :~  ['cur-title' s+cur-title.cur-info]
        ['cur-image' s+cur-image.cur-info]
        ['cur-intro' s+cur-intro.cur-info]
    ==
  ::
  ++  enjs-cur-data
    |=  =cur-data
    ^-  json
    %-  pairs
    :~  ['cur-choice' (enjs-cur-choice cur-choice.cur-data)]
        ['cur-map' (enjs-cur-map cur-map.cur-data)]
        ['aux-map' (enjs-aux-map aux-map.cur-data)]
    ==
  ::
  ++  enjs-cur-choice
    |=  =cur-choice
    ^-  json
    %-  pairs
    :~  ['key-list' (enjs-key-list key-list.cur-choice)]
        ['cat-map' (enjs-cat-map cat-map.cur-choice)]
        ['cat-set' (enjs-cat-set cat-set.cur-choice)]
    ==
  ++  enjs-key-list
    |=  =key-list
    ^-  json
    [%a (turn key-list enjs-key)]
  ++  enjs-cat-map
    |=  =cat-map
    ^-  json
    =/  lis  ~(tap by cat-map)
    [%a (turn lis enjs-key-and-cat)]
  ++  enjs-cat-set
    |=  =cat-set
    ^-  json
    =/  cat-list  ~(tap in cat-set)
    [%a (turn cat-list |=(=category s+`@t`category))]
  ++  enjs-cur-map
    |=  =cur-map
    ^-  json
    =/  lis  ~(tap by cur-map)
    [%a (turn lis enjs-key-and-app-page)]
  ++  enjs-aux-map
    |=  =aux-map
    ^-  json
    =/  lis  ~(tap by aux-map)
    =/  modify
      |=  [=dev-name =app-set]
      [`@t`(scot %p dev-name) (enjs-app-set app-set)]
    (pairs (turn lis modify))
  ::
  ++  enjs-dev-update
    |=  dup=dev-update
    ^-  json
    ?+    -.dup    ~  ::  todo %add, %edit, %del if necessary
        %all
      %-  pairs
      :~  ['dev-map' (enjs-dev-map dev-map.dev-data.dup)]
          ['app-set' (enjs-app-set app-set.dev-data.dup)]
      ==
    ==
  ++  enjs-dev-map
    |=  =dev-map
    ^-  json
    =/  lis  ~(tap by dev-map)
    [%a (turn lis enjs-key-and-app-page)]
  ::
  ++  enjs-app-set
    |=  =app-set
    ^-  json
    =/  app-list  ~(tap in app-set)
    [%a (turn app-list |=(app=@tas s+`@t`app))]
  ::
  ++  enjs-jam-key
    |=  =key
    ^-  json
    %-  wall
    ~[(scow %p -.key) (trip +.key)]
  ::
  ++  enjs-key
    |=  =key
    ^-  json
    %-  pairs
    :~  ['dev-name' s+`@t`(scot %p dev-name.key)]
        ['app-name' s+`@t`app-name.key]
    ==
  ::
  ++  enjs-key-and-cat
    |=  [=key =category]
    ^-  json
    %-  pairs
    :~  ['id' (enjs-jam-key key)]
        ['key' (enjs-key key)]
        ['category' s+`@t`category]
    ==
  ::
  ++  enjs-key-and-app-page
    |=  [=key =app-page]
    ^-  json
    |^
    %-  pairs
    :~  ['id' (enjs-jam-key key)]
        ['key' (enjs-key key)]
        ['signature' (enjs-sig signature.dst-input.app-page)]
        ['desk-hash' s+`@t`(scot %uv desk-hash.dst-input.app-page)]
        ['docket' (docket:enjs:docket docket.dst-input.app-page)]
        ['description' s+description.dev-input.app-page]
        ['keywords' (enjs-kyws keywords.dev-input.app-page)]
        ['screenshots' (enjs-scrs screenshots.dev-input.app-page)]
        ['dst-desk' s+dst-desk.dev-input.app-page]
        ['ratings' (enjs-rats ratings.usr-input.app-page)]
        ['comments' (enjs-coms comments.usr-input.app-page)]
        ['reviews' (enjs-revs reviews.usr-input.app-page)]
    ==
    ++  enjs-kyws
      |=  =keywords
      ^-  json
      :-  %a
      %+  turn  `(list @t)`keywords
      |=(kyw=@tas s+kyw)
    ++  enjs-scrs
      |=  =screenshots
      ^-  json
      :-  %a
      %+  turn  screenshots
      |=(scr=@tas s+scr)
    ++  enjs-sig
      |=  =signature
      ^-  json
      %-  pairs
      :~  ['p' s+`@t`(scot %ux p.signature)]
          ['q' s+`@t`(scot %p q.signature)]
          ['r' n+(scot %ud r.signature)]
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
        :~  ['id' s+`@t`(scot %p usr-name)]
            ['user' s+`@t`(scot %p usr-name)]
            ['rating-num' (numb rating-num.rating)]
            ['updated-at' (time updated-at.rating)]
            ['created-at' (time created-at.rating)]
        ==
      --
    ++  enjs-coms
      |=  =comments
      ^-  json
      |^
      =/  lis  (tap:com:app-store comments)
      [%a (turn lis enjs-com)]
      ++  enjs-com
        |=  [=created-at =comment]
        ^-  json
        %-  pairs
        :~  ['id' s+(crip (en-json:html (time created-at)))]
            ['user' s+`@t`(scot %p commenter.comment)]
            ['text' s+text.comment]
            ['updated-at' (time updated-at.comment)]
            ['created-at' (time created-at)]
        ==
      --
    ++  enjs-revs
      |=  =reviews
      ^-  json
      |^
      =/  lis  ~(tap by reviews)
      [%a (turn lis enjs-rev)]
      ++  enjs-rev
        |=  [usr-name=@p =review]
        ^-  json
        %-  pairs
        :~  ['id' s+`@t`(scot %p usr-name)]
            ['user' s+`@t`(scot %p usr-name)]
            ['text' s+text.review]
            ['hash' s+`@t`(scot %uv hash.review)]
            ['is-current' b+is-current.review]
            ['is-safe' b+is-safe.review]
            ['updated-at' (time updated-at.review)]
            ['created-at' (time created-at.review)]
        ==
      --
    --
  --
::
::
++  dejs
  =,  dejs:format
  |%
  ++  dejs-dev-action
    |=  jon=json
    ^-  dev-action
    |^
    %.  jon
    %-  of
    :~  [%add (ot ~[app-name+so dev-input+dev-input])]
        [%edit (ot ~[app-name+so dev-input+dev-input])]
        [%del (ot ~[app-name+so])]
    ==
    ++  dev-input
      |=  jon=json
      ^-  ^dev-input
      %.  jon
      %-  ot
      :~  description+so
          keywords+(ar so)
          screenshots+(ar so)
          dst-desk+so
      ==
    --
  ++  dejs-cur-action
    |=  jon=json
    ^-  cur-action
    %.  jon
    %-  of
    :~  [%sub (ot ~[dev-name+dejs-ship])]
        [%unsub (ot ~[dev-name+dejs-ship])]
        [%cur-info (ot ~[cur-info+dejs-cur-info])]
        [%select (ot ~[key-list+dejs-key-list cat-map+dejs-cat-map])]
        [%cats (ot ~[cat-set+dejs-cat-set])]
    ==
  ++  dejs-usr-action
    |=  jon=json
    ^-  usr-action
    %.  jon
    %-  of
    :~  [%sub (ot ~[cur-name+dejs-ship])]
        [%unsub (ot ~[cur-name+dejs-ship])]
    ==
  ++  dejs-visit-dev-action
    |=  jon=json
    ^-  visit-dev-action
    %.  jon
    %-  of
    :~  [%rate (ot ~[key+dejs-key rating-num+ni])]
        [%unrate (ot ~[key+dejs-key])]
        [%add-com (ot ~[key+dejs-key text+so])]
        [%edit-com (ot ~[key+dejs-key time+di text+so])]
        [%del-com (ot ~[key+dejs-key time+di])]
        [%put-rev (ot ~[key+dejs-key text+so hash+dejs-hash is-safe+bo])]
        [%del-rev (ot ~[key+dejs-key])]
    ==
  ++  dejs-hash
    |=  jon=json
    ^-  @uv
    `@uv`(slav %uv (so jon))
  ++  dejs-cur-info
    |=  jon=json
    ^-  cur-info
    %.  jon
    %-  ot
    :~  cur-title+so
        cur-image+so
        cur-intro+so
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
    :~  dev-name+dejs-ship
        app-name+so
    ==
  ++  dejs-cat-map
    |=  jon=json
    ^-  cat-map
    (malt ((ar dejs-key-cat) jon))
  ++  dejs-key-cat
    |=  jon=json
    ^-  [=key =category]
    %.  jon
    %-  ot
    :~  key+dejs-key
        category+so
    ==
  ++  dejs-cat-set
    |=  jon=json
    ^-  cat-set
    %-  silt
    %.  jon
    (ar so)
  ::
  ++  dejs-ship
    |=  jon=json
    ^-  @p
    ((se %p) jon)
  ::

  ::
  --
--
