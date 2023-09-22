/-  portal-data-0, portal-data-1, portal-data-2, d=portal-data, portal-item
/+  sss 
|%
+$  versioned-state
  $+  store-versioned-state
  $%  state-0
      state-1
      state-2
      state-3
  ==
+$  state-0
  $+  store-state-0
  $:  %0
      =all-items:portal-data-0
  ==
+$  state-1
  $+  store-state-1
  $:  %1
      =items:portal-data-1
      item-sub=*
      item-pub=*
  ==
+$  state-2
  $+  store-state-2
  $:  %2
      =items:portal-data-2
      item-sub=*
      item-pub=*
  ==
+$  state-3
  $+  store-state-3
  $:  %3
      =items:d
      item-sub=_(mk-subs:sss portal-item ,[%item @ @ @ @ ~])
      item-pub=_(mk-pubs:sss portal-item ,[%item @ @ @ @ ~])
  ==
--