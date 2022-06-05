import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Icon } from "../assets/images/icons/loading.svg";
import FloatingCart from '../components/FloatingCart';

const Women = () => {
    const [prods,setProds] = useState([]);
    const [loading,setLoading] = useState(false);

    const env = process.env.NODE_ENV === "development" ? "http://localhost:3000":""

    useEffect(() => {
        setLoading(true)
        fetch(`${env}/api/sortProducts/women`)
            .then(res=>res.json())
            .then(data=>{
                setProds(data)
                setLoading(false)
            }).catch(e=>{
                console.log(e)
                setLoading(false)
            })
    }, [env]);

    return (
        <>
        { loading ?
            <div className="loading">
                <Icon/>
            </div>
            :
            <div className="container">
                <div className="filter-row">
                    <h3>Showing all {prods&&prods.length} results</h3>
                </div>
                <div className="products-container">
                    {prods&&prods.map((item,i)=>(<Link key={i} to={`/shop/product/${item._id}`}>
                        <div className="product-container">
                            <img src={item.image} alt="pic" />
                            <h4>{item.title}</h4>
                            <p>{item.desc}</p>
                            <h5>${item.price}</h5>
                        </div>
                    </Link>))}
                </div>
                <FloatingCart size={30} color='white'/>
            </div>
        }
        </>
    );
}

export default Women;
