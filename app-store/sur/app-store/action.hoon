/-  *app-store-data
|%
::
::  actions between the Developer and the ship which hosts the app
+$  dst-action
  $%  [%sign =key]
      [%send-data =key]
  ==
::
::  actions which Developers use to add/edit/delete app-pages
+$  dev-action
  $%  [%add =app-name =dev-input]
      [%edit =app-name =dev-input]
      [%del =app-name]
  ==
::
::  actions which Curators use to
::  - subscribe to Developers
::  - select apps and info which they will display
+$  cur-action
  $%  [%sub =dev-name]
      [%unsub =dev-name]
      [%cur-info =cur-info]
      [%cats =cat-set]
      [%select =key-list =cat-map]
  ==
::
::  actions which Users use to subscribe to Curators
+$  usr-action
  $%  [%sub =cur-name]
      [%unsub =cur-name]
  ==
::
::  actions which Users can do on app-pages
+$  visit-dev-action
  $%  [%rate =key rating-num=@ud]
      [%unrate =key]
      [%add-com =key text=@t]
      [%edit-com =key =time text=@t]
      [%del-com =key =time]
      [%put-rev =key text=@t hash=@uv is-safe=?]
      [%del-rev =key]
  ==
--
