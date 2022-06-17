const { response } = require('express'); 
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {

    // on the fetch event called fetchWithToken we create a request for any method (GET, POST, DELETE, PUT)
    // which will include the JWT on the http header as 'x-token', in this step we will reverse the process
    // and we will retrieve it from the header for it to be validated. 
    const token = req.header('x-token');
    
    if(!token){
        // the response has the code 201 (created) which will return a body message stating the token was 
        // not found on the petition, therefore the request was not fulfilled properly
        return res.status(201).json({
            ok: false,
            msg: 'There is no token in the petition'
        });
    };
    
    try {

        // the JWT contains the users information encrypted in a portion of it, so we use both the token and the
        // secret code to verify if this user is valid to fulfill the request. Afterwards, if the user validation
        // is successful then we will be able to retrieve both the uid and the name and add it to the request.
        const {uid, name} = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.uid = uid;
        req.name = name;
        
    } catch (error) {
        // if the token on the request contains wrong information then the code will return a 401 status code (Unauthorized) 
        // with a proper body message stating what went wrong
        return res.status(401).json({
            ok: false,
            msg: 'Invalid Token'
        });
    };
    
    // this middleware requires a 'next' instance to call the next middleware function in the stack in case there 
    // is no errors.
    next();
};

module.exports = {
    validateJWT
};