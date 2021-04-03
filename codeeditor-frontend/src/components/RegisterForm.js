import React from 'react'

const RegisterForm = () => {
    return (
        <div className="login-form-container">
            <form className="login-form">
                <input className="form-detail" type="text" placeholder="Name" />
                <input className="form-detail" type="text" placeholder="Email"/>
                <input className="form-detail" type="password" placeholder="Password"/>
                <button className="form-button" >Register</button>
            </form>
        </div>
    )
}

export default RegisterForm
