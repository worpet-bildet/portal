/-  c=portal-config, portal-devs, blog-paths
/+  default-agent, p=portal, sss, dbug
:: /$  json-to-action  %json  %portal-action
:: /$  msg-to-json  %portal-message  %json
:: /$  dev-map-to-json  %portal-dev-map  %json
:: /$  portal-manager-result-to-json  %portal-manager-result  %json
|%
+$  versioned-state
  $+  manager-versioned-state
  $%  state-0:c
      state-1:c
      state-2:c
      state-3:c
      state-4:c
      state-5
      state-6
      state-7
      state-8
  ==
+$  state-8
  $+  manager-state-8
  $:  %8
      =processing-payments:c
      =processed-payments:c
      rpc-endpoint=$~(`@ta`'https://rpc.ankr.com/eth' @ta)
      =receiving-address:c
      authorized-ships=(set ship)
      bought-apps=(map [ship desk] tx-hash=@t)
      sub-blog-paths=_(mk-subs:sss blog-paths ,[%paths ~])
      sub-portal-devs=_(mk-subs:sss portal-devs ,[%portal-devs ~])
      =dev-map:c
      =portal-curator:c
      =portal-indexer:c
      =purge-timer:c
      =purge-time:c
      =indexed-as-curator:c
      =onboarded:c
      =our-apps:c
  ==

+$  state-7
  $+  manager-state-7
  $:  %7
      authorized-ships=(set ship)
      bought-apps=(map [ship desk] tx-hash=@t)
      sub-blog-paths=_(mk-subs:sss blog-paths ,[%paths ~])
      sub-portal-devs=_(mk-subs:sss portal-devs ,[%portal-devs ~])
      =dev-map:c
      =portal-curator:c
      =portal-indexer:c
      =purge-timer:c
      =purge-time:c
      =indexed-as-curator:c
      =onboarded:c
      =our-apps:c
  ==
+$  state-6
  $+  manager-state-6
  $:  %6
      sub-blog-paths=_(mk-subs:sss blog-paths ,[%paths ~])
      sub-portal-devs=_(mk-subs:sss portal-devs ,[%portal-devs ~])
      =dev-map:c
      =portal-curator:c
      =portal-indexer:c
      =purge-timer:c
      =purge-time:c
      =indexed-as-curator:c
      =onboarded:c
      =our-apps:c
  ==
+$  state-5
  $+  manager-state-5
  $:  %5
      sub-portal-devs=_(mk-subs:sss portal-devs ,[%portal-devs ~])
      =dev-map:c
      =portal-curator:c
      =portal-indexer:c
      =purge-timer:c
      =purge-time:c
      =indexed-as-curator:c
      =onboarded:c
      =our-apps:c
  ==
+$  card  $+  gall-card  card:agent:gall
--
%-  agent:dbug
=|  state-8
=*  state  -
^-  agent:gall
=<
|_  =bowl:gall
::  can I do all of this +* in the helper core?
+*  this        .
    default     ~(. (default-agent this %|) bowl)
    helper      ~(. +> bowl)
    da-portal-devs  =/  da  (da:sss portal-devs ,[%portal-devs ~])
      (da sub-portal-devs bowl -:!>(*result:da) -:!>(*from:da) -:!>(*fail:da))
    da-blog-paths   =/  da  (da:sss blog-paths ,[%paths ~])
      (da sub-blog-paths bowl -:!>(*result:da) -:!>(*from:da) -:!>(*fail:da))
++  on-init
  =.  state  *state-8
  =.  authorized-ships  (sy ~[our.bowl])
  =^  cards  state  init-sequence:helper
  [cards this]
::
++  on-save  !>(state)
++  on-load
  |=  =vase
  ^-  (quip card _this)
  =/  old  !<(versioned-state vase)
  =.  state
    ?-  -.old
        ?(%0 %1 [%2 *] %3)
      ^-  state-8
      :*  %8  *processing-payments:c  *processed-payments:c
              *@ta  *receiving-address:c
              (sy ~[our.bowl])  *(map [ship desk] @t)
              (mk-subs:sss blog-paths ,[%paths ~])  
              (mk-subs:sss portal-devs ,[%portal-devs ~])  ~ 
              +:*state-4:c
      ==
      ::
        %4
      :*  %8  *processing-payments:c  *processed-payments:c
              *@ta  *receiving-address:c
              (sy ~[our.bowl])  *(map [ship desk] @t)  
              (mk-subs:sss blog-paths ,[%paths ~]) 
              (mk-subs:sss portal-devs ,[%portal-devs ~])  ~
              +.old
      ==
      ::
        %5
      :*  %8  *processing-payments:c  *processed-payments:c
              *@ta  *receiving-address:c
              (sy ~[our.bowl])  *(map [ship desk] @t) 
              (mk-subs:sss blog-paths ,[%paths ~]) 
              +.old
      ==
      ::
        %6
      :*  %8  *processing-payments:c  *processed-payments:c
              *@ta  *receiving-address:c
              (sy ~[our.bowl])  *(map [ship desk] @t)  +.old
      ==
      ::
        %7
      :*  %8  *processing-payments:c  *processed-payments:c
              *@ta  *receiving-address:c
              +.old
      ==
      ::
        %8
      old
    ==
  ::  we are doing init-sequence on-load as well because we have to retain
  ::  idempotence from across all states to latest state
   =^  cards  state  init-sequence:helper
  [cards this]
