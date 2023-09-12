|%
+$  test-spec
  $+  test-spec
  (list test-pair)
::
+$  test-pair  
  $+  test-pair
  (pair test-poke test-harness)
::
+$  test-poke
  $+  test-poke
  (unit [=dude:agent:gall =cage])
::
+$  test-harness
  $+  test-harness
  %-  unit  $:  scry-mold=mold
                scry-path=path
                criterion=$-(* ?)  ::  criterion should input scry-mold and output loob
                timers=(unit (list @dr))
            ==
--