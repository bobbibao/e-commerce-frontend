import React from "react";
import { useSelector } from "react-redux";

const Footer = () => {
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded mt-10 max-md:px-0">
      <nav className="grid grid-flow-col max-sm:grid-flow-row gap-4">
        
      </nav>
      <nav>
        {/* <div className="grid grid-flow-col gap-4">
          <FaSquareXTwitter className="text-6xl max-sm:text-4xl text-accent-content" />
          <FaSquareFacebook className="text-6xl max-sm:text-4xl text-accent-content" />
          <FaSquareInstagram className="text-6xl max-sm:text-4xl text-accent-content" />
          <FaSquareYoutube className="text-6xl max-sm:text-4xl text-accent-content" />
        </div> */}
      </nav>
      <aside>
        <p className="text-1 max-sm:text-sm text-accent-content text-right">
          Copyright © 2023 - A part of right reserved by Kuzma Clothing & Shoes
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
