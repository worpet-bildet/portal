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
      [%send-app-data =key data=[desk-hash=@uv =docket]]
  ==
--
