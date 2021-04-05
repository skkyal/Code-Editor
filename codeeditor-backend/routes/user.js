const router=require('express').Router();
const User=require('../models/user');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const {loginValidation,registerValidation} =require('../validation/validation');
const otpGenerate = require('../validation/otpgenerate');

let otp;
let email;

router.post('/login', async (req,res)=>{
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

    if(user.verified===false){
        otp=otpGenerate(req.body.email);
        return res.send({'message':'otp'});
    }

    //create and assign token
    const name=user.name;
    const token= jwt.sign({_id : user._id },process.env.TOKEN_SECRET,{ expiresIn: '1h' });
    res.header('auth-token',token).send(JSON.stringify({token,name}));
});
    
router.post('/register/otp',async(req,res)=>{
 //   if(email!== req.body.email) return res.sendStatus(400).send({"message":"Error"});

    const user = await User.findOne({ email: req.body.email});
    if(!user) return res.sendStatus(400).send({"message":"Error"});
    else if(otp==req.body.otp) {
        await User.findOneAndUpdate({email:req.body.email},{$set:{verified:true}},{new: true, useFindAndModify:false},function(err,doc){
            if(err) return res.status(400).send({"message":"Error"});
            else if(doc==null) return res.status(400).send({"message":"Error"});
            else res.status(200).send({"message":"OTP Verified"});
        });
    } 
    else{ return res.status(400).send({"message":"Enter Valid OTP"});}
});

router.post('/register',async(req,res)=>{
    //validation
    const {error} = registerValidation(req.body);
    if(error) {
        const message = error.details[0].message;
        return res.status(400).send(JSON.stringify({message}));
    }

    try{
        const check = await User.findOne({email: req.body.email});
        if(check) return res.status(400).send({"message":"Email Already Exists"});
    }catch(err){
        console.log(err);
        return res.sendStatus(400).send({"message":"Error"}); 
    }


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
        console.log(user);
        const savedUser = await user.save();
       // email=res.body.email;
        otp=otpGenerate(req.body.email);


        return res.status(201).send({user: user._id});
    }catch(err){
        return res.status(400).send(err);
    }
});

module.exports = router;