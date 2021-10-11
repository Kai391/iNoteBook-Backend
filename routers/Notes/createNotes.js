const express = require('express');
const router = express.Router();
const authToken = require('../../middlewares/fetchusers')
const Notes = require('../../modules/Notes')


// router.post('/',authToken,async(req,res)=>{
router.post('/new-note',authToken,async(req,res)=>{
    if(req.userId)
    {
        // console.log(req.body)
        if(req.body.title && req.body.description)
        {
            let not= await Notes.create({...req.body,user:req.userId});
            res.send(not);
        }
        else
        {
            res.json({err:"Title and Description can't be empty!"})
        }
    }
})

module.exports = router;