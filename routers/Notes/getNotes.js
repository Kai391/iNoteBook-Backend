const express = require('express');
const router = express.Router();
const authToken = require('../../middlewares/fetchusers')
const Notes = require('../../modules/Notes');
const Users = require('../../modules/Users');


router.get('/',authToken,async(req,res)=>{
    if(req.userId)
    {
        // console.log(req.userId)
        const usr = await Users.findById(req.userId);
        const notes = await Notes.find({user:req.userId});
        // console.log(usr);
        res.send([notes,usr])
    }
})

module.exports = router;