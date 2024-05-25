import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";

import "./Header.css";
import { useForm } from "react-hook-form";
import { searchStart, searchSuccess } from "../../state/slices/searchSlice";

export default function AdminHeader() {
  const { currentUser } = useSelector((state) => state.user);
  const [dynamicTitle, setDynamicTitle] = useState("Admin");
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
        <Link
          to="/admindestination"
          onClick={() => setDynamicTitle("Admin Destination")}
        >
          <h1>
            <span className="font-bold text-3xl">Travellers</span>
          </h1>
        </Link>
        <div className="MenuIcons" onClick={toggleMenu}>
          <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
        <ul className={isMenuOpen ? "Navmenu active" : "Navmenu"}>
          <li>
            <Link
              className="NavLinks"
              to="/admindestination"
              onClick={() => setDynamicTitle("Admin Destination")}
            >
              Destination
            </Link>
          </li>

          <li>
            <Link
              className="NavLinks"
              to="/adminhotel"
              onClick={() => setDynamicTitle("Admin Hotel")}
            >
              Hotels
            </Link>
          </li>

          <li>
            <Link
              className="NavLinks"
              to="/adminadventure"
              onClick={() => setDynamicTitle("Admin Adventure")}
            >
              Adventure
            </Link>
          </li>

          <li>
            <Link
              className="NavLinks"
              to="/admintransport"
              onClick={() => setDynamicTitle("Admin Transport")}
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
