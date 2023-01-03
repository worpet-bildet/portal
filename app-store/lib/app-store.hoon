/-  *app-store-data, *app-store-action, app-store-logs
/+  sig
|%
::
::
::
::  includes arms which %usr-server uses
++  usr
  |%
  ::
  ::
  ::
  ::  when User adds (subscribes to) a Curator
  ++  add-cur
    |=  [=usr-data =cur-name =cur-page our=@p now=@da]
    ^-  ^usr-data
    =/  [=cur-map =aux-map]
      (cur-map-aux-map-all:validator cur-map.cur-data.cur-page aux-map.cur-data.cur-page our now)
    ?.  ?&
      (cat-map-cat-set:validator cat-map.cur-choice.cur-data.cur-page cat-set.cur-choice.cur-data.cur-page)
      (key-list-duplicates:validator key-list.cur-choice.cur-data.cur-page)
      (key-list-cat-map:validator key-list.cur-choice.cur-data.cur-page cat-map.cur-choice.cur-data.cur-page)
      (key-list-cur-map:validator key-list.cur-choice.cur-data.cur-page cur-map)
      (cur-map-aux-map:validator cur-map aux-map)
    ==
      ~&  "%usr-server: cur-data invalid"
      usr-data
    (~(put by usr-data) cur-name cur-page(cur-map.cur-data cur-map, aux-map.cur-data aux-map))
  --
