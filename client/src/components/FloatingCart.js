import { AiFillShopping } from "react-icons/ai";
import "./FloatingCart.css";
import { useSelector } from "react-redux";

const FloatingCart = ({size,color}) => {
    const cartItems = useSelector((state) => state.cart.length)
    return (
        <div className="floating-cart-container">
            {cartItems>0&&<div className="cart-count">{cartItems}</div>}
            <AiFillShopping size={size} color={color} />
        </div>
    );
}

export default FloatingCart;
