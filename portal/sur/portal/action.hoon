/-  *portal-data, *portal-config
|%
::
+$  action
  $%  [%add =ship =type =general =bespoke-input]
      [%add-with-time =key =general =bespoke-input]
      [%edit =key =general =bespoke-input]
      ::  creates item and adds it to specified list
      [%add-item-to-list list-key=[=ship type=[%list ~] =cord] =ship =type =general =bespoke-input]
      [%add-to-default-list =key]
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
  ==
--
