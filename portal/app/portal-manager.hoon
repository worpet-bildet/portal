/-  *portal-data, *portal-action, *portal-message, portal-config,
    groups, treaty, di=diary, ch=chat
/+  default-agent, dbug, *portal, io=agentio, sig
|%
+$  versioned-state
  $%  state-0:portal-config
      state-1:portal-config
      state-2:portal-config
      state-3:portal-config
      state-4:portal-config
  ==
+$  card  card:agent:gall
--
%-  agent:dbug
=|  state-4:portal-config
=*  state  -
^-  agent:gall
=<
|_  =bowl:gall
+*  this        .
    default     ~(. (default-agent this %|) bowl)
    helper      ~(. +> bowl)
++  on-init 
  =.  state  *state-4:portal-config
  =^  cards  state  init-sequence:helper
  [cards this]
::
++  on-save  !>(state)
++  on-load
  |=  =vase
  ^-  (quip card _this)
  =/  old  !<(versioned-state vase)
  =/  new-state  *state-4:portal-config
  =.  state
    ?-  -.old
      %0      new-state
      %1      new-state
      [%2 *]  new-state
      %3      new-state
      %4      old
    ==
  =^  cards  state  init-sequence:helper
  [cards this]
::
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  =/  manager  ~(. manager [bowl state ~])
  ?+    mark    (on-poke:default mark vase)
      %portal-action
    ?>  =(our.bowl src.bowl)
    =/  act  !<(action vase)
    ?+    -.act
      ::  default:  forward to %portal-store
      :_  this  [(~(act cards [our.bowl %portal-store]) act)]~
      ::
        %sub
      =^  cards  state  (sub:on-poke:manager act)  [cards this]
      ::
        %onboarded
      `this(onboarded toggle.act)
      ::
        %index-as-curator
      =/  msg  [%index-as-curator src.bowl toggle.act]
      :_  this(indexed-as-curator toggle.act)
      [(~(msg cards [portal-indexer.state %portal-manager]) msg)]~
      ::
        %peek-diary
      =+  .^  shelf:di  %gx
            /(scot %p our.bowl)/diary/(scot %da now.bowl)/shelf/noun
          ==
      =+  ~(tap by -)  :: (list [flag diary])
      =+  ^-  (list [flag:di =time note:di comment-count=@ud])
          %-  zing
          %+  turn  -
          |=  [=flag:di =diary:di]
          ^-  (list [flag:di time note:di @ud])
          %+  turn  (tap:on:notes:di notes.diary)
          |=  [=time =note:di]
          :^  flag  time  note
              (wyt:on:quips:di quips.-.note)  :: comment (quip) count
      =+  %+  sort  -  ::  sort by most comments
          |=  [[a=* b=* c=* count-1=@ud] [d=* e=* f=* count-2=@ud]]
          (gte count-1 count-2)
      ~&  -
          
      
      :: shelf: (map flag diary)
      :: net.diary: %sub or %pub  ::  our or their
      :: notes.diary: (mop time note)
      :: note: [seal essay]
      ::   seal: [time quips feels]
      ::     quips: (mop time quip)
      ::       quip: [cork memo]
      ::         memo: [content author time] ::comment data
      ::   essay: [title image content author time]
      ::
      :: noteID = flag + time
      :: sort notes by number of comments
      :: since last on portal
      ::  we can sub to updates
      ::  all time most commented
      ::  since you last opened portal most commented
      ::  map id comment number
      ::
      ::TODO NEW BRANCH CHRONICLE
      ::
      ::  prepend to feed should create feed if doesnt exist?
      ::
      ::  put all of this into a %feed (or sth like that item)
      ::  -maybe a good opportunity to generalize the feed data type (e.g. as (list [meta key]))
      ::  that way we get composable feeds soon?
      ::  this is a bit tricky with perms tho...
      ::  but at least having a personal one is great
      ::  and combine other stuff into it, like best chats or whatever
      ::
      ::  we keep our version of the state, (list [flag time comment-count])
      ::  if we want to publish it on portal, we create a %diary-note item
      ::    is it okay that we give people the power to publish whatever is in their notes?
      ::      i.e. publish other people's stuff
      ::    if readers.channel:groups=~, then anyone in the group is allowed to see it
      ::    if -.cordon:groups=%open, group is public
      ::  
      `this
      ::
        %peek-chat
      :: gang: view of a group we are not in
      :: groups: (map flag group)
      :: group: contains channels
      :: channels: (map nest channel)
      :: nest: [dude flag]  :: channel id, e.g. [%chat ~zod %something]
      :: flag: [ship term]  :: chat channel id  [~zod %something]
      :: chat: [net remark log perm pact]
      ::   net: %sub or %pub ::  host or subscriber
      ::   remark: time last-read, watching=?  :: maybe watching is important for filtering
      ::   log: (mop time diff)  ::  important diffs -> %create new chat, %writs chat message update
      ::   perm: writers, group :: group says which group it belongs to
      ::   pact: writs, index  ::  id -> time -> message
      ::     writs: (mop time writ)  :: time ordered chat messages
      ::       index: (map id time)  :: map from msg id to time msg received
      ::         id: [ship time-sent] 
      ::       writ: [seal memo]
      ::         seal: [id feels replied]  
      ::           id: [ship time]  ::  message id
      ::           feels: (map ship feel)  :: one reaction(feel) per ship 
      ::           replied: (set id)  ::  set of replies to a msg
      ::         memo: [replying author sent=time content]  ::chat msg with metadata
      ::           replying: (unit id)  :: reply to which msg (if at all)
      ::           content: story or notice
      ::             story: [(list block) (list inline)]
      ::               block: image or cite  :: the thing that pops up above the msg in chat
      ::               inline: text  ::  with funky recursive data type
      ::             notice: [pfix=@t sfix=@t]  :: before and after ship name???
      ::  I can sub to a chat to receive updates
      ::  its probably better to just scry and sort
      ::

      ::  everything older than X time without any feels we dont save
      ::  most popular over last day,
      :: chat messages by popularity, time
      :: (list [link time feels-num])
      :: =/  chats
      ::   .^  (map flag:ch chat:ch)  %gx  
      ::       /(scot %p our.bowl)/chat/(scot %da now.bowl)/chats/noun
      ::   ==
      
      `this
    ==
    ::
      %portal-message
    ::  TODO src.bowl src.msg problem kad store misli da je src our
    ::  a ne vanjski jer dolazi od portal-managera
    =/  msg  !<(message vase)
    ?>  =(our.bowl ~worpet-bildet)
    ?>  =(src.bowl src.msg)
    ?+    -.msg  !!
        %index-as-curator
      =/  act  ~(act cards [our.bowl %portal-store])
      =/  index-key  [%collection our.bowl '' 'index']
      =/  ship-key   [%ship src.msg '' '']
      =/  cards  `(list card)`~[(act [%remove ~[ship-key] index-key])]
      =?  cards  toggle.msg  (snoc cards (act [%prepend ~[ship-key] index-key]))
      [cards this]
    ==
  ==
::
++  on-arvo  on-arvo:default
++  on-watch  on-watch:default
++  on-leave  on-leave:default
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  ?+    path    (on-peek:default path)
    [%x %indexed-as-curator ~]  ``manager-result+!>(indexed-as-curator)
    [%x %onboarded ~]           ``manager-result+!>(onboarded)
  ==
++  on-agent
  |=  [=wire =sign:agent:gall]
  ^-  (quip card _this)
  ?+    wire    (on-agent:default wire sign)
      [%our-apps ~]
    ?+    -.sign    (on-agent:default wire sign)
        %fact
      =/  upd  !<(update:alliance q.cage.sign)
      =.  our-apps
        ?-  -.upd
          %add  (~(put in our-apps) [ship.upd desk.upd])
          %del  (~(del in our-apps) [ship.upd desk.upd])
          %ini  init.upd
        ==
      `this
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
            `[%app ~ '' *signature treaty]
            [%collection our.bowl '' 'published-apps']~
            ~
            ~
        ==
      :_  this
      :~  (~(act cards [our.bowl %portal-store]) create-app)
          [%pass wire %agent [our.bowl %treaty] %leave ~]
      ==
    ==
    ::
      [%treaty @ @ @ @ ~]
    ?+    -.sign    (on-agent:default wire sign)
        %fact
      =/  treaty  !<(treaty:treaty q.cage.sign)
      =/  key  (path-to-key:conv +.wire)
      =/  act  [%replace key %temp [%app ~ '' *signature treaty]]
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
  ==
::
++  on-fail   on-fail:default
--
|_  [=bowl:gall]
+*  this      .
::
++  init-sequence
  ^+  [*(list card) state]
  =.  our-apps.state  ;;  our-apps:portal-config  
    %-  tail
    .^  update:alliance:treaty  %gx
        /(scot %p our.bowl)/treaty/(scot %da now.bowl)/alliance/noun
    ==
  =/  cards-1
    =+  ~(tap in our-apps.state)
    %+  turn  -
    |=  [=ship =desk]
    :*  %pass  /our-treaty/(scot %p ship)/[desk]  %agent
        [our.bowl %treaty]  %watch  /treaty/(scot %p ship)/[desk]
    ==
  =/  sub-init  [%sub [%collection portal-indexer '' '~2000.1.1']]
  :_  state
  %+  welp  cards-1
  ::  sub to home page
  :~  [(~(act cards [[our.bowl %portal-store]]) sub-init)]
  ::  sub to our published apps
      [%pass /our-apps %agent [our.bowl %treaty] %watch /alliance]
  ==
--
