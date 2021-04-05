const router=require('express').Router();
const Code=require('../models/code');
const verify=require('../middlewares/verifyToken')
//save a entry
router.post('/',verify,async(req,res)=>{
    //console.log(req.body);
    const {html,css,js} = req.body;
    const code =new Code({
        html:html,
        js:js,
        css:css
    });
    try{
        const saveCode=await code.save();
        res.status(201).send({code:code._id});
    }catch(err){
        res.status(400).send({"message":"Error"});
    }
});
//get all entry
router.get('/',verify,async(req,res)=>{
    await Code.find({},function(err,doc){
        if(err) return res.status(400).send({"message":"Error"});
        else res.status(201).send(doc);
    });
})

//get specific id
router.get('/:id',verify,async(req,res)=>{
    await Code.findOne({_id:req.params.id},function(err,doc){
        if(err) return res.status(400).send({"message":"Error"});
        else if(doc==null) return res.status(404).send();
        else res.status(201).send(doc);
    });
});

//update
router.put('/:id',verify,async(req,res)=>{
    await Code.findByIdAndUpdate(req.params.id,req.body,{new: true, useFindAndModify:false},function(err,doc){
        if(err) return res.status(400).send({"message":"Error"});
        else if(doc==null) return res.status(404).send();
        else res.status(200).send({"message":"Successful","data":{doc}});
    });
});

module.exports = router;