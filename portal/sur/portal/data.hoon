/-   *docket
|%
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::
::  Basic Outline
::
::  item types
+$  type
  $%  path
      [%nonitem ~]
        [%nonitem %group ~]
        [%nonitem %ship ~]
    ::
      [%enditem ~]
        [%enditem %app ~]
        [%enditem %other ~]
    ::
      [%list ~]
        [%list %nonitem ~]
          [%list %nonitem %group ~]
          [%list %nonitem %ship ~]
        [%list %enditem ~]
          [%list %enditem %other ~]
          [%list %enditem %app ~]
        [%list %list ~]
    ::
      [%validity-store ~]
  ==
::
::  key of an item
+$  key  [=ship =type =cord]
::
::  all-items is the state of %portal-store
::  only %.y pointers
+$  all-items  (map key item)
::
::  delivered to the frontend
+$  nested-all-items  (map key cur-obj)
::
+$  cur-obj  [=item =lis-map]
+$  lis-map  (map key lis-obj)
+$  lis-obj  [=item =end-map]
+$  end-map  (map key ?(~ item))
::
::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::
::  Item Parts
::
+$  item  ::TODO how to handle nonitems in general?
  $:  =data
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
  $:  =updated-at                      ::  when '~2000.1.1' means it has not been updated
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
  $%  [%nonitem-ship key=[=ship type=[%nonitem %ship ~] =cord] ~]
      [%nonitem-group key=[=ship type=[%nonitem %group ~] =cord] ~]
      [%enditem-other key=[=ship type=[%enditem %other ~] =cord] ~]
      [%enditem-app key=[=ship type=[%enditem %app ~] =cord] dist-desk=@t sig=signature desk-hash=@uv =docket]
      [%list-enditem-other key=[=ship type=[%list %enditem %other ~] =cord] =other-key-list]
      [%list-enditem-app key=[=ship type=[%list %enditem %app ~] =cord] =app-key-list]
      [%list-nonitem-group key=[=ship type=[%list %nonitem %group ~] =cord] =group-key-list]
      [%list-nonitem-ship key=[=ship type=[%list %nonitem %ship ~] =cord] =ship-key-list]
      [%list-list key=[=ship type=[%list %list ~] =cord] =list-key-list]
      [%validity-store key=[=ship type=[%validity-store ~] =cord] =validity-records]
  ==
::
::  when inputting bespoke data, you sometimes don't need to input all of it
+$  bespoke-input
  $%  [%nonitem-ship ~]
      [%nonitem-group ~]
      [%enditem-other ~]
      [%enditem-app dist-desk=@t]
      [%list-enditem-other =other-key-list]
      [%list-enditem-app =app-key-list]
      [%list-nonitem-group =group-key-list]
      [%list-nonitem-ship =ship-key-list]
      [%list-list =list-key-list]
      [%validity-store =validity-records]
  ==
::
+$  key-text-list       (list [=key text=cord])
::
+$  list-key-list       (list [key=[=ship type=[%list type] =cord] text=cord])
+$  app-key-list        (list [key=[=ship type=[%enditem %app ~] =cord] text=cord])
+$  other-key-list      (list [key=[=ship type=[%enditem %other ~] =cord] text=cord])
+$  group-key-list      (list [key=[=ship type=[%nonitem %group ~] =cord] text=cord])
+$  ship-key-list       (list [key=[=ship type=[%nonitem %ship ~] =cord] text=cord])
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
+$  result  (unit ?)
+$  validation-result  [validity-checker=@t =result reason=@t]
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
  $%  [%item =data =meta =social]     ::  for signing the item each time it is edited
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
