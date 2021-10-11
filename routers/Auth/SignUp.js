const express = require('express');
const router = express.Router();
const User = require("../../modules/Users");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

// <---------------------------SignUp Func--------------------------->
router.post('/signup', [
    // Validate if email is valid and email is exist
    body('email', "Invalid Email!").isEmail().custom(value => {
        return User.findOne({ "email": value }).then(user => {
            if (user) {
                return Promise.reject('E-mail already in use');
            }
        });
    }),
    body('fullName', "Name should be more than 3 characters!").isLength({ min: 3 }),
    body('password', "Password should be more than 5 characters!").isLength({ min: 5 })
], (req, res) => {

    // <-------------- Error handling-------------->
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({"err":errors.array()[0]})
    }
    // console.log(req.body.password);
    // <-------------- Salting and hashing passwords----------------->
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        // Store hash in your password DB.

        //<------------ Creating User-----------------> 
        try {
            User.create({
                fullName: req.body.fullName,
                email: req.body.email,
                password: hash
            }).then(usr =>{ 
                let data = {
                    usrId:usr.id
                };
                res.json({authToken:jwt.sign(data,"KrishnaKai")});
            });
        }
        catch (err) {
            res.status(500).send("Internal Error Occured!");
        }
    });
})

module.exports = router;