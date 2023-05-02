/-  *portal-data, *portal-action, *portal-message, *portal-logs, *portal-config,
    groups, treaty
/+  default-agent, dbug, *portal, io=agentio, sig
|%
+$  versioned-state
  $%  state-0
      state-1
  ==
+$  card  card:agent:gall
--
%-  agent:dbug
=|  state-1
=*  state  -
^-  agent:gall
|_  =bowl:gall
+*  this      .
    default   ~(. (default-agent this %|) bowl)
++  on-init
  ^-  (quip card _this)
  =/  new-user-event      [%join now.bowl (get-ship-type:misc our.bowl) `@ux`(shax our.bowl)]
  =/  default-curators    *^default-curators :: (silt (limo ~[[[[%collection ~] [%def ~]] ~worpet-bildet '~2000.1.1']]))
  =/  portal-curator      *^portal-curator  :: [[[%collection ~] [%def ~]] ~tactyl-darlup-dilryd-mopreg '~2000.1.1']  ::  TODO change to worpet-bildet
  =/  purge-timer         %.y
  =/  purge-time          ~d1
  =/  portal-indexer      ~worpet-bildet
  =/  indexed-as-curator  %.n
  =/  onboarded           %.n
  :_  %=  this
        default-curators    default-curators
        portal-curator      portal-curator
        purge-timer         purge-timer
        purge-time          purge-time
        portal-indexer      portal-indexer
        indexed-as-curator  indexed-as-curator
        onboarded           onboarded
      ==
  :~  (~(poke pass:io /act) [our.bowl %portal-store] %portal-action !>([%sub portal-curator]))
      (~(poke pass:io /new-user) [+<.portal-curator %portal-logs] %portal-new-user-event !>(new-user-event))
      [%pass /purge-timer %arvo %k %fard q.byk.bowl %purge-timer %noun !>((some purge-time))]
  ==
::
::
::  TODO portal-indexer, separate agent
++  on-save  !>(state)
++  on-load
  |=  old=vase
  ^-  (quip card _this)
  ::  later:
  ::  upon update, new default curators can be added by us
  ::  and added to portal-curators
  ::  if user unsubs from a curator, then they are not added
  =/  old  !<(versioned-state old)
  =/  purge-time  ~d1
  ?-    -.old
      %0
    :_  this(state [%1 default-curators.old portal-curator.old %.y purge-time ~worpet-bildet %.n %.n])
    [%pass /purge-timer %arvo %k %fard q.byk.bowl %purge-timer %noun !>((some purge-time))]~
      %1
    ?:  =(purge-timer %.y)  `this(state old)
      ::  TODO
      ::  cancel old timer
      ::  add new one with new purge-time
    :_  this(purge-timer %.y)
    [%pass /purge-timer %arvo %k %fard q.byk.bowl %purge-timer %noun !>((some purge-time))]~
  ==
::
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?.  =(our.bowl src.bowl)  `this
  =/  manager  ~(. manager [bowl ~])
  ?+    mark    (on-poke:default mark vase)
      %portal-action
    =/  act  !<(action vase)
    ::
    =+  %-  silt  ^-  (list term)
      ~[%create %edit %replace %delete %append %prepend %remove]
    ?:  (~(has in -) -.act)
      :_  this
      ~[(~(poke pass:io /act) [our.bowl %portal-store] portal-action+vase)]
    ::
    =/  poke-msg  ~(poke pass:io /msg)
    ?+    -.act    `this
        %sub  
      :_  this  (sub:on-act:on-poke:manager act)
        
      ::
        %onboarded  `this(onboarded toggle.act)
      ::
        %index-as-curator
      :_  this(indexed-as-curator toggle.act)
      [(poke-msg [portal-indexer %portal-manager] portal-message+!>([%index-as-curator src.bowl toggle.act]))]~
      ::
    ==
    ::
      %portal-message
    =/  msg  !<(message vase)
    ::  TODO src.bowl src.msg problem kad store misli da je src our
    ::   a ne vanjski jer dolazi od portal-managera
      ?>  =(src.bowl src.msg)
      ?>  =(-.msg %index-as-curator)
      :_  this
      ~[(~(poke pass:io /msg) [our.bowl %portal-store] portal-message+vase)]
    ::
    ::  when %portal-store makes/receives an update, it notifies %portal-manager
    ::  then %portal-manager decides what it needs to do with it
      %portal-update
    ::  TODO PM should sub to PS and receive updates on-agent
    ?.  =(our.bowl src.bowl)  `this
    `this
  ::   =/  upd  !<(update vase)
  ::   ?+    -.upd    (on-poke:default mark vase)
  ::       %put
  ::     :_  this
  ::     (put:on-update:manager our.bowl now.bowl upd)
  ::     ::
  ::       %del
  ::     :_  this
  ::     (del:on-update:manager upd)
  ::   ==
  ==
::
++  on-arvo
  |=  [=wire sign=sign-arvo]
  ^-  (quip card:agent:gall _this)
  ?>  ?=([%purge-timer ~] wire)
  ?>  ?=([%khan %arow *] sign)
  :_  this
  :~  [(~(poke pass:io /act) [our.bowl %portal-store] portal-action+!>([%purge portal-curator]))]
      [%pass /purge-timer %arvo %k %fard q.byk.bowl %purge-timer %noun !>((some purge-time))]
  ==
::
++  on-watch  on-watch:default
++  on-leave  on-leave:default
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  ?+    path    (on-peek:default path)
    [%x %indexed-as-curator ~]  ``manager-result+!>(indexed-as-curator)
    [%x %onboarded ~]           ``manager-result+!>(onboarded)
  ==
++  on-agent
  |=  [=wire =sign:agent:gall]
  ^-  (quip card _this)
  ?+    wire    (on-agent:default wire sign)
    ::
      [%treaty @ @ @ @ ~]
    ?+    -.sign    (on-agent:default wire sign)
        %fact
      =/  treaty  !<(treaty:treaty q.cage.sign)
      =/  key  (path-to-key:conv +.wire)
      =/  act  [%replace key [%temp ~] [[%app ~] '' *signature treaty]]
      :_  this
      :~  [(~(act cards [our.bowl %portal-store]) act)]
          [%pass wire %agent [ship.key %treaty] %leave ~]
      ==
    ==
    ::
      [%get-group-preview @ @ @ @ ~]
    ?+    -.sign    (on-agent:default wire sign)
        %fact
      =/  preview  !<(preview:groups q.cage.sign)
      =/  key  (path-to-key:conv +.wire)
      =/  act  [%replace key [%temp ~] [[%group ~] meta.preview]]
      :_  this
      :~  [(~(act cards [our.bowl %portal-store]) act)]
          [%pass wire %agent [p.flag.preview %groups] %leave ~]
      ==
    ==
  ==
::
++  on-fail   on-fail:default
--
