/-  *app-store-action, *app-store-data
/+  default-agent, dbug, app-store
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0
  $:  %0
      =usr-data
  ==
+$  card  card:agent:gall
--
%-  agent:dbug
=|  state-0
=*  state  -
^-  agent:gall
|_  =bowl:gall
+*  this      .
    default   ~(. (default-agent this %|) bowl)
++  on-init
  ^-  (quip card _this)
  =.  state  [%0 ~]
  `this
::
++  on-save   !>(state)
++  on-load   
  |=  old=vase
  ^-  (quip card _this)
  `this(state !<(state-0 old))
::  
::  on-poke is for subscribing to Curators
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?>  =(our.bowl src.bowl)
  
  ?:  ?=(%app-store-visit-dev-action mark)
  =/  act  !<(visit-dev-action vase)

  ::[%rate %unrate %add-com %del-com %add-rev %del-rev]
  ?-    -.act  
      %rate  
    ~&  "%usr-server: rating app"
    :_  this
    [%pass /visit-dev %agent [dev-name.key.act %dev-server] %poke %app-store-visit-dev-action !>(act)]~
      %unrate
    ~&  "%usr-server: unrating app"
    :_  this
    [%pass /visit-dev %agent [dev-name.key.act %dev-server] %poke %app-store-visit-dev-action !>(act)]~
      %add-com
    ~&  "%usr-server: adding comment"
    :_  this
    [%pass /visit-dev %agent [dev-name.key.act %dev-server] %poke %app-store-visit-dev-action !>(act)]~
      %del-com
    ~&  "%usr-server: deleting comment"
    :_  this
    [%pass /visit-dev %agent [dev-name.key.act %dev-server] %poke %app-store-visit-dev-action !>(act)]~  
      %add-rev
    ~&  "%usr-server: adding review"
    :_  this
    [%pass /visit-dev %agent [dev-name.key.act %dev-server] %poke %app-store-visit-dev-action !>(act)]~
      %del-rev
    ~&  "%usr-server: deleting review"
    :_  this
    [%pass /visit-dev %agent [dev-name.key.act %dev-server] %poke %app-store-visit-dev-action !>(act)]~ 
  ==
  ?>  ?=(%app-store-usr-action mark)
  =/  act  !<(usr-action vase)
  =/  cur-name-wire  /(scot %p +.act)
  ?-    -.act
      %sub    
    ~&  "%usr-server: subscribing to {(scow %p +.act)}"
    :_  this
    [%pass cur-name-wire %agent [+.act %cur-server] %watch /cur-page]~
  ::
      %unsub  
    ~&  "%usr-server: unsubscribing from {(scow %p +.act)}"
    :-  [%pass cur-name-wire %agent [+.act %cur-server] %leave ~]~
    this(usr-data.state `^usr-data`(~(del by usr-data.state) +.act))       
  ==
::  
++  on-arvo   on-arvo:default
++  on-watch  on-watch:default
++  on-leave  on-leave:default
::
::  on-agent is for receiving subscription updates from Curators
++  on-agent 
  |=  [=wire =sign:agent:gall]
  ^-  (quip card _this)
  =/  cur-name-tape  (trip `@t`-.wire)
  ?+    -.sign  (on-agent:default wire sign)
      %watch-ack
    ?~  p.sign
      ~&  "%usr-server: subscribe to {cur-name-tape} succeeded"
      `this
    ~&  "%usr-server: subscribe to {cur-name-tape} failed"
    `this
  ::
      %kick
    ~&  "%usr-server: got kick from {cur-name-tape}, resubscribing..."
    =/  cur-name  `@p`(slav %p -.wire)
    :_  this
    [%pass wire %agent [cur-name %cur-server] %watch /cur-page]~
  ::
      %fact
    :: doesnt work well
    =/  cur-page  !<(cur-page q.cage.sign)
    ~&  "%usr-server: received cur-page from {cur-name-tape}"
    =/  cur-name  `@p`(slav %p -.wire)
    ?~  cur-page  
      `this(+.state (~(del by `^usr-data`+.state) `^cur-name`cur-name))  ::should it delete key if it receives ~
    ?>  =(cur-name cur-name.u.cur-page)
    `this(+.state (~(put by `^usr-data`+.state) `^cur-name`cur-name `^cur-page`cur-page))
  ==
::
++  on-fail   on-fail:default
::
++  on-peek   
  |=  =path
  ^-  (unit (unit cage)) 
  ?+  path  (on-peek:default path)
      [%x %all ~]  ``usr-data+!>(+.state)
  ::  
      [%x %is-cur @ ~]
    =/  cur=@p  (slav %p i.t.t.path)
    ``noun+!>(`?`(~(has by `^usr-data`+.state) cur))
  ::
      [%x %get-cur @ ~]
    =/  cur=@p  (slav %p i.t.t.path)
    =/  maybe-cur  (~(get by `^usr-data`+.state) cur)
    ?~  maybe-cur  ``cur-page+!>(`^cur-page`maybe-cur)
    ``cur-page+!>(`^cur-page`u.maybe-cur)
  ==
--
