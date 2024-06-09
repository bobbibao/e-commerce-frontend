import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { FaHeart } from "react-icons/fa6";
import { AiFillShopping } from "react-icons/ai";
import { FaSun } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa6";
import { FaWindowClose } from "react-icons/fa";

import "../styles/Header.css";
import { useDispatch, useSelector } from "react-redux";
import { changeMode } from "../features/auth/authSlice";
import { store } from "../store";
import axios from "axios";
import { clearWishlist, updateWishlist } from "../features/wishlist/wishlistSlice";

const Header = () => {
  const { amount } = useSelector((state) => state.cart);
  const { total } = useSelector((state) => state.cart);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [id, setId] = useState(localStorage.getItem("id"));
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.auth);

  const loginState = useSelector((state) => state.auth.isLoggedIn);


  const fetchWishlist = async () => {
    if(loginState){
      try {
        const getResponse = await axios.get(`http://localhost:8080/user/${localStorage.getItem("id")}`);
        const userObj = getResponse.data;
  
        store.dispatch(updateWishlist({userObj}));
        
       
      } catch (error) {
        console.error(error);
      }
    }else{
      store.dispatch(clearWishlist());
    }

  };


  useEffect(() => {
    setIsLoggedIn(loginState);

      fetchWishlist();
    
  }, [loginState]);

  return (
    <>
      <div className="topbar border-b border-gray-800">
        <ul>
          <li>
            {/* <FaHeadphones className="text-2xl max-sm:text-lg text-accent-content" />
            <span className="text-2xl max-sm:text-lg text-accent-content">
              +381 61/123-456
            </span> */}
          </li>
          <li>
            {/* <FaRegEnvelope className="text-2xl max-sm:text-lg text-accent-content" />{" "}
            <span className="text-2xl max-sm:text-lg text-accent-content">
              support@test.com
            </span> */}
          </li>
        </ul>
      </div>
      <div className="navbar  max-w-7xl mx-auto navbar-bottom-menu border-y border-gray-800">
        <div className="flex-1">
          <Link
            to="/"
            className="btn btn-ghost normal-case text-2xl "
            style={{ color: "rgb(252, 213, 53)" }}
          >
            <AiFillShopping />
            Clothing Shop
          </Link>
          <div className="container navlinks-container" style={{justifyContent: "flex-start", fontSize: 16, columnGap: 15}}>
            <NavLink className="text-accent-content navlink-hover " to="/" style={{padding: 10}}>
              Trang chủ
            </NavLink>
            <NavLink className="text-accent-content navlink-hover" to="/shop" style={{padding: 10}}>
              Sản phẩm
            </NavLink>
          </div>
        </div>
        <div className="flex-none ">
          <Link
            to="/search"
            className="btn btn-ghost btn-circle text-accent-content"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </Link>
          {!isLoggedIn && (
            <>
              <Link to="/login" style={{padding: "8px 12px", color: "rgb(234, 236, 239)", backgroundColor: "#2B3139", borderRadius: "6px", marginInline: "5px", fontWeight: 500}} >
                Đăng nhập
              </Link>
              <Link to="/register" style={{padding: "8px 12px", color: "rgb(32, 38, 48)", backgroundColor: "rgb(252, 213, 53)", borderRadius: "6px", marginInline: "5px", fontWeight: 500}}>
                Đăng ký
              </Link>
            </>
          )}
          <button
            className="text-accent-content btn btn-ghost btn-circle text-xl"
            onClick={() => dispatch(changeMode())}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          <Link
            to="/wishlist"
            className="btn btn-ghost btn-circle text-accent-content"
          >
            <FaHeart className="text-xl" />
          </Link>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </label>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg text-accent-content">
                  {amount} Sản phẩm
                </span>
                <span className="text-info text-accent-content">
                  Tổng tiền: VNĐ{total.toFixed(2)}
                </span>
                <div className="card-actions">
                  <Link
                    to="/cart"
                    className="btn bg-blue-600 btn-block text-white hover:bg-blue-500 text-base-content"
                    style={{padding: "8px 12px", color: "rgb(32, 38, 48)", backgroundColor: "rgb(252, 213, 53)", marginInline: "5px", fontWeight: 500}}
                  >
                    Xem giỏ hàng
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {isLoggedIn && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="https://xsgames.co/randomusers/avatar.php?g=male" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link
                    to="/user-profile"
                    className="justify-between text-accent-content"
                  >
                    Trang cá nhân
                  </Link>
                </li>
                <li>
                  <Link to="/order-history" className="text-accent-content">
                    Lịch sử đơn hàng
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="text-accent-content">
                    Đăng xuất
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* <div className="navbar-bottom-menu border-y border-gray-800">
        <div >
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
  
            <label htmlFor="my-drawer" className="btn drawer-button">
              <HiMiniBars3BottomLeft className="text-4xl" />
            </label>
          </div>
          <div className="drawer-side z-10">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
                    
              <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content mt-4">
              <label htmlFor="my-drawer" className="btn drawer-button">
                <FaWindowClose className="text-3xl ml-auto" />
              </label>
              <li className="text-xl">
                <NavLink activeClassName="active" className="text-accent-content" to="/">
                  Home
                </NavLink>
              </li>
              <li className="text-xl">
                <NavLink activeClassName="active" className="text-accent-content" to="/shop">
                  Shop
                </NavLink>
              </li>
              <li className="text-xl">
                <NavLink activeClassName="active" className="text-accent-content" to="/about-us">
                  About us
                </NavLink>
              </li>
              <li className="text-xl">
                <NavLink activeClassName="active" className="text-accent-content" to="/contact">
                  Contact
                </NavLink>
              </li>
              {!isLoggedIn && (
                <>
                  <li className="text-xl">
                    <NavLink activeClassName="active" className="text-accent-content" to="/login">
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        <div className="container text-2xl navlinks-container">
          
          <NavLink className="text-accent-content" to="/about-us">
            About us
          </NavLink>
          <NavLink className="text-accent-content" to="/contact">
            Contact
          </NavLink>
          {!isLoggedIn && (
            <>
              <NavLink className="text-accent-content" to="/login">
                Đăng nhập
              </NavLink>
              <NavLink className="text-accent-content" to="/register">
                Đăng ký
              </NavLink>
            </>
          )}
        </div>
      </div> */}
    </>
  );
};

export default Header;
