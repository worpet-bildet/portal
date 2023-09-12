/-  d=portal-data
::  SSS item
|%
++  name  %item
+$  rock  item:d
::  TODO  waves, but you cant just add because you also need sig and meta
+$  wave
  $%  [%whole =item:d]
      [%prepend-to-feed =feed:d]  ::  TODO also sig and meta here
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
      feed.bespoke  (weld feed.wave feed.bespoke.rock) 
    ==
  ==
--
