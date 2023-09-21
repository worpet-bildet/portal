/-  spider, h=heap, d=diary, mov=portal-move
/+  *strandio, mip, io=agentio
=,  strand=strand:spider
^-  thread:spider
|=  arg=vase
=/  m  (strand ,vase)
^-  form:m
;<  our=ship  bind:m  get-our
;<  now=time  bind:m  get-time
::
;<  diarymap=(map flag:d diary:d)  bind:m  
    (scry (map flag:d diary:d) /gx/diary/shelf/noun)
;<  heapmap=(map flag:h heap:h)  bind:m  
    (scry (map flag:h heap:h) /gx/heap/stash/noun)
::
;<  notes-feed=store-result:d:mov  bind:m
  %+  scry  store-result:d:mov
  /gx/portal-store/item/feed/(scot %p our)//groups-notes/noun
;<  curios-feed=store-result:d:mov  bind:m
  %+  scry  store-result:d:mov
  /gx/portal-store/item/feed/(scot %p our)//groups-curios/noun
::
?>  ?=([%item *] notes-feed)
?>  ?=([%item *] curios-feed)
::
=/  diary-flags  ~(tap in ~(key by diarymap))
=/  heap-flags  ~(tap in ~(key by heapmap))
::
=/  [notes-from=@da notes-count=@t notes-exists=? actual-notes-feed=feed:d:mov]
  ?~  notes-exists=+.notes-feed
    [(sub now ~d14) '1.000' %.n ~]
  =/  notes  ;;(item:d:mov +.notes-feed)
  ?>  ?=([%feed *] bespoke.notes)
  ?~  feed.bespoke.notes
    [(sub now ~h1.m5) '100' %.y ~]
  [(slav %da -:-:feed.bespoke.notes) '100' %.y feed.bespoke.notes]
::
=/  [curios-from=@dr curios-count=@t curios-exists=? actual-curios-feed=feed:d:mov]
  ?~  curios-exists=+.curios-feed
    [(sub now ~d14) '1.000' %.n ~]
  =/  curios  ;;(item:d:mov +.curios-feed)
  ?>  ?=([%feed *] bespoke.curios)
  ?~  feed.bespoke.curios
    [(sub now ~h1.m5) '100' %.y ~]
  [(slav %da -:-:feed.bespoke.curios) '100' %.y feed.bespoke.curios]
::
=|  new-notes-feed=feed:d:mov
=|  new-curios-feed=feed:d:mov
::
::  helper funcs
=/  to-cord
  |=  [=term =time]
  ^-  cord
  (crip ;:(weld (trip term) "/" (scow %ud time)))
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
      ~&  >  "sorted new"
      ~&  sorted-new
      ~&  >  "merged feed"
      ~&  merged-feed
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
    :+  (scot %da time)  our
    [%groups-diary-note p.flag (to-cord q.flag time) '']
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
    %+  turn  lis
    |=  [=time =curio:c:h]
    :+  (scot %da time)  our
    [%groups-heap-curio p.flag (to-cord q.flag time) '']
  =.  new-curios-feed  (weld fed new-curios-feed)
  $(heap-flags +:heap-flags)
(pure:m !>(~))
