|%
+$  usr-data  (map cur-name cur-data)
::
+$  cur-choice  [~ [=cur-name =cur-data]]
+$  cur-data  (map dev-name app-pages)
::
+$  dev-page  [~ [=dev-name =app-pages]]
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
