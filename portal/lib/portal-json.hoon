/-  dat=portal-data, gr=social-graph, config=portal-config, c=writ,
    d=note, h=curio, m=portal-move
/+  *portal, docket, treaty, ethereum
|%
++  enjs
  =,  enjs:format
  |%
  ++  enjs-dev-map
    |=  =dev-map:config
    ^-  json
    :-  %o
    %-  ~(run by dev-map)
    |=  ship=@p  ::  =ship is buggy for some reason
    (enjs-ship ship)
  ++  enjs-valid
    |=  =valid:dat
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
  ++  enjs-item-or-null
    |=  [item=?(~ item:dat)]
    ^-  json
    ?~  item  ~
    %-  pairs
    :~  ['keyStr' (enjs-jam-key key.item)]
        ['keyObj' (enjs-key key.item)]
        ['lens' s+`@t`lens.item]
        ['bespoke' (enjs-bespoke bespoke.item)]
        ['meta' (enjs-meta meta.item)]
    ==
  ++  enjs-update
    |=  [=item:dat]
    ^-  json
    %-  pairs
    :~  ['keyStr' (enjs-jam-key key.item)]
        ['keyObj' (enjs-key key.item)]
        ['lens' s+`@t`lens.item]
        ['bespoke' (enjs-bespoke bespoke.item)]
        ['meta' (enjs-meta meta.item)]
    ==
  ::
  ++  enjs-message
    |=  [=message:m]
    ^-  json
    ?+    -.message    s+''
        %payment-reference  
      %+  frond  'payment-reference'
      %-  pairs
        :~  ['hex' s+hex.message]
            ['eth-price' s+eth-price.message]
            ['receiving-address' s+receiving-address.message]
        ==
        %payment-confirmed
      %+  frond  'payment-confirmed'
      %-  pairs
        :~  ['tx-hash' s+tx-hash.message]
            ['desk' s+desk.message]
        ==
        %tip-reference  
      %+  frond  'tip-reference'
      %-  pairs
        :~  ['hex' s+hex.message]
            ['receiving-address' s+receiving-address.message]
        ==
        %tip-confirmed
      %+  frond  'tip-confirmed'
      %-  pairs
        :~  ['tx-hash' s+tx-hash.message]
            ['key' (enjs-key key.message)]
        ==

    ==
  ++  enjs-hex
    |=  hex=@ux
    ^-  json
    s+(crip (num-to-hex:ethereum hex))
  ++  enjs-manager-result
    |=  [=manager-result:config]
    ^-  json
    ?@  manager-result  b+manager-result
    ?-  -.manager-result
      %portal-devs  %+  frond  'portal-devs'  (enjs-dev-map +.manager-result)
      %bought-apps  %+  frond  'bought-apps'  (enjs-bought-apps +.manager-result)
      %authorized-ships  %+  frond  'authorized-ships'  (enjs-authorized-ships +.manager-result)
      %processing-payments  (enjs-processing-payments +.manager-result)
      %processed-payments  (enjs-processed-payments +.manager-result)
      %rpc-endpoint  s++.manager-result
      %receiving-address  s++.manager-result
    ==
  ::
  ++  enjs-processing-payments
    |=  [=processing-payments:config]
    ^-  json
    :-  %o
    =+  ~(tap by processing-payments)
    %-  malt  %+  turn  -
    |=  [hex=@t [=buyer:config =key:dat receiving-address=@t]]
    ^-  [@t json]
    :-  hex
    %-  pairs
    :~  ['buyer' (enjs-ship buyer)]
        ['desk' (enjs-key key)]
        ['receiving-address' s+receiving-address]
    ==
  ::
  ++  enjs-processed-payments
    |=  [=processed-payments:config]
    ^-  json
    :-  %a
    %+  turn  processed-payments
    |=  [=buyer:config =key:dat tx-hash=@t time=@da note=@t]
    ^-  json
    %-  pairs
    :~  ['buyer' `json`(enjs-ship buyer)]
        ['desk' `json`(enjs-key key)]
        ['tx-hash' s+tx-hash]
        ['time' `json`(^time time)]
        ['note' s+note]
    ==
  ::
  ++  enjs-authorized-ships
    |=  [ships=(set @p)]
    ^-  json
    :-  %a
    %+  turn  ~(tap in ships)
    enjs-ship
  ++  enjs-bought-apps
    |=  [bought-apps=(map [ship=@p desk=@tas] @t)]
    ^-  json
    :-  %o
    =+  ~(tap by bought-apps)
    %-  malt  %+  turn  -
    |=  [k=[ship=@p desk=@tas] v=@t]
    ^-  [@t json]
    [(flag-to-string k) s+v]
  ++  flag-to-string  ::  [~zod %app] -> '~zod/app'
    |=  [ship=@p desk=@tas]
    ^-  @t
    %-  crip
    ;:  welp
        (scow %p ship)
        "/"
        (trip desk)
    ==
  ++  enjs-store-result
    |=  [=store-result:dat]
    ^-  json
    ?@  store-result  b+store-result
    ?+  -.store-result  s+''
          %items  %+  frond  'items'  (enjs-items items.store-result)
          %item  %+  frond  'item'  (enjs-item-or-null item.store-result)
    ==
  ++  enjs-graph-result
    |=  [=graph-result:gr]
    ^-  json
    ?@  graph-result  b+graph-result
    ?+  -.graph-result  !!
      %nodes  %+  frond  'nodes'
                :-  %a
                %+  turn  ~(tap in +.graph-result)
                enjs-node-to-key
      %app    %+  frond  'app'
                (enjs-map-tag-nodeset +.graph-result)
    ==
  ++  enjs-map-tag-nodeset
    |=  [m=(map tag=^path nodeset=(map node:gr (set node:gr)))]
    ^-  json
    :-  %o
    =+  ~(tap by m)
    %-  malt  %+  turn  -
    |=  [tag=^path nodeset=(map node:gr (set node:gr))]
    ^-  [@t json]
    [(spat tag) (enjs-nodeset nodeset)]
  ++  enjs-nodeset
    |=  [nodeset=(map node:gr (set node:gr))]
    ^-  json
    :-  %o
    =+  ~(tap by nodeset)
    %-  malt  %+  turn  -
    |=  [=node:gr nodes=(set node:gr)]
    ^-  [@t json]
    [(enjs-node-to-str node) (enjs-nodes nodes)]
  ++  enjs-nodes
    |=  [nodes=(set node:gr)]
    ^-  json
    :-  %a
    %+  turn  ~(tap in nodes)  enjs-node-to-key
  ++  enjs-node-to-key
    |=  [=node:gr]
    ^-  json
    %-  enjs-key
    (node-to-key:conv node)
  ++  enjs-node-to-str
    |=  [=node:gr]
    ^-  @t
    %-  spat
    %-  key-to-path:conv
    (node-to-key:conv node)
  ::
  ++  enjs-key-and-item
    |=  [=key:dat =item:dat]
    ^-  json
    (enjs-item-or-null item)
  ++  enjs-items
    |=  =items:dat
    ^-  json
    =/  lis  ~(tap by items)
    [%a (turn lis enjs-key-and-item)]
  ++  enjs-meta
    |=  [=meta:dat]
    ^-  json
    %-  pairs
    :~  ['createdAt' s+created-at.meta]
        ['updatedAt' s+updated-at.meta]
        ['permissions N/A' s+'']
        ['reach' (enjs-reach reach.meta)]
    ==
  ++  enjs-reach
    |=  [=reach:dat]
    ^-  json
    ?-    -.reach
      %private  (frond ['whitelist' a+(turn whitelist.reach enjs-ship)])
      %public  (frond ['blacklist' a+(turn blacklist.reach enjs-ship)])
    ==
  ++  enjs-bespoke
    |=  [=bespoke:dat]
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
                         :~  ['screenshots' (enjs-list screenshots.bespoke |=(s=* s+s))]
                             ['blurb' s+blurb.bespoke]
                             ['distDesk' s+dist-desk.bespoke]
                             ['signature' (enjs-sig sig.bespoke)]
                             ['treaty' (treaty:enjs:treaty treaty.bespoke)]
                             ['eth-price' s+eth-price.bespoke]
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
      %retweet      %-  pairs
                        :~  ['blurb' s+blurb.bespoke]
                            ['ref' (enjs-key ref.bespoke)]
                        ==
      %review       %-  pairs
                        :~  ['blurb' s+blurb.bespoke]
                            ['rating' n+(scot %ud rating.bespoke)]
                        ==
      %feed         %-  frond
                        ['feed' (enjs-feed feed.bespoke)]
      %blog         %-  pairs
                         :~  ['title' s+title.bespoke]
                             ['blurb' s+blurb.bespoke]
                             ['uri' s+uri.bespoke]
                             ['path' s+path.bespoke]
                             ['image' s+image.bespoke]
                         ==
      %tip          %-  pairs
                    :~  ['tipper' (enjs-ship tipper.bespoke)]
                        ['beneficiary' (enjs-ship beneficiary.bespoke)]
                        ['eth-amount' s+eth-amount.bespoke]
                        ['time' s+time.bespoke]
                        ['note' s+note.bespoke]
                        ['tx-hash' s+tx-hash.bespoke]
                    ==
      %groups-chat-msg   %-  pairs
                         :~  ['group' s+(flag:enjs-writ group.bespoke)]
                             ['channel' s+(flag:enjs-writ channel.bespoke)]
                             ['id' (id:enjs-writ id.bespoke)]
                             ['content' (content:enjs-writ content.bespoke)]
                             ['feels' n+(scot %ud feels.bespoke)]
                             ['replies' n+(scot %ud replies.bespoke)]
                         ==
      %groups-diary-note
                          %-  pairs
                          :~  ['group' s+(flag:enjs-note group.bespoke)]
                              ['channel' s+(flag:enjs-note channel.bespoke)]
                              ['time' s+(scot %ud time.bespoke)]
                              ['essay' (essay:enjs-note essay.bespoke)]
                              ['feels' n+(scot %ud feels.bespoke)]
                              ['replies' n+(scot %ud replies.bespoke)]
                          ==
      %groups-heap-curio
                          %-  pairs
                          :~  ['group' s+(flag:enjs-curio group.bespoke)]
                              ['channel' s+(flag:enjs-curio channel.bespoke)]
                              ['time' s+(scot %ud time.bespoke)]
                              ['heart' (heart:enjs-curio heart.bespoke)]
                              ['feels' n+(scot %ud feels.bespoke)]
                              ['replies' n+(scot %ud replies.bespoke)]
                          ==
      %validity-store  s+''
    ==
  :: ++  enjs-jammed-key-list
  ::   |=  =key-list:dat
  ::   ^-  json
  ::   :-  %a
  ::   %+  turn  key-list
  ::   |=(=key:dat (enjs-jam-key key))
  ++  enjs-feed
    |=  =feed:dat
    ^-  json
    :-  %a
    %+  turn  feed
    |=  [time=cord =^ship =key:dat]
    %-  pairs
    :~  ['time' s+time]
        ['ship' (enjs-ship ship)]
        ['key' (enjs-key key)]
    ==
  ++  enjs-list
    |=  [list=(list *) enjs-func=gate]
    ;;  json
    a+(turn list enjs-func)
  ++  enjs-key-list
    |=  =key-list:dat
    ^-  json
    :-  %a
    %+  turn  key-list
    |=(=key:dat (enjs-key key))
  ++  enjs-sig
    |=  =signature:dat
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
    |=  =key:dat
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
    |=  =key:dat
    ^-  json
    %-  pairs
    :~  ['struc' s+`@t`struc.key]
        ['ship' (enjs-ship ship.key)]
        ['cord' s+cord.key]
        ['time' s+time.key]
    ==
    ::
  ++  enjs-key-set
    |=  =key-set:dat
    ^-  json
    =/  key-list  ~(tap in key-set)
    [%a (turn key-list |=(=key:dat (enjs-key)))]
  ::
  ++  enjs-ship
    |=  ship=@p
    ^-  json
    s+`@t`(scot %p ship)
  ::
