import React, { useEffect, useState } from "react";
import { FaGift, FaSpinner } from "react-icons/fa6";
import { LiaTimesCircle } from "react-icons/lia";
import { checkImage, newRecordField, uploadFiles } from "../AppManager";
import { nanoid } from "nanoid";
import CategoriesSelection from "./components/CategoriesSelection";

export default function Donate() {
  const [data, setData] = useState({
    donor: "",
    email: "",
    message: "",
    link: "",
    name: "",
    about: "",
    icon: "",
    author: "",
    preview: [],
    size: "",
    display: "",
    downloads: 0,
    categories: [],
  });
  const [status, setStatus] = useState({
    status: "",
    type: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [close, setClose] = useState(true);
  const [error, setError] = useState(false);

  function handleChange(e) {
    const { name, type, value, files } = e.target;
    const maxSize = name === "icon" ? 100 : 500;
    if (type === "file" && checkImage(files, maxSize, setError, setStatus)) {
      setData((oldData) => ({ ...oldData, [name]: files }));
    } else {
      setData((oldData) => ({ ...oldData, [name]: value }));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const uploadData = {
        ...data,
        id: nanoid(),
        timestamp: new Date().getTime(),
      };
      if (data.icon && data.icon.length !== 0) {
        const uploadIcon = await uploadFiles("icon", data.icon, [
          uploadData.id,
        ]);
        const { downloadURL } = await uploadIcon[0];
        uploadData["icon"] = downloadURL;
      }

      if (data.preview && data.preview.length !== 0) {
        const previewIds = Object.keys(data.preview).map(() => nanoid());
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

      const send = await newRecordField("donations", uploadData);

      setTimeout(() => {
        if (send === true) {
          setStatus({
            status: "success",
            type: "success",
            message: "App Donated",
          });
          setData((oldData) => ({
            ...oldData,
            donor: "",
            email: "",
            message: "",
            link: "",
            name: "",
            about: "",
            author: "",
            size: "",
            display: "",
            downloads: 0,
            categories: [],
          }));
          setLoading(false);
        } else {
          setStatus({
            status: "failed",
            type: "failed",
            message: "Donation Failed",
          });
          setLoading(false);
        }
      }, 2000);
    } catch (error) {
      setStatus({
        status: "failed",
        type: "failed",
        message: "Donation Failed",
      });
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
      <h3>Donate an App</h3>
      <form
        className="form"
        onSubmit={handleSubmit}
        style={{ position: "relative" }}
      >
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
          <div>
            <div className="field">
              <input
                onChange={handleChange}
                readOnly={loading}
                type="text"
                className="form-control"
                name="donor"
                autoComplete="off"
                placeholder="Name"
                maxLength={30}
                value={data.donor}
              />
              <label>Full Name</label>
            </div>
          </div>
          <div>
            <div className="field">
              <input
                onChange={handleChange}
                readOnly={loading}
                type="email"
                className="form-control"
                name="email"
                autoComplete="on"
                placeholder="E-Mail"
                required
                maxLength={50}
                value={data.email}
              />
              <label>
                <span>*</span>E-Mail
              </label>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className="field">
              <textarea
                onChange={handleChange}
                readOnly={loading}
                className="form-control textarea"
                rows={3}
                name="message"
                placeholder="Message"
                maxLength={250}
                value={data.message}
              />
              <label>Message</label>
            </div>
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
                name="name"
                autoComplete="off"
                placeholder="App Name"
                required
                maxLength={100}
                value={data.name}
              />
              <label>
                <span>*</span>App Name
              </label>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className="field">
              <input
                onClick={() => {
                  setClose(false);
                }}
                onFocus={() => {
                  setClose(false);
                }}
                disabled={loading}
                type="text"
                className="form-control"
                name="categories"
                placeholder="Categories"
                minLength={3}
                maxLength={100}
                value={data.display}
                required
              />
              <label>
                <span>*</span>Categories
              </label>
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
                maxLength={250}
                value={data.author}
              />
              <label>Author(s)</label>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className="field">
              <textarea
                onChange={handleChange}
                readOnly={loading}
                className="form-control textarea"
                rows={3}
                name="about"
                placeholder="About the App"
                maxLength={500}
                value={data.about}
                required
              />
              <label>
                <span>*</span>About the App
              </label>
            </div>
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
              <label>
                <span>*</span>App Link
              </label>
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
                value={data.size}
                required
              />
              <label>
                <span>*</span>App Size
              </label>
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
              required
              accept="image/*"
            />
            <label>
              <span>*</span>App Icon (Max Size - 100kb)
            </label>
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
              required
            />
            <label>
              <span>*</span>App Preview (3 - 5 Screenshots)
            </label>
          </div>
        </div>
        <div>
          <button className="btn" disabled={loading || error} type="submit">
            {loading ? (
              <FaSpinner className="spinner" />
            ) : (
              <>
                <FaGift /> Donate
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
