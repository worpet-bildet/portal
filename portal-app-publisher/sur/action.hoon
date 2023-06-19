|%
+$  action  
  $%  [%sign-app dev=ship dist-desk=@t]
      [%agent-init ~]
      [%get-tx-by-hash url=@ta tx-hash=@t]
      ::[%get-tx-by-hash url=@ta tx-hash=@ux]
      ::  [%publish =desk]  ::  DON'T publish with treaty because that automatically makes the desk public
      ::  .^([r=dict:clay w=dict:clay] %cp /=app1=)
      :: |pass c+[%perm %app1 *path [%r `[%white (sy ~[[%.n 'portal-sell-app1']])]]]
      ::  -send-task-take-gift [%cred 'portal-sell-app1' (sy ~[~zod])]
      ::
      ::  ask people to make docket file which we read from portal-app-pub
      ::  price -> in %app item
      ::  recepient address -> on portal app pub
      ::
      ::  buyer pokes from his portal to seller's app pub
      ::  seller creates random data and saves in state
      ::  sends that data back to the buyer + receiving address
      ::  buyer pays, sends tx-hash
      ::  seller checks tx, makes sure that the amount is correct + random data is correct
      ::  sellers changes perms, sends the poke to buyer, buyer downloads app
      ::
      ::
  ==
--
