/-  portal-data-0, portal-data-1, portal-data-2, d=portal-data, st=portal-states
|_  [=bowl:gall]
++  state-2-to-3
  |=  =state-2:st
  ^-  state-3:st
  =+  ~(tap by items.state-2)
  =/  new-items  ^-  items:d  %-  malt  %+  murn  -
    |=  [key-2=key:portal-data-2 item-2=item:portal-data-2]
    (key-item-2-to-3 key-2 item-2)
  =/  s3  *state-3:st
  s3(items new-items)
::
++  key-item-2-to-3  :: just adding app price lol
  |=  [key-2=key:portal-data-2 item-2=item:portal-data-2]
  ^-  (unit [key:d item:d])
  :+  ~  key-2
  =>  item-2
  :^  key
      lens
      ?:  ?=([%app *] bespoke)
        [%app screenshots blurb dist-desk sig treaty *@t]:bespoke
      bespoke
      meta
::
++  state-1-to-2
  |=  =state-1:st
  ^-  state-2:st
  =+  ~(tap by items.state-1)
  =/  new-items  ^-  items:portal-data-2  %-  malt  %+  murn  -
    |=  [key-1=key:portal-data-1 item-1=item:portal-data-1]
    (key-item-1-to-2 key-1 item-1)
  =/  s2  *state-2:st
  s2(items new-items)
::
++  key-item-1-to-2
  |=  [key-1=key:portal-data-1 item-1=item:portal-data-1]
  ^-  (unit [key:portal-data-2 item:portal-data-2])
  ?:  !=(our.bowl ship.key-1)
    ~
  ?:  ?=(%temp lens.item-1)
    ~
  :+  ~  key-1
  =>  item-1
  :^  key
      lens
      ?:  ?=([%app *] bespoke)
        [%app ~ '' [dist-desk sig treaty]:bespoke]
      bespoke
      meta
::
++  state-0-to-1
  |=  =state-0:st
  ^-  state-1:st
  =+  ~(tap by all-items.state-0)
  =/  new-items  ^-  items:portal-data-1  %-  malt  %+  murn  -
    |=  [key-0=key:portal-data-0 item-0=item:portal-data-0]
    (key-item-0-to-1 key-0 item-0)
  =/  s1  *state-1:st
  s1(items new-items)
::
++  key-item-0-to-1
  |=  [key-0=key:portal-data-0 item-0=item:portal-data-0]
  ^-  (unit [key:portal-data-1 item:portal-data-1])
  ?:  !=(our.bowl ship.key-0)
    ~
  ?:  ?=(%nonitem -.type.key-0)
    ~
  ?:  ?=([%enditem %other ~] type.key-0)
    =/  key  [%other our.bowl '' cord.key-0]
    =/  lens  %def
    =/  bespoke  :*  %other
                      title.general.data.item-0
                      description.general.data.item-0
                      link.general.data.item-0
                      image.general.data.item-0
                  ==
    =/  meta  [cord.key-0 (scot %da now.bowl) ~ [%public ~]]
    (some [key [key lens bespoke meta *signature:d]])
  ?:  ?=([%validity-store *] bespoke.data.item-0)
    =/  key  [%validity-store our.bowl '' cord.key-0]
    =/  lens  %def
    =/  bespoke  [%validity-store *validity-records:portal-data-1]
    =/  meta  [cord.key-0 (scot %da now.bowl) ~ [%public ~]]
    (some [key [key lens bespoke meta sig=*signature:d]])
  ?:  =(key-0 [our.bowl [%list %enditem %other ~] '~2000.1.2'])
    ~
  ?:  ?=([%list *] type.key-0)
    =/  list-key-conv
      |=  key-0=[=ship type=[%list *] =cord]
      ?.  =(cord.key-0 '~2000.1.1')
        [%collection our.bowl '' cord.key-0]
      ?+    type.key-0    !!  :: what to do as default?
          [%list %app ~]
        [%collection our.bowl '' (scot %da now.bowl)]
          [%list %nonitem %group ~]
        [%collection our.bowl '' (crip (weld (scow %da now.bowl) ".0001"))]
          [%list %nonitem %ship ~]
        [%collection our.bowl '' (crip (weld (scow %da now.bowl) ".0002"))]
          [%list %enditem %other ~]
        [%collection our.bowl '' (crip (weld (scow %da now.bowl) ".0003"))]
          [%list %list ~]
        [%collection our.bowl '' '~2000.1.1']
      ==
    =/  key  (list-key-conv key-0)
    =/  meta  [cord.key-0 (scot %da now.bowl) ~ [%public ~]]  ::  CORD? if ~2000.1.1
    =/  lens  %def
    =/  bespoke
      :*  %collection
          title.general.data.item-0
          description.general.data.item-0
          image.general.data.item-0
          ?+    -.bespoke.data.item-0    !!
              %list-nonitem-group
            %+  turn  group-key-list.bespoke.data.item-0
            |=  [key=[=ship type=[%nonitem %group ~] time=cord] text=cord]
            [%group ship.key time.key '']
            ::
              %list-nonitem-ship
            %+  turn  ship-key-list.bespoke.data.item-0
            |=  [key=[=ship type=[%nonitem %ship ~] time=cord] text=cord]
            [%ship ship.key '' '']
            ::
              %list-app
            %+  turn  app-key-list.bespoke.data.item-0
            |=  [key=[=ship type=[?(%enditem %nonitem) %app ~] time=cord] text=cord]
            [%app ship.key time.key '']
            ::
              %list-enditem-other
            %+  turn  other-key-list.bespoke.data.item-0
            |=  [key=[=ship type=[%enditem %other ~] time=cord] text=cord]
            [%other ship.key '' time.key]
            ::
              %list-list
            %+  turn  list-key-list.bespoke.data.item-0
            |=  [key=[=ship type=[%list *] time=cord] text=cord]
            (list-key-conv key)
          ==
      ==
    (some [key [key lens bespoke meta *signature:d]])
  ~
--