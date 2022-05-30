import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import "./index.css"
import Footer from "./components/Footer";
import Product from "./pages/Product";
function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/shop" element={<Shop/>}></Route>
        <Route path="/shop/product/:id" element={<Product/>}></Route>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
