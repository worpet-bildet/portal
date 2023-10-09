/-  *tests-action, *tests-spec
/+  default-agent, p=portal  ::, dbug
::
=/  indxr    ~zod
=/  usr1     ~bus
=/  usr2     ~nec
::  tests are written as if we are usr2, for now
::
|%
+$  card  card:agent:gall
--
:: %-  agent:dbug
=*  state  *[%0 ~]
^-  agent:gall
=<
|_  =bowl:gall
+*  this  .
    default   ~(. (default-agent this %.n) bowl)
    aux       ~(. +> bowl)
::
++  on-init   `..on-init
++  on-save   !>(~)
++  on-load   |=(vase `..on-init)
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ~&   "%portal-tester: received poke"
  ::
  ?:  ?=(%portal-action mark)
    ~&  "%portal-tester: doing %portal-action"
    ~&  !<(action:m:p vase)
    :_  this  :_  ~
    ^-  card
    :*  %pass  /act  %agent  [our.bowl %portal-manager]  %poke
        %portal-action  vase
    ==
  ::
  ?>  ?=(%tests-action mark)
  =/  tst  !<(tests vase)
  ::
  ::  .^(mold i.path (scot %p our.bowl) i.t.path (scot %da now.bowl) t.t.path)
  ?:  ?=(%test-harness -.tst)
    ~&  "%portal-tester: received test-harness"
    =,  tst
    ?>  ?=(^ scry-path)
    ?>  ?=(^ +.scry-path)
    =/  result  .^  scry-mold
                    -.scry-path
                    (scot %p our.bowl)
                    -.+.scry-path
                    (scot %da now.bowl)
                    +.+.scry-path  
                ==
    ?:  (criterion result)
      ~&  >  "harness result: %.y"
      `this
    ~&  >>>  "harness result: %.n"
    `this
  ::
  :_  this  :_  ~
  ::
  ?:  ?=(%portal-act-request -.tst)
    ::  request action on another ship
    ~&  "%portal-tester: making portal act request to {<ship.tst>}"
    ^-  card
    :*  %pass  /act-req  %agent  [ship.tst %portal-tester]  %poke
        cage.tst
    ==
  ::
  ~&  "%portal-tester: starting test {<-.tst>}"
  :*  %pass  /tests  %arvo  %k  %fard  %portal-tests  %test  %noun  !>  
  ^-  test-spec
  ?-    -.tst
      %run-all
    ;:  welp
        (receive-feedpoast:run-test:aux now.bowl)
        (receive-reply:run-test:aux (add now.bowl ~s1))
        (receive-many:run-test:aux (add now.bowl ~s2))
    ==
    ::
      %receive-feedpoast  (receive-feedpoast:run-test:aux now.bowl)
      %receive-reply      (receive-reply:run-test:aux (add now.bowl ~s1))
      %receive-many       (receive-many:run-test:aux (add now.bowl ~s2))
    ::
      %receive-collection
    ~
    ::
      %sub  
    :: requires testing for multiple inputs
    :: just hardcode them
    ~
    ::
    ::  from tipper perspective
    ::  this assumes you sent the tip-request, received the tip-reference
    ::  and have made the transaction
    ::  TODO assert that the tip edge wasnt there previously
      %tip-tx-hash
    :~  ::  sub-to-seller-graph
        ^-  test-pair
        :-  (track-graph:aux indxr)  
            ~
        ::
        ^-  test-pair
        :-
        ::  tip-tx-hash
        %-  some  
          :-  %portal-manager
          portal-action+!>(tst)
        ::  check-seller-graph
        %:  harness-graph 
            [%collection indxr '' '~2000.1.1']  [%ship usr1 '' '']
            :: TODO fix:
            |=(=path ?=([_(scot %p indxr) %tip-from @ @ _note.tst ~] path))  
            ~
        ==
    ==
  ==
  ==
