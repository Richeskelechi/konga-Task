# konga-Task
Building a User Microservice

## The Microservice was created with Node js, express, TypeScript and Mysql for the database. 
## ORM was used to interact with the database

## Proceeding with the Microservice
1. Clone the repository from the git repository using the Link below.
https://github.com/Richeskelechi/konga-Task.git

2. Once you have cloned that we need to install all dependencies needed to effectively run the Microservice
in the terimal we run npm install or npm i

3. After which we need to create the .env file for the Microservice environmental files and variable.
Here is a simple example
PORT: where the Microservice will be running
DB_USER: this is always root
DB_PASSWORD: the password for the DB
DB_NAME: the name of the database
DB_HOST: the host of the DB. for most cases this is localhost
DB_PORT: This is the port for the DB. Most cases the port is3306
JWT_SECRET: Your JWT secret
SALT_ROUND: The salt round for the password hashing.

4. Now we need to compile the typescript to javascript.
The commands have been written already in the package.json. we need to run the command of the terminal
npm build.

5. Now we need to run the test suite. The test suite will run a test suite associated with the microservice. So in the terminal we run the command.
npm run test

6. Finally we start the server. In the terminal we run the following.
for test or development we use npm run dev
for live or production we run npm start.

Sample Endpoints.
1. Creating A User
localhost:3010/users/ - for creating a new user.

2. For Logging in a user 
localhost:3005/users/login - for logging in a user.

3. Getting All User
localhost:3010/users/ - for getting all users. This route is authenticated(protected) so that only the admin can get all users.

4. Getting a user
localhost:3010/users/:userId - for getting a user with the user Id

5. For Updating A User
localhost:3010/users/:userId - for updating a user with the user Id. This route is authenticated(protected) so that only autheniticated users can update their profiles

6. For Deleting A User
localhost:3010/users/:userId - for deleting a user. This route is authenticated(protected) so that only the admin can delete a user using the userid.

#Good To Note:
The login endpoint was added to create a token once the already genrated token has expired. The tokens are set to expire after 1h. 

