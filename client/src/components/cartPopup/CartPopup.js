import React from 'react';
import "./CartPopup.css";
import { BsFillTriangleFill } from "react-icons/bs";
import { useSelector,useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { hide } from '../../slices/cartPopSlice';

const CartPopup = () => {
    const state = useSelector(state=>state.popup)
    const prods = useSelector(state=>state.cart.items)
    const dispatch = useDispatch()
    return (
        <>
        {state.show&&<BsFillTriangleFill color='#edf2f4' className='svg'/>}
        {state.show&&
        <div className={`popup-container`}>
            <div className='popup-inner'>
            {prods.length>0&&prods.map((item,i)=>(<div key={i} className='popup-item'>
                    <div className='popup-item-col'>
                        <div className='popup-item-img-container'>
                            <img src={`${item.image}`} alt={`${item.title}`} />
                        </div>
                        <div className='popup-item-info'>
                            <div>
                                <h6>{item.title}</h6>
                                <p>{item.desc}</p>
                            </div>
                             <h6>${item.price}</h6>
                        </div>
                    </div>
                    </div>))}
            </div>
        </div>}
        {state.show&&<div className='popout-buttons-container'>
                <div className='popout-buttons-container-button' onClick={()=>dispatch(hide())}>close</div>
                <Link to={'/checkout'} className='popout-buttons-container-button'>checkout</Link>
            </div>}
        </>
    );
}

export default CartPopup;
