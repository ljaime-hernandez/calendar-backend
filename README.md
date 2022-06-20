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
 variable confirming if the request result is positive or negative and a body message used on
 the calendar webapp for user-friendly interactions. Each interaction will generate a JWT allowing
 the user to interact with the webpage.