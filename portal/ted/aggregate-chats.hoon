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
|-
?~  flags
  ~&  "chats thread: returning pure"
  (pure:m !>(~))
=/  flag  -:flags
~&  "chats thread: starting inner loop"
=/  start  0
=/  writs  *writs:ch
;<  last24h=vase  bind:m
  ::
  |-
  ~&  >>>  start
  ;<  next50=writs:ch  bind:m
    %+  scry  writs:ch
      PLAY WITH SCRY IN DOJO, UNDERSTAND HOW IT WORKS
    /gx/chat/chat/(scot %p -.flag)/[+.flag]/writs/newer/(scot %ud start)/50/noun 
  :: ;<  other50=writs:ch  bind:m
  ::   %+  scry  writs:ch
  ::   /gx/chat/chat/(scot %p -.flag)/[+.flag]/writs/older/(scot %ud (add start 50))/50/noun 
  ~&  "chats thread: scry success"
  ::
  ~&  >  +<:(pry:on:writs:ch next50)
  :: ~&  >>  +<:(pry:on:writs:ch other50)
  ?~  earliest=(pry:on:writs:ch next50)
    (pure:m !>(writs))
  ~&  >  +<:earliest
  ~&  >>  (sub now ~d1)
  ?:  (gte +<:earliest (sub now ~d1))
    ~&  "chats thread: new inner loop iteration, scrying next 50"
    $(start (add start 50), writs (uni:on:writs:ch writs next50))
  ~&  "chats thread: inner loop done"
  (pure:m !>(writs))
::
=/  last24h  !<(writs:ch last24h)
?:  =(last24h *writs:ch)
  ~&  "chats thread: last 24h empty, moving on"
  $(flags +:flags)
=.  aggregate  (~(put by aggregate) flag last24h)
~&  "chats thread: adding last 24h, moving on"
$(flags +:flags)
::
:: =|  by-feels=(list [channel:gr id:ch])
:: =|  by-replies=(list [channel:gr id:ch])

::  TODO 
::  create items efficiently
::  ->  to not have to scry twice (in portal.hoon) for every item created
::  ->  jer imam vec sve podatke
::  limit loop to 500 msgs? to 1000 msgs?
::  
:: ;<  ~  bind:m  
::   ?~  p.item  ignore  ::  is this okay?
::   %-  send-raw-card
::   ^-  card:agent:gall
::   (~(poke pass:io /pok) [[our dude.u.p.item] cage.u.p.item])