++  on-watch  on-watch:default
++  on-leave  on-leave:default
++  on-peek   on-peek:default
++  on-agent  on-agent:default
++  on-arvo
  |=  [=wire sign=sign-arvo]
  ^-  (quip card:agent:gall _this)
  ?:  !?=([%tests ~] wire)
    `this
  ?>  ?=([%khan %arow *] sign)
  ::~&  sign
  ?.  ?=(%.y -.p.sign)
    ~&  >>  "%portal-tester: thread failed"
    `this
  ?:  !<(? q.p.p.sign)
    ~&  >  "%portal-tester: tests passed"
    `this
  ~&  >>>  "%portal-tester: tests failed"
  `this
++  on-fail   on-fail:default
--
|_  [=bowl:gall]
+*  this  .
++  run-test
  |%
  ++  receive-feedpoast
    |=  =time
    =/  time   `@t`(scot %da time)
    =/  other-bespoke    [%other '' 'BLURB' '' '']
    =/  retweet-bespoke  [%retweet 'SOME BLURB' [%app ~paldev 'pals' '']]
    =/  tip-bespoke      [%tip indxr beneficiary=usr1 '10000000000000000' (scot %da now.bowl) 'to me or not to me' '0x56383ea021031c6f674b8aea255084e9d890f9a43f30a097e1c03d427727b43b']
    ::
    :~  :-  (create-feedpoast indxr time other-bespoke)  
            (harness-item %other indxr time %def other-bespoke)
        :-  (create-feedpoast usr1 time other-bespoke)  
            (harness-item %other usr1 time %def other-bespoke)
        :-  (create-feedpoast indxr time retweet-bespoke)  
            (harness-item %retweet indxr time %def retweet-bespoke)
        :-  (create-feedpoast usr1 time retweet-bespoke)  
            (harness-item %retweet usr1 time %def retweet-bespoke)
        :-  (create-feedpoast indxr time tip-bespoke(beneficiary indxr))  
            (harness-item %tip indxr time %def tip-bespoke(beneficiary indxr))
        :-  (create-feedpoast usr1 time tip-bespoke(beneficiary usr1))  
            (harness-item %tip usr1 time %def tip-bespoke(beneficiary usr1))
    ==
  ::
  ++  receive-reply
    |=  =time
    =/  time1  %+  scot  %da  time
    =/  time2  %+  scot  %da  (add now.bowl ~s0..0001)
    =/  time3  %+  scot  %da  (add now.bowl ~s0..0002)
    =/  time4  %+  scot  %da  (add now.bowl ~s0..0003)
    =/  other-bespoke    [%other '' 'BLURB' '' '']
    :~  :-  (create-feedpoast indxr time1 other-bespoke)  
            (harness-item %other indxr time1 %def other-bespoke)
        :-  (create-reply indxr time2 other-bespoke [%other indxr '' time1])
            (harness-item %other indxr time2 %def other-bespoke)
        :-  (create-reply usr1 time3 other-bespoke [%other indxr '' time2])
            (harness-item %other usr1 time3 %def other-bespoke)
        :-  (create-reply indxr time4 other-bespoke [%other usr1 '' time3])
            (harness-item %other indxr time4 %def other-bespoke)
    ==
    ::
  ++  receive-many
    |=  =time
    =/  time  (scot %da time)
    =/  app-time      ^-  @tas  %-  crip  (welp "app" (scow %ud (mod eny.bowl 1.000)))
    ::
    =/  app-bespoke
      [%app 'screenshot'^~ 'blurb' '' *signature:d:m:p *treaty:t:d:m:p 'asdf']
    =/  edit-app-bespoke
      [%app ~ `'blurbnew' ~ ~ ~ ~]
    =/  expected-app-bespoke
      [%app 'screenshot'^~ 'blurbnew' '' *signature:d:m:p *treaty:t:d:m:p 'asdf']
    ::
    =/  col-bespoke           [%collection 'title' 'blurb' 'img' ~]
    =/  edit-col-bespoke      [%collection `'newtitle' ~ ~ ~]
    =/  expected-col-bespoke  [%collection 'newtitle' 'blurb' 'img' ~]
    ::
    =/  other-bespoke           [%other '' 'ze other bespoke' '' '']
    ::
    =/  key-list         :~  [%other indxr '' time]
                             [%collection indxr '' time]
                             [%app indxr '' app-time]
                         ==
    ::
    :~  :-  (create-item indxr time other-bespoke)    ~
        :-  (create-item indxr time col-bespoke)      ~
        :-  (create-item indxr app-time app-bespoke)  ~
        :-  (sub-to-many our.bowl key-list)           ~  :: use our.bowl or usr2 here?
        `(harness-item %other indxr time %def other-bespoke)
        `(harness-item %collection indxr time %def col-bespoke)
        `(harness-item %app indxr app-time %def app-bespoke)
        :-  (edit-item %collection indxr time edit-col-bespoke)  ~
        :-  (edit-item %app indxr app-time edit-app-bespoke)     ~
        `(harness-item %collection indxr time %def expected-col-bespoke)
        `(harness-item %app indxr app-time %def expected-app-bespoke)
    ==
  ::
  --
::
++  scry-path
  |=  [=key:d:m:p scry=?(%item-exists %item)]
  ^-  path
  :~  %gx
      %portal-store
      scry
      struc.key
      (scot %p ship.key)
      ?~(cord.key 'use_as_empty_path_slot' cord.key)
      ?~(time.key 'use_as_empty_path_slot' time.key)
      %portal-store-result
  ==
::
++  create-feedpoast
  |=  [=ship time=cord =bespoke:d:m:p]
  ^-  test-poke
  %-  some
  :-  %portal-tester  :-  %tests-action  !>
  :+  %portal-act-request  ship
  :-  %portal-action  !>
  [%create `ship ~ `time ~ ~ `bespoke ~ [%feed ship '' '~2000.1.1']^~ ~]
