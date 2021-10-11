const jwt = require("jsonwebtoken");

let toekn = "";

let key ="KrishnaKai";

console.log(jwt.verify(toekn,key).userId);