/-  *portal-data, *portal-config
|%
::
::  units are optional args
+$  action
  $%  $:  %create
         ship=(unit ship)
         cord=(unit cord)
         time=(unit cord)
         lens=(unit lens)
         bespoke=(unit bespoke)
         append-to=(list [struc=[%collection ~] =ship =cord time=cord])
         :: TODO add to multiple collections
      ==
      ::
      $:  %edit
        $:  =key
            lens=(unit lens)
            $=  bespoke  %-  unit
              $%  [[%other ~] title=(unit @t) blurb=(unit @t) link=(unit @t) image=(unit @t)]
                  [[%app ~] dist-desk=(unit @t) sig=(unit signature) treaty=(unit treaty)]
                  [[%collection ~] title=(unit @t) blurb=(unit @t) image=(unit @t) key-list=(unit key-list)]  ::does it need link?
              ==
        ==
      ==
      ::
      [%replace =key =lens =bespoke]  ::  should it act like put or edit?
      ::
      [%append item-key=key col-key=[struc=[%collection ~] =ship =cord time=cord]]
      [%prepend item-key=key col-key=[struc=[%collection ~] =ship =cord time=cord]]
      ::  removes all instances of key from collection
      [%remove item-key=key col-key=[struc=[%collection ~] =ship =cord time=cord]]
      ::
      [%delete =key]  ::  adds [%deleted ~] lens
      ::
      [%sub =key]
      ::
      ::
      [%index-as-curator toggle=?]
      [%onboarded toggle=?]
      ::
      ::  ? purge needs to be defined as action?
      [%purge portal-curator=@p]
    ==
--
