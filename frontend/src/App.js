import "./App.css";
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Header from "././component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import WebFont from "webfontloader";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Product from "./component/Product/Product";
import Search from "./component/Product/Search";


function App() {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products/:id" element={<ProductDetails />}></Route>
          <Route path="/products" element={<Product />}></Route>
          <Route path="/search" element={<Search />}></Route>

        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
