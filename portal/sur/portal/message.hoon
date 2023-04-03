/-  *portal-data
|%
+$  message
  $%
      [%comment =key text=@t]
      [%edit-comment =key =created-at text=@t]
      [%del-comment =key =created-at]
      [%rate =key rating-num=@ud]
      [%unrate =key]
      [%review =key text=@t hash=@uv is-safe=?]
      [%del-review =key]
      ::
      [%sign-app =key =signature]
      ::
      [%index-as-curator src=ship toggle=?]
      ::
      ::  updates indexer with new stuff for the feed
      [%feed-update src=ship =feed]
      [%feed =feed]
  ==
--
