import React,{useState} from 'react'
import DropList from './DropList'
const Nav = ({onSave,onDelete,isDelete,isIcon}) => {
    const [navList, setNavList] = useState(false);
    return (
        <div className="navbar">
            <span>
                <i className="fas fa-code"></i>  
                <span> CodeEditor</span>
            </span>
            <span className="nav-option" onClick={()=>setNavList((prev)=>!prev)}>
                <span>{localStorage.getItem('auth-name')}  <i className="fas fa-angle-down"></i></span>
                {navList?<DropList />:null}
            </span>
            {
                isIcon?
                <span className="nav-button" >
                    <span className="nav-icons" onClick={()=>onSave()}>
                        <i className="fas fa-save" ></i>
                    </span>
                    {
                        isDelete?
                        <span className="nav-icons" onClick={()=>onDelete()}>
                            <i className="fas fa-trash-alt"></i>
                        </span>:null
                    }
                </span>:null
            }
            
        </div>
    )
}

export default Nav
