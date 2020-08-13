import React, { useState, useEffect, Fragment } from "react";
import jwt from "jsonwebtoken";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { authenticate, isAuth } from "../components/helper";

const Activate = ({ match, history }) => {
  const [values, setValues] = useState({
    firstname: "",
    token: "",
    show: true,
  });

  useEffect(() => {
    const token = match.params.token;
    console.log(match);
    const { firstname } = jwt.decode(token);

    if (token) {
      setValues({ ...values, firstname: firstname, token: token });
    }
  }, []);

  const { firstname, token } = values;

  const clickSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/account-activation`,
      data: { token },
    })
      .then((response) => {
        console.log("ACCOUNT-ACTIVATION", response);
        // save the response (user, token) localstorage/cookie

        setValues({ ...values, show: false });
        toast.success(`Hey ${response.data.message}, Welcome back!`);
        history.push("/dashboard");
      })
      .catch((error) => {
        console.log("ACCOUNT ACTIVATION ERROR", error.response.data);
        toast.error(error.response.data.error);
      });
  };

  const activationLink = () => (
    <div className="text-center">
      <h1 className="p-5">Hey {firstname}, Ready to activate your account?</h1>
      <button className="btn btn-outline-primary" onClick={clickSubmit}>
        Activate Account
      </button>
    </div>
  );

  return (
    <Fragment>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        {activationLink()}
      </div>
    </Fragment>
  );
};

export default Activate;
