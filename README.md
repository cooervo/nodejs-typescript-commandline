// todo manual test (before being born, hasn't started date, same year, 5 years in future, special policy)
// todo unit test
// todo clean readme
// todo build script && instructions

# TypeScript Node

[![Dependency Status](https://david-dm.org/Microsoft/TypeScript-Node-Starter.svg)](https://david-dm.org/Microsoft/TypeScript-Node-Starter) [![Build Status](https://travis-ci.org/Microsoft/TypeScript-Node-Starter.svg?branch=master)](https://travis-ci.org/Microsoft/TypeScript-Node-Starter) 

**Live Demo**: [https://typescript-node-starter.azurewebsites.net/](https://typescript-node-starter.azurewebsites.net/)

![image](https://user-images.githubusercontent.com/820883/36764267-abbdb7f8-1be0-11e8-9678-2a9ea448d7f8.png)

The main purpose of this repository is to show a good end-to-end project setup and workflow for writing Node code in TypeScript.
I will try to keep this as up-to-date as possible, but community contributions and recommendations for improvements are encouraged and will be most welcome. 


# Pre-reqs
To build and run this app locally you will need a few things:
- Install [Node.js](https://nodejs.org/en/)
- Install [MongoDB](https://docs.mongodb.com/manual/installation/)
- Install [VS Code](https://code.visualstudio.com/)

# Getting started
- Clone the repository
```
git clone --depth=1 https://github.com/Microsoft/TypeScript-Node-Starter.git <project_name>
```
- Install dependencies
```
cd <project_name>
npm install
```
- Configure your mongoDB server
```bash
# create the db directory
sudo mkdir -p /data/db
# give the db correct read/write permissions
sudo chmod 777 /data/db
```
- Start your mongoDB server (you'll probably want another command prompt)
```
mongod
```
- Build and run the project
```
npm run build
npm start
```
Finally, navigate to `http://localhost:3000` and you should see the template being served and rendered locally!

# Deploying the app
There are many ways to deploy an Node app, and in general, nothing about the deployment process changes because you're using TypeScript.
In this section, I'll walk you through how to deploy this app to Azure App Service using the extensions available in VS Code because I think it is the easiest and fastest way to get started, as well as the most friendly workflow from a developer's perspective.

## Pre-reqs
- [**Azure account**](https://azure.microsoft.com/en-us/free/) - If you don't have one, you can sign up for free.
The Azure free tier gives you plenty of resources to play around with including up to 10 App Service instances, which is what we will be using.
- [**VS Code**](https://code.visualstudio.com/) - We'll be using the interface provided by VS Code to quickly deploy our app.
- [**Azure App Service VS Code extension**](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azureappservice) - In VS Code, search for `Azure App Service` in the extension marketplace (5th button down on the far left menu bar), install the extension, and then reload VS Code.
- **Create a cloud database** - 
For local development, running MongoDB on localhost is fine, however once we deploy we need a database with high availability.
The easiest way to achieve this is by using a managed cloud database.
There are many different providers, but the easiest one to get started with is [MongoLab](#mlab).

### <a name="mlab"></a> Create a managed MongoDB with MongoLab
1. Navigate to [MongoLab's Website](https://mlab.com/), sign up for a free account, and then log in.
2. In the **MongoDB Deployments** section, click the **Create New** button.
3. Select any provider (I recommend **Microsoft Azure** as it provides an easier path to upgrading to globally distributed instances later).
4. Select **Sandbox** to keep it free unless you know what you're doing, and hit **Continue**.
5. Select a region (I recommend the region geographically closest to your app's users).
6. Add a name, click **Continue** again, and finally **Submit Order**.
7. Once your new database is created, select it from the **MongoDB Deployments** section.
8. Create a user by selecting the **User** tab, clicking the **Add database user** button, adding a username and password, and then clicking **Create**. 
A user account is required to connect to the database, so remember these values because you will need them as part of your connection string.
9. Copy the connection string from the top of the page, it should look like this: `mongodb://<dbuser>:<dbpassword>@ds036069.mlab.com:36069/test-asdf`
and replace `<dbUser>` and `<dbpassword>` with the credentials you just created. 
Back in your project, open your `.env` file and update `MONGODB_URI` with your new connection string.
    > NOTE! - If you don't have an `.env` file yet, rename `.env.example` to `.env` and follow the comments to update the values in that file.
10. **Success!**
You can test that it works locally by updating `MONGODB_URI_LOCAL` to the same connection string you just updated in `MONGO_URI`.
After rebuilding/serving, the app should work, but users that were previously created in local testing will not exist in the new database!
Don't forget to return the `MONGO_URI_LOCAL` to your local test database (if you so desire).

## Getting TypeScript
TypeScript itself is simple to add to any project with `npm`.
```
npm install -D typescript
```
## Project Structure
The most obvious difference in a TypeScript + Node project is the folder structure.
In a TypeScript project, it's best to have separate _source_  and _distributable_ files.
TypeScript (`.ts`) files live in your `src` folder and after compilation are output as JavaScript (`.js`) in the `dist` folder.
The `test` and `views` folders remain top level as expected. 

The full folder structure of this app is explained below:

> **Note!** Make sure you have already built the app using `npm run build`

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **dist**                 | Contains the distributable (or output) from your TypeScript build. This is the code you ship  |
| **node_modules**         | Contains all your npm dependencies                                                            |
| **src**                  | Contains your source code that will be compiled to the dist dir                               |
| **src/config**           | TODO DELETE Passport authentication strategies and login middleware. Add other complex config code here   |
| **src/controllers**      | Controllers define functions that respond to various http requests                            |
| **src/models**           | Models define Mongoose schemas that will be used in storing and retrieving data from MongoDB  |
| **src/public**           | TODO DELETE Static assets that will be used client side                                                   |
| **src/types**            | Holds .d.ts files not found on DefinitelyTyped. Covered more in this [section](#type-definition-dts-files)          |
| **src**/server.ts        | Entry point to your express app                                                               |
| **test**                 | Contains your tests. Seperate from source because there is a different build process.         |
| **views**                | Views define how your app renders on the client. In this case we're using pug                 |
| .env.example             | API keys, tokens, passwords, database URI. Clone this, but don't check it in to public repos. |
| .copyStaticAssets.ts     | Build script that copies images, fonts, and JS libs to the dist folder                        |
| jest.config.js           | Used to configure Jest                                                                        |
| package.json             | Npm dependencies                          |
| tsconfig.json            | Config settings for compiling server code written in TypeScript                               |
| tsconfig.tests.json      | Config settings for compiling tests written in TypeScript                                     |
| tslint.json              | Config settings for TSLint code style checking                                                |

```
| `compilerOptions`                  | Description         |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `"module": "commonjs"`             | The **output** module type (in your `.js` files). Node uses commonjs, so that is what we use            |
| `"esModuleInterop": true,`         | Allows usage of an alternate module import syntax: `import foo from 'foo';`                            |
| `"target": "es6"`                  | The output language level. Node supports ES6, so we can target that here                               |
| `"noImplicitAny": true`            | Enables a stricter setting which throws errors when something has a default `any` value                |
| `"moduleResolution": "node"`       | TypeScript attempts to mimic Node's module resolution strategy. Read more [here](https://www.typescriptlang.org/docs/handbook/module-resolution.html#node)                                                                    |
| `"sourceMap": true`                | We want source maps to be output along side our JavaScript. See the [debugging](#debugging) section    |
| `"outDir": "dist"`                 | Location to output `.js` files after compilation                                                        |
| `"baseUrl": "."`                   | Part of configuring module resolution. See [path mapping section](#installing-dts-files-from-definitelytyped) |
| `paths: {...}`                     | Part of configuring module resolution. See [path mapping section](#installing-dts-files-from-definitelytyped) |



The rest of the file define the TypeScript project context.
The project context is basically a set of options that determine which files are compiled when the compiler is invoked with a specific `tsconfig.json`.
In this case, we use the following to define our project context: 
```json
    "include": [
        "src/**/*"
    ]
```
`include` takes an array of glob patterns of files to include in the compilation.
This project is fairly simple and all of our .ts files are under the `src` folder.
For more complex setups, you can include an `exclude` array of glob patterns that removes specific files from the set defined with `include`.
There is also a `files` option which takes an array of individual file names which overrides both `include` and `exclude`.


### Npm scripts

| Npm Script | Description |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `start`                   | Does the same as 'npm run serve'. Can be invoked with `npm start`                                 |
| `build`                   | Full build. Runs ALL build tasks (`build-sass`, `build-ts`, `tslint`, `copy-static-assets`)       |
| `serve`                   | Runs node on `dist/server.js` which is the apps entry point                                       |
| `watch-node`              | Runs node with nodemon so the process restarts if it crashes. Used in the main watch task         |
| `watch`                   | Runs all watch tasks (TypeScript, Sass, Node). Use this if you're not touching static assets.     |
| `test`                    | Runs tests using Jest test runner                                                                 |
| `watch-test`              | Runs tests in watch mode                                                                          |
| `build-ts`                | Compiles all source `.ts` files to `.js` files in the `dist` folder                                 |
| `watch-ts`                | Same as `build-ts` but continuously watches `.ts` files and re-compiles when needed                |
| `build-sass`              | Compiles all `.scss` files to `.css` files                                                          |
| `watch-sass`              | Same as `build-sass` but continuously watches `.scss` files and re-compiles when needed            |
| `tslint`                  | Runs TSLint on project files                                                                       |
| `copy-static-assets`      | Calls script that copies JS libs, fonts, and images to dist directory                             |
| `debug`                   | Performs a full build and then serves the app in watch mode                                       |
| `serve-debug`             | Runs the app with the --inspect flag                                                               |
| `watch-debug`             | The same as `watch` but includes the --inspect flag so you can attach a debugger                   |


## Testing
Jest 

### Install the components
To add TypeScript + Jest support, first install a few npm packages:
```
npm install -D jest ts-jest
```
`jest` is the testing framework itself, and `ts-jest` is just a simple function to make running TypeScript tests a little easier.

### Running tests
Simply run `npm run test`.
Note this will also generate a coverage report.

# Dependencies
Dependencies are managed through `package.json`.
In that file you'll find two sections:
## `dependencies`

| Package                         | Description                                                           |
| ------------------------------- | --------------------------------------------------------------------- |
| async                           | Utility library that provides asynchronous control flow.               |
| bcrypt-nodejs                   | Library for hashing and salting user passwords.                       |
| bluebird                        | Promise library                                                       |
| body-parser                     | Express 4 middleware.                                                 |
| compression                     | Express 4 middleware.                                                 |
| connect-mongo                   | MongoDB session store for Express.                                    |
| dotenv                          | Loads environment variables from .env file.                            |
| errorhandler                    | Express 4 middleware.                                                 |
| express                         | Node.js web framework.                                                |
| express-flash                    | Provides flash messages for Express.                                   |
| express-session                 | Express 4 middleware.                                                 |
| express-validator               | Easy form validation for Express.                                     |
| fbgraph                         | Facebook Graph API library.                                           |
| lodash                          | General utility library.                                              |
| lusca                           | CSRF middleware.                                                      |
| mongoose                        | MongoDB ODM.                                                          |
| nodemailer                      | Node.js library for sending emails.                                   |
| passport                        | Simple and elegant authentication library for node.js                 |
| passport-facebook               | Sign-in with Facebook plugin.                                         |
| passport-local                  | Sign-in with Username and Password plugin.                            |
| pug (jade)                      | Template engine for Express.                                          |
| request                         | Simplified HTTP request library.                                       |
| request-promise                 | Promisified HTTP request library. Let's us use async/await             |
| winston                         | Logging library                                                       |

## `devDependencies`

| Package                         | Description                                                           |
| ------------------------------- | --------------------------------------------------------------------- |
| @types                          | Dependencies in this folder are `.d.ts` files used to provide types    |
| chai                            | Testing utility library that makes it easier to write tests           |
| concurrently                    | Utility that manages multiple concurrent tasks. Used with npm scripts |
| jest                            | Testing library for JavaScript.                                       |
| node-sass                       | Allows to compile .scss files to .css                                  |
| nodemon                         | Utility that automatically restarts node process when it crashes      |
| supertest                       | HTTP assertion library.                                               |
| ts-jest                         | A preprocessor with sourcemap support to help use TypeScript wit Jest.|
| ts-node                         | Enables directly running TS files. Used to run `copy-static-assets.ts` |
| tslint                          | Linter (similar to ESLint) for TypeScript files                        |
| typescript                      | JavaScript compiler/type checker that boosts JavaScript productivity  |

To install or update these dependencies you can use `npm install` or `npm update`.