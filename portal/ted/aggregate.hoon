/-  spider, h=heap, d=diary, ch=chat, mov=portal-move
/+  *strandio, mip, io=agentio, p=portal
/*  indexer  %ship  /desk/ship
=,  strand=strand:spider
^-  thread:spider
|=  arg=vase
=/  m  (strand ,vase)
^-  form:m
;<  our=ship  bind:m  get-our
;<  now=time  bind:m  get-time
::
::  these 2 can be adjusted
::  the lesser the num, the more relevant stuff you will get
::  the higher, the less relevant (but there will be more)
=/  msgs-per-feels  100
=/  msgs-per-replies  100
::
::  one of these needs to be satisfied for a msg to be aggregated
=/  min-feels-req  3
=/  min-replies-req  200
::
;<  diarymap=(map flag:d diary:d)  bind:m
    (scry (map flag:d diary:d) /gx/diary/shelf/noun)
;<  heapmap=(map flag:h heap:h)  bind:m
    (scry (map flag:h heap:h) /gx/heap/stash/noun)
;<  chatmap=(map flag:ch chat:ch)  bind:m
    (scry (map flag:ch chat:ch) /gx/chat/chats/noun)
::
;<  notes-feed=store-result:d:mov  bind:m
  %+  scry  store-result:d:mov
  /gx/portal-store/item/feed/(scot %p our)//groups-notes/noun
;<  curios-feed=store-result:d:mov  bind:m
  %+  scry  store-result:d:mov
  /gx/portal-store/item/feed/(scot %p our)//groups-curios/noun
;<  msgs-feed=store-result:d:mov  bind:m
  %+  scry  store-result:d:mov
  /gx/portal-store/item/feed/(scot %p our)//groups-msgs/noun
::
?>  ?=([%item *] notes-feed)
?>  ?=([%item *] curios-feed)
?>  ?=([%item *] msgs-feed)
::
=/  diary-flags  ~(tap in ~(key by diarymap))
=/  heap-flags  ~(tap in ~(key by heapmap))
=/  chat-flags  ~(tap in ~(key by chatmap))
::
=/  [notes-from=@da notes-count=@t notes-exists=? actual-notes-feed=feed:d:mov]
  ?~  notes-exists=+.notes-feed
    [(sub now ~d365) '1.000' %.n ~]
  =/  notes  ;;(item:d:mov +.notes-feed)
  ?>  ?=([%feed *] bespoke.notes)
  ?~  feed.bespoke.notes
    [(sub now ~d365) '100' %.y ~]
  [(slav %da -:-:feed.bespoke.notes) '100' %.y feed.bespoke.notes]
::
=/  [curios-from=@dr curios-count=@t curios-exists=? actual-curios-feed=feed:d:mov]
  ?~  curios-exists=+.curios-feed
    [(sub now ~d60) '2.000' %.n ~]
  =/  curios  ;;(item:d:mov +.curios-feed)
  ?>  ?=([%feed *] bespoke.curios)
  ?~  feed.bespoke.curios
    [(sub now ~d60) '2.000' %.y ~]
  [(slav %da -:-:feed.bespoke.curios) '100' %.y feed.bespoke.curios]
::
=/  [msgs-from=@dr msgs-count=@t msgs-exists=? actual-msgs-feed=feed:d:mov]
  ?~  msgs-exists=+.msgs-feed
    [(sub now ~d365) '1.000' %.n ~]
  =/  msgs  ;;(item:d:mov +.msgs-feed)
  ?>  ?=([%feed *] bespoke.msgs)
  ?~  feed.bespoke.msgs
    [(sub now ~d365) '1.000' %.y ~]
  [(sub now ~h1.m5) '1.000' %.y feed.bespoke.msgs]
::
=|  new-notes-feed=feed:d:mov
=|  new-curios-feed=feed:d:mov
=|  new-msgs-feed=feed:d:mov
=|  aggregate=(map flag:ch writs:ch)
::
::  helper funcs
=/  to-cord
  |=  [=term =time]
  ^-  cord
  (crip ;:(weld (trip term) "/" (scow %ud time)))
::
=/  to-cord-msg
  |=  [=term =ship =time]
  ^-  cord
  %-  crip
  ;:  weld
      (trip term)     "/"
      (scow %p ship)  "/"
      (scow %ud time)
  ==
::
=/  compare-feed
  |=  [a=[time=cord *] b=[time=cord *]]
  %+  gte
  (slav %da time.a)
  (slav %da time.b)
::
=/  create-feed-card
  |=  [feed-name=cord =feed:d:mov]
  ^-  card:agent:gall
  %-  ~(poke pass:io /make-feed)
  :-  [our %portal-manager]
  :-  %portal-action
  !>
  ^-  action:mov
  [%create `our ~ `feed-name ~ ~ `[%feed feed] ~ ~ ~]
::
=/  edit-feed-card
  |=  [feed-name=cord =feed:d:mov]
  ^-  card:agent:gall
  %-  ~(poke pass:io /make-feed)
  :-  [our %portal-manager]
  :-  %portal-action
  !>
  ^-  action:mov
  [%edit [%feed our '' feed-name] ~ ~ `[%feed `feed]]
::
::  inefficient that I'm subbing,
::  should be creating from here because we have all the data already
=/  sub-to-many-card
  |=  =feed:d:mov
  ^-  card:agent:gall
  %-  ~(poke pass:io /sub-to-many)
  :-  [our %portal-manager]
  :-  %portal-action
  !>
  ^-  action:mov
  [%sub-to-many (turn feed |=([* * =key:d:mov] key))]
::
;<  ~  bind:m
  |-
  ?~  diary-flags
    =+  sorted-new=(sort new-notes-feed compare-feed)
    ?:  notes-exists  :: if feed item exists
      =/  merged-feed  (weld sorted-new actual-notes-feed)
      %-  send-raw-cards
      :~  (edit-feed-card 'groups-notes' merged-feed)
          (sub-to-many-card sorted-new)
      ==
    %-  send-raw-cards
    :~  (create-feed-card 'groups-notes' sorted-new)
        (sub-to-many-card sorted-new)
    ==
  ::
  =/  =flag:d  -:diary-flags
  ::
  =/  m  (strand ,~)
  ^-  form:m
  ;<  =notes:d  bind:m
    %+  scry  notes:d
    /gx/diary/diary/(scot %p p.flag)/[q.flag]/notes/newer/(scot %ud notes-from)/[notes-count]/noun
  =/  lis=(list [time note:n:d])  (tap:on:notes:d notes)
  =/  fed=feed:d:mov
    %+  turn  lis
    |=  [=time =note:n:d]
    :+  (scot %da time.note)  our
    [%groups-diary-note p.flag (to-cord q.flag time.note) '']
  =.  new-notes-feed  (weld fed new-notes-feed)
  $(diary-flags +:diary-flags)
::
;<  ~  bind:m
  |-
  ?~  heap-flags
    =+  sorted-new=(sort new-curios-feed compare-feed)
    ?:  curios-exists  :: if feed item exists
      =/  merged-feed  (weld sorted-new actual-curios-feed)
      %-  send-raw-cards
      :~  (edit-feed-card 'groups-curios' merged-feed)
          (sub-to-many-card sorted-new)
      ==
    %-  send-raw-cards
    :~  (create-feed-card 'groups-curios' sorted-new)
        (sub-to-many-card sorted-new)
    ==
  ::
  =/  =flag:h  -:heap-flags
  ::
  =/  m  (strand ,~)
  ^-  form:m
  ;<  =curios:h  bind:m
    %+  scry  curios:h
    /gx/heap/heap/(scot %p p.flag)/[q.flag]/curios/newer/(scot %ud curios-from)/[curios-count]/noun
  =/  lis=(list [time curio:c:h])  (tap:on:curios:h curios)
  =/  fed=feed:d:mov
    %+  murn  lis
    |=  [=time =curio:c:h]
    ?^  replying.heart.curio
      ~
    %-  some
    :+  (scot %da time.curio)  our
    [%groups-heap-curio p.flag (to-cord q.flag time.curio) '']
  =.  new-curios-feed  (weld fed new-curios-feed)
  $(heap-flags +:heap-flags)
::
;<  ~  bind:m
  |^
  ?~  chat-flags
    ::  the following is absolutely horrendous
    =/  to-sub
      ::  there will be redundant subs
      ^-  (set [time=cord =ship =key:d:mov])
      %-  ~(run in (sort-lists aggregate))
      |=  [=flag:ch =time =writ:w:d:mov]
      :+  (scot %da q.id.writ)  our
        [%groups-chat-msg p.flag (to-cord-msg q.flag p.id.writ q.id.writ) '']
    =/  aggregated-msgs
      ^-  (set [=time =ship =key:d:mov])
      ::  need to sort by feels and replies to know what to add to feed
      %-  ~(run in (sort-lists aggregate))
      |=  [=flag:ch =time =writ:w:d:mov]
      :+  q.id.writ  our
        %-  to-key:conv:p
        [%groups-chat-msg p.flag (to-cord-msg q.flag p.id.writ q.id.writ) '']
    =/  feed-to-set
      ;;  (set [=time =ship =key:d:mov])
      %-  silt
      %+  turn  actual-msgs-feed
      |=  [time=cord =ship =key:d:mov]
      [(slav %da time) ship key]
    =/  new
      ^-  (list [=time =ship =key:d:mov])
      ?:  msgs-exists
        =+  (~(dif in aggregated-msgs) feed-to-set)
        ~(tap in -)
      ~(tap in aggregated-msgs)
    =/  sorted
      ^-  (list [=time =ship =key:d:mov])
      %+  sort
        ?:  msgs-exists
          %~  tap  in
          (~(uni in aggregated-msgs) feed-to-set)
        new
      |=  [a=[=time *] b=[=time *]]
      (gte time.a time.b)
    =/  sorted-to-feed
      %+  turn  sorted
      |=  [=time =ship =key:d:mov]
      [(scot %da time) ship key]
    ?:  msgs-exists
      %-  send-raw-cards
      :~  (edit-feed-card 'groups-msgs' sorted-to-feed)
          (sub-to-many-card ~(tap in to-sub))
      ==
    %-  send-raw-cards
    :~  (create-feed-card 'groups-msgs' sorted-to-feed)
        (sub-to-many-card ~(tap in to-sub))
    ==
  ::
  =/  =flag:d  -:chat-flags
  ::
  =/  m  (strand ,~)
  ^-  form:m
  ;<  =writs:ch  bind:m
    %+  scry  writs:ch
    /gx/chat/chat/(scot %p p.flag)/[q.flag]/writs/newer/(scot %ud msgs-from)/[msgs-count]/noun
  ?:  =(writs *writs:ch)
    $(chat-flags +:chat-flags)
  =/  filtered-writs
    %-  malt
    =+  (tap:on:writs:ch writs)
    %+  skim  -
    |=  [=time =writ:w:d:mov]
    ?|  (gte ~(wyt by feels.writ) min-feels-req)
        (gte ~(wyt in replied.writ) min-replies-req)
    ==
  =.  aggregate  (~(put by aggregate) flag filtered-writs)
  $(chat-flags +:chat-flags)
  ++  sort-lists
    |=  aggregate=(mip:mip flag:ch time writ:w:d:mov)
    =/  msgs  ~(tap bi:mip aggregate)  ::  (list [flag:ch time writ:w:d:mov])
    ::  sorts by 1. greater count of replies/feels, 2. newer post
    =/  by-feels
      %+  swag  [0 msgs-per-feels]
      %+  sort  msgs
      |=  [a=[=flag:ch =time =writ:w:d:mov] b=[=flag:ch =time =writ:w:d:mov]]
      =/  first   ~(wyt by feels.writ.a)
      =/  second  ~(wyt by feels.writ.b)
      ?:  =(first second)
        (gte q.id.writ.a q.id.writ.b)
      (gth first second)
    =/  by-replies
      %+  swag  [0 msgs-per-replies]
      %+  sort  msgs
      |=  [a=[=flag:ch =time =writ:w:d:mov] b=[=flag:ch =time =writ:w:d:mov]]
      =/  first   ~(wyt in replied.writ.a)
      =/  second  ~(wyt in replied.writ.b)
      ?:  =(first second)
        (gte q.id.writ.a q.id.writ.b)
      (gth first second)
    (silt (welp by-feels by-replies))
  ++  deduplicate
    |=  [a=(list [=flag:ch =time =writ:w:d:mov])]
    %-  flop  %-  tail
    %^  spin  a  *(list [=flag:ch =time =writ:w:d:mov])
    |=  [el=[=flag:ch =time =writ:w:d:mov] st=(list [=flag:ch =time =writ:w:d:mov])]
    ?~  (find [el]~ st)
      el^[el st]
    [el st]
  --
::
::
(pure:m !>(~))
