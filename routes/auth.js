/*
    User Routes / Auth
    host + /api/auth
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validate-fields');
const { createUser, loginUser, validateToken } = require('../controllers/auth');

// creates an user with post method
router.post(
    '/new', 
    [ // middleware checking for name field to not be empty, for email validation and for the password to
      // be at least 6 characters long, this array has a final method called validateFields which will
      // process any error checked and will return the request with an specific body message based on the 
      // check parameters.
        check('name', 'Name field is mandatory').not().isEmpty(),
        check('email', 'Email field is mandatory').isEmail(),
        check('password', 'Password should have 6 characters').isLength({min: 6}),
        validateFields
    ], 
    createUser
);

// Login for user with post method
router.post(
    '/',
    [ // middleware checking for email validation and for the password to be at least 6 characters long, 
      // this array has a final method called validateFields which will process any error checked and will 
      // return the request with an specific body message based on the check parameters.
        check('email', 'Email field is mandatory').isEmail(),
        check('password', 'Password should have 6 characters').isLength({min: 6}),
        validateFields
    ],
    loginUser
);

// request for token validation
router.get('/renew', validateJWT, validateToken);

module.exports = router;