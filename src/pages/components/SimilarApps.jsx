import React, { useEffect, useRef, useState } from "react";
import { countElementsInRow, getPriority, sortBooks } from "../../AppManager";
import AppCard from "./AppCard";
import { FaCode } from "react-icons/fa6";
import AppCardLoader from "./AppCardLoader";

export default function SimilarApps({ apps, setApps, search, admin, id = "" }) {
  const [result, setResult] = useState([]);
  const [show, setShow] = useState(0);
  const [more, setMore] = useState(true);
  const [ready, setReady] = useState(true);
  const [rowCount, setRowCount] = useState(true);
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
            let add = 5;
            if (result.length - oldShow < 5) {
              add = result.length % 5;
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
    sortBooks(apps, search, getPriority("categories"))
      .then(({ output }) =>
        setResult(
          output
            .filter((book) => book.id !== id)
            .slice(0, output.length > 50 ? 50 : output.length)
        )
      )
      .catch((err) => err);
  }, [apps, search, id]);

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

  return (
    <div className="home-book-section">
      <h2 className="home-section-title">
        <FaCode /> Similar Apps
      </h2>
      <div className="home-apps-section" ref={containerRef}>
        <div className="home-apps">
          {searchElements.length === 0 && <AppCardLoader />}
          {searchElements}
          {!ready && <AppCardLoader count={rowCount} />}
        </div>
      </div>
    </div>
  );
}
