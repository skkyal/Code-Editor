import React from 'react'
import {Link,useHistory} from 'react-router-dom'

const DropList = () => {
    const history=useHistory();
    const click=()=>{
        localStorage.removeItem('auth-token');
        history.push('/login');
    }
    return (
        <div className="dropdown-content">
            <Link to="/user" style={{textDecoration:'none',color:'black'}}><div>My Codes</div></Link>
            <div onClick={click}>Logout</div>
        </div>
    )
}

export default DropList
