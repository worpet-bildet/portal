/-   *treaty, group-preview=meta, portal-data-0
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
  $?  %group
      %ship
      %app
      %collection
      %feed
      %validity-store
      %retweet
      %other
  ==
::
::  lens is how we see an item and how we treat it
::
+$  lens
  $?  %deleted   
      %temp  
      %index
      %def
      %global
      %personal
  ==
::
+$  key  [=struc =ship =cord time=cord]
::
+$  items  (map key item)
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
    $:  =key
        =lens
        =bespoke
        =meta
        =sig
    ==
  +$  update  item ::  rename to diff? or add +$  diff?
  --
::
::
+$  meta
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
  $%  [struc=%ship ~]
      [struc=%group =data:group-preview]
      [struc=%app dist-desk=@t sig=signature =treaty]
      [struc=%retweet blurb=@t ref=key]
      [struc=%feed =feed]
      [struc=%collection title=@t blurb=@t image=@t =key-list]
      [struc=%validity-store =validity-records]
      [struc=%other title=@t blurb=@t link=@t image=@t]
  ==
::
::
+$  feed  (list [time=cord =ship =key])
::
::
+$  key-list  (list key)
+$  key-set  (set key)
::
::
::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::
::  Item Metadata
::
::  made with jamming the whole item, so that nobody can fake an item
+$  sig  signature
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
::  Signatures
::
+$  signature   [hex=@ux =ship =life]
::
+$  sig-input
  $%  [%item =key =lens =bespoke =meta]     ::  for signing the item each time it is edited
      [%key =key]                      ::  for signing item by somebody from the outside (not in use yet)
      [%app =key desk-name=@tas]      ::  for signing apps by the distributor ship
  ==
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
  $@  ?
  $%  [%items =items]
      [%item item=?(~ item)]
      [%keys =key-set]  :: TODO change to key-list
      [%valid =valid]
  ==
::
::  comes from %portal-manager
+$  manager-result  ?
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
--
