import React from "react";
import {
  FaCaretRight,
  FaComment,
  FaDownload,
  FaEnvelope,
  FaEye,
  FaPenToSquare,
  FaTrash,
  FaUpload,
  FaUser,
} from "react-icons/fa6";
import FancyboxView from "../../components/FancyboxView";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import UploadDonation from "./UploadDonation";
import DeleteApp from "./DeleteApp";

export default function DonationsCard({
  icon,
  name,
  size,
  link,
  author,
  id,
  donor,
  preview,
  email,
  message,
  categories,
  setData,
}) {
  const [close, setClose] = React.useState(true);
  const [closeUpload, setCloseUpload] = React.useState(true);

  const previewElement = preview.map((preview, index) =>
    index === 0 ? (
      <a key={nanoid()} data-fancybox="preview" href={preview}>
        <FaEye /> Preview
      </a>
    ) : (
      <a key={nanoid()} data-fancybox="preview" href={preview}>
        {" "}
      </a>
    )
  );

  return (
    <div className="book-card">
      {!close && (
        <DeleteApp
          type={"donations"}
          book={{ icon, name, id, preview }}
          setApps={setData}
          close={() => {
            setClose(true);
          }}
        />
      )}
      {!closeUpload && (
        <UploadDonation
          donation={{
            icon,
            name,
            size,
            link,
            author,
            id,
            preview,
            categories,
          }}
          donor={{ name, email }}
          setApps={setData}
          close={() => {
            setCloseUpload(true);
          }}
        />
      )}
      <FancyboxView className="book-card-img">
        <a data-fancybox="book" href={icon}>
          <img
            onError={(e) => {
              if (e.target.src !== "/default.png") {
                e.target.onerror = null;
                e.target.src = "/default.png";
              }
            }}
            src={icon}
            alt={name}
          />
        </a>
      </FancyboxView>
      <div className="book-card-info">
        <div>
          <span className="book-card-title">
            <h4>{name}</h4>
          </span>
          <div className="book-card-details">
            <span>{size.toUpperCase()}</span>
            <span>
              <FaCaretRight />
            </span>
            <span>{author}</span>
          </div>
          <div className="book-card-options">
            <span className="courtesy">
              <span>
                Courtesy: <span>{donor}</span>
              </span>
            </span>
            <span className="courtesy-data">
              <span>
                {donor && (
                  <span>
                    <span className="courtesy-head" style={{ marginTop: "0" }}>
                      <FaUser /> Name:
                    </span>
                    <strong>{donor}</strong>
                  </span>
                )}
                {email && (
                  <span>
                    <span className="courtesy-head">
                      <FaEnvelope /> E-Mail:
                    </span>
                    <strong>
                      <a
                        className="mail"
                        href={`mailto: ${email}?subject=Donation of ${name} Reviewed&content=Thank you for your donation to AppTrove.`}
                      >
                        {email}
                      </a>
                    </strong>
                  </span>
                )}
                {message && (
                  <span>
                    <span className="courtesy-head">
                      <FaComment /> Message:
                    </span>
                    <strong className="message">{message}</strong>
                  </span>
                )}
              </span>
            </span>
            <span>
              <FancyboxView>{previewElement}</FancyboxView>
            </span>
            <span>
              <a href={link} target="_blank" rel="noreferrer">
                <FaDownload /> Download
              </a>
            </span>
            <span>
              <Link
                to={id}
                state={{
                  book: { name, categories, size, link, author, id },
                }}
              >
                <FaPenToSquare /> Edit
              </Link>
            </span>
            <span
              onClick={() => {
                setCloseUpload(false);
              }}
            >
              <FaUpload /> Upload
            </span>
            <span
              onClick={() => {
                setClose(false);
              }}
            >
              <FaTrash /> Delete
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
