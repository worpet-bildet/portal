# TO SETUP PORTAL 1st time
|merge %portal our %base
|mount %portal
|install our %portal

# setup continued. do these after pulling from remote or nuking
- erase the portal folder and replace it with the one from github
|commit %portal # move files from earth (unix) to mars (urbit filesystem)

# TO NUKE
|nuke %portal, =desk &
|rein %portal [& %portal-manager]

# TO SEED DATA ON THE LIVE NETWORK USE THE FOLLOWING COMMANDS
=data -build-file /=portal=/sur/portal/data/hoon
=lib -build-file /=portal=/lib/portal/hoon

;; end item - item with data living on portal
;; non item - item with data living elsewhere (some apps, groups). non-editable
;; edit - can work on every end item or list 
;; canonical list types (init in portal.hoon) - 
;; %list %enditem %other
;; %list %nonitem %group
;; %list %nonitem %ship
;; %list %app
;; all items have general + bespoke data
;; general - title, link, desc, tags, props, pics, image, color
;; bespoke - depends on type - keys
;; cord - name of an app/group, or a date
;; path (uuid) - /zod/list/enditem/other/[date or cord]

# add enditem to default list

:portal-manager &portal-action :-  %add  :^  our  [%enditem %other ~]
:*
'Software as Soulcraft and the Metaphysics of Engineering with Neal Davis'
'https://www.youtube.com/watch?v=8f8vk1BhlDo'
'Neal Davis is a professor of computer science and the director of Urbit\'s Hoon School. We discuss why solving nuclear fusion might be a disaster, why Urbit computers have souls, Shinto philosophy, why you should read old books, how to select books, and much more. This was really good!'
*tags:data
*properties:data
*pictures:data
'http://i3.ytimg.com/vi/8f8vk1BhlDo/hqdefault.jpg'
''
==
[%enditem-other ~]

# add list with items
are these items then removed from other lists?


:portal-manager &portal-action :-  %add  :^  our  [%list %enditem %other ~]
:*
'Youtube videos introducing Urbit'
''
''
*tags:data
*properties:data
*pictures:data
''
''
==
:-  %list-enditem-other
:~  [[our [%enditem %other ~] 'insert date when item was created ~2023.2...'] 'yt vid']
    [[our [%enditem %other ~] 'cord'] 'yt vid']
    [[our [%enditem %other ~] 'insert date ~2023.2...'] 'yt vid']
==
these should be in the format [[~poldec-tonteg [%enditem %other ~] '~2023.2...'] 'yt vid']


:portal-manager &portal-action :-  %add  :^  our  [%list %nonitem %group ~]
:*
'urbit groups for hackers.'
''
'Best urbit groups made for real autists'
*tags:data
*properties:data
*pictures:data
''
''
==
:-  %list-nonitem-group
:~  [[~litmus-ritten [%nonitem %group ~] 'iwtf'] 'internet weirdenss task force']
    [[~litmus-ritten [%nonitem %group ~] 'sis'] 'software intelligence service']
    [[~middev [%nonitem %group ~] 'the-forge'] 'forge the new urbit']
    [[~doplyr-harbur [%nonitem %group ~] 'hacker-house'] 'seth the o.g.']
==

:portal-manager &portal-action :-  %add  :^  our  [%list %nonitem %group ~]
:*
'urbit groups for newbs.'
''
'new to urbit- look no further than this list'
*tags:data
*properties:data
*pictures:data
''
''
==
:-  %list-nonitem-group
:~  [[~bitbet-bolbel [%nonitem %group ~] 'urbit-community'] 'welcome wanderer']
    [[~halbex-palheb [%nonitem %group ~] 'uf-public'] 'the urbit foundation']
    [[~nibset-napwyn [%nonitem %group ~] 'tlon'] 'tlon public']
==

:portal-manager &portal-action :-  %edit  :+  [our [%list %nonitem %ship ~] '~2000.1.1']
:*
'my favourite frens.'
''
''
*tags:data
*properties:data
*pictures:data
''
''
==
:-  %list-nonitem-ship
:~  [[~toptyr-bilder [%nonitem %ship ~] ''] 'portal dude']
    [[~winpex-widtev-foddur-hodler [%nonitem %ship ~] ''] 'spaceman']
    [[~doplyr-harbur [%nonitem %ship ~] ''] 'another portal dude']
    [[~dilryd-mopreg [%nonitem %ship ~] ''] '3rd portal dude']
    [[~foddur-hodler [%nonitem %ship ~] ''] 'portal dudes never stop']
