/-  spider, ch=chat, gr=groups, w=writ, portal-data
/+  *strandio, mip, io=agentio
=,  strand=strand:spider
^-  thread:spider
|=  arg=vase
=/  m  (strand ,vase)
^-  form:m
=|  aggregate=(map flag:ch writs:ch)
;<  our=ship  bind:m  get-our
;<  now=time  bind:m  get-time
;<  chatmap=(map flag:ch chat:ch)  bind:m  
    (scry (map flag:ch chat:ch) /gx/chat/chats/noun)
    ;<  col-exists=?  bind:m
      %+  scry  ?
      /gx/portal-store/item-exists/collection/(scot %p our)//groups-msgs/noun
=/  flags  ~(tap in ~(key by chatmap))
~&  "%chats-thread: starting outer loop"
;<  ~  bind:m
  |^
  ?~  flags
    ~&  "%chats-thread: returning pure"
    ::
    %-  send-raw-cards
    :_  (cards (sort-lists aggregate))
    ?:  col-exists
      edit-col-card
    create-col-card
  ::
  =/  flag  -:flags
  ~&  "%chats-thread: starting inner loop"
  ::  we assume that per chat there is no more than 10k messages over last 24h
  =/  m  (strand ,~)
  ^-  form:m
  ;<  last24h=writs:ch  bind:m
    %+  scry  writs:ch
    /gx/chat/chat/(scot %p -.flag)/[+.flag]/writs/newer/(scot %ud (sub now ~d1))/10.000/noun
  ~&  "%chats-thread: scry success"
  ::
  ?:  =(last24h *writs:ch)
    ~&  "%chats-thread: last 24h empty, moving on"
    $(flags +:flags)
  =.  aggregate  (~(put by aggregate) flag last24h)
  ~&  "%chats-thread: adding last 24h, moving on"
  $(flags +:flags)
  ::
  ++  sort-lists
    |=  aggregate=(mip:mip flag:ch time writ:w)
    =/  msgs  ~(tap bi:mip aggregate)  ::  (list [flag:ch time writ:w])
    ::  sorts by 1. greater count of replies/feels, 2. newer post
    =/  by-feels
      %+  swag  [0 25]
      %+  sort  msgs
      |=  [a=[=flag:ch =time =writ:w] b=[=flag:ch =time =writ:w]]
      =/  first   ~(wyt by feels.writ.a)
      =/  second  ~(wyt by feels.writ.b)
      ?:  =(first second)
        (gte time.a time.b)
      (gth first second) 
    =/  by-replies
      %+  swag  [0 25]
      %+  sort  msgs
      |=  [a=[=flag:ch =time =writ:w] b=[=flag:ch =time =writ:w]]
      =/  first   ~(wyt in replied.writ.a)
      =/  second  ~(wyt in replied.writ.b)
      ?:  =(first second)
        (gte time.a time.b)
      (gth first second) 
    ::
    ~&  "%chats-thread: created 2 sorted lists"
    [by-feels by-replies]
    ::
  ::
  ++  cards
    |=  [a=(list [=flag:ch =time =writ:w]) b=(list [=flag:ch =time =writ:w])]
    ^-  (list card:agent:gall)
    %-  chat-msg-cards
    (deduplicate (weld a b))
  ::
  ++  create-col-card
    ^-  card:agent:gall
    %-  ~(poke pass:io /make-col) 
    :-  [our %portal-manager] 
    :-  %portal-action
    !>  :*  %create  `our  ~  `'groups-msgs'  ~
            [%collection '' '' '' ~]
            ~  ~  ~
        ==
  ::
  ++  edit-col-card
    ^-  card:agent:gall
    %-  ~(poke pass:io /make-col) 
    :-  [our %portal-manager] 
    :-  %portal-action
    !>  :*  %edit  [%collection our '' 'groups-msgs']  ~  
            `[%collection ~ ~ ~ `*key-list:portal-data]
        ==
  ::
  ++  chat-msg-cards
    |=  a=(list [=flag:ch =time =writ:w])
    ^-  (list card:agent:gall)
    %-  head  %-  tail
    %^  spin  a  [*(list card:agent:gall) ~s0]
    |=  [p=[=flag:ch =time =writ:w] q=[cards=(list card:agent:gall) inc=@dr]]
    :-  p
    %=  q
      cards  (snoc cards.q (chat-msg-card (add now inc.q) p))
      inc  (add inc.q ~s0..0001)
    ==
  ::
  ++  chat-msg-card
    |=  [item-time=cord =flag:ch =time =writ:w]
    ^-  card:agent:gall
    %-  ~(poke pass:io /make-chat-msg) 
    :-  [our %portal-manager] 
    :-  %portal-action
    !>  :*  %create  `our  ~  `item-time  ~
            [%groups-chat-msg *flag:ch flag id:writ content:writ 0 0]
            [%collection our '' 'groups-msgs']^~
            ~  ~
        ==
  ::
  ++  deduplicate
    |=  [a=(list [=flag:ch =time =writ:w])]
    %-  flop  %-  tail
    %^  spin  a  *(list [=flag:ch =time =writ:w])  
    |=  [el=[=flag:ch =time =writ:w] st=(list [=flag:ch =time =writ:w])]
    ?~  (find [el]~ st)
      el^[el st]
    [el st]
  --
(pure:m !>(~))
:: ;<  ~  bind:m  
::   ~&  "%chats-thread: poking {<dude.u.p.pair>} with {<-.cage.u.p.pair>}"
::   %-  send-raw-card
::   ^-  card:agent:gall
::   (~(poke pass:io /pok) [[our dude.u.p.pair] cage.u.p.pair])
:: [ x=[p=~natnex-ronret q=%friends-of-door-link-2714]
::     y=~2023.9.5..20.38.06..cf6a
::       v
::     [ [ id=[p=~larlyt-nocset q=~2023.9.5..20.37.58..5645.a1ca.c083.126e]
::         feels=~
::         replied={[p=~natnex-ronret q=~2023.9.5..21.59.38..0c8b.4395.8106.24dd]}
::       ]
::       replying=~
::       author=~larlyt-nocset
::       sent=~2023.9.5..20.37.58..5645.a1ca.c083.126e
::       content=[%story p=[p=~ q=~['door brings immortality' [%break ~]]]]
::     ]
::   ]
::   [ x=[p=~faster-dilryd-mopreg q=%channel-21]
::     y=~2023.9.5..11.19.23..d56e
::       v
::     [ [ id=[p=~faster-dilryd-mopreg q=~2023.9.5..11.19.23..70e5.6041.8937.4bc6]
::         feels=[n=[p=~faster-dilryd-mopreg q=~.:heart_eyes:] l=~ r=~]
::         replied={}
::       ]
::       replying=[~ [p=~faster-dilryd-mopreg q=~2023.9.5..11.18.52..5333.3333.3333.3333]]
::       author=~faster-dilryd-mopreg
::       sent=~2023.9.5..11.19.23..70e5.6041.8937.4bc6
::       content=[%story p=[p=~ q=~['f' [%break ~]]]]
::     ]
::
:: =|  by-feels=(list [channel:gr id:ch])
:: =|  by-replies=(list [channel:gr id:ch])
:: =+  (tap by aggregate)


::  TODO 
::  create items efficiently
::  ->  to not have to scry twice (in portal.hoon) for every item created
::  ->  jer imam vec sve podatke
::  -> ne znam grupu jos? jel mogu taj dio isto efikasnije nego da se za svaki posebno? mozda nije problem tho?
