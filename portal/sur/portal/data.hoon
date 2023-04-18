/-   *treaty
|%
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::
::
::   things we are doing
:: -->  renaming
:: -->  key-path
      ::/inner/other:comment/[timestamp]
      :: TODO - types for structural definitions, cords for behavioural
      ::  definitions. e.g. /list/index; /list/bin; /list/drafts
      ::  ~zod:enditem/app:something/1
      ::  TODO find the most practical separator in hoon

:: -->  flat data
:: -->  api (poke and scry)
:: -->  networking scheme? (sub updates), put/del
:: -->  feed SSS?  YES, feed item? MAYBE
::
::
::  tags?                  NO
::  comments?              NO
::  items SSS?             NO
:: -soc graph networking?  NO
::
::  vase -u data types ->  !>(), arbitrary code?
::  Basic Outline
::
::  NEW
::  item types
:: +$  type
::   $%  [%inner %app ~]
::       [%inner %group ~]
::       [%inner %other ~]
::     ::
::       [%outer %app ~]
::       [%outer %group ~]
::       [%outer %ship ~]
::     ::
::     ::  should these be prefixed by %outer?
::       [%collection ~]  ::  prev list
::     ::
::       [%validity-store ~]
::   ==
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
+$  key  [=ship type=path =cord]  ::  cord = /index/1, /index/~2000.1.1
+$  path-key  [knot knot knot ~]
::
+$  items  (map key item)
::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::
::  NEW
::  Item Parts
::
:: +$  item           ::TODO how to handle nonitems in general?
::   $:  =key
::       blurb=@t
::       ::=tags      :: do we want to put tags here?, or not even that
::       ::=general
::       =bespoke
::       =meta
::       ::=social     ::  remove all ratings/comments/reviews from item
::       =sig
::   ==

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
::  put general first?
+$  data
  $:  =bespoke
      =general
  ==
::
::NEW
:: +$  meta
::   $:  =created-at
::       =updated-at                      ::  when '~2000.1.1' means it has not been updated
::       permissions=(list @p)            ::  not used yet. auto- ~[our.bowl].
::       =reach                           ::  not used yet
::       ::outside-sigs=(list signature)    ::  DELETE outside-sigs
::   ==

::
+$  meta
  $:  =updated-at                      ::  '~2000.1.1' means it wasn't updated
      permissions=(list @p)            ::  not used yet. auto- ~[our.bowl].
      =reach                           ::  not used yet
      outside-sigs=(list signature)    ::  not used yet
  ==
::
::
::  comment -> reference your parent
::  retweet vs quote tweet
:: +$  social
::   $:  =comments
::       =ratings
::       =reviews
::       ::  retweets?
::   ==
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
::  NEW
::  data which can only be changed by authorized parties
::+$  general  0
  :: $:  ::  title=@t   ->  put into bespoke
  ::     ::  link=@t    ->  put into bespoke for other
  ::     :: decription=@t  ::  rename to blurb=@t
  ::     :: =tags
  ::     ::  =pictures  ->  put into bespoke for app
  ::     ::  image=@t   ->  into bespoke for e.g. list
  ::     ::  color=@t   ->  into bespoke for e.g. list
  :: ==
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
::
::  NEW
:: +$  bespoke
::   $%  [[%outer %ship ~] ~]
::       [[%outer %group ~] ~]
::       [[%outer %app ~] =treaty]
::       [[%inner %other ~] ~]
::       [[%inner %app ~] dist-desk=@t sig=signature =treaty]
::       [[%list ~] =key-list]
::       [[%validity-store ~] =validity-records]
::   ==

::
::  data specific to the item type
+$  bespoke
  $%  [[%nonitem %ship ~] ~]
      [[%nonitem %group ~] ~]
      [[%nonitem %app ~] =treaty]
      [[%enditem %other ~] ~]
      [[%enditem %app ~] dist-desk=@t sig=signature =treaty]
      [[%list ~] =key-list]
      [[%list %list ~] =list-key-list]
      [[%validity-store ~] =validity-records]
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
  $%  [%items =items]
      [%keys =key-set]
      [%item item=?(~ item)]
      [%valid =valid]
  ==
::
::  comes from %portal-manager
+$  manager-result  ?
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
--
