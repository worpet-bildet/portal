/-   *treaty
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
|%
::
::  Basic Outline
::
::  item types
+$  type
  $%  [%inner %app ~]
      [%inner %group ~]
      [%inner %ship ~]
      [%inner %other ~]
      ::/inner/other:comment/[timestamp]
    ::
      [%outer %app ~]
      [%outer %group ~]
      [%outer %ship ~]
      :: TODO - types for structural definitions, cords for behavioural
      ::  definitions. e.g. /list/index; /list/bin; /list/drafts
      ::  ~zod:enditem/app:something/1
      ::  TODO find the most practical separator in hoon

      [%list ~]
    ::
      [%validity-store ~]
  ==
::
::  key of an item
+$  key  [=ship =type =cord]  ::  cord = /index/1, /index/~2000.1.1
::
::  all-items is the state of %portal-store
::  only %.y pointers
+$  all-items  (map key item)
::  TODO all-items -> items
::
::  TODO delete nested
::  delivered to the frontend
+$  nested-all-items  (map key cur-obj)
::
+$  cur-obj  [=item =lis-map]
+$  lis-map  (map key lis-obj)
+$  lis-obj  [item=?(~ item) =end-map]
+$  end-map  (map key ?(~ item))
::
::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::
::  Item Parts
::
+$  item  ::TODO how to handle nonitems in general?
  $:  =key
      blurb=@t
      =tags
      ::=general  :: TODO get rid of 'data', add general and bespoke
      =bespoke
      =meta
      =social
      =sig
  ==
::
::
+$  meta
  $:  =created-at
      =updated-at                      ::  when '~2000.1.1' means it has not been updated
      permissions=(list @p)            ::  not used yet. auto- ~[our.bowl].
      =reach                           ::  not used yet
      ::outside-sigs=(list signature)    ::  DELETE outside-sigs
  ==
::
::  comment -> reference your parent
::  retweet vs quote tweet
+$  social
  $:  =comments
      =ratings
      =reviews
      ::  retweets?
  ==
::
::  soc graph only for tags initially
::  implement tracking with SSS for MVP, then build custom remote scry for
::  graph traversal and fetching data
::
::
::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
::
::  Item Data
::
::  data which can only be changed by authorized parties
+$  general  0
  :: $:  ::  title=@t   ->  put into bespoke
  ::     ::  link=@t    ->  put into bespoke for other
  ::     :: decription=@t  ::  rename to blurb=@t
  ::     :: =tags
  ::     ::  =pictures  ->  put into bespoke for app
  ::     ::  image=@t   ->  into bespoke for e.g. list
  ::     ::  color=@t   ->  into bespoke for e.g. list
  :: ==
::
+$  tags  (list @t)
+$  pictures  (list @t)
::
::  data specific to the item type
::  TODO how to branch on path instead of just tag?
:: DIE
+$  bespoke
  $%  [[%nonitem %ship ~] =cord]
      [%nonitem-group key=[=ship type=[%nonitem %group ~] =cord] ~]
      [%nonitem-app key=[=ship type=[%nonitem %app ~] =cord] =treaty]
      [%enditem-other key=[=ship type=[%enditem %other ~] =cord] ~]
      [%enditem-app key=[=ship type=[%enditem %app ~] =cord] dist-desk=@t sig=signature =treaty]
      [%list-enditem-other key=[=ship type=[%list %enditem %other ~] =cord] =other-key-list]
      [%list-enditem-app key=[=ship type=[%list %enditem %app ~] =cord] =enditem-app-key-list]
      [%list-nonitem-app key=[=ship type=[%list %nonitem %app ~] =cord] =nonitem-app-key-list]
      [%list-nonitem-group key=[=ship type=[%list %nonitem %group ~] =cord] =group-key-list]
      [%list-nonitem-ship key=[=ship type=[%list %nonitem %ship ~] =cord] =ship-key-list]
      [%list-app key=[=ship type=[%list %app ~] =cord] =app-key-list]
      [%list-list key=[=ship type=[%list %list ~] =cord] =list-key-list]
      [%validity-store key=[=ship type=[%validity-store ~] =cord] =validity-records]
  ==
::
:: TODO
+$  list-item-meta        [added-to-list-at=cord curator-note=cord]
::
+$  key-text-list       (list [=key text=cord])
::
::  DIE
+$  list-key-list         (list [key=[=ship type=[%list type] =cord] text=cord])
+$  other-key-list        (list [key=[=ship type=[%enditem %other ~] =cord] text=cord])
+$  enditem-app-key-list  (list [key=[=ship type=[%enditem %app ~] =cord] text=cord])
+$  nonitem-app-key-list  (list [key=[=ship type=[%nonitem %app ~] =cord] text=cord])
+$  app-key-list          (list [key=[=ship type=$%([%enditem %app ~] [%nonitem %app ~]) =cord] text=cord])
+$  group-key-list        (list [key=[=ship type=[%nonitem %group ~] =cord] text=cord])
+$  ship-key-list         (list [key=[=ship type=[%nonitem %ship ~] =cord] text=cord])
::
::
+$  key-list  (list key)
+$  key-set  (set key)
::
+$  feed  (list [time=cord =ship =key])
+$  feed-items  (list item)
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
--
