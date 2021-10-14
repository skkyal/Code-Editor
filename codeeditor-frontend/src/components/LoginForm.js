import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import Loader from "./Loader";
import { toast } from "react-toastify";

const LoginForm = ({ email, setEmail, setRegister }) => {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(false);

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(false);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const req = { email, password };
    try {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/user/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(req),
        }
      );

      const data = await res.json();
      setLoader(false);
      if (res.ok) {
        if (data.message) setRegister(true);
        else {
          history.push("/user");
          toast("Logged in Successfully");
          localStorage.setItem("auth-token", data.token);
          localStorage.setItem("auth-name", data.name);
        }
      } else {
        //alert(data.message);
        setLoader(false);
        setValid(true);
      }
      //console.log(data);
    } catch (err) {
      setLoader(false);
      console.log(err);
    }
  };

  return (
    <div className="login-form-container">
      {valid ? (
        <div style={{ color: "red", fontSize: "14px" }}>
          Enter a valid Email and Password
        </div>
      ) : null}
      <form className="login-form">
        <input
          className="form-detail"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className="form-detail"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="form-button" onClick={onSubmit}>
          {loader ? <Loader type="small" /> : <>Login</>}
        </button>
        <p className="login-message">
          Not registered? <Link to="/register">Create an account</Link>
        </p>
      </form>
    </div>
  );
};
export default LoginForm;
