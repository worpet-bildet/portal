/-  *docket
|%
::
::
::
::  Usr Page
::
+$  usr-data  (map cur-name cur-page)
+$  cur-name  @p
::
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
      dst-desk=@t               ::  link is made from this
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
+$  rating
  $:  rating-num=@ud
      =updated-at
      =created-at
  ==
::
+$  comments  (map created-at-str comment)
+$  comment
  $:  commenter=@p
      text=@t
      =updated-at-str
  ==
::
+$  reviews  (map @p review)
+$  review
  $:  text=@t
      hash=@uv
      is-current=?
      is-safe=?
      =updated-at
      =created-at
  ==
::
::  if updated-at == ~2000.1.1., it was never updated
+$  updated-at  @da
+$  created-at  @da
+$  created-at-str  @t
+$  updated-at-str  @t
::
::
::
::  Dst Data Types
::
+$  dst-name  @p
::
::
::
::  Updates
::  used when sending data from one agent to another, or from backend to frontend
::
+$  usr-update
  $%  [%all =usr-data]
  ==
::
+$  cur-update
  $%  [%all =cur-page]
      [%cur-info =cur-info]
      [%cats =cat-set]
      [%select =key-list =cat-map]
      [%add-dev =dev-name =dev-data]
      [%del-dev =dev-name]
      [%add-app =key =app-page]
      [%change-app =key =app-page]
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