++  enjs-curio
  =,  enjs:format
  |%
  ++  curio
    |=  =curio:h
    %-  pairs
    :~  seal+(seal -.curio)
        heart+(heart +.curio)
    ==
  ++  seal
    |=  =seal:h
    %-  pairs
    :~  time+(time time.seal)
    ::
        :-  %feels
        %-  pairs
        %+  turn  ~(tap by feels.seal)
        |=  [her=@p =feel:h]
        [(scot %p her) s+feel]
    ::
        :-  %replied
        :-  %a
        (turn ~(tap in replied.seal) (cork (cury scot %ud) (lead %s)))
    ==
  ++  heart
    |=  =heart:h
    %-  pairs
    :~  title+?~(title.heart ~ s+u.title.heart)
        content+(content content.heart)
        author+(ship author.heart)
        sent+(time sent.heart)
        replying+?~(replying.heart ~ s/(scot %ud u.replying.heart))
    ==
  ++  content
    |=  =content:h
    %-  pairs
    :~  block+a+(turn p.content block)
        inline+a+(turn q.content inline)
    ==
  ++  block
    |=  b=block:h
    ^-  json
    %+  frond  -.b
    ?-  -.b
        %cite  (cite cite.b)
        %image
      %-  pairs
      :~  src+s+src.b
          height+(numb height.b)
          width+(numb width.b)
          alt+s+alt.b
      ==
    ==
  ++  inline
    |=  i=inline:h
    ^-  json
    ?@  i  s+i
    %+  frond  -.i
    ?-  -.i
        %break
      ~
    ::
        ?(%code %tag %inline-code)
      s+p.i
    ::
        %ship  s/(scot %p p.i)
    ::
        %block  ~
    ::
        ?(%italics %bold %strike %blockquote)
      :-  %a
      (turn p.i inline)
    ::
        %link
      %-  pairs
      :~  href+s+p.i
          content+s+q.i
      ==
    ==
  ::
  ++  cite
    |=  =cite:h
    %+  frond  -.cite
    ?-    -.cite
        %group  s+(flag flag.cite)
    ::
        %desk
      %-  pairs
      :~  ['flag' s+(flag flag.cite)]
          ['where' s+(spat wer.cite)]
      ==
    ::
        %chan
      %-  pairs
      :~  nest/s/(nest nest.cite)
          where/s/(spat wer.cite)
      ==
    ::
        %bait
      %-  pairs
      :~  group/s/(flag grp.cite)
          graph/s/(flag gra.cite)
          where/s/(spat wer.cite)
      ==
    ==
  ++  flag
    |=  f=flag:h
    (rap 3 (scot %p p.f) '/' q.f ~)
  ++  nest
    |=  n=nest:h
    (rap 3 p.n '/' (flag q.n) ~)

  --
