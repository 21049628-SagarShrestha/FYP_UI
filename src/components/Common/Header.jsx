import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  const [dynamicTitle, setDynamicTitle] = useState("Home");

  return (
    <header className="bg-slate-200 shadow-md">
      <Helmet>
        <link rel="icon" type="image/jpg" href="../assets/images/hotel.jpg" />

        <title>{`Travellers - ${dynamicTitle}`}</title>
      </Helmet>
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/" onClick={() => setDynamicTitle("Home")}>
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Travellers</span>
          </h1>
        </Link>

        <form className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600" />
        </form>

        <ul className="flex gap-4">
          <Link to="/" onClick={() => setDynamicTitle("Home")}>
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>

          <Link
            to="/destination"
            onClick={() => setDynamicTitle("Destination")}
          >
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Destination
            </li>
          </Link>

          <Link to="/hotels" onClick={() => setDynamicTitle("Hotel")}>
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Hotels
            </li>
          </Link>
          <Link to="/adventure" onClick={() => setDynamicTitle("Adventure")}>
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Adventure
            </li>
          </Link>
          <Link to="/transport" onClick={() => setDynamicTitle("Transport")}>
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Transport
            </li>
          </Link>
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
        </ul>
      </div>
    </header>
  );
}
