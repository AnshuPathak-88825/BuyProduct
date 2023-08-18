import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../../images/logo.png"
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineShoppingCart, AiOutlineSearch } from "react-icons/ai";


const Header = () => {
  return (
    <ReactNavbar
      burgerColorHover="#eb4034"
      burgerColor="black"
      logoWidth="20vmax"
      logoHoverSize="10px"
      logoHoverColor="#eb4034"
      link1Text="Home"
      link2Text="Products"
      link3Text="Contact"
      link4Text="About"
      link1Url="/"
      link2Url="/products"
      link3Url="/contact"
      link4Url="/about"
      link1Size="1.3vmax"
      link1Color="white"

      nav1justifyContent="flex-end"
      nav2justifyContent="flex-end"
      nav3justifyContent="flex-start"
      nav4justifyContent="flex-start"
      link1ColorHover="#eb4034"
      link1Margin="1vmax"
      logo={logo}
      profileIcon={true}
      ProfileIconElement={FaUserAlt} //userdefined
      cartIcon={true}
      CartIconElement={AiOutlineShoppingCart}
      searchIcon={true}
      SearchIconElement={AiOutlineSearch}
      cartIconMargin={"2vmax"}
      cartIconColorHover="#eb4034"
      profileIconColorHover="#eb4034"
      searchIconColorHover="#eb4034"
    />
  );
};

export default Header;
