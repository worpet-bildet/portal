# App Store

### A tool for decentralized curation and discovery of Urbit applications

For details see:
https://github.com/urbit/urbit.org/blob/master/content/grants/app-store.md

For discussion visit on Urbit:
~dilryd-mopreg/app-store

### How to install
App Store is not yet published on Urbit, but it is easy to boot a fake ship and play with it.

Boot a fake ship. Run:
```
|mount %base
|merge %app-store our %base
|mount %app-store
```
Download the zip file from github, and extract it to your fake ship. Delete the app-store desk, and rename the downloaded folder into "app-store". Then:
```
|commit %app-store
|install our %app-store
```
Now %app-store has been installed on one fake ship. To see more clearly how it works, you can install it on multiple ships and assume different roles (Developer, Curator, User) for each ship

### How it works

There are 3 agents: %dev-server, %cur-server and %usr-server. %usr-server can subscribe to multiple %cur-servers, and %cur-server can subscribe to multiple %dev-servers.

%dev-server publishes app pages (one for each of his apps), and %cur-server receives and stores them in cur-data. Then the Curator can choose a subset of those he wants to present, in cur-choice. %cur-server publishes cur-choice, and %usr-server receives and stores them in usr-data. 

### How to use

There is a few actions that can be used to test the application. They have been made into generators.

We can set up 3 fake ships: ~dev for Developer, ~ter for Curator and ~ser for User.

#### %add, %edit, %del (for Developers)

Used by Developers, to add, edit, or delete an app page.

In dojo, do the following:

```
=data -build-file /=app-store=/sur/app-store/data/hoon
```
```
=app :*
    description='some description 3'
    keywords=`(list keyword:data)`~[%keyword1 %keyword2]         
    screenshots=`(list screenshot:data)`~['screen1' 'screen2']    
    visitor-data=[`(map @p rating:data)`(malt (limo ~[[~zod 1] [~dilryd-mopreg 4]])) `((mop @da comment:data) lth)`*((mop @da comment:data) lth) `(map @p review:data)`*(map @p review:data)]
    auxiliary-data=[desk-hash=0v1df64.49beg installed-into=%app-store developer-desk='~dister-dozzod-dilryd-mopreg/app-store' last-update=~2022.2.2 release-date=~2023.1.1 size-mb=.17.2]
    docket-data=[title='App Store' info='A tool for decentralized curation and discovery of Urbit apps' color=0x1231 version=[0 0 1] website='https://github.com/dilryd-mopreg/app-store' license='MIT' base=%app-store image='some-link']
== 
```
Now you have a sample app-page defined in dojo, so you don't have to manually insert it every time. You can also find it in app-store/sample-actions.

%add will create a new app, %edit will overwrite the existing app-page with a new one, and %del will delete an existing app-page.
```
:dev-server|add %app1 app
:dev-server|edit %app1 app
:dev-server|del %app1
```
You can check the state of the agent after each poke with:

```
:dev-server +dbug
```

#### %sub and %unsub (for Curators and Users)

Let ~ter subscribe to ~dev. On ~ter, run: `:cur-server|sub ~dev`

Now the state of %cur-server on ~ter will contain the data that ~dev has put up: `:cur-server +dbug`

Analogously, from %usr-server on ~ser we can subscribe to %cur-server on ~ter. `:usr-server|sub ~ter`

To unsubscribe User from Curator we can use: `:usr-server|unsub ~ter` 

and Curator from Developer we can use: `:cur-server|unsub ~dev`

After unsubscribing, previous data from the publisher is deleted.

### Scries

There is 3 scries that have been built for %usr-server. All have care `x`.

- %all - returns all usr-data
	- path: `/all/[ship]`
	- mark: `usr-data`
	
- %is-cur - checks if Curator is in usr-data
	- path: `/is-cur/[ship]`
	- mark: `noun`
	
- %get-cur - returns cur-data; if Curator doesn't exist, returns ~
	- path: `/get-cur/[ship]`
	- mark: `cur-data`

Example, how to use:

```
=data -build-file /=app-store=/sur/app-store/data/hoon
.^(usr-data:data %gx /=usr-server=/all/usr-data)
.^(? %gx /=usr-server=/is-cur/~ter/noun)
.^(cur-data:data %gx /=usr-server=/get-cur/~ter/cur-data)
```

