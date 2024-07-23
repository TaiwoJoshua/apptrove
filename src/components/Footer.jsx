import React from "react";
import Banner from "./Banner";
import { Link } from "react-router-dom";
import {
  FaAppStore,
  FaAppStoreIos,
  FaComments,
  FaGift,
  FaHeart,
  FaPhone,
} from "react-icons/fa6";

function Footer({ admin }) {
  return (
    <footer className="footer" id="footer">
      <div>
        <div>
          <Banner />
        </div>
        <div>
          <h3>About Us</h3>
          <span>
            <strong>APPTROVE</strong> is a free website to search, preview and
            download books into your devices.{" "}
            <Link to="/about">read more...</Link>
          </span>
        </div>
        <div>
          <h3>Pages</h3>
          <Link to="/donate">
            <FaGift /> Donate an App
          </Link>
          <Link to="/request">
            <FaAppStoreIos /> Request an App
          </Link>
          <Link to="/requests">
            <FaAppStore /> App Requests
          </Link>
        </div>
        <div>
          <h3>Help</h3>
          <Link to="/contact">
            <FaPhone /> Contact Us
          </Link>
          <Link to="/feedback">
            <FaComments /> Feedback
          </Link>
          {admin && (
            <Link to="/donations">
              <FaHeart style={{ marginBottom: "-2px" }} /> Donations
            </Link>
          )}
        </div>
      </div>
      <div>
        <p>
          © Copyright{" "}
          <Link to="/">
            <strong className="header-name" style={{ fontSize: "1.2em" }}>
              <span style={{ fontFamily: "Pricedown" }}>APP</span>
              <span style={{ fontFamily: "Pricedown" }}>TROVE</span>
            </strong>
          </Link>{" "}
          {new Date().getFullYear()}. All Right Reserved. Designed and Developed
          by{" "}
          <strong>
            <a
              href="https://taiwojoshua.netlify.app/"
              target="_blank"
              rel="noreferrer"
            >
              Taiwo Joshua
            </a>
          </strong>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
