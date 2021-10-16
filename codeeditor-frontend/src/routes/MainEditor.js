import React from "react";
import Editor from "../components/Editor";
import Nav from "../components/Nav";
import SaveModal from "../components/SaveModal";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const MainEditor = () => {
  const history = useHistory();
  // const location=useLocation();

  const [code, setCode] = useState("");
  const [js, setJs] = useState("");
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [title, setTitle] = useState("");
  const [access, setAccess] = useState(1);

  const [saveModel, setSaveModel] = useState(false);
  const [valid, setValid] = useState(false);

  const [loader, setLoader] = useState(false);
  const [height, setHeight] = useState(false);

  /*const random=()=>{
        var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var result = '';
        for ( var i = 0; i <5; i++ ) {
            result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
        }
        return result;
    };
    
    useEffect(() => {
        if(location.state && location.state.title!=="")
        setTitle(location.state.title);
        else setTitle(random);
    }, [history,location]);*/

  useEffect(() => {
    if (localStorage.getItem("auth-token") === null) {
      history.push("/login");
      return;
    }
    const code = `
        <html>
        <head>
            <title>Untitled</title>
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
    //console.log(timeout);
  }, [html, css, js, setCode, history]);

  const onSave = async () => {
    setLoader(true);
    const type = access;
    const req = { html, js, css, title, type };
    //  console.log(title,type);
    try {
      const res = await fetch(process.env.REACT_APP_BACKEND_URL + "/editor", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: JSON.stringify(req),
      });
      const data = await res.json();
      //   console.log(data);
      setLoader(false);
      if (res.ok) {
        history.push(`/user/${data.code}`);
        toast("Saved Successfully");
      } else {
        if (data.message === "Invalid Token") {
          history.push("/login");
          localStorage.removeItem("auth-token");
          toast("You are Logged out. Please Log In again");
        } else if (res.status === 400) {
          setValid(true);
        }
      }
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
          {saveModel ? (
            <SaveModal
              onSave={onSave}
              setTitle={setTitle}
              setSaveModel={setSaveModel}
              setAccess={setAccess}
              access={access}
              valid={valid}
            />
          ) : null}
          <Nav
            onSave={() => setSaveModel((prev) => !prev)}
            isDelete={false}
            isIcon={true}
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

export default MainEditor;
