/-  spider, ch=chat, gr=groups, w=writ
/+  *strandio, mip
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
=/  flags  ~(tap in ~(key by chatmap))
~&  "%chats thread: starting outer loop"
|^
?~  flags
  ~&  "%chats thread: returning pure"
  (actions aggregate)
  :: (pure:m !>(~))
=/  flag  -:flags
~&  "%chats thread: starting inner loop"
::  we assume that per chat there is no more than 10k messages over last 24h
;<  last24h=writs:ch  bind:m
  %+  scry  writs:ch
  /gx/chat/chat/(scot %p -.flag)/[+.flag]/writs/newer/(scot %ud (sub now ~d1))/10.000/noun
~&  "%chats thread: scry success"
::
?:  =(last24h *writs:ch)
  ~&  "%chats thread: last 24h empty, moving on"
  $(flags +:flags)
=.  aggregate  (~(put by aggregate) flag last24h)
~&  "%chats thread: adding last 24h, moving on"
$(flags +:flags)
::
++  actions
  |=  aggregate=(mip:mip flag:ch time writ:w)
  =/  m  (strand ,vase)
  ^-  form:m
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
  :: xcvds

::
  (pure:m !>(~))
:: ;<  ~  bind:m  
::   ~&  "%chats thread: poking {<dude.u.p.pair>} with {<-.cage.u.p.pair>}"
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
--
::
:: =|  by-feels=(list [channel:gr id:ch])
:: =|  by-replies=(list [channel:gr id:ch])
:: =+  (tap by aggregate)


::  TODO 
::  create items efficiently
::  ->  to not have to scry twice (in portal.hoon) for every item created
::  ->  jer imam vec sve podatke
::  -> ne znam grupu jos? jel mogu taj dio isto efikasnije nego da se za svaki posebno? mozda nije problem tho?
