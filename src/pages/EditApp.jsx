import React, { useEffect, useState } from "react";
import { FaFilePen, FaSpinner } from "react-icons/fa6";
import {
  checkImage,
  deleteFiles,
  showSwal,
  updateRecordField,
  uploadFiles,
} from "../AppManager";
import {
  redirect,
  useLoaderData,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { LiaTimesCircle } from "react-icons/lia";
import { nanoid } from "nanoid";
import CategoriesSelection from "./components/CategoriesSelection";
import { authRequired } from "../Auth";

export async function loader(apps) {
  try {
    const { email, emailVerified } = await authRequired();
    if (!email || !emailVerified) {
      return redirect("/");
    } else {
      let final = apps;
      if (final.length === 0) {
        // const res = await getRecord("apps");
        const get = await fetch("/data/apps.json");
        const res = await get.json();
        final = res;
      }
      return {
        auth: email && emailVerified,
        apps: [...final],
      };
    }
  } catch (error) {
    return redirect("/");
  }
}

export default function EditApp() {
  const [data, setData] = useState({
    id: "",
    link: "",
    name: "",
    icon: "",
    author: "",
    preview: [],
    size: "",
    categories: [],
    display: "",
    timestamp: 0,
  });
  const [images, setImages] = useState({ icon: "", preview: [] });
  const [status, setStatus] = useState({
    status: "",
    type: "",
    message: "",
  });
  const [close, setClose] = useState(true);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [edited, setEdited] = useState(false);
  const [error, setError] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { setApps, admin } = useOutletContext();
  const { apps, auth } = useLoaderData();

  useEffect(() => {
    if (!(admin && auth)) {
      navigate("/");
    }
  }, [admin, auth, navigate]);

  useEffect(() => {
    const book = apps?.filter((dat) => dat.id === id)[0];
    if (book) {
      setData({
        ...book,
        icon: "",
        preview: [],
        display: book.categories.slice(0, 3).join(", "),
      });
      setImages({ icon: book.icon, preview: book.preview });
      setName(book.name);
    } else {
      showSwal("error", "App not Found", "", 5000);
      navigate("/");
    }
  }, [id, navigate, apps]);

  function handleChange(e) {
    const { name, type, value, files } = e.target;
    const maxSize = name === "icon" ? 100 : 500;
    if (type === "file" && checkImage(files, maxSize, setError, setStatus)) {
      setData((oldData) => ({ ...oldData, [name]: files }));
    } else {
      setData((oldData) => ({ ...oldData, [name]: value }));
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
        id: data.id,
        link: data.link,
        name: data.name,
        author: data.author,
        size: data.size,
        pages: data.pages,
        categories: data.categories,
      };
      if (data.icon && data.icon.length !== 0) {
        await deleteFiles(images.icon, "icon");
        const uploadIcon = await uploadFiles("icon", data.icon, [data.id]);
        const { downloadURL } = await uploadIcon[0];
        uploadData["icon"] = downloadURL;
      }

      if (data.preview && data.preview.length !== 0) {
        const previewIds = Object.keys(data.preview).map(() => nanoid());
        await deleteFiles(images.preview, "preview");
        const uploadPreviews = await uploadFiles(
          "preview",
          data.preview,
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

      const send = await updateRecordField("apps", uploadData);

      setTimeout(() => {
        if (send === true) {
          setApps((oldBooks) => {
            return oldBooks.map((book) => {
              if (book.id === id) {
                const icon = uploadData.icon ? uploadData.icon : book.icon;
                const preview = uploadData.preview
                  ? uploadData.preview
                  : book.preview;
                const newData = { ...book, ...uploadData, icon, preview };
                return newData;
              }
              return book;
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
            setFormData={setData}
            close={() => {
              setClose(true);
            }}
            prevSelection={data.categories}
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
              minLength={3}
              maxLength={100}
              value={data.name}
              required
            />
            <label htmlFor="name">App Name</label>
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
              value={data.author}
            />
            <label htmlFor="author">Author(s)</label>
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
              value={data.display}
            />
            <label htmlFor="categories">Categories</label>
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
                value={data.link}
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
                value={data.size}
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
