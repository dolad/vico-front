import React, { useContext } from "react";
import "../App.css";
import { APIContext } from "../context/Context";

const UserProfile = () => {
  const { state } = useContext(APIContext);
  const { usersdata } = state;
  console.log(usersdata.email);

  return (
    <div>
      <div class="container emp-profile">
        <form method="post">
          <div class="row">
            <div class="col-md-4">
              <div class="profile-img">
                <img
                  src={require("../../assets/images/profile.png")}
                  alt="User profile image"
                />
                <div class="file btn btn-lg btn-primary">
                  Change Photo
                  <input type="file" name="file" />
                </div>
              </div>
            </div>
            <div class="col-md-6 row">
              <div class="profile-head col-8">
                <h2>
                  {usersdata.firstname} {""} {usersdata.lastname}
                </h2>
              </div>
              <div class="col-md-4 text-right">
                <input
                  type="submit"
                  class="profile-edit-btn"
                  name="btnAddMore"
                  value="Edit Profile"
                />
              </div>
            </div>
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
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
