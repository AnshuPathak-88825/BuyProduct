import React, { Fragment } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product";
const product = {
  name: "Blue Tshirt",
  image: [
    {
      url:
        "https://m.media-amazon.com/images/I/A13usaonutL._CLa%7C500%2C468%7C71el46eP1%2BL.png%7C0%2C0%2C500%2C468%2B0.0%2C0.0%2C500.0%2C468.0_AC_.png",
    },
  ],
  price: "Rs3000",
  _id: "a0",
};
const Home = () => {
  return (
    <Fragment>
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>Find amazing product below</h1>
        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>
      <h2 className="homeHeading">Featured Products</h2>
      <div className="container" id="container">
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />
        <Product product={product} />

      </div>
    </Fragment>
  );
};
export default Home;
