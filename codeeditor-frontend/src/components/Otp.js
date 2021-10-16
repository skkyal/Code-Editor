import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "./Loader";

const Otp = ({ email, setRegister }) => {
  const history = useHistory();

  const [otp, setOtp] = useState("");
  const [valid, setValid] = useState(false);
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("Error Occurred");

  useEffect(() => {
    toast("Please Enter OTP sent to your Email");
    setLoader(false);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    const req = { email, otp };
    try {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/user/register/otp",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(req),
        }
      );
      const data = await res.json();
      //alert(data.message);
      setLoader(false);

      if (res.ok) {
        setRegister(false);
        toast("Verified Successfully");
        toast("Please Login Again");
        history.push("/user");
      } else {
        setMessage(data.message);
        setValid(true);
      }
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };
  return (
    <div className="login-form-container">
      <form className="login-form">
        <input
          className="form-detail"
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
        />
        <button className="form-button" onClick={onSubmit}>
          {loader ? <Loader type="small" /> : <>Submit</>}
        </button>
      </form>
      {valid ? (
        <div style={{ color: "red", fontSize: "14px" }}>{message}</div>
      ) : null}
    </div>
  );
};

export default Otp;
