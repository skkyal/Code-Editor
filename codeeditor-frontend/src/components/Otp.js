import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'

const Otp = ({email,setRegister}) => {
    const history = useHistory();

    const [otp, setOtp] = useState('');
    const [valid,setValid] = useState(false);

    const onSubmit=async(e)=>{
        e.preventDefault();
        const req={email,otp};
        try{
        const res = await fetch(process.env.REACT_APP_BACKEND_URL+'user/register/otp',{
                method:'POST',
                headers:{
                'Content-type': 'application/json',
                },
                body: JSON.stringify(req)
            });
            //const data = await res.json();
            //alert(data.message);
            if(res.ok){
                setRegister(false);
                history.push('/user');
            }
            else{
                setValid(true);
            }
            
        }catch(err){
        console.log(err);
        }
    }
    return (
        <div className="login-form-container">
            <form className="login-form">
                <input className="form-detail" type="text" value={otp} onChange={(e)=>setOtp(e.target.value)} placeholder="Enter OTP" />
                <button className="form-button" onClick={onSubmit} >Submit</button>
            </form>
            { valid?<div style={{color:'red',fontSize:'14px'}}>Enter Valid OTP</div>:null }
        </div>
    )
}

export default Otp
