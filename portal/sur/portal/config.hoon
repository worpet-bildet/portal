/-  *portal-data
|%
::
::  add defaults, either with $_(? e.g. _~zod) or $~
+$  default-curators  (set key)
+$  portal-curator  _~ronwex-naltyp-dilryd-mopreg
+$  purge-timer  $~(%.y ?) 
+$  purge-time  _~d1
+$  portal-indexer  _~ronwex-naltyp-dilryd-mopreg
+$  indexed-as-curator  $~(%.n ?)
+$  onboarded  $~(%.n ?)
::
+$  state-0
  $:  %0
      =default-curators
      =portal-curator
  ==
::
+$  state-1
  $:  %1
      =default-curators  ::  just remove this
      =portal-curator
      =purge-timer
      =purge-time
      =portal-indexer
      =indexed-as-curator
      =onboarded
  ==
::
+$  state-2
  $:  %2
      =portal-curator
      =portal-indexer
      =purge-timer
      =purge-time
      =indexed-as-curator
      =onboarded
  ==

--
