import "../css/Login.css";
import {AiOutlineMail,AiTwotoneLock} from "react-icons/ai"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../components/modal/Modal";

const Login = () => {
    const [fieldValues,setFieldValues] = useState({})
    const navigate = useNavigate();
    const [errorMessage,setErrorMessage] = useState({show:false,errorMessage:''})
    const handleEmailChange = (e)=>{
        const value = e.target.value;
        setFieldValues({...fieldValues,email:value})
    }
    const handlePasswordChange = (e)=>{
        const value = e.target.value;
        setFieldValues({...fieldValues,password:value})
    }
    const env = process.env.NODE_ENV === "development" ? "http://localhost:3000":""
    const handleSignIn= ()=>{
        if(!fieldValues.email){
            return setErrorMessage({show:true,errorMessage:"email is required"})
        }
        if(!fieldValues.password){
            return setErrorMessage({show:true,errorMessage:'password is required'})
        }
        fetch(`${env}/api/signin`,{
           method:'POST',
           headers:{ 'Content-Type':'application/json'},
           redirect:'follow',
           body:JSON.stringify(fieldValues)
        }).then(res=>res.json()).then(data=>{
            if(data.error){
                setErrorMessage({show:true,errorMessage:data.error})
                return
            }
            if(data){
                sessionStorage.setItem('id',`${data.id}`)
                navigate("/")
            }
        })
    }
    const handleSignUp= ()=>{
        console.log(fieldValues)
        if(!fieldValues.email){
            return setErrorMessage({show:true,errorMessage:"email is required"})
        }
        if(!fieldValues.password){
            return setErrorMessage({show:true,errorMessage:'password is required'})
        }
        fetch(`${env}/api/signup`,{
           method:'POST',
           headers:{ 'Content-Type':'application/json'},
           redirect:'follow',
           body:JSON.stringify(fieldValues)
        }).then(res=>res.json()).then(data=>{
            if(data.error){
                return setErrorMessage({show:true,errorMessage:data.error})   
            }else{
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
                <button onClick={handleSignUp}>sign up</button>
            </div>
            <Modal title={'Error'} message={errorMessage.errorMessage} show={errorMessage.show} setShow={()=>setErrorMessage({show:false,errorMessage:''})}/>                  
        </div>
    );
}

export default Login;
