import React, { useContext, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { APIContext } from "../context/Context";
import { signout } from "../auth/components/helper";
import { withRouter } from "react-router-dom";

const Navbar = ({ history }) => {
  const { state } = useContext(APIContext);
  const { usersdata } = state;
  console.log(usersdata);

  const toggleOffcanvas = () => {
    document.querySelector(".sidebar-offcanvas").classList.toggle("active");
  };
  const signUserOut = (e) => {
    e.preventDefault();
    signout(() => {
      history.push("/auth/login");
    });
  };
  return (
    <nav className="navbar  col-lg-12 col-12 p-lg-0 fixed-top d-flex flex-row">
      <div className="navbar-menu-wrapper d-flex align-items-center justify-content-between">
        <a
          className="navbar-brand brand-logo-mini align-self-center d-lg-none"
          href="!#"
          onClick={(evt) => evt.preventDefault()}
        >
          <img src={require("../../assets/images/logo-mini.svg")} alt="logo" />
        </a>
        <button
          className="navbar-toggler navbar-toggler align-self-center"
          type="button"
          onClick={() => document.body.classList.toggle("sidebar-icon-only")}
        >
          <i className="mdi mdi-menu"></i>
        </button>
        <ul className="navbar-nav navbar-nav-right ml-lg-auto">
          <li className="nav-item  nav-profile border-0">
            <Dropdown alignRight>
              <Dropdown.Toggle className="nav-link count-indicator bg-transparent">
                <span className="profile-text">
                  {usersdata.firstname} {""} {usersdata.lastname}
                </span>
                {/* <img
                    className="img-xs rounded-circle"
                    src={require("../../assets/images/faces/face8.jpg")}
                    alt="Profile"
                  /> */}
              </Dropdown.Toggle>
              <Dropdown.Menu className="preview-list navbar-dropdown pb-3">
                <Dropdown.Item
                  className="dropdown-item preview-item d-flex align-items-center border-0 mt-2"
                  onClick={(evt) => evt.preventDefault()}
                >
                  Manage Accounts
                </Dropdown.Item>
                <Dropdown.Item
                  className="dropdown-item preview-item d-flex align-items-center border-0"
                  onClick={(evt) => evt.preventDefault()}
                >
                  Change Password
                </Dropdown.Item>
                <Dropdown.Item
                  className="dropdown-item preview-item d-flex align-items-center border-0"
                  onClick={(evt) => evt.preventDefault()}
                >
                  Check Inbox
                </Dropdown.Item>
                <Dropdown.Item
                  className="dropdown-item preview-item d-flex align-items-center border-0"
                  onClick={(evt) => signUserOut(evt)}
                >
                  Sign Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
        <button
          className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
          type="button"
          onClick={toggleOffcanvas}
        >
          <span className="mdi mdi-menu"></span>
        </button>
      </div>
    </nav>
  );
};

export default withRouter(Navbar);
