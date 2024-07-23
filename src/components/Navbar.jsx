import React from "react";
import Banner from "./Banner";
import {
  FaBars,
  FaAppStore,
  FaAppStoreIos,
  FaCircleInfo,
  FaGift,
  FaHeart,
  FaHouse,
  FaMagnifyingGlass,
  FaPhone,
} from "react-icons/fa6";
import { LiaTimesCircle, LiaTimesSolid } from "react-icons/lia";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import Login from "../pages/Login";
import { signOutUser } from "../Auth";

function Navbar({ admin }) {
  const [search, setSearch] = React.useState("");
  const navigate = useNavigate();
  const [close, setClose] = React.useState(true);

  function handleChange(e) {
    const { value } = e.target;
    setSearch(value);
  }

  function handleSearch(e) {
    e.preventDefault();
    if (search.length >= 3) {
      navigate(`/search/${search}`);
      setSearch("");
    }
  }

  return (
    <nav className="navbar">
      {!close && (
        <Login
          close={() => {
            setClose(true);
          }}
        />
      )}
      <input type="checkbox" id="searchToggle" />
      <input type="checkbox" id="navToggle" />
      <label
        htmlFor="navToggle"
        className="nav-md-menu"
        style={{ cursor: "pointer" }}
      >
        <FaBars />
      </label>
      <div>
        <Banner />
      </div>
      <form className="search-wrap" onSubmit={handleSearch}>
        <input
          type="text"
          name="search"
          placeholder="Search here..."
          minLength={3}
          maxLength={50}
          value={search}
          onChange={handleChange}
        />
        <FaMagnifyingGlass onClick={handleSearch} />
      </form>
      <label htmlFor="searchToggle" className="showSearch">
        <FaMagnifyingGlass />
      </label>
      <label htmlFor="searchToggle" className="hideSearch">
        <LiaTimesCircle />
      </label>
      {admin && (
        <div className="nav-btn-wrap">
          <button
            className="button"
            style={{ backgroundColor: "#D01313" }}
            onClick={signOutUser}
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      )}
      {!admin && (
        <div className="nav-btn-wrap">
          <button
            className="button"
            onClick={() => {
              setClose(false);
            }}
          >
            <FaSignInAlt /> Admin
          </button>
        </div>
      )}
      <div className="md-nav">
        <div>
          <label htmlFor="navToggle">
            <LiaTimesSolid />
          </label>
        </div>
        <div>
          <ul>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to="/"
              >
                <FaHouse /> Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to="/about"
              >
                <FaCircleInfo /> About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to="/donate"
              >
                <FaGift /> Donate an App
              </NavLink>
            </li>
            {admin && (
              <li>
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "")}
                  to="/donations"
                >
                  <FaHeart /> Donations
                </NavLink>
              </li>
            )}
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to="/request"
              >
                <FaAppStoreIos /> Request an App
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to="/requests"
              >
                <FaAppStore /> App Requests
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => (isActive ? "active" : "")}
                to="/contact"
              >
                <FaPhone /> Contact Us
              </NavLink>
            </li>
            {!admin && (
              <li>
                <Link
                  onClick={() => {
                    setClose(false);
                  }}
                >
                  <FaSignInAlt /> Admin
                </Link>
              </li>
            )}
            {admin && (
              <li>
                <Link onClick={signOutUser}>
                  <FaSignOutAlt /> Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