++  enjs-note
  =,  enjs:format
  |%
  ++  essay
    |=  =essay:d
    %-  pairs
    :~  title/s/title.essay
        image/s/image.essay
        content/a/(turn content.essay verse)
        author+(ship author.essay)
        sent+(time sent.essay)
    ==
  ::
  ++  verse
    |=  =verse:d
    ^-  json
    %+  frond  -.verse
    ?-  -.verse
        %block  (block p.verse)
        %inline  a+(turn p.verse inline)
    ==
  ++  block
    |=  b=block:d
    ^-  json
    %+  frond  -.b
    ?-  -.b
        %rule  ~
        %cite  (cite cite.b)
        %listing  (listing p.b)
        %header
      %-  pairs
      :~  tag+s+p.b
          content+a+(turn q.b inline)
      ==
        %image
      %-  pairs
      :~  src+s+src.b
          height+(numb height.b)
          width+(numb width.b)
          alt+s+alt.b
      ==
        %code
      %-  pairs
      :~  code+s+code.b
          lang+s+lang.b
      ==
    ==
  ::
  ++  listing
    |=  l=listing:d
    ^-  json
    %+  frond  -.l
    ?-  -.l
        %item  a+(turn p.l inline)
        %list
      %-  pairs
      :~  type+s+p.l
          items+a+(turn q.l listing)
          contents+a+(turn r.l inline)
      ==
    ==
  ::
  ++  inline
    |=  i=inline:d
    ^-  json
    ?@  i  s+i
    %+  frond  -.i
    ?-  -.i
        %break
      ~
    ::
        %ship  s/(scot %p p.i)
    ::
        ?(%code %tag %inline-code)
      s+p.i
    ::
        ?(%italics %bold %strike %blockquote)
      :-  %a
      (turn p.i inline)
    ::
        %block
      %-  pairs
      :~  index+(numb p.i)
          text+s+q.i
      ==
    ::
        %link
      %-  pairs
      :~  href+s+p.i
          content+s+q.i
      ==
    ==
  ::
  ++  cite
    |=  =cite:c
    %+  frond  -.cite
    ?-    -.cite
        %group  s+(flag flag.cite)
    ::
        %desk
      %-  pairs
      :~  ['flag' s+(flag flag.cite)]
          ['where' s+(spat wer.cite)]
      ==
    ::
        %chan
      %-  pairs
      :~  nest/s/(nest nest.cite)
          where/s/(spat wer.cite)
      ==
    ::
        %bait
      %-  pairs
      :~  group/s/(flag grp.cite)
          graph/s/(flag gra.cite)
          where/s/(spat wer.cite)
      ==
    ==
  ++  nest
    |=  n=nest:c
    (rap 3 p.n '/' (flag q.n) ~)

  ++  flag
    |=  f=flag:c
    (rap 3 (scot %p p.f) '/' q.f ~)
  --
