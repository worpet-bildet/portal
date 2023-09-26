/-  spider, ch=chat, mov=portal-move
/+  *strandio, mip, io=agentio
=,  strand=strand:spider
^-  thread:spider
|=  arg=vase
=/  m  (strand ,vase)
^-  form:m
=|  aggregate=(map flag:ch writs:ch)
;<  our=ship  bind:m  get-our
;<  now=time  bind:m  get-time
;<  chatmap=(map flag:ch chat:ch)  bind:m  
    (scry (map flag:ch chat:ch) /gx/chat/chats/noun)
;<  feels-col=store-result:d:mov  bind:m
  %+  scry  store-result:d:mov
  /gx/portal-store/item/collection/(scot %p our)//msgs-by-feels/noun
;<  replies-col=store-result:d:mov  bind:m
  %+  scry  store-result:d:mov
  /gx/portal-store/item/collection/(scot %p our)//msgs-by-replies/noun
?>  ?=([%item *] feels-col)
?>  ?=([%item *] replies-col)
=/  flags  ~(tap in ~(key by chatmap))
::  ~&  "%chats-thread: starting outer loop"
;<  ~  bind:m
  |^
  ?~  flags
    ::  ~&  "%chats-thread: sending cards"
    ::
    %-  send-raw-cards
    ;:  welp
        ?~  item.feels-col
          (create-col-card 'msgs-by-feels')^~
        ?>  ?=([%collection *] bespoke.item.feels-col)
        :-  (edit-col-card 'msgs-by-feels')
        (turn key-list.bespoke.item.feels-col destroy-msg-card)
        ::
        ?~  item.replies-col
          (create-col-card 'msgs-by-replies')^~
        ?>  ?=([%collection *] bespoke.item.replies-col)
        :-  (edit-col-card 'msgs-by-replies')
        (turn key-list.bespoke.item.replies-col destroy-msg-card)
        ::
        (cards (sort-lists aggregate))
    ==
  ::
  =/  flag  -:flags
  ::  ~&  "%chats-thread: starting inner loop"
  ::  we assume that per chat there is no more than 10k messages over last 24h
  =/  m  (strand ,~)
  ^-  form:m
  ;<  last24h=writs:ch  bind:m
    %+  scry  writs:ch
    /gx/chat/chat/(scot %p -.flag)/[+.flag]/writs/newer/(scot %ud (sub now ~d1))/10.000/noun
  ::  ~&  "%chats-thread: scry success"
  ::
  ?:  =(last24h *writs:ch)
    ::  ~&  "%chats-thread: last 24h empty, moving on"
    $(flags +:flags)
  =.  aggregate  (~(put by aggregate) flag last24h)
  ::  ~&  "%chats-thread: adding last 24h, moving on"
  $(flags +:flags)
  ::
  ++  sort-lists
    |=  aggregate=(mip:mip flag:ch time writ:w:d:mov)
    =/  msgs  ~(tap bi:mip aggregate)  ::  (list [flag:ch time writ:w:d:mov])
    ::  sorts by 1. greater count of replies/feels, 2. newer post
    =/  by-feels
      %+  swag  [0 25]
      %+  sort  msgs
      |=  [a=[=flag:ch =time =writ:w:d:mov] b=[=flag:ch =time =writ:w:d:mov]]
      =/  first   ~(wyt by feels.writ.a)
      =/  second  ~(wyt by feels.writ.b)
      ?:  =(first second)
        (gte time.a time.b)
      (gth first second) 
    =/  by-replies
      %+  swag  [0 25]
      %+  sort  msgs
      |=  [a=[=flag:ch =time =writ:w:d:mov] b=[=flag:ch =time =writ:w:d:mov]]
      =/  first   ~(wyt in replied.writ.a)
      =/  second  ~(wyt in replied.writ.b)
      ?:  =(first second)
        (gte time.a time.b)
      (gth first second) 
    ::
    ::  ~&  "%chats-thread: created 2 sorted lists"
    [by-feels by-replies]
    ::
  ::
  ++  cards
    |=  [by-feels=(list [=flag:ch =time =writ:w:d:mov]) by-replies=(list [=flag:ch =time =writ:w:d:mov])]
    ^-  (list card:agent:gall)
    ::  doesn't deduplicate items, but who cares
    ;:  welp
      (chat-msg-cards ~s0 'msgs-by-feels' by-feels)
      (chat-msg-cards ~s1 'msgs-by-replies' by-replies)
    ==
  ::
  ++  destroy-msg-card
    |=  =key:d:mov
    ^-  card:agent:gall
    %-  ~(poke pass:io /destroy-msg) 
    :-  [our %portal-manager] 
    :-  %portal-action
    !>  
    ^-  action:mov
    [%destroy key]
  ::
  ++  create-col-card
    |=  col-name=cord
    ^-  card:agent:gall
    %-  ~(poke pass:io /make-col) 
    :-  [our %portal-manager] 
    :-  %portal-action
    !>  
    ^-  action:mov
    :*  %create  `our  ~  `col-name  ~
            `[%collection '' '' '' ~]
            ~  ~  ~
        ==
  ::
  ++  edit-col-card
    |=  col-name=cord
    ^-  card:agent:gall
    %-  ~(poke pass:io /make-col) 
    :-  [our %portal-manager] 
    :-  %portal-action
    !>  
    ^-  action:mov
    :*  %edit  [%collection our '' col-name]  ~  
            `[%collection ~ ~ ~ `*key-list:d:mov]
        ==
  ::
  ++  chat-msg-cards
    |=  [start-time=@dr add-to-col=cord a=(list [=flag:ch =time =writ:w:d:mov])]
    ^-  (list card:agent:gall)
    %-  head  %-  tail
    %^  spin  a  [*(list card:agent:gall) start-time]
    |=  [p=[=flag:ch =time =writ:w:d:mov] q=[cards=(list card:agent:gall) inc=@dr]]
    :-  p
    %=  q
      cards  (snoc cards.q (chat-msg-card add-to-col (scot %da (add now inc.q)) p))
      inc  (add inc.q ~s0..0001)
    ==
  ::
  ++  chat-msg-card
    |=  [add-to-col=cord item-time=cord =flag:ch =time =writ:w:d:mov]
    ^-  card:agent:gall
    %-  ~(poke pass:io /make-chat-msg) 
    :-  [our %portal-manager] 
    :-  %portal-action
    !>  
    ^-  action:mov
    :*  %create  `our  ~  `item-time  ~
        :-  ~  
        :*  %groups-chat-msg  
            group:perm:(~(got by chatmap) flag)
            flag  id:writ  content:writ 
            ~(wyt by feels.writ)  ~(wyt in replied.writ)
        ==
        [%collection our '' add-to-col]^~
        ~  ~
    ==
  ::
  ++  deduplicate
    |=  [a=(list [=flag:ch =time =writ:w:d:mov])]
    %-  flop  %-  tail
    %^  spin  a  *(list [=flag:ch =time =writ:w:d:mov])  
    |=  [el=[=flag:ch =time =writ:w:d:mov] st=(list [=flag:ch =time =writ:w:d:mov])]
    ?~  (find [el]~ st)
      el^[el st]
    [el st]
  --
(pure:m !>(~))
