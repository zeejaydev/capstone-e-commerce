import { AiFillShopping } from "react-icons/ai";
import "./FloatingCart.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const FloatingCart = ({size,color}) => {
    const cartItems = useSelector((state) => state.cart.count)
    return (
        <Link to={'/checkout'}><div className="floating-cart-container">
            {cartItems>0&&<div className="cart-count">{cartItems}</div>}
            <AiFillShopping size={size} color={color} />
            </div>
        </Link>
    );
}

export default FloatingCart;
