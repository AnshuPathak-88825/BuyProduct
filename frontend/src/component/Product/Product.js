import React, { Fragment, useEffect, useState } from "react";
import "./Product.css";
import { Selector, useDispatch, useSelector } from "react-redux";
import { getProduct, clearError } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";

export default function Product() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
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
    dispatch(getProduct(keyword, currentPage));
  }, [dispatch, keyword, currentPage]);
  let count = filteredProductsCount;
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
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
