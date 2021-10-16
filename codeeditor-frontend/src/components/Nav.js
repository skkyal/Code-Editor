import React, { useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import DropList from "./DropList";
const Nav = ({ onSave, onDelete, isDelete, isIcon, type, setHeight }) => {
  const history = useHistory();

  const onShare = () => {
    if (type === 0) {
      toast("Private Code. Link cannot be copied");
    } else {
      const link = window.location.href;
      navigator.clipboard.writeText(link);
      toast("Copied Link to Clipboard");
    }
  };
  const [navList, setNavList] = useState(false);
  return (
    <div className="navbar">
      <span
        style={{ cursor: "pointer" }}
        onClick={() => {
          history.push("/user");
        }}
      >
        <i className="fas fa-code"></i>
        <span> CodeEditor</span>
      </span>
      <span className="nav-option" onClick={() => setNavList((prev) => !prev)}>
        <span style={{ marginRight: "20px" }}>
          {localStorage.getItem("auth-name")}{" "}
          <i className="fas fa-angle-down"></i>
        </span>
        {navList ? <DropList /> : null}
      </span>
      {isIcon ? (
        <span className="nav-button">
          <span className="nav-icons" onClick={() => onSave()}>
            <i className="fas fa-save"></i>
          </span>

          <span className="nav-icons" onClick={() => setHeight((a) => !a)}>
            <i className="fas fa-expand"></i>
          </span>

          {isDelete ? (
            <>
              <span className="nav-icons" onClick={() => onDelete()}>
                <i className="fas fa-trash-alt"></i>
              </span>
              <span className="nav-icons" onClick={() => onShare()}>
                <i className="fas fa-share-alt"></i>
              </span>
            </>
          ) : null}
        </span>
      ) : null}
    </div>
  );
};

export default Nav;
