import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import "./index.css"
import Footer from "./components/Footer";
import Product from "./pages/Product";
import Login from "./pages/Login";
import { store } from './store'
import { Provider } from "react-redux"
import Checkout from "./pages/Checkout";
function App() {
  return (
    <Router>
      <Provider store={store}>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/shop" element={<Shop/>}></Route>
          <Route path="/shop/product/:id" element={<Product/>}></Route>
          <Route path="/admin" element={<Product/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/checkout" element={<Checkout/>}></Route>
        </Routes>
        <Footer/>
      </Provider>
    </Router>
  );
}

export default App;
