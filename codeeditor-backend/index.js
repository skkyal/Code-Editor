const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');

const app=express();
app.use(cors());
app.use(express.json());

app.use('/editor',require('./routes/editor'));

const port = process.env.PORT || "8000";

/*database connection*/
mongoose.connect('mongodb://localhost:27017/CodeEditor',{ useNewUrlParser: true, useUnifiedTopology: true });
const con = mongoose.connection;
con.on('open',function(){
    console.log('connected');
});

app.get('*',(req,res)=>{
    res.status(404).send();
})
app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})