::
::
::
::  includes arms that are used on cur-data in the context of both Curator and User
++  cur-data-lib
  |%
  ::  when selecting new cur-choice
  ++  select
    |=  [=cur-data act=[%select =key-list =cat-map]]
    ^-  [?(%changed %unchanged) ^cur-data]
    ?.  ?&
      (cat-map-cat-set:validator cat-map.act cat-set.cur-choice.cur-data)
      (key-list-duplicates:validator key-list.cur-choice.cur-data)
      (key-list-cat-map:validator key-list.act cat-map.act)
      (key-list-cur-map:validator key-list.act cur-map.cur-data)
    ==
      ~&  "%cur-server: select failed"
      [%unchanged cur-data]
    :-  %changed
    %=  cur-data
      cur-choice  [key-list.act cat-map.act cat-set.cur-choice.cur-data]
    ==
  ::
  ::  when writing categories
  ++  cats
    |=  [=cur-data act=[%cats =cat-set]]
    ^-  ^cur-data
    ?.  (cat-map-cat-set:validator cat-map.cur-choice.cur-data cat-set.act)
      ~&  "%cur-server: adding categories failed"
      cur-data
    cur-data(cat-set.cur-choice cat-set.act)
  ::
  ::  when dev adds an app-page, or app-page is changed
  ++  put-app
    |=  [=cur-data our=@p now=@da =dev-name =key =app-page]
    ^-  [?(%changed %unchanged %deleted) ^cur-data]
    ?.  (new-app-page:validator [our now dev-name key app-page])
      =^  changed  cur-data  (del-app [cur-data dev-name key])
      ?:  =(changed %unchanged)  [%unchanged cur-data]
      [%deleted cur-data]
    =/  new-cur-map  (~(put by cur-map.cur-data) key app-page)
    =/  app-set  (~(get by aux-map.cur-data) dev-name.key)
    ?~  app-set
      ~&  "error"
      [%unchanged cur-data]
    =/  new-app-set  (~(put in u.app-set) app-name.key)
    =/  new-aux-map  (~(put by aux-map.cur-data) dev-name.key new-app-set)
    ?.  ?&
      (cur-map-aux-map:validator new-cur-map new-aux-map)
      (key-list-cur-map:validator key-list.cur-choice.cur-data new-cur-map)
    ==
      ~&  "error: updating cur-data after dev adding/editing an app, failed"
      [%unchanged cur-data]
    =/  new-cur-data  cur-data(cur-map new-cur-map, aux-map new-aux-map)
    [%changed new-cur-data]
  ::
  ::  receives intial data from dev. otherwise, won't work because it uses ~(uni by cur-map)
  ++  add-dev
    |=  [=cur-data our=@p now=@da =dev-name =dev-data]
    ^-  ^cur-data
    =/  new-dev-data  (dev-data-all:validator [dev-name dev-data our now])
    ?.  (dev-map-app-set:validator dev-map.new-dev-data app-set.new-dev-data)
      ~&  "%cur-server: new dev-map and app-set inconsistent"
      cur-data
    =/  new-aux-map  (~(put by aux-map.cur-data) dev-name app-set.new-dev-data)
    =/  new-cur-map  (~(uni by cur-map.cur-data) `dev-map`dev-map.new-dev-data)
    ?.  (cur-map-aux-map:validator new-cur-map new-aux-map)
      ~&  "%cur-server: receiving data failed"
      cur-data
    =/  new-cur-data  `^cur-data`[cur-choice.cur-data new-cur-map new-aux-map]
    new-cur-data
  ::
  ::  after unsubbing from dev, removes dev from cur-data
  ++  del-dev
    |=  [=cur-data =dev-name]
    ^-  [?(%changed %unchanged) ^cur-data]
    ?.  (~(has by aux-map.cur-data) dev-name)
      ~&  "%cur-server: already not subscribed to dev"
      [%unchanged cur-data]
    =/  new-aux-map  (~(del by aux-map.cur-data) dev-name)
    =/  new-cur-map  (del-dev-from-cur-map:aux [dev-name cur-map.cur-data aux-map.cur-data])
    =/  new-cur-choice  (del-dev-from-cur-choice:aux [dev-name cur-choice.cur-data aux-map.cur-data])
    ?.  ?&
      (key-list-duplicates:validator key-list.cur-choice.cur-data)
      (key-list-cat-map:validator key-list.new-cur-choice cat-map.new-cur-choice)
      (key-list-cur-map:validator key-list.new-cur-choice new-cur-map)
      (cur-map-aux-map:validator new-cur-map new-aux-map)
    ==
      ~&  "%cur-server: updating cur-data after unsub, failed"
      [%unchanged cur-data]
    [%changed [new-cur-choice new-cur-map new-aux-map]]
  ::
  ::  when dev dels an app
  ++  del-app
    |=  [=cur-data =dev-name =key]
    ^-  [?(%changed %unchanged) ^cur-data]
    ?.  (dev-name-in-key:validator dev-name key)
      [%unchanged cur-data]
    ?.  (app-in-cur-data:validator [key cur-data])
      [%unchanged cur-data]
    =/  new-cat-map  (~(del by cat-map.cur-choice.cur-data) key)
    =/  new-cur-map  (~(del by cur-map.cur-data) key)
    =/  app-set  (~(get by aux-map.cur-data) dev-name.key)
    ?~  app-set
      ~&  "error"
      [%unchanged cur-data]
    =/  new-app-set  (~(del in u.app-set) app-name.key)
    =/  new-aux-map  (~(put by aux-map.cur-data) dev-name.key new-app-set)
    =/  loc  (find [key]~ key-list.cur-choice.cur-data)
    ?~  loc
      ?.  ?&
        (cat-map-cat-set:validator new-cat-map cat-set.cur-choice.cur-data)
        (key-list-duplicates:validator key-list.cur-choice.cur-data)
        (key-list-cat-map:validator key-list.cur-choice.cur-data new-cat-map)
        (key-list-cur-map:validator key-list.cur-choice.cur-data new-cur-map)
        (cur-map-aux-map:validator new-cur-map new-aux-map)
      ==
        ~&  "error: updating cur-data after dev deleting an app, failed"
        [%unchanged cur-data]
      :^  %changed
      [key-list.cur-choice.cur-data new-cat-map cat-set.cur-choice.cur-data]
      new-cur-map  new-aux-map
    =/  new-key-list  (oust [u.loc 1] key-list.cur-choice.cur-data)
    ?.  ?&
      (cat-map-cat-set:validator new-cat-map cat-set.cur-choice.cur-data)
      (key-list-duplicates:validator key-list.cur-choice.cur-data)
      (key-list-cat-map:validator new-key-list new-cat-map)
      (key-list-cur-map:validator new-key-list new-cur-map)
      (cur-map-aux-map:validator new-cur-map new-aux-map)
    ==
      ~&  "error: updating cur-data after dev deleting an app, failed"
      [%unchanged cur-data]
    :-  %changed
    [[new-key-list new-cat-map cat-set.cur-choice.cur-data] new-cur-map new-aux-map]
  ::
  ::  contains helper arms for manipulating cur-data
  ++  aux
    |%
    ++  del-dev-from-cur-choice
      |=  [=dev-name =cur-choice =aux-map]
      ^-  ^cur-choice
      =/  apps  ~(tap in (~(got by aux-map) dev-name))
      =/  len  (lent apps)
      =/  n  0
      |-  ?:  =(n len)  cur-choice
        =/  key  [dev-name (snag n apps)]
        =/  loc  (find [key]~ key-list.cur-choice)
        ?~  loc  $(n +(n))
        %=  $
          n  +(n)
          key-list.cur-choice    (oust [u.loc 1] key-list.cur-choice)
          cat-map.cur-choice     (~(del by cat-map.cur-choice) key)
        ==
    ::
    ++  del-dev-from-cur-map
      |=  [=dev-name =cur-map =aux-map]
      ^-  ^cur-map
      =/  apps  ~(tap in (~(got by aux-map) dev-name))
      =/  len  (lent apps)
      =/  n  0
      |-  ?:  =(n len)  cur-map
      %=  $
        n  +(n)
        cur-map  (~(del by cur-map) [dev-name (snag n apps)])
      ==
    --
  --
