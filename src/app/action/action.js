import { isAuth, signout } from "../auth/components/helper";
import axios from "axios";

export const fetchData = async (dispatch, token, history) => {
  await axios({
    method: "GET",
    url: `${process.env.REACT_APP_API}/users/${isAuth()._id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log("PRIVATE PROFILE UPDATE", response.data.data);
      dispatch({ type: "FETCH_USER_SUCCESS", payload: response.data.data });
    })
    .catch((error) => {
      console.log("PRIVATE PROFILE UPDATE ERROR", error.response.data.error);
      dispatch({
        type: "FETCH_USER_FAILURE",
        payload: error.response.data.error,
      });
      if (error.response.status === 401) {
        signout(() => {
          history.push("/");
        });
      }
    });
};

export const fetchServiceData = async (dispatch, token) => {
  await axios({
    method: "GET",
    url: `${process.env.REACT_APP_API}/services`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log("Services", response.data);
      dispatch({ type: "FETCH_SERVICES_SUCCESS", payload: response.data });
    })
    .catch((e) => {
      console.log(e.data);
      dispatch({ type: "FETCH_SERVICES_FAILURE" });
    });
};

export const fetchAssetData = async (dispatch, token) => {
  await axios({
    method: "GET",
    url: `${process.env.REACT_APP_API}/assets`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log("FETCH_ASSET_DATA", response.data);
      dispatch({ type: "FETCH_ASSET_DATA", payload: response.data });
    })
    .catch((e) => {
      console.log("FETCH_ASSET_DATA", e.data);
      dispatch({ type: "FETCH_ASSET_ERROR" });
    });
};

export const fetchExpensesData = async (dispatch, token) => {
  await axios({
    method: "GET",
    url: `${process.env.REACT_APP_API}/expenses`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      console.log(res);
      dispatch({ type: "FETCH_EXPENSES_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: "FETCH_EXPENSES_FAILURE" });
    });
};
