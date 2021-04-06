const router=require('express').Router();
const Code=require('../models/code');
const verify=require('../middlewares/verifyToken');
const objectid=require('../validation/objectid');
//save a entry
router.post('/',verify,async(req,res)=>{
    //console.log(req.body);
    const {html,css,js,title} = req.body;
    const code =new Code({
        html:html,
        js:js,
        css:css,
        title:title,
        userid:req.user
    });
    try{
        const saveCode=await code.save();
        res.status(201).send({code:code._id});
    }catch(err){
        res.status(400).send({"message":"Error in Post"});
    }
});

//get all entry
router.get('/',verify,async(req,res)=>{
    await Code.find({userid:req.user},['title','_id'],function(err,doc){
        console.log(doc);
        if(err) return res.status(400).send({"message":"Error in Get All"});
        else res.status(201).send(doc);
    });
})

//get specific id
router.get('/:id',verify,async(req,res)=>{
    if(objectid(req.params.id)===false)
    return res.status(404).send({"message":"Not Found"});

    await Code.findOne({_id:req.params.id, userid:req.user},function(err,doc){
        if(err) return res.status(400).send({"message":"Error in get"});
        else if(doc===null) return res.status(404).send({"message":"Not Found"});
        else res.status(201).send(doc);
    });
});

//update
router.put('/:id',verify,async(req,res)=>{
    await Code.findOneAndUpdate({_id:req.params.id, userid:req.user},req.body,{new: true, useFindAndModify:false},function(err,doc){
        if(err) return res.status(400).send({"message":"Error in put"});
        else if(doc===null) return res.status(404).send({"message":"Not Found"});
        else res.status(200).send({"message":"Successful","data":{doc}});
    });
});

//delete
router.delete('/:id',verify,async(req,res)=>{
    await Code.findOneAndDelete({_id:req.params.id, userid:req.user},function(err,doc){
        console.log(doc);
        if(err) return res.status(400).send({"message":"Error in Delete"});
        else if(doc===null) return res.status(404).send({"message":"Not Found"});
        else return res.status(200).send({"message":"Deleted"})
        
    });
});

module.exports = router;