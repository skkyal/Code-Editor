const router=require('express').Router();
const Code=require('../models/code');

router.post('/',async(req,res)=>{
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

router.get('/:id',async(req,res)=>{
    await Code.findOne({_id:req.params.id},function(err,doc){
        if(err) return res.status(400).send({"message":"Error"});
        else if(doc==null) return res.status(404).send();
        else res.status(201).send(doc);
    });
});


router.put('/:id',async(req,res)=>{
    await Code.findByIdAndUpdate(req.params.id,req.body,{new: true, useFindAndModify:false},function(err,doc){
        if(err) return res.status(400).send({"message":"Error"});
        else if(doc==null) return res.status(404).send();
        else res.status(200).send({"message":"Successful","data":{doc}});
    });
});

module.exports = router;