/-  spider, portal-signature, portal-data
/+  strandio, portal
=,  strand=strand:spider
=,  card=card:agent:gall
=>
|%
+$  subs
  $:  yen=(jug duct ship)
      ney=(jug ship duct)
      nel=(set duct)
  ==
--
^-  thread:spider
|=  arg=vase
=/  m  (strand ,vase)
^-  form:m
=+  !<  $:  dist-desk=@t
        src=@p
        our=@p 
        now=@da 
        sig=signature:portal-signature
        =item:portal-data
        ==
      arg
=/  p  ship.sig
::
?:  (validate-sig:portal dist-desk src our now sig)
  %-  pure:m
  !>  [%.y dist-desk src our now sig item]
::
::  sub to public updates for specified ship
=/  c1=card  [%pass /sub-pubkeys %arvo %j %public-keys (silt ~[ship.sig])]
;<  ~  bind:m  (send-raw-card:strandio c1)
::
::  take response from jael & print it
;<  res=[=wire =sign-arvo]  bind:m  take-sign-arvo:strandio
?>  ?=([%sub-pubkeys ~] wire.res)
?>  ?=([%jael %public-keys *] sign-arvo.res)
::
;<  ~  bind:m  (sleep:strandio ~s0..1000)
=/  tracker  [time=~s0..1000 count=0]
|-
?:  =(tracker [~s0 0])
  %-  pure:m
  !>  [%.n dist-desk src our now sig item]
::
;<  now=time  bind:m  get-time:strandio
?:  (validate-sig:portal dist-desk src our now sig)
  %-  pure:m
  !>  [%.y dist-desk src our now sig item]
::
;<  ~  bind:m  (sleep:strandio time.tracker)
%=  $
    tracker
  ?:  =(~s0..1000 time.tracker)  [~s1 0]
  ::
  ?:  =(~s1 time.tracker)
    ?:  =(10 count.tracker)
      [~s3 0]
    [~s1 +(count.tracker)]
  ::
  ?:  =(~s3 time.tracker)
    ?:  =(5 count.tracker)
      [~s0 0]
    [~s3 +(count.tracker)]
  ::    
  [~s0 0]
==

:: >   "1. validating sig result:"
:: >   "time: ~2023.7.4..16.14.52..9694"
:: >   "lyf: ~"
:: >>  %.n
:: >   "subbing to jael upds"
:: >   "receiing jael resp"
:: >   "0. validating sig result:"
:: >   "time: ~2023.7.4..16.14.52..9694"
:: >   "lyf: ~"
:: >>  %.n
:: >   "timer 5s"
:: >   "1. validating sig result:"
:: >   "time: ~2023.7.4..16.14.57..974e"
:: >   "lyf: [~ 1]"
:: >>  %.y
:: >   "2.subbing to jael upds"
:: >   "2.receiing jael resp"
:: >   "2.validating sig result:"
:: >   "time: ~2023.7.4..16.14.57..974e"
:: >   "lyf: [~ 1]"
:: >>  %.y
:: >   "returning pure"
:: >>  "app validation thread failed"

::
::  TODO test
::  0.001 seconds -> does it help?
::  0.01
::  0.1
::  1
::  1
::  1
