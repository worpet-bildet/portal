/-  *portal-data, *portal-config
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
         lens=(unit lens)
         bespoke=(unit bespoke)
         append-to=(list [struc=%collection =ship =cord time=cord])
         ::  TODO try $>(%collection key), probably wont work tho
         prepend-to-feed=(list [struc=%feed =ship =cord time=cord])
         ::  in %portal use case, tag should look like /[ship]/whatever
         tags-to=(list [=key tag-to=path tag-from=path])
      ==
      ::
      $+  edit
      $:  %edit
        $:  =key
            lens=(unit lens)
            $=  bespoke  %-  unit
              $%  [%other title=(unit @t) blurb=(unit @t) link=(unit @t) image=(unit @t)]
                  [%app screenshots=(unit (list @t)) blurb=(unit @t) dist-desk=(unit @t) sig=(unit signature) treaty=(unit treaty) eth-price=(unit @t)]
                  [%collection title=(unit @t) blurb=(unit @t) image=(unit @t) key-list=(unit key-list)]  ::does it need link?
                  [%feed feed=(unit feed)]
                  [%retweet blurb=(unit @t) ref=(unit key)]
                  [%blog title=(unit @t) blurb=(unit @t) uri=(unit @t) path=(unit @t) image=(unit @t)]
              ==
        ==
      ==
      ::
      $+  replace
      [%replace =key =lens =bespoke]  ::  TODO should it act like put or edit?, i.e. can it create a nonexisting item. NO! (?)
      ::
      $+  add-tag-request
      [%add-tag-request our=key their=key tag-to=path tag-from=path]
      ::  
      $+  append
      [%append =key-list col-key=[struc=%collection =ship =cord time=cord]]
      $+  prepend
      [%prepend =key-list col-key=[struc=%collection =ship =cord time=cord]]
      ::  removes all instances of key from collection
      $+  remove
      [%remove =key-list col-key=[struc=%collection =ship =cord time=cord]]
      ::
      $+  delete
      [%delete =key]  ::  adds [%deleted ~] lens
      $+  destroy
      [%destroy =key]  :: abolishes the item from the atmosphere
      ::
      $+  sub
      [%sub =key]
      $+  sub-to-many
      [%sub-to-many =key-list]
      ::
      ::
      $+  prepend-to-feed
      [%prepend-to-feed =feed feed-key=[struc=%feed =ship =cord time=cord]]  ::  TODO rename?
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
      [%tip-request =key]
      [%tip-tx-hash beneficiary=ship tx-hash=@t note=@t]
      ::
      $+  authorize-ships
      [%authorize-ships authorized-ships=(set ship)]
      ::
      [%set-rpc-endpoint rpc-endpoint=@ta]
      [%set-receiving-address =receiving-address]
    ==
--
