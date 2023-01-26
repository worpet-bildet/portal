/-  *portal-data
|%
+$  message
  $%
      [%comment =pointer text=@t]
      [%edit-comment =pointer =created-at text=@t]
      [%del-comment =pointer =created-at]
      [%rate =pointer rating-num=@ud]
      [%unrate =pointer]
      [%review =pointer text=@t hash=@uv is-safe=?]
      [%del-review =pointer]
      ::
      [%sign-app =pointer =signature]
      [%send-app-data =pointer data=[desk-hash=@uv =docket]]

  ==
--
