|%
+$  writ   [seal memo]
+$  seal
  $:  =id
      feels=(map ship feel)
      replied=(set id)
  ==
+$  id     (pair ship time)
+$  feel   @ta
+$  memo  
  $:  replying=(unit id)
      author=ship
      sent=time
      =content
  ==
+$  content
  $%  [%story p=story]
      [%notice p=notice]
  ==
+$  notice  [pfix=@t sfix=@t]
+$  story
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
      :: scry into groups when you receive a bait for a chat that doesn't exist yet
      :: work out what app
  ==
+$  flag  (pair ship term)
+$  nest  (pair dude:gall flag)
--