import React from "react"
import { Link } from "react-router-dom"
import ReactStars from "react-rating-stars-component"
import "./Home.css"
const options = {
  edit: false,
  color: "rgba(20,20,20,0.1)",
  activeColor: "tomato",
  value: 2.5,
  isHalf: true,
  size: window.innerWidth < 600 ? 13 : 20,
};
const Product = ({ product }) => {
  return (
    <Link id="productCard" to={product._id}>
      <img src={product.image[0].url} />
      <p>{product.name}</p>
      <div>
        <ReactStars {...options} />
        <span>(256 Reviews)</span>
      </div>
      <span>{product.price}</span>

    </Link>
  );
};
export default Product;
