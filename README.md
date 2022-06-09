# SDFinalProject
Final Project for Software Development Top-up

Nodejs version: v16.15.0.
Npm version: 8.10.0

## Installation Guide
1. clone the repository
2. install the packages with `npm i`
3. set up the `.env` file according to the guidelines provided on `.env.template` file

Note that for this project, some of the credentials in the `.env` file include the followings:
- credentials for gmail accont, which needs to be set up for less secure apps
- secret keys for Stripe account
- mongo atlas database connection URI

4. run boardgame, boardgameItem seeds by running `npm run {seeds}`
5. run Stripe webhook to catch responses from Stripe with `npm run webhook`
6. run `node app.js`

OR just go to www.cohop.games