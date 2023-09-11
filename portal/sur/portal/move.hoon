/-  d=portal-data, gr=social-graph
|%
::
::  units are optional args
+$  action
  $+  action
  $%  $+  create
      $:  %create
         ship=(unit ship)
         cord=(unit cord)
         time=(unit cord)
         lens=(unit lens:d)
         bespoke=(unit bespoke:d)
         append-to=(list [struc=%collection =ship =cord time=cord])
         ::  TODO try $>(%collection key), probably wont work tho
         prepend-to-feed=(list [struc=%feed =ship =cord time=cord])
         ::  in %portal use case, tag should look like /[ship]/whatever
         tags-to=(list [=key:d tag-to=path tag-from=path])
      ==
      ::
      $+  edit
      $:  %edit
        $:  =key:d
            lens=(unit lens:d)
            $=  bespoke  %-  unit
              $%  [%other title=(unit @t) blurb=(unit @t) link=(unit @t) image=(unit @t)]
                  [%app screenshots=(unit (list @t)) blurb=(unit @t) dist-desk=(unit @t) sig=(unit signature:d) treaty=(unit treaty:t:d) eth-price=(unit @t)]
                  [%collection title=(unit @t) blurb=(unit @t) image=(unit @t) key-list=(unit key-list:d)]  ::does it need link?
                  [%feed feed=(unit feed:d)]
                  [%retweet blurb=(unit @t) ref=(unit key:d)]
                  [%blog title=(unit @t) blurb=(unit @t) uri=(unit @t) path=(unit @t) image=(unit @t)]
              ==
        ==
      ==
      ::
      $+  replace
      [%replace =key:d =lens:d =bespoke:d]  ::  TODO should it act like put or edit?, i.e. can it create a nonexisting item. NO! (?)
      ::
      $+  add-tag-request
      [%add-tag-request our=key:d their=key:d tag-to=path tag-from=path]
      ::  
      $+  append
      [%append =key-list:d col-key=[struc=%collection =ship =cord time=cord]]
      $+  prepend
      [%prepend =key-list:d col-key=[struc=%collection =ship =cord time=cord]]
      ::  removes all instances of key from collection
      $+  remove
      [%remove =key-list:d col-key=[struc=%collection =ship =cord time=cord]]
      ::
      $+  delete
      [%delete =key:d]  ::  adds [%deleted ~] lens
      $+  destroy
      [%destroy =key:d]  :: abolishes the item from the atmosphere
      ::
      $+  sub
      [%sub =key:d]
      $+  sub-to-many
      [%sub-to-many =key-list:d]
      ::
      ::
      $+  prepend-to-feed
      [%prepend-to-feed =feed:d feed-key=[struc=%feed =ship =cord time=cord]]  ::  TODO rename?
      [%onboarded toggle=?]
      [%blog-sub ~]
      ::
      [%manager-init ~]
      ::  ? purge needs to be defined as action?
      :: TODO make purge have only 'items-to-keep' arg
      [%purge portal-curator=@p]
      ::
      [%payment-request seller=ship =desk]
      [%payment-tx-hash seller=ship tx-hash=@t]
      ::
      $+  tip-request
      [%tip-request =key:d]
      [%tip-tx-hash beneficiary=ship tx-hash=@t note=@t]
      ::
      $+  authorize-ships
      [%authorize-ships authorized-ships=(set ship)]
      ::
      [%set-rpc-endpoint rpc-endpoint=@ta]
      [%set-receiving-address receiving-address=@t]
    ==
::
::
::
+$  message
  $+  message
  $%  ::  updates indexer with new stuff for the feed
      $+  feed-update
      [%feed-update src=ship =feed:d]
      ::
      $+  add-tag-request
      [%add-tag-request src=ship tag=path from=node:gr to=node:gr]
      ::
      $+  get-item
      [%get-item =key:d]
      $+  item
      [%item item=(unit item:d)]
      ::
      $+  sign-app
      [%sign-app dist-desk=@t sig=signature:d =treaty:t:d eth-price=(unit @t)]
      ::
      [%unpublish =desk]
      ::
      ::  buyer sends
      [%payment-request =desk]
      ::  buyer receives
      [%payment-reference hex=@t eth-price=@t receiving-address=@t]
      ::  buyer sends
      [%payment-tx-hash tx-hash=@t]
      ::  buyer receives
      [%payment-confirmed tx-hash=@t =desk]
      ::
      [%tip-request =key:d]
      [%tip-reference hex=@t receiving-address=@t]
      [%tip-tx-hash tx-hash=@t note=@t]
      [%tip-confirmed tx-hash=@t =key:d]

  ==
--
