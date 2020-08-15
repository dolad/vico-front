import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Collapse } from "react-bootstrap";
import "../App.css";

class Sidebar extends Component {
  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({ [menuState]: false });
    } else if (Object.keys(this.state).length === 0) {
      this.setState({ [menuState]: true });
    } else {
      Object.keys(this.state).forEach((i) => {
        this.setState({ [i]: false });
      });
      this.setState({ [menuState]: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector("#sidebar").classList.remove("active");
    Object.keys(this.state).forEach((i) => {
      this.setState({ [i]: false });
    });
  }
  render() {
    return (
      <nav className="sidebar sidebar-offcanvas" id="sidebar">
        <div className="text-center sidebar-brand-wrapper d-flex align-items-center">
          <a className="sidebar-brand brand-logo" href="index.html">
            {/* <img src={require("../../assets/images/logo.svg")} alt="logo" /> */}
            <h4>Vico fintech</h4>
          </a>
          <a className="sidebar-brand brand-logo-mini pt-3" href="index.html">
            <img
              src={require("../../assets/images/logo-mini.svg")}
              alt="logo"
            />
          </a>
        </div>
        <ul className="nav">
          <li
            className={
              this.isPathActive("/dashboard") ? "nav-item active" : "nav-item"
            }
          >
            <Link className="nav-link" to={`${this.props.match.url}`}>
              <i className="mdi mdi-television menu-icon"></i>
              <span className="menu-title font-size-15">Dashboard</span>
            </Link>
          </li>

          <li
            className={
              this.isPathActive("/dashboard/assets")
                ? "nav-item active"
                : "nav-item"
            }
          >
            <Link className="nav-link" to={`${this.props.match.url}/assets`}>
              <i className="mdi mdi-bank menu-icon"></i>
              <span className="menu-title">Assets</span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive("/dashboard/expenses")
                ? "nav-item active"
                : "nav-item"
            }
          >
            <Link className="nav-link" to={`${this.props.match.url}/expenses`}>
              <i className="mdi mdi-google-circles-group menu-icon"></i>
              <span className="menu-title">Expenses</span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive("/dashboard/services")
                ? "nav-item active"
                : "nav-item"
            }
          >
            <Link className="nav-link" to={`${this.props.match.url}/services`}>
              <i className="mdi  mdi-briefcase-upload menu-icon"></i>
              <span className="menu-title">Services</span>
            </Link>
          </li>
          <li
            className={
              this.isPathActive("/dashboard/users-profile")
                ? "nav-item active"
                : "nav-item"
            }
          >
            <Link
              className="nav-link "
              to={`${this.props.match.url}/users-profile`}
            >
              <i className="mdi mdi-account menu-icon"></i>
              <span className="menu-title">Users Profile</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add className 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector("body");
    document.querySelectorAll(".sidebar .nav-item").forEach((el) => {
      el.addEventListener("mouseover", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.add("hover-open");
        }
      });
      el.addEventListener("mouseout", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.remove("hover-open");
        }
      });
    });
  }
}

export default withRouter(Sidebar);
