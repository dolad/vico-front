import React, { Component } from "react";
import Routes from "./Routes";
import "react-toastify/dist/ReactToastify.min.css";
import { IntlProvider } from "react-intl";

import "./Global.scss";
class App extends Component {
  render() {
    return (
      <IntlProvider locale="pt" defaultLocale="en">
        <Routes />
      </IntlProvider>
    );
  }
}

export default App;
