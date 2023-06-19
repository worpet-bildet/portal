/-  *action, treaty, portal-devs
/+  default-agent, dbug, *sig, *sss, ethio, ethereum
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0
  $:  %0
      our-apps=(set [ship desk])
      treaties=(map [ship desk] treaty:treaty)
      pub-portal-devs=_(mk-pubs portal-devs ,[%portal-devs ~])
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
    du-portal-devs  =/  du  (du portal-devs ,[%portal-devs ~])
                    (du pub-portal-devs bowl -:!>(*result:du))
++  on-init
  ::  TODO poke yourself for scries
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
  =^  cards-1  pub-portal-devs  
    (give:du-portal-devs [%portal-devs ~] [%init ~])
  :_  this
  %+  snoc  (welp cards cards-1)
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
    ?+    act    !!
        [%get-tx-by-hash *]
      =+  (hex-to-num:ethereum tx-hash.act)
      :_  this
      [%pass /get-tx %arvo %k %fard dap.bowl %get-tx-by-hash %noun !>([url.act -])]~
      ::
        [%sign-app *]
      =/  dist-desk  (parse-dist-desk dist-desk.act)
      ?~  dist-desk  !!
      =/  treaty  (~(got by treaties) [dist-name desk-name]:u:dist-desk)
      =^  cards-1  pub-portal-devs
        (give:du-portal-devs [%portal-devs ~] [%put [dist-name desk-name]:u:dist-desk dev.act])
      :_  this
      %+  snoc  cards-1
      :*  %pass  /sign  %agent  [dev.act %portal-manager]  %poke  
          %portal-message  
          !>([%sign-app dist-desk.act (sign our.bowl now.bowl act) treaty])
      ==
    ==
    ::
      %sss-to-pub
    =/  msg  !<(into:du-portal-devs (fled vase))
    =^  cards  pub-portal-devs  (apply:du-portal-devs msg)
    [cards this]
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
      =^  cards  our-apps
        ?-  -.upd
            %add  
          :_  (~(put in our-apps) [ship.upd desk.upd])
          :~  :*  %pass  /our-treaty/(scot %p ship.upd)/[desk.upd]  %agent
          [our.bowl %treaty]  %watch  /treaty/(scot %p ship.upd)/[desk.upd]
          ==  ==
          ::
          %del  `(~(del in our-apps) [ship.upd desk.upd])
          %ini  `init.upd
        ==
      [cards this]
    ==
    ::
      [%our-treaty @ @ ~]
    ?+    -.sign    (on-agent:default wire sign)
        %fact
      =/  treaty  !<(treaty:treaty q.cage.sign)
      =.  treaties  (~(put by treaties) [our.bowl `@t`i.t.t.wire] treaty)
      `this
    ==
    ::
  ==
++  on-arvo
  |=  [=wire sign=sign-arvo]
  ^-  (quip card:agent:gall _this)
  ?>  ?=([%get-tx ~] wire)
  ?>  ?=([%khan %arow *] sign)
  ?:  ?=(%.y -.p.sign)
    =/  result  !<(transaction-result:rpc:ethereum q.p.p.sign)
    ~&  result
    `this
  ~&  >>  "fetching data failed"
  `this
::
++  on-fail   on-fail:default
--
