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

#### %put (for Developers)

Used by Developers, to add or replace all apps they are publishing. As of now, they have to manually input the whole dev-page (a definition can be found in app-store/sur/app-store/data.hoon, and an example can be found in app-store/sample-dev-page).

Let ~dev put up a dev-page. For example, on %dev-server on ~dev you can run:

`:dev-server|put [~ [~dev ~]]`

Or:

`:dev-server|put [~ [dev-name=~dev app-pages=(malt (limo ~[app1+['desc1']]))]]`

We can check the state of the agent with:

`:dev-server +dbug`

#### %sub and %unsub (for Curators and Users)

Let ~ter subscribe to ~dev. On ~ter, run:

`:cur-server|sub ~dev`

Now the state of %cur-server on ~ter will contain the data that ~dev has put up:

`:cur-server +dbug`

Analogously, from %usr-server on ~ser we can subscribe to %cur-server on ~ter.

`:usr-server|sub ~ter`

To unsubscribe User from Curator we can use:

`:usr-server|unsub ~ter` 

and Curator from Developer we can use:

`:cur-server|unsub ~dev`

After unsubscribing, previous data from the publisher is deleted.
