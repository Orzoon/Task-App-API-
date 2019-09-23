const User = require('../modals/user');
const jwt = require('jsonwebtoken');

const auth = async (req,res,next) => {
    try{
        const token = req.header('authorization').replace('Bearer', '').trim()
        const verifyToken = await jwt.verify(token,process.env.SECRET);
        const user = await User.findOne({_id: verifyToken._id, "tokens.token": token });
        if(!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
     
    }catch(e){
        res.status(401).send({error: 'please authenticate'})
    }
}

module.exports = auth;