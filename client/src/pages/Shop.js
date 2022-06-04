import "../css/Shop.css";
import { Link } from "react-router-dom";
import { useEffect,useState } from "react";
import { ReactComponent as Icon } from "../assets/images/icons/loading.svg";
import FloatingCart from "../components/FloatingCart";


const Shop = () => {
    const [prods,setProds] = useState([]);
    const [filter,setFilter] = useState('');
    const [loading,setLoading] = useState(false);
    const [reset,setReset] = useState(true);
    const env = process.env.NODE_ENV === "development" ? "http://localhost:3000":""

    useEffect(() => {
        setLoading(true)
        fetch(`${env}/api/allProducts`)
            .then(res=>res.json())
            .then(data=>{
                setProds(data)
                setLoading(false)
            }).catch(e=>{
                console.log(e)
                setLoading(false)
            })
    }, [reset,env]);
    
    useEffect(()=>{
        setLoading(true)
        if(filter==='')return
        fetch(`${env}/api/sortProducts/${filter}`)
            .then(res=>res.json())
            .then(data=>{
                setProds(data)
                setLoading(false)
            }).catch(e=>{
                console.log(e)
                setLoading(false)
            })
    },[filter,env])

    const handleReset = ()=>{
        setReset(!reset)
        setFilter('')
    }

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
                    <div className="filter-container">
                        <select defaultValue={filter?filter:"Choose a categorie"} className="select-cat" onChange={(e)=>setFilter(e.target.value)}>
                            <option value="Choose a categorie" disabled >Choose a categorie</option>
                            <option value="men">Men</option>
                            <option value="women">Women</option>
                            <option value="kids">Kids</option>
                            <option value="accessories">Accossiories</option>
                        </select>
                        <button className="filter-btn" onClick={handleReset}>RESET</button>
                    </div>
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
    )
}
export default Shop;