::
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?+    mark    (on-poke:default mark vase)
      %portal-action
    ?>  =(our.bowl src.bowl)
    =/  act  !<(action:m:p vase)
    ?-    -.act
      ::  in many of the following actions, we use to-key:conv:p to convert 
      ::  all unhashed keys which should be hashed to hashed
      ::
        %create
      =/  new-key  ^-  key:d:m:p
        %:  to-key:conv:p
          -:(fall bespoke.act *bespoke:d:m:p) 
          (fall ship.act our.bowl) 
          (fall cord.act '') 
          (fall time.act (scot %da now.bowl))
        ==
      :_  this  :_  ~
      %-  ~(act cards:p [our.bowl %portal-store])
      %=  act
        ship             `ship.new-key
        cord             `cord.new-key
        time             `time.new-key
        ::
          append-to
        ;;  (list [%collection =ship =cord time=cord])
        (to-key-list:conv:p append-to.act)
        ::
          prepend-to-feed
        ;;  (list [%feed =ship =cord time=cord])
        (to-key-list:conv:p prepend-to-feed.act)
        ::
          tags-to
        %+  turn  tags-to.act
        |=  [=key:d:m:p tag-to=path tag-from=path]
        [(to-key:conv:p key) tag-to tag-from]
      ==
      ::
        %edit
      :_  this  :_  ~
      %-  ~(act cards:p [our.bowl %portal-store])
      %=    act
        key       (to-key:conv:p key.act)
        ::
          bespoke
        ?~  bespoke.act  ~
        ?+    -.u.bespoke.act    bespoke.act
            %collection
          :-  ~
          %=    u.bespoke.act
              key-list
            =,  u.bespoke.act
            ?~  key-list  key-list
            `(to-key-list:conv:p +:key-list)
          ==
          ::
            %feed
          :-  ~
          %=    u.bespoke.act
              feed
            =,  u.bespoke.act
            ?~  feed  feed
            `(to-feed:conv:p +:feed)
          ==
          ::
            %retweet
          :-  ~
          %=    u.bespoke.act
              ref
            =,  u.bespoke.act
            ?~  ref  ref
            `(to-key:conv:p +:ref)
          ==
        ==
      ==
      ::
        %add-tag-request
      :_  this  :_  ~
      %-  ~(act cards:p [our.bowl %portal-store])
      %=    act
        our    (to-key:conv:p our.act)
        their  (to-key:conv:p their.act)
      ==
      ::
        ?(%append %remove)
      :_  this  :_  ~
      %-  ~(act cards:p [our.bowl %portal-store])
      %=    act
        key-list  (to-key-list:conv:p key-list.act)
          col-key   
        ;;  [%collection =ship =cord time=cord]
        (to-key:conv:p col-key.act)
      ==
      ::
        %destroy
      :_  this  :_  ~
      %-  ~(act cards:p [our.bowl %portal-store])
      act(key (to-key:conv:p key.act))
      ::
        %prepend-to-feed
      :_  this  :_  ~
      %-  ~(act cards:p [our.bowl %portal-store])
      %=    act
        feed  (to-feed:conv:p feed.act)
          feed-key   
        ;;  [%feed =ship =cord time=cord]
        (to-key:conv:p feed-key.act)
      ==
      ::
        %aggregate
      :_  this
      aggregate-cards:helper
      ::
        %manager-init
      =.  our-apps.state  ;;  our-apps:c
        %-  tail
        .^  update:alliance:t:d:m:p  %gx
            /(scot %p our.bowl)/treaty/(scot %da now.bowl)/alliance/noun
        ==
      =/  cards
        =+  ~(tap in our-apps.state)
        %+  murn  -
        |=  [=ship =desk]
        ?:  (~(has by wex.bowl) [/our-treaty/(scot %p ship)/[desk] our.bowl %treaty])
          ~
        %-  some
        :*  %pass  /our-treaty/(scot %p ship)/[desk]  %agent
            [our.bowl %treaty]  %watch  /treaty/(scot %p ship)/[desk]
        ==
      ::
      =/  timers  .^((list [@da =duct]) %bx /(scot %p our.bowl)//(scot %da now.bowl)/debug/timers)
      =/  timer-exists
        %+  lien  timers
        |=  [@da =duct]   ::  duct is (list wire)
        =(%portal-aggregate-timer (rear ;;(path -:duct)))
      ::
      :_  this
      ;:  welp  
          `(list card)`cards
          ?:  (~(has by wex.bowl) [/our-apps our.bowl %treaty])
              ~
            [%pass /our-apps %agent [our.bowl %treaty] %watch /alliance]~
          ?:  timer-exists
              ~
            %+  welp  
            aggregate-timer-cards:helper
            aggregate-cards:helper
      ==
      ::
        %sub-to-many
      ::  %def sent to portal-store
      ::  %temp cycled thru single subs
      =/  keys=[temp=key-list:d:m:p def=key-list:d:m:p]  (skid-temp:keys:p key-list.act)
      =^  cards  state
        %-  tail  %^  spin  temp.keys  [*(list card) state]
        |=  [=key:d:m:p q=[cards=(list card) state=state-8]]
        :-  key
        =.  state  state.q
        =^  cards  state.q  (sub:helper [%sub key])
        :_  state.q  (welp cards cards.q)
      :_  this
      %+  snoc  cards
      (~(act cards:p [our.bowl %portal-store]) [%sub-to-many (to-key-list:conv:p def.keys)])
      ::
        %sub
      =^  cards  state  (sub:helper [%sub key.act])
      [cards this]
      ::
        %blog-sub
      =^  cards  sub-blog-paths  (surf:da-blog-paths our.bowl %blog [%paths ~])
      [cards this]
      ::
        %onboarded
      `this(onboarded toggle.act)
      ::
        %payment-request
      ?:  (~(has by bought-apps) src.bowl desk.act)
        ~&  >  "already bought the app"
        `this
      :_  this
      :~  :*  %pass  /payment-req  %agent  [seller.act %portal-app-publisher]  %poke
        %portal-message  !>([%payment-request desk.act])
      ==  ==
      ::
        %payment-tx-hash
      :_  this
      :~  :*  %pass  /payment-hash  %agent  [seller.act %portal-app-publisher]  %poke
        %portal-message  !>([%payment-tx-hash tx-hash.act])
      ==  ==
      ::
        %authorize-ships
      =.  authorized-ships  authorized-ships.act
      :_  this
      [%give %fact [/updates]~ %portal-manager-result !>([%authorized-ships authorized-ships.act])]~
      ::
        %set-receiving-address
      =.  receiving-address  (crip (cass (trip receiving-address.act)))
      :_  this
      [%give %fact [/updates]~ %portal-manager-result !>([%receiving-address receiving-address])]~
      ::
        %set-rpc-endpoint
      =.  rpc-endpoint  rpc-endpoint.act
      :_  this
      [%give %fact [/updates]~ %portal-manager-result !>([%rpc-endpoint rpc-endpoint.act])]~
      ::
        %tip-request
      ?~  time.key.act
        ~&  >>  "%portal-manager: don't tip a %temp item."
        `this
      :_  this  :_  ~
      :*  %pass  /tip-req  %agent  [ship.key.act %portal-manager]  %poke
          %portal-message  !>(act(key (to-key:conv:p key.act)))
      ==
      ::
        %tip-tx-hash
      :_  this
      :~  :*  %pass  /tip-hash  %agent  [beneficiary.act %portal-manager]  %poke
              %portal-message  !>([%tip-tx-hash tx-hash.act note.act])
      ==  ==
    ==
    ::
      %portal-message
    ::  src.bowl src.msg problem kad store misli da je src our
    ::  a ne vanjski jer dolazi od portal-managera
    =/  msg  !<(message:m:p vase)
    ?+    -.msg  !!
        %unpublish
      ?:  !(~(has in authorized-ships) src.bowl)
        ~&  >>>  "ship not authorized to unpublish"
        `this
      :_  this
      :_  ~
      %-  ~(act cards:p [our.bowl %portal-store])
      :+  %remove
        [%app our.bowl '' desk.msg]^~ 
      [%collection our.bowl '' 'published-apps']
      ::
        %sign-app
      ?:  !(~(has in authorized-ships) src.bowl)
        ~&  >>>  "ship not authorized to sign"
        `this
      ::  vulnerable to just receiving random apps from people lol
      ?:  !(validate-sig:p dist-desk.msg our.bowl our.bowl now.bowl sig.msg)
        ~&  >>>  "failed sig"
        `this
      ~&  >  "%portal: sig is valid!"
      =/  dist-desk  (parse-dist-desk:misc:p dist-desk.msg)
      ?~  dist-desk  !!
      ::  making sure published-apps collection exists
      =/  create-my-apps
      ?:  %-  ~(item-exists scry:p our.bowl now.bowl)
              [%collection our.bowl '' 'published-apps']
          ~
        :~
          %-  ~(act cards:p [our.bowl %portal-store])
            :*  %create  ~  ~  `'published-apps'  `%def  ~
                `[%collection 'My Apps' 'Collection of all apps I have published.' '' ~]
                [%collection our.bowl '' '~2000.1.1']~  ~  ~  ==
        ==
      =/  create-app
        ?:  %-  ~(item-exists scry:p our.bowl now.bowl)
            [%app our.bowl '' desk-name.u.dist-desk]
          :~  %-  ~(act cards:p [our.bowl %portal-store])
              :*    %edit
                  [%app our.bowl '' desk-name.u.dist-desk]
                `%def  ~
              `[%app ~ ~ `dist-desk.msg `sig.msg `treaty.msg eth-price.msg]
              ==
              %-  ~(act cards:p [our.bowl %portal-store])
              :+  %append 
                [%app our.bowl '' desk-name.u.dist-desk]^~ 
              [%collection our.bowl '' 'published-apps']
          ==
        :_  ~  %-  ~(act cards:p [our.bowl %portal-store])
        :*  %create  ~  ~  `desk-name.u.dist-desk  `%def  ~
          `[%app ~ '' dist-desk.msg sig.msg treaty.msg (fall eth-price.msg '')]
          ~[[%collection our.bowl '' 'published-apps']]  ~  ~  ==
      :_  this
      (welp create-my-apps create-app)
      ::
        %payment-reference
      ~&  msg
      :_  this
      [%give %fact [/updates]~ %portal-message !>(msg)]~
      ::
        %payment-confirmed
      =.  bought-apps  (~(put by bought-apps) [src.bowl desk.msg] (crip (cass (trip tx-hash.msg))))
      :_  this
      :~  [%give %fact [/updates]~ %portal-message !>(msg)]
          [%give %fact [/updates]~ %portal-manager-result !>([%bought-apps bought-apps])]
          :*  %pass  /install  %agent  [our.bowl %hood]  %poke
              %kiln-install  !>([desk.msg src.bowl desk.msg])
          ::  TODO revive as well, msg with tom
      ==  ==
      ::
        %tip-request
      =/  hex  (crip (cass (num-to-hex:ethereum:p (mod eny.bowl (pow 4 16)))))
      =.  processing-payments
        (~(put by processing-payments) hex [src.bowl key.msg receiving-address])
      :_  this
      :~  :*  %give  %fact  [/updates]~  %portal-manager-result  !>
          [%processing-payments processing-payments]  
          ==
          :*  %pass  /payment-ref  %agent  [src.bowl %portal-manager]  %poke  
          %portal-message  !>([%tip-reference hex receiving-address])
      ==  ==
      ::
        %tip-reference
      ~&  msg
      :_  this
      [%give %fact [/updates]~ %portal-message !>(msg)]~
      ::
        %tip-tx-hash
      :_  this
      ~&  >  "received hash"
      =/  tx-hash-msg  (crip (cass (trip tx-hash.msg)))
      ::  check if in processed payments
      =/  processed  ^-  processed-payments:c  %+  skim  
          processed-payments
        |=  [buyer=ship =key:d:m:p tx-hash=@t =time note=@t]
        ?&  =(buyer src.bowl)
            =(tx-hash tx-hash-msg)
        ==
      ^-  (list card)
      ?~  processed 
        ::  if not in processed payments, validate transaction
        ::  dap.bowl should be desk
        [%pass /get-tx %arvo %k %fard q.byk.bowl %get-tx-by-hash %noun !>([rpc-endpoint src.bowl tx-hash-msg note.msg])]~
      ::  if in processed payments
      :~  :*  %pass  /tip-confirm  %agent  [src.bowl %portal-manager]  %poke  
              %portal-message  !>([%tip-confirmed tx-hash-msg key:(snag 0 `processed-payments:c`processed)])
      ==  ==
      ::
        %tip-confirmed
      :_  this
      [%give %fact [/updates]~ %portal-message !>(msg)]~
    ==
    ::
      %sss-on-rock
    ?-  msg=!<($%(from:da-portal-devs from:da-blog-paths) (fled:sss vase))
        [[%portal-devs ~] *]
      ?~  wave.msg  `this
      ?-  -.u.wave.msg
          %init
        =+  ~(tap by rock.u.wave.msg)
        =/  upd
          %-  malt
          %+  turn  -
          |=  [p=[=ship =desk] q=ship]
          :_  q
          (crip ;:(welp (scow %p ship.p) "/" (scow %tas desk.p)))
        =.  dev-map  (~(uni by dev-map) upd)
        ::  TODO sub to all received apps
        ::  but I think %init as of right now is only ~
        :_  this  (dev-map-upd upd)
        ::
          %put
        ::  we are accidentally subbing to all items from a publisher, but thats not really a problem
        =/  dist-desk  (crip ;:(welp (scow %p ship.key.u.wave.msg) "/" (scow %tas desk.key.u.wave.msg)))
        =.  dev-map  (~(put by dev-map) dist-desk dev.u.wave.msg)
        :_  this
        %+  snoc  (dev-map-upd (malt (limo ~[[dist-desk dev.u.wave.msg]])))
        %-  ~(act cards:p [our.bowl %portal-store])
        [%sub [%app dev '' desk.key]:u.wave.msg]
        ::
          %del
        `this
      ==
      ::
        [[%paths ~] *]
      ::  init is actually not a biggie, it's done only on state %2->%3 in blog while the uri doesnt exist yet
      ::
      ?~  wave.msg  `this
      =/  create-my-blogs
        :~  %-  ~(act cards:p [our.bowl %portal-store])
          :*  %create  ~  ~  `'published-blogs'  `%def  ~
                `[%collection 'My Blogs' 'Collection of all blogs I have published.' '' ~]
                [%collection our.bowl '' '~2000.1.1']~  ~  ~  ==
        ==
      =/  create-blog-cards
        |=  [uri=(unit @t) =path]
        =/  key-time  (path-to-key-time path)
        =/  path  (spat path)
        =/  key  [%blog our.bowl '' key-time]
        ?:  (~(item-exists scry:p our.bowl now.bowl) key)
          :~  %-  ~(act cards:p [our.bowl %portal-store])
          [%append [key]~ [%collection our.bowl '' 'published-blogs']]  ==
        :~  %-  ~(act cards:p [our.bowl %portal-store])
        :*  %create  ~  ~  `key-time  `%def  ~
          `[%blog (blog-path-to-title path) '' (fall uri '') path '']
          ~[[%collection our.bowl '' 'published-blogs']]  ~  ~  ==  ==
      ?-  -.u.wave.msg
          %init
        ::  needs testing
        =/  cards
          =+  ~(tap in paths.u.wave.msg)
          %-  tail  %^  spin  -  *(list card)
          |=  [=path cards=(list card)]
          :-  path
          %+  welp  cards
          (create-blog-cards ~ path)
        :_  this  (welp create-my-blogs cards)
        ::
          %post
        :_  this
        %+  welp  create-my-blogs
        (create-blog-cards ~ path.u.wave.msg)
        ::
          %depost
        :_  this
        :~  %-  ~(act cards:p [our.bowl %portal-store])
            :+  %remove
              [%blog our.bowl '' (path-to-key-time path.u.wave.msg)]~
            [%collection our.bowl '' 'published-blogs']
        ==
        ::
          %uri
        =/  item  %-  ~(get-item scry:p our.bowl now.bowl)
                  [%collection our.bowl '' 'published-blogs']
        ?>  ?=([%collection *] bespoke.item)
        =/  cards
          %-  tail  %^  spin  key-list.bespoke.item  *(list card)
          |=  [=key:d:m:p cards=(list card)]
          :-  key
          %+  snoc  cards
          ^-  card
          %-  ~(act cards:p [our.bowl %portal-store])
          :*    %edit
              [%blog our.bowl '' time.key]
            ~  ~
          `[%blog ~ ~ `uri.u.wave.msg ~ ~]
          ==
        :_  this  (welp create-my-blogs cards)
      ==
    ==
    ::
      %sss-fake-on-rock
    :_  this
    ?-  msg=!<($%(from:da-portal-devs from:da-blog-paths) (fled:sss vase))
      [[%paths ~] *]        (handle-fake-on-rock:da-blog-paths msg)
      [[%portal-devs ~] *]  (handle-fake-on-rock:da-portal-devs msg)
    ==
    ::
      %sss-portal-devs
    =^  cards  sub-portal-devs
      (apply:da-portal-devs !<(into:da-portal-devs (fled:sss vase)))
    [cards this]
    ::
      %sss-blog-paths
    =^  cards  sub-blog-paths
      (apply:da-blog-paths !<(into:da-blog-paths (fled:sss vase)))
    cards^this
  ==
