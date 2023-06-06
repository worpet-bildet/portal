|%
++  name  %portal-devs
+$  rock  (map [ship desk] ship)
+$  wave
  $%  [%init =rock]
      [%put key=[ship desk] dev=ship]
      [%del key=[ship desk]]
  ==
++  wash
  |=  [=rock =wave]
  ?-    -.wave
      %init  rock.wave
      %put   (~(put by rock) key.wave dev.wave)
      %del   (~(del by rock) key.wave)
  ==
--
