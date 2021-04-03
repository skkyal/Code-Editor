import React from 'react'

const Nav = ({onSave}) => {
    return (
        <div className="navbar">
            <span>
                <i className="fas fa-code"></i>  
                <span> CodeEditor</span>
            </span>
            <button className="nav-button" onClick={()=>onSave()}>Save</button>
        </div>

    )
}

export default Nav
