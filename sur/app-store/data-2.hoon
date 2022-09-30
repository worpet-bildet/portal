::  working on Milestone 2
|%
+$  category  @tas
::
+$  usr-data  (map cur-name cur-data)
::
::
+$  cur-page  [~ [=cur-intro =cur-choice]]
::
+$  cur-intro  @t
::
+$  cur-choice    [~ [=cur-name =cur-data]]              ::make it a unit?
+$  cur-choice-2  (map [=dev-name =app-name] =app-page)  
::
::
+$  cur-data  (map dev-name app-pages)
::
+$  cur-name  @p
::
::
::
::  Dev Page
::
+$  dev-page  [~ [=dev-name =app-pages]]  ::make it a unit??
+$  app-pages  (map app-name app-page)
:: 
+$  dev-name  @p 
+$  app-name  @tas
::
+$  app-page
  $: 
  ::
    description=@t
    tags=(list tag)
    pictures=(list picture)
    =visitor-data
    =auxiliary-data
    =docket-data
  == 
::
::
+$  tag  @tas
::
+$  picture  @t
::
+$  visitor-data
  $:
    avg-rating=@rh
    ratings=(map @p rating)
    comments=(list comment)
    evaluations=(map evaluator evaluation)
  ==
::

::
+$  auxiliary-data           ::  automatically find what's easy to find
  $:
    desk-hash=@uv    
    ::  installed-into=@tas  ::  is this same as base in docket data?
    developer-desk=@t        ::  link is made from this
    last-update=@da
    release-date=@da         ::  should it be documented or no? (ask hodzod)
    size-mb=@rs
  ==
::
::
+$  docket-data              ::  should it automatically add it from docket file?
  $:
    title=@t
    info=@t
    color=@ux
    version=[@ud @ud @ud]
    website=@t
    license=@t
    base=@t                  ::  same as installed into(@tas)?
    image=@t
  ==
::
+$  rating  
  $|  @ud  
  |=  rating=@ud 
  &((lte rating 5) (gte rating 1))
::
+$  comment 
  $:
    commenter=@p
    date=@da
    text=@t
  ==
::
+$  evaluator  @p
+$  evaluation
  $:
    date=@da
    text=@t
    hash=@uv
    is-current=?    
    is-safe=?                ::  3rd possibility as no decision?
  ==
::
--

