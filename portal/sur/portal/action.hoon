/-  *portal-data, *portal-config
|%
::
::  units are optional args
+$  action
  $%  $:  %create  ::  "if exists, overwrite" OR "if exists, doesnt do anything"?
         ship=(unit ship)
         cord=(unit cord)
         time=(unit cord)
         lens=(unit lens)
         bespoke=(unit bespoke)
         append-to=(unit [struc=[%collection ~] =ship =cord time=_'~2000.1.1'])
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
      [%sub =key]  ::  TODO for temp items
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
