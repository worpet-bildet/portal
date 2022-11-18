/-  *app-store-data, *app-store-action
/+  app-store, *docket
|%
++  enjs-dev-update
  =,  enjs:format
  |=  dup=dev-update
  ^-  json
  |^
  ?+    -.dup    ~  ::  todo others if necessary
      %all
    %-  pairs
    :~  ['dev-map' (dev-map dev-map.dev-data.dup)]
        ['app-set' (app-set app-set.dev-data.dup)]
    ==
  ==
  ++  app-set
    |=  app-set=^app-set
    ^-  json
    =/  app-list  ~(tap in app-set)
    :-  %a
    (turn app-list |=(app=@tas s+app))
  ++  dev-map
    |=  dev-map=^dev-map
    ^-  json
    =/  lis  ~(tap by dev-map)
    %-  pairs
    %+  turn  lis
    |=  pair=[^key ^app-page]
    [(crip (en-json:html (key -.pair))) (app-page +.pair)]
  ++  key
    |=  key=^key
    ^-  json
    %-  wall
    ~[(scow %p -.key) (trip +.key)]
  ++  app-page
    |=  app-page=^app-page
    ^-  json
    |^
    %-  pairs
    :~  ['dev-input' (dev-input dev-input.app-page)]
        ['dst-input' (dst-input dst-input.app-page)]
        ['usr-input' (usr-input usr-input.app-page)]
    ==
    ++  dev-input
      |=  dev-input=^dev-input
      ^-  json
      |^
      %-  pairs
      :~  ['description' s+description.dev-input]
          ['keywords' (keywords keywords.dev-input)]
          ['screenshots' (screenshots screenshots.dev-input)]
          ['dst-desk' s+dst-desk.dev-input]
      ==
      ++  keywords
        |=  keywords=^keywords
        ^-  json
        :-  %a
        %+  turn  `(list @t)`keywords
        |=(kyw=@tas s+kyw)
      ++  screenshots
        |=  screenshots=^screenshots
        ^-  json
        :-  %a
        %+  turn  screenshots
        |=(scr=@tas s+scr)
      --
    ++  dst-input
      |=  dst-input=^dst-input
      ^-  json
      |^
      %-  pairs
      :~  ['signature' (signature signature.dst-input)]
          ['desk-hash' s+`@t`(scot %uv desk-hash.dst-input)]
          ['docket' (docket:enjs docket.dst-input)]  ::figure out lib imports
      ==
      ++  signature
        |=  signature=^signature
        ^-  json
        %-  pairs
        :~  ['p' s+`@t`(scot %ux p.signature)]
            ['q' s+`@t`(scot %p q.signature)]
            ['r' n+(scot %ud r.signature)]
        ==
      --
    ++  usr-input
      |=  usr-input=^usr-input
      ^-  json
      |^
      %-  pairs
      :~  ['ratings' (ratings ratings.usr-input)]
          ['comments' (comments comments.usr-input)]
          ['reviews' (reviews reviews.usr-input)]
      ==
      ++  ratings
        |=  ratings=^ratings
        ^-  json
        =/  lis  ~(tap by ratings)
        %-  pairs
        %+  turn  lis
        |=  pair=[@p @ud]
        [`@t`(scot %p -.pair) (numb:enjs:format +.pair)]
      ++  comments
        |=  comments=^comments
        ^-  json
        |^
        =/  lis  (tap:com:app-store comments)  ::figure out lib imports
        %-  pairs
        %+  turn  lis
        |=  pair=[@da ^comment]
        :_  (comment +.pair)
        (crip (en-json:html (time:enjs:format -.pair)))
        ++  comment
          |=  comment=^comment
          ^-  json
          %-  frond
          [`@t`(scot %p -.comment) s++.comment]
        --
      ++  reviews
        |=  reviews=^reviews
        ^-  json
        |^
        =/  lis  ~(tap by reviews)
        %-  pairs
        %+  turn  lis
        |=  pair=[@p ^review]
        [`@t`(scot %p -.pair) (review +.pair)]
        ++  review
          |=  review=^review
          ^-  json
          %-  pairs
          :~  ['time' (time:enjs:format time.review)]
              ['text' s+text.review]
              ['hash' s+`@t`(scot %uv hash.review)]
              ['is-current' b+is-current.review]
              ['is-safe' b+is-safe.review]
          ==
        --
      --
    --
  --
++  dejs-dev-action
  =,  dejs:format
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
    :~
      description+so
      keywords+(ar so)
      screenshots+(ar so)
      dst-desk+so
    ==
  --
--
