/-  *portal-data
|%
+$  update
  $%  [%empty-init ~]         ::  received when subbed to non-existing item
      [%put =key =item]        ::  adds/edits item.
                              ::TODO  assert somewhere upstream that key and key.bespoke.data.item must be equal
      [%del =key]              ::  deletes item from state, and unsubs if not yours
      [%sub =key]              ::  subs to item, and receives it
  ==
--
