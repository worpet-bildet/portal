/-  *tests-action
/+  default-agent, dbug
|%
+$  versioned-state
  $%  state-0
  ==
+$  state-0
  $:  %0
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
++  on-init   `..on-init
++  on-save   !>(~)
++  on-load   |=(vase `..on-init)
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?+    mark    (on-poke:default mark vase)
      %tests-action
    =/  tst  !<(tests vase)
    ?+    -.tst    `this
        %sub
      `this
      :: test thread should take
      :: - action
      :: - scry
      :: - list of timers before scries
      :: should output
      :: - bool
      :: :_  this  :_  ~
      :: :*  %pass  /validate-sig  %arvo  %k  %fard  %portal  %validate-sig  %noun
      ::     !>([dist-desk.bespoke.item.u.wave.msg src.msg our.bowl now.bowl sig.bespoke.item.u.wave.msg item.u.wave.msg])
      :: ==

        %sub-to-many  `this
        %create  `this
        %edit  `this
        %add-tag-request  `this
    ==
==
++  on-watch  on-watch:default
++  on-leave  on-leave:default
++  on-peek   on-peek:default
++  on-agent  on-agent:default
++  on-arvo   on-arvo:default
++  on-fail   on-fail:default
--