++  enjs-writ
  =,  enjs:format
  |%
  ++  id 
    |=  =id:c
    n+(rap 3 '"' (scot %p p.id) '/' (scot %ud q.id) '"' ~)

  ++  writ
    |=  =writ:c
    %-  pairs
    :~  seal+(seal -.writ)
        memo+(memo +.writ)
    ==
  ++  seal
    |=  =seal:c
    %-  pairs
    :~  id+(id id.seal)
    ::
        :-  %feels
        %-  pairs
        %+  turn  ~(tap by feels.seal)
        |=  [her=@p =feel:c]
        [(scot %p her) s+feel]
    ::
        :-  %replied
        :-  %a
        (turn ~(tap in replied.seal) |=(i=id:c (id i)))
    ==
  ++  memo 
    |=  =memo:c
    %-  pairs
    :~  replying+?~(replying.memo ~ (id u.replying.memo))
        author+(ship author.memo)
        sent+(time sent.memo)
        content+(content content.memo)
    ==


  ++  notice
    |=  n=notice:c
    %-  pairs
    :~  pfix/s/pfix.n
        sfix/s/sfix.n
    ==
  ::
  ++  content
    |=  c=content:c
    %+  frond  -.c
    ?-  -.c
      %story   (story p.c)
      %notice  (notice p.c)
    ==
  ::
  ++  story
    |=  s=story:c
    ^-  json
    %-  pairs
    :~  :-  %block  a+(turn p.s block)
        :-  %inline  a+(turn q.s inline)
    ==
  ::
  ++  inline
    |=  i=inline:c
    ^-  json
    ?@  i  s+i
    %+  frond  -.i
    ?-  -.i
        %break
      ~
    ::
        %ship  s/(scot %p p.i)
    ::
        ?(%code %tag %inline-code)
      s+p.i
    ::
        ?(%italics %bold %strike %blockquote)
      :-  %a
      (turn p.i inline)
    ::
        %block
      %-  pairs
      :~  index+(numb p.i)
          text+s+q.i
      ==
    ::
        %link
      %-  pairs
      :~  href+s+p.i
          content+s+q.i
      ==
    ==
  ::
    ++  block
    |=  b=block:c
    ^-  json
    %+  frond  -.b
    ?-  -.b
        %cite  (cite cite.b)
        %image
      %-  pairs
      :~  src+s+src.b
          height+(numb height.b)
          width+(numb width.b)
          alt+s+alt.b
      ==
      
    ==
  ::
  ++  cite
    |=  =cite:c
    %+  frond  -.cite
    ?-    -.cite
        %group  s+(flag flag.cite)
    ::
        %desk
      %-  pairs
      :~  ['flag' s+(flag flag.cite)]
          ['where' s+(spat wer.cite)]
      ==
    ::
        %chan
      %-  pairs
      :~  nest/s/(nest nest.cite)
          where/s/(spat wer.cite)
      ==
    ::
        %bait
      %-  pairs
      :~  group/s/(flag grp.cite)
          graph/s/(flag gra.cite)
          where/s/(spat wer.cite)
      ==
    ==
  ++  nest
    |=  n=nest:c
    (rap 3 p.n '/' (flag q.n) ~)

  ++  flag
    |=  f=flag:c
    (rap 3 (scot %p p.f) '/' q.f ~)
  --
