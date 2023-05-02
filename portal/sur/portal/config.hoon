/-  *portal-data
|%
::
::  add defaults, either with $_(? e.g. _~zod) or $~
+$  default-curators  (set key)
+$  portal-curator  key
+$  purge-timer  _%.y
+$  purge-time  @dr
+$  portal-indexer  @p
+$  indexed-as-curator  ?
+$  onboarded  ?
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
      =purge-timer
      =purge-time
      =portal-indexer
      =indexed-as-curator
      =onboarded
  ==

--
