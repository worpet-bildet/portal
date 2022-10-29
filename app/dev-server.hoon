/-  *app-store-action, *app-store-data, docket, spider
/+  default-agent, dbug, app-store, sig
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
  ?+    mark   (on-poke:default mark vase)  
      ::  when poke is from visitors to app-page (can also be from our.bowl)
      %app-store-visit-dev-action
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
      %app-store-dev-action
    ?>  =(our.bowl src.bowl)
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
    == 
  ::
      ::  receiving a signature from distributor ship to dev-server
      %app-store-dister-action  
    =/  act  !<(dister-action vase)
    ?+    -.act    (on-poke:default mark vase)
        %send-sig  
      ~&  "%dev-server: receiving signature"
      =/  app-page  (need (~(get by dev-map.dev-data.state) key.act))
      :-  ~
      %=  this 
        dev-map.dev-data
      (~(put by dev-map.dev-data.state) key.act app-page(signature signature.act))
      ==
    ==
    ::  ::TODO  assert (?) that dister that sends sig is the same as in dev-desk in app-page 
    ::  ::  assert =(developer-desk src.bowl)  
  ==

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
++  on-arvo   on-arvo:default
++  on-leave  on-leave:default
++  on-peek   on-peek:default
++  on-agent  on-agent:default
++  on-fail   on-fail:default
--

