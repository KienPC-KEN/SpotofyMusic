import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import ic_home_active from "../../assets/images/ic_home_active.png";
import ic_home from "../../assets/images/ic_home.png";
import ic_search from "../../assets/images/ic_search.png";
import ic_search_active from "../../assets/images/ic_search_active.png";
import "../../styles/NavTabStyle.scss";
const NavTab = () => {
  const location = useLocation();

  const isActive = (path: any) => {
    return location.pathname === path;
  };
  return location.pathname !== "/login" && location.pathname !== "/register" ? (
    <Nav defaultActiveKey="/home" className="menu d-flex flex-column bg-black">
      <h4 className="align-self-center mb-sm-5">SPOTOFY</h4>
      <Nav.Link className="menu-item" as={NavLink} to="/">
        <img src={isActive("/") ? ic_home_active : ic_home} alt="Lỗi" />
        Home
      </Nav.Link>
      <Nav.Link className="menu-item" as={NavLink} to="/search">
        <img src={isActive("/search") ? ic_search_active : ic_search} alt="" />
        Search
      </Nav.Link>
    </Nav>
  ) : null;
};

export default NavTab;
