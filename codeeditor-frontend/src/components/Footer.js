import React from 'react'

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-icons">
                <a style={{color:'white'}} target=".blank" href="https://github.com/skkyal"><i className="fab fa-github" style={{padding:'5px'}} ></i></a>
                <a style={{color:'white'}} target=".blank" href="https://www.linkedin.com/in/shlok-kyal-4923a0195/"><i className="fab fa-linkedin-in" style={{padding:'5px'}}></i></a>
            </div>
            <div className="footer-message">
                Developed with  <i className="fas fa-heart"></i>  by Shlok
            </div>
        </div>
    )
}

export default Footer