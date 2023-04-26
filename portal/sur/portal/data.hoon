/-   *treaty, group-preview=meta
|%
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::
::  TODO define networking scheme? (sub updates), put/del updates
::  TODO json coversions such that FE doesnt have to input an optional arg
::  if they dont want to

::  OLD
::  /list/list
::     /list
::         /item
::
::  NEW  ->
::  TODO DISCUSS the items which are in lists should also be in main list/collection?
:: /maincol
::    /col1
      ::     /item1
      ::     /item2
      :: /col2
      :: /item1
      :: [all our items]
      :: [temp?]
      :: [~zods item]



:: Should we store everything in main collection?
:: E.g. do we store %validity-store there?
:: validity store is used for storing the validity of items
:: another example, do we store the feed or index there?
:: do we store only our items, or also stuff we sub to?
:: worth discussing over a call, we can do tmrw if you want

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
::  --  after everything works--
::  TODO-->  feed SSS?  YES, feed item? MAYBE
::  TODO - each bespoke has its own diffs? (SSS)
::  TODO decide how bespoke should look
::  (for now, with new modifications to existing functionality)
::  tags?                  NO
::  comments?              NO
::    ->  comments inside the item but with ID, so they can be added to soc gr
::    ->  the owner of the items will then also be the owner of the comment
::    ->  also think thru retweet(amp)/quote tweet/reply
::  items SSS?             NO
::  soc graph networking?  NO
::  optimistic rendering   NO
::
::  Basic Outline
::
::
+$  key  [=struc =ship =cord time=cord]
::  struc is the structure of the data
::  lens is how we see it and how we treat it
+$  struc
  $%  [%group ~]
      [%ship ~]
      [%app ~]
      [%collection ~]
      [%validity-store ~]
      [%other ~]
      ::  TODO  profile
  ==
::
+$  lens
  $%  [%deleted ~]   ::  should not put this over temp? or should you?
      [%temp ~]   ::  TODO metadata on temp? instead of overwriting use updated-at
                  ::  does this create a mess with subbing or no? it does destroy
                  ::  the globally unique namespace, i.e. it does not apply to temp items
      [%index ~]
      [%def ~]
  ==
::
::  TODO struc-lens validator
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
::  TODO a separate validation function for if lens is compatible with struc ?
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


  :: just =item, also for del

  ::  delete -> removes from main collection
  ::         -> adds %deleted lens

  :: %create
  ::   - new-item -> update
  ::   - edit-col -> update
  :: %append
  :: %prepend
  ::
  :: - simply get item
  :: %replace
  :: %edit
  :: %delete

::
::
+$  meta
  $:  created-at=@t
      updated-at=@t                    ::  '~2000.1.1' means it wasn't updated
                                       ::  TODO updated at '~2000.1.1' -> ''
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
::  each item in collection should have META data
::
::  data specific to the item type
+$  bespoke
  $%  [struc=[%ship ~] ~]
      [struc=[%group ~] =data:group-preview]
      [struc=[%app ~] dist-desk=@t sig=signature =treaty]
      [struc=[%collection ~] title=@t blurb=@t image=@t =key-list]  ::does it need link?
      ::  TODO /list/list becomes these 2 things:
      ::  1. to profile type?
      ::  2. default colletion to store all your collections
      [struc=[%validity-store ~] =validity-records]
      ::  TODO probably rename other to post?
      [struc=[%other ~] title=@t blurb=@t link=@t image=@t]
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
