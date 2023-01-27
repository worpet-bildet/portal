/-  *portal-action, *portal-data
/+  *portal
!:
:-  %say
|=   [[now=@da eny=@uvJ bek=beak] ~ ~]
:-  %portal-action
=/  pointer-set  (get-all-pointers:helper-arms p.bek now)
=/  pointer-list  ~(tap in pointer-set)
=/  pointer-list  (skim-pointers-of-types:helper-arms pointer-list ~[%app])
[%add p.bek %list *editable-data [%list [%app pointer-list]]]
