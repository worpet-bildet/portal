/-  *app-store-data, *app-store-action
/+  app-store, docket
|%
++  enjs
  =,  enjs:format
  |%
  ++  enjs-usr-update
    |=  uup=usr-update
    ^-  json
    |^
    ?-    -.uup
        %all
      =/  lis  ~(tap by usr-data.uup)
      [%a (turn lis enjs-cur-name-cur-page)]
    ==
    ++  enjs-cur-name-cur-page
      |=  [=cur-name =cur-page]
      ^-  json
      %-  frond
      [`@t`(scot %p cur-name) (enjs-cur-page cur-page)]
    --
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
    |^
    %-  pairs
    :~  ['cur-choice' (enjs-cur-choice cur-choice.cur-data)]
        ['cur-map' (enjs-cur-map cur-map.cur-data)]
        ['aux-map' (enjs-aux-map aux-map.cur-data)]
    ==
    ++  enjs-cur-choice
      |=  =cur-choice
      ^-  json
      |^
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
        =/  modify
          |=  [=key =category]
          :_  s+`@t`category
          (crip (en-json:html (wall:enjs:format ~[(scow %p -.key) (trip +.key)])))
        (pairs (turn lis modify))
      ++  enjs-cat-set
        |=  =cat-set
        ^-  json
        =/  cat-list  ~(tap in cat-set)
        [%a (turn cat-list |=(=category s+`@t`category))]
      --
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
    --
  ::
  ++  enjs-dev-update
    |=  dup=dev-update
    ^-  json
    |^
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
    --
  ::
  ++  enjs-app-set
    |=  =app-set
    ^-  json
    =/  app-list  ~(tap in app-set)
    [%a (turn app-list |=(app=@tas s+`@t`app))]
  ::
  ++  enjs-key
    |=  key=^key
    ^-  json
    %-  wall
    ~[(scow %p -.key) (trip +.key)]
  ::
  ++  enjs-key-and-app-page
    |=  [=key =app-page]
    ^-  json
    |^
    %-  pairs
    :~  ['id' (enjs-key key)]
        ['key' a+~[s+`@t`(scot %p -.key) s+`@t`+.key]]
        ['dst-input' (enjs-dst-input dst-input.app-page)]
        ['dev-input' (enjs-dev-input dev-input.app-page)]
        ['usr-input' (enjs-usr-input usr-input.app-page)]
    ==
    ++  enjs-dev-input
      |=  =dev-input
      ^-  json
      |^
      %-  pairs
      :~  ['description' s+description.dev-input]
          ['keywords' (enjs-kyws keywords.dev-input)]
          ['screenshots' (enjs-scrs screenshots.dev-input)]
          ['dst-desk' s+dst-desk.dev-input]
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
      --
    ++  enjs-dst-input
      |=  =dst-input
      ^-  json
      |^
      %-  pairs
      :~  ['signature' (enjs-sig signature.dst-input)]
          ['desk-hash' s+`@t`(scot %uv desk-hash.dst-input)]
          ['docket' (docket:enjs:docket docket.dst-input)]
      ==
      ++  enjs-sig
        |=  =signature
        ^-  json
        %-  pairs
        :~  ['p' s+`@t`(scot %ux p.signature)]
            ['q' s+`@t`(scot %p q.signature)]
            ['r' n+(scot %ud r.signature)]
        ==
      --
    ++  enjs-usr-input
      |=  =usr-input
      ^-  json
      |^
      %-  pairs
      :~  ['ratings' (enjs-rats ratings.usr-input)]
          ['comments' (enjs-coms comments.usr-input)]
          ['reviews' (enjs-revs reviews.usr-input)]
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
  ::
  :: ++  dejs-cur-action
  ::   |=  jon=json
  ::   ^-  cur-action
  ::   |^
  ::   %.  jon
  ::   %-  of
  ::   :~  [%sub (ot ~[dev-name+dejs-ship])]
  ::       [%unsub (ot ~[dev-name+dejs-ship])]
  ::       [%cur-info (ot ~[cur-info+so])]
  ::   ==
  ::   ++  dejs-key-list
  ::     |=  jon=json
  ::     ^-  key-list
  ::     %.  jon
  ::     (ar dejs-key)
  ::   --
  ++  dejs-key
    |=  jon=json
    ^-  key
    %.  jon
    %-  ot
    :~  dev-name+dejs-ship
        app-name+so
    ==
  ::
  ++  dejs-ship
    |=  jon=json
    ^-  @p
    ((se %p) jon)
  ::
  ++  dejs-usr-action  2
  ::
  ++  dejs-visit-dev-action  3
  ::
  --
--
