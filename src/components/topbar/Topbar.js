import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css";

export default function Topbar() {
  const { user, dispatch } = useContext(Context);
  const PF = "https://blog-api-c8cy.onrender.com/images/"
  const handleLogout = (e) => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="top">
      <div className="top-left">
        <i className="topicon fa-brands fa-facebook"></i>
        <i className="topicon fa-brands fa-twitter"></i>
        <i className="topicon fa-brands fa-instagram"></i>
      </div>
      <div className="top-center">
        <ul className="toplist">
          <li className="toplistitem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="toplistitem">
            <Link className="link" to="/about">
              ABOUT
            </Link>
          </li>
          <li className="toplistitem">
            <Link className="link" to="/contact">
              CONTACT
            </Link>
          </li>
          <li className="toplistitem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="toplistitem" onClick={handleLogout}>
            <Link className="link" to="/logout">
              {user && "LOGOUT"}
            </Link>
          </li>
        </ul>
      </div>
      <div className="top-right">
        {user ? (
          <Link className="link" to ="/settings">
            {" "}
            <img className="topimg" src={user.profilePicture ? PF + user.profilePicture: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/profile-design-template-4c23db68ba79c4186fbd258aa06f48b3_screen.jpg?ts=1581063859"} alt="Profile" />{" "}
          </Link>
        ) : (
          <ul className="toplist">
            <li className="toplistitem">
              <Link className="link" to="/login">
                Login
              </Link>
            </li>
            <li className="toplistitem">
              {" "}
              <Link className="link" to="/register">
                Register
              </Link>
            </li>
          </ul>
        )}

        <i className="topsearchicon fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  );
}
