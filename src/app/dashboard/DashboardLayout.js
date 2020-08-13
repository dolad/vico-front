import React, { lazy, useEffect, useReducer, createContext } from "react";
import Context from "../context/Context";
import { withRouter, Route } from "react-router-dom";

import Navbar from "../shared/Navbar";
import Sidebar from "../shared/Sidebar";
import Footer from "../shared/Footer";
import ChartJs from "../charts/ChartJs";

const Dashboard = lazy(() => import("../dashboard/Dashboard"));
const Assets = lazy(() => import("../component/Asset"));
const Services = lazy(() => import("../component/Services"));
const Expenses = lazy(() => import("../component/Expenses"));
const UserProfile = lazy(() => import("../component/UserProfile"));

// const ChartJs = lazy(() => import("../charts/ChartJs"));

const DashboardLayout = (props) => {
  return (
    <Context>
      <div className="container-scroller">
        <Navbar />
        <div className="container-fluid page-body-wrapper">
          <Sidebar />
          <div className="main-panel">
            <div className="content-wrapper">
              <Route path={`${props.match.url}/`} exact component={Dashboard} />
              <Route
                path={`${props.match.url}/charts`}
                exact
                component={ChartJs}
              />
              <Route
                path={`${props.match.url}/assets`}
                exact
                component={Assets}
              />
              <Route
                path={`${props.match.url}/services`}
                exact
                component={Services}
              />
              <Route
                path={`${props.match.url}/expenses`}
                exact
                component={Expenses}
              />
              <Route
                path={`${props.match.url}/users-profile`}
                exact
                component={UserProfile}
              />
              {/* <Route path={`${match.url}/erro`} exact component={Error404} /> */}
              {/* <Route path="/user-pages/error-500" exact component={Error500} /> */}
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </Context>
  );
};

export default withRouter(DashboardLayout);
