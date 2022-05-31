import "../css/Login.css";
import {AiOutlineMail,AiTwotoneLock} from "react-icons/ai"
const Login = () => {
    return (
        <div className="login-container">
            <div className="login-page">
                <h2>Login / Register</h2>
                <div style={{position:'relative',width: '90%'}}>   
                    <input type="text" placeholder="Email"/>
                    <AiOutlineMail size={20}/>
                </div>   
                <div style={{position:'relative',width: '90%'}}>
                    <input type="password" placeholder="Password"/>
                    <AiTwotoneLock size={20} />
                </div>
                <button>sign in</button>
                <button>sign up</button>
            </div>                  
        </div>
    );
}

export default Login;
