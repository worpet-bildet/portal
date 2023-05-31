# Portal

### A tool for decentralized curation and discovery of Urbit applications

For details see:
https://github.com/urbit/urbit.org/blob/master/content/grants/app-store.md

For discussion, visit on Urbit:
~dilryd-mopreg/app-store

## Setup

## UI Prereqs

- Node JS- [https://nodejs.org/en/download/](https://nodejs.org/en/download/). install with `sudo apt install nodejs`

- This project uses [pnpm](https://github.com/pnpm/pnpm) for package management, but any of these will work for node version management. install it with `wget -qO- https://get.pnpm.io/install.sh | ENV="~/.bashrc" SHELL="$(which bash)" bash -`

To install n with npm:

  ```
  sudo apt install npm
  npm install -g n
  ```

- Select node version `16.14.0` with `pnpm env use --global 16.14.0`. You can check which version you're on with `node -v`

## UI Usage

```
cd ui
```

Install deps:

```
pnpm install
```

Build app:

```
pnpm build
```

Run local app dev server:

```
pnpm dev
```


## Desk Setup

App Store is not yet published on Urbit, but it is easy to boot a fake ship and play with it.

install urbit

`curl -L https://urbit.org/install/linux-x86_64/latest | tar xzk --transform='s/.*/urbit/g' && ./urbit`

boot a comet

`./urbit -c mycomet`

when you finish booting, the stdout should tell you the port where the ship is hosted, e.g. "web interface http://localhost:8081". define SHIP_URL in vite.config.js with this value

Run:

```
|mount %base
|merge %portal our %base
|mount %portal
```

Download the zip file from github, and extract it to your fake ship. Delete the app-store desk, and rename the downloaded folder into "app-store". Then:

```
|commit %portal
|install our %portal
```

on nuke

```
|nuke %portal, =desk &
|rein %portal [& %portal-manager]
```

> To seed %portal data, see commands in /portal/notes

## How to Glob

### The Proper Way

1. build the dist folder pnpm build-prod
2. add the dist folder to /your-urbit/portal/app/
3. `|commit %portal`
4. If you have any "missing mark files" grab them from the urbit git repo and put them in the /your-urbit/trove/app/mar folder
5. -garden!make-glob %desk /path/to/dist (e.g. -garden!make-glob %portal /app/dist)
6. find glob in /your-pier/.urb/put, store on cloud
7. update desk.docket-0 file glob-http url and hash as below

### The Quick 'n' Dirty Way

1. build the dist folder `npm run build`
2. Login to https://worpet-bildet.arvo.network/
3. Navigate to https://worpet-bildet.arvo.network/docket/upload
4. Select portal from the dropdown
5. Select the `dist` folder that was just created by `npm run build` on your local machine
6. Click glob button
7. Wait for the page to refresh (takes literally a minute or more sometimes)
8. Wait another minute or two for Urbit to be Urbit
9. Check that your changes have been deployed by navigating to the app

## Instructions below are OOD

Now %app-store has been installed on one fake ship. To see more clearly how it works, you can install it on multiple ships and assume different roles (Distributor, Developer, Curator, User) for each ship.

### How it works

There are 4 agents: %dst-server, %dev-server, %cur-server and %usr-server. %usr-server can subscribe to multiple %cur-servers, and %cur-server can subscribe to multiple %dev-servers. %dev-server receives data from %dst-server who is the app distributor.

%dst-server hosts the app for download, %dev-server publishes app pages (one for each of his apps), and %cur-server receives and stores them in cur-data. Then the Curator can choose a subset of those he wants to present, in cur-choice. %cur-server publishes cur-choice, and %usr-server receives and stores them in usr-data.

### How to use

There is a few actions that can be used to test the application. They have been made into generators.

We can set up 4 fake ships: ~des for Distributor, ~dev for Developer, ~ter for Curator and ~ser for User.

#### %add, %edit, %del (for Developers)

Used by Developers, to add, edit, or delete an app page.

In dojo, do the following:

```
=data -build-file /=app-store=/sur/app-store/data/hoon
```

```
=app1 :*
    description='some description 3'
    keywords=`(list keyword:data)`~[%keyword1 %keyword2]
    screenshots=`(list screenshot:data)`~['screen1' 'screen2']
    desk-hash=*@uv
    dst-desk='~dev/app1'
    signature=[*@ux ~dev 0]
    visitor-data=[`(map @p rating:data)`(malt (limo ~[[~zod 1] [~dilryd-mopreg 4]])) `((mop @da comment:data) lth)`*((mop @da comment:data) lth) `(map @p review:data)`*(map @p review:data)]
    docket=*docket:data
==
```

Now you have a sample app-page defined in dojo, so you don't have to manually insert it every time. You can also find it in app-store/sample-actions.

`[%add =app-name =app-page]` will create a new app, `[%edit =app-name =app-page]` will overwrite the existing app-page with a new one, and `[%del =app-name]` will delete an existing app-page.

```
:dev-server|add %app1 app1
:dev-server|edit %app1 app1
:dev-server|del %app1
```

You can check the state of the agent after each poke with:

```
:dev-server +dbug
```

#### %sign and %send-data (for Distributors)

The Developer is required to receive a signature from the Distributor, verifying that the Developer is allowed to share the app. The exception to this rule is when the Distributor is a moon of the Developer (or vice versa) or when they are the same ship.

If the Developer has not received proper permission, the Curator will reject the data sent to him via `dev-update`.

In order to demonstrate this, we need the Developer to add an app hosted by the Distributor. So let's take `%app-store` since it is already installed.

First, ~dev needs to create and `app-page` called `%app-store`, with `dst-desk` being '~des/app-store'.

```
=app-store :*
    description='some description 3'
    keywords=`(list keyword:data)`~[%keyword1 %keyword2]
    screenshots=`(list screenshot:data)`~['screen1' 'screen2']
    desk-hash=*@uv
    dst-desk='~des/app-store'
    signature=[*@ux ~dev 0]
    visitor-data=[`(map @p rating:data)`(malt (limo ~[[~zod 1] [~dilryd-mopreg 4]])) `((mop @da comment:data) lth)`*((mop @da comment:data) lth) `(map @p review:data)`*(map @p review:data)]
    docket=*docket:data
==
```

`:dev-server|add %app-store app-store`

Then, ~des needs to add a valid desk.docket-0 file to the `%app-store` desk and a desk.ship file containing `~des`. For the desk.docket-0 file, the important part is that `glob-ames` has `~des` at the head of the cell, like so:

```
:~  title+'App Store'
    info+'Decentralized App Store on Urbit.'
    color+0x81.88c9
    image+'https://media.urbit.org/guides/additional/dist/wut.svg'
    base+'blabla'
    glob-ames+[~des 0v0]
    version+[0 0 1]
    website+'https://developers.urbit.org/guides/additional/dist/guide'
    license+'MIT'
==
```

Then, from ~des we can send the docket data and desk hash to ~dev, so he can display it on the app-page.

```
:dst-server|send-data [~dev %app-store]
```

Further, ~des also needs to send ~dev a signature, so that Curators can accept ~dev's app-page.

```
:dst-server|sign [~dev %app-store]
```

If, for example, the Distributor was ~doznec-dozzod-dozdev (a moon of ~dev), a signature would not be required.

#### %sub and %unsub (for Curators and Users)

Let ~ter subscribe to ~dev. On ~ter, run: `:cur-server|sub ~dev`

Now the state of %cur-server on ~ter will contain the data that ~dev has put up: `:cur-server +dbug`

Analogously, from %usr-server on ~ser we can subscribe to %cur-server on ~ter. `:usr-server|sub ~ter`

To unsubscribe User from Curator we can use: `:usr-server|unsub ~ter`

and Curator from Developer we can use: `:cur-server|unsub ~dev`

After unsubscribing, previous data from the publisher is deleted.

#### %cur-info, %cats, %select (for Curators)

`[%cur-info =cur-info]` is used by Curators to insert cur-title, cur-image and cur-intro - i.e. the information which will be displayed on the Curator Page.

```
:cur-server|cur-info 'Some Title' 'some-image-link' 'Some intro.'
```

`[%cats =cat-set]` is used by Curators to create a set of categories which will be used to categorize the apps which the Curator displays.

```
:cur-server|cats `cat-set:data`(silt `(list category:data)`~[%cat1 %cat2 %cat3])
```

`[%select =key-list =cat-map]` is used by Curators to select which apps (and in which order and category) are they going to display. `key-list` defines the order in which the apps are displayed, while `cat-map` is a `(map key category)` connecting each app with a corresponding category. Cat-map can only have apps which are in `cur-map` (i.e. came by subscription from a Developer) and categories which were previously defined in `cat-set`.

```
:cur-server|select `key-list:data`~[[~dev %app1] [~dev %app-store]] `cat-map:data`(malt (limo ~[[[~dev %app1] %cat1] [[~dev %app-store] %cat2]]))
```

#### %rate, %unrate, %add-com, %del-com, %add-rev, %del-rev (for Users)

`[%rate =key =rating]` is used by Users to rate an app.

```
:usr-server|rate [~dev %app1] 4
```

`[%unrate =key]` is used by Users to remove their previous rating from an app.

```
:usr-server|unrate [~dev %app1]
```

`[%add-com =key text=@t]` is used by Users to add a comment on an app.

```
:usr-server|add-com [~dev %app1] 'Great app!'
```

`[%del-com =key =time]` is used by Users to delete their previous comment from an app. Comments are identified by the time when they were made, so the User must input time to delete a desired comment. The time of a comment can be found in the data from `:usr-server +dbug`.

```
:usr-server [~dev %app1] ~2022.10.21..16.36.24..21a6
```

`[%add-rev =key text=@t hash=@uv is-safe=?]` is used to add a review of an app (it also overwrites a previous one). There can only be one review per User. Other than the main text, the review must contain the hash of the exact version of the app which is being reviewed, which is then automatically compared to the hash inserted in the app-page, to determine whether the review is current or not. Also, the reviewer should vet whether the app is safe or not (`is-safe`) with a `%.y` or `%.n`.

```
:usr-server [~dev %app1] 'This app contains malware!' 0v1df64.49beg %.n
```

`[%del-rev =key]` is used by Users to delete their previous review.

```
:usr-server [~dev %app1]
```

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
