/-  *app-store-data
::  working on Milestone 2
|%
+$  dev-action
  $%
    [%add =app-name =app-page]
    [%edit =app-name =app-page]
    [%del =app-name]
  ==
+$  visit-dev-action  :: how to do pokes one by one instead of multiple pokes at the same time?
  $%
    [%rate [=dev-name =app-name] =rating]
    [%unrate =dev-name =app-name]
    [%add-com [=dev-name =app-name] text=@t]
    [%del-com =dev-name =app-name] ::  needs to specify somehow which exact comment
    [%add-rev [=dev-name =app-name] text=@t is-safe=?]
    [%del-rev =dev-name =app-name]
  ==
+$  cur-action
  $%
    [%sub =dev-name]
    [%unsub =dev-name]
    [%title =cur-title]
    [%intro =cur-intro]
    [%select [=dev-name =app-name] =category] :: should assert app exists in cur data
    [%remove =dev-name =app-name]  ::  should assert app exists in cur choice
    [%change-cat [=dev-name =app-name] =category]
    [%order =dev-app-list]   ::should assert that apps are the same as in cur-choice
    ::  also needs rearranging algorithm built
  ==
+$  usr-action
  $%
    [%sub =cur-name]
    [%unsub =cur-name]
  ==
+$  visitor  @p
--
::TODO define what ~ means (maybe for delete), for now nothing changes 
::
::
::  "add" on the front end should first ask for developer desk
::  and then get all data that it can automatically, docket and other
::  "edit" should display filled in data that can be modified
::
::
