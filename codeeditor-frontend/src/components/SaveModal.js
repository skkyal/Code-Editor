import React, { useEffect } from "react";

const SaveModal = ({
  onSave,
  setTitle,
  setSaveModel,
  setAccess,
  access,
  valid,
}) => {
  useEffect(() => {
    setAccess(1);
  }, [setAccess]);

  const changePublic = (e) => {
    if (e.target.checked) setAccess(1);
  };
  const changePrivate = (e) => {
    if (e.target.checked) setAccess(0);
  };
  const changeViewonly = (e) => {
    if (e.target.checked) setAccess(2);
  };

  return (
    <div className="savemodel-main">
      <div className="savemodel-container">
        <div className="savemodel-close" onClick={() => setSaveModel(false)}>
          <i className="fas fa-times"></i>
        </div>
        {valid ? (
          <div style={{ color: "red", fontSize: "14px" }}>Enter a Title</div>
        ) : null}
        <input
          className="savemodel-title"
          type="text"
          placeholder="Enter Title"
          style={{ borderRadius: "5%" }}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <div className="savemodel-checkbox">
          <input
            type="radio"
            id="public"
            name="type"
            value="public"
            defaultChecked
            onChange={changePublic}
          ></input>
          <label htmlFor="public">Public</label>
          <span> </span>
          <input
            type="radio"
            id="viewonly"
            name="type"
            value="viewonly"
            onChange={changeViewonly}
          ></input>
          <label htmlFor="viewonly">View-Only</label>
          <span> </span>
          <input
            type="radio"
            id="private"
            name="type"
            value="private"
            onChange={changePrivate}
          ></input>
          <label htmlFor="private">Private</label>
          <div className="savemodel-btn" onClick={onSave}>
            Save
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveModal;
