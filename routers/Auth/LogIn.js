const express = require('express');
const router = express.Router();
const User = require("../../modules/Users");
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const authUser = require('../../middlewares/fetchusers')

router.post('/login', [
    body('email',"Invalid Email!").isEmail(),
    body('password',"Password required!").exists()
],(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).send(errors.array()[0].msg)
    //<---------------Finding User by email first-------------->
    try {
        User.findOne({ email: req.body.email }, (_, usr) => {
            if (usr) {
                // console.log(usr);

                // <----------- Comparing password with hash-------------------->
                bcrypt.compare(req.body.password, usr.password, function (_, result) {
                    // res.send(result);
                    if (result) {
                        // res.send(usr.id);
                        let data = {
                            userId:usr.id
                        }
                        res.json({authToken:jwt.sign(data,"KrishnaKai")});
                    }
                    else {
                        res.status(401).json({"err":"Invalid Password!"});
                    }
                });
            }
            else
                res.status(401).json({err:"Invalid Credentials!"});
        })
    }
    catch (error) {
        // console.error(error)
        res.status(500).json({err:"Internal Error Occured!"});
    }
})

module.exports = router;