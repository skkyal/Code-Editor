import Editor from "../components/Editor";
import Nav from "../components/Nav";
import Loader from "../components/Loader";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import React from "react";

const Specific = () => {
  const [code, setCode] = useState(``);
  const [js, setJs] = useState("");
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [loader, setLoader] = useState(true);
  const [height, setHeight] = useState(false);
  const { _id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("auth-token") === null) {
      history.push("/login");
    } else {
      const code = `
        <html>
        <head>
            <title>${title}</title>
            <style>${css}</style>
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
        </head>
        <body>
            ${html}
        <script>${js}</script>
        </body>
        `;
      setTimeout(() => {
        setCode(code);
      }, 250);
    }
    //console.log(timeout);
  }, [html, css, js, title, setCode, history]);

  useEffect(() => {
    if (localStorage.getItem("auth-token") === null) {
      history.push("/login");
    } else {
      const fetchCode = async () => {
        try {
          const res = await fetch(
            process.env.REACT_APP_BACKEND_URL + "/editor/" + _id,
            {
              method: "GET",
              headers: {
                "Content-type": "application/json",
                "auth-token": localStorage.getItem("auth-token"),
              },
            }
          );
          const data = await res.json();
          //   console.log(data);
          setLoader(false);
          if (res.ok) {
            setHtml(data.html);
            setJs(data.js);
            setCss(data.css);
            setTitle(data.title);
            setType(data.type);
          } else {
            if (data.message === "Invalid Token") {
              history.push("/login");
              localStorage.removeItem("auth-token");
              toast("You are Logged out. Please Log In again");
            } else if (res.status === 404) {
              toast("No Such File Found");
              history.push("/user");
            } else if (403) {
              toast("You are not Authorized");
              history.push("/user");
            }
          }
        } catch (err) {
          setLoader(false);
          console.log(err);
        }
      };
      fetchCode();
    }
  }, [_id, history]);

  const onSave = async () => {
    setLoader(true);
    const req = { html, js, css };
    try {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/editor/" + _id,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
          body: JSON.stringify(req),
        }
      );
      if (res.ok) {
        const data = await res.json();
        if (!data) toast("Sorry, Unable to Update");
        else toast("Updated Successfully");
      } else if (res.status === 403) {
        toast("You cannot update the Code");
      } else if (res.status === 404) {
        toast("File not Found");
      }
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  const onDelete = async () => {
    // console.log('delete');
    setLoader(true);
    try {
      const res = await fetch(
        process.env.REACT_APP_BACKEND_URL + "/editor/" + _id,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        if (!data) toast("Sorry, Unable to Delete");
        else {
          toast("Deleted Successfully");
          history.push("/user");
        }
      } else {
        if (res.status === 403) toast("You are not Authorized to Delete");
      }
      setLoader(false);
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };

  return (
    <>
      {loader ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Loader />
        </div>
      ) : (
        <div className="page-container">
          <Nav
            onSave={onSave}
            isDelete={true}
            isIcon={true}
            onDelete={onDelete}
            type={type}
            setHeight={setHeight}
          />
          <Editor
            html={html}
            css={css}
            js={js}
            setHtml={setHtml}
            setCss={setCss}
            setJs={setJs}
          />
          <div className="frame" style={{ height: height ? "100vh" : "39vh" }}>
            <iframe
              srcDoc={code}
              title="Document"
              /*Title option*/
              /*sandbox option*/
              /*frameBorder option*/
              /*width-height option*/
              /*Title option*/
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default Specific;
