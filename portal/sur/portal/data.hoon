/-   *treaty
|%
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::
::  vase -u data types ->  !>(), arbitrary code?
::  Basic Outline
::
::  item types
+$  type
  $%  [%nonitem %group ~]
      [%nonitem %ship ~]
      [%nonitem %app ~]
      [%enditem %app ~]
      [%enditem %other ~]
      [%list ~]
      [%list %list ~]
      [%validity-store ~]
  ==
::
+$  item-type
  $%  [%nonitem %group ~]
      [%nonitem %ship ~]
      [%nonitem %app ~]
      [%enditem %app ~]
      [%enditem %other ~]
      [%validity-store ~]
  ==
::
+$  list-type
  $%  [%list ~]
      [%list %list ~]
  ==
::
::  key of an item
+$  key  [=ship type=path =cord]
+$  path-key  [knot knot knot ~]
::
+$  items  (map key item)
::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::
::  Item Parts
::
+$  item
  $:  =key
      =data
      =meta
      =social
      =sig
  ==
::
::
+$  data
  $:  =bespoke
      =general
  ==
::
+$  meta
  $:  =updated-at                      ::  '~2000.1.1' means it wasn't updated
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
::  TODO how to branch on path instead of just tag?
+$  bespoke
  $%  [%nonitem-ship ~]
      [%nonitem-group ~]
      [%nonitem-app =treaty]
      [%enditem-other ~]
      [%enditem-app dist-desk=@t sig=signature =treaty]
      [%list =key-list]
      [%list-list =list-key-list]
      [%validity-store =validity-records]
  ==
::
::  when inputting bespoke data, you sometimes don't need to input all of it
+$  bespoke-input
  $%  [%nonitem-ship ~]
      [%nonitem-group ~]
      [%nonitem-app ~]
      [%enditem-other ~]
      [%enditem-app dist-desk=@t]
      [%list =key-list]
      [%list-list =list-key-list]
      [%validity-store =validity-records]
  ==
::
::
+$  list-key-list         (list key=[=ship type=list-type =cord])
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
+$  v-result  (unit ?)
+$  validation-result  [validity-checker=@t =v-result reason=@t]
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
  $%  [%item =key =data =meta =social]     ::  for signing the item each time it is edited
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
+$  created-at  @t
+$  updated-at  @t
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
  $%  [%items items]
      [%keys key-set]
      [%item item]
      :: [%item nodeset]
      :: [%tags (set tag)]
      :: [%app-tags (set tag)]
      :: [%app (map tag nodeset)]
  ==
::
::  comes from %portal-manager
+$  manager-result  ?
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
--
