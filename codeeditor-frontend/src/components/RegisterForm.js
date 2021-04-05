import React, { useState } from 'react'

const RegisterForm = ({setRegister,email,setEmail}) => {
    const [name,setName] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit=async(e)=>{
        e.preventDefault();
        const req={name,email,password}
        try{
        const res = await fetch('http://localhost:8000/user/register',{
                method:'POST',
                headers:{
                'Content-type': 'application/json',
                },
                body: JSON.stringify(req)
            });
            if(res.ok)
            setRegister(true);
            const data = await res.json();
            console.log(data);
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
            </form>
        </div>
    )
}

export default RegisterForm
