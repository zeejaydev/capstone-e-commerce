import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/Product.css";
import { addItem } from "../slices/cartSlice";
import { show } from "../slices/cartPopSlice";
import { useDispatch } from "react-redux";
import FloatingCart from "../components/FloatingCart";

const Product = () => {
    const { id } = useParams()
    const [item,setItem] = useState()
    const dispatch = useDispatch()
    const env = process.env.NODE_ENV === "development" ? "http://localhost:3000":""

    useEffect(()=>{
        fetch(`${env}/api/get/${id}`)
        .then(resp=>resp.json())
        .then(data=>setItem(data))
        .catch(e=>console.log(e))
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        <div className="container">
            {item&&item.map((prod,i)=>(<div key={i} className="product">
                <div className="product-img">
                    <img src={prod.image} alt="pic" />
                </div>
                <div className="product-info">
                    <div>
                        <h2>{prod.title}</h2>
                        <h2>${prod.price}</h2>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque ad officia illo nostrum, 
                            commodi et tempore autem dolor dolore exercitationem recusandae quia nihil consectetur 
                            ipsum dolorem voluptatibus deleniti. Iste, fuga.
                        </p>
                    </div>
                    <button onClick={()=>{
                        dispatch(addItem(prod))
                        dispatch(show())
                    }}>ADD TO CART</button>
                </div>
            </div>))}
            <FloatingCart size={30} color='white'/>
        </div>
    );
}

export default Product;
