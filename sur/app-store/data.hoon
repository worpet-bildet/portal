::  working on Milestone 2
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
+$  cur-data
  $|  [=cur-choice =cur-map =aux-map]
  |=  [=cur-choice =cur-map =aux-map]
  =/  len1  (lent `key-list`key-list.cur-choice)
  =/  len2  (lent ~(tap in ~(key by `cat-map`cat-map.cur-choice)))
  ?.  =(len1 len2)  %.n  ::  assert correct lengths in cur-choice
  =/  n  0
  |-  ::assert cur-choice is subset of cur-map
    ?:  =(n len1)  %.y
    ?.  (~(has by cur-map) (snag n key-list.cur-choice))  %.n
    $(n +(n))
  ::  TODO assert that aux-map and cur-map are correct together
::
+$  cur-choice  [=key-list =cat-map]
::
+$  key-list  (list key)
+$  cat-map  (map key category)
::  SET OF CATEGORIES NEEDS TO BE DONE
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
  %.y
  ::  TODO assert their correctness
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
    reviews=((mop @da review) lth)
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
+$  rating  @ud
::  TODO figure out how to make it work
::  $|  @ud  
::  |=  r=@ud 
::  (gte r 5) 
::
+$  comment 
  $:
    commenter=@p
    text=@t
  ==
::
+$  review
  $:
    reviewer=@p
    text=@t
    hash=@uv
    is-current=?    
    is-safe=?                        ::  3rd possibility as no decision?
  ==
::
--

