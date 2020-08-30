import React, { useState, Fragment } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [values, setValues] = useState({
    email: "",
    buttonText: "Request password reset link",
  });

  const { email, buttonText } = values;

  const handleChange = (name) => (event) => {
    // console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/forgot-password`,
      data: { email },
    })
      .then((response) => {
        console.log("FORGOT PASSWORD SUCCESS", response);
        toast.success(response.data.message);
        setValues({ ...values, buttonText: "Requested" });
      })
      .catch((error) => {
        console.log("FORGOT PASSWORD ERROR", error.response.data);
        toast.error(error.response.data.error);
        setValues({ ...values, buttonText: "Request password reset link" });
      });
  };

  const forgotPassword = () => (
    <div class="bg-gradient-primary">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-6 col-lg-6 col-md-8 col-sm-10">
            <div class="card o-hidden border-0 shadow-lg my-5">
              <div class="card-body p-0">
                <div class="row d-flex justify-content-center align-items-center">
                  <div class="col-lg-10 col-sm-12 col-md-8">
                    <div class="p-5">
                      <div class="text-center">
                        <h5 class="h4 text-gray-900 mb-4">
                          Worth Board Care About you
                        </h5>
                        <h1 class="h4 text-gray-900 mb-2">
                          Forgot Your Password?
                        </h1>
                        <p class="mb-4">
                          We get it, stuff happens. Just enter your email
                          address below and we'll send you a link to reset your
                          password!
                        </p>
                      </div>
                      <form class="user">
                        <div class="form-group">
                          <input
                            type="email"
                            className="form-control form-control-user"
                            onChange={handleChange("email")}
                            style={{ height: 40 }}
                            value={email}
                            aria-describedby="emailHelp"
                            placeholder="Enter Email Address..."
                          />
                        </div>

                        <button
                          onClick={clickSubmit}
                          style={{ height: 40 }}
                          class="btn btn-primary btn-user btn-block"
                        >
                          {buttonText}
                        </button>
                      </form>
                      <hr />
                      <div class="text-center">
                        <Link className="small" to="/">
                          Create an Account!
                        </Link>
                      </div>
                      <div class="text-center">
                        <Link className="small" to="/auth/login">
                          Already have an account? Login!
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
    <Fragment>
      <ToastContainer />
      {forgotPassword()}
    </Fragment>
  );
};

export default ForgotPassword;
