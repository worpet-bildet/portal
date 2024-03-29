/-   t=treaty, g=groups, w=writ, n=note, cur=curio
|%
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::
::
::
::  Basic Outline
::
::
::  struc is the structure of an item
::
+$  struc
  $+  struc
  $?  %group
      %ship
      %app
      %collection
      %feed
      %validity-store
      %retweet
      %review
      %blog
      %groups-chat-msg
      %groups-diary-note
      %groups-heap-curio
      %tip
      %other
  ==
::
::  lens is how we see an item and how we treat it
::
+$  lens
  $+  lens
  $?  %deleted
      %temp
      %index
      %global
      %personal
      %def
  ==
::
+$  key  
  $+  key
  [=struc =ship =cord time=cord]
::
+$  items  
  $+  items
  (map key item)
::
::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::
::
::
++  item
  =<  item
  |%
  +$  item
    $+  item
    $:  =key
        =lens
        =bespoke
        =meta
    ==
  +$  update  item ::  rename to diff? or add +$  diff?
  --
::
::
+$  meta
  $+  meta
  $:  created-at=@t
      updated-at=@t
      permissions=(list @p)            ::  not used yet
      =reach                           ::  not used yet
  ==
::
::
::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::
::  Item Data
::
::
::  data specific to the item struc
+$  bespoke
  $%  $+  bespoke-ship        [struc=%ship ~]
      $+  bespoke-group       [struc=%group =data:g]
      $+  bespoke-app         [struc=%app screenshots=(list @t) blurb=@t dist-desk=@t sig=signature =treaty:t eth-price=@t]
      $+  bespoke-review      [struc=%review blurb=@t rating=@ud]
      $+  bespoke-retweet     [struc=%retweet blurb=@t ref=key]
      $+  bespoke-feed        [struc=%feed =feed]
      $+  bespoke-collection  [struc=%collection title=@t blurb=@t image=@t =key-list]
      $+  bespoke-validity-store  [struc=%validity-store =validity-records]
      $+  bespoke-blog        [struc=%blog title=@t blurb=@t uri=@t path=@t image=@t]
      $+  bespoke-tip         [struc=%tip tipper=@p beneficiary=@p eth-amount=@t time=@t note=@t tx-hash=@t]
      $+  bespoke-groups-chat-msg
      $:  struc=%groups-chat-msg 
          group=flag:w
          channel=flag:w
          =id:w
          time-ref=@da
          content=content:w
          feels=@ud :: number of reacts at the time of sharing
          replies=@ud :: number of replies at the time of sharing
      ==
      $+  bespoke-groups-diary-note
      $:  struc=%groups-diary-note
          group=flag:n
          channel=flag:n
          =time
          time-ref=@da
          =essay:n
          feels=@ud
          replies=@ud
      ==
      $+  bespoke-groups-heap-curio
      $:  struc=%groups-heap-curio
          group=flag:cur
          channel=flag:cur
          =time
          time-ref=@da
          =heart:cur
          feels=@ud
          replies=@ud
      ==
      $+  bespoke-other  [struc=%other title=@t blurb=@t link=@t image=@t]
  ==
::
::
+$  feed  
  $+  feed
  (list [time=cord =ship =key])
::
::
+$  key-list  
  $+  key-list
  (list key)
+$  key-set
  $+  key-set
  (set key)
::
::
::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::
::  Signature Types
::
+$  signature  
  $+  signature
  [hex=@ux =ship =life]
::
::  for signing apps by the distributor ship
+$  sig-input  [%sign-app dev=ship dist-desk=@t]      
::
::
::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::
::  Validity Store Structures
::
+$  check-date  @da
+$  valid  (unit ?)
+$  validation-result  [validity-checker=@t =valid reason=@t]
::
+$  validation-time-map  ((mop check-date validation-result) gth)
++  valid-mop  ((on check-date validation-result) gth)
::
+$  validity-records  (map key validation-time-map)
::
::
::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::
::  Other
::
+$  ship-type  ?(%galaxy %star %planet %moon %comet)
::
+$  bool  ?
::
::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::
::  Not Implemented Yet
::
+$  reach
  $%  [%private whitelist=(list @p)]
      [%public blacklist=(list @p)]
  ==
::
::
::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::
::  Scry Results
::
::  TODO write scry paths next to results, with examples
::
::  comes from %portal-store
+$  store-result
  $+  store-result
  $@  ?
  $%  [%items =items]
      [%item item=?(~ item)]
      [%keys =key-set]  :: TODO change to key-list
      [%valid =valid]
  ==
::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
--
