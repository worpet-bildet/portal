|%
+$  groups
  (map flag group)
+$  group
  $:  =fleet
      *
      *
      *
      *
      *
      *
      =cordon
      secret=?
      *
      *
      *
      *
  ==
+$  preview
  $:  =flag
      meta=data
      =cordon
      =time
      secret=?
  ==
+$  flag  (pair ship term)
+$  data
  $:  title=cord
      description=cord
      image=cord
      cover=cord
  ==
++  cordon
  =<  cordon
  |%
  ++  open
    |%
    +$  ban  [ships=(set ship) ranks=(set rank:title)]
    --
  ++  shut
    |%
    +$  state  [pend=(set ship) ask=(set ship)]
    +$  kind  ?(%ask %pending)
    --
  +$  cordon
    $%  [%shut state:shut]
        [%afar =flag =path desc=@t]
        [%open =ban:open]
    ==
  --
++  fleet
  =<  fleet
  |%
  +$  fleet  (map ship vessel)
  +$  vessel
    $:  sects=(set sect)
        joined=time
    ==
  --
+$  sect  term
--
