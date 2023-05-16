/-  *portal-data, portal-data-0
|%
::
::  add defaults, either with $_(? e.g. _~zod) or $~
+$  default-curators  (set key)
+$  portal-curator  _~worpet-bildet
+$  purge-timer  $~(%.y ?)
+$  purge-time  _~d1
+$  portal-indexer  _~worpet-bildet
+$  indexed-as-curator  $~(%.n ?)
+$  onboarded  $~(%.n ?)
::
+$  state-0
  $:  %0
      default-curators=(set key:portal-data-0)
      portal-curator=key:portal-data-0
  ==
::
+$  state-1
  $:  %1
      default-curators=(set key:portal-data-0)
      portal-curator=key:portal-data-0
      purge-timer=?
      purge-time=@dr
      portal-indexer=@p
      indexed-as-curator=?
      onboarded=?
  ==
::
+$  state-2
  $:  %2
      my-feed=feed:portal-data-0
      default-curators=(set key:portal-data-0)
      portal-curator=key:portal-data-0
      purge-timer=?
      purge-time=@dr
      portal-indexer=@p
      indexed-as-curator=?
      onboarded=?
  ==
::
+$  state-3
  $:  %3
      =portal-curator
      =portal-indexer
      =purge-timer
      =purge-time
      =indexed-as-curator
      =onboarded
  ==

--
