/-  spider, *portal-action
/+  *strandio, *portal
=,  strand=strand:spider
^-  thread:spider
|=  arg=vase
=/  m  (strand ,vase)
^-  form:m
=+  !<  $:  act=action
            scry-path=path
            criterion=$-(scry-output=* ?)
            timers=$~(~[~s0 ~s0..2500 ~s0..5000 ~s1 ~s2 ~s5] (list @dr))
        ==
    arg
:: pass action
:: receive ack?
:: wait based on timer1
:: scry

;<  t1=@da  bind:m  get-time
=/  =task:behn  [%wait (add delay t1)]
=/  =card:agent:gall  [%pass /timer %arvo %b task]
;<  ~  bind:m  (send-raw-card card)
;<  res=(pair wire sign-arvo)  bind:m  take-sign-arvo
?>  ?=([%timer ~] p.res)
?>  ?=([%behn %wake *] q.res)
?~  error.q.res
  ;<  t2=@da  bind:m  get-time
  (pure:m !>(~))
(pure:m !>(~))
