const router=require('express').Router();
const User=require('../models/user');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const {loginValidation,registerValidation} =require('../validation/validation');

router.post('/login',async(req,res)=>{
    //validation
    const {error} = loginValidation(req.body);
    if(error) {
        const message = error.details[0].message;
        return res.status(400).send(JSON.stringify({message}));
    }

    const user = await User.findOne({ email: req.body.email});
    if(!user) return res.status(400).send({"message":"Email donot exists"});

    const validPass =  await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send({"message":"Password is Incorrect"});

    //create and assign token
    const name=user.name;
    const token= jwt.sign({_id : user._id },process.env.TOKEN_SECRET,{ expiresIn: '1h' });
    res.header('auth-token',token).send(JSON.stringify({token,name}));
});

router.post('/register',async(req,res)=>{

    //validation
    const {error} = registerValidation(req.body);
    if(error) {
        const message = error.details[0].message;
        return res.status(400).send(JSON.stringify({message}));
    }

    await User.findOne({ email: req.body.email},function(err,doc){
        if(err) return res.sendStatus(400).send({"message":"Error"});
        else if(doc) return res.status(400).send({"message":"Email Already Exists"});
    });

    //password encryption
    const salt = await bcrypt.genSalt(10);
    const encryptPassword = await bcrypt.hash(req.body.password,salt);

    //data addition
    const user= new User({
        name: req.body.name,
        email: req.body.email,
        password: encryptPassword,
    });
    
    //save user
    try{
        const savedUser = await user.save();
        res.status(201).send({user: user._id});
    }catch(err){
        res.status(400).send(err);
    }
});

module.exports = router;