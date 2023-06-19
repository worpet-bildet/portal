/-  spider
/+  ethereum, ethio, *strandio, *portal-app-pub
::
^-  thread:spider
|^
|=  args=vase
=+  !<([url=@ta tx-hash=@ux] args)
=/  m  (strand ,vase)
^-  form:m
::   time based fetching, try again after x time if you don't get data
::   1min - every 5 sec (12 times)
::   1-10min - every min (9 times)
::   10-60min - every 5 min (10 times)
::   1hr - 24 hr - every 15min (23*15=345 times)
=/  tracker  [time=~s5 count=0]
|-
?:  =(tracker [~s0 0])
  %-  pure:m  !>(~)
;<  jon=json  bind:m
  %+  request-rpc:ethio  url
  :*  `'tx by hash'
      %eth-get-transaction-by-hash
      tx-hash
  ==
?^  jon
  %-  pure:m  
  !>  (parse-transaction-result jon)
;<  ~  bind:m  (sleep time.tracker)
%=  $
    tracker
  ?:  =(~s5 time.tracker)
    ?:  =(12 count.tracker)
      [~m1 0]
    [~s5 +(count.tracker)]
  ::
  ?:  =(~m1 time.tracker)
    ?:  =(9 count.tracker)
      [~m5 0]
    [~m1 +(count.tracker)]
  ::
  ?:  =(~m5 time.tracker)
    ?:  =(10 count.tracker)
      [~m15 0]
    [~m5 +(count.tracker)]
  ::    
  ?:  =(~m15 time.tracker)
    ?:  =(345 count.tracker)
      [~s0 0]  :: we are finished
    [~m15 +(count.tracker)]
  ::
  [~s0 0]
==
--

