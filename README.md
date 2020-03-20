# Weebify

## Written by Blade Boles and Jaye Laguardia

## Live Link: [Spaced Repetition](https://weebify.bladeboles.now.sh)

## Client Repo Link: [Client Repo](https://github.com/thinkful-ei-jaguar/Cap-2-Client-Jaye-Blade)

### About
The user can learn Japanese vocabulary using spaced repetition learning technique.  A user is presented with a vocabulary "card" and is allowed to enter a guess.  If the guess is correct, the user will be quizzed on that word later.  If the guess is incorrect, they will be quizzed sooner.

### Tech Stacks
- Node
- Javascript
- Express
- Heroku
- PostgreSQL

### API Endpoints

* /language 
   - GET Gets all words in database
  
  * /head
      - GET Gets next word in line
   
  * /guess
      - POST Posts guess.  Returns info on next word and correct/incorrect.
   
* /auth
  * /token
      - POST Posts authentication token.  Returns error if not authorized.
   
* /user
      - POST Posts new user account

## Local dev setup

If using user `dunder_mifflin`:

```bash
mv example.env .env
createdb -U dunder_mifflin spaced_repetition
createdb -U dunder_mifflin spaced_repetition_test
```

If your `dunder_mifflin` user has a password be sure to set it in `.env` for all appropriate fields. Or if using a different user, update appropriately.

```bash
npm install
npm run migrate
env MIGRATION_DATABASE_NAME=spaced_repetition_test npm run migrate
```

And `npm test` should work at this point

## Configuring Postgres

For tests involving time to run properly, configure your Postgres database to run in the UTC timezone.

1. Locate the `postgresql.conf` file for your Postgres installation.
   1. E.g. for an OS X, Homebrew install: `/usr/local/var/postgres/postgresql.conf`
   2. E.g. on Windows, _maybe_: `C:\Program Files\PostgreSQL\11.2\data\postgresql.conf`
   3. E.g  on Ubuntu 18.04 probably: '/etc/postgresql/10/main/postgresql.conf'
2. Find the `timezone` line and set it to `UTC`:

```conf
# - Locale and Formatting -

datestyle = 'iso, mdy'
#intervalstyle = 'postgres'
timezone = 'UTC'
#timezone_abbreviations = 'Default'     # Select the set of available time zone
```

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests mode `npm test`

Run the migrations up `npm run migrate`

Run the migrations down `npm run migrate -- 0`
