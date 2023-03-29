/-  *portal-data
|%
+$  update
  $%  [%put =key =item]        ::  adds/edits item.  key and key.item should be equal
      [%del =key]              ::  deletes item from state, and unsubs if not yours
      [%sub =key]              ::  subs to item, and receives it
  ==
--
