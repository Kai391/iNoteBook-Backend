const express = require('express');
const router = express.Router();
const authToken = require('../../middlewares/fetchusers')
const Notes = require('../../modules/Notes')


router.delete('/:id/delete',authToken,async(req,res)=>{
    if(req.userId && req.params.id!=="undefined" && await Notes.findOne({_id:req.params.id,user:req.userId}))
    {
        let not= await Notes.findByIdAndDelete({_id:req.params.id})
        res.json({"status":"Deleted!",not});
    }
    else
        res.status(400).json({err:"Invalid token or note doesn't exist!"})
})

module.exports = router;