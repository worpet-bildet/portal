/-  *tests-action, portal-action, portal-data, social-graph
/+  default-agent, dbug, portal
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
    ::  default:
    ::  sampel-dozzod, sampel
      %tests-action
    =/  tst  !<(tests vase)
    ?+    -.tst    `this      
        ::  from tipper perspective
      :: this assumes you sent the tip-request, received the tip-reference
      :: and have made the transaction
      ::  TODO assert that the tip edge wasnt there previously
        %tip-tx-hash
      :_  this  :_  ~
      :*  %pass  /tests  %arvo  %k  %fard  %portal-tests  %test  %noun
          !>  
          :~  :-  ::  sub-to-seller-grpah
                  %-  some  
                  :-  `dude:agent:gall`%portal-graph
                  ^-  cage
                  :-  %social-graph-track
                  !>  :-  %portal-store
                  [%start ~sampel-dilryd-mopreg /(scot %p ~sampel-dilryd-mopreg)]
              ~
              ::
              :-
                ::  tip-tx-hash
                %-  some  
                :-  `dude:agent:gall`%portal-manager
                `cage`portal-action+!>(tst)
              ::
              ::  check-seller-graph
              %-  some 
              :^    `mold`graph-result:social-graph
                  `path`/gx/portal-graph/tags/portal-store/entity/portal-store/'/collection/~sampel-dilryd-mopreg//~2000.1.1'/entity/portal-store/'/ship/~sampel-dozzod-dilryd-mopreg//'/social-graph-result
                ^-  $-(* ?)  
                |=  graph-result=*
                =/  result  ;;  graph-result:social-graph  graph-result
                ?>  ?=([%tags *] result)
                ~&  result
                %-  %~  any  in  +.result
                |=  =path
                ?=  [_(scot %p ~sampel-dilryd-mopreg) %tip-from @ @ _note.tst ~]
                path 
              ^-  (unit (list @dr))  ~
          ==
      ==
      ::  mold and path used like this in scry
      ::  .^(mold i.path (scot %p our.bowl) i.t.path (scot %da now.bowl) t.t.path)
        %create-edit
      :_  this  :_  ~
      :*  %pass  /tests  %arvo  %k  %fard  %portal-tests  %test  %noun
          !>  
          :~  ::  create
              :-  
                %-  some  
                :-  `dude:agent:gall`%portal-manager
                    ^-  cage
                    :-  %portal-action
                    !>  [%create ~ ~ `(scot %da now.bowl) ~ ~ ~ ~ ~]
              %-  some 
              :^    `mold`store-result:portal-data
                  `path`/gx/portal-store/item-exists/other/(scot %p our.bowl)/'use_as_empty_path_slot'/(scot %da now.bowl)/portal-store-result
                `$-(* ?)`|=(a=* ?>(?=(? a) a))
              `(unit (list @dr))`~
              ::  edit
              :-
                %-  some  
                :-  `dude:agent:gall`%portal-manager
                    ^-  cage
                    :-  %portal-action
                    !>  [%edit [%other our.bowl '' (scot %da now.bowl)] `%deleted ~]
              %-  some 
              :^    `mold`store-result:portal-data
                  `path`/gx/portal-store/item/other/(scot %p our.bowl)/'use_as_empty_path_slot'/(scot %da now.bowl)/portal-store-result
                ^-  $-(* ?)  
                |=  item=*
                =/  result  ;;(store-result:portal-data item)  
                ?~  result  !!
                ?>  ?=([%item *] result)
                ?~  +.result  %.n
                ?:  .=  %deleted  =<  lens  ;;(item:portal-data +.result)
                  %.y
                %.n
              `(unit (list @dr))`~
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
  ~&  sign
  ?.  ?=(%.y -.p.sign)
    ~&  >>  "fetching data failed"
    `this
  ~&  >  !<(? q.p.p.sign)
  `this

++  on-fail   on-fail:default
--
