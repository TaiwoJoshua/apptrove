import React, { useEffect, useState } from "react";
import {
  Link,
  useLoaderData,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import FancyboxView from "../components/FancyboxView";
import SimilarApps from "./components/SimilarApps";
import { FaCheckDouble, FaShareAlt } from "react-icons/fa";
import { formatDownloads, showSwal, updateRecordField } from "../AppManager";
import { nanoid } from "nanoid";
import { FaCopy } from "react-icons/fa";
import { LiaTimesCircle } from "react-icons/lia";
import { FaEnvelope } from "react-icons/fa6";

export async function loader(apps) {
  try {
    let final = apps;
    if (final.length === 0) {
      // const res = await getRecord("apps");
      const get = await fetch("/data/apps.json");
      const res = await get.json();
      final = res;
    }
    return { apps: [...final] };
  } catch (error) {
    return { apps: [] };
  }
}

export default function Download() {
  const [data, setData] = useState({
    id: "",
    link: "",
    name: "",
    icon: "",
    author: "",
    preview: [],
    size: "",
    downloads: 0,
    categories: [],
    about: "",
    timestamp: 0,
  });
  const [copied, setCopied] = useState(false);
  const [share, setShare] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { setApps, admin } = useOutletContext();
  const { apps } = useLoaderData();
  const location = window.location.href;

  useEffect(() => {
    const book = apps?.filter((dat) => dat.id === id)[0];
    if (book) {
      setData(book);
    } else {
      showSwal("error", "App not Found", "", 5000);
      navigate("/");
    }
  }, [id, navigate, apps]);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(location)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch((err) => {
        // console.error("Failed to copy: ", err);
      });
  };

  async function increaseDownload() {
    const downloads = parseInt(data.downloads) + 1;
    const newData = { ...data, downloads };
    const send = await updateRecordField("apps", newData);
    if (send === true) {
      setApps((oldBooks) => {
        return oldBooks.map((book) => {
          if (book.id === id) {
            return { ...book, downloads };
          }
          return book;
        });
      });
    }
  }

  const categoriesElement = data.categories.map((course, index, array) =>
    index + 1 === array.length ? (
      <Link
        key={nanoid()}
        to={`/search/${course}`}
        state={{ priority: "categories" }}
      >
        {course}
      </Link>
    ) : (
      <>
        <Link to={`/search/${course}`} state={{ priority: "categories" }}>
          {course}
        </Link>{" "}
        |{" "}
      </>
    )
  );

  const authorsElement = data.author?.split(" | ").map((author, index, array) =>
    index + 1 === array.length ? (
      <Link
        key={nanoid()}
        to={`/search/${author}`}
        state={{ priority: "author" }}
      >
        {author}
      </Link>
    ) : (
      <>
        <Link to={`/search/${author}`} state={{ priority: "author" }}>
          {author}
        </Link>{" "}
        |{" "}
      </>
    )
  );

  const previewElement = data.preview.map((preview, index) => (
    <a key={nanoid()} data-fancybox="preview" href={preview}>
      <img src={preview} alt={data.name} />
    </a>
  ));

  return (
    <div>
      <div className="app-download-info-card">
        <div>
          <img src={data.icon} alt={data.name} />
          <div className="app-download-info">
            <h2>{data.name}</h2>
            <div className="app-download-author-categories">
              {authorsElement}
            </div>
            <div className="app-download-author-categories">
              {categoriesElement}
            </div>
            <span className="app-info-size-downloads">
              <span className="app-info-size" style={{ height: "40px" }}>
                {data.size}
              </span>
              <span className="app-info-downloads">
                <strong>{formatDownloads(data.downloads)}</strong>
                <span>Download{parseInt(data.downloads) > 1 ? "s" : ""}</span>
              </span>
            </span>
          </div>
        </div>
        <div>
          <div className="app-download-share-wrap">
            <a
              href={data.link}
              target="_blank"
              rel="noreferrer"
              onClick={increaseDownload}
              className="app-download-button"
            >
              Download
            </a>
            <span
              className="app-download-share-button"
              onClick={() => {
                setShare(true);
              }}
            >
              <FaShareAlt /> Share
            </span>
          </div>
          <div className="app-download-about">
            <h4>About {data.name}</h4>
            <div>{data.about}</div>
            {previewElement.length !== 0 && (
              <FancyboxView>
                <div className="app-download-preview">{previewElement}</div>
              </FancyboxView>
            )}
          </div>
        </div>
      </div>
      {share && (
        <div className="app-download-share-page">
          <div
            className="app-download-share-page-close"
            onClick={() => {
              setShare(false);
            }}
          ></div>
          <div className="app-download-share-wrapper">
            <div>
              <img src={data.icon} alt={data.name} />
              <div>
                <h3>{data.name}</h3>
                <p>Share this App</p>
              </div>
            </div>
            <div className="app-download-share-links">
              <a
                href={`https://api.whatsapp.com/send/?text=${location}&type=custom_url`}
                target="_blank"
                rel="noreferrer"
              >
                <img src="/images/icons/whatsapp.svg" alt="WhatsApp" />
                <span>WhatsApp</span>
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${location}`}
                target="_blank"
                rel="noreferrer"
              >
                <img src="/images/icons/facebook.svg" alt="Facebook" />
                <span>Facebook</span>
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${location}&via=AppTrove&text=Check Out ${data.name} on AppTrove`}
                target="_blank"
                rel="noreferrer"
              >
                <img src="/images/icons/twitterx.svg" alt="X" />
                <span>X</span>
              </a>
              <a
                href={`mailto:?subject= I want to share this with you&body=${location}`}
                target="_blank"
                rel="noreferrer"
              >
                <FaEnvelope style={{ fontSize: "4em", margin: 0 }} />
                <span>Mail</span>
              </a>
              <label>
                {!copied && <FaCopy onClick={handleCopy} />}
                {copied && (
                  <FaCheckDouble style={{ fontSize: "2em", color: "green" }} />
                )}
                <span>Link</span>
              </label>
            </div>
            <LiaTimesCircle
              className="app-download-close-icon"
              onClick={() => {
                setShare(false);
              }}
            />
          </div>
        </div>
      )}
      <br />
      <SimilarApps
        apps={apps}
        setApps={setApps}
        search={data.categories}
        id={data.id}
        admin={admin}
      />
    </div>
  );
}
