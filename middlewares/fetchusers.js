const jwt = require("jsonwebtoken");

fetchInfo = (req,res,next)=>{
    const token = req.header('auth-Token');
    if(!token)
        return res.status(404).json({err:"Token not found!"});
    try{
        const vrfy  = jwt.verify(token,"KrishnaKai");
        req.userId = vrfy.userId;
        next()
    } catch(_)
    {
        res.status(401).json({err:"Invalid Token"});
    }

}
module.exports = fetchInfo;