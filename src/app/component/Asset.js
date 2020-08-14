import React, { useContext, useState, useEffect } from "react";
import { APIContext } from "../context/Context";
import { getCookie } from "../auth/components/helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import NumberFormat from "react-number-format";

import axios from "axios";
import Box from "../shared/Box";

export const Asset = () => {
  const { state } = useContext(APIContext);
  // console.log(state);
  const { asset } = state;

  const [monthly_income, setMonthlyIncome] = useState(0);
  const [assetForm, setAssetsForm] = useState({
    name: "",
    principal: "",
  });

  const [accrued_sum, setAccruedSum] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);

  // logic //
  useEffect(() => {
    initState();
  }, [asset]);

  const initState = () => {
    let accrued_sum_local = 0;
    asset.map((item) => {
      item.monthly_income = item.amount / 12;
      return item;
    });

    asset.map(function (item) {
      let accrued = item.accrued || 0;
      accrued += item.amount;
      item.accrued = accrued;
      accrued_sum_local += accrued;
      return item;
    });
    setAccruedSum(accrued_sum_local);
  };

  const getMonthlyCredit = () => {
    let monthly_credit = 0;
    asset.forEach(function (asset) {
      monthly_credit += asset.amount / 12;
    });
    return monthly_credit;
  };

  //  form controls//
  const showAddForms = () => {
    setShowAddForm(!showAddForm);
  };

  const handleInputChange = (event) => {
    // console.log(event.target.value);
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setAssetsForm({
      ...assetForm,
      [name]: value,
    });
  };

  const handleDelete = async (item) => {
    const id = item._id;
    await axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API}/assets/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        // console.log("asset added successful", response);
        toast.success("asset Deleted succeesfully");
      })
      .catch((error) => {
        console.log("cant Delete asset", error);
        toast.error("cant add Delete please check your input");
      });

    window.location.reload();
  };

  const token = getCookie("token");

  const submitHandler = async (e) => {
    e.preventDefault();

    const { name, principal } = assetForm;
    // console.log("submitting", name, principal, apr);
    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/assets`,
      data: { name: name, amount: principal },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        // console.log("asset added successful", response);
        toast.success("asset added succeesfully");
      })
      .catch((error) => {
        console.log("cant add asset", error);
        toast.error("cant add asset please check your input");
      });

    setAssetsForm({
      ...assetForm,
      name: "",
      principal: "",
    });

    window.location.reload();
  };

  const { name, principal } = assetForm;
  const valid = name.length > 0 && principal.length > 0;

  const Form = () => (
    <div className="row card d-flex justify-content-center  align-item-center mt-5">
      <div className="col-sm-1- col-lg-10 col-sm-10 pt-5 pl-5 ">
        <div className="row">Add Asset here</div>
        <div className="row">
          <form>
            <div className="form-row form-group">
              <div className="col-5">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={handleInputChange}
                />
                <small>eg. Bank deposit</small>
              </div>
              <div className="col">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Principal"
                  name="principal"
                  value={principal}
                  onChange={handleInputChange}
                />
                <small>eg. $1000</small>
              </div>
            </div>
            <div className="form-row form-group d-flex d-row justify-content-center">
              <div className="col-sm-4 col-xs-4 col-md-4 col-lg-3">
                <button
                  className="btn btn-block btn-primary btn-sm"
                  type="submit"
                  disabled={!valid}
                  onClick={(e) => submitHandler(e)}
                >
                  Add asset
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  const Table = () => (
    <table className="table table-hover align-items-center">
      <thead>
        <tr>
          <th scope="col">
            <strong>Asset</strong>
          </th>
          <th scope="col">
            <strong>Name</strong>
          </th>
          <th scope="col">&nbsp;</th>
        </tr>
      </thead>
      {asset.map((item, index) => (
        <tbody
          key={index}
          style={{ borderTop: "none" }}
          data-tip
          data-for={`item_tooltip_${item.id}`}
        >
          <tr className="bg-white">
            <th>
              <br />
              <NumberFormat
                value={item.amount}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
                decimalScale={0}
              />
              <br />
            </th>
            <td>{item.name}</td>

            <td>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(item)}
              >
                <i className="fa fa-times" />
              </button>
            </td>
          </tr>
          <tr className="table-divider"></tr>
        </tbody>
      ))}
    </table>
  );

  // console.log("before area", getAssetArray());
  // const Area = () => (
  //   <>
  //     {getAssetArray() && (
  //       <div className="col-md-6 grid-margin stretch-card">
  //         <div className="card">
  //           <div className="card-body">
  //             <h4 className="card-title">Area Chart</h4>
  //             <Line data={areaData} options={areaOptions} />
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </>
  // );

  return (
    <div>
      <ToastContainer />
      <h4>hello</h4>
      <div className="row">
        <Box
          name="Avg Monthly Credit"
          amount={getMonthlyCredit()}
          isPercentage={false}
        />
        <Box
          name="Avg Daily Credi"
          amount={getMonthlyCredit() / 30}
          isPercentage={false}
        />
        <Box
          name="Avg Hour Credit"
          amount={getMonthlyCredit() / 30 / 24}
          isPercentage={false}
        />
        <Box
          name="Avg Yearly Credit"
          amount={getMonthlyCredit() * 12}
          isPercentage={false}
        />
      </div>
      <div className="row">
        <div className="col-6 pt-1">{Form()}</div>
        {/* <Area /> */}
        <div className="col-6 pt-2">{Table()}</div>
      </div>
    </div>
  );
};

export default Asset;
