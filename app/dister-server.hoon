/-  *app-store-action, *app-store-data, docket, spider
/+  default-agent, dbug, app-store, sig
=,  clay
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0
  ~
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
  =.  state  ~
  `this
::  
++  on-save  !>(state)
++  on-load   
  |=  old=vase
  ^-  (quip card _this)
  `this(state !<(state-0 old))
::  
::  on-poke is for receiving pokes from

++  on-poke 
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?+    mark   (on-poke:default mark vase) 
      %app-store-dister-action
    =/  act  !<(dister-action vase)
    ?+    -.act    (on-poke:default mark vase)
        %sign  
      ?>  =(src.bowl our.bowl)
      ~&  "distributor ship: sending signature to %dev-server"
      =/  signature  (sign:sig [our.bowl now.bowl hash.act])
      :_  this
      [%pass /send-sig %agent [dev-name.key.act %dev-server] %poke %app-store-dister-action !>([%send-sig key.act signature])]~
    ::
    ==  
  ::
    
    ::  %get-desk
    ::~&  "%dev-server: getting desk data"
    ::=/  tid  `@ta`(cat 3 'thread_' (scot %uv (sham eny.bowl)))
    ::=/  ta-now  `@ta`(scot %da now.bowl)
    ::=/  clay-task  (some [%warp dev-name.act app-name.act ~ %sing %z da+now.bowl /])
    ::=/  start-args  [~ `tid byk.bowl(r da+now.bowl) %get-docket !>(clay-task)]
    :::_  this
    :::~
    ::  [%pass /thread/[ta-now] %agent [our.bowl %spider] %watch /thread-result/[tid]]
    ::  [%pass /thread/[ta-now] %agent [our.bowl %spider] %poke %spider-start !>(start-args)]
    ::==
  ::
      ::  sending a signature from distributor ship to dev-server


    
  ==
  
::
++  on-arvo   on-arvo:default
++  on-watch  on-watch:default  
++  on-leave  on-leave:default
++  on-peek   on-peek:default
++  on-agent  on-agent:default
::  |=  [=wire =sign:agent:gall]
::  ^-  (quip card _this)
::  ?+    -.wire  (on-agent:default wire sign)
::      %thread
::    ?+    -.sign  (on-agent:default wire sign)
::        %poke-ack
::      ?~  p.sign
::        %-  (slog leaf+"Thread started successfully" ~)
::        `this
::      %-  (slog leaf+"Thread failed to start" u.p.sign)
::      `this
::    ::
::        %fact
::      ?+    p.cage.sign  (on-agent:default wire sign)
::          %thread-fail
::        =/  err  !<  (pair term tang)  q.cage.sign
::        %-  (slog leaf+"Thread failed: {(trip p.err)}" q.err)
::        `this
::          %thread-done
::        =/  gift  !<(gift-arvo q.cage.sign)
::        ?+  -.gift  `this   
::            %writ  
::          =/  rant  (need p.gift)
::          ::~&  q.r.rant
::          ~&  q.r.rant
::          ::=/  dome  !<(dome q.r.rant)
::          ::~&  ank.dome
::          `this
::        ==
::        ::~&  !<(strand:spider q.cage.sign)
::        ::=/  res  (trip !<(term q.cage.sign))
::        ::%-  (slog leaf+"Result: {res}" ~)
::        ::`this
::      ==
::    ==
::  ==
++  on-fail   on-fail:default
--

