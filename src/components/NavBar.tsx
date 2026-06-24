import type React from "react";
import { Link } from "react-router-dom";
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarLeftExpand,
} from "react-icons/tb";
import { SlOptionsVertical } from "react-icons/sl";

import { sideBarData, dataUser } from "../data/SideBarData";
import "./NavBar.css";

interface NavBarProps {
  sideBar: boolean;
  setSideBar: (value: boolean) => void;
}

export const NavBar: React.FC<NavBarProps> = ({ sideBar, setSideBar }) => {
  return (
    <>
      <header className="navbar">
        <button className="menu-bars" onClick={() => setSideBar(!sideBar)}>
          {sideBar ? (
            <TbLayoutSidebarLeftCollapse />
          ) : (
            <TbLayoutSidebarLeftExpand />
          )}
        </button>
      </header>

      <nav className={sideBar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items">
          {sideBarData.map((item, index) => (
            <li key={index} className={item.classN}>
              <Link to={item.path}>
                <span className="nav-icon">{item.icon}</span>
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-menu-footer">
          <div className="user-profile">
            <img
              className="image-user"
              src="https://cdn-icons-png.flaticon.com/512/9187/9187604.png"
              alt="user"
            />
            <span>{dataUser.user}</span>
            <SlOptionsVertical className="user-options" />
          </div>
        </div>
      </nav>
    </>
  );
};
