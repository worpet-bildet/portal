/-  *portal-data, gr=social-graph, treaty
|%
+$  message
  $%  [%index-as-curator src=ship toggle=?]
      ::
      ::  updates indexer with new stuff for the feed
      [%feed-update src=ship =feed]
      ::
      [%add-tag-request src=ship tag=path from=node:gr to=node:gr]
      ::
      [%get-item =key]
      [%item item=(unit item)]
      ::
      [%sign-app dist-desk=@t sig=signature =treaty:treaty eth-price=(unit @t)]
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
      [%tip-request =key eth-price=@t note=@t]
      [%tip-tx-hash tx-hash=@t]
      [%tip-confirmed tx-hash=@t =key]
  ==
--
