import React, { useState } from 'react'
import {Link} from 'react-router-dom'

const RegisterForm = ({setRegister,email,setEmail}) => {
    const [name,setName] = useState('');
    const [password, setPassword] = useState('');
    const [valid,setValid] = useState(false);

    const onSubmit=async(e)=>{
        e.preventDefault();
        const req={name,email,password}
        try{
        const res = await fetch(process.env.REACT_APP_BACKEND_URL+'/user/register',{
                method:'POST',
                headers:{
                'Content-type': 'application/json',
                },
                body: JSON.stringify(req)
            });
            
            //const data = await res.json();
           // console.log(data);
            if(res.ok){
                setRegister(true);
            }
            else {
               // alert(data.message);
               setValid(true);
            }
        }catch(err){
            console.log(err);
        }
    }
    return (
        <div className="login-form-container">
            <form className="login-form">
                <input className="form-detail" type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name" />
                <input className="form-detail" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
                <input className="form-detail" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
                <button className="form-button" onClick={onSubmit}>Register</button>
                <p className="login-message">Have account? <Link to="/login">Log In</Link></p>
            </form>
            {   
                valid?
                <div style={{color:'red',fontSize:'14px'}}>
                    <div>Password length should be atleast 6</div>
                    <div>Name and Email Cannot be Empty</div>
                    <div>Email should be unique</div>
                </div>:null
            }
            
        </div>
    )
}

export default RegisterForm
