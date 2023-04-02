/-  *portal-data, *portal-config
|%
::
+$  action
  $%  [%add =ship =type =general =bespoke]
      [%add-with-time =key =general =bespoke]
      [%edit =key =general =bespoke]
      ::  creates item and adds it to specified list
      [%add-item-to-list list-key=[=ship type=[%list ~] =cord] =ship =type =general =bespoke]
      [%sub =key]
      [%del =key]
      ::
      [%put-nonitem =key =item]
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
