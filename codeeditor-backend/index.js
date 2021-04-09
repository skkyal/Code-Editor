const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');

const app=express();
app.use(cors());
app.use(express.json());
require('dotenv').config();

app.use('/editor',require('./routes/editor'));
app.use('/user',require('./routes/user'));

const port = process.env.PORT || "8000";

/*database connection*/
mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true });
const con = mongoose.connection;
con.on('open',function(){
    console.log('Database Connected');
});

app.get('*',(req,res)=>{
    res.status(404).send();
})

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
})