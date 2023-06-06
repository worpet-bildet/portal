/-  *action, treaty
/+  default-agent, dbug, sig
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0
  $:  %0
      our-apps=(set [ship desk])
      treaties=(map [ship desk] treaty:treaty)
      portal-devs=(map [ship desk] ship)
  ==
+$  card  card:agent:gall
::
++  parse-dist-desk
  |=  [dist-desk=@t]
  ^-  (unit [dist-name=ship desk-name=@tas])
  =/  dist-desk  (trip dist-desk)
  =/  loc  (find ['/']~ dist-desk)
  ?~  loc  ~
  =/  ship-unit  (slaw %p (crip (scag u.loc dist-desk)))
  ?~  ship-unit  ~
  %-  some  :-  (need ship-unit)
  `@tas`(crip (slag +(u.loc) dist-desk))
--
%-  agent:dbug
=|  state-0
=*  state  -
^-  agent:gall
|_  =bowl:gall
+*  this  `agent:gall`.
    default   ~(. (default-agent `agent:gall`this %.n) bowl)
::
++  on-init
  ^-  (quip card _this)
  =.  our-apps.state  ;;  (set [ship desk])
    %-  tail
    .^  update:alliance:treaty  %gx
        /(scot %p our.bowl)/treaty/(scot %da now.bowl)/alliance/noun
    ==
  =/  cards=(list card)
    =+  ~(tap in our-apps.state)
    %+  turn  -
    |=  [=ship =desk]
    :*  %pass  /our-treaty/(scot %p ship)/[desk]  %agent
        [our.bowl %treaty]  %watch  /treaty/(scot %p ship)/[desk]
    ==
  :_  this
  %+  snoc  cards
  [%pass /our-apps %agent [our.bowl %treaty] %watch /alliance]
::
++  on-save   !>(state)
++  on-load   
  |=  =vase
  ^-  (quip card _this)
  =/  old  !<(versioned-state vase)
  =.  state  old
  on-init
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?+    mark    (on-poke:default mark vase)
      %action
    ?>  =(our.bowl src.bowl)
    =/  act  !<(action vase)
    ?>  ?=([%sign-app *] act)
    =/  dist-desk  (parse-dist-desk dist-desk.act)
    ?~  dist-desk  !!
    =/  treaty  (~(got by treaties) [dist-name desk-name]:u:dist-desk)
    :_  this
    :~  :*  %pass  /sign  %agent  [dev.act %portal-manager]  %poke  
            %portal-message  
            !>([%sign-app dist-desk.act (sign:sig our.bowl now.bowl act) treaty])
    ==  ==
  ==
++  on-watch  on-watch:default
++  on-leave  on-leave:default
++  on-peek   on-peek:default
++  on-agent
  |=  [=wire =sign:agent:gall]
  ^-  (quip card _this)
  ?+    wire    (on-agent:default wire sign)
      [%our-apps ~]
    ?+    -.sign    (on-agent:default wire sign)
        %fact
      =/  upd  !<(update:alliance:treaty q.cage.sign)
      =.  our-apps
        ?-  -.upd
          %add  (~(put in our-apps) [ship.upd desk.upd])
          %del  (~(del in our-apps) [ship.upd desk.upd])
          %ini  init.upd
        ==
      `this
    ==
    ::
      [%our-treaty @ @ ~]
    ?+    -.sign    (on-agent:default wire sign)
        %fact
      =/  treaty  !<(treaty:treaty q.cage.sign)
      =.  treaties  (~(put by treaties) [our.bowl `@t`i.t.t.wire] treaty)
      `this
    ==
  ==
++  on-arvo   on-arvo:default
++  on-fail   on-fail:default
--
