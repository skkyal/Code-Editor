import React from "react";

const Loader = ({ type }) => {
  return (
    <div className={type === "small" ? "loader-style-small" : "loader-style"}>
      <div className={type === "small" ? "loader-small" : "loader"}></div>
    </div>
  );
};

export default Loader;
