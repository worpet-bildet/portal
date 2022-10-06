/-  *app-store-data
::  working on Milestone 2
|%
+$  dev-action
  $%
    [%add =app-name =app-page]
    [%edit =app-name =app-page]
    [%del =app-name]
    [%wipe ~]
  ==
+$  visit-dev-action  :: how to do pokes one by one instead of multiple pokes at the same time?
  $%
    [%rate =dev-name =app-name =rating]
    [%unrate =dev-name =app-name]
    [%comment =dev-name =app-name text=@t]
    [%add-rev =dev-name =app-name text=@t is-safe=?]
    [%del-rev =dev-name =app-name]
  ==
+$  cur-action
  $%
    [%sub =dev-name]
    [%unsub =dev-name]
    [%title =cur-title]
    [%intro =cur-intro]
    [%choose =cur-choice]
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
::  for cur-server and usr-server, %unsub shouold remove appropriate data from cur-choice and usr-data
