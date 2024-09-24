# Quotes App

_Quotes App_ is a full-stack TypeScript application I'm actively developing in the meanwhile I get a new job. The first iteration of this app was part of a job interview I underwent.

The app is intended to let a user save her favourite quotes and discover, and save, new randomly generated quotes fetched through the API Ninjas service.

The following are its main features:

- Composed of two parts, a front-end SPA developed with React, and a Express.js-based back-end which exposes a REST API built on top of PostgreSQL.
- Full authentication flow using the JWT pattern and email verification on sign-up, with automatic logout when the JWT expires.
- Quotes-search feature characterised by caching of the search results, pagination implemented on the back-end, and throttling of the HTTP requests.
- Various E2E tests developed with Cypress.
- Angular version of the front-end — a work in progress.

If you want to run the app on your local machine, below are all the steps you need to follow.

## Launching the Front-end

With your terminal app, navigate to the project's folder, then follow these steps:

```
# Navigate to 'fe-react'
cd ./fe-react

# Create a .env file
cp .env.example .env

# Install the dependencies
npm i

# Launch the app
npm run dev
```

## Launching the Back-end

The server app can be launched both with and without Docker. For the sake of simplicity, I suggest using Docker.

Things to take into account:

- The MAILER-related variables in the .env file are needed to send the account activation email required for the sign up process to complete.
- For the random-quote feature to work, you'll need to create and account on [API Ninjas](https://api-ninjas.com/) and request an API key.

### With Docker

```
# Navigate to 'back-end'
cd ./back-end

# Create a development .env file
cp .env.example .env.development

# Fill in the .env.development just created.
#
# For the POSTGRES-related variables, you can use
# the following values:
#
# POSTGRES_HOST=db
# POSTGRES_USER=quotes_master
# POSTGRES_PASSWORD=quotes2024
# POSTGRES_DB=quotes_app

# To generate a JWT-secret, you can use this command:
openssl rand -base64 60

# Install the dependencies
npm i

# Finally, create the Docker image...
docker compose build

# ...and launch the app like this:
docker compose up
```

All of these steps are required only the first time you want to launch the app. For the next times, you just need to fire the last command shown above, namely this:

```
docker compose up
```

### Without Docker

To proceed, you first have to make sure the PostgreSQL server is installed on your machine. Next, you need to create a PostgreSQL database and a role. You can use the following settings if you want:

```
Database name: quotes_app
Role/User name: quotes_master
Role/User password: quotes2024
```

Now, follow these steps:

```
# Navigate to 'back-end'
cd ./back-end

# Create an .env file
cp .env.example .env

# Fill in the .env just created.
#
# For the POSTGRES-related variables, you have to use
# the parameters you chose when you created the database:
#
# POSTGRES_HOST=localhost
# POSTGRES_USER=quotes_master
# POSTGRES_PASSWORD=quotes2024
# POSTGRES_DB=quotes_app

# To generate a JWT-secret you can use this command:
openssl rand -base64 60

# Install the dependencies
npm i

# Create the database tables
npm run migrate

# Launch the app
npm run dev
```

## Running the E2E Tests

The font-end project includes more than 15 E2E tests.

### With Docker

```
# In the back-end app, you first have to edit the
# 'back-end/.env.development' file by changing the
# value of POSTGRES_HOST like this:
#
# POSTGRES_HOST=testdb

# Launch the server app
cd ./back-end
docker compose up

# Launch the front-end
cd ../fe-react
npm run dev

# Now, before going on, create a new account, then
# create a Cypress configuration file:
cp cypress.env.json.example cypress.env.json

# Fill in the configuration file just created with the
# credential you choose on creating your account.
#
# Finally, from a new terminal window,
# you can launch Cypress and run the tests:
cd ./fe-react
npm run cy:open
```

### Without Docker

```
# Launch the server app
cd ./back-end
npm run dev

# Launch the front-end
cd ../fe-react
npm run dev

# Now, before going on, create a new account, then
# create a Cypress configuration file:
cp cypress.env.json.example cypress.env.json

# Fill in the configuration file just created with the
# credential you chose on creating your account.
#
# Finally, from a new terminal window,
# you can launch Cypress and run the tests:
cd ./fe-react
npm run cy:open
```
