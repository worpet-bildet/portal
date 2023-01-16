::  default curator collects this data for metrics purposes
::  time series of ships which downloaded Galleria
|%
+$  event-log  (list event)
+$  event
  $%  [%join =time =ship-type]
  ==
+$  ship-type
  $?  %galaxy
      %star
      %planet
      %moon
      %comet
  ==
--
