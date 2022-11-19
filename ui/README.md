# App Store UI

## Development

### Fake ship

If you want to contribute on the development, you will need to have installed app-store in your urbit development ship. If you don't have it, please go to **README.md from the app-store** folder.

Boot your fake ship. Make sure that your ship is running on localhost:8080. Otherswise, go to `.env.local` and change `VITE_SHIP_URL` to the actual running port.

Communications between backend and front end are not allowed by default because of the fake's ship CORS policy. We need to allow the port 3000 to be able to receive requests from the react application.

```hoon
:: INSIDE YOUR FAKE SHIP

:: Check which urls the ship has approved
> +cors-registry

:: Add localhost:3000 to the list of allowed urls
> |cors-approve 'http://localhost:3000'
```

### React Front End

Inside **/ui** folder run the following command.

```shell
npm run build
```

This will generate our react application compiled in a **/dist** folder. Now, we need to upload it to the fake ship. You will need to go `localhost:your_fake_ship_port/docket/upload`. There, you will need to select the desk where you want to upload the front end and upload the **/dist** folder created before.

Inside **/ui** start the react application.

```sh
npm run dev
```

The application will be accessible on `localhost:3000/apps/app-store`.
