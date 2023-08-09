/-  spider
/+  *strandio, portal, io=agentio
=,  strand=strand:spider
^-  thread:spider
|=  arg=vase
=/  m  (strand ,vase)
^-  form:m
:: ::  criterion should input scry-mold and output loob
=/  item-mold  $:  p=(unit [=dude:agent:gall =cage])
                  $=  q  
                    %-  unit
                    $:  scry-mold=mold
                        scry-path=path
                        criterion=$-(* ?)
                        timers=(unit (list @dr))
                    ==
              ==
=/  acts  !<((list item-mold) arg)
;<  our=ship  bind:m  get-our
|-
?~  acts   
  ~&  >  "all tests passed"
  (pure:m !>(%.y))
=/  item=item-mold  -:acts
~&  >  "handling new item:"
~&  item
;<  ~  bind:m  
  ?~  p.item  ignore  ::  is this okay?
  %-  send-raw-card
  ^-  card:agent:gall
  (~(poke pass:io /pok) [[our dude.u.p.item] cage.u.p.item])
~&  "action done"
?~  q.item
  ~&  "scries dont exist"
  $(acts +:acts)
=/  timers  
  ?~  timers.u.q.item  
    ~&  "default timers set"
    ~[~s0 ~s0..2500 ~s0..5000 ~s1 ~s2 ~s5]
  ~&  "custom timers set"
  (need timers.u.q.item)
;<  passed=vase  bind:m
  |-
  ?~  timers
    (pure:m !>(%.n))
  ;<  ~  bind:m  (sleep -:timers)
  =,  u.q.item
  ;<  scry-output=scry-mold  bind:m  (scry [scry-mold scry-path])
  ?:  (criterion scry-output)
    (pure:m !>(%.y))
  $(timers +:timers)
?:  !<(? passed)
  ~&  >  "item passed"
  $(acts +:acts)
~&  >>>  "item didn't pass"
(pure:m !>(%.n))
