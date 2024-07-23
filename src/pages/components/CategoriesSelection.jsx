import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { nanoid } from "nanoid";
import { LiaTimesCircle } from "react-icons/lia";
import { FaCheckDouble, FaMagnifyingGlass } from "react-icons/fa6";
import { filterObject } from "../../AppManager";

export default function CategoriesSelection({
  setFormData,
  close,
  prevSelection,
}) {
  const { categories } = useOutletContext();
  const [specialData, setSpecialData] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (typeof prevSelection === "object" && prevSelection.length !== 0) {
      const prev = {};
      for (let k = 0; k < prevSelection.length; k++) {
        const selected = prevSelection[k];
        prev[selected] = true;
      }
      setSpecialData(prev);
    }
  }, [prevSelection]);

  function handleSearch(e) {
    function cleanString(input) {
      // Regular expression to match only letters (both cases), numbers, and spaces
      const regex = /[^a-zA-Z0-9 ]/g;
      // Replace any character that is not a letter, number, or space with an empty string
      return input.replace(regex, "");
    }

    setSearch(cleanString(e.target.value));
  }

  function handleSpecialChange(e) {
    const { name, checked } = e.target;
    setSpecialData((old) => ({ ...old, [name]: checked }));
  }

  function specialSection({ category, subcategories }) {
    const subcats = [];
    for (let l = 0; l < subcategories.length; l++) {
      const subcategory = subcategories[l];
      subcats.push(
        <span key={nanoid()}>
          <input
            type="checkbox"
            name={subcategory}
            id={subcategory}
            onChange={handleSpecialChange}
            checked={specialData[subcategory]}
          />
          <label htmlFor={subcategory}>{subcategory}</label>
        </span>
      );
    }

    return (
      <span className="special-select-section" key={nanoid()}>
        <strong>{category}</strong>
        <span>{subcats}</span>
      </span>
    );
  }

  const specialElement = categories
    .filter(
      ({ category, subcategories }) =>
        category?.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
        subcategories.filter(
          (sub) => sub.toLowerCase().indexOf(search.toLowerCase()) !== -1
        ).length !== 0
    )
    .map(({ category, subcategories }) =>
      specialSection({ category, subcategories: subcategories.sort() })
    );

  const closeAction = () => {
    const allCheck = specialData;
    const select = filterObject(allCheck, (value) => value);
    const selections = Object.keys(select);
    const set = selections.length !== 0;
    setFormData((old) => ({
      ...old,
      categories: set ? selections : "",
      display: set ? selections.slice(0, 3).join(", ") : "",
    }));
    close();
  };

  const selectedElements = Object.keys(
    filterObject(specialData, (value) => value)
  )
    .sort()
    .map((select) => (
      <span key={nanoid()}>
        <span>{select}</span>
        <LiaTimesCircle
          onClick={() => {
            setSpecialData((old) => ({ ...old, [select]: false }));
          }}
        />
      </span>
    ));

  return (
    <div className="special-select-wrapper">
      <div
        className="special-select-closer"
        onClick={() => {
          close();
        }}
      ></div>
      <div>
        <div className="special-search-input">
          <FaMagnifyingGlass />
          <input
            type="search"
            id="key"
            name="key"
            required
            value={search}
            className="form-control"
            onChange={handleSearch}
            maxLength={20}
            placeholder="Search"
          />
        </div>
        <div
          className="selection-box"
          style={
            selectedElements.length !== 0
              ? {}
              : { height: 0, padding: 0, opacity: 0, pointerEvents: "none" }
          }
        >
          {selectedElements}
        </div>
        <div className="special-select">{specialElement}</div>
        <span className="special-close" onClick={closeAction}>
          <FaCheckDouble />
        </span>
      </div>
    </div>
  );
}
