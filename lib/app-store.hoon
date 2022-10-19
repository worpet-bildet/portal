/-  *app-store-data, *app-store-action
|%
++  usr  1
++  cur
  |%
  ::  receiving intial data from dev
  ++  init    
    |=  [=cur-data =dev-name =dev-update]
    ^-  ^cur-data
    =/  new-aux-map  (~(put by aux-map.cur-data) dev-name +>+.dev-update)
    =/  new-cur-map  (~(uni by cur-map.cur-data) `dev-map`+>-.dev-update)
    [cur-choice.cur-data new-cur-map new-aux-map]
::
  ::  maybe smaller functions: del dev from cur-choice, from cur-map...
  ::  after unsubbing from dev
  ::  removes dev from cur-choice and cur-map and aux-map
  ++  unsub  
    |=  [=cur-data =dev-name]
    ^-  ^cur-data
    =/  new-aux-map  (~(del by aux-map.cur-data) dev-name)
  ::
    =/  cur-map  cur-map.cur-data
    =/  cur-choice  cur-choice.cur-data
    =/  apps  ~(tap in (~(got by aux-map.cur-data) dev-name))
    =/  len  (lent apps)
  ::
    =/  new-cur-map  
    =/  n  0
    |-  ?:  =(n len)  cur-map
    %=  $
      n  +(n)
      cur-map  (~(del by cur-map) [dev-name (snag n apps)])
    ==
  ::
    =/  new-cur-choice
    =/  n  0
    |-  ?:  =(n len)  cur-choice
    =/  key  [dev-name (snag n apps)]
    =/  loc  (find [key]~ key-list.cur-choice)
    ?~  loc  cur-choice
    %=  $
      n  +(n)
      key-list.cur-choice    (oust [u.loc 1] key-list.cur-choice)
      cat-map.cur-choice     (~(del by cat-map.cur-choice) key)
    ==
  ::
    `^cur-data`[new-cur-choice new-cur-map new-aux-map]
::
  ::  when selecting new cur-choice
  ++  select
    |=  [=cur-data act=[%select =cur-choice]]
    ^-  ^cur-data
    ?>  ?=([%select *] act)
    [cur-choice.act cur-map.cur-data aux-map.cur-data]
::    
  :: when dev adds an app
  ++  add  
    |=  [=cur-data =dev-name =dev-update]
    ^-  ^cur-data
    =/  new-aux-map  (~(put by aux-map.cur-data) dev-name +>+.dev-update)
    =/  new-cur-map  (~(uni by cur-map.cur-data) `dev-map`+>-.dev-update)
    [cur-choice.cur-data new-cur-map new-aux-map]
::
  ::  when dev edits an app
  ++  edit  
    |=  [=cur-data =dev-name =dev-update]
    ^-  ^cur-data
    =/  dev-map  `dev-map`+>-.dev-update
    =/  new-cur-map  (~(uni by cur-map.cur-data) dev-map)
    [cur-choice.cur-data new-cur-map aux-map.cur-data]
::
  ::  when dev dels an app
  ++  del  
    |=  [=cur-data =dev-name =dev-update]
    ^-  ^cur-data
    =/  new-aux-map  (~(put by aux-map.cur-data) dev-name +>+.dev-update)
    =/  dev-map  `dev-map`+>-.dev-update
    =/  app-name  +<+>.dev-update
    =/  key  [dev-name app-name]
    =/  new-cur-map  (~(del by cur-map.cur-data) key)
    =/  cur-choice  cur-choice.cur-data
    =/  new-cur-choice       
      =/  loc  (find [key]~ key-list.cur-choice)
      ?~  loc  cur-choice
      =/  new-key-list       (oust [u.loc 1] key-list.cur-choice)
      =/  new-cat-map        (~(del by cat-map.cur-choice) key)
      [new-key-list new-cat-map] 
    [new-cur-choice new-cur-map new-aux-map]
