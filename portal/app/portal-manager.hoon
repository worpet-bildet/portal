/-  *portal-data, *portal-action, *portal-message, *portal-logs, *portal-config,
    groups, treaty, portal-feed
/+  default-agent, dbug, *portal, io=agentio, sig, sss
|%
+$  versioned-state
  $%  state-0
      state-1
      state-2
  ==
+$  state-0
  $:  %0
      =default-curators
      =portal-curator
  ==
+$  state-1
  $:  %1
      =default-curators
      =portal-curator
      purge-timer=?
      purge-time=@dr
      portal-indexer=@p
      indexed-as-curator=?
      onboarded=?
  ==
+$  state-2
  $:  %2
      my-feed=feed
      =default-curators
      =portal-curator
      purge-timer=?
      purge-time=@dr
      portal-indexer=@p
      indexed-as-curator=?
      onboarded=?
  ==
+$  card  card:agent:gall
--
%-  agent:dbug
=/  sub-feed  (mk-subs:sss portal-feed ,[%feed ~])
=/  pub-feed  (mk-pubs:sss portal-feed ,[%feed ~])
=|  state-2
=*  state  -
^-  agent:gall
|_  =bowl:gall
+*  this      .
    default   ~(. (default-agent this %|) bowl)
    du-feed  =/  du  (du:sss portal-feed ,[%feed ~])
    (du pub-feed bowl -:!>(*result:du))
    da-feed  =/  da  (da:sss portal-feed ,[%feed ~])
            (da sub-feed bowl -:!>(*result:da) -:!>(*from:da) -:!>(*fail:da))
++  on-init
  ^-  (quip card _this)
  =/  new-user-event      [%join now.bowl (get-ship-type:misc our.bowl) `@ux`(shax our.bowl)]
  =/  default-curators    (silt (limo ~[[~worpet-bildet /list/list '~2000.1.1']]))
  =/  portal-curator      [~worpet-bildet /list/list '~2000.1.1']
  =/  purge-timer         %.y
  =/  purge-time          ~d1
  =/  portal-indexer      ~master-dilryd-mopreg
  =/  indexed-as-curator  %.n
  =/  onboarded           %.n
  =/  feed                *^feed
  =^  cards  sub-feed
    (surf:da-feed portal-indexer %portal-manager [%feed ~])
  :_  %=  this
        my-feed             feed
        default-curators    default-curators
        portal-curator      portal-curator
        purge-timer         purge-timer
        purge-time          purge-time
        portal-indexer      portal-indexer
        indexed-as-curator  indexed-as-curator
        onboarded           onboarded
      ==
  %+  welp  cards
  :~  (~(poke pass:io /act) [our.bowl %portal-store] %portal-action !>([%sub portal-curator]))
      (~(poke pass:io /new-user) [-.portal-curator %portal-logs] %portal-new-user-event !>(new-user-event))
      [%pass /purge-timer %arvo %k %fard q.byk.bowl %purge-timer %noun !>((some purge-time))]
  ==
::
++  on-save  !>([state pub-feed sub-feed])
++  on-load
  |=  old=vase
  ^-  (quip card _this)
  =/  purge-time  ~d1
  ?:  =(%1 -.q.old)
    =/  old  !<(state-1 old)
    =^  cards  sub-feed
      (surf:da-feed portal-indexer.old %portal-manager [%feed ~])
    :_  this(state [%2 *^feed +.old])
    ;:  welp
      cards
      ?:  =(purge-timer.old %.y)  ~
      [%pass /purge-timer %arvo %k %fard q.byk.bowl %purge-timer %noun !>((some purge-time))]~
    ==
  ?:  =(%2 -.-.q.old)
    =/  old  !<([=state-2 =_pub-feed =_sub-feed] old)
    =^  cards  sub-feed.old
      (surf:da-feed portal-indexer.state-2.old %portal-manager [%feed ~])
    :_  this(state state-2.old, pub-feed pub-feed.old, sub-feed sub-feed.old)
    ;:  welp
      cards
      ?:  =(purge-timer.state-2.old %.y)  ~
      [%pass /purge-timer %arvo %k %fard q.byk.bowl %purge-timer %noun !>((some purge-time))]~
    ==
  =/  old  !<(versioned-state old)
  ?+    -.old    !!
      %0
    :_  this(state [%2 *^feed default-curators.old portal-curator.old %.y purge-time ~master-dilryd-mopreg %.n %.n])
    [%pass /purge-timer %arvo %k %fard q.byk.bowl %purge-timer %noun !>((some purge-time))]~
  ==
