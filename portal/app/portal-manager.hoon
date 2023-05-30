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
      state-5
  ==
+$  card  card:agent:gall
::  TODO some type of state management
::  e.g. delete everything begind last 100 msgs without feels or replies
+$  ch-feed  (list [=id:ch group=flag:groups channel=flag:ch replies=@ud feels=@ud])
+$  state-5
  $:  %5
      feels-seen=(mip:mip id:ch ship feel:ch)
      replies-seen=(map id:ch (set id:ch))
      chats-last-heard=(map flag:ch @da)
      =ch-feed
      =portal-curator:portal-config
      =portal-indexer:portal-config
      =purge-timer:portal-config
      =purge-time:portal-config
      =indexed-as-curator:portal-config
      =onboarded:portal-config
      =our-apps:portal-config
  ==
--
%-  agent:dbug
=|  state-5
=*  state  -
^-  agent:gall
=<
|_  =bowl:gall
+*  this        .
    default     ~(. (default-agent this %|) bowl)
    helper      ~(. +> bowl)
++  on-init 
  ~&  >  "on-init"
  =.  state  *state-5
  =^  cards  state  init-sequence:helper
  [cards this]
::
++  on-save  !>(state)
++  on-load
  |=  =vase
  ^-  (quip card _this)
  ~&  >  "on-load"
  =/  old  !<(versioned-state vase)
  =/  new-state  *state-5
  =.  state
    ?-  -.old
      %0      new-state
      %1      new-state
      [%2 *]  new-state
      %3      new-state
      %4      [%5 *(mip:mip id:ch ship feel:ch) *(map id:ch (set id:ch)) *(map flag:ch @da) *^ch-feed +.old]
      %5      old
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
      [(sub:on-poke:manager act) this]
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
      :: =/  chat-keys
      ::   .^  (map flag:ch chat:ch)  %gx  
      ::       /(scot %p our.bowl)/chat/(scot %da now.bowl)/chats/noun
      ::   ==
      :: =/  writs  
      ::   .^  writs:ch  %gx
      ::       /(scot %p our.bowl)/chat/(scot %da now.bowl)/chat/~master-dilryd-mopreg/chat/writs/newest/100/noun
      ::   ==
      :: ~&  writs

      ::~&  -
      :: (list [flag chat])
      :: watching.remark.chat=?
      :: writs.pact.chat=(mop time writ=[seal=[id feels replied] memo])
      :: (val:on:writs:ch writs.pact.chat)
      :: index.pact.chat=(map id=[ship time] time)
      ::~&  chats



      ::  chat-feed
      ::  (list [meta key])
      ::  
      ::  feed item
      ::  feed  (list [time=cord =ship =key])
      
      ::
      `this
      ::[%pass /chats %agent [our.bowl %chat] %watch /briefs]~
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
      [%groups ~]
    ?-  -.sign
      %poke-ack  !!
    ::
        %kick
      :_  this
      [%pass /groups %agent [our.bowl %groups] %watch /groups]~
    ::
        %watch-ack
      :_  this
      ?~  p.sign  ~
      ((slog dap.bowl 'failed to open subscription' >wire< u.p.sign) ~)
    ::
        %fact
      ?.  ?=(%group-action-0 p.cage.sign)
        `this
      =/  =diff:groups
        q.q:!<(action:groups q.cage.sign)
      ?.  ?=([%channel [%chat *] %add *] diff)
        `this
      =^  cards  state  (chat-sub:helper q.p.diff)
      [cards this]
    ==

      [%chats ~]
    ?+    -.sign  `this
        %kick
      :_  this
      :~  [%pass /chats %agent [src.bowl %chat] %watch /briefs]  ==
      ::
        %fact
      ::  mostly copying how %chronicle interfaced with %chat
      =/  update  !<([=whom:ch =brief:briefs:ch] q.cage.sign)
      ::~&  >  update
      ?.  ?=([%flag *] whom.update)  `this
      ::?.  =(p:p:update our.bowl)  `this outdated?
      ?~  read-id.brief.update  `this  ::  msg was read, should we use this or no?
                                       ::  or read-id is empty if its sent by us?
      =/  post=[=time =writ:ch]
        %-  head  %~  tap  by
        .^  (map @da writ:ch)
          %gx
          ;:  welp 
            /(scot %p our.bowl)/chat/(scot %da now.bowl)/chat
            /(scot %p p.p.whom.update)/[q.p.whom.update]/writs/newest/1/noun
          == 
        ==
      ::~&  post
      ::  FEELS NO NOTIFS
      ::  MAYBE BY REPLIES
      ::  JUST LINKS?
      :: ::
      =/  chatmap
        .^  (map flag:ch chat:ch) 
            %gx  
            /(scot %p our.bowl)/chat/(scot %da now.bowl)/chats/noun
        ==
      =/  group  group:perm:(~(got by chatmap) p.whom.update)
      =/  channel  q.p.whom.update

      :: ~&  chatmap
      :: ~&  group
      :: =/  feel-num
      :: =/  reply-num
      :: ?.  ?=([%story *] content.memo.writ.post)
      ::   `this
      :: ?.  ?=  [%story [~ [[%link @ @] [%break ~] ~]]]
      ::     content.q.post
      ::   `this
      :: =/  newurl=@t  p.i.q.p.content.q.post
      :: ::
      :: =/  =request:http  [%'GET' newurl ~ ~]
      :: =/  =task:iris  [%request request *outbound-config:iris]
      :: =/  iris-card=card:agent:gall  [%pass /http-req/(scot %da now.bowl) %arvo %i task]
      :: ::
      :: =/  newlink  :*
      ::                 url=newurl 
      ::                 path=`path:spaces-path`group
      ::                 date=now.bowl 
      ::                 poster=author.q.post
      ::                 likes=0 
      ::                 dislikes=0 
      ::                 liked=%.n
      ::                 disliked=%.n
      ::                 saved=%.n
      ::                 featured=%.n
      ::                 title=newurl
      ::                 image-url=''
      ::              ==
      `this
      :: :_  this(newsfeed :-(newlink newsfeed))
      :: :~  iris-card
      ::     :*  %give  %fact  
      ::         ~[/updates/(scot %p ship:path:newlink)/(scot %tas space:path:newlink)]  
      ::         %chronicle-update
      ::         !>(`update:chronicle`new+newlink)
      ::     ==  
      :: ==
    ==
    ::
      [%chat @ @ ~]
    ~&  >  "receiving chat sub"
    ::~&  >  wire
    =/  =flag:ch
      [(slav %p i.t.wire) i.t.t.wire]
    ?-  -.sign
      %poke-ack  !!
      %kick      !! :: =^(cards state (chat-sub:helper flag) [cards this])
    ::
        %watch-ack
      ?~  p.sign  [~ this]
      %.  [~ this]
      (slog dap.bowl 'failed to open subscription' >wire< u.p.sign)
    ::
        %fact
      ?.  ?=(?(%chat-logs %chat-update-0) p.cage.sign)
        [~ this]
      =/  logs=(list [=time =diff:ch])
        ?-  p.cage.sign
          %chat-logs      (tap:log-on:ch !<(logs:ch q.cage.sign))
          %chat-update-0  [!<(update:ch q.cage.sign)]~
        ==
      |-
      ?~  logs
        `this
      =?  state  ?=(%writs -.diff.i.logs)
        =/  dif  diff.i.logs
        =*  mid  p.p.dif
        ?-  -.q.p.dif::  state
            %add-feel
          =*  fro  p.q.p.dif
          =*  new  q.q.p.dif
          (receive-feel:helper flag time.i.logs mid fro `new)
            %del-feel
          =*  fro  p.q.p.dif
          (receive-feel:helper flag time.i.logs mid fro ~)
        ::
        ::  handle if reply
            %add
          =*  mem  p.q.p.dif
          (receive-mem:helper flag time.i.logs mid `mem)
        ::  handle if reply deleted
            %del
          (receive-mem:helper flag time.i.logs mid ~)
        ==
      $(logs t.logs)
    ==
    ::
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
++  chat-sub
  |=  =flag:ch
  ^+  [*(list card) state]
  =/  =wire  /chat/(scot %p p.flag)/[q.flag]
  =/  have=?
    %-  ~(any in ~(key by wex.bowl))
    |=([w=^wire *] =(w wire))
  ?:  have  `state
  =;  =path
    :_  state
    [%pass wire %agent [our.bowl %chat] %watch path]~
  =-  [%chat (scot %p p.flag) q.flag %updates -]
  =/  last=(unit @da)  (~(get by chats-last-heard) flag)
  ?~  last  /
  /(scot %da u.last)
::
++  init-sequence
  ^+  [*(list card) state]
  =.  our-apps  ;;  our-apps:portal-config  
    %-  tail
    .^  update:alliance:treaty  %gx
        /(scot %p our.bowl)/treaty/(scot %da now.bowl)/alliance/noun
    ==
  =/  cards-1
    =+  ~(tap in our-apps)
    %+  turn  -
    |=  [=ship =desk]
    :*  %pass  /our-treaty/(scot %p ship)/[desk]  %agent
        [our.bowl %treaty]  %watch  /treaty/(scot %p ship)/[desk]
    ==
  =/  sub-init  [%sub [%collection portal-indexer '' '~2000.1.1']]
  =^  cards-2  state
    ?~  ch-feed  init-chats
    `state
  :_  state
  ;:  welp  cards-1  cards-2
  ::  sub to home page
  :~  [(~(act cards [[our.bowl %portal-store]]) sub-init)]
  ::  sub to our published apps
      [%pass /our-apps %agent [our.bowl %treaty] %watch /alliance]
  ==  ==
::
++  init-chats
  ^+  [*(list card) state]
  =/  chats=(list [=flag:ch =chat:ch])
    %~  tap  by
    .^  (map flag:ch chat:ch)  %gx
        [(scot %p our.bowl) %chat (scot %da now.bowl) /chats/chats]
    ==
  =|  new-feed=^ch-feed
  =|  feels-saw=(map [id:ch ship] feel:ch)
  =|  replies-saw=(map id:ch (set id:ch))
  =|  cards=(list card)
  =^  cards-1  state
  |-
  ?~  chats
    :-  cards
    %=  state
        ch-feed
      new-feed
      ::
        feels-seen  
      %-  ~(rep by feels-saw)
      |=  [[[i=id:ch s=ship] f=feel:ch] =_feels-seen]
      (~(put bi:mip feels-seen) i s f)
    ==
  ::
  =*  flag=flag:ch    flag.i.chats
  ::  initializes with newest 2000 msgs from a given channel
  =*  writs=writs:ch
    .^  writs:ch  %gx
        ;:  welp 
          /(scot %p our.bowl)/chat/(scot %da now.bowl)/chat
          /(scot %p p.flag)/[q.flag]
          /writs/newest/2.000/noun  
        == 
    ==
  =*  group=flag:groups  group.perm.chat.i.chats
  ::
  =/  when=@da
    =;  upd=(unit update:ch)
      (fall (bind upd head) *@da)
    (ram:log-on:ch log.chat.i.chats)
  =.  chats-last-heard  (~(put by chats-last-heard) flag when)
  =^  crds  state  (chat-sub flag)
  ::
  =;  [[fe=_new-feed sa=_feels-saw re=_replies-saw] *]
    $(new-feed (welp new-feed fe), feels-saw sa, replies-saw re, chats t.chats, cards crds)
  %^  %-  dip:on:writs:ch 
      $:  ^ch-feed 
          feels-saw=(map [id:ch ship] feel:ch)
          replies-saw=(map id:ch (set id:ch))
      ==
      writs
    [ch-feed feels-saw replies-saw]
  |=  [[=_new-feed =_feels-saw =_replies-saw] [* =writ:ch]]
  ^-  [(unit writ:ch) ? [_new-feed _feels-saw _replies-saw]]
  :+  `writ  |
      ::  dont count feels and replies to one's own messages
  :+  =/  replies  
        =+  ~(tap in replied.writ)
        (lent (skip - |=(=id:ch =(p.id p.id.writ))))
      =/  feels
        =+  ~(wyt by feels.writ)
        ?:((~(has by feels.writ) p.id.writ) (dec -) -)
      ::  dont add to feed if no feels or replies
      ?:  &(=(~ replies) =(~ feels))
        new-feed
      %+  snoc  new-feed
          :*  id.writ
              group
              flag
              replies
              feels
          ==
    %-  ~(rep by feels.writ)
    |=  [[s=ship f=feel:ch] =_feels-saw]
    (~(put by feels-saw) [id.writ s] f)
  (~(put by replies-saw) id.writ replied.writ)
  ::
  ~&  >>  ch-feed
  :_  state
  ;:  welp  cards-1
  [%pass /groups %agent [our.bowl %groups] %watch /groups]~
  [%pass /chats %agent [our.bowl %chat] %watch /briefs]~
  ==
  ::
::
::  (receive-mem:helper flag time.i.logs mid `mem)
++  receive-mem
  |=  [=flag:ch =time =id:ch memo=(unit memo:ch)]
  ^+  state
  =/  ch-feed-map  (malt ch-feed)
  ::  if msg deleted
  ?~  memo  
    ~&  >>>  "msg del"
    ::  TODO delete from state, check if it was reply to anything and update the tally there    
    state
  ?~  replying.u.memo
    ~&  >>  "msg no reply"
    state
  ::  do not count replies to people's own messages
  ?:  =(p.id p.u.replying.u.memo) 
    ~&  >>  "msg reply to urself"
    state
  ~&  >  "msg reply"
  state

:: (receive-feel:helper flag time.i.logs mid fro `new)
++  receive-feel
  |=  [=flag:ch =time =id:ch from=ship feel=(unit feel:ch)]
  ^+  state
  =/  ch-feed-map  (malt ch-feed)
  :: ::  do not count reacts to people's own messages
  ?:  =(p.id from)  state
  ::
  =/  had=(unit feel:ch)
    (~(get bi:mip feels-seen) id from)
  ?:  =(had feel)  state
  :: ::
  =?  ch-feed-map  &(?=(^ feel) !(~(has by ch-feed-map) id))
    =/  groups
      .^  (map flag:ch chat:ch)  %gx
          [(scot %p our.bowl) %chat (scot %da now.bowl) /chats/chats]
      ==
    %+  ~(put by ch-feed-map)  id
      :*  group:perm:(~(got by groups) flag)
          flag
          replies=0
          feels=0
      ==
  ::  if we had already counted a react from this ship on this msg,
  ::  subtract it from the tally
  ::
  =?  ch-feed-map  ?=(^ had)
    %+  ~(jab by ch-feed-map)  id 
    |=  a=[group=flag:groups channel=flag:ch replies=@ud feels=@ud]
    a(feels (dec feels.a))
  ::
  ::  if there is a new react, increment the tally
  ::
  =?  ch-feed-map  ?=(^ feel)
    %+  ~(jab by ch-feed-map)  id 
    |=  a=[=flag:groups flag:ch replies=@ud feels=@ud]
    a(feels +(feels.a))
  ::
  ::
  ::  always do bookkeeping
  ::
  =.  feels-seen
    ?~  feel  (~(del bi:mip feels-seen) id from)
    (~(put bi:mip feels-seen) id from u.feel)
  =.  chats-last-heard
    (~(put by chats-last-heard) flag time)
  ::
  =+  ~(tap by ch-feed-map)
  =.  ch-feed
    %+  murn  -
    |=  a=[=id:ch =flag:groups flag:ch replies=@ud feels=@ud]
    ?:  &(=(~ feels.a) =(~ replies.a))
      ~
    `a
  state
::
--
