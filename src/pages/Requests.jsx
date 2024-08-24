import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaCloud, FaSpinner, FaTriangleExclamation } from "react-icons/fa6";
import LoadMoreBtn from "./components/LoadMoreBtn";
import {
  deleteRecordField,
  getRecord,
  getTimeDifferenceInDays,
  requestMail,
  showSwal,
  sortByProperty,
  updateRecordField,
} from "../AppManager";
import { LiaCheckCircle, LiaCheckDoubleSolid } from "react-icons/lia";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../Api";
import { useOutletContext } from "react-router-dom";

export default function Requests() {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [adminSearch, setAdminSearch] = useState("");
  const [show, setShow] = useState(0);
  const [more, setMore] = useState(false);
  const { admin } = useOutletContext();

  useEffect(() => {
    if (data.length > 5) {
      setShow(5);
      setMore(true);
    } else {
      setShow(data.length);
      setMore(false);
    }
  }, [data]);

  useEffect(() => {
    fetch("/data/requests.json")
      .then((res) => res.json())
      .then((data) => {
        setData(sortByProperty(data, "timestamp").reverse());
        setLoaded(true);
      })
      .catch((err) => err);
  }, []);

  // useEffect(() => {
  //   getRecord("requests")
  //     .then((data) => {
  //       setData(sortByProperty(data, "timestamp").reverse());
  //       setLoaded(true);
  //     })
  //     .catch((err) => err);

  //   onSnapshot(doc(db, "apps", "requests"), (doc) => {
  //     // const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
  //     const data = [];
  //     const record = doc.data();
  //     for (const key in record) {
  //       if (Object.hasOwnProperty.call(record, key)) {
  //         const book = record[key];
  //         data.push(book);
  //       }
  //     }
  //     setData(sortByProperty(data, "timestamp").reverse());
  //   });
  // }, []);

  function handleSearch(e) {
    const { value } = e.target;
    if (value.length <= 10) {
      setSearch(value);
    }
  }

  function handleAdminSearch(e) {
    const { value } = e.target;
    setAdminSearch(value);
  }

  function statusSelector(status) {
    let statusclass;
    if (status === "Processing") {
      statusclass = "table-warning";
    } else if (status === "Completed") {
      statusclass = "table-success";
    } else if (status === "Not Found") {
      statusclass = "table-danger";
    } else {
      statusclass = "table-info";
    }
    return statusclass;
  }

  function BookStatus({ dat }) {
    const [bookStat, setBookStat] = useState(dat.status);
    const [loading, setLoading] = useState(false);

    async function update() {
      try {
        setLoading(true);
        const newData = {
          ...dat,
          status: bookStat,
          timestamp: new Date().getTime(),
        };
        const mail =
          bookStat === "Completed"
            ? await requestMail(newData.name, newData.name, newData.email)
            : "sent";
        if (mail === "sent") {
          const send = await updateRecordField("requests", newData);
          if (send === true) {
            showSwal("success", "Updated");
            setTimeout(() => {
              setLoading("success");
              setTimeout(() => {
                setData((oldData) =>
                  oldData.map((data) => (data.id === dat.id ? newData : data))
                );
                setLoading(false);
              }, 2000);
            }, 1000);
          } else {
            setLoading("failed");
            setTimeout(() => {
              setLoading(false);
            }, 2000);
          }
        } else {
          setLoading("failed");
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        }
      } catch (error) {
        setLoading("failed");
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    }

    return (
      <td className={`${statusSelector(bookStat)}`}>
        <select
          onChange={(e) => {
            setBookStat(e.target.value);
          }}
          name={dat.id}
          value={bookStat}
        >
          <option value="Processing">Processing</option>
          <option value="Not Found">Not Found</option>
          <option value="Completed">Completed</option>
        </select>
        {dat.status !== bookStat && (
          <button
            className="btn"
            onClick={update}
            style={{
              margin: "8px auto 0 auto",
              backgroundColor: loading
                ? loading === true
                  ? "gray"
                  : loading === "success"
                  ? "green"
                  : "red"
                : "#007bff",
            }}
          >
            {loading ? (
              loading === true ? (
                <FaSpinner className="spinner" />
              ) : loading === "success" ? (
                <LiaCheckCircle />
              ) : (
                <FaTriangleExclamation />
              )
            ) : (
              <LiaCheckDoubleSolid />
            )}
          </button>
        )}
      </td>
    );
  }

  const filterdata =
    search?.toString().length === 10
      ? data.filter((dat) => dat.ticket === parseInt(search))
      : data;

  const adminDataChoose = adminSearch
    ? filterdata.filter(
        (book) =>
          book.name.toLowerCase().indexOf(adminSearch.toLowerCase()) !== -1 ||
          book.author.toLowerCase().indexOf(adminSearch.toLowerCase()) !== -1 ||
          book.categories
            .join(" | ")
            .toLowerCase()
            .indexOf(adminSearch.toLowerCase()) !== -1 ||
          book.name.toLowerCase().indexOf(adminSearch.toLowerCase()) !== -1 ||
          book.email.toLowerCase().indexOf(adminSearch.toLowerCase()) !== -1 ||
          book.ticket
            .toString()
            .toLowerCase()
            .indexOf(adminSearch.toLowerCase()) !== -1 ||
          book.status.toLowerCase().indexOf(adminSearch.toLowerCase()) !== -1
      )
    : filterdata.slice(0, show);

  const adminData =
    admin &&
    adminDataChoose.map((dat, index) => {
      return (
        <tr key={dat.id}>
          <td className="text-center">{index + 1}</td>
          <td>{dat.ticket}</td>
          <td>{dat.name}</td>
          <td style={{ wordBreak: "break-all" }}>{dat.email}</td>
          <td>{dat.message}</td>
          <td>{dat.name}</td>
          <td>{dat.author}</td>
          <td>{dat.categories.join(" | ")}</td>
          <BookStatus dat={dat} />
        </tr>
      );
    });

  const othersData =
    !admin && filterdata.length === 1 && search?.toString().length === 10
      ? filterdata.map((dat) => {
          return (
            <div key={dat.id}>
              <h3 style={{ marginTop: "10px" }}>{dat.name}</h3>
              <div className="custom-table">
                <table className="table-fill">
                  <thead>
                    <tr>
                      <th>App Name</th>
                      <th>Author(s)</th>
                      <th>Categories</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody className="table-hover">
                    <tr>
                      <td>{dat.name}</td>
                      <td>{dat.author}</td>
                      <td>{dat.categories.join(" | ")}</td>
                      <td className={`${statusSelector(dat.status)}`}>
                        {dat.status}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          );
        })
      : [];

  useEffect(() => {
    getRecord("sweep")
      .then((tim) => {
        const diff = getTimeDifferenceInDays(tim[0]);
        if (diff >= 3 && data.length !== 0) {
          data.map((dat) => {
            const status = dat.status;
            const time = dat.timestamp;
            if (
              (status === "Completed" || status === "Not Found") &&
              getTimeDifferenceInDays(time) >= 30
            ) {
              console.log(
                dat.name,
                new Date(dat.timestamp),
                dat.status,
                dat.id
              );
              deleteRecordField("requests", dat.id);
            }
            return dat;
          });
          setDoc(doc(db, "apps", "sweep"), {
            timestamp: new Date().getTime(),
          });
        }
      })
      .catch((err) => err);
  }, [data]);

  return (
    <div className="book-requests">
      {!admin && (
        <div style={{ textAlign: "center" }}>
          Input your ticket number below to check the status of your request.
        </div>
      )}
      {data && (
        <div className="custom-search">
          {!admin && (
            <div className="search">
              <input
                type="number"
                maxLength={10}
                minLength={10}
                onChange={handleSearch}
                value={search}
                placeholder="Ticket"
              />
              <div className="symbol">
                <FaCloud className="cloud" />
                <FaSearch className="lens" />
              </div>
            </div>
          )}
          {admin && data.length > 5 && (
            <div className="search">
              <input
                type="text"
                className="admin-search"
                maxLength={30}
                onChange={handleAdminSearch}
                value={adminSearch}
                placeholder="Search..."
              />
              <div className="symbol">
                <FaCloud className="cloud" />
                <FaSearch className="lens" />
              </div>
            </div>
          )}
        </div>
      )}
      {admin && (
        <div>
          <div className="custom-table">
            <table className="table-fill">
              <thead>
                <tr>
                  <th
                    className="text-center"
                    style={{ width: "50px", minWidth: "50px" }}
                  >
                    S/N
                  </th>
                  <th>Ticket</th>
                  <th>Name</th>
                  <th>E-Mail</th>
                  <th style={{ width: "200px", minWidth: "200px" }}>Message</th>
                  <th>App Name</th>
                  <th>Author(s)</th>
                  <th>Categories</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody className="table-hover">
                {!loaded && (
                  <tr>
                    <td
                      className="loader-item"
                      style={{
                        height: "70px",
                        background:
                          "linear-gradient(to top right, #F4F6FF 0%, #FFF 100%)",
                        backgroundSize: "200% 100%",
                      }}
                    >
                      {" "}
                    </td>
                    <td
                      className="loader-item"
                      style={{
                        height: "70px",
                        background:
                          "linear-gradient(to top right, #F4F6FF 0%, #FFF 100%)",
                        backgroundSize: "200% 100%",
                      }}
                    >
                      {" "}
                    </td>
                    <td
                      className="loader-item"
                      style={{
                        height: "70px",
                        background:
                          "linear-gradient(to top right, #F4F6FF 0%, #FFF 100%)",
                        backgroundSize: "200% 100%",
                      }}
                    >
                      {" "}
                    </td>
                    <td
                      className="loader-item"
                      style={{
                        height: "70px",
                        background:
                          "linear-gradient(to top right, #F4F6FF 0%, #FFF 100%)",
                        backgroundSize: "200% 100%",
                      }}
                    >
                      {" "}
                    </td>
                    <td
                      className="loader-item"
                      style={{
                        height: "70px",
                        background:
                          "linear-gradient(to top right, #F4F6FF 0%, #FFF 100%)",
                        backgroundSize: "200% 100%",
                      }}
                    >
                      {" "}
                    </td>
                    <td
                      className="loader-item"
                      style={{
                        height: "70px",
                        background:
                          "linear-gradient(to top right, #F4F6FF 0%, #FFF 100%)",
                        backgroundSize: "200% 100%",
                      }}
                    >
                      {" "}
                    </td>
                    <td
                      className="loader-item"
                      style={{
                        height: "70px",
                        background:
                          "linear-gradient(to top right, #F4F6FF 0%, #FFF 100%)",
                        backgroundSize: "200% 100%",
                      }}
                    >
                      {" "}
                    </td>
                    <td
                      className="loader-item"
                      style={{
                        height: "70px",
                        background:
                          "linear-gradient(to top right, #F4F6FF 0%, #FFF 100%)",
                        backgroundSize: "200% 100%",
                      }}
                    >
                      {" "}
                    </td>
                    <td
                      className="loader-item"
                      style={{
                        height: "70px",
                        background:
                          "linear-gradient(to top right, #F4F6FF 0%, #FFF 100%)",
                        backgroundSize: "200% 100%",
                      }}
                    >
                      {" "}
                    </td>
                  </tr>
                )}
                {adminData}
              </tbody>
            </table>
          </div>
          {more && !adminSearch && search?.toString().length !== 10 && (
            <LoadMoreBtn data={data} setShow={setShow} setMore={setMore} />
          )}
        </div>
      )}
      {!admin && <>{othersData}</>}
      {!admin &&
        search?.toString().length === 10 &&
        othersData.length === 0 && (
          <p className="home-no-books">No App Request Found</p>
        )}
      <div style={{ marginTop: "20px" }}>
        <strong>Note:</strong> An App Request would be deleted after 30 days if
        the status has become either <strong>Completed</strong> or{" "}
        <strong>Not Found</strong>.
      </div>
    </div>
  );
}
