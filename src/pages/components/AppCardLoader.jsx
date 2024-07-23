import React from "react";
import { nanoid } from "nanoid";

export default function AppCardLoader({ count }) {
  const counter = count ? count : 1;
  const elements = [];
  for (let p = 0; p < counter; p++) {
    elements.push(
      <div
        key={nanoid()}
        className="loader-item"
        style={{
          width: "120px",
          height: "190px",
          borderRadius: "5px",
          marginTop: "8px",
          marginRight: p === count - 1 ? "0" : "8px",
        }}
      ></div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
      }}
    >
      {elements}
    </div>
  );
}
