import React from 'react'

const LoginForm = () => {
    return (
        <div className="login-form-container">
            <form className="login-form">
                <input className="form-detail" type="text" placeholder="Email"/>
                <input className="form-detail" type="password" placeholder="Password"/>
                <button className="form-button" >Login</button>
                <p className="login-message">Not registered? <a href="/register">Create an account</a></p>
            </form>
        </div>
    )
}
export default LoginForm
