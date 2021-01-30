import React, { useState } from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faFileCode,
  faSignOutAlt,
  faSignInAlt,
  faUserPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";
import { Image } from "react-bootstrap";

const SideBar = ({
  vertical,
  horizontal,
  navbarBS,
  className,
  logOut,
  ...attrs
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = (event) => {
    setExpanded(!expanded);
  };
  let verticalClass;

  if (vertical === true || vertical === "xs") {
    verticalClass = "flex-column";
  } else if (vertical === false) {
    verticalClass = false;
  } else if (typeof vertical === "string") {
    verticalClass = `flex-${vertical}-column`;
  }

  const classes = classNames(
    className,
    navbarBS ? "navbar-nav" : "nav",
    expanded && "expanded",
    horizontal && `justify-content-${horizontal}`,
    verticalClass
  );
  return (
    <>
      <nav {...attrs} className={classes}>
        <div
          onClick={toggleExpanded}
          className="toggle-nav my-2"
        >
          {!expanded && "Close"}
          <FontAwesomeIcon icon={faBars} size="lg"/>
        </div>
        <div className="sidebar-avatar">
          <Image
            src={`/logo192.png`}
            alt="user sidebar avatar"
            className="mx-auto"
          />
        </div>
        <NavLink to="/userslist" className="nav-link">
          <FontAwesomeIcon icon={faUsers} />
          {!expanded && "Users List"}
        </NavLink>
        <NavLink to="/tutorials" className="nav-link">
          <FontAwesomeIcon icon={faFileCode} />
          {!expanded && "Tutorials List"}
        </NavLink>
        <hr />
        <NavLink to="/login" className="nav-link">
          <FontAwesomeIcon icon={faSignInAlt} />
          {!expanded && "Sign In"}
        </NavLink>
        <NavLink to="/signup" className="nav-link">
          <FontAwesomeIcon icon={faUserPlus} />
          {!expanded && "Sign Up"}
        </NavLink>
        <hr />
        <NavLink to="/home" className="nav-link" onClick={logOut}>
          <FontAwesomeIcon icon={faSignOutAlt} />
          {!expanded && "Sign Out"}
        </NavLink>
      </nav>
    </>
  );
};

export default SideBar;