::
  ::  after user leaves comment/review/rating to dev
  ++  usr-visit  
    |=  [=cur-data =dev-name =dev-update]
    ^-  ^cur-data
    =/  dev-map  `dev-map`+>-.dev-update
    =/  new-cur-map  (~(uni by cur-map.cur-data) dev-map)
    [cur-choice.cur-data new-cur-map aux-map.cur-data]
::
  ++  check-dev-map  :: verify whether the keys all contain dev-name
    |=  [=dev-name =dev-map]
    ^-  ?
    =/  keys  ~(tap in ~(key by dev-map))
    =/  len  (lent keys)
    =/  n  0
    |-  ?:  =(n len)  %.y
    =/  key  (snag n keys)
    ?.  =(dev-name -.key)  %.n
    $(n +(n)) 
  --
::
::
::
++  dev
  |%
  ++  add  
  |=  [=dev-name =dev-data act=[%add =app-name =app-page]]
  ^-  ^dev-data
  ?>  ?=([%add *] act)
  =/  key  `^key`[dev-name app-name.act]    
  ?:  (~(has by dev-map.dev-data) key)  
    ~&  "dev-server: app-page already exists"
    ~&  "dev-server: use %edit (not %add) to change existing app-page"
    dev-data
  :-  
  (~(put by dev-map.dev-data) key app-page.act)
  (~(put in app-set.dev-data) app-name.act)
::
  ++  edit  
  |=  [=dev-name =dev-data act=[%edit =app-name =app-page]]
  ^-  ^dev-data
  ?>  ?=([%edit *] act)
  =/  key  `^key`[dev-name app-name.act]    
  ?.  (~(has by dev-map.dev-data) key)  
    ~&  "dev-server: app-page doesn't exist"
    ~&  "dev-server: use %add (not %edit) to add new app-page"
    dev-data     
  :-  
  (~(put by dev-map.dev-data) key app-page.act)
  (~(put in app-set.dev-data) app-name.act)
::  
  ++  del  
  |=  [=dev-name =dev-data act=[%del =app-name]]
  ^-  ^dev-data
  ?>  ?=([%del *] act)
  =/  key  `^key`[dev-name app-name.act]        
  :-  
  (~(del by dev-map.dev-data) key)
  (~(del in app-set.dev-data) app-name.act)
::
  ++  rate
  |=  [usr-name=@p =dev-data act=[%rate =key =rating]]
  ^-  ^dev-data
  ?>  ?=([%rate *] act)
  =/  key  `^key`key.act
  =/  new-rating  `^rating`rating.act
  =/  app-page  (~(got by dev-map.dev-data) key)
  =/  new-ratings  (~(put by ratings.visitor-data.app-page) usr-name new-rating)
  =/  new-visitor-data  [new-ratings comments.visitor-data.app-page reviews.visitor-data.app-page]
  =/  new-app-page  ^-  ^app-page  :*  
    description.app-page 
    keywords.app-page 
    screenshots.app-page 
    new-visitor-data 
    auxiliary-data.app-page 
    docket-data.app-page
  ==
  =/  new-dev-map  (~(put by dev-map.dev-data) key.act new-app-page)
  dev-data(dev-map new-dev-map)
::
  ++  unrate 
  |=  [usr-name=@p =dev-data act=[%unrate =key]]
  ^-  ^dev-data
  ?>  ?=([%unrate *] act)
  =/  key  `^key`key.act
  =/  app-page  (~(got by dev-map.dev-data) key)
  =/  new-ratings  (~(del by ratings.visitor-data.app-page) usr-name)
  =/  new-visitor-data  [new-ratings comments.visitor-data.app-page reviews.visitor-data.app-page]
  =/  new-app-page  ^-  ^app-page  :*  
    description.app-page 
    keywords.app-page 
    screenshots.app-page 
    new-visitor-data 
    auxiliary-data.app-page 
    docket-data.app-page
  ==
  =/  new-dev-map  (~(put by dev-map.dev-data) key.act new-app-page)
  dev-data(dev-map new-dev-map)
