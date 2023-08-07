# Portal

### A tool for decentralized curation and discovery of Urbit applications

For details see:
https://github.com/urbit/urbit.org/blob/master/content/grants/app-store.md

For discussion, visit on Urbit:
~hadzod-toptyr-bilder/portal

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
