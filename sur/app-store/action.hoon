/-  *app-store-data
|%
+$  dev-action
  $%
    [%add =app-name =app-page]
    [%edit =app-name =app-page]
    [%del =app-name]
    ::[%get-docket =dev-name =app-name]
  ==

+$  cur-action
  $%
    [%sub =dev-name]
    [%unsub =dev-name]
    [%cur-info =cur-info]
    [%select =key-list =cat-map]  ::all cats in cat-map should have already been added to cat-set
    [%cats =cat-set]
  ==
+$  usr-action
  $%
    [%sub =cur-name]
    [%unsub =cur-name]
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
--

