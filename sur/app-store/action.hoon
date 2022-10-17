/-  *app-store-data
::  working on Milestone 2
|%
+$  dev-action
  $%
    [%add =app-name =app-page]
    [%edit =app-name =app-page]
    [%del =app-name]
  ==
+$  visit-dev-action
  $%
    [%rate =key =rating]
    [%unrate =key]
    [%add-com =key text=@t]
    [%del-com =key =time]
    [%add-rev =key text=@t is-safe=?]
    [%del-rev =key]
  ==
+$  cur-action
  $%
    [%sub =dev-name]
    [%unsub =dev-name]
    [%title =cur-title]
    [%intro =cur-intro]
    [%select =cur-choice] :: should assert apps exist in cur data
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
