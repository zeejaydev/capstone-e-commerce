import { useEffect, useState } from "react";
import "../css/Admin.css";
import { ReactComponent as Icon } from "../assets/images/icons/loading.svg";
import { AiOutlineDelete } from "react-icons/ai";
const env = process.env.NODE_ENV === "development" ? "http://localhost:3000":""

const Admin = () => {
    const tabs = ['Add Product','Delete Product','Update Product'];
    const [tabState,setTabState]=useState('Add Product');
    const [isDragging,setIsDragging] = useState(false);
    const [url,setUrl] = useState('');
    const [inputFields,setInpuFields] = useState({title:'',price:'',desc:'',categorie:''});
    const [loading,setLoading] = useState(false);
    const [prods,setProds] = useState([]);

    useEffect(()=>{
        fetch(`${env}/api/allProducts`)
        .then(res=>res.json())
        .then(data=>{
            setProds(data)
        }).catch(e=>{
            console.log(e)
        })
    },[tabState==='Delete Product'])

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
      };
    
      const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
      };
      const handleDrop=(e)=>{
        e.preventDefault();
        setIsDragging(false);
        const formData = new FormData();
        const file = e.dataTransfer.files[0];
        formData.append("file", file, file.name);

        if(file.type === "image/jpeg" || file.type==="image/png" || file.type==="image/jpg"){
            fetch(`/api/imageUpload`,{
                method: 'POST',
                body: formData,
             }).then(res=>res.json()).then(data=>{
                setUrl(`/api/uploads/${data.url}`)
             })
        }else{
            alert("file must be an image") 
        }
      }

      const handleTitleChange = (e)=>{
         const value = e.target.value
         setInpuFields({...inputFields,title:value}) 
      }
      const handleDescChange = (e)=>{
        const value = e.target.value
        setInpuFields({...inputFields,desc:value}) 
      }
      const handlePriceChange = (e)=>{
        const value = e.target.value.replace('$','')
        setInpuFields({...inputFields,price:value}) 
      }
      const handleCatChange = (e)=>{
        const value = e.target.value.toLowerCase()
        setInpuFields({...inputFields,categorie:value}) 
      }
      const handleSubmit = (e)=>{ 
        setLoading(true)
        const payload = {...inputFields,image:url}
        fetch(`${env}/api/createItem`,{
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body:JSON.stringify(payload)
        }).then(resp=>resp.json()).then(res=>{
            if(res){
                setLoading(false)
            }
        })
      }
      const handleDelete = (id)=>{ 
        fetch(`${env}/api/deleteItem/${id}`,{
            method:"DELETE"
        }).then(resp=>resp.json()).then(res=>{
            fetch(`${env}/api/allProducts`)
            .then(res=>res.json())
            .then(data=>{
                setProds(data)
            }).catch(e=>{
                console.log(e)
            })
        })
      }
    return (
        <div className="admin-container">
            <div className="side-nav">
                {tabs.map((tab,i)=>(<div key={i}>
                    <div onClick={()=>setTabState(tab)} className={`tab ${tabState===tab?"active":""}`}><h3>{tab}</h3></div>
                </div>))}
            </div>
            <div className="content">
                {
                    tabState === 'Add Product'?
                    <div>
                        <h1 style={{textAlign:'center'}}>Add Products</h1>
                        <div className="admin-tab-content">
                            <div className="admin-tab-inputs">
                                <label htmlFor="title">Title</label>
                                <input id="title" type="text" placeholder="Brown Pants" onChange={handleTitleChange}/>
                                <label htmlFor="disc">Description</label>
                                <textarea rows={5} id="disc" type="text" placeholder="Small item description" onChange={handleDescChange} />
                                <label htmlFor="price">Price</label>
                                <input id="price" type="text" placeholder="10.00" onChange={handlePriceChange}/>
                                <label htmlFor="category">Category</label>
                                <input id="category" type="text" placeholder="Men" onChange={handleCatChange}/>
                            </div>

                            <div className={`dropzone ${isDragging && "dropzone-hover"}`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                {url?<img src={url} alt="product"/>:<h3 style={{color:'#9d9d9d'}}>Drag an Image</h3>}
                            </div>
                       </div>
                       <div className="button-container">
                            <div onClick={handleSubmit} className="button-container-button">
                                {loading?<Icon stroke={"white"}/>:<h3>Add</h3>}
                            </div>
                       </div>
                    </div>
                    :tabState === 'Delete Product'?
                    <div>
                        <h1>Delete Products</h1>
                        {prods&&prods.map((item,i)=>(
                            <div key={i}>
                                <div className="admin-item">
                                    <div style={{display:'flex',gap:20,alignItems:'center',flex:.9}}>
                                        <div className="item-image">
                                            <img src={item.image} alt="" />
                                        </div>
                                        <h6>{item.title}</h6>
                                    </div>
                                    <AiOutlineDelete color="red" style={{cursor:'pointer'}} onClick={()=>handleDelete(item._id)}/>
                                </div>
                            </div>
                        ))}

                    </div>
                    :
                    <div>
                        <h1>update</h1>
                    </div>
                }
            </div>
        </div>
    );
}

export default Admin;
