const express = require('express');
const router = express.Router();
const authToken = require('../../middlewares/fetchusers')
const Notes = require('../../modules/Notes')


router.post('/:id',authToken,async(req,res)=>{
    if(req.userId)
    {
        // console.log("I am in single")
        let not= await Notes.findOne({_id:req.params.id,user:req.userId})
        res.send(not);
    }
})

module.exports = router;