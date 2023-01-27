/-  *portal-data
|%
::
+$  action
  $%
      [%add p=@p r=type =general =bespoke-input]
      [%edit =id =general =bespoke-input]
      ::
      [%sub =pointer]
      [%del =pointer]
      ::
      [%comment =pointer text=@t]
      [%edit-comment =pointer =created-at text=@t]
      [%del-comment =pointer =created-at]
      [%rate =pointer rating-num=@ud]
      [%unrate =pointer]
      [%review =pointer text=@t hash=@uv is-safe=?]
      [%del-review =pointer]
      ::
      [%sign-app =pointer desk-name=@tas]
      [%send-app-data =pointer desk-name=@tas]
  ==
::
::  %add and %edit contain @p so that in the future they can be generalized
::  to adding and editing data on another ship with the right permissions
--
