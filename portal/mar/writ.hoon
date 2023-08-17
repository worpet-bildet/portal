/-  c=writ
=<
|_  wrt=writ:c
++  grow
  |%
  ++  noun  wrt
  ++  json  (writ:enjs wrt)
  --
++  grab
  |%
  ++  noun  writ:c
  --
++  grad  %noun
--
|%
++  enjs
  =,  enjs:format
  |%
  ++  id 
    |=  =id:c
    n+(rap 3 '"' (scot %p p.id) '/' (scot %ud q.id) '"' ~)

  ++  writ
    |=  =writ:c
    %-  pairs
    :~  seal+(seal -.writ)
        memo+(memo +.writ)
    ==
  ++  seal
    |=  =seal:c
    %-  pairs
    :~  id+(id id.seal)
    ::
        :-  %feels
        %-  pairs
        %+  turn  ~(tap by feels.seal)
        |=  [her=@p =feel:c]
        [(scot %p her) s+feel]
    ::
        :-  %replied
        :-  %a
        (turn ~(tap in replied.seal) |=(i=id:c (id i)))
    ==
  ++  memo 
    |=  =memo:c
    %-  pairs
    :~  replying+?~(replying.memo ~ (id u.replying.memo))
        author+(ship author.memo)
        sent+(time sent.memo)
        content+(content content.memo)
    ==


  ++  notice
    |=  n=notice:c
    %-  pairs
    :~  pfix/s/pfix.n
        sfix/s/sfix.n
    ==
  ::
  ++  content
    |=  c=content:c
    %+  frond  -.c
    ?-  -.c
      %story   (story p.c)
      %notice  (notice p.c)
    ==
  ::
  ++  story
    |=  s=story:c
    ^-  json
    %-  pairs
    :~  :-  %block  a+(turn p.s block)
        :-  %inline  a+(turn q.s inline)
    ==
  ::
  ++  inline
    |=  i=inline:c
    ^-  json
    ?@  i  s+i
    %+  frond  -.i
    ?-  -.i
        %break
      ~
    ::
        %ship  s/(scot %p p.i)
    ::
        ?(%code %tag %inline-code)
      s+p.i
    ::
        ?(%italics %bold %strike %blockquote)
      :-  %a
      (turn p.i inline)
    ::
        %block
      %-  pairs
      :~  index+(numb p.i)
          text+s+q.i
      ==
    ::
        %link
      %-  pairs
      :~  href+s+p.i
          content+s+q.i
      ==
    ==
  ::
    ++  block
    |=  b=block:c
    ^-  json
    %+  frond  -.b
    ?-  -.b
        %cite  (cite cite.b)
        %image
      %-  pairs
      :~  src+s+src.b
          height+(numb height.b)
          width+(numb width.b)
          alt+s+alt.b
      ==
      
    ==
  ::
  ++  cite
  |=  =cite:c
  %+  frond  -.cite
  ?-    -.cite
      %group  s+(flag flag.cite)
  ::
      %desk
    %-  pairs
    :~  ['flag' s+(flag flag.cite)]
        ['where' s+(spat wer.cite)]
    ==
  ::
      %chan
    %-  pairs
    :~  nest/s/(nest nest.cite)
        where/s/(spat wer.cite)
    ==
  ::
      %bait
    %-  pairs
    :~  group/s/(flag grp.cite)
        graph/s/(flag gra.cite)
        where/s/(spat wer.cite)
    ==
  ==
  ++  nest
    |=  n=nest:c
    (rap 3 p.n '/' (^flag q.n) ~)

  ++  flag
    |=  f=flag:c
    (rap 3 (scot %p p.f) '/' q.f ~)

  --
--