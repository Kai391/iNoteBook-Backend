const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const NotesSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = model('notes',NotesSchema);