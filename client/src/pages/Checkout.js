import React from 'react';
import "../css/Checkout.css";
import { AiOutlineDelete, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useSelector,useDispatch } from "react-redux";
import { ReactComponent as Amex } from "../assets/images/icons/amex.svg";
import { ReactComponent as Discover } from "../assets/images/icons/discover.svg";
import { ReactComponent as Mc } from "../assets/images/icons/mc.svg";
import { ReactComponent as Visa } from "../assets/images/icons/visa.svg";
import { ReactComponent as Apple } from "../assets/images/icons/apple.svg";
import { deleteItem, increment, decrement } from "../slices/cartSlice";
const cards = [<Amex/>,<Discover/>,<Mc/>,<Visa/>,<Apple/>]
const Checkout = () => {
    const products = useSelector(state=>state.cart);
    const dispatch = useDispatch();
    const subTotal = products.total
    const tax = subTotal * 8.35/100
    const total = subTotal + tax

    return (
        <div className='container'>
            <h1 style={{textAlign:'center'}}>Shopping Cart</h1>
            {products.items.length>0?
            <div className='checkout-container'>
                <div className='checkout-items'>
                    {products.items.map((item,i)=>(<div key={i} className='item'>
                    <div className='item-col'>
                        <div className='item-img-container'>
                            <img src={`${item.image}`} alt={`${item.title}`} />
                        </div>
                        <div className='item-info'>
                            <div>
                                <h6>{item.title}</h6>
                                <p>{item.desc}</p>
                                <h6>${item.price}</h6>
                            </div>
                            <div className='counter-container'>
                                <AiOutlineMinus size={12} onClick={()=>dispatch(decrement(item))}/>{item.count}<AiOutlinePlus size={12} onClick={()=>dispatch(increment(item))}/>
                            </div>
                        </div>
                    </div>
                    <div className='delete-item'>
                        <AiOutlineDelete size={17} onClick={()=>dispatch(deleteItem(item))}/>
                    </div>
                    </div>))}
                </div>
                <div className='checkout-side-bar'>
                    <div>
                        <h3>Checkout</h3>
                        <hr />
                        <div className='checkout-content'>
                            <h6>sub total</h6>
                            <h6>${subTotal.toFixed(2)}</h6>
                        </div>
                        <div className='checkout-content'>
                            <h6>tax</h6>
                            <h6>${tax.toFixed(2)}</h6>
                        </div>
                        <hr />
                        <div className='checkout-content'>
                            <h6>total</h6>
                            <h6>${total.toFixed(2)}</h6>
                        </div>
                    </div>
                    <div className='checkout-button'>
                    Checkout
                    </div>
                    <span>we accept</span>
                    <ul>
                        {cards.map((icon,i)=>(<li key={i}>{icon}</li>))}
                        
                    </ul>
                </div>
            </div>
            :
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                <h1>Your Cart is Empty</h1>
            </div>

            }
        </div>
    );
}

export default Checkout;