==

:portal-manager &portal-action :-  %edit  :+  [our [%list %nonitem %group ~] '~2000.1.1']
:*
'good places to hang out.'
''
''
*tags:data
*properties:data
*pictures:data
''
''
==
:-  %list-nonitem-group
:~  [[~dalten [%nonitem %group ~] 'aera'] 'Love aera!']
    [[~hocwyn-tipwex [%nonitem %group ~] 'uqbar-event-horizon'] 'Uqbar FTW!']
    [[~dilryd-mopreg [%nonitem %group ~] 'app-store'] 'app-store coming soon TM']
    [[~rondev [%nonitem %group ~] 'group-discovery'] 'Discover groups ayaya']
    [[~poldec-tonteg [%nonitem %group ~] 'the-phantom-tollbooth'] 'esotericism whooooooooa']
    [[~bollug-worlus [%nonitem %group ~] 'urbit-index'] 'indexxxxing urbit']
==

:portal-manager|sub [~winpex-widtev-foddur-hodler [%list %list ~] '~2000.1.1']

:portal-manager|overwrite-list :-
[our [%list %nonitem %group ~] '~2000.1.1']
  :~  [[~dalten [%nonitem %group ~] 'aera'] 'Love aera!']
      [[~hocwyn-tipwex [%nonitem %group ~] 'uqbar-event-horizon'] 'Uqbar FTW!']
      [[~dilryd-mopreg [%nonitem %group ~] 'app-store'] 'app-store coming soon TM']
      [[~rondev [%nonitem %group ~] 'group-discovery'] 'Discover groups ayaya']
      [[~poldec-tonteg [%nonitem %group ~] 'the-phantom-tollbooth'] 'esotericism whooooooooa']
      [[~bollug-worlus [%nonitem %group ~] 'urbit-index'] 'indexxxxing urbit']
  ==
:portal-manager &portal-action :-  %edit  :+  [our [%list %list ~] '~2000.1.1']
:*
'Portal's Guide to Getting Started on Urbit'
'testa'
'testb'
*tags:data
*properties:data
*pictures:data
''
''
==
:-  %list-list
:~  [[our [%list %app ~] '~2000.1.1'] 'These are the apps I recommend']
    [[our [%list %enditem %other ~] '~2000.1.1'] 'These are miscellaneous items I recommend']
    [[our [%list %nonitem %group ~] '~2000.1.1'] 'These are groups I recommend']
    [[our [%list %nonitem %ship ~] '~2000.1.1'] 'These are ships I recommend']  ==

:portal-manager &portal-action :-  %edit  :+  [our [%list %app ~] '~2000.1.1']
:*
'Social Apps'
''
'Connect and chat with your friends in the Urbitverse'
*tags:data
*properties:data
*pictures:data
''
''
==
:-  %list-app
:~  [[~nodmyn-dosrux [%nonitem %app ~] 'radio'] 'dope app']
    [[~paldev [%nonitem %app ~] 'pals'] 'add friends on urbit']
    [[~paldev [%nonitem %app ~] 'pals'] 'dope app']
    [[~paldev [%nonitem %app ~] 'rumors'] 'dope app']
    [[~nodmyn-dosrux [%nonitem %app ~] 'radio'] 'dope app']
    [[~dister-dister-datryn-ribdun [%nonitem %app ~] 'campfire'] 'dope app']
    [[~dister-nocsyx-lassul [%nonitem %app ~] 'sphinx'] 'dope app']
    [[~sitden-sonnet [%nonitem %app ~] 'channel'] 'dope app']
    [[~dister-dister-sidnym-ladrut [%nonitem %app ~] 'quorum'] 'dope app']
    [[~dister-dozzod-sortug [%nonitem %app ~] 'trill'] 'dope app']
    [[~paldev [%nonitem %app ~] 'scooore'] 'dope app']
==

