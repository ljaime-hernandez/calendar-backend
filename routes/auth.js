/*
    User Routes / Auth
    host + /api/auth
*/

const {Router} = require('express');
const router = Router();
const {check} = require('express-validator');
const { createUser, loginUser, validateToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const validateJWT = require('../middlewares/validate-jwt');

// creates an user with post method
router.post(
    '/new', 
    [ // middleware
        check('name', 'Name field is mandatory').not().isEmpty(),
        check('email', 'Email field is mandatory').isEmail(),
        check('password', 'Password should have 6 characters').isLength({min: 6}),
        validateFields
    ], 
    createUser
);

router.post(
    '/',
    [
        check('email', 'Email field is mandatory').isEmail(),
        check('password', 'Password should have 6 characters').isLength({min: 6}),
        validateFields
    ],
    loginUser);

router.get('/renew', validateJWT, validateToken);

module.exports = router;