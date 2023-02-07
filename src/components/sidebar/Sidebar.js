import "./sidebar.css";
import {useEffect, useState} from "react"

import { axiosInstance } from "../../axiosInstance";
// import { Link } from "react-router-dom";

export default function Sidebar() {
  const [cats, setCats] = useState([])

  useEffect(() => {
    const getCats = async () => {
      const res = await axiosInstance.get("/cats")
      setCats(res.data)
    }
    getCats()
  },[])
  return (
    <div className="sidebar">
      <div className="sidebaritem">
        <span className="sidebartitle">ABOUT DEVELOPER</span>
        {/* <img
          src=
          alt=""
        /> */}
        <p>
         This Blog application was developed for learning purposes. It uses React JS for Frontend, Node JS for Backend and Mongo DB as database.
        </p>
      </div>
      {/* <div className="sidebaritem">
      <span className="sidebartitle">CATEGORIES</span>
      <ul className="sidebarlist">
     {cats.map((c) => (
      <Link className="link" to={`/?cat=${c.name}`}>
      <li key={c._id} className="sidebarlistitem">{c.name}</li>
      </Link>
     ))}
      </ul>
      </div> */}
      <div className="sidebaritem">
        <span className="sidebartitle">FOLLOW US</span>
        <div className="sidebarsocial">
        <i className="sidebaricon fa-brands fa-facebook"></i>
        <i className="sidebaricon fa-brands fa-twitter"></i>
        <i className="sidebaricon fa-brands fa-instagram"></i>
        </div>
      </div>
    </div>
  );
}
