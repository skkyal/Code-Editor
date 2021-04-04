import React, { useState } from 'react'

const RegisterForm = () => {
    const [name,setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className="login-form-container">
            <form className="login-form">
                <input className="form-detail" type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name" />
                <input className="form-detail" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
                <input className="form-detail" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
                <button className="form-button" >Register</button>
            </form>
        </div>
    )
}

export default RegisterForm
