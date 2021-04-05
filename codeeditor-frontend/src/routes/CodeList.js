import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import Nav from '../components/Nav'


const CodeList = () => {
    const history=useHistory();
    const [list, setlist] = useState([]);

    useEffect(() => {
        if(localStorage.getItem('auth-token')===null){
            history.push('/login');
        }
    }, [history]);
    
    useEffect(() => {
       const fetchList = async()=>{
           try{
               const res=await fetch('http://localhost:8000/editor',{
                    method:'GET',
                    headers:{
                    'Content-type': 'application/json',
                    'auth-token':localStorage.getItem('auth-token')
                    }
                });
                const data = await res.json();
                if(res.ok) setlist(data);
                else{
                    if(data.message==="Invalid Token")
                    history.push('/login');
                    localStorage.removeItem('auth-token');
                }
                console.log(data);
           }catch(err){
               console.log(err);
           }
       }
       fetchList(); 
    }, [history])
    return (
        <div>
            <Nav />
            <ul>
               {list.map((item)=><li key={item._id} ><Link to ={`/user/${item._id}`} >{item._id}</Link></li>)}
               <li><Link to="/editor" >New</Link></li>
            </ul>
        </div>
    )
}

export default CodeList
