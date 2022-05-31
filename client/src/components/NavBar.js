import "./navbarStyles.css";
import { Link } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import { BiUser, BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";


const NavBar = ()=>{
    const [ show,setShow ] = useState(false);
    const dropMenu = useRef()
    const cartItems = useSelector((state) => state.cart.length)
    
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
                    <h1>BrandName</h1>
                </div>
                <div className='links'>
                    <ul>
                        <Link to='/' ><li>home</li></Link>
                        <Link to='/shop'><li>shop</li></Link>
                        {/* <li>about</li>
                    <li>contact</li> */}
                    </ul>
                </div>
                <div className='login'>
                    <ul>
                        <Link to='/login'><li><BiUser size={16} /> login / register</li></Link>
                        <Link to='/'><li><BsCart size={16} /> {cartItems} </li></Link>
                    </ul>
                </div>
                <div className="mobile-toggle">
                    {show ? <AiOutlineClose size={32} /> : <BiMenuAltRight size={32} onClick={() => setShow(!show)} />}
                </div>
            </nav>
        

            <div className={show ? "mobile-menu show" : "mobile-menu"} ref={dropMenu}>
                <ul>
                    <Link to='/' ><li>home</li></Link>
                    <Link to='/shop'><li>shop</li></Link>
                    <Link to='/login'><li>login / register</li></Link>
                </ul>
            </div>
        </>
    )
}
 export default NavBar;