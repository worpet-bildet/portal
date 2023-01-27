/-  *portal-action, *portal-data
/+  *portal
!:
:-  %say
|=   [[now=@da eny=@uvJ bek=beak] ~ ~]
:-  %portal-action
=/  pointer-set  (get-all-pointers:helper-arms p.bek now)
=/  pointer-list  ~(tap in pointer-set)
=/  pointer-list  (skip-pointers-of-types:helper-arms pointer-list ~[%curator-page %validity-store])
[%edit [p.bek '~2000.1.1' %curator-page] *editable-data [%curator-page [%mixed pointer-list]]]
