import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";
import Facebook from "../components/Facebook";
import Google from "../components/Google";
import { isAuth, authenticate } from "../components/helper";

import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Register = ({ history }) => {
  const [formData, setFormData] = useState({
    firstname: "david",
    lastname: "devison",
    email: "oluwatosindavid393@gmail.com",
    password: "Dolad100",
    buttonText: "Submit",
  });
  const [buttonDisable, setButtonDisable] = useState(false);
  const [showSubmittedMessage, setShowSubmittedMessage] = useState("");

  const handleChange = (name) => (event) => {
    setFormData({ ...formData, [name]: event.target.value });
  };

  const informParent = (response) => {
    authenticate(response, () => {
      isAuth() && isAuth().role === "admin"
        ? history.push("/admin")
        : history.push("/dashboard");
    });
  };
  const { lastname, firstname, email, password, buttonText } = formData;

  const clickSubmit = (event) => {
    event.preventDefault();
    setFormData({ ...formData, buttonText: "Submitting" });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/signup`,
      data: { firstname, lastname, email, password },
    })
      .then((response) => {
        console.log("SIGNIN SUCCESS", response);
        setFormData({
          ...formData,
          name: "",
          email: "",
          password: "",
          buttonText: "Submitted",
        });
        setButtonDisable(!buttonDisable);
        toast.success(response.data.message);
        setShowSubmittedMessage(response.data.message);
      })
      .catch((error) => {
        console.log("SIGNIN ERROR", error);
        toast.error("email already exit");
        setFormData({ ...formData, buttonText: "Submit" });
      });
  };

  return (
    <div>
      <ToastContainer />
      <div className="d-flex align-items-center justify-content-center auth px-0">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 col-sm-12 col-md-8 mx-auto">
            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
              <div className="brand-logo">
                <img
                  src={require("../../../assets/images/logo.svg")}
                  alt="logo"
                />
              </div>
              <h4>New here?</h4>
              <h6 className="font-weight-light">
                Signing up is easy. It only takes a few steps
              </h6>
              {showSubmittedMessage !== "" ? (
                <div className="col-sm-12 col-md-12 col-lg-12">
                  <Alert variant="success">{showSubmittedMessage}</Alert>
                </div>
              ) : null}

              <form className="pt-3">
                <div className="form-group row">
                  <div className="col-md-6 col-lg-6 col-sm-6">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      value={firstname}
                      id="exampleInputUsername1"
                      placeholder="Firstname"
                      onChange={handleChange("firstname")}
                    />
                  </div>
                  <div className="col-md-6 col-lg-6 col-sm-6">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      value={lastname}
                      id="exampleInputUsername1"
                      placeholder="Lastname"
                      onChange={handleChange("lastname")}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    value={email}
                    id="exampleInputEmail1"
                    placeholder="Email"
                    onChange={handleChange("email")}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    value={password}
                    id="exampleInputPassword1"
                    placeholder="Password"
                    onChange={handleChange("password")}
                  />
                </div>
                <div className="mb-4">
                  <div className="form-check">
                    <label className="form-check-label text-muted">
                      <input type="checkbox" className="form-check-input" />
                      <i className="input-helper"></i>I agree to all Terms &
                      Conditions
                    </label>
                  </div>
                </div>
                <div className="mb-2">
                  {/* <button
                    type="button"
                    className="btn btn-block btn-facebook auth-form-btn"
                    disabled={buttonDisable}
                  >
                    <i className="mdi mdi-facebook mr-2"></i>Connect using
                    Facebook
                  </button> */}
                  <Facebook informParent={informParent} />
                </div>
                <div className="mb-2">
                  <Google informParent={informParent} />

                  {/* <button
                    type="button"
                    className="btn btn-block btn-google auth-form-btn"
                    disabled={buttonDisable}
                  >
                    <i className="mdi mdi-google mr-2"></i>Connect using Google
                  </button> */}
                </div>
                <div className="mt-3">
                  <Button
                    className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                    onClick={clickSubmit}
                    disabled={buttonDisable}
                  >
                    {buttonText}
                  </Button>
                </div>
                <div className="text-center mt-4 font-weight-light">
                  Already have an account?{" "}
                  <Link to="/auth/login" className="text-primary">
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
