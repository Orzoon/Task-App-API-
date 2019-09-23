const express = require("express");
const User = require("../modals/user");
const router = express.Router();
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const multer = require('multer');
const sharp = require('sharp')
const {sendWelcomeEmail, sendCancelEmail} = require('../emails/account')



// users Post
router.post('/users', async (req,res) => {
    const user = new User(req.body);
    
    try{
        await user.save();
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken();
        res.status(201).send({user,token})
    }
    catch (e){
      res.status(404).send(e)  
    } 
})

// users login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken();
        res.send({user,token})
        
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/users/logoutall',auth, async (req,res) => {
    try {
        req.user.tokens = [];
        req.user.save();
        res.status(200).send();
        
    }catch(error){
        res.status(500).send(error)
    }
})  

// users Logout
router.post('/users/logout', auth, async (req,res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save();
        res.status(200).send();
    }catch(e){
        res.status(500).send(e)
    }
})
// Users GET
router.get('/users/me', auth, async (req,res) => {
   res.send(req.user);
})

// update user
router.patch('/users/me', auth, async (req,res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name','email','password','age'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send({error: "invalid updates"})
    }

    try {
        updates.forEach((update) => req.user[update] =req.body[update])
        await req.user.save();
        res.status(200).send(req.user)
    }catch(e){
        res.status(500).send(e)
    }
})

//delete User
router.delete('/users/me', auth,async (req,res) => {
    try{    
        await req.user.remove();
        res.status(200).send(req.user);
    }catch(error){
        res.status(500).send(error)
    }
})


const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(png|jpeg|jpg)$/)) {
            return cb(new Error('please upload valid file'))
        }

        cb(undefined,true)


        // cb(new Error ('please upload valid file'))
        // cb(undefined,true)
    }
})

router.post('/users/me/avatar', auth ,upload.single('avatar'), async (req,res) => {
    const buffer = await sharp(req.file.buffer).resize(250,250).png().toBuffer();
    console.log(buffer)
    req.user.avatar = buffer
 await req.user.save();
 res.status(200).send();
}, (error,req,res,next) => {
    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatar',auth, async(req,res) => {

    req.user.avatar = undefined;
    await req.user.save();
    sendCancelEmail(user.email, user.name)
    res.status(200).send()
})

router.get('/users/:id/avatar', async(req,res) => {
    console.log(req.params)
    try{
       
        const user = await User.findById(req.params.id);
        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('content-type','image/png');
        res.send(user.avatar)
    }catch(e){
        res.status(404).send();
    }
})
module.exports = router;