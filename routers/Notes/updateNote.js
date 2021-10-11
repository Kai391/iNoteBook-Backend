const express = require('express');
const router = express.Router();
const authToken = require('../../middlewares/fetchusers')
const Notes = require('../../modules/Notes')


router.put('/:id/update', authToken, async (req, res) => {
    try
    {
        if (req.userId && await Notes.findOne({_id:req.params.id,user:req.userId})) {
            let not = await Notes.findByIdAndUpdate(req.params.id, { $set: req.body})
            let newData = {...req.body,_id:req.params.id};
            res.send({ "status": "update!", "Updated fields": newData, "old Data":not });
        }
        else
            res.status(400).send({err:"Kuch to err hai"})
    }
    catch(e)
    {
        res.json({err:e});
    }
})

module.exports = router;