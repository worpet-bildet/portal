/-  *portal-data, *portal-action, *portal-message, portal-config,
    groups, treaty, portal-devs, blog-paths
/+  default-agent, dbug, *portal, io=agentio, *sig, *sss, sss-25
|%
+$  versioned-state
  $%  state-0:portal-config
      state-1:portal-config
      state-2:portal-config
      state-3:portal-config
      state-4:portal-config
      state-5
      state-6
  ==
+$  state-6
  $:  %6
      sub-blog-paths=_(mk-subs:sss-25 blog-paths ,[%paths ~])
      sub-portal-devs=_(mk-subs portal-devs ,[%portal-devs ~])
      =dev-map:portal-config
      =portal-curator:portal-config
      =portal-indexer:portal-config
      =purge-timer:portal-config
      =purge-time:portal-config
      =indexed-as-curator:portal-config
      =onboarded:portal-config
      =our-apps:portal-config
  ==
+$  state-5
  $:  %5
      sub-portal-devs=_(mk-subs portal-devs ,[%portal-devs ~])
      =dev-map:portal-config
      =portal-curator:portal-config
      =portal-indexer:portal-config
      =purge-timer:portal-config
      =purge-time:portal-config
      =indexed-as-curator:portal-config
      =onboarded:portal-config
      =our-apps:portal-config
  ==
+$  card  card:agent:gall
--
%-  agent:dbug
=|  state-6
=*  state  -
^-  agent:gall
=<
|_  =bowl:gall
::  can I do all of this +* in the helper core?
+*  this        .
    default     ~(. (default-agent this %|) bowl)
    helper      ~(. +> bowl)
    da-blog-paths   =/  da  (da:sss-25 blog-paths ,[%paths ~])
      (da sub-blog-paths bowl -:!>(*result:da) -:!>(*from:da) -:!>(*fail:da))
    da-portal-devs  =/  da  (da portal-devs ,[%portal-devs ~])
      (da sub-portal-devs bowl -:!>(*result:da) -:!>(*from:da) -:!>(*fail:da))
++  on-init
  =.  state  *state-6
  =^  cards  state  init-sequence:helper
  [cards this]
::
++  on-save  !>(state)
++  on-load
  |=  =vase
  ^-  (quip card _this)
  =/  old  !<(versioned-state vase)
  =.  state
    ?-  -.old
      ?(%0 %1 [%2 *] %3)  [%6 (mk-subs blog-paths ,[%paths ~]) (mk-subs portal-devs ,[%portal-devs ~]) ~ +:*state-4:portal-config]
      %4                  [%6 (mk-subs blog-paths ,[%paths ~]) (mk-subs portal-devs ,[%portal-devs ~]) ~ +.old]  ::  TODO test
      %5                  [%6 (mk-subs blog-paths ,[%paths ~]) +.old]
      %6                  old
    ==
  =^  cards  state  init-sequence:helper
  [cards this]
