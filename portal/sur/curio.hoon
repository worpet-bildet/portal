|%
+$  curio  [seal =heart]
+$  seal
  $:  =time
      feels=(map ship feel)
      replied=(set time)
  ==
+$  feel  @ta
+$  heart
  $:  title=(unit @t)
      =content
      author=ship
      sent=time
      replying=(unit time)
  ==
+$  content
  (pair (list block) (list inline))
+$  block
  $%  [%image src=cord height=@ud width=@ud alt=cord]
      [%cite =cite]
  ==
+$  inline
  $@  @t
  $%  [%italics p=(list inline)]
      [%bold p=(list inline)]
      [%strike p=(list inline)]
      [%blockquote p=(list inline)]
      [%inline-code p=cord]
      [%ship p=ship]
      [%code p=cord]
      [%block p=@ud q=cord]
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
--