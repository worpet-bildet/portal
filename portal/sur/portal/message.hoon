/-  d=portal-data, gr=social-graph
|%
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
