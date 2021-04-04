import React,{useState} from 'react'

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    return (
        <div className="login-form-container">
            <form className="login-form">
                <input className="form-detail" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
                <input className="form-detail" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
                <button className="form-button" >Login</button>
                <p className="login-message">Not registered? <a href="/register">Create an account</a></p>
            </form>
        </div>
    )
}
export default LoginForm
