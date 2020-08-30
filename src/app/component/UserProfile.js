import React, { useContext } from "react";
import { APIContext } from "../context/Context";

const UserProfile = () => {
  const { state } = useContext(APIContext);
  const { usersdata } = state;
  console.log(usersdata.email);

  return (
    <div>
      <div className="container">
        <div className="row card">
          <div className="col-sm-12 col-md-10 col-md-10">
            <div className="row">
              <div class="col-md-6 pt-2">
                <div class="profile-img">
                  <img
                    src={require("../../assets/images/profile.png")}
                    alt="User profile image"
                  />
                </div>
                <div class="profile-head pt-4 pb-4 ml-3">
                  <h2>
                    {usersdata.firstname} {""} {usersdata.lastname}
                  </h2>
                </div>
              </div>
              <div class="col-md-6 pt-5">
                <div className="row">
                  <div class="col-md-4 col-lg-4 col-sm-6">
                    <label>Name</label>
                  </div>
                  <div class="col-md-8 col-lg-8 col-sm-12 text-capitalize">
                    <h5>
                      {usersdata.firstname} {usersdata.lastname}
                    </h5>
                  </div>
                </div>
                <div className="row pt-3">
                  <div class="col-md-4 col-lg-4 col-sm-12">
                    <label>Email</label>
                  </div>
                  <div class="col-md-8 col-sm-12 col-lg-8">
                    <h5>
                      <p>{usersdata.email}</p>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* */}
          {/* 
        </div>
        <div class="row">
          <div class="col-md-4"></div>
          <div class="col-md-8">
            <div class="row">
              <div class="col-md-6">
                <label>Name</label>
              </div>
              <div class="col-md-6">
                {usersdata.firstname} {""} {usersdata.lastname}
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label>Email</label>
              </div>
              <div class="col-md-6">
                <p>{usersdata.email}</p>
              </div>
            </div>
          </div>
      </div> */}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
