/-  *portal-action, *portal-data
/+  *portal
!:
:-  %say
|=   [[now=@da eny=@uvJ bek=beak] ~ ~]
:-  %portal-action
=/  pointer-set  (get-all-pointers:scry p.bek now)
=/  pointer-list  ~(tap in pointer-set)
=/  pointer-list  (list-pointer-list (skim-types:pointers pointer-list ~[%list]))
[%edit [p.bek %curator-page '~2000.1.1'] *general:data [%curator-page [%list pointer-list]]]
