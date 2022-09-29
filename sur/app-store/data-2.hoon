::  building Milestone 2
|%
+$  category  @tas
::
+$  usr-data  (map cur-name cur-data)
::
+$  cur-choice  [~ [=cur-name =cur-data]]
+$  cur-data  (map dev-name app-pages)
::
+$  dev-page  [~ [=dev-name =app-pages]]
+$  app-pages  (map app-name app-page)
:: 
::
+$  cur-name  @p
+$  dev-name  @p 
+$  app-name  @tas

::  App Page
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

