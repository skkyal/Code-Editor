const mongoose=require('mongoose');
const codeSchema = new mongoose.Schema({
    title:{type:String},
    html:{type:String},
    js:{type:String},
    css:{type:String},
    type:{type:Number}, /* 0-> Private 1->Public 2->shared with specific */
    userid:{type: mongoose.Schema.Types.ObjectId,ref: 'user'}
});

module.exports = mongoose.model('code',codeSchema);