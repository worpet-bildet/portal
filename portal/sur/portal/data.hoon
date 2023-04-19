/-   *treaty, group-preview=meta
|%
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::
::  TODO decide how bespoke should look
::  (for now, no new modifications to existing functionality)
::  TODO define poke API
::  TODO define networking scheme? (sub updates), put/del updates
::
::  TODO define state transition with $&
::  TODO define state transition of existing items
  :: /list/nonitem/group ~2000.1.1
  :: /list/nonitem/app   ~2000.1.1
  :: /list/enditem/other ~2000.1.1    ->   /collection
  :: /list/nonitem/ship  ~2000.1.1    ->   /collection [the time of state transtion] (will this work?)
  :: /list/list          ~2000.1.1    ->   /collection ~2000.1.1
::  TODO purge
  ::  purge all cols which are not our or worpet-bildet
  ::  keep: all our items, all items in our col, all items in worpet-bildets cols
::
::  after everything works:
::  TODO-->  feed SSS?  YES, feed item? MAYBE
::  tags?                  NO
::  comments?              NO
::  items SSS?             NO
::  soc graph networking?  NO
::  optimistic rendering   NO
::
::  Basic Outline
::
::::  TODO change to +$  key  [=ship =type time=cord]
+$  path-key  [knot knot knot knot ~]
::
+$  key  [=type =ship time=cord]  :: TODO switch ship and type
::  struc is the structure of the data
::  lens is how we see it and how we treat it
+$  type
  $%  $:  struc=[%group ~]
          lens=$%([%outer ~])
      ==
      ::
      $:  struc=[%ship ~]
          lens=$%([%outer ~])
      ==
      ::
      $:  struc=[%app ~]
          lens=$%([%def ~] [%outer ~])
      ==
      ::
      $:  struc=[%other ~]
          lens=$%([%def ~])
      ==
      ::
      $:  struc=[%collection ~]
          lens=$%([%def ~] [%index ~])  ::  TODO make [%def ~] actually default
      ==
      ::
      $:  struc=[%validity-store ~]
          lens=$%([%def ~])
      ==
  ==
::
::
::
+$  items  (map key item)
::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::
::  NEW
::  Item Parts
::
+$  item           ::TODO how to handle nonitems in general?
  $:  =key
      =bespoke
      =meta
      =sig
  ==
::
::
+$  meta
  $:  created-at=@t
      updated-at=@t                    ::  '~2000.1.1' means it wasn't updated
      permissions=(list @p)            ::  not used yet. auto- ~[our.bowl].
      =reach                           ::  not used yet
  ==
::
::
::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::
::  Item Data
::
:: +$  general
::   $:  title=@t
::       link=@t
::       blurb=@t
::       image=@t
::     ::  color=@t  are we using this for anything?
::   ==
::
::
::  data specific to the item type
+$  bespoke
  $%  [[%ship ~] ~]
      [[%group ~] =data:group-preview]   ::   $:  title=cord
                                  ::       description=cord
                                  ::       image=cord
                                  ::       cover=cord
      ::  TODO probably rename other to post?
      [[%other ~] title=@t link=@t blurb=@t image=@t]
      [[%app ~] dist-desk=@t sig=signature =treaty]
      [[%collection ~] title=@t blurb=@t image=@t =key-list]  ::does it need link?
      [[%validity-store ~] =validity-records]
  ==
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
  $%  [%item =key =bespoke =meta]     ::  for signing the item each time it is edited
      [%key =key]                            ::  for signing item by somebody from the outside (not in use yet)
      [%app =key desk-name=@tas]            ::  for signing apps by the distributor ship
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
