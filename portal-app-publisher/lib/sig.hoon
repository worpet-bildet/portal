/-  *portal-signature
|%
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
  |=  [our=ship now=time sig-input=*]
  ^-  signature
  =+  (jael-scry ,=life our %life now /(scot %p our))
  =+  (jael-scry ,=ring our %vein now /(scot %ud life))
  :+  `@ux`(sign:as:(nol:nu:crub:crypto ring) (jam sig-input))
    our
  life
::
++  validate
  |=  [our=ship =signature sig-input=* now=time]
  ^-  ?
  =+  (jael-scry ,lyf=(unit @) our %lyfe now /(scot %p ship.signature))
  ::  we do not have a public key from ship at this life
  ::
  ?~  lyf  %.n
  ?.  =(u.lyf life.signature)  %.n
  =+  %:  jael-scry
        ,deed=[a=life b=pass c=(unit @ux)]
        our  %deed  now  /(scot %p ship.signature)/(scot %ud life.signature)
      ==
  ::  if signature is from a past life, skip validation
  ::  XX: should be visua[%sign-app dev=ship dist-desk=@t]lised on frontend, not great.
  ?.  =(a.deed life.signature)  %.n
  ::  verify signature from ship at life
  ::
  =/  them  (com:nu:crub:crypto b.deed)
  =(`(jam sig-input) (sure:as.them hex.signature))
::
--
