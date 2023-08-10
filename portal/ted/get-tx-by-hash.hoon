/-  spider
/+  ethereum, ethio, *strandio
::
^-  thread:spider
=,
|%
++  parse-transaction-result
  =,  dejs:format
  |=  jon=json
  ~|  jon=jon
  ^-  transaction-result
  =-  ((ot -) jon)
  ::  why are some of these units and some not?
  ::  doesn't seem to correspond to (non)required values in eth schemas
  :~  'blockHash'^_~  :: TODO: fails if maybe-num?
      'blockNumber'^maybe-num:rpc:ethereum
      'transactionIndex'^maybe-num:rpc:ethereum
      from+so::(cu hex-to-num:ethereum so)
      to+so:dejs-soft:format:: maybe-num:rpc:ethereum
      input+so
      value+so:dejs-soft:format ::maybe-num:rpc:ethereum
  ==
::
++  transaction-result
  $:  block-hash=(unit @ux)
      block-number=(unit @ud)
      transaction-index=(unit @ud)
      from=@t
      to=(unit @t)
      input=@t
      value=(unit @t)  ::  assuming this will always be hex!
  ==
--
|^
|=  args=vase
=+  !<([url=@ta src=@p tx-hash=@t note=@t] args)
=/  m  (strand ,vase)
^-  form:m
::   time based fetching, try again after x time if you don't get data
::   1min - every 5 sec (12 times)
::   1-10min - every min (9 times)
::   10-60min - every 5 min (10 times)
::   1hr - 24 hr - every 15min (23*15=345 times)
  :: return tx-hash with transaction-result
=/  tracker  [time=~s5 count=0]
|-
?:  =(tracker [~s0 0])
  (pure:m !>([tx-hash src ~]))
;<  jon=json  bind:m
  %+  request-rpc:ethio  url
  :*  `'tx by hash'
      %eth-get-transaction-by-hash
      (hex-to-num:ethereum tx-hash)
  ==
?^  jon
  %-  pure:m 
  !>  [tx-hash src (parse-transaction-result jon) note]
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

