## The Proper Way

1. build the dist folder pnpm build-prod
2. add the dist folder to /your-urbit/portal/app/
3. `|commit %portal`
4. If you have any "missing mark files" grab them from the urbit git repo and put them in the /your-urbit/trove/app/mar folder
5. -garden!make-glob %desk /path/to/dist (e.g. -garden!make-glob %portal /app/dist)
6. find glob in /your-pier/.urb/put, store on cloud
7. update desk.docket-0 file glob-http url and hash as below

## The Quick 'n' Dirty Way

1. build the dist folder pnpm build-prod
2. Login to https://worpet-bildet.arvo.network/
3. Navigate to https://worpet-bildet.arvo.network/docket/upload
4. Select portal from the dropdown
5. Select the `dist` folder that was just created by `pnpm build-prod` on your local machine
6. Click glob button
7. Wait for the page to refresh (takes literally a minute or more sometimes)
8. Wait another minute or two for Urbit to be Urbit
9. Check that your changes have been deployed by navigating to the app
