::  doesn't work currently
/-  *portal-action, *portal-data
/+  *portal
!:
:-  %say
|=   [[now=@da eny=@uvJ bek=beak] ~ ~]
:-  %portal-action
=/  pointer-set  (get-all-pointers:scry p.bek now)
=/  pointer-list  ~(tap in pointer-set)
=/  pointer-list  (skip-types:pointers pointer-list ~[%curator-page %validity-store])
[%add p.bek %list *general:data [%list [%mixed pointer-list]]]
