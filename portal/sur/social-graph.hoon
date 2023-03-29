/+  mip
|%
+$  social-graph        ::  note that both `nodes` and `edges` store exactly
  $:  =nodes            ::  the same data. the sg core updates them
      =edges            ::  in tandem, for querying performance.
  ==
::
::  two representations of same data for performant queries
::
+$  nodes  (mip:mip node node edge)
+$  edges  (mip:mip app tag nodeset)
::
+$  app  term  ::  portal-store
+$  tag  path  ::  /list/1    /list/2
               ::  /listed/1  /listed/2  etc.
::
+$  node
  $%  [%ship @p]
      [%address @ux]
      [%entity =app name=@t]  ::  item key goes here
  ==
::
+$  edge     (jug app tag)
+$  nodeset  (jug node node)
::
::  permissions are app-level: the app uses %set-perms to say whether
::  - %private: only our ship can track tags in our app's graph
::  - %public: anyone can track tags in our app's graph
::  - %only-tagged: only ships that *have* the tag can track *that tag*.
::
+$  permission-level
  $~  %private
  ?(%private %public %only-tagged)
::
::  !! need USERSPACE PERMS to make these right and remove the (pair term ..) !!
::
+$  edit
  %+  pair  term  ::  the local app poking us, for now
  $%  [%add-tag =tag from=node to=node]
      [%del-tag =tag from=node to=node]
      [%nuke-tag =tag]  ::  remove this tag from all edges
      [%nuke-top-level-tag =tag]  :: remove all tags with same first element
      ::  if not set, defaults to %private
      [%set-perms level=permission-level]
  ==
::
::  poke with this to indicate that you want to get pushed updates
::  tracking happens on top-level value in tag-path, always --
::  this means if a tracker subscribes to /my/tag, they're watching /my
::  and will get updates for all tags in the chosen app starting with /my
::
+$  track
  %+  pair  term  ::  the local app poking us, for now
  $%  [%start source=@p =tag]
      [%stop source=@p =tag]
  ==
::
+$  graph-result  ::  comes out of scries
  $@  ?
  $%  [%controller @p]
      [%nodes (set node)]
      [%nodeset nodeset]
      [%tags (set tag)]
      [%app-tags (set tag)]
      [%app (map tag nodeset)]
  ==
--
