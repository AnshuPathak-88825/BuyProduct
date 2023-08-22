import React, { Fragment, useEffect, useState } from "react";
import "./Product.css";
import { Selector, useDispatch, useSelector } from "react-redux";
import { getProduct, clearError } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { Slider, Typography } from "@material-ui/core";

export default function Product() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const {
    products,
    loading,
    error,
    productsCount,
    ResultPerpage,
    filteredProductsCount,
  } = useSelector((state) => state.products);
  const { keyword } = useParams();
  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, price));
  }, [dispatch, keyword, currentPage, price]);
  
  let count = filteredProductsCount;
  const setCurrentPageNo = (e) => {
    console.log(e);
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    event.preventDefault(); // Prevent default behavior
    setPrice(newPrice);
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <h2 className="productHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              defaultValue={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              getAriaLabel={() => "Slider Label"}
              min={0}
              max={25000}
            />
          </div>
          {ResultPerpage == count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={ResultPerpage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}
