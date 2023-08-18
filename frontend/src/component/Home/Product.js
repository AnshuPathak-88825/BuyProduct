import React from "react"
import { Link } from "react-router-dom"
import ReactStars from "react-rating-stars-component"
import "./Home.css"

const Product = ({ product }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: product.ratings,
    isHalf: true,
    size: window.innerWidth < 600 ? 13 : 20,
  };
  return (
    <Link id="productCard" to={`products/${product._id}`}>
      <img src={product.image[0].url} />
      <p>{product.name}</p>
      <div>
        <ReactStars {...options} /> 
        <span>{product.numofReviews}Reviews</span>
      </div>
      <span>&#8377; {product.price}</span>

    </Link>
  );
};
export default Product;
