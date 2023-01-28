/-  *portal-action, *portal-data
/+  *portal
!:
:-  %say
|=   [[now=@da eny=@uvJ bek=beak] ~ ~]
:-  %portal-action
=/  pointer-set  (get-all-pointers:scry p.bek now)
=/  pointer-list  ~(tap in pointer-set)
=/  end-item-pointer-list  (end-item-pointer-list (skim-types:pointers pointer-list ~[%app]))
[%add p.bek %list *general:data [%list [type=%app end-item-pointer-list]]]
