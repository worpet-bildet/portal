/-  *portal-data, *portal-action, *portal-message, portal-config,
    groups, treaty, portal-devs, blog-paths
/+  default-agent, dbug, *portal, io=agentio, *sig, *sss
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
      sub-blog-paths=_(mk-subs blog-paths ,[%paths ~])
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
    da-portal-devs  =/  da  (da portal-devs ,[%portal-devs ~])
      (da sub-portal-devs bowl -:!>(*result:da) -:!>(*from:da) -:!>(*fail:da))
    da-blog-paths   =/  da  (da blog-paths ,[%paths ~])
      (da sub-blog-paths bowl -:!>(*result:da) -:!>(*from:da) -:!>(*fail:da))
++  on-init
  =.  state  *state-6
  =.  our-apps.state  ;;  our-apps:portal-config
    %-  tail
    .^  update:alliance:treaty  %gx
        /(scot %p our.bowl)/treaty/(scot %da now.bowl)/alliance/noun
    ==
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
  =/  manager  ~(. manager [bowl ~])
  ?+    mark    (on-poke:default mark vase)
      %portal-action
    ?>  =(our.bowl src.bowl)
    =/  act  !<(action vase)
    ?+    -.act
      ::  default:  forward to %portal-store
      :_  this  [(~(act cards [our.bowl %portal-store]) act)]~
      ::
        %sub
      =/  cards  (sub:on-poke:manager act)
      ::  stupid way to do it, sss sub should be done within sub function
      ::  I'm just lazyyyy
      ?:  &(?=(%app struc.key.act) =(time.key.act ''))  ::  temp app
        :: subs to %portal-app-publisher and gets on-rock, 
        :: where it subs to the actual %def app
        =^  cards-1  sub-portal-devs
          (surf:da-portal-devs ship.key.act %portal-app-publisher [%portal-devs ~])
        [(welp cards cards-1) this]
      [cards this]
      ::
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
    ?+    -.msg  !!
        %sign-app
      ?>  (validate-sig dist-desk.msg our.bowl our.bowl now.bowl sig.msg)
      ~&  >  "%portal: sig is valid!"
      =/  dist-desk  (parse-dist-desk:misc dist-desk.msg)
      ?~  dist-desk  !!
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
      ?>  =(our.bowl ~worpet-bildet)
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
      ~&  >  "new feat: blog sync"
      ?~  wave.msg  `this
      =/  create-my-blogs
        :~  %-  ~(act cards [our.bowl %portal-store])
            :*  %create  ~  ~  `'published-blogs'  `%def
                `[%collection 'My Blogs' 'Collection of all blogs I have published.' '' ~]
                [%collection our.bowl '' '~2000.1.1']~  ~  ~  ==
        ==
      =/  create-blog-card
        |=  [uri=(unit @t) path=@t]
        %-  ~(act cards [our.bowl %portal-store])
        ?:  %-  ~(item-exists scry our.bowl now.bowl)
            [%blog our.bowl '' path]
          [%append [%blog our.bowl '' path]~ [%collection our.bowl '' 'published-blogs']]
        :*  %create  ~  ~  `path  `%def
          `[%blog '' '' (fall uri '') path '']
          ~[[%collection our.bowl '' 'published-blogs']]  ~  ~  ==
      ?-  -.u.wave.msg
          %init
        ~&  >  "init"
        ::  needs testing
        =/  cards 
          =+  ~(tap in paths.u.wave.msg)
          %-  tail  %^  spin  -  *(list card)
          |=  [=path cards=(list card)]
          :-  path
          %+  snoc  cards
          (create-blog-card ~ (spat path))
        :_  this  (welp create-my-blogs cards)
        ::
          %post 
        ~&  >  "post"
        :_  this
        %+  snoc  create-my-blogs
        (create-blog-card ~ (spat path.u.wave.msg))
        ::
          %depost
        ~&  >  "depost"
        :_  this
        :~  %-  ~(act cards [our.bowl %portal-store])
            :+  %remove
              [%blog our.bowl '' (spat path.u.wave.msg)]~
            [%collection our.bowl '' 'published-blogs']
        ==
        ::
          %uri
        ~&  >  "uri"
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
      ==
    ==
    ::
      [%treaty @ @ @ @ ~]
    ?+    -.sign    (on-agent:default wire sign)
        %fact
      =/  treaty  !<(treaty:treaty q.cage.sign)
      =/  key  (path-to-key:conv +.wire)
      =/  act  [%replace key %temp [%app ~ '' '' *signature treaty]]
      :_  this
      :~  [(~(act cards [our.bowl %portal-store]) act)]
          [%pass wire %agent [ship.key %treaty] %leave ~]
      ==
    ==
    ::
      [%get-group-preview @ @ @ @ ~]
    ?+    -.sign    (on-agent:default wire sign)
        %fact
      =/  preview  !<(preview:groups q.cage.sign)
      =/  key  (path-to-key:conv +.wire)
      =/  act  [%replace key %temp [%group meta.preview]]
      :_  this
      :~  [(~(act cards [our.bowl %portal-store]) act)]
          [%pass wire %agent [p.flag.preview %groups] %leave ~]
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
    da-blog-paths   =/  da  (da blog-paths ,[%paths ~])
      (da sub-blog-paths bowl -:!>(*result:da) -:!>(*from:da) -:!>(*fail:da))
::
++  init-sequence
  ^+  [*(list card) state]
  =/  cards-1
    =+  ~(tap in our-apps.state)
    %+  turn  -
    |=  [=ship =desk]
    :*  %pass  /our-treaty/(scot %p ship)/[desk]  %agent
        [our.bowl %treaty]  %watch  /treaty/(scot %p ship)/[desk]
    ==
  =^  cards-2  sub-blog-paths  (surf:da-blog-paths our.bowl %blog [%paths ~])
  ~&  >  "new feat: blog sub"
  ~&  >  "care -> difference in timers"
  =/  sub-init  [%sub [%collection portal-indexer '' '~2000.1.1']]
  :_  state
  ;:  welp 
    cards-1
    cards-2
  ::  sub to home page
  :~  [(~(act cards [our.bowl %portal-store]) sub-init)]
  ::  sub to our published apps
      [%pass /our-apps %agent [our.bowl %treaty] %watch /alliance]
  ==  ==
::
++  dev-map-upd
  |=  =_dev-map
  ^-  (list card)
  :~  [%give %fact [/updates]~ %portal-dev-map !>(dev-map)]
  ==
--
