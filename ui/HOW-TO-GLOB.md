1. build the dist folder pnpm build-prod
2. add the dist folder to /your-urbit/portal/app/
3. `|commit %portal`
4. If you have any "missing mark files" grab them from the urbit git repo and put them in the /your-urbit/trove/app/mar folder
5. -garden!make-glob %desk /path/to/dist (e.g. -garden!make-glob %portal /app/dist)
6. find glob in /your-pier/.urb/put, store on cloud
7. update desk.docket-0 file glob-http url and hash as below
