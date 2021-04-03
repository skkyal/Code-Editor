const mongoose=require('mongoose');
const codeSchema = new mongoose.Schema({
    html:{type:String},
    js:{type:String},
    css:{type:String}
});

module.exports = mongoose.model('code',codeSchema);