import React from "react";

function DefaultStatus({ status }) {
  let key = status?.toLowerCase();
  switch (key) {
    case  "active":
      return (
        <span
          className={`inline-block px-2 py-1 text-xs  text-blue-500 rounded-md bg-blue-100`}
        >
          active
        </span>
      );
    case  "inactive":
      return (
        <span
        className={`inline-block px-2 py-1 text-xs  text-black-500 rounded-md bg-gray-100`}
        >
          inactive
        </span>
      );
    default:
      return (
        <span
          className={`inline-block px-2 py-1 text-xs  text-red-500 rounded-md bg-red-100`}
        >
          failed
        </span>
      );
  }
}

export default DefaultStatus;
