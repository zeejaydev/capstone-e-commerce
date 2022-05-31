import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/Product.css"
import { addItem } from "../slices/cartSlice"
import { useDispatch } from "react-redux";

const Product = () => {
    const { id } = useParams()
    const [item,setItem] = useState()
    const dispatch = useDispatch()

    useEffect(()=>{
        fetch(`/api/get/${id}`)
        .then(resp=>resp.json())
        .then(data=>setItem(data))
        .catch(e=>console.log(e))
        
    },[])
    console.log(item)
    return (
        <div className="product-container">
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
                    <button onClick={()=>dispatch(addItem(prod))}>ADD TO CART</button>
                </div>
            </div>))}
        </div>
    );
}

export default Product;
