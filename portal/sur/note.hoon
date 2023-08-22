|%
+$  note  [seal =essay]
+$  seal
  $:  =time
      =quips
      feels=(map ship feel)
  ==
++  quips
  =<  rock
  |%
  +$  rock
    ((mop time quip) lte)
  ++  on
    ((^on time quip) lte)
  +$  diff
    (pair time delta)
  +$  delta
    $%  [%add p=memo]
        [%del ~]
        [%add-feel p=ship q=feel]
        [%del-feel p=ship]
    ==
  --
+$  memo
  $:  content=story
      author=ship
      sent=time
  ==
+$  feel  @ta
+$  story  (pair (list block) (list inline))
+$  block
  $%  [%image src=cord height=@ud width=@ud alt=cord]
      [%cite =cite]
      [%header p=?(%h1 %h2 %h3 %h4 %h5 %h6) q=(list inline)]
      [%listing p=listing]
      [%rule ~]
      [%code code=cord lang=cord]
  ==
+$  inline
  $@  @t
  $%  [%italics p=(list inline)]
      [%bold p=(list inline)]
      [%strike p=(list inline)]
      [%blockquote p=(list inline)]
      [%inline-code p=cord]
      [%ship p=ship]
      [%block p=@ud q=cord]
      [%code p=cord]
      [%tag p=cord]
      [%link p=cord q=cord]
      [%break ~]
  ==
+$  cite
  $%  [%chan =nest wer=path]
      [%group =flag]
      [%desk =flag wer=path]
      [%bait grp=flag gra=flag wer=path]
  ==
+$  flag  (pair ship term)
+$  nest  (pair dude:gall flag)
+$  listing
  $%  [%list p=?(%ordered %unordered) q=(list listing) r=(list inline)]
      [%item p=(list inline)]
  ==
+$  essay
  $:  title=@t
      image=@t
      content=(list verse)
      author=ship
      sent=time
  ==
+$  verse
  $%  [%block p=block]
      [%inline p=(list inline)]
  ==
+$  quip  [cork memo]
+$  cork
  $:  =time
      feels=(map ship feel)
  ==
--