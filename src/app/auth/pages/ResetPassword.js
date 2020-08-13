import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const ResetPassword = ({ match, history }) => {
  // props.match from react router dom
  const [values, setValues] = useState({
    name: "",
    token: "",
    newPassword: "",
    buttonText: "Reset password",
  });

  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token);
    // console.log(name);
    if (token) {
      setValues({ ...values, name, token });
    }
  }, []);

  const { name, token, newPassword, buttonText } = values;

  const ChangeHandler = (event) => {
    setValues({ ...values, newPassword: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/reset-password`,
      data: { newPassword, resetPasswordLink: token },
    })
      .then((response) => {
        console.log("RESET PASSWORD SUCCESS", response);
        toast.success(response.data.message);
        setValues({ ...values, buttonText: "Done" });
        history.push("/dashboard");
      })
      .catch((error) => {
        console.log("RESET PASSWORD ERROR", error.response.data);
        toast.error(error.response.data.error);
        setValues({ ...values, buttonText: "Reset password" });
      });
  };

  const resetPassword = () => (
    <div className="bg-gradient-primary">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10 col-lg-12 col-md-9">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-password-image"></div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="p-5 text-center">
                          Hey {name}, Type your new password
                        </h1>
                      </div>
                      <form className="user">
                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control form-control-user"
                            id="exampleRepeatPassword"
                            placeholder="Repeat Password"
                            onChange={(e) => ChangeHandler(e)}
                            value={newPassword}
                          />
                        </div>
                        <button
                          onClick={clickSubmit}
                          className="btn btn-primary btn-user btn-block"
                        >
                          {buttonText}
                        </button>
                      </form>
                      <hr />
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
      {resetPassword()}
    </Fragment>
  );
};

export default ResetPassword;
