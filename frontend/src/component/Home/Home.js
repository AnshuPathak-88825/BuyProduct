import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import Product from "./Product";
import MetaData from "../layout/MetaData";
import { getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const a = useSelector((state) => state.products);
  const { error, loading, product} = a;
  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProduct());
  }, [dispatch, error]);
  return (
    <Fragment>
      {a.loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ECommerce"></MetaData>
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
            {a.products &&
              a.products.map((product, index) => {
                return <Product key={index} product={product} />;
              })}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default Home;
