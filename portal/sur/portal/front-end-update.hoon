/-  *portal-data
/+  mip
|%
+$  front-end-update
  $:  src-is-our=?
      update=?(%put %del)
      =key
      item=?(~ item)
  ==
::
+$  outgoing-subs  (mip:mip ship key acked=?)
::
::  TODO later
+$  incoming-subs  (map ship key)
--