::
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?+    mark    (on-poke:default mark vase)
      %portal-action
    ?.  =(our.bowl src.bowl)  `this
    =/  act  !<(action vase)
    ::
    ::  TODO abstract a portal-manager add/edit/etc function which does stuff based on action and type
    ::  maybe not needed? aim for simplicity.
    =/  act-set  %-  silt   ^-  (list term)
      ~[%add %edit %edit-general %sub %del %add-to-default-list %overwrite-list %put-nonitem %edit-docket %add-item-to-list]
    ?:  (~(has in act-set) -.act)
      :_  this
      ~[(~(poke pass:io /act) [our.bowl %portal-store] portal-action+vase)]
    ::
    ?:  =(-.act %purge)
      =/  items-to-keep  (feed-to-key-list:conv rock:(~(got by read:da-feed) [portal-indexer %portal-manager [%feed ~]]))
      :_  this
      :~  [(~(poke pass:io /act) [our.bowl %portal-store] portal-action+!>([%purge default-curators portal-curator items-to-keep]))]
      ==
    ::
    ?:  =(-.act %add-items-and-list)
      :_  this
      (add-items-and-list:on-action:portal-manager our.bowl src.bowl now.bowl act)
    ::
    ?:  =(-.act %add-items-and-edit-list)
      :_  this
      (add-items-and-edit-list:on-action:portal-manager our.bowl src.bowl now.bowl act)
    ::
    ?:  =(-.act %onboarded)
      ?+  -.act  !!
        %onboarded  `this(onboarded toggle.act)
      ==
    ::
    =/  poke-msg  ~(poke pass:io /msg)
    ?+    -.act    `this
        %index-as-curator
      :_  this(indexed-as-curator toggle.act)
      [(poke-msg [portal-indexer %portal-manager] portal-message+!>([%index-as-curator src.bowl toggle.act]))]~
      ::
        %comment
      :_  this
      [(poke-msg [ship.key.act %portal-manager] portal-message+vase)]~
      ::
        %edit-comment
      :_  this
      [(poke-msg [ship.key.act %portal-manager] portal-message+vase)]~
      ::
        %del-comment
      :_  this
      [(poke-msg [ship.key.act %portal-manager] portal-message+vase)]~
      ::
        %rate
      :_  this
      [(poke-msg [ship.key.act %portal-manager] portal-message+vase)]~
      ::
        %unrate
      :_  this
      [(poke-msg [ship.key.act %portal-manager] portal-message+vase)]~
      ::
        %review
      :_  this
      [(poke-msg [ship.key.act %portal-manager] portal-message+vase)]~
      ::
        %del-review
      :_  this
      [(poke-msg [ship.key.act %portal-manager] portal-message+vase)]~
      ::
        %sign-app
      =/  sig  (sign:sig our.bowl now.bowl [%app key.act desk-name.act])
      =/  cage  portal-message+!>([%sign-app key.act sig])
      :_  this
      ~[(poke-msg [ship.key.act %portal-manager] cage)]
      ::
        %join-group
      ?.  ?=([%nonitem %group *] type.key.act)  `this
      =/  cage  group-join+!>([flag=[ship.key.act `@tas`cord.key.act] join-all=&])
      :_  this
      [%pass /group-join %agent [our.bowl %groups] %poke cage]~
      ::
        %get-group-preview
      ::  not sub -> not perfectly updated, either too much or too little
      =/  path  /groups/(scot %p ship.flag.act)/[term.flag.act]/preview
      =/  wire  [%get-group-preview /(scot %p ship.flag.act)/[term.flag.act]]
      =/  sub-status  (~(gut by wex.bowl) [wire ship.flag.act %groups] ~)
      :_  this
      ?~  sub-status
        [%pass wire %agent [ship.flag.act %groups] %watch path]~
      ~
      ::
        %get-docket
      ::  not sub -> not perfectly updated, either too much or too little
      =/  path  /treaty/(scot %p ship.act)/[desk.act]
      =/  wire  [%treaty (key-to-path:conv key.act)]
      =/  sub-status  (~(gut by wex.bowl) [wire ship.act %treaty] ~)
      :_  this
      ?~  sub-status
        [%pass wire %agent [ship.act %treaty] %watch path]~
      :~  [%pass wire %agent [ship.act %treaty] %leave ~]
          [%pass wire %agent [ship.act %treaty] %watch path]
      ==
    ==
    ::
      %portal-message
    =/  msg  !<(message vase)
    ?+    -.msg
      ::  All messages
      :_  this
      ~[(~(poke pass:io /msg) [our.bowl %portal-store] portal-message+vase)]
      ::
      ::  Index-as-Curator
      ::  TODO implement for all
        %index-as-curator
      ?>  =(src.bowl src.msg)
      ?>  =(our.bowl portal-indexer)
      :_  this
      ~[(~(poke pass:io /msg) [our.bowl %portal-store] portal-message+vase)]
      ::
      ::  add new stuff to feed
        %feed-update
      ?>  =(src.bowl src.msg)
      ?>  =(our.bowl portal-indexer)
      =^  cards  pub-feed  (give:du-feed [%feed ~] feed.msg)
      ::~&  >  "pub-feed is: {<read:du-feed>}"
      [cards this]
    ==
    ::
      %sss-to-pub
    =/  msg  !<(into:du-feed (fled:sss vase))
    =^  cards  pub-feed  (apply:du-feed msg)
    [cards this]
    ::
      %sss-feed
    =^  cards  sub-feed  (apply:da-feed !<(into:da-feed (fled:sss vase)))
    ::~&  >  "sub-feed is: {<read:da-feed>}"
    [cards this]
    ::
      %sss-on-rock
    =/  msg  !<(from:da-feed (fled:sss vase))
    ~?  ?=(^ rock.msg)
      "last message from {<from.msg>} on {<src.msg>} is {<,.-.rock.msg>}"
    ?<  ?=([%crash *] rock.msg)
    ?~  wave.msg  `this
    =/  key-list  (feed-to-key-list:conv `feed`u.wave.msg)
    =/  filtered-set  (set-difference:keys (silt key-list) (get-all-keys:scry our.bowl now.bowl))
    =/  filtered-list  ~(tap in filtered-set)
    :_  this  %+  welp
    (keys-to-sub-cards:cards our.bowl filtered-list)
    (get-nonitems:portal-manager our.bowl filtered-list)
    ::
    ::  when %portal-store makes/receives an update, it notifies %portal-manager
    ::  then %portal-manager decides what it needs to do with it
      %portal-update
    ::  TODO assert that it comes from our %portal-store
    ?.  =(our.bowl src.bowl)  `this
    =/  upd  !<(update vase)
    ?+    -.upd    (on-poke:default mark vase)
        %put
      =^  cards  my-feed
      (put:on-update:portal-manager our.bowl now.bowl my-feed portal-indexer upd)
      [cards this]
      ::
        %del
      :_  this
      (del:on-update:portal-manager upd)
    ==

  ==
