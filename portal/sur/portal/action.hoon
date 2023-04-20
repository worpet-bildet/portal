/-  *portal-data, *portal-config
|%
::
JUST COMMENT OUT MOST ERRORS UNTIL IT COMPILES AND THEN START REBUILDING STEP BY STEP
::  TODO - each bespoke has its own diffs?
::  TODO json coversions such that FE doesnt have to input an optional arg
::  if they dont want to
::
+$  action
  $%  $:  %create
         =bespoke
         append-to=[struc=[%collection ~] =ship =cord time=_'~2000.1.1']
         time=(unit cord)  ::optional
      ==
      ::
      $:  %edit
        $%  $:  key=[struc=[%other ~] =ship =cord time=cord]
                bespoke=[struc=[%other ~] lens=$%([%deleted ~] [%def ~]) title=(unit @t) blurb=(unit @t) link=(unit @t) image=(unit @t)]
            ==
            ::
            $:  key=[struc=[%app ~] =ship =cord time=cord]
                bespoke=[struc=[%app ~] lens=$%([%temp ~] [%deleted ~] [%def ~]) dist-desk=(unit @t) sig=(unit signature) treaty=(unit treaty)]
            ==
            ::
            $:  key=[struc=[%collection ~] =ship =cord time=cord]
                bespoke=[struc=[%collection ~] lens=$%([%index ~] [%deleted ~] [%def ~]) title=(unit @t) blurb=(unit @t) image=(unit @t) key-list=(unit key-list)]  ::does it need link?
            ==
        ==
      ==
      ::  sinteza edita i overwritea???
      [%overwrite =key =bespoke]  :: better name?
      ::
      ::
      ::
      [%append col-key=[struc=[%collection ~] =ship =cord time=cord] item-key=key]
      [%prepend col-key=[struc=[%collection ~] =ship =cord time=cord] item-key=key]
      ::
      ::
      [%delete =key]  ::  adds [%deleted ~] lens
      ::
      ::  subscribing should check whether item exists
      ::  somewhere in the logic it should be accounted for
      ::: that the item was deleted
      ::
      [%sub =key]
      ::
      [%put-temp =key =item]
      ::  /nonitem/app
      ::  key defines item which will be filled with treaty data
      [%get-docket =key =ship =desk]
      [%edit-docket =key =treaty]  ::put treaty into /enditem/app
      ::  /nonitem/group
      ::  key defines item which will be filled with group data
      [%get-group-preview =key flag=[=ship =term]]
      ::  TODO get-docket and get-group-preview should probably be messages
      ::
      :: [%purge =default-curators =portal-curator]
      ::
      :: [%index-as-curator toggle=?]
      :: [%onboarded toggle=?]
      ::
      ::  command sequences/macros necessary?
      :: maybe action should be action==message

    ==
--
