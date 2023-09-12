/-  *portal-data, *portal-config
|%
+$  tests
  $%  [%test-harness scry-mold=mold scry-path=path criterion=$-(* ?)]
      [%portal-act-request =ship =cage]
      [%receive-feedpoast ~]
      [%receive-reply ~]
      [%receive-many ~]
      [%run-all ~]
      ::
      [%receive-collection ~]
      [%sub ~]
      [%tip-tx-hash beneficiary=ship tx-hash=@t note=@t]
    ==
--
