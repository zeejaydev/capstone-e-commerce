import Slider from "../components/slider/Slider";
import "../css/Home.css";
import MenImg from "../assets/images/men.jpg";
import WomenImg from "../assets/images/women2.jpg";
import AccImg from "../assets/images/acc.jpg";
import KidsImg from "../assets/images/kids.jpg";
import { BsEnvelope } from "react-icons/bs";
import { Link } from "react-router-dom";

const Home = ()=>{
    const cats = [
        {
            title:'men',
            bg: MenImg,
        },
        {
            title:'women',
            bg:WomenImg,
        },
        {
            title:'accessories',
            bg:AccImg,
        },
        {
            title:'kids',
            bg:KidsImg,
        },
    ]
    return(
        <>
            <Slider/>
            <div className="categories">
                <h2>Editor's Pick</h2>
                <p>Problems trying to resolve the conflict between</p>
                <div className="categories-container">
                    {cats.map((cat, i) => (<div key={i} className={cat.title}><img src={cat.bg} alt="mens" className="cat-image" /><Link className="cat-button" to={`/${cat.title}`}>{cat.title}</Link></div>))}
                </div>
            </div>
            <div className="deal">
                <div className="email-capture">
                    <h3>Get the Best Deals</h3>
                    <h1>join our list</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, !</p>
                    <div className="email-input">
                        <BsEnvelope color="black" className="email-icon"/>
                        <input type="text" placeholder="Your Email" className="email-capture-input"/>
                    </div>
                    <div className="subscribe-btn">subscribe</div>
                </div>
            </div>
            
        </>
    )
}
export default Home;

