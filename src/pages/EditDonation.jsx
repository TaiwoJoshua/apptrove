import React, { useEffect, useState } from "react";
import { FaFilePen, FaSpinner } from "react-icons/fa6";
import {
  checkImage,
  deleteFiles,
  showSwal,
  updateRecordField,
  uploadFiles,
} from "../AppManager";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { LiaTimesCircle } from "react-icons/lia";
import { nanoid } from "nanoid";
import CategoriesSelection from "./components/CategoriesSelection";

export default function EditDonation() {
  const [app, setApp] = useState({
    id: "",
    link: "",
    name: "",
    icon: "",
    author: "",
    preview: [],
    size: "",
    categories: [],
  });
  const [images, setImages] = useState({ icon: "", preview: [] });
  const [name, setName] = useState("");
  const [status, setStatus] = useState({
    status: "",
    type: "",
    message: "",
  });
  const [close, setClose] = useState(true);
  const [loading, setLoading] = useState(false);
  const [edited, setEdited] = useState(false);
  const [error, setError] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, setData } = useOutletContext();

  useEffect(() => {
    async function hello() {
      let apps = [];
      if (data.length === 0) {
        // apps = await getRecord("donations");
        apps = await fetch("/data/donations.json");
        apps = await apps.json();
      } else {
        apps = data;
      }
      const app = apps?.filter((dat) => dat.id === id)[0];
      if (app) {
        setApp({
          ...app,
          icon: "",
          preview: [],
          display: app.categories.slice(0, 3).join(", "),
        });
        setImages({ icon: app.icon, preview: app.preview });
        setName(app.name);
      } else {
        showSwal("error", "App not Found", "", 5000);
        navigate("/donations");
      }
    }
    hello();
  }, [id, navigate, data]);

  function handleChange(e) {
    const { name, type, value, files } = e.target;
    const maxSize = name === "icon" ? 100 : 500;
    if (type === "file" && checkImage(files, maxSize, setError, setStatus)) {
      setApp((oldData) => ({ ...oldData, [name]: files }));
    } else {
      setApp((oldData) => ({ ...oldData, [name]: value }));
    }
    if (!edited) {
      setEdited(true);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const uploadData = {
        id: app.id,
        link: app.link,
        name: app.name,
        author: app.author,
        size: app.size,
        pages: app.pages,
        categories: app.categories,
      };
      if (app.icon && app.icon.length !== 0) {
        await deleteFiles(images.icon, "icon");
        const uploadIcon = await uploadFiles("icon", app.icon, [app.id]);
        const { downloadURL } = await uploadIcon[0];
        uploadData["icon"] = downloadURL;
      }

      if (app.preview && app.preview.length !== 0) {
        const previewIds = Object.keys(app.preview).map(() => nanoid());
        await deleteFiles(images.preview, "preview");
        const uploadPreviews = await uploadFiles(
          "preview",
          app.preview,
          previewIds,
          false,
          false
        );
        const preview = [];
        for (let u = 0; u < uploadPreviews.length; u++) {
          const { downloadURL } = await uploadPreviews[u];
          preview.push(downloadURL);
        }
        uploadData["preview"] = preview;
      }

      const send = await updateRecordField("donations", uploadData);

      setTimeout(() => {
        if (send === true) {
          setData((oldApps) => {
            return oldApps.map((app) => {
              if (app.id === id) {
                const icon = uploadData.icon ? uploadData.icon : app.icon;
                const preview = uploadData.preview
                  ? uploadData.preview
                  : app.preview;
                const newData = { ...app, ...uploadData, icon, preview };
                return newData;
              }
              return app;
            });
          });
          setStatus({
            status: "success",
            type: "success",
            message: "App Updated",
          });
          setLoading(false);
        } else {
          setStatus({
            status: "failed",
            type: "failed",
            message: "Update Failed",
          });
          setLoading(false);
        }
      }, 2000);
    } catch (error) {
      setStatus({ status: "failed", type: "failed", message: "Update Failed" });
      setLoading(false);
    }
  }

  useEffect(() => {
    if (status.message !== "") {
      document
        .getElementById("status-wrapper")
        .scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status]);

  return (
    <div className="book-request">
      <h3>Edit {name}</h3>
      <form className="form" onSubmit={handleSubmit}>
        {!close && (
          <CategoriesSelection
            setFormData={setApp}
            close={() => {
              setClose(true);
            }}
            prevSelection={app.categories}
          />
        )}
        {status.message !== "" && (
          <p className="status-wrapper" id="status-wrapper">
            <span className={`status-message ${status.type}`}>
              {status.message}
            </span>
            <LiaTimesCircle
              className="status-close"
              onClick={() => {
                setStatus({ status: "", type: "", message: "" });
              }}
            />
          </p>
        )}
        <div>
          <div className="field">
            <input
              onChange={handleChange}
              readOnly={loading}
              type="text"
              className="form-control"
              name="name"
              autoComplete="off"
              placeholder="Name"
              maxLength={100}
              value={app.name}
              required
            />
            <label>App Name</label>
          </div>
        </div>
        <div>
          <div className="field">
            <input
              onChange={handleChange}
              readOnly={loading}
              type="text"
              className="form-control"
              name="author"
              autoComplete="off"
              placeholder="Author(s)"
              minLength={3}
              maxLength={100}
              required
              value={app.author}
            />
            <label>Author(s)</label>
          </div>
        </div>
        <div>
          <div className="field">
            <input
              onFocus={() => {
                setClose(false);
              }}
              disabled={loading}
              type="text"
              className="form-control"
              name="categories"
              autoComplete="off"
              placeholder="Categories"
              minLength={3}
              maxLength={100}
              required
              value={app.display}
            />
            <label>Categories</label>
          </div>
        </div>
        <div>
          <div>
            <div className="field">
              <input
                onChange={handleChange}
                readOnly={loading}
                type="text"
                className="form-control"
                name="link"
                placeholder="App Link"
                minLength={10}
                maxLength={250}
                required
                value={app.link}
              />
              <label>App Link</label>
            </div>
          </div>
          <div>
            <div className="field">
              <input
                onChange={handleChange}
                readOnly={loading}
                type="text"
                className="form-control"
                name="size"
                autoComplete="off"
                placeholder="App Size"
                minLength={4}
                maxLength={10}
                required
                value={app.size}
              />
              <label>App Size</label>
            </div>
          </div>
        </div>
        <div>
          <div className="field">
            <input
              onChange={handleChange}
              readOnly={loading}
              type="file"
              className="form-control"
              name="icon"
              accept="image/*"
            />
            <label>App Icon (Max Size - 100kb)</label>
          </div>
          <div className="field">
            <input
              onChange={handleChange}
              readOnly={loading}
              type="file"
              multiple
              className="form-control"
              name="preview"
              accept="image/*"
            />
            <label>App Preview (3 - 5 Screenshots)</label>
          </div>
        </div>
        <div>
          <button
            className="btn"
            disabled={!edited || loading || error}
            type="submit"
          >
            {loading ? (
              <FaSpinner className="spinner" />
            ) : (
              <>
                <FaFilePen /> Update
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

// $2y$12$oGPwmWm.uekQ/6hoYQYNL.yaKCp2WaPjE/e.DMQQoYLLMyI4YZtuW
