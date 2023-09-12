/-  spider, *tests-spec
/+  *strandio, portal, io=agentio
=,  strand=strand:spider
^-  thread:spider
~&  "%test thread: beggining"
|=  arg=vase
=/  m  (strand ,vase)
^-  form:m
=/  acts  !<(test-spec arg)
;<  our=ship  bind:m  get-our
|-
?~  acts   
  ~&  "%test thread: all tests passed"
  (pure:m !>(%.y))
=/  pair=test-pair  -:acts
~&  "%test-thread: new test-pair"
;<  ~  bind:m  
  ?~  p.pair 
    ~&  "%test thread: no poke"
    (sleep ~s0)
  ~&  "%test thread: poking {<dude.u.p.pair>} with {<-.cage.u.p.pair>}"
  %-  send-raw-card
  ^-  card:agent:gall
  (~(poke pass:io /pok) [[our dude.u.p.pair] cage.u.p.pair])
?~  q.pair
  ~&  "%test thread: no scry"
  $(acts +:acts)
=/  timers  
  ?~  timers.u.q.pair
    ~[~s0 ~s0..5000 ~s1 ~s2 ~s3 ~s4 ~s5]
  (need timers.u.q.pair)
;<  passed=vase  bind:m
  |-
  ?~  timers
    (pure:m !>(%.n))
  ~&  "%test thread: new timer for {<-:timers>}"
  ;<  ~  bind:m  (sleep -:timers)
  =,  u.q.pair
  ~&  "%test thread: scrying at path {<scry-path>}"
  ;<  scry-output=scry-mold  bind:m  (scry [scry-mold scry-path])
  ?:  (criterion scry-output)
    (pure:m !>(%.y))
  $(timers +:^timers)
?:  !<(? passed)
  ~&  "%test thread: test pair successful"
  $(acts +:acts)
~&  >>  "%test thread: test pair failed"
(pure:m !>(%.n))
