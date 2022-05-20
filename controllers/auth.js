const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User-model');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const createUser = async(req, res = response) => {

    const { email, password } = req.body;
    
    try {

        let user = await User.findOne({ email });

        if(user) {
            return res.status(400).json({
                ok: false,
                msg: 'User with this email exists'
            })
        };

        user = new User(req.body);
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        // Generate JWT
        const token = await generateJWT(user.id, user.name);
        
    
        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact developer to fix issue"
        });
    }
};

const loginUser = async(req, res = response) => {

    const {email, password} = req.body;

    try {

        let user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({
                ok: false,
                msg: 'User does not exist with that email'
            });
        };

        const validPass = bcryptjs.compareSync(password, user.password);

        if(!validPass) {
            return res.status(400).json({
                ok: false,
                msg: 'Wrong password, try again'
            });
        };
        
        // generate JWT
        const token = await generateJWT(user.id, user.name);

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Contact developer to fix issue"
        });
    }

    res.json({
        ok: true,
        msg: 'login',
        email,
        password
    })
};

const validateToken = async(req, res = response) => {

    const uid = req.uid;
    const name = req.name;

    // generate JWT
    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        uid,
        name,
        token
    })
};

module.exports = {
    createUser,
    loginUser,
    validateToken
}