--
::
::
++  dejs
  =,  format
  |%
  ++  dejs-hex
    |=  jon=json
    ;;  @ux
    ?>  ?=([%s *] jon)
    (hex-to-num:ethereum +.jon)

  ++  dejs-social-graph-track
    |=  jon=json
    ;;  track:gr
    =,  dejs
    :-  %portal-store
    %.  jon
    %-  of
    :~  [%start (ot:dejs ~[source+dejs-ship tag+dejs-path])]
        [%stop (ot:dejs ~[source+dejs-ship tag+dejs-path])]
    ==
  ++  dejs-action
    |=  jon=json
    ;;  action:m
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
                [%sub-to-many (ot:dejs ~[key-list+dejs-key-list])]
                [%prepend-to-feed (ot:dejs ~[key+dejs-key feed+dejs-feed])]
                [%add-tag-request (ot:dejs ~[our+dejs-key their+dejs-key tag-to+dejs-path tag-from+dejs-path])]
                [%blog-sub ul:dejs]
                [%aggregate-chats ul:dejs]
                [%payment-request (ot:dejs ~[seller+dejs-ship desk+so:dejs])]
                [%payment-tx-hash (ot:dejs ~[seller+dejs-ship tx-hash+so:dejs])]
                [%tip-request (ot:dejs ~[key+dejs-key])]
                [%tip-tx-hash (ot:dejs ~[beneficiary+dejs-ship tx-hash+so:dejs note+so:dejs])]
                [%set-rpc-endpoint (ot:dejs ~[rpc-endpoint+so:dejs])]
                [%set-receiving-address (ot:dejs ~[receiving-address+so:dejs])]
            ==
    ?+    -.jn    jn
        %create
      =/  raw  %.  ;;((map @t json) +>:jn)
      %-  ot-raw  :~  ship+dejs-soft-ship
                      cord+so
                      time+so
                      lens+so
                      reach+dejs-soft-reach
                      bespoke+dejs-soft-bespoke-create
                      append-to+dejs-key-list
                      prepend-to-feed+dejs-key-list
                      tags-to+dejs-tagging-list
                  ==
      create+(pole-to-cell raw)
        %edit
      =/  raw  %.  ;;((map @t json) +>:jn)
      %-  ot-raw  :~  key+dejs-soft-key
                      lens+so
                      reach+dejs-soft-reach
                      bespoke+dejs-soft-bespoke-edit
                  ==
      =/  edit  (pole-to-cell raw)
      edit+edit(- (need -.edit))
    ==
  ::
  ++  dejs-tagging-list
    |=  jon=json
    ^-  (list [=key:dat tag-to=path tag-from=path])
    %.  jon
    (ar:dejs dejs-key-tag-tag)
  ++  dejs-key-tag-tag
    |=  jon=json
    ^-  [=key:dat tag-to=path tag-from=path]
    %.  jon
    %-  ot:dejs
    :~  key+dejs-key
        tag-to+dejs-path
        tag-from+dejs-path
    ==

  ++  pole-to-cell
    |*  pol=(pole *)
    ?~  pol  !!
    ?~  +.pol
      -.pol
    [-.pol (pole-to-cell +.pol)]
  ::
  ::  optional args in create
  ::  only work in conversions
  ++  dejs-soft-bespoke-create
    |=  jon=json
    ;;  (unit bespoke:dat)
    =,  dejs-soft
    =/  jn  %.  jon
        %-  of:dejs
        :~  [%other json]
            [%app json]
            [%collection json]
            [%retweet json]
            [%review json]
            [%blog json]
            [%groups-chat-msg json]
            [%groups-diary-note json]
            [%groups-heap-curio json]
        ==
    ?-    -.jn
        %other
      =/  raw  %.  ;;((map @t json) +>:jn)
      %-  ot-raw  :~  title+so
                      blurb+so
                      link+so
                      image+so
                  ==
      (some other+(pole-to-cell (turn raw |=(a=(unit) (fall a ~)))))
        %collection
      =/  raw  %.  ;;((map @t json) +>:jn)
      %-  ot-raw  :~  title+so
                      blurb+so
                      image+so
                      key-list+dejs-soft-key-list
                  ==
      =+  (turn `(list (unit))`raw |=(a=(unit *) (fall a ~)))
      (some collection+(pole-to-cell -))
        %retweet
      =/  raw  %.  ;;((map @t json) +>:jn)
      %-  ot-raw  :~  blurb+so
                      ref+dejs-soft-key
                  ==
      =+  (turn `(list (unit))`raw |=(a=(unit *) (fall a ~)))
      (some retweet+(pole-to-cell -))
        %app
      =/  raw  %.  ;;((map @t json) +>:jn)
      %-  ot-raw  :~  screenshots+dejs-soft-s-list
                      blurb+so
                      dist-desk+so
                      sig+so     :: should not be editable
                      treaty+so  :: should not be editable
                  ==
      =+  (turn `(list (unit))`raw |=(a=(unit *) (fall a ~)))
      (some app+(pole-to-cell -))
        %review
      =/  raw  %.  ;;((map @t json) +>:jn)
      %-  ot-raw  :~  blurb+so
                      rating+ni
                  ==
      =+  (turn `(list (unit))`raw |=(a=(unit *) (fall a ~)))
      (some review+(pole-to-cell -))
        %blog
      =/  raw  %.  ;;((map @t json) +>:jn)
      %-  ot-raw  :~  title+so
                      blurb+so
                      uri+so
                      path+so
                      image+so
                  ==
      =+  (turn `(list (unit))`raw |=(a=(unit *) (fall a ~)))
      (some blog+(pole-to-cell -))
        %groups-chat-msg
      =/  raw  %.  ;;((map @t json) +>:jn)
      %-  ot-raw  :~  group+dejs-soft-null-flag
                      channel+dejs-soft-flag:dejs-writ
                      id+dejs-soft-id:dejs-writ
                      content+dejs-soft-null-content
                      feels+dejs-soft-null-num
                      replies+dejs-soft-null-num
                  ==
      =+  (turn `(list (unit))`raw |=(a=(unit *) (fall a ~)))
      ;;  (unit bespoke:dat)
      (some groups-chat-msg+(pole-to-cell -))
        %groups-diary-note
      =/  raw  %.  ;;((map @t json) +>:jn)
      %-  ot-raw  :~  group+dejs-soft-null-flag
                      channel+dejs-soft-flag:dejs-writ
                      time+dejs-soft-time:dejs-writ
                      essay+dejs-soft-null-essay
                      feels+dejs-soft-null-num
                      replies+dejs-soft-null-num
                  ==
      =+  (turn `(list (unit))`raw |=(a=(unit *) (fall a ~)))
      ;;  (unit bespoke:dat)
      (some groups-diary-note+(pole-to-cell -))
        %groups-heap-curio
      =/  raw  %.  ;;((map @t json) +>:jn)
      %-  ot-raw  :~  group+dejs-soft-null-flag
                      channel+dejs-soft-flag:dejs-writ
                      time+dejs-soft-time:dejs-writ
                      heart+dejs-soft-null-heart
                      feels+dejs-soft-null-num
                      replies+dejs-soft-null-num
                  ==
      =+  (turn `(list (unit))`raw |=(a=(unit *) (fall a ~)))
      ;;  (unit bespoke:dat)
      (some groups-heap-curio+(pole-to-cell -))
    ==
  ::
  ++  dejs-soft-bespoke-edit  ::use ot-raw
    |=  jon=json
    =,  dejs-soft
    =/  jn  %.  jon
            %-  of:dejs
            :~  [%other json]
                [%app json]
                [%collection json]
                [%retweet json]
                [%review json]
                [%blog json]
            ==
    ?-    -.jn
        %other
      =/  raw  %.  ;;((map @t json) +>:jn)
      %-  ot-raw  :~  title+so
                      blurb+so
                      link+so
                      image+so
                  ==
      (some other+(pole-to-cell raw))
        %collection
      =/  raw  %.  ;;((map @t json) +>:jn)
      %-  ot-raw  :~  title+so
                      blurb+so
                      image+so
                      key-list+dejs-soft-key-list
                  ==
      (some collection+(pole-to-cell raw))
        %retweet
      =/  raw  %.  ;;((map @t json) +>:jn)
      %-  ot-raw  :~  blurb+so
                      ref+dejs-soft-key
                  ==
      (some retweet+(pole-to-cell raw))
        %app
      =/  raw  %.  ;;((map @t json) +>:jn)
      %-  ot-raw  :~  screenshots+dejs-soft-s-list
                      blurb+so
                      dist-desk+so
                      sig+so     :: should not be editable
                      treaty+so  :: should not be editable
                  ==
      (some app+(pole-to-cell raw))
        %review
      =/  raw  %.  ;;((map @t json) +>:jn)
      %-  ot-raw  :~  blurb+so
                      rating+ni
                  ==
      (some review+(pole-to-cell raw))
        %blog
      =/  raw  %.  ;;((map @t json) +>:jn)
      %-  ot-raw  :~  title+so
                      blurb+so
                      uri+so
                      path+so
                      image+so
                  ==
      (some blog+(pole-to-cell raw))
    ==
  ::
  ++  dejs-key-text
    |=  jon=json
    ^-  [key:dat cord]
    %.  jon
    %-  ot:dejs
    :~  key+dejs-key
        text+so:dejs
    ==
  ++  dejs-feed
    |=  jon=json
    ^-  feed:dat
    %.  jon
    %-  ar:dejs
    %-  ot:dejs
    :~  time+so:dejs
        ship+dejs-ship
        key+dejs-key
    ==
  ::
  ++  dejs-soft-null-flag
    |=  jon=json
    ^-  (unit flag:c)
    `[~zod '']
  ++  dejs-soft-null-content
    |=  jon=json
    ^-  (unit content:c)
    `[%notice ['' '']]
  ++  dejs-soft-null-essay
    |=  jon=json
    ^-  (unit essay:d)
    `*essay:d
  ++  dejs-soft-null-heart
    |=  jon=json
    ^-  (unit heart:h)
    `*heart:h
  ++  dejs-soft-null-num
    |=  jon=json
    ^-  (unit @ud)
    ~
  ++  dejs-soft-s-list
    |=  jon=json
    ^-  (unit (list @t))
    %.  jon
    (ar:dejs-soft so:dejs-soft)

  ++  dejs-s-list
    |=  jon=json
    ^-  (list @t)
    %.  jon
    (ar:dejs so:dejs)
  ++  dejs-key-list
    |=  jon=json
    ^-  key-list:dat
    %.  jon
    (ar:dejs dejs-key)
  ++  dejs-soft-key-list
    |=  jon=json
    ^-  (unit key-list:dat)
    %.  jon
    (ar:dejs-soft dejs-soft-key)
  ++  dejs-soft-reach
    |=  jon=json
    ;;  (unit reach:dat)
    %.  jon
    %-  of:dejs-soft
    :~  [%private (ot:dejs-soft ~[whitelist+(ar:dejs-soft dejs-soft-ship)])]
        [%public (ot:dejs-soft ~[blacklist+(ar:dejs-soft dejs-soft-ship)])]
    ==
  ++  dejs-key
    |=  jon=json
    ;;  key:dat
    %.  jon
    %-  ot:dejs
    :~  struc+so:dejs
        ship+dejs-ship
        cord+so:dejs
        time+so:dejs
    ==
  ++  dejs-soft-key
    |=  jon=json
    ;;  (unit key:dat)
    %.  jon
    %-  ot:dejs-soft
    :~  struc+so:dejs-soft
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
    ^-  key-set:dat
    %-  silt
    %.  jon
    (ar:dejs dejs-key)
  
  ++  dejs-writ
    =,  dejs-soft
    |%
    ++  dejs-soft-flag
      |=  jon=json
      ;;  (unit flag:c)
      ?~  jon  ~
      %.  jon
      %-  ot
      :~  p+dejs-soft-ship
          q+so
      ==
    ++  dejs-soft-time
      |=  jon=json
      ;;  (unit time)
      ?~  jon  ~
      (slaw %ud ;;(@t +:jon))
    ++  dejs-soft-id
      |=  jon=json
      ;;  (unit id:c)
      ?~  jon  ~
      %.  jon
      %-  ot
      :~  p+dejs-soft-ship
          q+dejs-soft-time
      ==
    --
  --
--