::  
  ++  add-com 
  |=  [usr-name=@p =dev-data act=[%add-com =key text=@t] now=@da]
  ^-  ^dev-data
  ?>  ?=([%add-com *] act)
  =/  key  `^key`key.act
  =/  new-comment  `comment`[usr-name text.act]
  =/  app-page  (~(got by dev-map.dev-data) key)   
  =/  new-comments  (gas:com comments.visitor-data.app-page [now new-comment] ~)
  =/  new-visitor-data  [ratings.visitor-data.app-page new-comments reviews.visitor-data.app-page]
  =/  new-app-page  ^-  ^app-page  :*  
    description.app-page 
    keywords.app-page 
    screenshots.app-page 
    new-visitor-data 
    auxiliary-data.app-page 
    docket-data.app-page
  ==
  =/  new-dev-map  (~(put by dev-map.dev-data) key.act new-app-page)
  dev-data(dev-map new-dev-map)
::
  ++  del-com  
  |=  [usr-name=@p =dev-data act=[%del-com =key time=@da]]
  ^-  ^dev-data
  ?>  ?=([%del-com *] act)
  =/  key  `^key`key.act
  =/  app-page  (~(got by dev-map.dev-data) key)  
  =/  w-del  (del:com comments.visitor-data.app-page time.act) 
  =/  new-comments  `((mop @da comment) lth)`+.w-del
  =/  new-visitor-data  [ratings.visitor-data.app-page `((mop @da comment) lth)`new-comments reviews.visitor-data.app-page]
  =/  new-app-page  ^-  ^app-page  :*  
    description.app-page 
    keywords.app-page 
    screenshots.app-page 
    new-visitor-data 
    auxiliary-data.app-page 
    docket-data.app-page
  ==
  =/  new-dev-map  (~(put by dev-map.dev-data) key.act new-app-page)
  dev-data(dev-map new-dev-map)
::
  ++  add-rev
  |=  [usr-name=@p =dev-data act=[%add-rev =key text=@t is-safe=?] now=@da]
  ^-  ^dev-data
  ?>  ?=([%add-rev *] act)
  =/  key  `^key`key.act
  =/  new-review  `review`[now text.act *@uv %.y is-safe.act]  :: TODO HASH and IS-CURRENT
  =/  app-page  (~(got by dev-map.dev-data) key)   
  =/  new-reviews  (~(put by reviews.visitor-data.app-page) usr-name new-review)
  =/  new-visitor-data  [ratings.visitor-data.app-page comments.visitor-data.app-page new-reviews]
  =/  new-app-page  ^-  ^app-page  :*  
    description.app-page 
    keywords.app-page 
    screenshots.app-page 
    new-visitor-data 
    auxiliary-data.app-page 
    docket-data.app-page
  ==
  =/  new-dev-map  (~(put by dev-map.dev-data) key.act new-app-page)
  dev-data(dev-map new-dev-map)
::  
  ++  del-rev
  |=  [usr-name=@p =dev-data act=[%del-rev =key]]
  ^-  ^dev-data
  ?>  ?=([%del-rev *] act)
  =/  key  `^key`key.act
  =/  app-page  (~(got by dev-map.dev-data) key)   
  =/  new-reviews  (~(del by reviews.visitor-data.app-page) usr-name)
  =/  new-visitor-data  [ratings.visitor-data.app-page comments.visitor-data.app-page new-reviews]
  =/  new-app-page  ^-  ^app-page  :*  
    description.app-page 
    keywords.app-page 
    screenshots.app-page 
    new-visitor-data 
    auxiliary-data.app-page 
    docket-data.app-page
  ==
  =/  new-dev-map  (~(put by dev-map.dev-data) key.act new-app-page)
  dev-data(dev-map new-dev-map)
::
  --
++  com  ((on @da comment) lth)
--
