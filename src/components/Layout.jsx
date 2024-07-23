import React, { useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useSearchParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Preloader from "./Preloader";
import { sortByProperty } from "../AppManager";
import Quotes from "./Quotes";
import { FaArrowLeft } from "react-icons/fa6";
import AppInfo from "../pages/components/AppInfo";
import { FaArrowDown } from "react-icons/fa";

function Layout({ apps, setApps, admin }) {
  const [preloader, setPreloader] = useState(true);
  const { pathname } = useLocation();
  const [info, setInfo] = useState({ id: "", name: "" });
  const [categories, setCategories] = useState([
    { categories: "", subcategories: [] },
  ]);
  const timeoutRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const find = searchParams.get("info");
    if (find) {
      const app = apps?.filter((dat) => dat.id === find)[0];
      if (app) {
        setInfo(app);
        setTimeout(() => {
          const appInfo = document.getElementById("app-info");
          if (appInfo) {
            appInfo.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 500);
      } else {
        setInfo({ id: "", name: "" });
        setSearchParams("info", "");
        // searchParams.delete("info");
      }
    } else {
      setInfo({ id: "", name: "" });
    }
  }, [searchParams, apps, setSearchParams]);

  useEffect(() => {
    fetch("/data/categories.json")
      .then((res) => res.json())
      .then((data) => setCategories(sortByProperty(data, "category")))
      .catch((err) => err);
  }, []);

  useEffect(() => {
    document.getElementById("preloader") &&
      setTimeout(() => {
        document.getElementById("preloader").style.opacity = 0;
        document.getElementById("preloader").style.pointerEvents = "none";
        setTimeout(() => {
          setPreloader(false);
        }, 1000);
      }, 1500);
  }, []);

  useEffect(() => {
    function height() {
      const screen = window.screen.height;
      const navbar = document
        .getElementsByClassName("navbar")[0]
        ?.getBoundingClientRect().height;
      const footer = document
        .getElementsByClassName("footer")[0]
        ?.getBoundingClientRect().height;
      const quote = document
        .getElementsByClassName("quote")[0]
        ?.getBoundingClientRect().height;
      const free = screen - navbar - footer - quote - 20;
      const box = document.querySelector(".main>div>div");
      if (box) {
        box.style.minHeight = free + "px";
      }
    }
    height();
    const quote = document.getElementsByClassName("quote")[0];
    const resizeObserver = new ResizeObserver(height);
    resizeObserver.observe(quote);

    return () => resizeObserver.disconnect();
  }, [pathname]);

  useEffect(() => {
    const container = document.getElementsByClassName("home-apps-section")[0];
    function show() {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      const back = document.getElementsByClassName("back-btn");
      for (let k = 0; k < back.length; k++) {
        const bac = back[k];
        if (bac) {
          bac.style.left = "10px";

          timeoutRef.current = setTimeout(() => {
            bac.style.left = "-50px";
          }, 2000);
        }
      }
    }
    window.addEventListener("scroll", show);
    if (container) {
      container.addEventListener("scroll", show);
    }

    return () => {
      window.removeEventListener("scroll", show);
      if (container) {
        container.removeEventListener("scroll", show);
      }
    };
  }, []);

  useEffect(() => {
    const appInfo = document.getElementsByClassName("App")[0];
    if (appInfo) {
      appInfo.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [pathname]);

  return (
    <>
      {preloader && <Preloader />}
      <div className="apps-sheet"></div>
      <Navbar admin={admin} />
      <Link to={-1} className="back-btn">
        <FaArrowLeft />
      </Link>
      <a href="#footer" className="back-btn down-btn">
        <FaArrowDown />
      </a>
      <main>
        <div className="main">
          <Outlet
            context={{
              apps,
              setApps,
              admin,
              categories,
            }}
          />
        </div>
        <div className="sidenav">
          {pathname !== "/donate" && pathname !== "/request" && info.id && (
            <AppInfo app={info} />
          )}
          {pathname === "/donate" && (
            <div style={{ color: "gray" }}>
              <span style={{ fontWeight: 700, color: "black" }}>
                Need help filling the form?
              </span>{" "}
              <br />
              <strong>Step 1:</strong> Input your full name (optional) <br />
              <strong>Step 2:</strong> Input your E-Mail <br />
              <strong>Step 3:</strong> Input your message (optional) <br />
              <strong>Step 4:</strong> Input the App Name <br />
              <strong>Step 5:</strong> Input the categories related to the app{" "}
              <br />
              <strong>Format</strong> - MTH 221 | MAT | CPE 123 <br />
              <strong>Step 6:</strong> Input the author(s) of the app (optional
              but appreciated) <br />
              <strong>Format</strong> - John Doe | Mary Doe <br />
              <strong>Step 7:</strong> Input the link where the app can be
              downloaded from <br />
              <strong>Step 8:</strong> Input the number of pages of the app{" "}
              <br />
              <strong>Step 9:</strong> Input the size of the app <br />
              <strong>Format</strong> - 50.00MB <br />
              <strong>Step 10:</strong> Upload the app cover <br />
              <strong>Step 11:</strong> Upload{" "}
              <strong>3 - 5 distinct and notable</strong> screenshots of pages
              from the app as preview <br />
              Note - Maximum size of 100KB for each image <br />
              <strong>Step 12:</strong> Click the donate button <br />
              Thank you for your donation <br /> <br />
            </div>
          )}
          {pathname === "/request" && (
            <div style={{ color: "gray" }}>
              <span style={{ fontWeight: 700, color: "black" }}>
                Need help filling the form?
              </span>{" "}
              <br />
              <strong>Step 1:</strong> Input your full name (optional) <br />
              <strong>Step 2:</strong> Input your E-Mail <br />
              <strong>Step 3:</strong> Input your message (optional) <br />
              <strong>Step 4:</strong> Input the App Name <br />
              <strong>Step 5:</strong> Input the author(s) of the app (optional
              but appreciated) <br />
              <strong>Format</strong> - John Doe | Mary Doe <br />
              <strong>Step 6:</strong> Input the categories related to the app{" "}
              <br />
              <strong>Format</strong> - MTH 221 | MAT | CPE 123 <br />
              Your app request would be worked upon <br />
              Check back in few days or await a completion mail from us <br />
              <strong>Note: </strong> Please, save the ticket number to be able
              to check the status of the request. <br />
              Thank you <br />
              <br />
            </div>
          )}
          <Quotes />
        </div>
      </main>
      <Footer admin={admin} />
    </>
  );
}

export default Layout;
