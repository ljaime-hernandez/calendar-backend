const {response} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User-model');
const bcryptjs = require('bcryptjs');

const createUser = async(req, res = response) => {

    const {name, email, password} = req.body;
    
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
    
        res.status(201).json({
            ok: true,
            msg: 'register'
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


        res.json({
            ok: true,
            uid: user.id,
            name: user.name
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

const validateToken = (req, res = response) => {

    res.json({
        ok: true,
        msg: 'renew'
    })
};


module.exports = {
    createUser,
    loginUser,
    validateToken
}