:portal-manager &portal-action :-  %edit  :+  [our [%list %nonitem %ship ~] '~2000.1.1']
:*
'Other Curators'
''
'Discover more collections like our own'
*tags:data
*properties:data
*pictures:data
''
''
==
:-  %list-nonitem-ship
:~  [[~toptyr-bilder [%nonitem %ship ~] ''] 'portal dude']
    [[~winpex-widtev-foddur-hodler [%nonitem %ship ~] ''] 'spaceman']
    [[~doplyr-harbur [%nonitem %ship ~] ''] 'another portal dude']
    [[~dilryd-mopreg [%nonitem %ship ~] ''] '3rd portal dude']
    [[~foddur-hodler [%nonitem %ship ~] ''] 'portal dudes never stop']
==

:portal-manager &portal-action :-  %edit  :+  [our [%list %nonitem %group ~] '~2000.1.1']
:*
'Technology Groups'
''
'Communities focused on tech, crypto and more'
*tags:data
*properties:data
*pictures:data
''
''
==
:-  %list-nonitem-group
:~  [[~matwet [%nonitem %group ~] 'networked-subject'] 'Love!']
    [[~sonwet [%nonitem %group ~] 'the-cryptocurrency-forum'] 'Love!']
    [[~litmus-ritten [%nonitem %group ~] 'iwtf'] 'Love!']
    [[~tirrel [%nonitem %group ~] 'the-marketplace'] 'Love!']
    [[~litmus-ritten [%nonitem %group ~] 'sis'] 'Love!']
    [[~dalten [%nonitem %group ~] 'dalten-collective-public'] 'Love!']
==

# subscribe to a ship

:portal-manager|sub [~winpex-widtev-foddur-hodler [%list %list ~] '~2000.1.1']

;; portal curator subtitle: There's a lot to discover on Urbit. Portal has assembled an array of communities, games, and content to jump start your Urbit experience.
;;  need to create new list
;; :portal-manager &portal-action :-  %edit  :+  [our [%list %app ~] '~2000.1.1']
;; :*
;; 'Tools'
;; ''
;; 'Build and work on the network'
;; *tags:data
;; *properties:data
;; *pictures:data
;; ''
;; ''
;; ==
;; :-  %list-app
;; :~  [[~maptyl-lapsyl [%nonitem %app ~] 'uniswap'] 'dope app']
;;     [[~dister-dozzod-dalten [%nonitem %app ~] 'keep'] 'dope app']
;;     [[~mister-master-tiller-tolbus [%nonitem %app ~] 'membrane'] 'dope app']
;;     [[~hanrut-sillet-dachus-tiprel [%nonitem %app ~] 'blog'] 'dope app']
;;     [[~tirrel [%nonitem %app ~] 'studio'] 'dope app']
;;     [[~pocwet [%nonitem %app ~] 'docs'] 'dope app']
;;     [[~dister-dozzod-bacdun [%nonitem %app ~] 'zig'] 'dope app']
;;     [[~dister-norsyr-torryn [%nonitem %app ~] 'canvas'] 'dope app']
;; ==

;; need to create new list
;; :portal-manager &portal-action :-  %edit  :+  [our [%list %nonitem %group ~] '~2000.1.1']
;; :*
;; 'Community / Support Groups'
;; ''
;; 'Communities for getting tech support and finding your way around Urbit'
;; *tags:data
;; *properties:data
;; *pictures:data
;; ''
;; ''
;; ==
;; :-  %list-nonitem-group
;; :~  [[~doplyr-harbur [%nonitem %group ~] 'hacker-house'] 'Love!']
;;     [[~bitbet-bolbel [%nonitem %group ~] 'urbit-community'] 'Love!']
;;     [[~halbex-palheb [%nonitem %group ~] 'uf-public'] 'Love!']
;;     [[~nibset-napwyn [%nonitem %group ~] 'tlon'] 'Love!']
;;     [[~rondev [%nonitem %group ~] 'group-discovery'] 'Love!']
;;     [[~hocwyn-tipwex [%nonitem %group ~] 'uqbar-event-horizon'] 'Love!']
;;     [[~middev [%nonitem %group ~] 'the-forge'] 'Love!']
;;     [[~hiddev-dannut [%nonitem %group ~] 'new-hooniverse'] 'Love!']
;;     [[~hocwyn-tipwex [%nonitem %group ~] 'uqbar-event-horizon'] 'Uqbar FTW!']
;;     [[~rondev [%nonitem %group ~] 'group-discovery'] 'Discover groups ayaya']
;;     [[~poldec-tonteg [%nonitem %group ~] 'the-phantom-tollbooth'] 'esotericism whooooooooa']
;;     [[~bollug-worlus [%nonitem %group ~] 'urbit-index'] 'indexxxxing urbit']
;; ==

