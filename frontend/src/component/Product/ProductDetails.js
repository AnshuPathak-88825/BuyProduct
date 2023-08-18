import React, { Fragment, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../actions/productAction";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import Loader from "../layout/Loader/Loader";

export default function ProductDetails() {
  const a = useSelector((state) => state.productallDetail);

  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);
  const { error, loading, product } = a;
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: product.ratings,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };

  return (
    <Fragment>
      {(a.loading) ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="ProductDetails">
            <div>
              <Carousel>
                {product.image &&
                  product.image.map((i, key) => {
                    return (
                      <img
                        key={key}
                        src={i.url}
                        alt={`${i} Slide`}
                        className="CarouselImage"
                      />
                    );
                  })}
              </Carousel>
            </div>
            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span>{product.numofReviews}Reviews</span>
              </div>
              <div className="detailsBlock-3">
                <h1>&#8377; {product.price}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button>-</button>
                    <input value="1" type="number" />
                    <button>+</button>
                  </div>
                  {""}
                  <button>Add to Cart</button>
                </div>
                <p>
                  Status:{""}
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description :<p>{product.description}</p>
              </div>
              <button className="submitReview">submit Review</button>
            </div>
          </div>
          <h3 className="reviewsHeading">Reviews</h3>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review, key) => (
                  <ReviewCard review={review} key={key} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}
