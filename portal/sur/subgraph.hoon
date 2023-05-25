::
::  solid-state-subscription "lake"
::
/-  sg=social-graph
|%
++  name  %subgraph
+$  rock  (map tag:sg nodeset:sg)
+$  wave
  $%  [%new-edge =tag:sg from=node:sg to=node:sg]
      [%gone-edge =tag:sg from=node:sg to=node:sg]
      [%gone-tag =tag:sg ~]
      [%gone-top-level-tag ~]
  ==
++  wash
  |=  [=rock =wave]
  ?-    -.wave
      %new-edge
    =+  (~(gut by rock) tag.wave *nodeset:sg)
    =+  (~(put ju -) [from to]:wave)
    (~(put by rock) tag.wave -)
      %gone-edge
    =+  (~(gut by rock) tag.wave *nodeset:sg)
    =+  (~(del ju -) [from to]:wave)
    (~(put by rock) tag.wave -)
      %gone-tag
    (~(del by rock) tag.wave)
      %gone-top-level-tag
    *_rock
  ==
--
