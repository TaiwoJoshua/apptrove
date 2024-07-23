import React from "react";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import { formatDownloads } from "../../AppManager";
import { Link } from "react-router-dom";
import { nanoid } from "nanoid";
import FancyboxView from "../../components/FancyboxView";

export default function AppInfo({ app }) {
  const previewElement = app.preview.map((preview, index) =>
    index === 0 ? (
      <a key={nanoid()} data-fancybox="preview" href={preview}>
        <button className="app-info-preview-btn">
          <FaEye /> Preview
        </button>
      </a>
    ) : (
      <a key={nanoid()} data-fancybox="preview" href={preview}>
        {" "}
      </a>
    )
  );

  return (
    <div className="app-info" id="app-info">
      <div className="app-info-head">
        <img src={app.icon} alt={app.name} />
        <h3>{app.name}</h3>
      </div>
      <p className="app-info-author">{app.author}</p>
      <div className="app-info-size-downloads">
        <span className="app-info-size">{app.size}</span>
        <span className="app-info-downloads">
          <strong>{formatDownloads(app.downloads)}</strong>
          <span>Download{parseInt(app.downloads) > 1 ? "s" : ""}</span>
        </span>
      </div>
      <div className="app-info-btns">
        <FancyboxView>{previewElement}</FancyboxView>
        <Link to={`/download/${app.id}`}>
          <button className="app-info-download-btn">
            <FaCloudDownloadAlt /> Download
          </button>
        </Link>
      </div>
      <div className="app-info-about">
        <div>
          <strong>About this App</strong>
        </div>
        {app.about}
      </div>
    </div>
  );
}
