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
      [%sign-app dist-desk=@t sig=signature =treaty:treaty]
      ::
      [%payment-request =desk]
      [%payment-reference receiving-address=@ux hex=@ux eth-price=@ud]
      [%payment-tx-hash tx-hash=@ux]
      [%payment-confirmed tx-hash=@ux =desk]
  ==
--
