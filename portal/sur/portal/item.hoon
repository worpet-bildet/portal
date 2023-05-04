/-  *portal-data
::  SSS item
|%
++  name  %item
+$  rock  item
+$  wave
  $%  [%init =item]
      [%prepend-to-feed =feed]
  ==
++  wash
  |=  [=rock =wave]
  ?-    -.wave
      %init
    item.wave
      %prepend-to-feed
    ?>  ?=([%feed *] bespoke.rock)
    %=  rock
      feed.bespoke  (oust [200 (lent wave)] (weld feed.wave feed.bespoke.rock))  
    ==
    ::(lent wave) jel ovo dovoljno
  ==
--