::
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?+    mark    (on-poke:default mark vase)
      %portal-action
    ?>  =(our.bowl src.bowl)
    =/  act  !<(action vase)
    ?+    -.act
      ::  default:  forward to %portal-store
      :_  this  [(~(act cards [our.bowl %portal-store]) act)]~
      ::
        %manager-init
      =.  our-apps.state  ;;  our-apps:portal-config
        %-  tail
        .^  update:alliance:treaty  %gx
            /(scot %p our.bowl)/treaty/(scot %da now.bowl)/alliance/noun
        ==
      =/  cards
        =+  ~(tap in our-apps.state)
        %+  turn  -
        |=  [=ship =desk]
        :*  %pass  /our-treaty/(scot %p ship)/[desk]  %agent
            [our.bowl %treaty]  %watch  /treaty/(scot %p ship)/[desk]
        ==
      [cards this]
      ::
        %sub-to-many
      `this
      :: ~&  >  "new feat: sub to many"
      :: ::  %def sent to portal-store
      :: ::  %temp cycled thru single subs
      :: =/  keys=[temp=key-list def=key-list]  (skid-temp:keys key-list.act) 
      :: =^  cards  state
      ::   %-  tail  %^  spin  temp.keys  [*(list card) state]
      ::   |=  [=key q=[cards=(list card) state=state-6]]
      ::   :-  key
      ::   =.  state  state.q
      ::   =^  cards  state.q  (sub:helper [%sub key])
      ::   :_  state.q  (welp cards cards.q)
      :: :_  this
      :: %+  snoc  cards
      :: (~(act ^cards [our.bowl %portal-store]) [%sub-to-many def.keys])
      ::
        %sub
      ~&  >  "new feat: new sub implementation"
      =^  cards  state  (sub:helper [%sub key.act])
      [cards this]
      ::
        %blog-sub  
      =^  cards  sub-blog-paths  (surf:da-blog-paths our.bowl %blog [%paths ~])
      [cards this]
      
        %onboarded
      `this(onboarded toggle.act)
      ::
        %index-as-curator
      =/  msg  [%index-as-curator src.bowl toggle.act]
      :_  this(indexed-as-curator toggle.act)
      [(~(msg cards [portal-indexer.state %portal-manager]) msg)]~
    ==
    ::
      %portal-message
    ::  src.bowl src.msg problem kad store misli da je src our
    ::  a ne vanjski jer dolazi od portal-managera
    =/  msg  !<(message vase)
    ?+    -.msg    ~|("unexpected message: {<msg>}" !!)
        %sign-app
      ?>  (validate-sig dist-desk.msg our.bowl our.bowl now.bowl sig.msg)
      ~&  >  "%portal: sig is valid!"
      =/  dist-desk  (parse-dist-desk:misc dist-desk.msg)
      ?~  dist-desk  
        ~|("app dist-desk incorrect when receiving sig: {<dist-desk.msg>}" !!)
      ::  making sure published-apps collection exists
      =/  create-my-apps
      ?:  %-  ~(item-exists scry our.bowl now.bowl)
              [%collection our.bowl '' 'published-apps']
          ~
        :~
          %-  ~(act cards [our.bowl %portal-store])
            :*  %create  ~  ~  `'published-apps'  `%def
                `[%collection 'My Apps' 'Collection of all apps I have published.' '' ~]
                [%collection our.bowl '' '~2000.1.1']~  ~  ~  ==
        ==
      =/  create-app
        %-  ~(act cards [our.bowl %portal-store])
        ?:  %-  ~(item-exists scry our.bowl now.bowl)
            [%app our.bowl '' desk-name.u.dist-desk]
          :^    %replace
              [%app our.bowl '' desk-name.u.dist-desk]
            %def
          [%app ~ '' dist-desk.msg sig.msg treaty.msg]
        :*  %create  ~  ~  `desk-name.u.dist-desk  `%def
          `[%app ~ '' dist-desk.msg sig.msg treaty.msg]
          ~[[%collection our.bowl '' 'published-apps']]  ~  ~  ==
      :_  this
      (snoc create-my-apps create-app)
      ::
      ::
      ::
        %index-as-curator
      ?>  =(our.bowl portal-indexer)
      ?>  =(src.bowl src.msg)
      =/  act  ~(act cards [our.bowl %portal-store])
      =/  index-key  [%collection our.bowl '' 'index']
      =/  ship-key   [%ship src.msg '' '']
      =/  cards  `(list card)`~[(act [%remove ~[ship-key] index-key])]
      =?  cards  toggle.msg  (snoc cards (act [%prepend ~[ship-key] index-key]))
      [cards this]
    ==
    ::
      %sss-on-rock
    ?-  msg=!<($%(from:da-portal-devs from:da-blog-paths) (fled vase))
        [[%portal-devs ~] *]
      ?~  wave.msg  `this
      ?-  -.u.wave.msg
          %init
        =+  ~(tap by rock.u.wave.msg)
        =/  upd
          %-  malt
          %+  turn  -
          |=  [p=[=ship =desk] q=ship]
          :_  q
          (crip ;:(welp (scow %p ship.p) "/" (scow %tas desk.p)))
        =.  dev-map  (~(uni by dev-map) upd)
        ::  TODO sub to all received apps
        ::  but I think %init as of right now is only ~
        :_  this  (dev-map-upd upd)
        ::
          %put
        ::  we are accidentally subbing to all items from a publisher, but thats not really a problem
        =/  dist-desk  (crip ;:(welp (scow %p ship.key.u.wave.msg) "/" (scow %tas desk.key.u.wave.msg)))
        =.  dev-map  (~(put by dev-map) dist-desk dev.u.wave.msg)
        :_  this
        %+  snoc  (dev-map-upd (malt (limo ~[[dist-desk dev.u.wave.msg]])))
        [(~(poke pass:io /sub) [our.bowl %portal-store] portal-action+!>([%sub [%app dev '' desk.key]:u.wave.msg]))]
        ::
          %del
        `this
      ==
      ::
        [[%paths ~] *]
      ::  init is actually not a biggie, it's done only on state %2->%3 in blog while the uri doesnt exist yet
      ::
      ?~  wave.msg  `this
      =/  create-my-blogs
        :~  %-  ~(act cards [our.bowl %portal-store])
            :*  %create  ~  ~  `'published-blogs'  `%def
                `[%collection 'My Blogs' 'Collection of all blogs I have published.' '' ~]
                [%collection our.bowl '' '~2000.1.1']~  ~  ~  ==
        ==
      =/  create-blog-cards
        |=  [uri=(unit @t) =path]
        =/  key-time  (path-to-key-time path)
        =/  path  (spat path)
        =/  key  [%blog our.bowl '' key-time]
        ?:  (~(item-exists scry our.bowl now.bowl) key)
          =/  col
            (~(get-item scry our.bowl now.bowl) [%collection our.bowl '' 'published-blogs'])
          ?>  ?=([%collection *] bespoke.col)
          ?~  (find [key]~ key-list.bespoke.col)
            [(~(act cards [our.bowl %portal-store]) [%append [key]~ [%collection our.bowl '' 'published-blogs']])]~
          ~
        :~  %-  ~(act cards [our.bowl %portal-store])
        :*  %create  ~  ~  `key-time  `%def
          `[%blog (blog-path-to-title path) '' (fall uri '') path '']
          ~[[%collection our.bowl '' 'published-blogs']]  ~  ~  ==  ==
      ?-  -.u.wave.msg
          %init
        ::  needs testing
        =/  cards 
          =+  ~(tap in paths.u.wave.msg)
          %-  tail  %^  spin  -  *(list card)
          |=  [=path cards=(list card)]
          :-  path
          %+  welp  cards
          (create-blog-cards ~ path)
        :_  this  (welp create-my-blogs cards)
        ::
          %post 
        :_  this
        %+  welp  create-my-blogs
        (create-blog-cards ~ path.u.wave.msg)
        ::
          %depost
        :_  this
        :~  %-  ~(act cards [our.bowl %portal-store])
            :+  %remove
              [%blog our.bowl '' (path-to-key-time path.u.wave.msg)]~
            [%collection our.bowl '' 'published-blogs']
        ==
        ::
          %uri
        =/  item  %-  ~(get-item scry our.bowl now.bowl)
                  [%collection our.bowl '' 'published-blogs']
        ?>  ?=([%collection *] bespoke.item)
        =/  cards 
          %-  tail  %^  spin  key-list.bespoke.item  *(list card)
          |=  [=key cards=(list card)]
          :-  key
          %+  snoc  cards
          ^-  card
          %-  ~(act ^cards [our.bowl %portal-store])
          :^    %edit
              [%blog our.bowl '' time.key]
            ~
          `[%blog ~ ~ `uri.u.wave.msg ~ ~]
        :_  this  (welp create-my-blogs cards)
      ==
    ==
    ::
      %sss-portal-devs
    =^  cards  sub-portal-devs
      (apply:da-portal-devs !<(into:da-portal-devs (fled vase)))
    [cards this]
    ::
      %sss-blog-paths
    =^  cards  sub-blog-paths
      (apply:da-blog-paths !<(into:da-blog-paths (fled vase)))
    cards^this
  ==
::
++  on-arvo
  |=  [=wire sign=sign-arvo]
  ^-  (quip card:agent:gall _this)
  ?+  wire  `this
    [~ %sss %behn @ @ @ %portal-devs ~]  [(behn:da-portal-devs |3:wire) this]
    [~ %sss %behn @ @ @ %paths ~]  [(behn:da-blog-paths |3:wire) this]
  ==
  :: |=  [=wire sign=sign-arvo]
  :: ^-  (quip card:agent:gall _this)
  :: ?>  ?=([%remotescry ~] wire)
  :: ?>  ?=([%ames %tune *] sign)
  :: ?~  roar.sign  ::  no response from ames
  ::   `this
  :: ?~  q.dat.u.roar.sign  ::  empty data at path
  ::   `this
  :: ?>  ?=(%portal-item p.u.q.dat.u.roar.sign)
  :: =+  ;;  item  q.u.q.dat.u.roar.sign
  :: :_  this
  :: [%give %fact [/updates]~ %portal-update !>(-)]~  ::  FE update

++  on-watch  _`this
++  on-leave  on-leave:default
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  ?+    path    (on-peek:default path)
    [%x %indexed-as-curator ~]  ``portal-manager-result+!>(indexed-as-curator)
    [%x %onboarded ~]           ``portal-manager-result+!>(onboarded)
    [%x %portal-devs ~]         ``portal-manager-result+!>([%portal-devs dev-map])
  ==
++  on-agent
  |=  [=wire =sign:agent:gall]
  ^-  (quip card _this)
  ?+    wire    (on-agent:default wire sign)
      [%our-apps ~]
    ?+    -.sign    (on-agent:default wire sign)
        %fact
      =/  upd  !<(update:alliance q.cage.sign)
      =^  cards  our-apps
        ?-  -.upd
            %add
          :_  (~(put in our-apps) [ship.upd desk.upd])
          :~  :*  %pass  /our-treaty/(scot %p ship.upd)/[desk.upd]  %agent
          [our.bowl %treaty]  %watch  /treaty/(scot %p ship.upd)/[desk.upd]
          ==  ==
          ::
          %del  `(~(del in our-apps) [ship.upd desk.upd])
          %ini  `init.upd
        ==
      [cards this]
    ==
    ::
      [%our-treaty @ @ ~]
    ?+    -.sign    (on-agent:default wire sign)
        %fact
      =/  treaty  !<(treaty:treaty q.cage.sign)
      =/  create-app  ^-  action
        :*  %create
            ~
            ~
            ``@t`i.t.t.wire
            `%def
            `[%app ~ '' '' *signature treaty]
            [%collection our.bowl '' 'published-apps']~
            ~
            ~
        ==
      :_  this
      :~  (~(act cards [our.bowl %portal-store]) create-app)
          [%pass wire %agent [our.bowl %treaty] %leave ~]  ::  why leave here?
          ::  why not sync temp item?
      ==
    ==
    ::
      [%treaty @ @ @ @ ~]
    ~&  >  "new feat: treating treaty like treaty does (to stay in sync)"
    =/  key  (path-to-key:conv +.wire)
    ~&  >  "key {<key>}"
    ?+    -.sign    (on-agent:default wire sign)
        %kick
      :_  this
      ?:  =(our.bowl ship.key)  ~
      ^-  (list card)
      :~  :*  %pass  wire  %agent  [ship.key %treaty]  %watch
              /treaty/(scot %p ship.key)/[cord.key]
      ==  ==
    ::
        %watch-ack
      ::  when treaty withdraws
      ?~  p.sign  `this
      ::  actually delete when we get the delete mechanics correct
      =/  act  [%replace key %temp [%app ~ '' '' *signature *treaty:treaty]]
      :_  this
      [(~(act cards [our.bowl %portal-store]) act)]~
    ::
        %fact
      =/  treaty  !<(treaty:treaty q.cage.sign)
      =/  act  [%replace key %temp [%app ~ '' '' *signature treaty]]
      ~&  >  "new feat: not leaving treaty, but staying subbed and handling properly"
      :_  this
      [(~(act cards [our.bowl %portal-store]) act)]~
    ==
    ::
      [%get-group-preview @ @ @ @ ~]
    ~&  >  "new feat: treating groups previews like groups does (to stay in sync)"
    =/  key  (path-to-key:conv +.wire)
    ~&  >  "key {<key>}"
    ::  basically just not leaving immediately and seeing if we can stay in sync
    ?+    -.sign    (on-agent:default wire sign)
        %watch-ack  `this
      ::  %kick  -> not sure what groups branches on when it handles kick
        %fact
      =/  preview  !<(preview:groups q.cage.sign)
      =/  key  (path-to-key:conv +.wire)
      =/  act  [%replace key %temp [%group meta.preview]]
      :_  this
      :~  [(~(act cards [our.bowl %portal-store]) act)]
          ::  [%pass wire %agent [p.flag.preview %groups] %leave ~]
      ==
    ==
    ::
      [~ %sss *]
    ?>  ?=(%poke-ack -.sign)
    ?~  p.sign  `this
    %-  (slog u.p.sign)
    ?+    wire   `this
        [~ %sss %on-rock @ @ @ %portal-devs ~]
      =.  sub-portal-devs  (chit:da-portal-devs |3:wire sign)
      `this
        [~ %sss %scry-request @ @ @ %portal-devs ~]
      =^  cards  sub-portal-devs  (tell:da-portal-devs |3:wire sign)
      [cards this]
      ::
        [~ %sss %on-rock @ @ @ %paths ~]
      =.  sub-blog-paths  (chit:da-blog-paths |3:wire sign)
      `this
        [~ %sss %scry-request @ @ @ %paths ~]
      =^  cards  sub-blog-paths  (tell:da-blog-paths |3:wire sign)
      [cards this]

    ==
  ==
::
++  on-fail   on-fail:default
--
|_  [=bowl:gall]
+*  this      .
    da-blog-paths   =/  da  (da:sss-25 blog-paths ,[%paths ~])
      (da sub-blog-paths bowl -:!>(*result:da) -:!>(*from:da) -:!>(*fail:da))
    da-portal-devs  =/  da  (da portal-devs ,[%portal-devs ~])
      (da sub-portal-devs bowl -:!>(*result:da) -:!>(*from:da) -:!>(*fail:da))
::
++  init-sequence
  ^+  [*(list card) state]
  =^  cards-1  sub-blog-paths  (surf:da-blog-paths our.bowl %blog [%paths ~])
  =/  sub-init  [%sub [%collection portal-indexer '' '~2000.1.1']]
  :_  state
  %+  welp 
    cards-1
      ::  sub to home page
  :~  [(~(act cards [our.bowl %portal-store]) sub-init)]
      ::  sub to our published apps
      [%pass /our-apps %agent [our.bowl %treaty] %watch /alliance]
      ::  scrying should not be done on on-load or on-init
      (~(act cards [our.bowl %portal-manager]) [%manager-init ~])
  ==
::
++  dev-map-upd
  |=  =_dev-map
  ^-  (list card)
  :~  [%give %fact [/updates]~ %portal-dev-map !>(dev-map)]
  ==
::
::  unidirectional mapping from path to time.key
::  if the original path had '0' in it, backwards conversion will fail
++  path-to-key-time
  |=  =path
  ^-  cord
  =+  (spud path)
  %-  crip
  %+  turn  -
  |=  [i=@t]
  ?:  =(i '/')
    '~'
  i
::
++  blog-path-to-title
  |=  p=@t
  =/  p  (trip p)
  =?  p  
      =('/' (rear p))
    (snip p)
  =.  p  =+  (flop p)
    (flop (scag (need (find ['/']~ -)) -))
  =.  p
  %-  tail  %^  spin  (fand ['-']~ p)  p
    |=  [i=@ud p=tape]
    :-  i
    =.  p  (snap p i ' ')
    =?  p
        &((lth +(i) (lent p)) (gte (snag +(i) p) 'a') (lte (snag +(i) p) 'z'))
      (snap p +(i) (^sub (snag +(i) p) 32))  ::^sub because it wants to subscribe instead of subtract lol
    p
  =?  p
      &((gte -.p 'a') (lte -.p 'z'))
    (snap p 0 (^sub -.p 32))
  (crip p)
::
::  portal-manager only needs to do funky stuff with %temp items
++  sub
  |=  [act=action]
  ^+  [*(list card) state]
  ?>  ?=([%sub *] act)
  ?.  =(time.key.act '')   ::  branch on whether is %temp (empty time.key)
    :: if not temp
    :_  state
    ~[(~(poke pass:io /act) [our.bowl %portal-store] portal-action+!>(act))]
  ::  if temp
  =;  cards
    ?:  ?=(%app struc.key.act)  ::  temp app
      :: subs to %portal-app-publisher and gets on-rock, 
      :: where it subs to the actual %def app
      ::  is this too much spam?
      =^  cards-1  sub-portal-devs
        (surf:da-portal-devs ship.key.act %portal-app-publisher [%portal-devs ~])
      [(welp cards cards-1) state]
    [cards state]
  ?:  (~(item-exists scry our.bowl now.bowl) key.act)  ~
  =|  bespoke=bespoke
  =*  create-empty-temp  ^-  action  :*  %create
                              `ship.key.act
                              `cord.key.act
                              `''
                              `%temp
                              `bespoke
                              ?:  ?|  =(%app struc.key.act) 
                                      =(%group struc.key.act)  ==
                                [%collection our.bowl '' 'all']~
                              ~
                              ~
                              ~
                          ==
  ?+    struc.key.act    !!
    ::
      %ship
    =.  bespoke  [%ship ~]
    ~[(~(poke pass:io /act) [our.bowl %portal-store] portal-action+!>(create-empty-temp))]
    ::
      %group
    =.  bespoke  [%group *data:group-preview]
    =/  path  /groups/(scot %p ship.key.act)/[`@tas`cord.key.act]/preview
    =/  wire  [%get-group-preview (key-to-path:conv key.act)]
    =/  sub-status  (~(gut by wex.bowl) [wire ship.key.act %groups] ~)
    :~  [(~(poke pass:io /act) [our.bowl %portal-store] portal-action+!>(create-empty-temp))]
        [%pass wire %agent [ship.key.act %groups] %watch path]
    ==
    ::
      %app
    =.  bespoke  [%app ~ '' '' *signature *treaty:treaty]
    =/  path  /treaty/(scot %p ship.key.act)/[`@tas`cord.key.act]
    =/  wire  [%treaty (key-to-path:conv key.act)]
    =/  sub-status  (~(gut by wex.bowl) [wire ship.key.act %treaty] ~)
    :~  [(~(poke pass:io /act) [our.bowl %portal-store] portal-action+!>(create-empty-temp))]
        [%pass wire %agent [ship.key.act %treaty] %watch path]
    ==
  ==
::
--
