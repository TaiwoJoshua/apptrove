import React from "react";
import { Link } from "react-router-dom";
import { formatDownloads } from "../../AppManager";
import { FaFilePen, FaTrash } from "react-icons/fa6";
import DeleteApp from "./DeleteApp";

export default function AppCard({
  id,
  name,
  size,
  icon,
  downloads,
  preview,
  author,
  setApps,
  admin,
}) {
  const [close, setClose] = React.useState(true);

  return (
    <span className="app-card">
      {!close && (
        <DeleteApp
          type={"apps"}
          app={{ icon, name, id, preview }}
          setApps={setApps}
          close={() => {
            setClose(true);
          }}
        />
      )}
      <Link to={`/download/${id}`}>
        <div>
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
        </div>
        <div>
          <strong>{name}</strong>
          <span>
            <span>{size.toUpperCase()}</span>
            <span>{`${formatDownloads(downloads)} Download${
              parseInt(downloads) > 1 ? "s" : ""
            }`}</span>
            <Link to={`?info=${id}`}>
              <img src="/images/icons/information.png" alt={`${icon} Info`} />
            </Link>
          </span>
          <i>{author}</i>
        </div>
      </Link>
      {admin && (
        <span className="app-card-admin">
          <Link to={`/edit/${id}`}>
            <FaFilePen />
          </Link>
          <FaTrash
            onClick={() => {
              setClose(false);
            }}
          />
        </span>
      )}
    </span>
  );
}
