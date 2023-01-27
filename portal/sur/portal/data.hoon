/-   *docket
|%
::
+$  check-date  @da
+$  validation-result  [result=?(%.y %.n) validity-checker=@t reason=@t]
+$  validation-by-time  ((mop check-date validation-result) lth)
++  valid  ((on check-date validation-result) lth)

::
+$  validity-records  (map pointer validation-by-time)
::

::
::  POINTER parsing rules:
::
::    if =(points-to-item %.n)
::  %app  ->  (weld (weld (scow %p ship) "/") (trip title))  ->  ~zod/app-name
::  %group  ->  (weld (weld (scow %p ship) "/") (trip title))  ->  ~zod/group-name
::  %ship  ->  ship  ->  ~zodž
::  depending on type, q has different meaning
::
::    if =(points-to-item %.y)
::  you can find any item in the global portal namespace with the pointer
::  (assuming right permissions)
::  q means time created-at
::
::
::  ITEM parsing rules:
::
::    if =(type %app)
::  link  ->  distributor desk
::  pictures  ->  screenshots
::  reviews  ->  hash should be compared to hash.docket.bespoke-data
::  name  ->  should be same as in desk
::
::  only %.y pointers
+$  all-items  (map pointer item)
::
+$  type  ?(%app %curator-page %validity-store %list %group %ship %other @tas)
::
+$  pointer  [points-to-item=? =id]
+$  id  [p=@p q=@t r=type]
::
+$  item
  $:  =hard-data
      =meta-data
      =editable-data
      =bespoke-data
      =usr-data
      =item-sig
  ==
::
+$  item-sig  signature  ::  made with jamming the whole item, so that nobody can fake an item
::
::  we need signatures for:
+$  sig-input
  $%  :: for signing the item each time it is edited
      [%item =hard-data =meta-data =editable-data =bespoke-data =usr-data]
      :: for signing item by somebody from the outside (not in use yet)
      [%id =id]
      ::  for signing apps by the distributor ship
      [%app =id desk-name=@tas]
  ==
::  unchangeable item data
+$  hard-data
  $:  =id
  ==
::
::  data which can only be changed by authorized parties
+$  editable-data
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
+$  meta-data
  $:  permissions=(list @p)  ::auto- ~[our.bowl]. not even enforced
      =updated-at  ::  when ~2000.1.1 means it has not been updated
      =reach
      outside-sig=signature
      ::  coming from outside
      ::  affirmation of the original thing the item points to. e.g. a group approves you to display them
      ::  e.g.  app validates your item which represents it
  ==
::
::  data which comes from other users, e.g. leaving comments or ratings
+$  usr-data
  $:  =comments
      =ratings
      =reviews
  ==
::
::  when inputting bespoke data, you sometimes don't need to input all of it
+$  bespoke-input
  $%  [%other ~]
      [%curator-page =recommendations] ::should only include other lists?
      [%list =recommendations]
      [%app dist-desk=@t]
      [%validity-store =validity-records]
      ::%app needs links to - github repo, dst-desk, group link, support link?
  ==
::
::  data specific to the item type
+$  bespoke-data  ::  needs to be consistent with item type (tags should be subset)
  $%  [%other ~]
      [%curator-page =recommendations]
      [%list =recommendations]
      [%app dist-desk=@t sig=signature desk-hash=@uv =docket]   ::outside-sig is confirmation of the item in general, but by whom should it be?
      ::  let's not use outside-sig yet. and just use sig for apps, where you jam
      ::  receiver mora confirmat da je dist-desk correspondira src iz siga + desk iz siga
      [%validity-store =validity-records]
  ==
::
::  this data type doesnt enforce that the list of pointers is homogenous
::  type defines the type of where pointers point to
+$  recommendations
  $%  [type =pointer-list]
      [%mixed =pointer-list]
  ==
+$  pointer-list  (list pointer)
+$  pointer-set  (set pointer)
::
+$  signature   [hex=@ux =ship =life]
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
::  how to make reviews general?
::  define these things (like revs (map..)) as much as possible because it helps later to use that structure
+$  reviews  (map ship review)
+$  review
  $:  text=@t
      hash=@uv
      is-current=?
      is-safe=?
      =updated-at
      =created-at
      =signature   ::  we need new to define how to jam signature for review (and for each signature type separately)
  ==
::
+$  tags  (list @t)
+$  properties  (map @t @t)
+$  pictures  (list @t)
::
+$  created-at  @t
+$  updated-at  @t
::
+$  reach
  $%  [%private whitelist=(list @p)]
      [%public blacklist=(list @p)]
  ==

+$  ship-type  ?(%galaxy %star %planet %moon %comet)
::
::
  ::  TODO how to add a default/bunt value in the data type?
  ::  we should add it for color
::::
::
::
::  SECURITY  ??
--
