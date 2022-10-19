|%
::
+$  usr-data  (map cur-name cur-page)
::
::
::
::  Cur Page
::
::
+$  cur-page  (unit [=cur-name =cur-title =cur-intro =cur-data])
::
+$  cur-name  @p
+$  cur-title  @t
+$  cur-intro  @t
::
::  cur data should also confirm cur-choice like this: %-  ^cur-choice  cur-choice
+$  cur-data  ::  do (^cur-data cur-data) everywhere necessary to assert this 
  $|  [=cur-choice =cur-map =aux-map]
  |=  [=cur-choice =cur-map =aux-map]
  =/  cur-choice  (^cur-choice cur-choice)  ::  asserts cur-choice correctness
  =/  cur-map-keys  ~(key by cur-map)
  =/  dev-name-add  |=  [=dev-name =app-set]  
  ^-  (set [^dev-name app-name])
  (~(run in app-set) |=(=app-name [dev-name app-name]))
  =/  aux-map-1  (~(rut by aux-map) dev-name-add)
  =/  aux-map-2  (~(run by aux-map-1) |=(set=(set key) ~(tap in set)))
  =/  vals  (silt `(list key)`(zing ~(val by aux-map-2)))
  ?&
    ::  assert cur-choice(key-list) is subset of cur-map
    (levy key-list.cur-choice |=(=key (~(has in ~(key by cur-map)) key)))
    ::  assert that keys of cur-map correspond to aux-map
    =(cur-map-keys vals)
  ==
  ::  TODO assert that aux-map and cur-map are correct together
::
+$  cur-choice
  $|  [=key-list =cat-map =cat-set]
  |=  [=key-list =cat-map =cat-set]
  ?&  =((silt key-list) ~(key by cat-map))
  (~(all by cat-map) |=(cat=category (~(has in cat-set) cat))) 
  ==
::  select should only take key-list and cat-map, and
::  all cats in cat-map should have already been added to cat-set
::
+$  key-list  (list key)
+$  cat-map  (map key category)
+$  cat-set  (set category)
::
+$  category  @tas
::
+$  cur-map  (map key app-page)
+$  aux-map  (map dev-name app-set)
::
::
::  Dev Page
::
+$  dev-update  (unit [=change =dev-data])
::
+$  change   
  $%
    [%init ~]
    [%add =key]
    [%edit =key]
    [%del =key] 
    [%usr-visit =key]
    [%wipe ~]
  ==
 
+$  dev-data
  $|  [=dev-map =app-set]
  |=  [=dev-map =app-set]
  =/  keys  ~(key by dev-map)
  =/  app-names  `^app-set`(~(run in keys) tail)
  ?:  =(app-set app-names)
    %.y
  %.n
::  
::
+$  dev-map  (map key app-page)  ::  dev-name is the same in all keys
+$  app-set  (set app-name) 
::
:: 
+$  key  [=dev-name =app-name]
+$  dev-name  @p 
+$  app-name  @tas                   ::  up to 30 chars long on Apple Store
::
+$  app-page
  $: 
  ::
    description=@t
    keywords=(list keyword)          ::  limited to 100 characters total, input with terms
                                     ::  separated by commas and no spaces. For example:         
                                     ::  Property,House,Real Estate
    screenshots=(list screenshot)    ::  up to 10 screenshots on Apple Store
    =visitor-data
    =auxiliary-data
    =docket-data
  == 
::
::
+$  keyword  @tas
::
+$  screenshot  @t
::
+$  visitor-data
  $:
    ::  avg-rating=@rh  ::render on the front end
    ratings=(map @p rating)
    comments=((mop @da comment) lth)
    reviews=(map @p review)
    ::  Also, first should be shown is-current=%.y reviews and then others
    ::  sorted by date
  ==
::
::
::                                   ::  nothing automatically yet except docket 
::
+$  auxiliary-data                   ::  (automatically find what's easy to find)
  $:
    desk-hash=@uv    
    installed-into=@tas          ::  is this same as base in docket data?
    developer-desk=@t                ::  link is made from this
    last-update=@da
    release-date=@da                 ::  should it be documented or no? (ask hodzod)
    size-mb=@rs
  ==
::
::
+$  docket-data                      ::  should it automatically add it from docket file?
  $:
    title=@t
    info=@t                          ::  subtitle/summary, up to 30 chars long in apple
    color=@ux                        ::    store, here maybe it can be longer?
    version=[@ud @ud @ud]
    website=@t
    license=@t
    base=@t                          ::  same as installed into(@tas)?
    image=@t                         ::  app icon, should be square
  ==                                 ::  To ensure the icon is legible in all sizes, 
::                                   ::  avoid adding unnecessary visual details
+$  rating
  $|  @ud  
  |=  r=@ud 
  &((gte r 1) (lte r 5))
::
+$  comment 
  $:
    commenter=@p
    text=@t
  ==
::
+$  review
  $:
    time=@da
    text=@t
    hash=@uv
    is-current=?    
    is-safe=?                        ::  3rd possibility as no decision?
  ==
::
--

