/-  spider, *portal-action
/+  *strandio, portal
=,  strand=strand:spider
^-  thread:spider
|=  arg=vase
=/  m  (strand ,vase)
^-  form:m
::  criterion should input scry-mold and output loob
=+  !<([=action scry-mold=mold scry-path=path criterion=$-(* ?) timers=(unit (list @dr))] arg)
;<  our=ship  bind:m  get-our
;<  ~  bind:m
  %-  send-raw-card
  ^-  card:agent:gall
  (~(act cards:portal [our %portal-manager]) action)
=/  timers  ?~  timers  ~[~s0 ~s0..2500 ~s0..5000 ~s1 ~s2 ~s5]  (need timers)
=/  n  0
|-  
?:  =((lent timers) n)  (pure:m !>(%.n))
;<  ~  bind:m  (sleep (snag n timers))
;<  scry-output=scry-mold  bind:m  (scry scry-mold scry-path)
?:  (criterion scry-output)  (pure:m !>(%.y))
$(n +(n))