::
::
::
::  includes arms which dev-server uses
++  dev
  |%
  ::
  ::
  ::
  ::  on dev-action
  ::
  ::  when dev adds an app-page
  ++  add
    |=  [=dev-name =dev-data act=[%add =app-name =dev-input]]
    ^-  [?(%changed %unchanged) ^dev-data]
    =/  key  `^key`[dev-name app-name.act]
    ?:  (~(has by dev-map.dev-data) key)
      ~&  "%dev-server: app-page already exists"
      ~&  "%dev-server: use %edit (not %add) to change existing app-page"
      [%unchanged dev-data]
    =/  new-app-page  :+
      dev-input.act
      [[0x0 dev-name 0] 0v0 *docket]
      *usr-input
    =/  new-dev-map  (~(put by dev-map.dev-data) key new-app-page)
    ?.  (dev-name-dev-map:validator [dev-name new-dev-map])
      ~&  "%dev-server: updating dev-data failed"
      [%unchanged dev-data]
    =/  new-app-set  (~(put in app-set.dev-data) app-name.act)
    ?.  (dev-map-app-set:validator [new-dev-map new-app-set])
      ~&  "%dev-server: updating dev-data failed"
      [%unchanged dev-data]
    [%changed new-dev-map new-app-set]
  ::
  ::  when dev edits and app-page
  ++  edit
    |=  [=dev-name =dev-data act=[%edit =app-name =dev-input]]
    ^-  [?(%changed %unchanged) ^dev-data]
    =/  key  `^key`[dev-name app-name.act]
    ?.  (~(has by dev-map.dev-data) key)
      ~&  "%dev-server: app-page doesn't exist"
      ~&  "%dev-server: use %add (not %edit) to add new app-page"
      [%unchanged dev-data]
    =/  app-page  (~(got by dev-map.dev-data) key)
    =/  new-dev-map  (~(put by dev-map.dev-data) key app-page(dev-input dev-input.act))
    =/  new-app-set  (~(put in app-set.dev-data) app-name.act)
    ?.  (dev-map-app-set:validator [new-dev-map new-app-set])
      ~&  "%dev-server: updating dev-data failed"
      [%unchanged dev-data]
    [%changed new-dev-map new-app-set]
  ::
  ::  when dev deletes an app-page
  ++  del
    |=  [=dev-name =dev-data act=[%del =app-name]]
    ^-  [?(%changed %unchanged) ^dev-data]
    =/  key  `^key`[dev-name app-name.act]
    ?.  (~(has in app-set.dev-data) app-name.act)
      ~&  "%dev-server: app-page does not exist"
      [%unchanged dev-data]
    =/  new-dev-map  (~(del by dev-map.dev-data) key)
    =/  new-app-set  (~(del in app-set.dev-data) app-name.act)
    ?.  (dev-map-app-set:validator [new-dev-map new-app-set])
      ~&  "%dev-server: updating dev-data failed"
      [%unchanged dev-data]
    [%changed new-dev-map new-app-set]
  ::
  ::
  ::
  ::  on dst-action
  ::
  ::  when dev receives a signature from %dst-server
  ++  sign
    |=  [=dev-data dst-ship=@p act=[%sig =key =signature]]
    ^-  [?(%changed %unchanged) ^app-page ^dev-data]
    ?.  (~(has in app-set.dev-data) app-name.key.act)
      ~&  "%dev-server: app-page does not exist"
      [%unchanged *app-page dev-data]
    =/  app-page  (need (~(get by dev-map.dev-data) key.act))
    =/  dst-desk  (parse-dst-desk:validator dst-desk.dev-input.app-page)
    ?~  dst-desk
      ~&  "%dev-server: bad distributor desk"
      [%unchanged app-page dev-data]
    ?.  ?&
      =(dst-name.u.dst-desk q.signature.act)
      =(dst-name.u.dst-desk dst-ship)
    ==
      ~&  "%dev-server: bad distributor ship or signature or desk"
      [%unchanged app-page dev-data]
    =/  new-app-page  app-page(signature.dst-input signature.act)
    =/  new-dev-map
      (~(put by dev-map.dev-data) key.act new-app-page)
    [%changed new-app-page dev-data(dev-map new-dev-map)]
  ::
  ::  when dev receives docket data + hash from %dst-server
  ++  data
    |=  [=dev-data dst-ship=@p act=[%data =key =docket hash=@uvI]]
    ^-  [?(%changed %unchanged) ^app-page ^dev-data]
    ?.  (~(has in app-set.dev-data) app-name.key.act)
      ~&  "%dev-server: app-page does not exist"
      [%unchanged *app-page dev-data]
    =/  app-page  (need (~(get by dev-map.dev-data) key.act))
    =/  dst-desk  (parse-dst-desk:validator dst-desk.dev-input.app-page)
    ?~  dst-desk
      ~&  "%dev-server: bad distributor desk"
      [%unchanged app-page dev-data]
    ?.  =(dst-name.u.dst-desk dst-ship)
      ~&  "%dev-server: bad distributor ship or desk"
      [%unchanged app-page dev-data]
    =/  new-reviews  %-  ~(run by reviews.usr-input.app-page)
      |=(=review review(is-current =(hash.act desk-hash.dst-input.app-page)))
    =/  new-app-page
      %=  app-page
        docket.dst-input  docket.act
        desk-hash.dst-input  hash.act
        reviews.usr-input  new-reviews
      ==
    =/  new-dev-map  (~(put by dev-map.dev-data) key.act new-app-page)
    [%changed new-app-page dev-data(dev-map new-dev-map)]
  ::
  ::
  ::
  ::  on visit-dev-action
  ::
  ::  when user visits an app page and (un)rates, (un)comments or (un)reviews it
  ++  usr-visit
    |=  [=dev-data usr-name=@p =key act=visit-dev-action now=@da]
    ^-  [?(%changed %unchanged) ^app-page ^dev-data]
    |^
    ?.  (~(has in app-set.dev-data) app-name.key)
      ~&   "%dev-server: app-page doesn't exist"
      [%unchanged *app-page dev-data]
    =/  app-page  (~(got by dev-map.dev-data) key)
    ?-    -.act
        %rate
      =^  changed  app-page  (rate:visit-app-page app-page usr-name rating-num.act now)
      ?:  =(changed %unchanged)  [%unchanged app-page dev-data]
      [%changed app-page dev-data(dev-map (~(put by dev-map.dev-data) key.act app-page))]
        %unrate
      =^  changed  app-page  (unrate:visit-app-page app-page usr-name)
      ?:  =(changed %unchanged)  [%unchanged app-page dev-data]
      [%changed app-page dev-data(dev-map (~(put by dev-map.dev-data) key.act app-page))]
        %add-com
      =^  changed  app-page  (add-com:visit-app-page app-page now usr-name text.act)
      ?:  =(changed %unchanged)  [%unchanged app-page dev-data]
      [%changed app-page dev-data(dev-map (~(put by dev-map.dev-data) key.act app-page))]
        %edit-com
      =^  changed  app-page  (edit-com:visit-app-page app-page now usr-name text.act created-at-str.act)
      ?:  =(changed %unchanged)  [%unchanged app-page dev-data]
      [%changed app-page dev-data(dev-map (~(put by dev-map.dev-data) key.act app-page))]
        %del-com
      =^  changed  app-page  (del-com:visit-app-page app-page usr-name created-at-str.act)
      ?:  =(changed %unchanged)  [%unchanged app-page dev-data]
      [%changed app-page dev-data(dev-map (~(put by dev-map.dev-data) key.act app-page))]
        %put-rev
      =^  changed  app-page  (put-rev:visit-app-page app-page usr-name now text.act hash.act is-safe.act)
      ?:  =(changed %unchanged)  [%unchanged app-page dev-data]
      [%changed app-page dev-data(dev-map (~(put by dev-map.dev-data) key.act app-page))]
        %del-rev
      =^  changed  app-page  (del-rev:visit-app-page app-page usr-name)
      ?:  =(changed %unchanged)  [%unchanged app-page dev-data]
      [%changed app-page dev-data(dev-map (~(put by dev-map.dev-data) key.act app-page))]
    ==
    ++  visit-app-page
      |%
      ++  rate
        |=  [=app-page usr-name=@p rating-num=@ud now=@da]
        ^-  [?(%changed %unchanged) ^app-page]
        ?.  &((gte rating-num 1) (lte rating-num 5))
          [%unchanged app-page]
        =/  rat  (~(get by ratings.usr-input.app-page) usr-name)
        =/  new-rating
          ?~  rat  [rating-num *@da now]
          [rating-num now created-at.u.rat]
        =/  new-ratings  (~(put by ratings.usr-input.app-page) usr-name (rating new-rating))
        [%changed app-page(ratings.usr-input new-ratings)]
      ::
      ++  unrate
        |=  [=app-page usr-name=@p]
        ^-  [?(%changed %unchanged) ^app-page]
        ?~  (~(get by ratings.usr-input.app-page) usr-name)
          [%unchanged app-page]
        =/  new-ratings  (~(del by ratings.usr-input.app-page) usr-name)
        [%changed app-page(ratings.usr-input new-ratings)]
      ::
      ++  add-com
        |=  [=app-page now=@da usr-name=@p text=@t]
        ^-  [%changed ^app-page]
        =/  new-comments  (~(put by comments.usr-input.app-page) `@t`(scot %da now) [usr-name text *@t])
        [%changed app-page(comments.usr-input new-comments)]
      ::
      ++  edit-com
        |=  [=app-page now=@da usr-name=@p text=@t created-at-str=@t]
        ^-  [?(%changed %unchanged) ^app-page]
        ?.  =(usr-name commenter:(~(got by comments.usr-input.app-page) created-at-str))
          [%unchanged app-page]
        =/  new-comments  (~(put by comments.usr-input.app-page) created-at-str [usr-name text `@t`(scot %da now)])
        [%changed app-page(comments.usr-input new-comments)]
      ::
      ++  del-com
        |=  [=app-page usr-name=@p created-at-str=@t]
        ^-  [?(%changed %unchanged) ^app-page]
        ?.  =(usr-name commenter:(~(got by comments.usr-input.app-page) created-at-str))
          ~&  [%unchanged app-page]
          [%unchanged app-page]
        =/  new-comments  (~(del by comments.usr-input.app-page) created-at-str)
        [%changed app-page(comments.usr-input new-comments)]
      ::
      ++  put-rev
        |=  [=app-page usr-name=@p now=@da text=@t hash=@uv is-safe=?]
        ^-  [%changed ^app-page]
        =/  is-current  =(hash desk-hash.dst-input.app-page)
        =/  rev  (~(get by reviews.usr-input.app-page) usr-name)
        =/  new-review
          ?~  rev  [text hash is-current is-safe *@da now]
          [text hash is-current is-safe now created-at.u.rev]
        =/  new-reviews  (~(put by reviews.usr-input.app-page) usr-name new-review)
        [%changed app-page(reviews.usr-input new-reviews)]
      ::
      ++  del-rev
        |=  [=app-page usr-name=@p]
        ^-  [?(%changed %unchanged) ^app-page]
        ?~  (~(get by reviews.usr-input.app-page) usr-name)
          [%unchanged app-page]
        =/  new-reviews  (~(del by reviews.usr-input.app-page) usr-name)
        [%changed app-page(reviews.usr-input new-reviews)]
      --
    --
  --
