import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from "../../state/slices/userSlice";

import "./Header.css";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [dynamicTitle, setDynamicTitle] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());

      const response = await fetch(`http://localhost:8081/signout`, {
        method: "GET",
        credentials: "include", // Include credentials (cookies) with the request
      });
      const data = await response.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess());
    } catch (error) {
      dispatch(signOutUserFailure());
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
      />
      <Helmet>
        <link rel="icon" type="image/jpg" href="../assets/images/hotel.jpg" />

        <title>{`Travellers - ${dynamicTitle}`}</title>
      </Helmet>

      {/* <Link to="/profile">
            {currentUser ? (
              <img
                className="rounded-full h-7 w-7 object-cover"
                src=""
                alt="profile"
              />
            ) : (
              <li className=" text-slate-700 hover:underline">Sign In</li>
            )}
          </Link> */}

      <nav className="NavbarItem">
        <Link to="/" onClick={() => setDynamicTitle("Home")}>
          <h1>
            <span className="font-bold text-3xl">Travellers</span>
          </h1>
        </Link>
        <div className="MenuIcons" onClick={toggleMenu}>
          <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
        <ul className={isMenuOpen ? "Navmenu active" : "Navmenu"}>
          <li>
            <form className="bg-slate-100 p-1.5 border-2 border-grey rounded-xl flex ml-5 items-center">
              <input
                className="bg-transparent focus:outline-none w-20 sm:w-40"
                type="text"
                placeholder="Search..."
              />
              <button>
                <FaSearch />
              </button>
            </form>
          </li>
          <li>
            <Link
              className="NavLinks"
              to="/"
              onClick={() => setDynamicTitle("Home")}
            >
              <i className="fas fa-house"></i>Home
            </Link>
          </li>

          <li>
            <Link
              className="NavLinks"
              to="/destination"
              onClick={() => setDynamicTitle("Destination")}
            >
              Destination
            </Link>
          </li>

          <li>
            <Link
              className="NavLinks"
              to="/hotels"
              onClick={() => setDynamicTitle("Hotel")}
            >
              Hotels
            </Link>
          </li>

          <li>
            <Link
              className="NavLinks"
              to="/adventure"
              onClick={() => setDynamicTitle("Adventure")}
            >
              Adventure
            </Link>
          </li>

          <li>
            <Link
              className="NavLinks"
              to="/transport"
              onClick={() => setDynamicTitle("Transport")}
            >
              Transport
            </Link>
          </li>
        </ul>

        <div className="corner-menu">
          <Link to="/signin">
            <FaUser />
          </Link>

          {currentUser && (
            <span
              onClick={handleSignOut}
              className="text-red-700 cursor-pointer"
            >
              Sign out
            </span>
          )}
        </div>
      </nav>
    </>
  );
}
