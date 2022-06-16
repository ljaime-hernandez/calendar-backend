const { response } = require('express');
const { validationResult } = require('express-validator');

const validateFields = (req, res = response, next) => {

    // this middleware will return any errors based on which validations we implement on our routes
    // it requires a 'next' instance to call the next middleware function in the stack in case there 
    // is no errors.
    const errors = validationResult(req);

    if ( !errors.isEmpty() ) {
        // if the errors variable returns a false value, then the code will return
        // a 400 status code (bad request) with a proper body message stating what went wrong by using
        // the error message used on the route check.
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    };

    next();
};

module.exports = {
    validateFields
};