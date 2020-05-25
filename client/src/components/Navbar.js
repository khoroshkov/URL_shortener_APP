import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../context/Auth.Context";

export const Navbar = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const logoutHandler = (event) => {
    event.preventDefault();
    auth.logout();
    history.push("/");
  };
  return (
    <nav>
      <div className="nav-wrapper blue darken-2">
        <a href="/" className="brand-logo">
          Shorten URL's!
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <NavLink to="/create">Create links</NavLink>
          </li>
          <li>
            <NavLink to="/links">Your Links </NavLink>
          </li>
          <li>
            <a href="/" onClick={logoutHandler}>
            <i class="material-icons right" style={{fontSize: "16px"}}>input</i>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
