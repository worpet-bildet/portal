/-  *app-store-data
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
    [%add-rev =key text=@t hash=@uv is-safe=?]
    [%del-rev =key]
  ==
+$  cur-action
  $%
    [%sub =dev-name]
    [%unsub =dev-name]
    [%title =cur-title]
    [%intro =cur-intro]
    [%select =key-list =cat-map]
    [%cats =cat-set]
  ==
+$  usr-action
  $%
    [%sub =cur-name]
    [%unsub =cur-name]
  ==
+$  visitor  @p
--

