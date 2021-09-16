const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

let User = require('../models/users.model');

router.route('/register').post((req, res) => {
    const username = req.body.username;
    let email = req.body.email;
    const password = req.body.password;

    // make emails case insensitive
    email = email.toLowerCase();

    const bannedUsernames = ["anonymous"]; // banned because of special use case
    if(bannedUsernames.includes(username.toLowerCase())) {
        res.status(409).send( 'Error: Username taken.');
        return null;
    }

    User.findOne({"username": username}, (err, user) => {
        if(!err && user) {
            res.status(409).send( 'Error: Username taken.');
            return null;
        }
    });
    User.findOne({"email": email}, (err, user) => {
        if(!err && user) {
            res.status(409).send('Error: Email associated with another account.');
            return null;
        }
    });

    // hash password
    bcrypt.hash(password, process.env.SALT_ROUNDS | 0, function(err, hash) {
        const newUser = new User({
            "username": username,
            "email": email,
            "password_hash": hash,
        });

        newUser.save()
            .then(() => res.json('User added!'))
            .catch(err => {
                res.status(500).json('Error: Unknown error. Please try again later.');
            });
    });
});

router.route('/auth').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    let result = {};
    let status = 200;

    User.findOne( { $or: [{ "username": username }, { "email": username }] }, (err, user) => {
        if(!err && user) {
            bcrypt.compare(password, user.password_hash, function(err, match) {
                if(match) {
                    // Create a token
                    const payload = { userid: user._id };
                    const options = { expiresIn: '2d', issuer: 'http://localhost:5000/' };
                    const secret = process.env.JWT_SECRET;
                    result.token = jwt.sign(payload, secret, options);
                    result.body = "User Authenticated";
                    //res.status = status;
                    res.cookie(process.env.SESS_NAME, result.token, {
                        expires: new Date(Date.now() + (process.env.SESS_LIFETIME | 0) ),
                        httpOnly: true,
                    })
                } else {
                    status = 401;
                    result.body = "User Authentication Failed";
                    //res.status = status;
                }
                res.status(status).send(result);
            });
        } else {
            status = 401;
            result.body = "User Authentication Failed";
            //result.status = 401;
            res.status(status).send(result);
        }
    }).catch(err => {
        status = 401
        result.body = "User Authentication Failed";
        //result.status = 401;
        res.status(status).send(result);
    });
})

router.route('/current-session').post((req,res) => {
    const authCookie = req.cookies.authCookie;

    jwt.verify(authCookie, process.env.JWT_SECRET, (err,data) => {
        if(err) {
            res.status(401).send("Access Denied");
        }
        else if(data.userid) {
            let query = { "_id" : data.userid };
            User.findOne(query, (err, result) => {
                res.status(200).send({ username: result.username });
            });
        }
    });
});

router.route('/logout').post((req, res) => {
    let result = {};
    result.token = req.cookies.authCookie;
    res.cookie(process.env.SESS_NAME, result.token, {
        expires: new Date(Date.now() - (process.env.SESS_LIFETIME | 0) ),
        httpOnly: true,
    });
    res.status(200).send("Logged Off");
});

module.exports = router;
