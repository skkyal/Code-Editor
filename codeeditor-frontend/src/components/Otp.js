import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'

const Otp = ({email,setRegister}) => {
    const history = useHistory();

    const [otp, setOtp] = useState('');

    const onSubmit=async(e)=>{
        e.preventDefault();
        const req={email,otp};
        try{
        const res = await fetch('http://localhost:8000/user/register/otp',{
                method:'POST',
                headers:{
                'Content-type': 'application/json',
                },
                body: JSON.stringify(req)
            });
            if(res.ok){
                setRegister(false);
                history.push('/editor');
            }
            const data = await res.json();
            alert(data.message);
            console.log(data);
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
        </div>
    )
}

export default Otp
