import React, { useState } from "react";
import Facebook from "../components/Facebook";
import Google from "../components/Google";
import { isAuth, authenticate } from "../components/helper";
import { Redirect, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Login = ({ history }) => {
  const [values, setValues] = useState({
    email: "oluwatosindavid393@gmail.com",
    password: "Dolad100",
    buttonText: "Submit",
  });

  const { email, password, buttonText } = values;

  const handleChange = (name) => (event) => {
    // console.log(event.target.value);
    setValues({ ...values, [name]: event.target.value });
  };

  const informParent = (response) => {
    authenticate(response, () => {
      isAuth() && isAuth().role === "admin"
        ? history.push("/admin")
        : history.push("/dashboard");
    });
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/signin`,
      data: { email, password },
    })
      .then((response) => {
        console.log("SIGNIN SUCCESS", response);
        authenticate(response, () => {
          setValues({
            ...values,
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            buttonText: "Submitted",
          });
          isAuth() && isAuth().role === "admin"
            ? history.push("/admin")
            : history.push("/dashboard");
          // toast.success(`Hey ${response.data.user.firstname}, Welcome back!`);
        });
        // save the response (user, token) localstorage/cookie
      })
      .catch((error) => {
        console.log("SIGNIN ERROR", error);
        setValues({ ...values, buttonText: "Submit" });
        toast.error(error);
      });
  };

  const formLogin = () => (
    <div class="bg-gradient-primary">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-10 col-lg-12 col-md-9">
            <div class="card o-hidden border-0 shadow-lg my-5">
              <div class="card-body p-0">
                <div class="row">
                  <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
                  <div class="col-lg-6">
                    <div class="p-5">
                      <div class="text-center">
                        <h1 class="h4 text-gray-900 mb-4">Welcome Back!</h1>
                      </div>
                      <form class="user">
                        <div class="form-group">
                          <input
                            type="email"
                            class="form-control form-control-user"
                            id="exampleInputEmail"
                            aria-describedby="emailHelp"
                            onChange={handleChange("email")}
                            value={email}
                            placeholder="Enter Email Address..."
                          />
                        </div>
                        <div class="form-group">
                          <input
                            type="password"
                            class="form-control form-control-user"
                            onChange={handleChange("password")}
                            value={password}
                            id="exampleInputPassword"
                            placeholder="Password"
                          />
                        </div>
                        <div class="form-group">
                          <div class="custom-control custom-checkbox small">
                            <input
                              type="checkbox"
                              class="custom-control-input"
                              id="customCheck"
                            />
                            <label
                              class="custom-control-label"
                              for="customCheck"
                            >
                              Remember Me
                            </label>
                          </div>
                        </div>
                        <button
                          class="btn btn-primary btn-user btn-block"
                          onClick={clickSubmit}
                        >
                          {buttonText}
                        </button>
                        <hr />
                        <Facebook informParent={informParent} />
                        <Google informParent={informParent} />
                      </form>
                      <hr />
                      <div className="text-center">
                        <Link className="small" to="/forgot-password">
                          Forgot password
                        </Link>
                      </div>
                      <div className="text-center">
                        <Link className="small" to="/signin">
                          Already have an account ? Login here
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
    <React.Fragment>
      <ToastContainer />
      {formLogin()}
    </React.Fragment>
  );
};

export default Login;
