import React from "react";

import "./Footer.css";

const Footer = () => {
  let year = new Date().getFullYear();

  return (
    <footer id="footer">
      <p>ReactGram &copy; {year}</p>
    </footer>
  );
};

export default Footer;
