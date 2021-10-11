const mongoose = require('mongoose');

async function main() {
  await mongoose.connect('mongodb+srv://kai:lkzjh1sIUdsFkgmw@cluster0.qnk25.mongodb.net/iNoteBookDB?retryWrites=true&w=majority',()=>{
      console.log("connected to db");
  });
}

module.exports = main;