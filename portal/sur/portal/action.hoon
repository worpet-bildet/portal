/-  *portal-data
|%
::
+$  action
  $%
      [%add =ship =type =general =bespoke-input]
      [%edit =key =general =bespoke-input]
      ::
      [%sub =key]
      [%del =key]
      ::
      [%add-to-default-list key=[=ship type=$%([%enditem type] [%nonitem type]) =cord]]
      [%overwrite-list key=[=ship type=[%list type] =cord] =key-list]
      ::
      [%comment =key text=@t]
      [%edit-comment =key =created-at text=@t]
      [%del-comment =key =created-at]
      [%rate =key rating-num=@ud]
      [%unrate =key]
      [%review =key text=@t hash=@uv is-safe=?]
      [%del-review =key]
      ::
      [%sign-app =key desk-name=@tas]
      [%send-app-data =key desk-name=@tas]
      ::
      [%join-group =key]  :: pointer would be: [%.n ~rondev %group 'group-discovery']
  ==
::
::  %add and %edit contain @p so that in the future they can be generalized
::  to adding and editing data on another ship with the right permissions
--
