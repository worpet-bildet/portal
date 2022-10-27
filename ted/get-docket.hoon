/-  spider
/+  strandio
=,  strand=strand:spider
^-  thread:spider
|=  arg=vase
=/  m  (strand ,vase)
::^-  form:m
=/  uarg  !<  (unit task:clay)  arg
?~  uarg
  (strand-fail:strand %no-arg ~)
=/  =task:clay  u.uarg
=/  =card:agent:gall  [%pass /foo %arvo %c task]
;<  ~  bind:m  (send-raw-card:strandio card)
;<  res=[wire sign-arvo]  bind:m  take-sign-arvo:strandio
(pure:m !>(+>:res))

