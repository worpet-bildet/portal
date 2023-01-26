/-  *portal-data
|%
+$  update
  $%  [%empty-init ~]              ::  received when subbed to non-existing item
      [%put =item]                 ::  adds/edits item
      [%del =pointer]              ::  deletes item from state, and unsubs if not yours
      [%sub =pointer]              ::  subs to item, and receives it
  ==
--
