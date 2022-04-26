/*
    User Routes / Auth
    host + /api/auth
*/

const {Router} = require('express');
const router = Router();
const {check} = require('express-validator');
const { createUser, loginUser, validateToken } = require('../controllers/auth');

// creates an user with post method
router.post(
    '/new', 
    [
        check('name', 'Name field is mandatory').not().isEmpty(),
        check('email', 'Email field is mandatory').isEmail(),
        check('password', 'Password should have 6 characters').isLength({min: 6})
    ], 
    createUser
);

router.post(
    '/',
    [
        check('email', 'Email field is mandatory').isEmail(),
        check('password', 'Password should have 6 characters').isLength({min: 6})
    ],
    loginUser);

router.get('/renew', validateToken);

module.exports = router;