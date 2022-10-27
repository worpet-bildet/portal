/-  *app-store-data
|%
::
::  actions which Developers use to add/edit/delete app-pages
+$  dev-action
  $%
    [%add =app-name =app-page]
    [%edit =app-name =app-page]
    [%del =app-name]
    [%get-docket =dev-name =app-name]
  ==
::
::  actions which Curators use to
::  - subscribe to Developers
::  - select apps and info which they will display
+$  cur-action
  $%
    [%sub =dev-name]
    [%unsub =dev-name]
    [%cur-info =cur-info]
    [%select =key-list =cat-map]
    [%cats =cat-set]
  ==
::
::  actions which Users use to subscribe to Curators
+$  usr-action
  $%
    [%sub =cur-name]
    [%unsub =cur-name]
  ==
::
::  actions which Users can do on app-pages
+$  visit-dev-action
  $%
    [%rate =key =rating]
    [%unrate =key]
    [%add-com =key text=@t]
    [%del-com =key =time]
    [%add-rev =key text=@t hash=@uv is-safe=?]
    [%del-rev =key]
  ==
--