::
++  on-arvo
  |=  [=wire sign=sign-arvo]
  ^-  (quip card:agent:gall _this)
  ?+  wire  `this
      [%purge-timer ~]
    ?>  ?=([%khan %arow *] sign)
    =/  items-to-keep  (feed-to-key-list:conv rock:(~(got by read:da-feed) [portal-indexer %portal-manager [%feed ~]]))
    :_  this
    :~  [(~(poke pass:io /act) [our.bowl %portal-store] portal-action+!>([%purge default-curators portal-curator items-to-keep]))]
        [%pass /purge-timer %arvo %k %fard q.byk.bowl %purge-timer %noun !>((some purge-time))]
    ==
    ::
      [~ %sss %behn @ @ @ %feed ~]
    [(behn:da-feed |3:wire) this]
  ==
::
++  on-watch  on-watch:default
++  on-leave  on-leave:default
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  ?+    path    (on-peek:default path)
      [%x %feed ~]
    ``portal-feed+!>(rock:(~(got by read:da-feed) [portal-indexer %portal-manager [%feed ~]]))
    ::  start and offset
      [%x %feed-items @ @ ~]
    =/  feed  %+  swag  [(slav %ud i.t.t.path) (slav %ud i.t.t.t.path)]
      rock:(~(got by read:da-feed) [portal-indexer %portal-manager [%feed ~]])
    =/  all-items  (get-all-items:scry our.bowl now.bowl)
    =/  feed-items  `^feed-items`(murn feed |=([time=cord =ship =key] (~(get by all-items) key)))
    ``portal-feed-items+!>(feed-items)
      [%x %indexed-as-curator ~]
    ``bool+!>(indexed-as-curator)
      [%x %onboarded ~]
    ``bool+!>(onboarded)
  ==

++  on-agent
  |=  [=wire =sign:agent:gall]
  ^-  (quip card _this)
  ?+    wire    (on-agent:default wire sign)
      [~ %sss *]
    ?>  ?=(%poke-ack -.sign)
    ?~  p.sign  `this
    %-  (slog u.p.sign)
    ?+    wire   `this
        [~ %sss %on-rock @ @ @ %feed ~]
      =.  sub-feed  (chit:da-feed |3:wire sign)
      ::~&  >  "sub-feed is: {<read:da-feed>}"
      `this
        [~ %sss %scry-request @ @ @ %feed ~]
      =^  cards  sub-feed  (tell:da-feed |3:wire sign)
      ::~&  >  "sub-feed is: {<read:da-feed>}"
      [cards this]
    ==
      [%treaty *]
    ?+    -.sign    (on-agent:default wire sign)
        %watch-ack  `this
        %kick       `this
      ::
        %fact
      =/  treaty  !<(treaty:treaty q.cage.sign)
      =/  key  (path-to-key:conv +.wire)
      ?+    type.key    !!
          [%enditem %app ~]
        :_  this
        ~[(act-to-act-card:cards [%edit-docket key treaty] our.bowl %portal-store)]
          [%nonitem %app ~]
        :_  this
        :~  [(fill-nonitem-app-data:portal-manager [our.bowl [%fill-nonitem-app key treaty]])]
            [%pass wire %agent [ship.key %treaty] %leave ~]
        ==
      ==
    ==
      [%get-group-preview *]
    ?+    -.sign    (on-agent:default wire sign)
        %watch-ack  `this
        %kick       `this
      ::
        %fact
      =/  preview  !<(preview:groups q.cage.sign)
      =/  act
        :*  %fill-nonitem-group
          [p.flag.preview [%nonitem %group ~] q.flag.preview]
          title.meta.preview
          description.meta.preview
          image.meta.preview
        ==
      :_  this
      :~  (fill-group-data:portal-manager [our.bowl act])
          [%pass wire %agent [p.flag.preview %groups] %leave ~]
      ==
    ==
  ==
::
++  on-fail   on-fail:default
--
