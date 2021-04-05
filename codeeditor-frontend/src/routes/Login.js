import React,{useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import Typewriter from '../components/Typewriter'
import LoginForm from '../components/LoginForm'
import Footer from '../components/Footer'
import Otp from '../components/Otp'

const Login = () => {
    const header="Code Editor";
    const msg="A platform to Code and Share it with friends."
    const speed=100;

    const [email, setEmail] = useState('');
    const [register, setRegister] = useState(false);

    const history=useHistory();

    useEffect(() => {
        if(localStorage.getItem('auth-token')){
            history.push('/user');
        }
    }, [history]);

    return (
        <div className="login-main">
            <span className="logo-top">
                <i className="fas fa-code"></i>  
                <span> CodeEditor</span>
            </span>
            <div> 
                <Typewriter content={header} classText="typewriter-header" initialTime={10} speed={speed} />
                <Typewriter content={msg} classText="typewriter-text" initialTime={header.length*speed} speed={speed} />
            </div>
            {register?<Otp setRegister={setRegister} email={email} />:<LoginForm setRegister={setRegister} email={email} setEmail={setEmail} />}
            <Footer/>
            
        </div>
    )
}

export default Login
