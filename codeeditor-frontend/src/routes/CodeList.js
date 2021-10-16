import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Loader from "../components/Loader";
import Nav from "../components/Nav";
import { toast } from "react-toastify";

const CodeList = () => {
  const history = useHistory();
  const [list, setlist] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("auth-token") === null) {
      history.push("/login");
    } else {
      const fetchList = async () => {
        try {
          const res = await fetch(
            process.env.REACT_APP_BACKEND_URL + "/editor",
            {
              method: "GET",
              headers: {
                "Content-type": "application/json",
                "auth-token": localStorage.getItem("auth-token"),
              },
            }
          );
          const data = await res.json();
          setLoader(false);
          if (res.ok) setlist(data);
          else {
            if (data.message === "Invalid Token") history.push("/login");
            localStorage.removeItem("auth-token");
            toast("You are Logged out. Please Log In again");
          }
          // console.log(data);
        } catch (err) {
          console.log(err);
          setLoader(true);
        }
      };
      fetchList();
    }
  }, [history]);

  const create = (e) => {
    e.preventDefault();
    history.push("/editor");
  };

  /*const getTitle = (data) => {
    if (data.length <= 20) return data;
    let a = data.substring(0, 20);
    a = a + "...";
    return data;
  };*/

  return (
    <div>
      <Nav />
      <div>
        <div className="codelist-saved">
          Add New Code
          <hr />
        </div>

        <div style={{ paddingLeft: "100px", paddingRight: "100px" }}>
          <div
            className="codelist-item-new"
            onClick={create}
            style={{ cursor: "pointer" }}
          >
            <span>
              <i className="fas fa-plus"></i> New
            </span>
          </div>
        </div>

        <div className="codelist-saved">
          Saved Codes
          <hr />
        </div>

        <div style={{ paddingLeft: "100px", paddingRight: "100px" }}>
          {loader ? (
            <Loader />
          ) : list.length !== 0 ? (
            <div className="codelist-list">
              {list.map((item) => (
                <Link
                  to={`/user/${item._id}`}
                  key={item._id}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <div className="codelist-item">{item.title}</div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="codelist-item-message">No Saved Code</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeList;

/*{
                        isTitle?
                        <span>
                            <input className="w70" type="text" placeholder="Enter Title" value={title} onChange={(e)=>setTitle(e.target.value)}></input>
                            <button onClick={create}>Create</button>
                        </span>:null
                    }
                    */