::
::
::
::  includes arms which are used to validate data
++  validator
  |%
  ::
  ::
  ::
  ::  helper arms
  ::
  ::  validates app-page for key, dst-desk and signature correctness
  ++  new-app-page
    |=  [our=@p now=@da =dev-name =key =app-page]
    ^-  ?
    ?.  (dev-name-in-key dev-name key)
      %.n
    =/  dst-desk  (parse-dst-desk dst-desk.dev-input.app-page)
    ?~  dst-desk  %.n
    ?.  =(app-name.u.dst-desk app-name.key)
      %.n
    (sig key dst-name.u.dst-desk signature.dst-input.app-page our now)
  ::
  ::  validates whether dev-name is in key
  ++  dev-name-in-key
    |=  [=dev-name =key]
    ?.  =(dev-name dev-name.key)
      ~&  "fail: dev-name and key don't correspond"
      %.n
    %.y
  ::
  ::  validates signature
  ++  sig
    |=  [=key =dst-name =signature our=@p now=@da]
    ?:  (ships-related dev-name.key dst-name)
      %.y
    ?.  =(q.signature dst-name)
      ~&  "signature fail: ship in sig and distributor ship are not the same"
      %.n
    ?.  (validate:^sig [our signature key now])
      ~&  "signature fail: distributor signature validation failed, not adding new app by dev"
      %.n
    %.y
  ::
  ::  %.y if one ship is moon of another
  ++  ships-related
    |=  [=dev-name dst-name=@p]
    ^-  ?
    ?:  (gte dev-name dst-name)
      ?:  =(0 (mod (sub dev-name dst-name) 4.294.967.296))
        %.y
      %.n
    ?:  =(0 (mod (sub dst-name dev-name) 4.294.967.296))
      %.y
    %.n
  ::
  ::  takes dst-desk, outputs unit of dst-name and app-name
  ++  parse-dst-desk
    |=  [dst-desk=@t]
    ^-  (unit [=dst-name =app-name])
    =/  dst-desk  (trip dst-desk)
    =/  loc  (find ['/']~ dst-desk)
    ?~  loc  ~
    %-  some  :-
    (slav %p (crip (scag u.loc dst-desk)))
    `@tas`(crip (slag +(u.loc) dst-desk))
  ::
  ::
  ::
  ::  dev-data validators
  ::
  ::  takes dev-data and outputs the subset of dev-data with valid signatures
  ++  dev-data-all
    |=  [=dev-name =dev-data our=@p now=@da]
    ^-  ^dev-data
    =/  keys  ~(tap in ~(key by dev-map.dev-data))
    =/  signed-app-set  *app-set
    =/  signed-dev-map  *dev-map
    =/  n  0
    =/  len  ~(wyt in app-set.dev-data)
    |-  ?:  =(n len)  [signed-dev-map signed-app-set]
      =/  key  (snag n keys)
      =/  app-page  (~(get by dev-map.dev-data) key)
      ?~  app-page  !!
      ?.  (new-app-page [our now dev-name key u.app-page])  $(n +(n))
      %=  $
        n  +(n)
        signed-app-set  (~(put in signed-app-set) app-name.key)
        signed-dev-map  (~(put by signed-dev-map) key u.app-page)
      ==
  ::
  ::  verify whether dev-map keys all contain the same dev-name
  ++  dev-map-keys
    |=  [=dev-map]
    ^-  ?
    =/  keys  ~(tap in ~(key by dev-map))
    =/  len  (lent keys)
    ?:  =(len 0)  %.y
    =/  dev-name  (snag 0 keys)
    =/  n  0
    |-  ?:  =(n len)  %.y
    =/  key  (snag n keys)
    ?.  =(dev-name -.key)  %.n
    $(n +(n))
  ::
  ::  verify whether dev-map keys all contain dev-name
  ++  dev-name-dev-map
    |=  [=dev-name =dev-map]
    ^-  ?
    =/  keys  ~(tap in ~(key by dev-map))
    =/  len  (lent keys)
    =/  n  0
    |-  ?:  =(n len)  %.y
    =/  key  (snag n keys)
    ?.  =(dev-name -.key)  %.n
    $(n +(n))
  ::
  ::  verify whether dev-map and app-set correspond
  ++  dev-map-app-set
    |=  [=dev-map =app-set]
    =/  keys  ~(key by dev-map)
    =/  app-names  `^app-set`(~(run in keys) tail)
    ?:  =(app-set app-names)
      %.y
    %.n
  ::
  ::
  ::
  ::  cur-data validators
  ::
  ::  check whether app is in cur-choice
  ++  app-in-cur-choice
    |=  [=key =cur-choice]
    ^-  ?
    ?~  (fand ~[key] key-list.cur-choice)
      %.n
    %.y
  ::
  ::  check whether app is in cur-data
  ++  app-in-cur-data
    |=  [=key =cur-data]
    ^-  ?
    (~(has by cur-map.cur-data) key)
  ::
  ::  takes cur-map and aux-map and outputs the subset of cur-map with valid signatures
  ++  cur-map-aux-map-all
    |=  [=cur-map =aux-map our=@p now=@da]
    ^-  [^cur-map ^aux-map]
    =/  keys  ~(tap in ~(key by cur-map))
    =/  signed-cur-map  *^cur-map
    =/  signed-aux-map  *^aux-map
    =/  n  0
    =/  len  (lent keys)
    |-  ?:  =(n len)  [signed-cur-map signed-aux-map]
      =/  key  (snag n keys)
      =/  app-page  (~(get by cur-map) key)
      ?~  app-page  !!
      ?.  (new-app-page [our now dev-name.key key u.app-page])  $(n +(n))
      =/  app-set  (~(got by aux-map) dev-name.key)
      =/  new-app-set  (~(put in app-set) app-name.key)
      %=  $
        n  +(n)
        signed-cur-map  (~(put by signed-cur-map) key u.app-page)
        signed-aux-map  (~(put by signed-aux-map) dev-name.key new-app-set)
      ==
  ::
  ::  verify whether cats in cat-map exist in cat-set
  ++  cat-map-cat-set
    |=  [=cat-map =cat-set]
    (~(all by cat-map) |=(cat=category (~(has in cat-set) cat)))
  ::
  ::  verify whether keys in key-list the same as those in cat-map
  ++  key-list-cat-map
    |=  [=key-list =cat-map]
    =((silt key-list) ~(key by cat-map))
  ::
  ::  verify whether cur-choice(key-list) is subset of cur-map
  ++  key-list-cur-map
    |=  [=key-list =cur-map]
    (levy key-list |=(=key (~(has in ~(key by cur-map)) key)))
  ::
  ::  verify whether keys of cur-map correspond to aux-map
  ++  cur-map-aux-map
    |=  [=cur-map =aux-map]
    =/  cur-map-keys  ~(key by cur-map)
    =/  dev-name-add  |=  [=dev-name =app-set]
    ^-  (set [^dev-name app-name])
    (~(run in app-set) |=(=app-name [dev-name app-name]))
    =/  aux-map-1  (~(rut by aux-map) dev-name-add)
    =/  aux-map-2  (~(run by aux-map-1) |=(set=(set key) ~(tap in set)))
    =/  vals  (silt `(list key)`(zing ~(val by aux-map-2)))
    =(cur-map-keys vals)
  ::
  ::  verify that key-list doesn't repeat apps
  ++  key-list-duplicates
    |=  [=key-list]
    ^-  ?
    =(~(wyt in (silt key-list)) (lent key-list))
  ::
  --
::
::
::
::  input @p, output ship-type:app-store-logs
++  get-ship-type
  |=  =ship
  ^-  ship-type:app-store-logs
  =/  hex  `@ux`ship
  ?:  &((gte hex 0x0) (lte hex 0xff))  %galaxy
  ?:  &((gte hex 0x100) (lte hex 0xffff))  %star
  ?:  &((gte hex 0x1.0000) (lte hex 0xffff.ffff))  %planet
  ?:  &((gte hex 0x1.0000.0000) (lte hex 0xffff.ffff.ffff.ffff))  %moon
  ?:  &((gte hex 0x1.0000.0000.0000.0000) (lte hex 0xffff.ffff.ffff.ffff.ffff.ffff.ffff.ffff))  %comet
  !!
::
::
::
::  for comments, ordered map
++  com  ((on @da comment) lth)
::
::
::
--
