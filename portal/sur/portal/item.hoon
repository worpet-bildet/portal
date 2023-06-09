/-  *portal-data, *portal-action
/+  portal
::  SSS item
|%
++  name  %item
+$  rock  item
::  TODO  waves, but you cant just add because you also need sig and meta
+$  wave
  $%  [%whole =item]
      [%prepend-to-feed =feed]  :: todo, also metadata, or start treating as item?
      ::[%edit $>(%edit action)]
  ==
++  wash
  |=  [=rock =wave]
  ?-    -.wave
      %whole
    item.wave
    ::
    ::   %bespoke
    :: rock
   ::
      %prepend-to-feed
    ?>  ?=([%feed *] bespoke.rock)
    %=  rock
      feed.bespoke  (oust [200 (lent wave)] (weld feed.wave feed.bespoke.rock))
    ==
  ==
--
