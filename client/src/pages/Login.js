import "../css/Login.css";
import {AiOutlineMail,AiTwotoneLock} from "react-icons/ai"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [fieldValues,setFieldValues] = useState({})
    const navigate = useNavigate();

    const handleEmailChange = (e)=>{
        const value = e.target.value;
        setFieldValues({...fieldValues,email:value})
    }
    const handlePasswordChange = (e)=>{
        const value = e.target.value;
        setFieldValues({...fieldValues,password:value})
    }
    const handleSignIn= ()=>{
        fetch('/api/signin',{
           method:'POST',
           headers:{ 'Content-Type':'application/json'},
           redirect:'follow',
           body:JSON.stringify(fieldValues)
        }).then(res=>res.json()).then(data=>{
            if(data){
                sessionStorage.setItem('id',`${data.id}`)
                navigate("/")
            }
        })
    }
    
    return (
        <div className="login-container">
            <div className="login-page">
                <h2>Login / Register</h2>
                <div style={{position:'relative',width: '90%'}}>   
                    <input type="text" placeholder="Email" onChange={handleEmailChange}/>
                    <AiOutlineMail size={20}/>
                </div>   
                <div style={{position:'relative',width: '90%'}}>
                    <input type="password" placeholder="Password" onChange={handlePasswordChange}/>
                    <AiTwotoneLock size={20} />
                </div>
                <button onClick={handleSignIn}>sign in</button>
                <button>sign up</button>
            </div>                  
        </div>
    );
}

export default Login;
