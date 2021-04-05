import React from 'react'

const Nav = ({onSave,onDelete,isDelete,isIcon}) => {
    return (
        <div className="navbar">
            <span>
                <i className="fas fa-code"></i>  
                <span> CodeEditor</span>
            </span>
            {
                isIcon?
                <div className="nav-button" onClick={()=>onSave()}>
                    <span className="nav-icons">
                        <i className="fas fa-save" ></i>
                    </span>
                    {
                        isDelete?
                        <span className="nav-icons" onClick={()=>onDelete()}>
                            <i className="fas fa-trash-alt"></i>
                        </span>:null
                    }
                </div>:null
            }
        </div>
    )
}

export default Nav
