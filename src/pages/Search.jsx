import React, { useEffect, useRef, useState } from "react";
import { useLocation, useOutletContext, useParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { countElementsInRow, getPriority, sortBooks } from "../AppManager";
import AppCard from "./components/AppCard";
import AppCardLoader from "./components/AppCardLoader";

export default function Search() {
  const { search } = useParams();
  const { state } = useLocation();
  const priority = state?.priority ? state.priority : "";
  const { apps, setApps, admin } = useOutletContext();
  const [ready, setReady] = React.useState(true);
  const [rowCount, setRowCount] = React.useState(1);
  const [result, setResult] = useState([]);
  const [show, setShow] = useState(0);
  const [more, setMore] = useState(false);
  const containerRef = useRef(null);

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
            if (result.length - oldShow < 20) {
              add = result.length % 20;
              setMore(true);
            } else if (result.length - oldShow === 20) {
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
  }, [result, more]);

  useEffect(() => {
    if (result.length > 20) {
      setShow(20);
      setMore(true);
    } else {
      setShow(result.length);
      setMore(false);
    }
  }, [result]);

  useEffect(() => {
    sortBooks(apps, search, getPriority(priority))
      .then(({ output, length }) => setResult(output.slice(0, length)))
      .catch((err) => err);
  }, [apps, search, priority]);

  useEffect(() => {
    function counter() {
      const count = countElementsInRow(".app-card");
      setRowCount(count);
    }
    counter();
    const quote = document.getElementsByClassName("home-apps")[0];
    const resizeObserver = new ResizeObserver(counter);
    resizeObserver.observe(quote);

    return () => resizeObserver.disconnect();
  }, [result]);

  const searchElements = result
    .slice(0, show)
    .map((res) => (
      <AppCard
        key={res.id}
        id={res.id}
        icon={res.icon}
        name={res.name}
        author={res.author}
        downloads={res.downloads}
        size={res.size}
        preview={res.preview}
        setApps={setApps}
        admin={admin}
      />
    ));

  return (
    <div>
      <div className="home-book-section" style={{ marginBottom: 0 }}>
        <h2 className="home-section-title">
          <FaSearch /> {search.toUpperCase()} Apps
        </h2>
        {result.length !== 0 && (
          <p>
            {result.length} search result{result.length > 1 ? "s" : ""}
          </p>
        )}
        <div className="home-apps-section" ref={containerRef}>
          <div className="home-apps">
            {searchElements.length === 0 && (
              <p className="home-no-apps">
                No {search.toUpperCase()} App Found
              </p>
            )}
            {searchElements}
            {!ready && <AppCardLoader count={rowCount} />}
          </div>
        </div>
      </div>
    </div>
  );
}
