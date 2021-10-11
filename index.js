const mongodb = require('./db')
mongodb();
const express = require('express')
const app = express()
const cors = require("cors");
const port = 8001

app.use(express.json());
app.use(cors());

// only for test
app.get('/',(req,res)=>{
  console.log("Request is made on /");
  res.status(200).json({
    status:"Ok",
    msg:"Application is working properly"
  })
})

// Authentication Api's
app.use('/api/auth',require("./routers/Auth/SignUp"));
app.use('/api/auth',require("./routers/Auth/LogIn"));

// <-----------------Notes Application--------------------->
app.use('/api/notes',require('./routers/Notes/createNotes'));
app.use('/api/notes',require('./routers/Notes/getNotes'));
app.use('/api/notes',require('./routers/Notes/updateNote'));
app.use('/api/notes',require('./routers/Notes/deleteNote'));
app.use('/api/notes',require('./routers/Notes/singleNote'));


app.listen(port, () => {
  console.log(`iNoteBook Backend is listening at http://localhost:${port}`)
})
