|%
+$  usr-data  (map cur-name cur-data)
::
+$  cur-choice  (unit [=cur-name =cur-data])
+$  cur-data  (map dev-name app-pages)
::
+$  dev-page  (unit [=dev-name =app-pages])
+$  app-pages  (map app-name app-page)
::
+$  app-page  
  $:
    description=@t
  ==
:: 
::
+$  cur-name  @p
+$  dev-name  @p 
+$  app-name  @tas
--
