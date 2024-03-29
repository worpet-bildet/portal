/-  d=portal-data
/*  indexer  %ship  /desk/ship
|%
+$  indexer  $~(^indexer @p)
+$  portal-curator  indexer
+$  portal-indexer  indexer
::
+$  processing-payments  
  $+  processing-payments
  (map hex [=buyer =key:d =receiving-address])
+$  processed-payments
  $+  processed-payments
  (list [=buyer =key:d tx-hash=@t =time note=@t])
::
+$  receiving-address  @t
+$  eth-amount  @t
+$  buyer  ship
+$  hex  @t
+$  group  [name=@ta ships=(set ship)]
::
+$  default-curators  (set key:d)
+$  purge-timer  $~(%.y ?)
+$  purge-time  _~d1
+$  indexed-as-curator  $~(%.n ?)
+$  onboarded  $~(%.n ?)
+$  our-apps  (set [=ship =desk])
+$  dev-map   (map @t ship)
::
+$  manager-result
  $+  manager-result
  $@  ?
  $%  [%portal-devs (map @t ship)]
      [%bought-apps (map [=ship =desk] @t)]
      [%authorized-ships (set ship)]
      [%processing-payments =processing-payments]
      [%processed-payments =processed-payments]
      [%rpc-endpoint rpc-endpoint=@ta]
      [%receiving-address =receiving-address]
  ==
::
+$  state-0  $+  manager-state-0  [%0 *]
+$  state-1  $+  manager-state-1  [%1 *]
+$  state-2  $+  manager-state-2  [[%2 *] *]  :: state-2 had feed SSS stuff next to it
::
+$  state-3
  $+  manager-state-3
  $:  %3
      =portal-curator
      =portal-indexer
      =purge-timer
      =purge-time
      =indexed-as-curator
      =onboarded
  ==
::
+$  state-4
  $+  manager-state-4
  $:  %4
      =portal-curator
      =portal-indexer
      =purge-timer
      =purge-time
      =indexed-as-curator
      =onboarded
      =our-apps
  ==
::
--
