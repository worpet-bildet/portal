/-  *portal-data, *portal-action
/+  *portal, docket, treaty
|%
++  enjs
  =,  enjs:format
  |%
  :: ++  enjs-outgoing-subs
  ::   |=  =outgoing-subs
  ::   ^-  json
  ::   |^
  ::   =/  transform
  ::     |=  [ship=@p map=(map key acked=?)]
  ::     ^-  [@t json]
  ::     [(scot %p ship) (enjs-key-acked-map map)]
  ::   =/  l  (turn ~(tap by outgoing-subs) transform)
  ::   [%o `(map @t json)`(malt l)]
  ::   ++  enjs-key-acked-map
  ::     |=  mapp=(map key acked=?)
  ::     ^-  json
  ::     =/  transform
  ::       |=  [=key acked=?]
  ::       ^-  [@t json]
  ::       [(spat (key-to-path:conv key)) b+acked]
  ::     =/  l  (turn ~(tap by mapp) transform)
  ::     [%o `(map @t json)`(malt l)]
  ::   --
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
  :: ++  enjs-front-end-update
  ::   |=  =front-end-update
  ::   ^-  json
  ::   %-  pairs
  ::   :~  ['srcIsOur' b+src-is-our.front-end-update]
  ::       ['action' s+`@t`update.front-end-update]
  ::       ['keyObj' (enjs-key key.front-end-update)]
  ::       ['keyStr' (enjs-jam-key key.front-end-update)]
  ::       ['item' ?~(item.front-end-update ~ (enjs-item-or-null item.front-end-update))]
  ::       ['face' s+(crip (weld (trip update.front-end-update) (spud type.key.front-end-update)))]
  ::   ==
  ++  enjs-item-or-null
    |=  [item=?(~ item)]
    ^-  json
    ?~  item  ~
    %-  pairs
    :~  ['keyStr' (enjs-jam-key key.item)]
        ['keyObj' (enjs-key key.item)]
        ['lens' s+`@t`lens.item]
        ['bespoke' (enjs-bespoke bespoke.item)]
        ['meta' (enjs-meta meta.item)]
        ['sig' (enjs-sig sig.item)]
    ==
    ++  enjs-update
    |=  [=item]
    ^-  json
    %-  pairs
    :~  ['keyStr' (enjs-jam-key key.item)]
        ['keyObj' (enjs-key key.item)]
        ['lens' s+`@t`lens.item]
        ['bespoke' (enjs-bespoke bespoke.item)]
        ['meta' (enjs-meta meta.item)]
        ['sig' (enjs-sig sig.item)]
    ==
  ::
      :: +$  store-result
    :: $@  ?
    :: $%  [%items =items]
    ::     [%item item=?(~ item)]
    ::     [%keys =key-set]  :: TODO change to key-list
    ::     [%valid =valid]
    :: ==
    ++  enjs-store-result
    |=  [=store-result]
    ^-  json
    ?@  store-result  b+store-result
    ?+  -.store-result  !!
          %items  %+  frond  'items'  (enjs-items items.store-result)
          %item  %+  frond  'item'  (enjs-item-or-null item.store-result)
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
    :~  ['createdAt' s+created-at.meta]
        ['updatedAt' s+updated-at.meta]
        ['permissions N/A' s+'']
        ['reach N/A' s+'']
    ==
  :: ++  enjs-data
  ::   |=  [=data]
  ::   ^-  json
  ::   |^
  ::   %-  pairs
  ::   :~  ['general' (enjs-general general.data)]
  ::       ['bespoke' (enjs-bespoke bespoke.data)]
  ::   ==
  ::   ++  enjs-general
  ::     |=  [=general]
  ::     ^-  json
  ::     %-  pairs
  ::     :~  ['title' s+title.general]
  ::         ['link' s+link.general]
  ::         ['description' s+description.general]
  ::         ['tags' (enjs-cord-list tags.general)]
  ::         ::['properties' o+properties.general]
  ::         ['pictures' (enjs-cord-list pictures.general)]
  ::         ['image' s+image.general]
  ::         ['color' s+color.general]
  ::     ==
  ++  enjs-bespoke
    |=  [=bespoke]
    ^-  json
    ?-    -.bespoke
      %ship        s+''
      %group       %-  pairs
                         :~  ['title' s+title.data.bespoke]
                             ['description' s+description.data.bespoke]
                             ['image' s+image.data.bespoke]
                             ['cover' s+cover.data.bespoke]
                         ==
      %app          %-  pairs
                         :~  ['distDesk' s+dist-desk.bespoke]
                             ['signature' (enjs-sig sig.bespoke)]
                             ['treaty' (treaty:enjs:treaty treaty.bespoke)]
                         ==
      %other         %-  pairs
                         :~  ['title' s+title.bespoke]
                             ['blurb' s+blurb.bespoke]
                             ['link' s+link.bespoke]
                             ['image' s+image.bespoke]
                         ==
      %collection   %-  pairs
                         :~  ['title' s+title.bespoke]
                             ['blurb' s+blurb.bespoke]
                             ['image' s+image.bespoke]
                             ['key-list' (enjs-key-list key-list.bespoke)]
                         ==
      %feed          s+''
      %validity-store  s+''
    ==
  ::   --
  :: ++  enjs-social
  ::   |=  =social
  ::   ^-  json
  ::   |^
  ::   %-  pairs
  ::   :~  ['ratings' (enjs-rats ratings.social)]
  ::       ['comments' (enjs-coms comments.social)]
  ::       ['reviews' (enjs-revs reviews.social)]
  ::   ==
  ::   ++  enjs-rats
  ::     |=  =ratings
  ::     ^-  json
  ::     |^
  ::     =/  lis  ~(tap by ratings)
  ::     [%a (turn lis enjs-rat)]
  ::     ++  enjs-rat
  ::       |=  [usr-name=@p rating=[rating-num=@ud =updated-at =created-at]]
  ::       ^-  json
  ::       %-  pairs
  ::       :~  ['key' s+`@t`(scot %p usr-name)]
  ::           ['ship' s+`@t`(scot %p usr-name)]
  ::           ['ratingNum' (numb rating-num.rating)]
  ::           ['updatedAt' s+updated-at.rating]
  ::           ['createdAt' s+created-at.rating]
  ::       ==
  ::     --
  ::   ++  enjs-coms
  ::     |=  =comments
  ::     ^-  json
  ::     |^
  ::     =/  lis  ~(tap by comments)
  ::     [%a (turn `(list [com-key comment])`lis enjs-com)]
  ::     ++  enjs-com
  ::       |=  [=com-key =comment]
  ::       ^-  json
  ::       %-  pairs
  ::       :~  ['key' (enjs-jam-com-key com-key)]
  ::           ['keyObj' (enjs-com-key com-key)]
  ::           ['ship' s+`@t`(scot %p ship.com-key)]
  ::           ['text' s+text.comment]
  ::           ['updatedAt' s+updated-at.comment]
  ::           ['createdAt' s+created-at.com-key]
  ::       ==
  ::     ++  enjs-com-key
  ::       |=  =com-key
  ::       ^-  json
  ::       %-  pairs
  ::       :~  ['ship' s+`@t`(scot %p ship.com-key)]
  ::           ['createdAt' s+created-at.com-key]
  ::       ==
  ::     ++  enjs-jam-com-key
  ::       |=  =com-key
  ::       ^-  json
  ::       s+(crip (weld (scow %p ship.com-key) (trip created-at.com-key)))
  ::     --
  ::   ++  enjs-revs
  ::     |=  =reviews
  ::     ^-  json
  ::     |^
  ::     =/  lis  ~(tap by reviews)
  ::     [%a (turn lis enjs-rev)]
  ::     ++  enjs-rev
  ::       |=  [reviewer=@p =review]
  ::       ^-  json
  ::       %-  pairs
  ::       :~  ['key' s+`@t`(scot %p reviewer)]
  ::           ['ship' s+`@t`(scot %p reviewer)]
  ::           ['text' s+text.review]
  ::           ['hash' s+`@t`(scot %uv hash.review)]
  ::           ['isCurrent' b+is-current.review]
  ::           ['isSafe' b+is-safe.review]
  ::           ['updatedAt' s+updated-at.review]
  ::           ['createdAt' s+created-at.review]
  ::       ==
  ::     --
  ::   --
  :: ++  enjs-jammed-key-list
  ::   |=  =key-list
  ::   ^-  json
  ::   :-  %a
  ::   %+  turn  key-list
  ::   |=(=key (enjs-jam-key key))
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
  ::  TODO make sure dejs is good too
  ::  prob no problem because it takes key (not jammed-key (path))
  ++  enjs-jam-key
    |=  =key
    ^-  json
    (path:enjs:format (key-to-path:conv key))
    ::  %-  crip
    ::  ;:  weld
    ::    (spud struc.key)
    ::    "|"
    ::    (scow %p ship.key)
    ::    "|"
    ::    (trip cord.key)
    ::    "|"
    ::    (trip time.key)
    ::  ==

  ++  enjs-key
    |=  =key
    ^-  json
    %-  pairs
    :~  ['struc' s+`@t`struc.key]
        ['ship' (enjs-ship ship.key)]
        ['cord' s+cord.key]
        ['time' s+time.key]
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
  =,  format
  |%
  ++  dejs-action
    |=  jon=json
    ;;  action
    =,  dejs-soft
    =/  jn  %.  jon
            %-  of:dejs
            :~  [%create json]
                [%edit json]
                [%append (ot:dejs ~[item-key+dejs-key col-key+dejs-key])]
                [%prepend (ot:dejs ~[item-key+dejs-key col-key+dejs-key])]
                [%remove (ot:dejs ~[item-key+dejs-key col-key+dejs-key])]
                [%delete (ot:dejs ~[key+dejs-key])]
                [%sub (ot:dejs ~[key+dejs-key])]
            ==
    ?+    -.jn    jn
        %create
      =/  raw  %.  ;;((map @t json) +>:jn)
      %-  ot-raw  :~  ship+dejs-soft-ship
                      cord+so
                      time+so
                      lens+dejs-soft-path
                      bespoke+dejs-soft-bespoke
                      append-to+dejs-key-list
                  ==
      create+(pole-to-cell raw)
        %edit
      =/  raw  %.  ;;((map @t json) +>:jn)
      %-  ot-raw  :~  key+dejs-soft-key
                      lens+dejs-soft-path
                      bespoke+dejs-soft-bespoke-edit
                  ==
      =/  edit  (pole-to-cell raw)
      edit+edit(- (need -.edit))
    ==
  ::
  ++  pole-to-cell
    |*  pol=(pole *)
    ?~  pol  !!
    ?~  +.pol
      -.pol
    [-.pol (pole-to-cell +.pol)]
  ::
  ++  dejs-soft-bespoke-edit  ::use ot-raw
    |=  jon=json
    =,  dejs-soft
    =/  jn  %.  jon
            %-  of:dejs
            :~  [%'/other' json]
                [%'/app' json]
                [%'/collection' json]
            ==
    ?-    -.jn
        %'/other'
      =/  raw  %.  ;;((map @t json) +>:jn)
      %-  ot-raw  :~  title+so
                      blurb+so
                      link+so
                      image+so
                  ==
      other+(pole-to-cell raw)
        %'/collection'
      =/  raw  %.  ;;((map @t json) +>:jn)
      %-  ot-raw  :~  title+so
                      blurb+so
                      image+so
                      key-list+dejs-soft-key-list
                  ==
      other+(pole-to-cell raw)
        %'/app'  !!
    ==
  ::
  ++  dejs-soft-bespoke
    |=  jon=json
    ;;  (unit bespoke)
    =,  dejs-soft
    =/  b
    %.  jon
    %-  of
    :~  [%'/ship' so]
        [%'/collection' (ot ~[title+so blurb+so image+so key-list+dejs-soft-key-list])]
        [%'/other' (ot ~[title+so blurb+so link+so image+so])]
    ==
    (biff b |=(b=[@t *] (some b(- (stab -.b)))))
  ::
  ++  dejs-key-text
    |=  jon=json
    ^-  [key cord]
    %.  jon
    %-  ot:dejs
    :~  key+dejs-key
        text+so:dejs
    ==
  ++  dejs-key-list
    |=  jon=json
    ^-  key-list
    %.  jon
    (ar:dejs dejs-key)
  ++  dejs-soft-key-list
    |=  jon=json
    ^-  (unit key-list)
    %.  jon
    (ar:dejs-soft dejs-soft-key)
  ++  dejs-key
    |=  jon=json
    ;;  key
    %.  jon
    %-  ot:dejs
    :~  struc+dejs-path
        ship+dejs-ship
        cord+so:dejs
        time+so:dejs
    ==
  ++  dejs-soft-key
    |=  jon=json
    ;;  (unit key)
    %.  jon
    %-  ot:dejs-soft
    :~  struc+dejs-soft-path
        ship+dejs-soft-ship
        cord+so:dejs-soft
        time+so:dejs-soft
    ==
  ++  dejs-path
    |=  jon=json
    ^-  path
    (path (stab (so:dejs jon)))
  ++  dejs-soft-path
    |=  jon=json
    ^-  (unit path)
    ?~  jon  ~
    (some (path (stab (so:dejs jon))))
  ++  dejs-ship
    |=  jon=json
    ^-  @p
    ((se:dejs %p) jon)
  ++  dejs-soft-ship
    |=  jon=json
    ^-  (unit @p)
    ?~  jon  ~
    (some ((se:dejs %p) jon))
  ++  dejs-hash
    |=  jon=json
    ^-  @uv
    `@uv`(slav %uv (so:dejs jon))
  ++  dejs-key-set
    |=  jon=json
    ^-  key-set
    %-  silt
    %.  jon
    (ar:dejs dejs-key)
  --
--
