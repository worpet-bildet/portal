/-  *app-store-data
|%
::
::  ship signatures
::
++  jael-scry
  |*  [=mold our=ship desk=term now=time =path]
  .^  mold
    %j
    (scot %p our)
    desk
    (scot %da now)
    path
  ==
::
++  sign
  |=  [our=ship now=time =key]
  ^-  signature
  =+  (jael-scry ,=life our %life now /(scot %p our))
  =+  (jael-scry ,=ring our %vein now /(scot %ud life))
  =/  val  `@`(crip (weld (scow %p dev-name.key) (trip `@t`app-name.key)))
  :+  `@ux`(sign:as:(nol:nu:crub:crypto ring) val)
    our
  life
::
++  validate
  |=  [our=ship =signature =key now=time]
  ^-  ?
  =+  (jael-scry ,lyf=(unit @) our %lyfe now /(scot %p q.signature))
  ::  we do not have a public key from ship at this life
  ::
  ?~  lyf  %.n
  ?.  =(u.lyf r.signature)  %.n
  =+  %:  jael-scry
        ,deed=[a=life b=pass c=(unit @ux)]
        our  %deed  now  /(scot %p q.signature)/(scot %ud r.signature)
      ==
  ::  if signature is from a past life, skip validation
  ::  XX: should be visualised on frontend, not great.
  ?.  =(a.deed r.signature)  %.n
  ::  verify signature from ship at life
  ::
  =/  them  (com:nu:crub:crypto b.deed)
  =/  val  `@`(crip (weld (scow %p dev-name.key) (trip `@t`app-name.key)))
  ~&  (crip (weld (scow %p dev-name.key) (trip `@t`app-name.key)))
  =(`val (sure:as.them p.signature))
::
--
