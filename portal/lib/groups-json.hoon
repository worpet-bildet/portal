/-  g=groups
/-  meta
|%
++  enjs
  =,  enjs:format
  |%
  ++  preview
    |=  p=preview:g
    %-  pairs
    :~  flag+s+(flag flag.p)
        time+(time time.p)
        meta+(meta meta.p)
        cordon+(cordon cordon.p)
        secret+b+secret.p
    ==
  ++  flag
    |=  f=flag:g
    (rap 3 (scot %p p.f) '/' q.f ~)
  ++  meta
    |=  m=data:g
    %-  pairs
    :~  title/s/title.m
        description/s/description.m
        image/s/image.m
        cover/s/cover.m
    ==
  ++  cordon
    |=  c=cordon:g
    %+  frond  -.c
    ?-  -.c
      %open  (ban-cordon ban.c)
      %shut  (shut-cordon +.c)
      %afar  (afar-cordon +.c)
    ==
  ::
  ++  shut-cordon
    |=  [pend=(set @p) ask=(set @p)]
    %-  pairs
    :~  pending/a/(turn ~(tap in pend) ship)
        ask/a/(turn ~(tap in ask) ship)
    ==

  ::
  ++  afar-cordon
    |=  [app=flag:g pax=^path desc=@t]
    %-  pairs
    :~  app/s/(flag app)
        path/s/(spat pax)
        desc/s/desc
    ==
  ::
  ++  ban-cordon
    |=  b=ban:open:cordon:g
    %-  pairs
    :~  ships/a/(turn ~(tap in ships.b) ship)
        ranks/a/(turn ~(tap in ranks.b) (lead %s))
    ==

  --
::
--
