import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Alert } from "react-bootstrap";
import Facebook from "../components/Facebook";
import Google from "../components/Google";
import { isAuth, authenticate } from "../components/helper";
// import "../../mystyle.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Register = ({ history }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    buttonText: "Register",
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

  const Form = () => (
    <div class="bg-gradient-primary">
      <div class="container mt-5">
        <div class="row justify-content-center align-items-center">
          <div class="col-xl-6 col-lg-8 col-md-8 col-sm-10">
            <div class="card o-hidden border-0 shadow-lg my-5">
              <div class="card-body p-0">
                <div class="row d-flex justify-content-center align-items-center">
                  <div class="col-sm-12 col-md-12 col-lg-11">
                    {showSubmittedMessage !== "" ? (
                      <div className="col-sm-12 col-md-12 col-lg-12">
                        <Alert variant="success">{showSubmittedMessage}</Alert>
                      </div>
                    ) : null}
                    <div class="p-5">
                      <div class="text-center">
                        <h1 class="h4 text-gray-900 mb-4">WorthBoard</h1>
                        <h5 class="h4 text-gray-900 mb-4">
                          One Step to Join us
                        </h5>
                      </div>
                      <form className="pt-3">
                        <div className="form-group row">
                          <div className="col-md-6 col-lg-6 col-sm-6">
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              value={firstname}
                              placeholder="Firstname"
                              onChange={handleChange("firstname")}
                            />
                          </div>
                          <div className="col-md-6 col-lg-6 col-sm-6">
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              value={lastname}
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
                            placeholder="Email"
                            onChange={handleChange("email")}
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control form-control-lg"
                            value={password}
                            placeholder="Password"
                            onChange={handleChange("password")}
                          />
                        </div>
                        <div className="mb-4">
                          <div className="form-check">
                            <label className="form-check-label text-muted">
                              <input
                                type="checkbox"
                                className="form-check-input"
                              />
                              <i className="input-helper"></i>I agree to all
                              Terms & Conditions
                            </label>
                          </div>
                        </div>

                        <Facebook informParent={informParent} />
                        <Google informParent={informParent} />
                        <Button
                          className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                          onClick={clickSubmit}
                          style={{ height: 40 }}
                          disabled={buttonDisable}
                        >
                          {buttonText}
                        </Button>
                        <div className="text-center mt-4 font-weight-light">
                          Already have an account?{" "}
                          <Link to="/auth/login" className="text-primary">
                            Login
                          </Link>
                        </div>
                      </form>
                      <hr />
                      <div className="text-center">
                        <Link className="small" to="/auth/password/forgot">
                          Forgot password
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <ToastContainer />
      {Form()}
    </div>
  );
};

export default Register;
