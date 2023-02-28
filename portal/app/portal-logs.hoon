/-  portal-logs, portal-config
/+  default-agent, dbug
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0
  $:  %0
      =user-log:portal-logs
      =portal-curator:portal-config
  ==
+$  card  card:agent:gall
--
%-  agent:dbug
=|  state-0
=*  state  -
^-  agent:gall
|_  =bowl:gall
+*  this  .
    default   ~(. (default-agent this %.n) bowl)
::
++  on-init
  ^-  (quip card _this)
  =.  state  :+  %0
  *user-log:portal-logs
  [~worpet-bildet /list/list '~2000.1.1']
  `this
::
++  on-save  !>(state)
++  on-load
  |=  old=vase
  ^-  (quip card _this)
  `this(state !<(state-0 old))
::
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?+    mark    (on-poke:default mark vase)
    ::  if we are Default Curator, we log the users who joined Portal
      %portal-new-user-event
    ?.  =(-.portal-curator our.bowl)  `this
    =/  event  !<(new-user-event:portal-logs vase)
    ~&  >  event
    `this(user-log (snoc user-log event))
  ==
::
++  on-watch  on-watch:default
++  on-leave  on-leave:default
++  on-peek   on-peek:default
++  on-agent  on-agent:default
++  on-arvo   on-arvo:default
++  on-fail   on-fail:default
--
