/-  *portal-data, *portal-config
|%
::
::  NEW
::  key -> ship struc type time
::
::  TODO define pokes with Tom

  :: $%
  ::   should also define time, if ~, then time auto added?
  ::   time should be optional arg? (unit)
  ::   $:  %add
  ::      collections=(list [=ship struc=[%collection ~] type=path time=cord])
  ::      =ship
  ::      =type
  ::      =general
  ::      =bespoke-input
  ::   ==
  ::
  ::     :: TODO - make general and bespoke-input args optional
  ::     [%edit =key =general =bespoke-input]
  ::     should edit have control over in which list sth is?
  ::
  ::     :: TODO
  ::     [%delete-list-item =key list-item-key=key]
+$  action
  $%  [%add =type =ship =bespoke]
  ::  TODO rename
      [%add-with-time =key =bespoke]
      [%edit =key =bespoke]
      ::  creates item and adds it to specified list
      [%add-item-to-col col-key=[type=[[%collection ~] [%def ~]] =ship time=cord] =type =ship =bespoke]
      [%sub =key]
      [%del =key]
      ::
      [%put-outer =key =item]
      ::  /nonitem/app
      ::  key defines item which will be filled with treaty data
      [%get-docket =key =ship =desk]
      [%edit-docket =key =treaty]  ::put treaty into /enditem/app
      ::  /nonitem/group
      ::  key defines item which will be filled with group data
      [%get-group-preview =key flag=[=ship =term]]
      ::  TODO get-docket and get-group-preview should probably be messages
      ::
      [%purge =default-curators =portal-curator]
      ::
      [%index-as-curator toggle=?]
      [%onboarded toggle=?]
      ::
      ::  command sequences/macros necessary?
      ::
      ::  maybe action should be action==message
      :: units are optional args
      :: $:  %add-1    ship=(unit ship)
      ::               type=(unit type)
      ::               cord=(unit cord)
      ::               title=(unit @t)
      ::               link=(unit @t)
      ::               description=(unit @t)
      ::               tags=(unit tags)
      ::               properties=(unit properties)
      ::               pictures=(unit pictures)
      ::               image=(unit @t)
      ::               color=(unit @t)
      ::               bespoke=(unit bespoke)
      :: ==
      :: $:  %edit-1   =key
      ::               title=(unit @t)
      ::               link=(unit @t)
      ::               description=(unit @t)
      ::               tags=(unit tags)
      ::               properties=(unit properties)
      ::               pictures=(unit pictures)
      ::               image=(unit @t)
      ::               color=(unit @t)
      ::               bespoke=(unit bespoke)
      :: ==
    ==
--
