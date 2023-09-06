/-  spider, ch=chat, gr=groups
/+  *strandio
=,  strand=strand:spider
^-  thread:spider
|=  arg=vase
=/  m  (strand ,vase)
^-  form:m
=|  aggregate=(map flag:ch writs:ch)
=|  by-feels=(list [channel:gr id:ch])
=|  by-replies=(list [channel:gr id:ch])
;<  our=ship  bind:m  get-our
;<  now=time  bind:m  get-time
;<  chatmap=(map flag:ch chat:ch)  bind:m  
    (scry (map flag:ch chat:ch) /gx/chat/chats/noun)
=/  flags  ~(tap in ~(key by chatmap))
~&  "chats thread: starting outer loop"
|^
?~  flags
  ~&  "chats thread: returning pure"
  (pure:m !>(~))
=/  flag  -:flags
~&  "chats thread: starting inner loop"
::  we assume that per chat there is no more than 10k messages over last 24h
;<  last24h=writs:ch  bind:m
  %+  scry  writs:ch
  /gx/chat/chat/(scot %p -.flag)/[+.flag]/writs/newer/(scot %ud (sub now ~d1))/10.000/noun
~&  "chats thread: scry success"
::
?:  =(last24h *writs:ch)
  ~&  "chats thread: last 24h empty, moving on"
  $(flags +:flags)
=.  aggregate  (~(put by aggregate) flag last24h)
~&  "chats thread: adding last 24h, moving on"
$(flags +:flags)
++  actions
  |=  aggregate=(map flag:ch writs:ch)
  
--
::
:: =|  by-feels=(list [channel:gr id:ch])
:: =|  by-replies=(list [channel:gr id:ch])
:: =+  (tap by aggregate)


::  TODO 
::  create items efficiently
::  ->  to not have to scry twice (in portal.hoon) for every item created
::  ->  jer imam vec sve podatke
::  
