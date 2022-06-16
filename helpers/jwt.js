const jwt = require('jsonwebtoken');

const generateJWT = (uid, name) => {

    return new Promise((resolve, reject) => {

        // for the JWT to work, we will use its response through a callback, the payload will 
        // attach the users uid and name to a "SECRET_JWT_SEED" which will be an encrypted string
        // created by me. The jwt instance will call for the sign method, which you can also use to
        // specify for how long the token will work, in this case we will specify for it to
        // keep the users authorization for 2 hours.
        const payload = {uid, name};

        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (err, token) => {

            if(err){
                console.log(err);
                reject('Could not generate token')
            }

            resolve(token);
        });
    });
};

module.exports = {
    generateJWT
}