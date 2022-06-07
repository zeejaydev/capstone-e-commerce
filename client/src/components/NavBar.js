import "./navbarStyles.css";
import { Link } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import { BiUser, BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import CartPopup from "./cartPopup/CartPopup";


const NavBar = ()=>{
    const [ show,setShow ] = useState(false);
    const dropMenu = useRef()
    const cartItems = useSelector((state) => state.cart)
    const email = useSelector((state) => state.user)
    const env = process.env.NODE_ENV === "development" ? "http://localhost:3000":""

    const [user,setUser] = useState(null)
    useEffect(()=>{
        const id = sessionStorage.getItem('id')
        if(id){
            fetch(`${env}/api/getUser/${id}`).then(resp=>resp.json()).then(res=>setUser(res))
        }
    },[env])

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (show && dropMenu.current && !dropMenu.current.contains(e.target) ) {
                setShow(!show)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [show])



    return(
        <>
            <nav>
                <div className='logo'>
                    <h1>House of Fashion</h1>
                </div>
                <div className='links'>
                    <ul>
                        <Link to='/'><li>home</li></Link>
                        <Link to='/shop'><li>shop</li></Link>
                        {/* <li>about</li>
                    <li>contact</li> */}
                    </ul>
                </div>
                <div className='login'>
                    <ul>
                        {user?<li>Welcome {user.email}</li>: email?<li>Welcome {email}</li>:<Link to='/login'><li><BiUser size={16} /> login / register</li></Link>}
                        <Link to='/checkout'><li><BsCart size={19} /> {cartItems.count} </li></Link>
                    </ul>
                    <CartPopup/>
                </div>
                <div className="mobile-toggle">
                    {show ? <AiOutlineClose size={32} /> : <BiMenuAltRight size={32} onClick={() => setShow(!show)} />}
                </div>
            </nav>
        

            <div className={show ? "mobile-menu show" : "mobile-menu"} ref={dropMenu}>
                <ul>
                    <Link to='/' onClick={()=>setShow(!show)}><li>home</li></Link>
                    <Link to='/shop' onClick={()=>setShow(!show)}><li>shop</li></Link>
                    <Link to='/login' onClick={()=>setShow(!show)}><li>login / register</li></Link>
                </ul>
            </div>
        </>
    )
}
 export default NavBar;