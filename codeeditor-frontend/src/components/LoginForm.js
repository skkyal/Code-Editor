import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'

const LoginForm = ({email,setEmail,setRegister}) => {
    const history = useHistory();
    const [password, setPassword] = useState('');

    const onSubmit=async(e)=>{
        e.preventDefault();
        const req={email,password}
        try{
        const res = await fetch('http://localhost:8000/user/login',{
                method:'POST',
                headers:{
                'Content-type': 'application/json',
                },
                body: JSON.stringify(req)
            });
            
            const data = await res.json();
            if(res.ok){
                if(data.message)
                setRegister(true);
                else{
                    history.push('/user');
                    localStorage.setItem('auth-token',data.token);
                }
            }
            console.log(data);
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className="login-form-container">
            <form className="login-form">
                <input className="form-detail" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
                <input className="form-detail" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
                <button className="form-button" onClick={onSubmit} >Login</button>
                <p className="login-message">Not registered? <a href="/register">Create an account</a></p>
            </form>
        </div>
    )
}
export default LoginForm
