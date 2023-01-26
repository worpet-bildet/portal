/-  *portal-data
::  TODO  implement all app stuff, app signature validation
|%
::  TODO (on which layer) how to handle types?? how to handle creating multiple subs based on %curator page
::  how to handle what each type requires more generally so that it doesnt intersect/mesh with the existing code?
::  ->e.g. default link handling? iedalno parser koji prepoznaje kakav je link

::  (is necessary?)curator can only add apps with valid sigs to app list (whether its %curator-page or %list)?
::  curator can only put apps which are properly validated into another list? (or that doesnt matter and it should be validated locally by any person)

::  canonical, default items you have
::  %valid/%invalid sigs (for all items, not just apps) (or just for apps?)
::  %curator-page
::  their created-at is ~2000.1.1., so that we know they are default ones.

::
+$  action
  $%
      ::  %add and %edit contain @p so that in the future they can be generalized
      ::  to adding and editing data on another ship with the right permissions
      [%add p=@p r=type =editable-data =bespoke-input]
      [%edit =id =editable-data =bespoke-input]
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

      ::  %app
      ::link is dst-desk  :: what about desk hash????
      ::  glob-reference hash is different from desk hash
      [%send-app-data =pointer desk-name=@tas]   :: app-name should correspond to local desk name of the app
      :: sends docket data + desk hash
      ::  go through all old agents + lib to check what functionality it had for apps

  ==
::  naming convention za liste. e.g. 'onboarding', 'preview', 'favorites'
::  %curator page - subset of %pointer-list, with specified list types and naming conventions
::  later you should be able to control private vs public
::
--
