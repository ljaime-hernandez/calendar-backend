# Calendar Webapp backend

Webapp link: https://calendar-backend-webapp.herokuapp.com/

backend created to improve my skills on several node features such as:

* handling HTTP requests with express.js
* connect a server to a database with MongoDB
* create models based on mongoose Schemas
* monitor server changes with nodemon
* encrypt and decrypt passwords with bcryptjs
* data validation with express-validation
* validate date fields with custom functions using moment.js
* load .env file contents into process.env using dotenv
* authorization handling with JWT (Jason Web Token)

Detailed information on the backend development can be found on each of the files or in this readme 
document which has been extensively documented for educational purposes. Thanks for taking your 
time to review my code or notes and leave either a comment or a star if you find it useful.

**Folders are explained by alphabetical order below** <br>
**dependencies on this project are enlisted at the bottom of the readme file**

## Controllers:

### auth:
The file contains the asynchronous functions related to the user creation, registration and validation. 
Each of the functions were designed so they give the respective HTTP status code, for either confirming
the user creation, bad request, internal server error, etc. Each status code response will have an ok 
variable confirming if the request result is positive or negative and a body message used on the calendar 
webapp for user-friendly interactions. Each interaction will generate a JWT allowing the user to 
interact with the webpage.

### events:
This file contains all CRUD related functions to our events API. Each of the function calls has a mongoose 
function to handle the HTTP method request. Each of the functions were designed so they give the respective 
HTTP status code, for either confirming the user creation, bad request, internal server error, etc. Each 
status code response will have an ok variable confirming if the request result is positive or negative and 
a body message used on the calendar webapp for user-friendly interactions.

## DB:

### config:
Documented file which also explains how i did the mongoDB connection. The MongoDB Node.js driver 
rewrote the tool it uses to parse MongoDB connection strings. Because this is such a big change, they 
put the new connection string parser behind a flag. To turn on this option, pass the useNewUrlParser 
option to mongoose.connect() or mongoose.createConnection(). The useUnifiedTopology option removes support 
for several connection options that are no longer relevant with the new mongo topology engine.

## Helpers:

### isDate:
All dates sent through the requests will have a first filter for date formatting, just in case something 
changes on the page and this is no longer supported then we are going to send them through this moment 
verification, if the value input is wrong then the code will return a false state leading to the proper
error handling for the developer to know what is happening.

### jwt:
for the JWT to work, we will use its response through a callback, the payload will attach the users uid 
and name to a "SECRET_JWT_SEED" which will be an encrypted string created by me. The jwt instance will 
call for the sign method, which you can also use to specify for how long the token will work, in this 
case we will specify for it to keep the users authorization for 2 hours.

## Middlewares:

### validate-fields:
This middleware will return any errors based on which validations we implement on our routes. 

### validate-jwt:
The JWT contains the users information encrypted in a portion of it, so we use both the token and the
secret code to verify if this user is valid to fulfill the request. Afterwards, if the user validation
is successful then we will be able to retrieve both the uid and the name and add it to the request.

## Models:

### event-model:
The event-model file is an instance of a mongoose Schema, every variable on this schema can contain several
attributes, such as the primitive or custom type, if that type is required for the schema to be saved in the
mongoose collection or not, if the type is actually a reference of another schema, etc.

### user-model:
Similar to  the Event-model, the User-model file is an instance of a mongoose Schema, every variable on this 
schema can contain several attributes, such as the primitive or custom type, if that type is required for the 
schema to be saved in the mongoose collection or not, if the type is actually a reference of another schema, etc.
Additional to it, the email on this schema contains an attribute for it to be unique, if the user attempts
to save a new document with an existing email in our database then it will receive an error.

## routes:

### auth:
has the routes for user creation, validation and login, each one of the routes has a middleware implemented 
to check on each field validation, After this is done, the custom middleware validateFields will check for errors,
if any it will return them with the proper body message.

### events:
has the routes for event retrieval, update, deletion and creation. Each one of the routes has 
a middleware implemented to check on each field validation, After this is done, the custom middleware 
validateFields will check for errors, if any it will return them with the proper body message. Along 
with the previous middleware, each request will run through the validateJWT middleware as well to 
check if the user is authorized to make any changes in the mongo collection.

## Dependencies:

- bcryptjs
- cors
- dotenv
- express
- express-validator
- jsonwebtoken
- moment
- mongoose
- nodemon