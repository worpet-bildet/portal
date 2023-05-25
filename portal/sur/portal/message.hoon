/-  *portal-data, gr=social-graph
|%
+$  message
  $%  [%index-as-curator src=ship toggle=?]
      ::
      ::  updates indexer with new stuff for the feed
      [%feed-update src=ship =feed]
      ::
      [%add-tag-request src=ship tag=path from=node:gr to=node:gr]
  ==
--
