import React, { useEffect, useState } from "react";
import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { sortByProperty } from "../AppManager";
import { authRequired } from "../Auth";

export async function loader() {
  try {
    const { email, emailVerified } = await authRequired();
    if (!email || !emailVerified) {
      return redirect("/");
    } else {
      return email && emailVerified;
    }
  } catch (error) {
    return redirect("/");
  }
}

export default function DonationsLayout() {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [categories, setCategories] = useState([
    { categories: "", subcategories: [] },
  ]);
  const { admin } = useOutletContext();
  const loader = useLoaderData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!(admin && loader)) {
      navigate("/");
    }
  }, [admin, loader, navigate]);

  useEffect(() => {
    fetch("/data/categories.json")
      .then((res) => res.json())
      .then((data) => setCategories(sortByProperty(data, "category")))
      .catch((err) => err);
  }, []);

  useEffect(() => {
    fetch("/data/donations.json")
      .then((res) => res.json())
      .then((data) => {
        setData(sortByProperty(data, "timestamp").reverse());
        setLoaded(true);
      })
      .catch((err) => err);
  }, []);

  //   useEffect(() => {
  //     getRecord("donations")
  //       .then((data) => {
  //         setData(sortByProperty(data, "timestamp").reverse());
  //         setLoaded(true);
  //       })
  //       .catch((err) => err);

  //     onSnapshot(doc(db, "apps", "donations"), (doc) => {
  //       // const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
  //       const data = [];
  //       const record = doc.data();
  //       for (const key in record) {
  //         if (Object.hasOwnProperty.call(record, key)) {
  //           const book = record[key];
  //           data.push(book);
  //         }
  //       }
  //       setData(sortByProperty(data, "timestamp"));
  //     });
  //   }, []);

  return (
    <>
      <Outlet context={{ data, setData, loaded, categories }} />
    </>
  );
}
