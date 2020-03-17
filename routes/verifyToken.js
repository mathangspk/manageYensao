const jwt = require('jsonwebtoken');

function auth(req,res,next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');
    try{
        const verify = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verify; //gui jwt token qua route ke tiep
        next();
    }catch(err){
        res.status(400).send('Invalid token');
    }
}

module.exports = auth;