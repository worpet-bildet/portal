/-  *portal-data, *portal-action
/+  *portal
::  SSS item
|%
++  name  %item
+$  rock  item
::  TODO  waves, but you cant just add because you also need sig and meta
+$  wave
  $%  [%whole =item]
      [%prepend-to-feed =feed]  :: todo, also metadata, or start treating as item?
      [%edit act=$>(%edit action) updated-at=time]
  ==
++  wash
  |=  [=rock =wave]
  ?-    -.wave
      %whole
    item.wave
    ::
      %edit
    (edit:pure updated-at.wave rock act.wave)
   ::
      %prepend-to-feed
    ?>  ?=([%feed *] bespoke.rock)
    %=  rock
      feed.bespoke  (oust [200 (lent wave)] (weld feed.wave feed.bespoke.rock))
    ==
  ==
--
