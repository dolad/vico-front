import React, { useState, Fragment } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

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
          <div class="col-xl-10 col-lg-12 col-md-9">
            <div class="card o-hidden border-0 shadow-lg my-5">
              <div class="card-body p-0">
                <div class="row">
                  <div class="col-lg-6 d-none d-lg-block bg-password-image"></div>
                  <div class="col-lg-6">
                    <div class="p-5">
                      <div class="text-center">
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
                            class="form-control form-control-user"
                            id="exampleInputEmail"
                            onChange={handleChange("email")}
                            value={email}
                            aria-describedby="emailHelp"
                            placeholder="Enter Email Address..."
                          />
                        </div>

                        <button
                          onClick={clickSubmit}
                          class="btn btn-primary btn-user btn-block"
                        >
                          {buttonText}
                        </button>
                      </form>
                      <hr />
                      <div class="text-center">
                        <a class="small" href="register.html">
                          Create an Account!
                        </a>
                      </div>
                      <div class="text-center">
                        <a class="small" href="login.html">
                          Already have an account? Login!
                        </a>
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
