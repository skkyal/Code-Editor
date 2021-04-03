import React from 'react'
import Typewriter from '../components/Typewriter'
import RegisterForm from '../components/RegisterForm'
const Register = () => {
    const header="Code Editor";
    const msg="A platform to Code and Share it with friends."
    const speed=100;
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
            <RegisterForm />
        </div>
    )
}

export default Register
