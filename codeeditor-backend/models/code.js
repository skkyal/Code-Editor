const mongoose=require('mongoose');
const codeSchema = new mongoose.Schema({
    title:{type:String},
    html:{type:String},
    js:{type:String},
    css:{type:String},
    userid:{type: mongoose.Schema.Types.ObjectId,ref: 'user'}
});

module.exports = mongoose.model('code',codeSchema);