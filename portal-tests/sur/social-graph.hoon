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
+$  app  term
+$  tag  path  ::  cannot be ~
::
+$  node
  $%  [%ship @p]
      [%address @ux]
      [%entity =app name=@t]
  ==
::
+$  edge     (jug app tag)
+$  nodeset  (jug node node)
::
::  permissions are placed on an app + top-level tag:
::  - %private (default): no one can see this subgraph
::  - %public: anyone can track this subgraph
::  - %only-tagged: only ships that have the *top-level* tag can track subgraph
::
+$  permission-level
  $~  %private
  ?(%private %public %only-tagged)
::
::  !! need USERSPACE PERMS to make these right and remove the (pair term ..) !!
::
+$  edit
  %+  pair  app  ::  the local app poking us, for now
  $%  [%add-tag =tag from=node to=node]
      [%del-tag =tag from=node to=node]
      [%nuke-tag =tag]  ::  remove this tag from all edges
      [%nuke-top-level-tag =tag]  :: remove all tags with same first element
      [%set-perms =tag level=permission-level]
  ==
::
::  poke with this to indicate that you want to get pushed updates
::  tracking happens on top-level value in tag-path, always --
::  this means if a tracker subscribes to /my/tag, they're watching /my
::  and will get updates for all tags in the chosen app starting with /my
::
+$  track
  %+  pair  app  ::  the local app poking us, for now
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
