## Overview
As we all know, the Eurovision Song Contest is the greatest contest of all time, where the most talented act *always* wins. 
This is a small, Angular-based tool to allow myself and my mates vote for our favorites acts in this year's ESC.

## Technologies Used
* [Angular](https://angular.io/)
* [Angular Material](https://material.angular.io/)
* [Firebase](https://firebase.google.com/)
* [firebaseui-web](https://github.com/firebase/firebaseui-web)

## Why is it interesting?
Although the app is intended mainly as a gimmick, its limited scope helps it to serve as a simple example for a number of common Angular+Firebase use-cases, without the distraction of complex app domain details. Some of these are:

* How to use Firebase Firestore for simple CRUD operations (see [db.service.ts](./src/app/services/db.service.ts)).
* How to use Firebase authentication (see [login component](./src/app/components/login/login.component.ts) and [user.service.ts](./src/app/services/user.service.ts)).
* How to use firebaseui-web in an Angular app (see [login component](./src/app/components/login/login.component.ts)).
* How to guard certain app routes against access from unauthorized users (see the [auth guard](./src/app/guards/auth.guard.ts)).
* How to access and populate a firestore database from a node script (see [populate-countries-db script](./scripts/populate-countries-db/index.js))
* How to deploy a production version of your app with a non-default `baseHref`. I.e. deploy to `<your base domain>/eurovoter`. 

## Set Up and Run
This app uses firebase as its backend. Therefore, if you wish to run your own deployment of this app, you'll have to set up your own firebase backend.
To run the app, you will need to take the following steps:

1. Set up your own firebase project. You will need to log into your [firebase console](https://firebase.google.com) and create a new (web-)project. The project will require the following features:
   - Firestore (use rules from [firestore.rules](./firestore.rules))
   - Storage (use rules from [firestore.rules](./firestore.rules))
   - Authentication (with Email and Google providers enabled)

2. Go to the project settings for your new web project and copy the project's config file, which should looks something like:
```js
const firebaseConfig = {
  apiKey: "<your api key>",
  authDomain: "<your project>.firebaseapp.com",
  projectId: "<your project>",
  ...
};
```
More information on the firebase setup and configuration process can be found in the [firebase docs](https://firebase.google.com/docs/web/setup?authuser=0&hl=en#add-sdks-initialize).

3. Create the following file:
```sh
./src/environments/firebase.config.ts
```
and edit it to export an object containing the configuration from step 2. That is, the contents of `firebase.config.ts` should look something like: 
   ```js
   export const firebase = {
      apiKey: "<your api key>",
      authDomain: "<your project>.firebaseapp.com",
      projectId: "<your project>",
      ...
   }
   ```

4. To populate the firestore database with eurovision competitors, in the firebase console:
   * go to project settings
   * create a service account
   * download (and rename) the private key JSON to `scripts/populate-countries-db/firebase-private-key.json`.
   * run the node script [`scripts/populate-countries-db/index.js`](./scripts/populate-countries-db/index.js) (don't forget to run `npm i` first).

5. Run a local version of the eurovoter with:
```sh
npm install && npm start-prod
```
Open your browser to `localhost:4200` to see the eurovoter app in all its glory!

**Note** `npm start` will start the app in dev mode, which will use emulators as backend, rather than your production firebase backend. For more info on setting up emulators, see the next section.

### Using the firebase emulators
It is highly recommended to develop locally using the firestore emulator, rather than your production backend. See the [firebase emulator docs](https://firebase.google.com/docs/emulator-suite?hl=en) for instructions on setting up the emulator. When your local emulator is ready, you can start all necessary emulator backends for the eurovoter app with: 
```sh
   npm run start-emulator
```