/-  *portal-data, *portal-config
|%
::
::  NEW
  :: $%  [%add (list list-key=[=ship type=[%list *] =cord]) =ship =type =general =bespoke-input]
  ::
  ::     :: TODO - make general and bespoke-input args optional
  ::     [%edit =key =general =bespoke-input]
  ::
  ::     :: TODO
  ::     [%delete-list-item =key list-item-key=key]

+$  action
  $%  [%add =ship =type =general =bespoke]
      [%add-with-time =key =general =bespoke]
      [%edit =key =general =bespoke]
      ::  creates item and adds it to specified list
      [%add-item-to-col col-key=[=ship type=[%collection ~] =cord] =ship =type =general =bespoke]
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
      $:  %add-1    ship=(unit ship)
                    type=(unit type)
                    cord=(unit cord)
                    title=(unit @t)
                    link=(unit @t)
                    description=(unit @t)
                    tags=(unit tags)
                    properties=(unit properties)
                    pictures=(unit pictures)
                    image=(unit @t)
                    color=(unit @t)
                    bespoke=(unit bespoke)
      ==
      $:  %edit-1   =key
                    title=(unit @t)
                    link=(unit @t)
                    description=(unit @t)
                    tags=(unit tags)
                    properties=(unit properties)
                    pictures=(unit pictures)
                    image=(unit @t)
                    color=(unit @t)
                    bespoke=(unit bespoke)
      ==
    ==
--
