/-  *portal-data, *portal-config
|%
::
::  units are optional args
+$  action
  $%  $:  %create
         cord=(unit cord)
         time=(unit cord)
         =lens
         =bespoke
         append-to=(unit [struc=[%collection ~] =ship =cord time=_'~2000.1.1'])
      ==
      ::
      $:  %edit
        $:  =key
            lens=(unit lens)
            $=  bespoke  $%
                [[%other ~] title=(unit @t) blurb=(unit @t) link=(unit @t) image=(unit @t)]
                [[%app ~] dist-desk=(unit @t) sig=(unit signature) treaty=(unit treaty)]
                [[%collection ~] title=(unit @t) blurb=(unit @t) image=(unit @t) key-list=(unit key-list)]  ::does it need link?
            ==
        ==
      ==
      ::
      [%replace =key =lens =bespoke]  :: better name?
      ::
      [%append col-key=[struc=[%collection ~] =ship =cord time=cord] item-key=key]
      [%prepend col-key=[struc=[%collection ~] =ship =cord time=cord] item-key=key]
      ::
      [%delete =key]  ::  adds [%deleted ~] lens
      ::
      ::  subscribing should check whether item exists
      ::  somewhere in the logic it should be accounted for
      ::: that the item was deleted
      ::
      [%sub =key]
      ::
      ::  key defines item which will be filled with treaty data
      [%get-docket =key =ship =desk]
      [%edit-docket =key =treaty]  ::put treaty into /enditem/app
      ::  key defines item which will be filled with group data
      [%get-group-preview =key flag=[=ship =term]]
      ::  TODO get-docket and get-group-preview should probably be messages
      ::  or be defined somewhere else?
      ::
      :: [%purge =default-curators =portal-curator]
      ::
      [%index-as-curator toggle=?]
      [%onboarded toggle=?]
      ::
      ::  command sequences/macros necessary?
      :: maybe action should be action==message

    ==
--
