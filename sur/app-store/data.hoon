/-  *docket
|%
+$  dst-sig  [=key =signature]

+$  usr-data  (map cur-name cur-page)
::
::
::  Cur Page
::
+$  cur-page  (unit [=cur-name =cur-info =cur-data])
+$  cur-name  @p
+$  cur-info
  $:
    cur-title=@t
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
+$  dev-update  (unit [=change =dev-data])

::  ADD SIGNATURE TO CHANGE. fix the mechanics so dev doesnt send %add app without having a signature
+$  change   
  $%
    [%init ~]
    [%add =key]
    [%edit =key]
    [%del =key] 
    [%usr-visit =key]
    [%wipe ~]
    [%sig =key]
  ==
+$  dev-data  [=dev-map =app-set]
+$  dev-map  (map key app-page)  ::  dev-name is the same in all keys
+$  app-set  (set app-name) 
::
+$  key  [=dev-name =app-name]
+$  dev-name  @p 
+$  app-name  @tas                   ::  up to 30 chars long on Apple Store
::
+$  app-page
  $: 
    description=@t
    keywords=(list keyword)          ::  limited to 100 characters total, input with terms
                                     ::  separated by commas and no spaces. For example:         
                                     ::  Property,House,Real Estate
    screenshots=(list screenshot)    ::  up to 10 screenshots on Apple Store. 
    desk-hash=@uv    
    distributor-desk=@t                ::==key,  link is made from this (dev-name + app-name)
    =signature
    =visitor-data
    docket-data=docket
  == 
::
+$  signature   [p=@ux q=ship r=life]
+$  keyword  @tas
+$  screenshot  @t  ::  need to define input screenshot size so they look nice
::
+$  visitor-data
  $:
    ratings=(map @p rating)
    comments=((mop @da comment) lth)
    reviews=(map @p review)
    ::  First should be shown is-current=%.y reviews and then others
    ::  sorted by date
  ==
::                                 
+$  rating
  $|  @ud  
  |=  r=@ud 
  &((gte r 1) (lte r 5))
+$  comment 
  $:
    commenter=@p
    text=@t
  ==
+$  review
  $:
    time=@da
    text=@t
    hash=@uv
    is-current=?    
    is-safe=?                        ::  3rd possibility as no decision?
  ==
  
::  METADATA TO ADD LATER
::    last-update=@da
::    release-date=@da                 ::  MOVE TO APP PAGE
::    size-mb=@rs
::
::  OLD, BUT COMMENTS ARE RELEVANT
::+$  docket-data                      ::  should it automatically add it from docket file?
::  $:
::    title=@t
::    info=@t                          ::  subtitle/summary, up to 30 chars long in apple
::    color=@ux                        ::    store, here maybe it can be longer?
::    version=[@ud @ud @ud]
::    website=@t
::    license=@t
::    base=@t                          ::  same as installed into(@tas)?
::    image=@t                         ::  app icon, should be square
::  ==                                 ::  To ensure the icon is legible in all sizes, 
::                                     ::  avoid adding unnecessary visual details
--

