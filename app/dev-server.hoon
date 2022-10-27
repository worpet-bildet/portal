/-  *app-store-action, *app-store-data, docket, spider
/+  default-agent, dbug, app-store
=,  clay
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0
  $:  %0
      =dev-data
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
  =.  state  [%0 [~ ~]]
  `this
::  
++  on-save  !>(state)
++  on-load   
  |=  old=vase
  ^-  (quip card _this)
  `this(state !<(state-0 old))
::  
::  on-poke is for receiving pokes from
::  - visitors (visit-dev-action)
::  - the Developer (dev-action)
++  on-poke 
  |=  [=mark =vase]
  ^-  (quip card _this)
  ::   
  ::  when poke is from visitors to app-page (can also be from our.bowl)
  ?:  ?=(%app-store-visit-dev-action mark) 
    =/  act  !<(visit-dev-action vase)
    ?-    -.act
      %rate  
    ~&  "%dev-server: rating app"
    =^  changed  dev-data
    (usr-visit:dev:app-store [dev-data.state src.bowl key.act act now.bowl])
    ?:  =(changed %unchanged)  `this  :_  this
    [%give %fact [/dev-update]~ %app-store-dev-update !>(`[[%usr-visit key.act] dev-data])]~
  ::    
      %unrate  
    ~&  "%dev-server: removing rating from app"
    =^  changed  dev-data
    (usr-visit:dev:app-store [dev-data.state src.bowl key.act act now.bowl])
    ?:  =(changed %unchanged)  `this  :_  this
    [%give %fact [/dev-update]~ %app-store-dev-update !>(`[[%usr-visit key.act] dev-data])]~
  ::
      %add-com 
    ~&  "%dev-server: adding comment"    
    =^  changed  dev-data
    (usr-visit:dev:app-store [dev-data.state src.bowl key.act act now.bowl])
    ?:  =(changed %unchanged)  `this  :_  this
    [%give %fact [/dev-update]~ %app-store-dev-update !>(`[[%usr-visit key.act] dev-data])]~
  ::
      %del-com  
    ~&  "%dev-server: deleting comment"
    =^  changed  dev-data
    (usr-visit:dev:app-store [dev-data.state src.bowl key.act act now.bowl])
    ?:  =(changed %unchanged)  `this  :_  this
    [%give %fact [/dev-update]~ %app-store-dev-update !>(`[[%usr-visit key.act] dev-data])]~
  ::
      %add-rev
    ~&  "%dev-server: adding review"    
    =^  changed  dev-data
    (usr-visit:dev:app-store [dev-data.state src.bowl key.act act now.bowl])
    ?:  =(changed %unchanged)  `this  :_  this
    [%give %fact [/dev-update]~ %app-store-dev-update !>(`[[%usr-visit key.act] dev-data])]~
  ::
      %del-rev
    ~&  "%dev-server: deleting review"    
    =^  changed  dev-data
    (usr-visit:dev:app-store [dev-data.state src.bowl key.act act now.bowl])
    ?:  =(changed %unchanged)  `this  :_  this
    [%give %fact [/dev-update]~ %app-store-dev-update !>(`[[%usr-visit key.act] dev-data])]~
    ==
::  
  ::  when Developer is modifying data
  ?>  =(our.bowl src.bowl)
  ?>  ?=(%app-store-dev-action mark)  
  =/  act  !<(dev-action vase)
  ?-    -.act
      %add
    ~&  "%dev-server: adding app page"
    =^  changed  dev-data
    (add:dev:app-store [our.bowl dev-data.state act])
    ?:  =(changed %unchanged)  `this  :_  this
    [%give %fact [/dev-update]~ %app-store-dev-update !>(`[[%add our.bowl app-name.act] dev-data])]~
  ::
      %edit
    ~&  "%dev-server: editing app page"
    =^  changed  dev-data
    (edit:dev:app-store [our.bowl dev-data.state act])
    ?:  =(changed %unchanged)  `this  :_  this
    [%give %fact [/dev-update]~ %app-store-dev-update !>(`[[%edit our.bowl app-name.act] dev-data])]~ 
  ::
      %del
    ~&  "%dev-server: deleting app page"
    =^  changed  dev-data
    (del:dev:app-store [our.bowl dev-data.state act])
    ?:  =(changed %unchanged)  `this  :_  this
    [%give %fact [/dev-update]~ %app-store-dev-update !>(`[[%del our.bowl app-name.act] dev-data])]~ 
  ::
      %get-docket
    ~&  "%dev-server: getting docket data"
    =/  tid  `@ta`(cat 3 'thread_' (scot %uv (sham eny.bowl)))
    =/  ta-now  `@ta`(scot %da now.bowl)
    =/  clay-task  (some [%warp dev-name.act app-name.act ~ %sing %x da+now.bowl /desk/docket-0])
    =/  start-args  [~ `tid byk.bowl(r da+now.bowl) %get-docket !>(clay-task)]
    :_  this
    :~
      [%pass /thread/[ta-now] %agent [our.bowl %spider] %watch /thread-result/[tid]]
      [%pass /thread/[ta-now] %agent [our.bowl %spider] %poke %spider-start !>(start-args)]
    ==
  ==
::
++  on-arvo   on-arvo:default
::
::  on watch is for receiving Curators' subscription requests
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?>  =([%dev-update ~] path)
  ~&  "%dev-server: received subscription request"
  =/  dev-update  (some [[%init ~] dev-data.state])
  :_  this
  [%give %fact ~ %app-store-dev-update !>(dev-update)]~
::  
++  on-leave  on-leave:default
++  on-peek   on-peek:default
++  on-agent  
  |=  [=wire =sign:agent:gall]
  ^-  (quip card _this)
  ?+    -.wire  (on-agent:default wire sign)
      %thread
    ?+    -.sign  (on-agent:default wire sign)
        %poke-ack
      ?~  p.sign
        %-  (slog leaf+"Thread started successfully" ~)
        `this
      %-  (slog leaf+"Thread failed to start" u.p.sign)
      `this
    ::
        %fact
      ?+    p.cage.sign  (on-agent:default wire sign)
          %thread-fail
        =/  err  !<  (pair term tang)  q.cage.sign
        %-  (slog leaf+"Thread failed: {(trip p.err)}" q.err)
        `this
          %thread-done
        ~&  !<(gift-arvo q.cage.sign)
        ::~&  !<(strand:spider q.cage.sign)
        ::=/  res  (trip !<(term q.cage.sign))
        ::%-  (slog leaf+"Result: {res}" ~)
        `this
      ==
    ==
  ==
++  on-fail   on-fail:default
--

