/-  spider
/+  ethereum, ethio, *strandio
::
^-  thread:spider
|=  args=vase
=+  !<([url=@ta tx-hash=@ux] args)
=/  m  (strand ,vase)
^-  form:m
;<  =json  bind:m
  %+  request-rpc:ethio  url
  :*  `'tx by hash'
      %eth-get-transaction-by-hash
      tx-hash
  ==
  TODO 
  get value
  time based fetching
  1min - every 5 sec
  1-10min - every min
  10-60min - every 5 min
  1hr - 24 hr - every 30min
~&  >  json
%-  pure:m  
!>  (parse-transaction-result:rpc:ethereum json)