::
++  create-reply
  |=  [=ship time=cord =bespoke:d:m:p to=[=struc:d:m:p =ship =cord time=cord]]
  ^-  test-poke
  %-  some
  :-  %portal-tester  :-  %tests-action  !>
  :+  %portal-act-request  ship
  :-  %portal-action  !>
  :*  %create  `ship  ~  `time  ~  ~  `bespoke  ~  [%feed ship '' '~2000.1.1']^~  
      [to /(scot %p ship)/reply-to /(scot %p ship.to)/reply-from]^~
  ==
::
++  create-item
  |=  [=ship time=cord =bespoke:d:m:p]
  ^-  test-poke
  %-  some
  :-  %portal-tester  :-  %tests-action  !>
  :+  %portal-act-request  ship
  :-  %portal-action  !>
  [%create `ship ~ `time ~ ~ `bespoke ~ ~ ~]
::
++  edit-item
  |=  [=struc:d:m:p =ship time=cord edit-bespoke=noun]
  ^-  test-poke
  %-  some
  :-  %portal-tester  :-  %tests-action  !>
  :+  %portal-act-request  ship
  :-  %portal-action  !>
  [%edit [struc ship '' time] ~ ~ `edit-bespoke]
::
++  sub-to-many :: who is the ship which subs to many 
  |=  [who=ship =key-list:d:m:p]
  ^-  test-poke
  %-  some
  :-  %portal-tester  :-  %tests-action  !>
  :+  %portal-act-request  who
  :-  %portal-action  !>
  [%sub-to-many key-list]

::
++  track-graph
  |=  [=ship]
  ^-  test-poke
  %-  some  
  :-  %portal-graph
  :-  %social-graph-track
  !>  :-  %portal-store
  [%start ship /(scot %p ship)]
::
++  harness-item
  |=  [=struc:d:m:p =ship time=cord =lens:d:m:p =bespoke:d:m:p]
  ^-  test-harness
  =/  key  [struc ship '' time]
  %-  some 
  :^  store-result
      (scry-path key %item)
      ^-  $-(* ?)
        |=  a=*
        ?~  +.a  %.n
        =+  ;;([%item itm=item:d:m:p] a)
        ~&  "received: {<key.itm>}"
        ~&  "expected: {<key>}"
        ~&  "received: {<lens.itm>}"
        ~&  "expected: {<lens>}"
        ~&  "received: {<bespoke.itm>}"
        ~&  "expected: {<bespoke>}"
        ?&  =(key.itm key)
            =(lens.itm lens)
            =(bespoke.itm bespoke)
        ==
      `(unit (list @dr))``(reap 20 ~s3)
::
++  harness-graph
  |=  [k1=key:d:m:p k2=key:d:m:p path-validator=$-(p=path ?) timers=(unit (list @dr))]
  ^-  test-harness
  %-  some 
  :^    graph-result:gr:m:p
      (graph-scry-path k1 k2)
    |=  graph-result=*
    =/  result  ;;  graph-result:gr:m:p  graph-result
    ?>  ?=([%tags *] result)
    %-  %~  any  in  +.result
    path-validator
  ^-  (unit (list @dr))  `(reap 20 ~s3)
::
++  harness-pause
  |=  [time=@dr]
  ^-  test-harness
  %-  some 
  :^  store-result:d:m:p
      (scry-path [%collection indxr '' '~2000.1.1'] %item-exists)
      |=(a=* %.y)
      `(unit (list @dr))``time^~
::
:: ++  path-validator  ::  idea, wip
  ::   ::  for sth like [_(scot %p indxr) %tip-from @ @ _note.tst ~] (doesnt work well)
  ::   |=  =path
  ::   ?.  =((scot %p indxr) -.path)
  ::     %.n
  ::   ?.  =(%tip-from -.+.path)
  ::     %.n
  ::   ?.  ?=(@ -.+.+.path)
  ::     %.n
  ::   ?.  ?=(@ -.+.+.+.path)
  ::     %.n
  ::   ?.  =('some note' -.+.+.+.+.path)
  ::     %.n
  ::   %.y
::
++  graph-scry-path
  |=  [k1=key:d:m:p k2=key:d:m:p]
  =,  conv:p
  ;:  welp
      /gx/portal-graph/tags/portal-store
      (node-to-path (key-to-node k1))
      (node-to-path (key-to-node k1))
      /social-graph-result
  ==
--
::
::
:: Tests run on non-indexer (usr2)
:: 
::  %receive-feedpoast DONE
:: inputs: 
::  usrs: indxr, usr1
::  itms: %other - blurb,
::        %retweet - blurb + key, 
::        %tip - 'text' everywhere
:: Indexer creates feedpoast, I receive
:: 3rd person creates feedpoast, I receive
:: 
::  %receive-reply DONE
:: inputs: 
::  usrs: indxr, usr1
::  item: %other - blurb1/2/3
:: Indexer creates reply on his feedpoast, I receive
:: 3rd person creates reply on indexers feedpoast, I receive
:: Indexer creates reply on 3rd persons reply, I receive
:: 
::  %receive-many  DONE
:: inputs: 
::  usrs: indxr
:: Indexer creates collection, other, app, I sub-to-many, I receive
:: Indexer edits app, collection, I receive
::
::  %receive-collection-items  WAITING
:: I sub to indexer's ~2000.1.1 collection, I receive
:: Indexer creates collection (added to ~2000.1.1) with one group, I receive col and group
:: Indexer puts one app, ship, other into collection, 
::    I receive collection update
::    I receive the items from the collection
:: TODO: collections autosub - implement with sub-to-many
::
::
::  tests for app sigs etc
::  if not using PAP -> dist desk should be empty
::  other variations test
::   - sa PAP editanjem propagacija, sigovima
::
:: Code injection tests for eth
:: - inject code which returns x instead of talking to api
:: - specify inputs/parameters for which each test is done
:: ->  subsequent fixes in develop branch to abstract (injectable code) 
::     and fix everything I found to fix
::
:: Lower priority tests
:: - blog
:: - likes
:: - mentions
::   - generalized graph tests? (hodzod already did those I guess)
::   - graph tests for the ways I use it?


