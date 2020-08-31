import React, { useState } from "react";
import Facebook from "../components/Facebook";
import Google from "../components/Google";
import { isAuth, authenticate } from "../components/helper";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const Login = ({ history }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
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
      <div class="container mt-5">
        <div class="row justify-content-center align-items-center">
          <div class="col-xl-6 col-lg-6 col-md-8 col-sm-10">
            <div class="card o-hidden border-0 shadow-lg my-5">
              <div class="card-body p-0">
                <div class="row d-flex justify-content-center align-items-center">
                  <div class="col-sm-12 col-md-12 col-lg-10">
                    <div class="p-5">
                      <div class="text-center">
                        <h1 class="h4 text-gray-900 mb-4">WorthBoard</h1>
                        <h5 class="h4 text-gray-900 mb-4">Welcome you</h5>
                      </div>
                      <form class="user">
                        <div class="form-group">
                          <input
                            type="email"
                            class="form-control form-control-user "
                            style={{ height: 40 }}
                            aria-describedby="emailHelp"
                            onChange={handleChange("email")}
                            value={email}
                            placeholder="Enter Email Address..."
                          />
                        </div>
                        <div class="form-group">
                          <input
                            type="password"
                            style={{ height: 40 }}
                            class="form-control form-control-user"
                            onChange={handleChange("password")}
                            value={password}
                            placeholder="Password"
                          />
                        </div>
                        {/* <div class="form-group">
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
                        </div> */}
                        <div className="submitButton">
                          <button
                            className="btn btn-primary btn-block"
                            style={{ height: 40 }}
                            onClick={clickSubmit}
                          >
                            {buttonText}
                          </button>
                        </div>
                        <hr />
                        <div>
                          <Facebook informParent={informParent} />
                        </div>

                        <Google informParent={informParent} />
                      </form>
                      <hr />
                      <div className="text-center">
                        <Link className="small" to="/forgot-password">
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
    <React.Fragment>
      <ToastContainer />
      {formLogin()}
    </React.Fragment>
  );
};

export default Login;
