/-  *app-store-data
::  building Milestone 2
|%
+$  dev-action
  $%
    [%add =app-name =app-page]
    [%del =app-name]
  ==
+$  visit-dev-action
  $%
    [%rate =dev-name =app-name =rating]
    [%unrate =dev-name =app-name]
    [%comment =dev-name =app-name text=@t]
    [%add-eval =dev-name =app-name text=@t is-safe=?(%.y %.n)]
    [%del-eval =dev-name =app-name]
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
