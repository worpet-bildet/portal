/-  *portal-data
/+  portal
::  SSS item
|%
++  name  %item
+$  rock  item
::  TODO  waves, but you cant just add because you also need sig and meta
+$  wave
  $%  [%whole =item]
      [%prepend-to-feed =feed]  ::  TODO also sig and meta here
      :: [%lens =lens =meta =sig]
      :: [%bespoke =bespoke =meta =sig]
  ==
++  wash
  |=  [=rock =wave]
  ?-    -.wave
      %whole
    item.wave
    ::
      %prepend-to-feed
    ?>  ?=([%feed *] bespoke.rock)
    %=  rock
      feed.bespoke  (oust [200 (lent wave)] (weld feed.wave feed.bespoke.rock))  
    ==
  ==
--
