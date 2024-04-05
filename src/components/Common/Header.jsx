import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

import "./Header.css";
import { useForm } from "react-hook-form";
import { searchStart, searchSuccess } from "../../state/slices/searchSlice";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [dynamicTitle, setDynamicTitle] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    dispatch(searchStart());
    dispatch(searchSuccess(searchQuery));
    console.log(searchQuery, "se");
  }, [searchQuery]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
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
            <form
              className="bg-slate-100 p-1.5 border-2 border-grey rounded-xl flex ml-5 items-center"
              onSubmit={(e) => {
                e.preventDefault(); // Prevents the form from submitting
              }}
            >
              <input
                className="bg-transparent focus:outline-none w-20 sm:w-40"
                {...register("search", { required: true })}
                placeholder="Search..."
                type="text"
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
              {errors.search && <p>Location is required</p>}
              <button type="submit">
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
          {currentUser ? (
            <Link to="/profile">
              <FaUser />
            </Link>
          ) : (
            <Link to="/signin">
              <FaUser />
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
