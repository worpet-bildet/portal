/-  app-store-logs
/+  default-agent, dbug
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0
  $:  %0
      =event-log:app-store-logs
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
::  TODO, before pushing, check if any more new users have installed it
++  on-init
  ^-  (quip card _this)
  =.  state  :-  %0
  ^-  event-log:app-store-logs
  *event-log:app-store-logs
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
    ::  if we are Default Curator, we log the users who joined Galleria
      %app-store-event
    ?.  =(~dister-dilryd-mopreg our.bowl)  `this
    =/  event  !<(event:app-store-logs vase)
    `this(event-log (snoc event-log event))
  ==
::
++  on-watch  on-watch:default
++  on-leave  on-leave:default
++  on-peek   on-peek:default
++  on-agent  on-agent:default
++  on-arvo   on-arvo:default
++  on-fail   on-fail:default
--
