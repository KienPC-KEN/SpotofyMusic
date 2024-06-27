import React, { useState } from "react";
import "../styles/HeaderPageStyle.scss";
import avatar from "../assets/images/avatar.png";
import polygon from "../assets/images/ic_polygon.png";
import icSearch from "../assets/images/ic_search_black.png";
import { User } from "../model/User";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../redux/actions/HeaderAction";
import { login, isLogin } from "../redux/actions/AuthAction";

interface UserLoginProps {
  user: User;
  backgroundColor: string;
}

const HeaderPage: React.FC<UserLoginProps> = ({ user, backgroundColor }) => {
  const dispatch = useDispatch();
  const isLoginData = useSelector((state: any) => state.authData.isLogin);
  const [searchTermResult, setSearchTermResult] = useState("");
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTermResult(value);
    dispatch(setSearchTerm(value));
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(login(null));
    dispatch(isLogin(false));
  };

  return location.pathname !== "/login" && location.pathname !== "/register" ? (
    <div style={{ backgroundColor: `#${backgroundColor}` }} className="pb-sm-4">
      <div className="flex-row text-end">
        <div className="d-flex flex-row justify-content-between mx-sm-5 mt-sm-3">
          {location.pathname === "/search" ? (
            <div>
              <input
                type="search"
                className="input-search rounded-5"
                placeholder="Artists, songs, or podcasts"
                value={searchTermResult}
                onChange={(e) => handleInputChange(e)}
              />
              <img className="ic-search" src={icSearch} alt="" />
            </div>
          ) : (
            <div></div>
          )}
          {isLoginData ? (
            <div className="dropdown">
              <div
                onClick={toggleDropdown}
                data-bs-toggle="dropdown"
                aria-expanded={isDropdownOpen}
                className="d-flex bg-black bg-opacity-75 mt-sm-3 p-sm-1 rounded-5"
              >
                <img
                  src={user.image.trim() !== "" ? user.image : avatar}
                  className="rounded-circle me-sm-2"
                  alt=""
                  height={26}
                  width={26}
                />
                <span className="name-profile align-middle">{user.name}</span>
                <img
                  src={polygon}
                  alt=""
                  className="align-self-center me-sm-2"
                  height={7}
                  width={14}
                />
              </div>
              <ul
                className={`dropdown-menu ${
                  isDropdownOpen ? "show" : ""
                } bg-black bg-opacity-75 `}
              >
                <li className="item-dropdown">
                  <NavLink to={"/profile"}>
                    <label
                      style={{ color: "white", padding: 8, cursor: "pointer" }}
                    >
                      Profile
                    </label>
                  </NavLink>
                </li>
                <li className="item-dropdown">
                  <NavLink to={"/settings"}>
                    <label
                      style={{ color: "white", padding: 8, cursor: "pointer" }}
                    >
                      Settings
                    </label>
                  </NavLink>
                </li>
                <li className="item-dropdown">
                  <NavLink to={"/login"} onClick={() => handleLogout()}>
                    <label
                      style={{ color: "white", padding: 8, cursor: "pointer" }}
                    >
                      Logout
                    </label>
                  </NavLink>
                </li>
              </ul>
            </div>
          ) : (
            <div className="d-flex  mt-sm-3 p-sm-1 rounded-5 align-items-center">
              <NavLink className="btn-register" to={"/register"}>
                <label>Đăng ký</label>
              </NavLink>
              <NavLink className="btn-login" to={"/login"}>
                <label>Đăng nhập</label>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default HeaderPage;
