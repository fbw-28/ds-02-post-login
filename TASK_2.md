# Express API - Database Trial

## API with a first (mini) database

We now want to be able to store and manage our users in a database.

We want to prevent direct access to the database from the outside world.

Changes to the database should be made only by (REST) calls from our browser (or API test program, e.g. POSTMAN). This way we have full control on what data we allow to store and what not.

Our API should provide all classical CRUD operations (CREATE, READ, UPDATE, DELETE).

If we are able to do this it will be a big step forward in your backend development.

### Part 1 - DB setup

* Install lowdb package: `npm i lowdb`
* Create a folder "data" in your project directory

* Setup lowdb in your code
    * Synchronize it with a file "./data/db.json" so that all changes of your lowdb will be written to that file automatically
    * Checkout the lowdb documentation below on how to set the connection up (you do not have to learn / remember the setup steps by heart)
* Initialize your database with an empty "users" array

* Add a script "dev" to your package.json:
  * `"dev": "nodemon -e js server.js"`
  * " -e js" ?? What is that for? That part will make sure, nodemon ONLY restarts your server on changes of your code files (.js) & not on changes of the database file!

* Start your server
* Check if the file "db.json" gets created in your directory

If the file db.json gets created with an empty users array inside, you can continue to the next part.

LowDB documentation for your reference:
https://github.com/typicode/lowdb


### Step 2 - Setup the routes skeleton

Create 5 routes please:

- One for creating / signing up a new user (=> POST route /users)
- One for getting all users (=> GET route /users)
- One for getting a single user by id (=> GET route /users/:id)
- One for updating an existing user by id (=> PATCH route, /users/:id)
- One for deleting an existing user by id (=> DELETE route, /users/:id)

First just send back hardcoded responses in all your routes:
- (e.g. in route /users: `res.send({ users: [{ id: '123', name: 'Rob' }] } )`

Also console.log all received data (e.g. req.params and req.body), to be able to debug problems.

Ready?

Now try to call these routes from an API test tool (e.g. POSTMAN or RESTED)

Test if you receive your fake responses.

If that works: Good! You now assured that your routes are correctly setup and can be called by a frontend.

Now we can implement the functionality in the next step.


### Step 3 - Signup, Update and Delete of users

Now we want to be able to process incoming data and update our users database (= db.json file)

Implement now the logic in your routes:
- create a new user to lowdb in your POST route
- update an existing user in lowdb
- delete an existing user in lowdb
- get all users from lowdb
- get a single user from lowdb

LowDB documentation for your reference:
https://github.com/typicode/lowdb


### Testing

Test now all your five operations with your favorite API tool (POSTMAN, RESTED, your own HTML frontend):
- check after each operation if your db.json file was updated correctly

If you made this app working: Congratulations! You just created a first completely functional API.

In the next weeks we will now extend the API and will more and more protect our holy data against nasty frontend people with bad intentions.
