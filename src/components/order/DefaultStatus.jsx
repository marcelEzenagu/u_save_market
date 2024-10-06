import React from "react";

function DefaultStatus({ status }) {
  let key = status?.toLowerCase();
  switch (key) {
    case  "active":
      return (
        <span
          className={`inline-block px-2 py-1 text-xs  text-green-500 rounded-full bg-green-100`}
        >
          active
        </span>
      );
    case  "inactive":
      return (
        <span
        className={`inline-block px-2 py-1 text-xs  text-red-500 rounded-full bg-red-100`}
        >
          inactive
        </span>
      );
    default:
      return (
        <span
          className={`inline-block px-2 py-1 text-xs  text-red-500 rounded-full bg-red-100`}
        >
          failed
        </span>
      );
  }
}

export default DefaultStatus;
