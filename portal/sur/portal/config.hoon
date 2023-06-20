/-  *portal-data, portal-data-0
|%
::
+$  default-curators  (set key)
+$  portal-curator  _~mister-toptyr-bilder
+$  purge-timer  $~(%.y ?)
+$  purge-time  _~d1
+$  portal-indexer  _~mister-toptyr-bilder
+$  indexed-as-curator  $~(%.n ?)
+$  onboarded  $~(%.n ?)
+$  our-apps  (set [=ship =desk])
+$  dev-map   (map @t ship)
::
+$  state-0  [%0 *]
+$  state-1  [%1 *]
+$  state-2  [[%2 *] *]  :: state-2 had feed SSS stuff next to it
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
::
++  state-4
  $:  %4
      =portal-curator
      =portal-indexer
      =purge-timer
      =purge-time
      =indexed-as-curator
      =onboarded
      =our-apps
  ==
::
--
