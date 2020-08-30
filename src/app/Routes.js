import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PrivateRoutes from "./auth/components/PrivateRoutes";
import Spinner from "./shared/Spinner";

const DashboardLayout = lazy(() => import("./dashboard/DashboardLayout"));
const Login = lazy(() => import("./auth/pages/Login"));
const Register = lazy(() => import("./auth/pages/Register"));
const Activate = lazy(() => import("./auth/pages/ActivateAcc"));
const ForgotPassword = lazy(() => import("./auth/pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./auth/pages/ResetPassword"));

const Home = lazy(() => import("./component/Home"));

class Routes extends Component {
  render() {
    return (
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/" exact component={Register}></Route>
          <PrivateRoutes
            path="/dashboard"
            component={DashboardLayout}
          ></PrivateRoutes>
          <Route path="/auth/login" component={Login}></Route>
          <Route path="/auth/register" component={Register}></Route>
          <Route path="/auth/activate/:token" component={Activate}></Route>
          <Route
            path="/auth/password/forgot"
            component={ForgotPassword}
          ></Route>
          <Route
            path="/auth/password/reset/:token"
            exact
            component={ResetPassword}
          />
        </Switch>
      </Suspense>
    );
  }
}

export default Routes;