;; need to create new list
;; :portal-manager &portal-action :-  %edit  :+  [our [%list %nonitem %group ~] '~2000.1.1']
;; :*
;; 'Lifestyle Groups'
;; ''
;; 'Communities for play'
;; *tags:data
;; *properties:data
;; *pictures:data
;; ''
;; ''
;; ==
;; :-  %list-nonitem-group
;; :~ [[~nibset-napwyn [%nonitem %group ~] 'remote-life'] 'Love!']
;; [[~tichus-holnet [%nonitem %group ~] 'urblon'] 'Love!']
;; [[~dister-dozzod-niblyx-malnus [%nonitem %group ~] 'towards-a-timeless-way-of-building'] 'Love!']
;; [[~rabsef-bicrym [%nonitem %group ~] 'hollow-mars-theory'] 'Love!']
;; [[~natnex-ronret [%nonitem %group ~] 'door-link'] 'Love!']
;; [[~somlus-savlev [%nonitem %group ~] 'urbart'] 'Love!']
;; [[~fabled-faster [%nonitem %group ~] 'new-york'] 'Love!']
;; [[~rondev [%nonitem %group ~] 'minecraft'] 'Love!']
;; ==

;; need to add new list
;; :portal-manager|overwrite-list :-
;; [our [%list %app ~] '~2000.1.1']
;; :~  [[~bacrys [%nonitem %app ~] 'pokur'] 'another dope app']
;; [[~finmep-lanteb [%nonitem %app ~] 'chess'] 'another dope app']
;; [[~dister-dozzod-dalten [%nonitem %app ~] 'wrdu'] 'another dope app']
;; [[~disreb-winner-mittec [%nonitem %app ~] 'urbit-go'] 'another dope app']
;; [[~dister-hanfel-dovned [%nonitem %app ~] 'slam'] 'another dope app']
;; [[~bacwyl-samweg [%nonitem %app ~] 'templeochess'] 'another dope app']
;; ==

;; title=@t
;; link=@t
;; description=@t
;; =tags
;; =properties
;; =pictures
;; image=@t
;; color=@t


// const { ship, type } = ({ keyObj }) => ({
//   ship: keyObj.ship,
//   type: keyObj.type.slice().split("/")
// })(res);

// :portal-manager|del [~winpex-widtev-foddur-hodler [%list %list ~] '~2000.1.1']

// hey dude quick q on pongo - whats the base route for the app /webview? If I I open another tab to grid using the usual URL scheme would that work? or if new tab wouldnt work can I overwrite the location?

NOTE:  you get the format, please add groups/ships/apps into these commands as you please

JURIJ'S STUFF
DONT TOUCH OR YOU WILL GET SMESHED

ERROR TESTING COMMANDS
:portal-manager|overwrite-list [[our [%list %enditem %app ~] '~2000.1.1'] ~[[[~nec [%enditem %app ~] '~2000.1.1'] '']]]
:portal-manager|edit [[our [%enditem %other ~] '~2023.2.14..01.00.02..682e'] feraligatr [%enditem-other ~]]

SCRY examples from dojo
=data -build-file /=portal=/sur/portal/data/hoon
=lib -build-file /=portal=/lib/portal/hoon

.^(?(~ item:data) %gx /=portal-store=/item/~zod/list/enditem/other/~2000.1.1/noun)
.^(key-set:data %gx /=portal-store=/all/keys/portal-key-set)
.^(nested-all-items:conv:lib %gx /=portal-store=/all/nested/portal-nested-all-items)
.^(all-items:conv:lib %gx /=portal-store=/all/items/portal-all-items)
.^(result:data %gx /=portal-store=/valid/latest/~zod/list/list/~2000.1.1/portal-result)
.^(? %gx /=portal-store=/item/exists/~zod/list/enditem/other/~2000.1.1/noun)

______
:portal-manager|overwrite-list [[our [%list %enditem %other ~] '~2000.1.1'] ~[[[~master-dilryd-mopreg [%enditem %other ~] '~2023.2.17..15.08.26..d1dd'] 'I RECOMMEND THIS THING'] [[~dister-dozzod-dilryd-mopreg [%enditem %other ~] '~2023.2.17..15.13.08..f4e3'] 'I RECOMMEND THIS THING TOO']]]
:portal-manager|overwrite-list [[our [%list %nonitem %group ~] '~2000.1.1'] ~[[[~dilryd-mopreg /nonitem/group 'europa'] 'I RECOMMEND THIS THING'] [[~bitbet-bolbel /nonitem/group 'urbit-community'] 'I RECOMMEND THIS THING TOO']]]
.^(item:data %gx /=portal-store=/item/~master-dilryd-mopreg/enditem/app/~2023.2.17..14.13.32..f64a/portal-item)

