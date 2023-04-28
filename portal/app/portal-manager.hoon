/-  *portal-data, *portal-action, *portal-message, *portal-logs, *portal-config,
    groups, treaty
/+  default-agent, dbug, *portal, io=agentio, sig
|%
+$  versioned-state
  $%  state-0
      state-1
  ==
+$  state-0
  $:  %0
      =default-curators
      =portal-curator
  ==
::  TODO clean up portal manager state
+$  state-1
  $:  %1
      =default-curators
      =portal-curator
      =purge-timer
      =purge-time
      =portal-indexer
      =indexed-as-curator
      =onboarded
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
        %sub  `this
        
      ::
        %onboarded  `this(onboarded toggle.act)
      ::
        %index-as-curator
      :_  this(indexed-as-curator toggle.act)
      [(poke-msg [portal-indexer %portal-manager] portal-message+!>([%index-as-curator src.bowl toggle.act]))]~
      ::
      ::  TODO state transition wires
        %get-group-preview
      ::  not sub -> not perfectly updated, either too much or too little
      =/  path  /groups/(scot %p ship.flag.act)/[term.flag.act]/preview
      =/  wire  [%get-group-preview (key-to-path-key:conv key.act)]
      =/  sub-status  (~(gut by wex.bowl) [wire ship.flag.act %groups] ~)
      :_  this
      ?~  sub-status
        [%pass wire %agent [ship.flag.act %groups] %watch path]~
      ~
      ::
      ::  TODO state transition wires
        %get-docket
      ::  not sub -> not perfectly updated, either too much or too little
      =/  path  /treaty/(scot %p ship.act)/[desk.act]
      =/  wire  [%treaty (key-to-path-key:conv key.act)]
      =/  sub-status  (~(gut by wex.bowl) [wire ship.act %treaty] ~)
      :_  this
      ?~  sub-status
        [%pass wire %agent [ship.act %treaty] %watch path]~
      :~  [%pass wire %agent [ship.act %treaty] %leave ~]
          [%pass wire %agent [ship.act %treaty] %watch path]
      ==
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
  :~  [(~(poke pass:io /act) [our.bowl %portal-store] portal-action+!>([%purge default-curators portal-curator]))]
      [%pass /purge-timer %arvo %k %fard q.byk.bowl %purge-timer %noun !>((some purge-time))]
  ==
::
++  on-watch  on-watch:default
++  on-leave  on-leave:default
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  ?+    path    (on-peek:default path)
      [%x %indexed-as-curator ~]
    ``bool+!>(indexed-as-curator)
      [%x %onboarded ~]
    ``bool+!>(onboarded)
  ==
++  on-agent
  |=  [=wire =sign:agent:gall]
  ^-  (quip card _this)
  ?+    wire    (on-agent:default wire sign)
    ::  TODO get created-at and updated-at right here, and everywhere else
  :: ++  fill-temp
  ::   |=  [our=ship act=$%([%fill-temp-group =key =data:group-preview] [%fill-temp-app =key =treaty])]
  ::   ^-  card
  ::   =/  bespoke
  ::     ?-  -.act
  ::       %fill-temp-group  [[%group ~] [%temp ~] data.act]
  ::       %fill-temp-app    [[%app ~] [%temp ~] *@t *signature treaty.act]
  ::     ==
  ::   =/  meta
  ::     :*  created-at='~2000.1.1'
  ::         updated-at='~2000.1.1'
  ::         permissions=~[our]
  ::         reach=[%public blacklist=~]
  ::     ==
  ::   (~(act cards our %portal-store) [%put-temp key.act [key.act bespoke meta *signature]])
  ::  edit vs create on temps?
  ::  temp behavior?
  ::  on-sub -> create empty
  ::  on-agent -> replace/edit
  ::  keeps created-at and updated-at logically
  ::  no updating till the next purge tho?
  ::  what if we dont leave but keep the wire open?
      [%treaty @ @ @ @ ~]
    ?+    -.sign    (on-agent:default wire sign)
        %watch-ack  `this
        %kick       `this
        %fact
      =/  treaty  !<(treaty:treaty q.cage.sign)
      =/  key  (path-key-to-key:conv +.wire)
      =/  act
        :*  %create
          `ship.key
          `cord.key
          `time.key
          `[%temp ~]
          `[[%app ~] '' *signature treaty]
          `[[%collection ~] our.bowl '' '~2000.1.1']
        ==
      :_  this
      :~  [(~(act cards [our.bowl %portal-store]) act)]
          [%pass wire %agent [ship.key %treaty] %leave ~]
      ==
    ==
      [%get-group-preview @ @ @ @ ~]
    ?+    -.sign    (on-agent:default wire sign)
        %watch-ack  `this
        %kick       `this
        %fact
      =/  preview  !<(preview:groups q.cage.sign)
      =/  act  
        :*  %create
          `p.flag.preview
          `q.flag.preview
          `''
          `[%temp ~]
          `[[%group ~] meta.preview]
          `[[%collection ~] our.bowl '' '~2000.1.1']
        ==
      :_  this
      :~  [(~(act cards [our.bowl %portal-store]) act)]
          [%pass wire %agent [p.flag.preview %groups] %leave ~]
      ==
    ==
  ==
::
++  on-fail   on-fail:default
--
