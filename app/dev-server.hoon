/-  *app-store-action, *app-store-data
/+  default-agent, dbug, app-store
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
::  on-poke is for modifiying app data and sending it to subscribers (Curators)
++  on-poke 
  |=  [=mark =vase]
  ^-  (quip card _this)  
::  
  ::  when poke is from visitors to app-page (can also be from our.bowl)
  ?:  ?=(%app-store-visit-dev-action mark) 
::
  :: TODO maybe create a print if there is a wrong poke?
    =/  act  !<(visit-dev-action vase)
    ?-    -.act
      %rate  
    ~&  "%dev-server: rating app"
    =^  changed  dev-data
    (usr-visit:dev:app-store [dev-data.state src.bowl key.act act now.bowl])
    ?:  =(changed %unchanged)  `this  :_  this
    [%give %fact [/dev-update]~ %app-store-dev-update !>(`dev-update``[[%usr-visit key.act] dev-data])]~
  ::    
      %unrate  
    ::  currently it also sends sub update even if %unrate
    ::  was done on a rating that never existed
    ~&  "%dev-server: removing rating from app"
    =^  changed  dev-data
    (usr-visit:dev:app-store [dev-data.state src.bowl key.act act now.bowl])
    ?:  =(changed %unchanged)  `this  :_  this
    [%give %fact [/dev-update]~ %app-store-dev-update !>(`dev-update``[[%usr-visit key.act] dev-data])]~
  ::
      %add-com 
    
    ~&  "%dev-server: adding comment"    
    =^  changed  dev-data
    (usr-visit:dev:app-store [dev-data.state src.bowl key.act act now.bowl])
    ?:  =(changed %unchanged)  `this  :_  this
    [%give %fact [/dev-update]~ %app-store-dev-update !>(`dev-update``[[%usr-visit key.act] dev-data])]~
  ::
      %del-com  
   
   ~&  "%dev-server: deleting comment"
  =^  changed  dev-data
    (usr-visit:dev:app-store [dev-data.state src.bowl key.act act now.bowl])
    ?:  =(changed %unchanged)  `this  :_  this
    [%give %fact [/dev-update]~ %app-store-dev-update !>(`dev-update``[[%usr-visit key.act] dev-data])]~
 ::
      %add-rev
   
    ~&  "%dev-server: adding review"    
    =^  changed  dev-data
    (usr-visit:dev:app-store [dev-data.state src.bowl key.act act now.bowl])
    ?:  =(changed %unchanged)  `this  :_  this
    [%give %fact [/dev-update]~ %app-store-dev-update !>(`dev-update``[[%usr-visit key.act] dev-data])]~
  ::
      %del-rev
    
    ~&  "%dev-server: deleting review"    
    =^  changed  dev-data
    (usr-visit:dev:app-store [dev-data.state src.bowl key.act act now.bowl])
    ?:  =(changed %unchanged)  `this  :_  this
    [%give %fact [/dev-update]~ %app-store-dev-update !>(`dev-update``[[%usr-visit key.act] dev-data])]~
    ==
::  
  ::  when poke is from our.bowl
  ?>  =(our.bowl src.bowl)
  ?>  ?=(%app-store-dev-action mark)  
  =/  act  !<(dev-action vase)
  ?-    -.act
      %add
    ~&  "%dev-server: adding app page"
    =^  changed  dev-data
    (add:dev:app-store [our.bowl dev-data.state act])
    ?:  =(changed %unchanged)  `this  :_  this
    [%give %fact [/dev-update]~ %app-store-dev-update !>(`dev-update``[[%add our.bowl app-name.act] dev-data])]~
  ::
      %edit
    ~&  "%dev-server: editing app page"
    =^  changed  dev-data
    (edit:dev:app-store [our.bowl dev-data.state act])
    ?:  =(changed %unchanged)  `this  :_  this
    [%give %fact [/dev-update]~ %app-store-dev-update !>(`dev-update``[[%edit our.bowl app-name.act] dev-data])]~ 
  ::
      %del
    ~&  "%dev-server: deleting app page"
    =^  changed  dev-data
    (del:dev:app-store [our.bowl dev-data.state act])
    ?:  =(changed %unchanged)  `this  :_  this
    [%give %fact [/dev-update]~ %app-store-dev-update !>(`dev-update``[[%del our.bowl app-name.act] dev-data])]~ 
  ::
      ::%get-docket

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
  =/  dev-update  (some [`change`[%init ~] dev-data.state])
  :_  this
  [%give %fact ~ %app-store-dev-update !>(`^dev-update`dev-update)]~
::  
++  on-leave  on-leave:default
++  on-peek   on-peek:default
++  on-agent  on-agent:default
++  on-fail   on-fail:default
--