TODO
- %portal-manager DONE %portal-store DONE portal-lib portal-sur portal-json-lib
- vertical redesign (errors better earlier on %portal-manager). (make it redundant)
- default title: 'Untitled' (maybe type specific? 'Untitled Group'?)
- horizontal redesign?
- what happens with delete and validity store??? no worries?
- general code cleanup
- different seed data?
- update from store to manager
  ->  maybe there should be more metadata except just the item itself?


ASSERTIONS/SPECIFIC TYPES
- how to add a default/bunt value in the data type? (we should add it for color, see where else. where for bespoke?)




TODO LATER
 - purges on a daily/weekly basis or sth
 - TODO printove popravit u portal storeu/manageru i u libu da da kazu title a ne samo pointer
   tj da budu i na vise mjesta di trebaju bit (pomoc ce za debugging kad ljudi krenu koristit)
 - make cards from portal.hoon, and almost dont use any from portal-manager/portal-store explicitly
   or is that less clear? or more clear?
- validation is only for apps

SCRYS/SUBS
- vidjet dii ih sve zovem i vidjet kad crashaju. handleat crashove bolje? jel se mogu handleat?
( to ukljucuje sve !! i sve ?> i ?<)

ERROR HANDLING?
 - what happens if scries fail? (look where they are all used)
 - make sre you dont !!, but return sth like ~
 - find all !!, and make it not crash but handle it

_____

::  is it worth using path format of the pointer everywhere instead of the cell?

::but it'd be useful to get all the ships someone follows, and from there, get all the items from those ships

::  FAQ za data types

::  TODO  annotate code everywhere with comments

::  should bespoke-read only read bespoke-data?
::  or should it be able to interpret the whole item based on its type?
::  whole item is better
::++  bespoke-read
::  |=  [=item]
::  ^-  what should it output???
::

::  how to separate type layer
::  SECURITY  ??

::  - a default peer which we monitor to see the growth of the size and number items, and if we should do sth

::  POINTER parsing rules:
::
::    if =(points-to-item %.n)
::  %app  ->  (weld (weld (scow %p ship) "/") (trip title))  ->  ~zod/app-name
::  %group  ->  (weld (weld (scow %p ship) "/") (trip title))  ->  ~zod/group-name
::  %ship  ->  ship  ->  ~zodž
::  depending on type, q has different meaning
::
::    if =(points-to-item %.y)
::  you can find any item in the global portal namespace with the pointer
::  (assuming right permissions)
::  q means time created-at
::
::
::  ITEM parsing rules:
::
::    if =(type %app)
::  link  ->  distributor desk
::  pictures  ->  screenshots
::  reviews  ->  hash should be compared to hash.docket.bespoke-data
::  name  ->  should be same as in desk


::  (is necessary?)curator can only add apps with valid sigs to app list (whether its %curator-page or %list)?
::  curator can only put apps which are properly validated into another list? (or that doesnt matter and it should be validated locally by any person)

::  item versioning?

::  auto item update (dev-server subbed to dst-server)??


Whatever you add is auto added to your collection (cur=dev)?

how to follow a curator? (e.g. you can find their default %curated easily just by their @p because you know it's '~2000.1.1'

version control such that curator recommends a specific version of it
curator should unrecommend something if it updates?

Curator subs to dev's cur page (change name), receives a list of his items from which he can choose what he puts on his on cur page

extra command for practicality: add pointer to list-of-pointers when you want (so it's like edit item, but specific to the item type)
- in different situations, e.g. auto add a pointer, for all received data for example

specificna mapa/lista itema koji su prikazani? (ako zelis neki hopping algo u buducnosti mozemo)

eventually we want to add "price" property to items.

# Enforce capitalization for title on dev app creation

# Provide clearer, persistent instruction for uploading icon from docket, other post-upload instructions

# Fix isSafe icon on review page

# Fix button overlap on curator add app page

# Can make add app clearer for curator
