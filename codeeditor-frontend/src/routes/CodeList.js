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
        else{
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
                        alert('You are Logged out. Please Log In again');
                    }
                // console.log(data);
            }catch(err){
                console.log(err);
            }
        }
        fetchList(); 
      }
    }, [history]);

    const create=(e)=>{
        e.preventDefault();
        history.push('/editor');
    }

    const getTitle=(data)=>{
        if(data.length<=20) return data;
        let a = data.substring(1,20);
        a=a+'...';
        return a;
    }

    return (
        <div>
            <Nav />
            <div>
                <div className="codelist-item-new" onClick={create} style={{cursor:'pointer'}}>
                    <span >
                        <i className ="fas fa-plus"></i>  New
                    </span>
                    
                </div>
                
                <div className="codelist-saved">Saved Codes</div>
                
               {    
                    list.length!==0?
                    <div className="codelist-list">
                    {list.map((item)=>
                        <Link to ={`/user/${item._id}`} key={item._id} style={{textDecoration:'none',color:'white'}}>
                            <div className="codelist-item" >
                                {getTitle(item.title)}
                            </div>
                        </Link>
                    )}
                    </div>:
                    <div className="codelist-item-message">No Saved Code</div>
                }
                
            </div>
        </div>
    )
}

export default CodeList

/*{
                        isTitle?
                        <span>
                            <input className="w70" type="text" placeholder="Enter Title" value={title} onChange={(e)=>setTitle(e.target.value)}></input>
                            <button onClick={create}>Create</button>
                        </span>:null
                    }
                    */
