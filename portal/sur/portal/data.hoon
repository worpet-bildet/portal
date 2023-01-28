/-   *docket
/+  mip
|%
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::
::  Basic Outline
::
::  item types
+$  type  ?(%app %curator-page %validity-store %list %group %ship %other @tas)
::
::  id of an item
+$  id  [p=@p q=@t r=type]
::
::  unique pointer to an item in whole portal namespace
::  if points-to-item is %.n, then it points to something outside of portal
+$  pointer  [points-to-item=? =id]
::
::  all-items is the state of %portal-store
::  only %.y pointers
+$  all-items  (map pointer item)
::
::  delivered to the frontend
+$  nested-all-items  (map pointer cur-obj)
::
+$  cur-obj  [=item =lis-map]
+$  lis-map  (map pointer lis-obj)
+$  lis-obj  [=item =end-map]
+$  end-map  (map pointer item)
::
::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::
::  Item Parts
::
::
::
+$  item
  $:  =data
      =meta-data
      =social
      =item-sig
  ==
::
::
+$  data
  $:  =general
      =bespoke
  ==
::
+$  meta-data
  $:  =id
      =updated-at                      ::  when '~2000.1.1' means it has not been updated
      permissions=(list @p)            ::  not used yet. auto- ~[our.bowl].
      =reach                           ::  not used yet
      outside-sigs=(list signature)    ::  not used yet
  ==
::
+$  social
  $:  =comments
      =ratings
      =reviews
  ==
::
::
::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::
::  Item Data
::
::  data which can only be changed by authorized parties
+$  general
  $:  title=@t
      link=@t
      description=@t
      =tags
      =properties
      =pictures
      image=@t
      color=@t
  ==
::
+$  tags  (list @t)
+$  properties  (map @t @t)
+$  pictures  (list @t)
::
::  data specific to the item type
+$  bespoke
  $%  [%other ~]
      [%curator-page recommendations=[type=%list =list-pointer-list]]
      [%list recommendations=[type=?(%other %app %group %ship) =end-item-pointer-list]]
      [%app dist-desk=@t sig=signature desk-hash=@uv =docket]
      [%validity-store =validity-records]
  ==
::
::  when inputting bespoke data, you sometimes don't need to input all of it
+$  bespoke-input
  $%  [%other ~]
      [%curator-page recommendations=[type=%list =list-pointer-list]]
      [%list recommendations=[type=?(%other %app %group %ship) =end-item-pointer-list]]
      [%app dist-desk=@t]
      [%validity-store =validity-records]
  ==
::
+$  list-pointer-list       (list pointer=[points-to-item=%.y id=[p=@p q=@t r=%list]])
+$  end-item-pointer-list   (list pointer=[points-to-item=?(%.y %.n) id=[p=@p q=@t r=?(%other %app %group %ship)]])
::
::  recommendations not used currently
::  type defines the type of where pointers point to
:: +$  recommendations
::   $%  [type =pointer-list]
::       [%mixed =pointer-list]
::   ==
::
+$  pointer-list  (list pointer)
+$  pointer-set  (set pointer)
::
::
::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::
::  Item Metadata
::
::  made with jamming the whole item, so that nobody can fake an item
+$  item-sig  signature
::
::
::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::
::  Item Social Data
::
+$  ratings  (map @p rating)
+$  rating
  $:  rating-num=@ud
      =updated-at
      =created-at
  ==
::
+$  comments  (map com-key comment)
+$  comment
  $:  text=@t
      =updated-at
  ==
+$  com-key  [=ship =created-at]
::
+$  reviews  (map ship review)
+$  review
  $:  text=@t
      hash=@uv
      is-current=?                    ::  used only for apps
      is-safe=?                       ::  used only for apps
      =updated-at
      =created-at
      =signature                      ::  not used yet
  ==
::
::
::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::
::  Validity Store Structures
::
+$  check-date  @da
+$  validation-result  [validity-checker=@t result=?(%.y %.n) reason=@t]
::
+$  validation-time-map  ((mop check-date validation-result) lth)
++  valid-mop  ((on check-date validation-result) lth)
::
+$  validity-records  (map pointer validation-time-map)
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
  $%  [%item =data =meta-data =social]     ::  for signing the item each time it is edited
      [%id =id]                            ::  for signing item by somebody from the outside (not in use yet)
      [%app =id desk-name=@tas]            ::  for signing apps by the distributor ship
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
+$  created-at  @t
+$  updated-at  @t
::
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
--
