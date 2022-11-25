/-  *docket
|%
::  Usr Page
::
+$  usr-data  (map cur-name cur-page)
+$  cur-name  @p
::
::
::  Cur Page
::
+$  cur-page  [=cur-info =cur-data]
::
+$  cur-info
  $:  cur-title=@t
      cur-image=@t
      cur-intro=@t
  ==
+$  cur-data  [=cur-choice =cur-map =aux-map]
::
+$  cur-choice  [=key-list =cat-map =cat-set]
+$  key-list  (list key)
+$  cat-map  (map key category)
+$  cat-set  (set category)
+$  category  @tas
::
+$  cur-map  (map key app-page)
+$  aux-map  (map dev-name app-set)
::
::
::  Dev Page
::
+$  dev-data  [=dev-map =app-set]
+$  dev-map  (map key app-page)      ::  dev-name is the same in all keys
+$  app-set  (set app-name)
::
+$  key  [=dev-name =app-name]
+$  dev-name  @p
+$  app-name  @tas
::
+$  app-page
  $:  =dev-input
      =dst-input
      =usr-input
  ==
::
+$  dev-input
  $:  description=@t
      =keywords
      =screenshots
      dst-desk=@t                      ::  link is made from this
  ==
+$  keywords  (list @tas)
+$  screenshots  (list @t)
::
+$  dst-input
  $:  =signature
      desk-hash=@uv
      =docket
  ==
+$  signature   [p=@ux q=ship r=life]
::
+$  usr-input
  $:  =ratings
      =comments
      =reviews
  ==
::
+$  ratings  (map @p rating)
+$  comments  ((mop created-at comment) lth)
+$  reviews  (map @p review)
::
::  if updated-at == ~2000.1.1., it was never updated
+$  rating
  $:  rating-num=@ud
      =updated-at
      =created-at
  ==
::
+$  comment
  $:  commenter=@p
      text=@t
      =updated-at
  ==
::
+$  review
  $:  text=@t
      hash=@uv
      is-current=?
      is-safe=?
      =updated-at
      =created-at
  ==
::
+$  updated-at  @da
+$  created-at  @da
::
::  Dst Data Types
::
+$  dst-name  @p

::
::
::  Updates
::  used when sending data from one agent to another,
::  or from backend to frontend
+$  usr-update
  $%  [%all =usr-data]
  ==
::
+$  cur-update
  $%  [%all =cur-page]
      [%info =cur-info]
      [%select =key-list =cat-map]
      [%cats =cat-set]
      [%add-dev =dev-name =dev-data]
      [%del-dev =dev-name]
      [%add-app =key =app-page]
      [%edit-app =key =app-page]
      [%del-app =key]
  ==
::
+$  dev-update
  $%  [%all =dev-data]
      [%add =key =app-page]
      [%change =key =app-page]
      [%del =key]
  ==
::
+$  dst-update
  $%  [%sig =key =signature]
      [%data =key =docket hash=@uvI]
  ==
--
