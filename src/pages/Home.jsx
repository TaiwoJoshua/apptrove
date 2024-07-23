import React, { useEffect, useRef, useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { FaCloudDownloadAlt, FaHistory } from "react-icons/fa";
import { countElementsInRow, sortByProperty } from "../AppManager";
import { Link, useOutletContext, useSearchParams } from "react-router-dom";
import AppCard from "./components/AppCard";
import AppCardLoader from "./components/AppCardLoader";
import { FaBox, FaMagnifyingGlass } from "react-icons/fa6";
import { nanoid } from "nanoid";

export default function Home() {
  const [welcome, setWelcome] = React.useState(true);
  const [data, setData] = React.useState([]);
  const [show, setShow] = React.useState(0);
  const [more, setMore] = React.useState(true);
  const [appCount, setAppCount] = React.useState(0);
  const [sortType, setSortType] = useState("timestamp");
  const [ready, setReady] = React.useState(true);
  const [rowCount, setRowCount] = React.useState(1);
  const [search, setSearch] = useState("");
  const { apps, setApps, admin, categories } = useOutletContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const containerRef = useRef(null);

  function handleSearch(e) {
    function cleanString(input) {
      // Regular expression to match only letters (both cases), numbers, and spaces
      const regex = /[^a-zA-Z0-9 ]/g;
      // Replace any character that is not a letter, number, or space with an empty string
      return input.replace(regex, "");
    }

    setSearch(cleanString(e.target.value));
  }

  function handleSortTypes(e) {
    const { value } = e.target;
    setSearchParams({ sort: value });
    setSortType(value);
  }

  useEffect(() => {
    if (searchParams.get("sort") && sortType === "timestamp") {
      setSortType(searchParams.get("sort"));
    }
  }, [searchParams, sortType]);

  useEffect(() => {
    const container = containerRef.current;
    const handleScroll = () => {
      if (
        more &&
        container.scrollHeight - container.scrollTop - container.clientHeight <
          1
      ) {
        setReady(false);
        setTimeout(() => {
          setShow((oldShow) => {
            let add = 20;
            if (data.length - oldShow < 20) {
              add = data.length % 20;
              setMore(true);
            } else if (data.length - oldShow === 20) {
              setMore(false);
            }
            return oldShow + add;
          });
          setReady(true);
        }, 2000);
      }
    };

    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [data, more]);

  useEffect(() => {
    if (data.length > 20) {
      setShow(20);
      setMore(true);
    } else {
      setShow(data.length);
      setMore(false);
    }
  }, [data]);

  useEffect(() => {
    setData(sortByProperty(apps, sortType).reverse());
  }, [apps, sortType]);

  useEffect(() => {
    let interval = "";
    const len = apps.length;
    len !== 0 &&
      setTimeout(() => {
        interval = setInterval(() => {
          const ran = Math.floor(Math.random());
          const rand = Math.floor(Math.random());
          let add = len > 50 ? Math.floor(len / 100) : 1;
          add = ran ? add + rand : add - rand;
          setAppCount((old) => {
            let now = old;
            if (old < len) {
              now = old + add;
              if (now >= len) {
                now = len;
                clearInterval(interval);
              }
            }
            return now;
          });
        }, 10);
      }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [apps]);

  useEffect(() => {
    function counter() {
      const count = countElementsInRow(".app-card");
      setRowCount(count);
    }
    counter();
    const quote = document.getElementsByClassName("home-apps")[0];
    const resizeObserver = new ResizeObserver(counter);
    quote && resizeObserver.observe(quote);

    return () => resizeObserver.disconnect();
  }, [data]);

  const appsElement = data
    .slice(0, show)
    .map((dat) => (
      <AppCard
        key={dat.id}
        id={dat.id}
        icon={dat.icon}
        name={dat.name}
        author={dat.author}
        downloads={dat.downloads}
        size={dat.size}
        preview={dat.preview}
        setApps={setApps}
        admin={admin}
      />
    ));

  const categoriesElements = categories
    .filter(
      ({ category, subcategories }) =>
        category?.toLowerCase().indexOf(search?.toLowerCase()) !== -1 ||
        subcategories.filter(
          (sub) => sub?.toLowerCase().indexOf(search?.toLowerCase()) !== -1
        ).length !== 0
    )
    .map(({ category, subcategories }) => (
      <div className="home-categories-category">
        <h3>{category}</h3>
        <div>
          {subcategories.sort().map((sub) => (
            <Link to={`/search/${sub}`} key={nanoid()}>
              {sub}
            </Link>
          ))}
        </div>
      </div>
    ));

  return (
    <div className="home">
      {welcome && (
        <div className="welcome-info">
          <LiaTimesSolid
            onClick={() => {
              setWelcome(false);
            }}
          />
          <span>
            <strong className="header-name">
              <span>APP</span>
              <span>TROVE</span>
            </strong>{" "}
            is your source for applications. As of today we have {appCount}{" "}
            applications available for download. It is free and has no download
            limits. Enjoy it and don't forget to bookmark and share the love!
          </span>
        </div>
      )}
      <div className="app-sort-wrapper">
        <button
          value={"timestamp"}
          className={sortType === "timestamp" ? "active" : ""}
          onClick={handleSortTypes}
        >
          <FaHistory /> Recents
        </button>
        <button
          value={"downloads"}
          className={sortType === "downloads" ? "active" : ""}
          onClick={handleSortTypes}
        >
          <FaCloudDownloadAlt style={{ fontSize: "1.2em" }} /> Downloads
        </button>
        <button
          value={"categories"}
          className={sortType === "categories" ? "active" : ""}
          onClick={handleSortTypes}
        >
          <FaBox style={{ fontSize: "1.2em" }} /> Categories
        </button>
      </div>
      <div className="home-apps-section" ref={containerRef}>
        {sortType === "categories" && (
          <div className="home-categories-list">
            <div className="home-categories-search"></div>
            <div
              className="special-search-input"
              style={{ maxWidth: "100%", position: "sticky", top: "0" }}
            >
              <FaMagnifyingGlass />
              <input
                type="search"
                id="key"
                name="key"
                required
                value={search}
                className="form-control"
                onChange={handleSearch}
                maxLength={20}
                placeholder="Search"
              />
            </div>
            {categoriesElements}
          </div>
        )}
        {sortType !== "categories" && (
          <div className="home-apps">
            {appsElement}
            {!ready && <AppCardLoader count={rowCount} />}
          </div>
        )}
      </div>
    </div>
  );
}