::
++  on-arvo
  |=  [=wire sign=sign-arvo]
  ^-  (quip card:agent:gall _this)
  ?+  wire  `this
      [%portal-aggregate-timer ~]
    ?>  ?=([%behn %wake *] sign)
    ~&  >  "got aggregate timer"
    :_  this
    %+  welp
      aggregate-timer-cards:helper 
      aggregate-cards:helper
    ::
      [%aggregate ~]
    ?>  ?=([%khan %arow *] sign)
    ?.  ?=(%.y -.p.sign)
      ~&  >>  "%portal-manager: aggregate thread failed"
      `this
    ~&  >  "%portal-manager: aggregate thread succeeded"
    `this
    ::
      [%get-tx ~]
    ?>  ?=([%khan %arow *] sign)
    ?.  ?=(%.y -.p.sign)
      ~&  >>  "fetching data failed"
      `this
    =+  !<([tx-hash=@t src=@p result=?(~ transaction-result:eth:p) note=@t] q.p.p.sign)
    ?~  result
      ~&  >>  "transaction wasn't made over last 24 hr"
      `this
    =/  hex                (crip (cass (trip input.result)))
    =/  receiving-address  (crip (cass (trip (fall to.result ''))))
    =/  eth-paid           (crip (skip (scow %ud (hex-to-num:ethereum:p (need value.result))) |=(a=@t =(a '.'))))
    ?~  processing-data=(~(get by processing-payments) hex)
      ~&  >>  "payment with this hex ({<hex>}) not in processing payments"
      `this
    ?:  !=(receiving-address receiving-address.u.processing-data)
      ~&  >>  "tx receiving address: {<(fall to.result '')>}"
      ~&  >>  "our receiving address: {<receiving-address.u.processing-data>}"
      `this
    ?:  !=(src buyer.u.processing-data)
      ~&  >>  "malicious actor!"
      ~&  >>  "{<src>} asked for install, but buyer is actually {<buyer.u.processing-data>}"
      `this
    ~&  >  "success!"
    =.  processing-payments  (~(del by processing-payments) hex)
    =.  processed-payments  %+  snoc  processed-payments
      [buyer.u.processing-data key.u.processing-data (crip (cass (trip tx-hash))) now.bowl note]
    :_  this
    :~  :*  %pass  /payment-confirm  %agent  [buyer.u.processing-data %portal-manager]  %poke  
            %portal-message  !>([%tip-confirmed tx-hash key.u.processing-data])
        ==
        :*  %give  %fact  [/updates]~  %portal-manager-result  !>
            [%processing-payments processing-payments]  
        ==
        :*  %give  %fact  [/updates]~  %portal-manager-result  !>
            [%processed-payments processed-payments]  
        ==
        :*  %pass  /tip-to-graph  %agent  [our.bowl %portal-manager]  %poke  
            %portal-action  !>
            :*  %add-tag-request 
                key.u.processing-data
                [%ship buyer.u.processing-data '' '']
                /(scot %p ship.key.u.processing-data)/tip-from/(scot %da now.bowl)/[eth-paid]/[note]
                /(scot %p buyer.u.processing-data)/tip-to/(scot %da now.bowl)/[eth-paid]/[note]
            ==
        ==
        :*    %pass  /create-tip-item  %agent  [our.bowl %portal-store]  %poke  
              %portal-action  !>
              :*  %create  ~  ~  `(scot %da now.bowl)  ~  ~
                  `[%tip src our.bowl eth-paid (scot %da now.bowl) note tx-hash]
                   ~  ~[[%feed our.bowl '' '~2000.1.1']]  ~
              ==
        ==
        :*  %pass  /hark  %agent  [our.bowl %hark]  %poke
            %hark-action  !>
            :*  %add-yarn  &  &
                (end 7 (shas %portal-notif eny.bowl))
                :^  ~  ~  q.byk.bowl
                    ;:  welp  /portal  /tip
                        (key-to-path:conv:p key.u.processing-data)
                    ==
                now.bowl
                [ship+buyer.u.processing-data ' gave you a tip!' ~]
                (welp /portal/tip /tip/(scot %p our.bowl)//(scot %da now.bowl))
                ~
            ==
        ==
    ==
  ==
  :: |=  [=wire sign=sign-arvo]
  :: ^-  (quip card:agent:gall _this)
  :: ?>  ?=([%remotescry ~] wire)
  :: ?>  ?=([%ames %tune *] sign)
  :: ?~  roar.sign  ::  no response from ames
  ::   `this
  :: ?~  q.dat.u.roar.sign  ::  empty data at path
  ::   `this
  :: ?>  ?=(%portal-item p.u.q.dat.u.roar.sign)
  :: =+  ;;  item  q.u.q.dat.u.roar.sign
  :: :_  this
  :: [%give %fact [/updates]~ %portal-update !>(-)]~  ::  FE update
::
++  on-watch  _`this
++  on-leave  on-leave:default
++  on-peek
  |=  =path
  ^-  (unit (unit cage))
  :+  ~  ~
  ?+    path    (on-peek:default path)
    [%x %indexed-as-curator ~]   portal-manager-result+!>(indexed-as-curator)
    [%x %onboarded ~]            portal-manager-result+!>(onboarded)
    [%x %portal-devs ~]          portal-manager-result+!>([%portal-devs dev-map])
    [%x %bought-apps ~]          portal-manager-result+!>([%bought-apps bought-apps])
    [%x %authorized-ships ~]     portal-manager-result+!>([%authorized-ships authorized-ships])
    [%x %rpc-endpoint ~]         portal-manager-result+!>([%rpc-endpoint rpc-endpoint])
    [%x %receiving-address ~]    portal-manager-result+!>([%receiving-address receiving-address])
    [%x %processing-payments ~]  portal-manager-result+!>([%processing-payments processing-payments])
    [%x %processed-payments ~]   portal-manager-result+!>([%processed-payments processed-payments])
    ::
      [%x %chat @ @ %writs %writ %id @ @ ~]
    =+  new-writ=.^(* (~(construct scry:p [our now]:bowl) %gx %chat (snoc `(list @ta)`t.path %writ)))
    writ+!>(;;(writ:w:d:m:p +:new-writ))
  ==
++  on-agent
  |=  [=wire =sign:agent:gall]
  ^-  (quip card _this)
  ?+    wire    (on-agent:default wire sign)
      [%our-apps ~]
    ::  this takes just apps ids
    ?+    -.sign    (on-agent:default wire sign)
        %fact
      =/  upd  !<(update:alliance:t:d:m:p q.cage.sign)
      =^  cards  our-apps
        ?-  -.upd
          ::  get treaty, and then add to published-apps
            %add
          :_  (~(put in our-apps) [ship.upd desk.upd])
          :~  :*  %pass  /our-treaty/(scot %p ship.upd)/[desk.upd]  %agent
          [our.bowl %treaty]  %watch  /treaty/(scot %p ship.upd)/[desk.upd]
          ==  ==
          ::
          ::  remove from published-apps
            %del
          :_  (~(del in our-apps) [ship.upd desk.upd])
          :~  %-  ~(act cards:p [our.bowl %portal-store])
            [%remove ~[[%app ship.upd '' desk.upd]] [%collection our.bowl '' 'published-apps']]
          ==
          ::
          ::  never get %ini?
          %ini
          `init.upd
        ==
      [cards this]
    ==
    ::
      [%our-treaty @ @ ~]
    ::  this takes treaty, which we subbed to in %add, on %our-apps wire
    ?+    -.sign    (on-agent:default wire sign)
        %fact
      :_  this
      =/  treaty  !<(treaty:t:d:m:p q.cage.sign)
      ::  if exists, edit treaty and append to published-apps
      =/  key  [%app our.bowl '' `@t`i.t.t.wire]
      ?:  (~(item-exists scry:p our.bowl now.bowl) key)
        :~  %-  ~(act cards:p [our.bowl %portal-store])
              [%edit key ~ ~ `[%app ~ ~ ~ ~ `treaty ~]]
            %-  ~(act cards:p [our.bowl %portal-store])
              [%append [key]~ [%collection our.bowl '' 'published-apps']]
        ==
      ::  if doesn't exist, create and append to published-apps
      =/  create-app  ^-  action:m:p
        :*  %create
            ~
            ~
            ``@t`i.t.t.wire
            `%def
            ~
            `[%app ~ '' '' *signature:d:m:p treaty *@t]
            [%collection our.bowl '' 'published-apps']~
            ~
            ~
        ==
      :~  (~(act cards:p [our.bowl %portal-store]) create-app)
          [%pass wire %agent [our.bowl %treaty] %leave ~]
      ==
    ==
    ::
      [%treaty @ @ @ @ ~]
    ?+    -.sign    (on-agent:default wire sign)
        %fact
      =/  treaty  !<(treaty:t:d:m:p q.cage.sign)
      =/  key  (path-to-key:conv:p +.wire)
      =/  act  [%edit key `%temp ~ `[%app ~ ~ ~ ~ `treaty ~]]
      :_  this
      :~  [(~(act cards:p [our.bowl %portal-store]) act)]
          ::  TODO why unsub here, instead of getting updates?
          [%pass wire %agent [ship.key %treaty] %leave ~]
      ==
    ==
    ::
      [%get-group-preview @ @ @ @ ~]
    ?+    -.sign    (on-agent:default wire sign)
        %fact
      =/  preview  !<(preview:g:d:m:p q.cage.sign)
      =/  key  (path-to-key:conv:p +.wire)
      =/  act  [%edit key `%temp ~ `[%group `meta.preview]]
      :_  this
      :~  [(~(act cards:p [our.bowl %portal-store]) act)]
          ::  TODO why unsub here, instead of getting updates?
          [%pass wire %agent [p.flag.preview %groups] %leave ~]
      ==
    ==
    ::
      [~ %sss *]
    ?+    wire   `this
        [~ %sss %on-rock @ @ @ %portal-devs ~]
      =.  sub-portal-devs  (chit:da-portal-devs |3:wire sign)
      `this
        [~ %sss %scry-request @ @ @ %portal-devs ~]
      =^  cards  sub-portal-devs  (tell:da-portal-devs |3:wire sign)
      [cards this]
      ::
        [~ %sss %on-rock @ @ @ %paths ~]
      =.  sub-blog-paths  (chit:da-blog-paths |3:wire sign)
      `this
        [~ %sss %scry-request @ @ @ %paths ~]
      =^  cards  sub-blog-paths  (tell:da-blog-paths |3:wire sign)
      [cards this]
    ==
  ==
::
++  on-fail   on-fail:default
--
|_  [=bowl:gall]
+*  this      .
    da-blog-paths   =/  da  (da:sss blog-paths ,[%paths ~])
      (da sub-blog-paths bowl -:!>(*result:da) -:!>(*from:da) -:!>(*fail:da))
    da-portal-devs  =/  da  (da:sss portal-devs ,[%portal-devs ~])
      (da sub-portal-devs bowl -:!>(*result:da) -:!>(*from:da) -:!>(*fail:da))
::
++  init-sequence
  ^+  [*(list card) state]
  =^  cards-1  sub-blog-paths  (surf:da-blog-paths our.bowl %blog [%paths ~])
  =/  sub-init  [%sub [%collection portal-indexer '' '~2000.1.1']]
  :_  state
  %+  welp
    cards-1
      ::  sub to home page
  :~  [(~(act cards:p [our.bowl %portal-store]) sub-init)]
      ::  scrying should not be done on on-load or on-init
      (~(act cards:p [our.bowl %portal-manager]) [%manager-init ~])
  ==
::
++  aggregate-timer-cards
  [%pass /portal-aggregate-timer %arvo %b [%wait (add now.bowl ~h4)]]^~
::
++  aggregate-cards
  [%pass /aggregate %arvo %k %fard q.byk.bowl %aggregate noun+!>(~)]^~
::
++  dev-map-upd
  |=  =_dev-map
  ^-  (list card)
  :~  [%give %fact [/updates]~ %portal-dev-map !>(dev-map)]
  ==
::
::  unidirectional mapping from path to time.key
::  if the original path had '0' in it, backwards conversion will fail
++  path-to-key-time
  |=  =path
  ^-  cord
  =+  (spud path)
  %-  crip
  %+  turn  -
  |=  [i=@t]
  ?:  =(i '/')
    '~'
  i
::
++  blog-path-to-title
  |=  p=@t
  =/  p  (trip p)
  =?  p
      =('/' (rear p))
    (snip p)
  =.  p  =+  (flop p)
    (flop (scag (need (find ['/']~ -)) -))
  =.  p
  %-  tail  %^  spin  (fand ['-']~ p)  p
    |=  [i=@ud p=tape]
    :-  i
    =.  p  (snap p i ' ')
    =?  p
        &((lth +(i) (lent p)) (gte (snag +(i) p) 'a') (lte (snag +(i) p) 'z'))
      (snap p +(i) (^sub (snag +(i) p) 32))  ::^sub to not invoke the subscribe arm lol
    p
  =?  p
      &((gte -.p 'a') (lte -.p 'z'))
    (snap p 0 (^sub -.p 32))
  (crip p)
::
::  used in groups-heap-curio and groups-diary-note %temp item keys
++  cord-to-channel-time
  |=  =cord
  ^-  [channel-name=term =time]
  =+  tap=(trip cord)
  =+  (find ['/']~ tap)
  ?~  -  ~|("invalid cord in key for %groups-diary-note/%groups-heap-curio" !!)
  =/  almost-flag  (trim u.- tap)
  :-  (crip p.almost-flag)
  `@da`(slav %ud (crip (slag 1 q.almost-flag)))
::
::  portal-manager only needs to do funky stuff with %temp items
++  sub
  |=  [act=action:m:p]
  ^+  [*(list card) state]
  ?>  ?=([%sub *] act)
  =/  new-key  ;;  key:d:m:p  (to-key:conv:p key.act)
  ?.  =(time.key.act '')   ::  branch on whether is %temp (empty time.key)
    :: if not temp
    :_  state
    (~(act cards:p [our.bowl %portal-store]) act(key new-key))^~    
  ::  if temp
  =;  cards
    ?:  ?=(%app struc.key.act)  ::  temp app
      :: subs to %portal-app-publisher and gets on-rock,
      :: where it subs to the actual %def app
      ::  is this too much spam?
      =^  cards-1  sub-portal-devs
        (surf:da-portal-devs ship.new-key %portal-app-publisher [%portal-devs ~])
      [(welp cards cards-1) state]
    [cards state]
  ?:  (~(item-exists scry:p our.bowl now.bowl) new-key)  ~
  =|  bespoke=bespoke:d:m:p
  =/  reach=reach:d:m:p  [%public ~]
  =*  create-empty-temp  ^-  action:m:p  :*  %create
                              `ship.new-key
                              `cord.new-key
                              `''
                              `%temp
                              `reach
                              `bespoke
                              ?:  ?|  =(%app struc.new-key)
                                      =(%group struc.new-key)  
                                      =(%groups-diary-note struc.new-key)
                                      =(%groups-heap-curio struc.new-key)
                                  ==
                                [%collection our.bowl '' 'all']~
                              ~
                              ~
                              ~
                          ==
  ?+    struc.new-key    !!    
    ::  
      %groups-diary-note
    =+  (cord-to-channel-time cord.key.act)
    =.  bespoke  =,  d:m:p
      [%groups-diary-note *flag:n [ship.key.act -.-] +.- *essay:n 0 0]
    (~(act cards:p [our.bowl %portal-store]) create-empty-temp)^~
    ::
      %groups-heap-curio
    =+  (cord-to-channel-time cord.key.act)
    =.  bespoke  =,  d:m:p
      [%groups-heap-curio *flag:cur [ship.key.act -.-] +.- *heart:cur 0 0]
    (~(act cards:p [our.bowl %portal-store]) create-empty-temp)^~
    ::
      %ship
    =.  bespoke  [%ship ~]
    (~(act cards:p [our.bowl %portal-store]) create-empty-temp)^~
    ::
      %group
    =.  bespoke  [%group *data:g:d:m:p]
    =/  path  /groups/(scot %p ship.key.act)/[`@tas`cord.key.act]/preview
    =/  wire  [%get-group-preview (key-to-path:conv:p key.act)]
    =/  sub-status  (~(gut by wex.bowl) [wire ship.key.act %groups] ~)
    :~  (~(act cards:p [our.bowl %portal-store]) create-empty-temp)
        [%pass wire %agent [ship.key.act %groups] %watch path]
    ==
    ::
      %app
    =.  bespoke  [%app ~ '' '' *signature:d:m:p *treaty:t:d:m:p *@t]
    =/  path  /treaty/(scot %p ship.key.act)/[`@tas`cord.key.act]
    =/  wire  [%treaty (key-to-path:conv:p key.act)]
    =/  sub-status  (~(gut by wex.bowl) [wire ship.key.act %treaty] ~)
    :~  (~(act cards:p [our.bowl %portal-store]) create-empty-temp)
        [%pass wire %agent [ship.key.act %treaty] %watch path]
    ==
  ==
  
--
