const { response } = require('express');
const bcrypt = require('bcryptjs');
const bcryptjs = require('bcryptjs');
const User = require('../models/User-model');
const { generateJWT } = require('../helpers/jwt');

const createUser = async(req, res = response) => {

    // we retrieve both the email and password from the request to look for an existing user in the database,
    // if the email is not registered in our database then this function will follow the necessary steps for it to be
    // registered accordingly
    const { email, password } = req.body;
    
    try {
        // the function call will trigger the asynchronous function to find one user based on the email registered,
        // the variable declared in here will receive an object containing full user information. If the request turns
        // out to be true, then this createUser function wont continue after the next step and will return a 400 (bad
        // request) status with an specific error message useful for the user to understand what went wrong
        let user = await User.findOne({ email });

        if(user) {
            return res.status(400).json({
                ok: false,
                msg: 'User with this email exists'
            });
        };

        // if the previous request failed to find a user with the respective email, then we create a new instance of a
        // User object which will be saved in the user collection of our calendar database by using the body data on our
        // request
        user = new User(req.body);
        // both the hash and salt will be the methods used along with the bcrypt library to encrypt the users password.
        // the hash will be stored in our database so the webpage manager wont be able to see them, and the bcrypt will be
        // used once again whenever the user wants to login
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        // the user-model is a mongoose Schema containing the required methods for us to save documents into our database,
        // we call the save methos to store the user document into our calendar collection
        await user.save();

        // once the user is saved, we generate a Jason Web Token for the user to be redirected to the homepage in our calendar
        // webapp and be authorized to make any changes related to its login credentials
        const token = await generateJWT(user.id, user.name);
        
        // the response has the code 201 (created) which will confirm the users registration into our database, the data is then
        // sent back as the calendar components uses the uid to allow changes in some of the events and the name for it to be
        // rendered on the page.
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
        
    } catch (error) {
        console.log(error);
        // if any of the previous steps present an issue then we return a code 500 (Internal Server Error), which most likely
        // will get fixed by the developer
        res.status(500).json({
            ok: false,
            msg: "Contact developer to fix issue"
        });
    };
};

const loginUser = async(req, res = response) => {

    // we retrieve both the email and password from the request to look for an existing user in the database,
    // if the email is not registered in our database then this function will follow the necessary steps for the
    // proper error message to be returned to the user
    const {email, password} = req.body;

    try {
        // the function call will trigger the asynchronous function to find one user based on the email registered,
        // the variable declared in here will receive an object containing full user information. If the request turns
        // out to be false, then this loginUser function wont continue after the next step and will return a 400 (bad
        // request) status with an specific error message useful for the user to understand what went wrong
        let user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({
                ok: false,
                msg: 'User does not exist with that email'
            });
        };

        // if the user exists, then the password will go through the compareSync method which will compare
        // and decrypt both the input password (from the http request) and the user password (returned from the
        // mongoose findOne method). if the validPass variable returns a false value, then the code will return
        // a 400 status code (bad request) with a proper body message stating what went wrong
        const validPass = bcryptjs.compareSync(password, user.password);

        if(!validPass) {
            return res.status(400).json({
                ok: false,
                msg: 'Wrong password, try again'
            });
        };
        
        // once the user is confirmed, we generate a Jason Web Token for the user to be redirected to the homepage in our calendar
        // webapp and be authorized to make any changes related to its login credentials
        const token = await generateJWT(user.id, user.name);

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
        
    } catch (error) {
        console.log(error);
        // if any of the previous steps present an issue then we return a code 500 (Internal Server Error), which most likely
        // will get fixed by the developer
        res.status(500).json({
            ok: false,
            msg: "Contact developer to fix issue"
        });
    };

    res.json({
        ok: true,
        msg: 'login',
        email,
        password
    });
};

const validateToken = async(req, res = response) => {

    // we retrieve both the email and password from the request to validate the users status on the page, based on the token
    // attached to the header the webpage will either exit to the login page (which happens automatically after 2 hours) or it will
    // allow the user (if it still has time remaining) to do any of the desired changes to its collection
    const uid = req.uid;
    const name = req.name;

    // once the user is validated, we generate a Jason Web Token for the user to be redirected to the homepage in our calendar
    // webapp and be authorized to make any changes related to its login credentials
    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token
    });
};

module.exports = {
    createUser,
    loginUser,
    validateToken
};