import React from "react";
import playstore from "../../../../images/playstore.png";
import AppStore from "../../../../images/Appstore.png";

import "./Footer.css"

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUT APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playstore} alt="playstore"/>
        <img src={AppStore} alt="appstore"/>

      </div>
      <div className="midFooter">
        <h1>ECOMMERCE</h1>
        <p>High Quality is our first priority</p>
        <p>Copyrights 2023 &copy; AnshuPathak</p>
      </div>
      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.instagram.com/shubhanshusig/">instagram</a>
        <a href="https://twitter.com/Anshustwt">Twitter</a>
      </div>
    </footer>
  );
};
export default Footer;
