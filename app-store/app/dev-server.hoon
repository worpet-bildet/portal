/-  *app-store-action, *app-store-data, docket
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
      ::  when Developer is modifying data
      %app-store-dev-action
    ?>  =(our.bowl src.bowl)
    =/  act  !<(dev-action vase)
    ?-    -.act
        %add
      ~&  "%dev-server: adding app page"
      =^  changed  dev-data
      (add:dev:app-store [our.bowl dev-data.state act])
      ?:  =(changed %unchanged)  `this
      =/  new-app-page  (~(got by dev-map.dev-data.state) [our.bowl app-name.act])
      :_  this
      :~
      [%give %fact [/dev-update]~ %app-store-dev-update !>([%add [our.bowl app-name.act] new-app-page])]
      [%give %fact [/render]~ %app-store-dev-update !>([%all dev-data])]
      ==
    ::
        %edit
      ~&  "%dev-server: editing app page"
      =^  changed  dev-data
      (edit:dev:app-store [our.bowl dev-data.state act])
      ?:  =(changed %unchanged)  `this
      =/  new-app-page  (~(got by dev-map.dev-data.state) [our.bowl app-name.act])
      :_  this  :~
      [%give %fact [/dev-update]~ %app-store-dev-update !>([%change [our.bowl app-name.act] new-app-page])]
      [%give %fact [/render]~ %app-store-dev-update !>([%all dev-data])]
      ==
    ::
        %del
      ~&  "%dev-server: deleting app page"
      =^  changed  dev-data
      (del:dev:app-store [our.bowl dev-data.state act])
      ?:  =(changed %unchanged)  `this
      :_  this  :~
      [%give %fact [/dev-update]~ %app-store-dev-update !>([%del our.bowl app-name.act])]
      [%give %fact [/render]~ %app-store-dev-update !>([%all dev-data])]
      ==
    ==
  ::
      ::  when receiving data from distributor ship to dev-server
      %app-store-dst-update
    =/  act  !<(dst-update vase)
    ?-    -.act
        %sig
      ~&  "%dev-server: receiving signature"
      ?.  =(src.bowl q.signature.act)
        ~&  "%dev-server: ship in sig is different than src.bowl"
        `this
      =/  [changed=@tas =app-page dev-data=^dev-data]  (sign:dev:app-store [dev-data.state src.bowl act])
      ?:  =(changed %unchanged)  `this
      :_  this(dev-data dev-data)  :~
      [%give %fact [/dev-update]~ %app-store-dev-update !>([%change key.act app-page])]
      [%give %fact [/render]~ %app-store-dev-update !>([%all dev-data])]
      ==
    ::
        %data
      ~&  "%dev-server: receiving data from dst-server"
      =/  [changed=@tas =app-page dev-data=^dev-data]  (data:dev:app-store [dev-data.state src.bowl act])
      ?:  =(changed %unchanged)  `this
      :_  this(dev-data dev-data)  :~
      [%give %fact [/dev-update]~ %app-store-dev-update !>([%change key.act app-page])]
      [%give %fact [/render]~ %app-store-dev-update !>([%all dev-data])]
      ==
    ==
  ::
      ::  when poke is from visitors to app-page (can also be from our.bowl)
      %app-store-visit-dev-action
    =/  act  !<(visit-dev-action vase)
    ?-    -.act
        %rate
      ~&  "%dev-server: rating app"
      =/  [changed=@tas =app-page dev-data=^dev-data]
      (usr-visit:dev:app-store [dev-data.state src.bowl key.act act now.bowl])
      ?:  =(changed %unchanged)  `this
      :_  this(dev-data dev-data)  :~
      [%give %fact [/dev-update]~ %app-store-dev-update !>([%change key.act app-page])]
      [%give %fact [/render]~ %app-store-dev-update !>([%all dev-data])]
      ==
    ::
        %unrate
      ~&  "%dev-server: removing rating from app"
      =/  [changed=@tas =app-page dev-data=^dev-data]
      (usr-visit:dev:app-store [dev-data.state src.bowl key.act act now.bowl])
      ?:  =(changed %unchanged)  `this
      :_  this(dev-data dev-data)  :~
      [%give %fact [/dev-update]~ %app-store-dev-update !>([%change key.act app-page])]
      [%give %fact [/render]~ %app-store-dev-update !>([%all dev-data])]
      ==
    ::
        %add-com
      ~&  "%dev-server: adding comment"
      =/  [changed=@tas =app-page dev-data=^dev-data]
      (usr-visit:dev:app-store [dev-data.state src.bowl key.act act now.bowl])
      ?:  =(changed %unchanged)  `this
      :_  this(dev-data dev-data)  :~
      [%give %fact [/dev-update]~ %app-store-dev-update !>([%change key.act app-page])]
      [%give %fact [/render]~ %app-store-dev-update !>([%all dev-data])]
      ==
    ::
        %del-com
      ~&  "%dev-server: deleting comment"
      =/  [changed=@tas =app-page dev-data=^dev-data]
      (usr-visit:dev:app-store [dev-data.state src.bowl key.act act now.bowl])
      ?:  =(changed %unchanged)  `this
      :_  this(dev-data dev-data)  :~
      [%give %fact [/dev-update]~ %app-store-dev-update !>([%change key.act app-page])]
      [%give %fact [/render]~ %app-store-dev-update !>([%all dev-data])]
      ==
    ::
        %add-rev
      ~&  "%dev-server: adding review"
      =/  [changed=@tas =app-page dev-data=^dev-data]
      (usr-visit:dev:app-store [dev-data.state src.bowl key.act act now.bowl])
      ?:  =(changed %unchanged)  `this
      :_  this(dev-data dev-data)  :~
      [%give %fact [/dev-update]~ %app-store-dev-update !>([%change key.act app-page])]
      [%give %fact [/render]~ %app-store-dev-update !>([%all dev-data])]
      ==
    ::
        %del-rev
      ~&  "%dev-server: deleting review"
      =/  [changed=@tas =app-page dev-data=^dev-data]
      (usr-visit:dev:app-store [dev-data.state src.bowl key.act act now.bowl])
      ?:  =(changed %unchanged)  `this
      :_  this(dev-data dev-data)  :~
      [%give %fact [/dev-update]~ %app-store-dev-update !>([%change key.act app-page])]
      [%give %fact [/render]~ %app-store-dev-update !>([%all dev-data])]
      ==
    ==
  ==

::  on watch is for receiving Curators' subscription requests
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?+    -.path    (on-watch:default path)
      %dev-update
    ~&  "%dev-server: received subscription request"
    :_  this
    [%give %fact ~ %app-store-dev-update !>([%all dev-data.state])]~
      %render
    ~&  "%dev-server: received subscription request from front-end"
    :_  this
    [%give %fact ~ %app-store-dev-update !>([%all dev-data.state])]~
  ==
::
++  on-arvo   on-arvo:default
++  on-leave  on-leave:default
++  on-peek   on-peek:default
++  on-agent  on-agent:default
++  on-fail   on-fail:default
--
