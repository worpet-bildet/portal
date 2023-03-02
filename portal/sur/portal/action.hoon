/-  *portal-data
|%
::
+$  action
  $%  [%add =ship =type =general =bespoke-input]
      [%edit =key =general =bespoke-input]
      [%edit-general =key =general]
      [%overwrite-list key=[=ship type=[%list type] =cord] =key-text-list]
      ::
      :: note: makes key-text-list with empty texts
      [%add-items-and-list list-ship=ship list-type=$%([%list %enditem %other ~] [%list %app ~]) list-general=general add-items=(list [%add =ship =type =general =bespoke-input])]
      [%add-with-time =key =general =bespoke-input]
      ::
      [%sub =key]
      [%del =key]
      ::
      [%add-to-default-list key=[=ship type=$%([%list %app ~] [%list %enditem %other ~] [%list %nonitem %group ~] [%list %nonitem %ship ~] [%enditem %other ~] [%enditem %app ~]) =cord]]
      ::
      [%put-nonitem =key =item]
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
      [%get-docket =key =ship =desk]  ::  key which defines which item will be filled with treaty data
      [%edit-docket =key =treaty]
      ::
      [%join-group =key]
      [%get-group-preview flag=[=ship =term]]
  ==
::
::  %add and %edit contain @p so that in the future they can be generalized
::  to adding and editing data on another ship with the right permissions
--
