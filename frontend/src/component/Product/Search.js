import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";
import MetaData from "../layout/MetaData";
export default function Search() {
  const [keyword, setkeyword] = useState("");
  const navigate = useNavigate();
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };
  return (
    <Fragment>
      <MetaData title="SEARCH A PRODUCT--ECOMMERCE"></MetaData>
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product"
          onChange={(e) => setkeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
      afdadsfasfasdfadsfasdf
    </Fragment>
  );
}
