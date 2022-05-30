import "./Footer.css";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Footer = ()=>{
    return(
        <div>
            <footer>
                <div className="social-media">
                    <h1>BrandName</h1>
                    <div className="social-media-container">
                        <FaFacebook color="#23A6F0" />
                        <FaInstagram color="#23A6F0" />
                        <FaTwitter color="#23A6F0" />
                    </div>
                </div>
            </footer>
            <div className="footer-links">
                <ul>
                    <h3>Company Info</h3>
                    <li>About Us</li>
                    <li>Carrier</li>
                    <li>Blog</li>
                </ul>
                <ul>
                    <h3>Legal</h3>
                    <li>About Us</li>
                    <li>Carrier</li>
                    <li>Blog</li>
                </ul>
                <ul>
                    <h3>Resources</h3>
                    <li>About Us</li>
                    <li>Carrier</li>
                    <li>Blog</li>
                </ul>
                <ul>
                    <h3>Get in Touch</h3>
                    <li className="get-in-touch">
                        <input type="text" className="get-in-touch-input" placeholder="Your Email"/>
                        <button className="get-in-touch-btn">Subscribe</button>
                    </li>
                </ul>
            </div>
            <div className="credit">
                <h3> &#169; zeejaydev.com</h3>
            </div>
        </div>
    )
}

export default Footer;