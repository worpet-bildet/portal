/-  spider
/+  *strandio
=,  strand=strand:spider
^-  thread:spider
|=  arg=vase
=/  m  (strand ,vase)
^-  form:m
=/  delay=@dr  (need !<((unit @dr) arg))
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
