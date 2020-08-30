import React, { useContext, useState, useEffect } from "react";
import { APIContext } from "../context/Context";
import { getCookie } from "../auth/components/helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import NumberFormat from "react-number-format";
import { Line, Bar, Doughnut, Pie, Scatter } from "react-chartjs-2";

import axios from "axios";
import Box from "../shared/Box";
import { setCurrencySymbol } from "../shared/currency_symbol";

export const Asset = () => {
  const { state } = useContext(APIContext);
  // console.log(state);
  const { services } = state;

  const [monthly_income, setMonthlyIncome] = useState(0);
  const [servicesForm, setServicesForm] = useState({
    name: "",
    principal: "",
  });

  const [accrued_sum, setAccruedSum] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);
  const [currency, setCurrency] = useState("");
  const [symbol, setSymbol] = useState("");

  // logic //
  useEffect(() => {
    initState();
  }, [services]);

  useEffect(() => {
    fetchCurrency();
  }, []);

  // for use cases other than box
  useEffect(() => {
    setSymbol(setCurrencySymbol(currency));
  }, [currency]);

  const initState = () => {
    let accrued_sum_local = 0;
    services.map((item) => {
      item.monthly_income = item.amount / 12;
      return item;
    });

    services.map(function (item) {
      let accrued = item.accrued || 0;
      accrued += item.amount;
      item.accrued = accrued;
      accrued_sum_local += accrued;
      return item;
    });
    setAccruedSum(accrued_sum_local);
  };

  const getLastIncome = () => {
    let lastServices = 0;
    lastServices = services[services.length - 1].amount;
    return lastServices;
  };

  const fetchCurrency = async () => {
    await axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let data = response.data;
        setCurrency(data.currency);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getTotalEstimatedPrincipal = () => {
    let total_principal = 0;

    services.forEach(function (asset) {
      const estimated_principal = asset.amount * 12 * 100;
      total_principal += estimated_principal;
    });

    return total_principal + accrued_sum;
  };

  const getTotalIncome = () => {
    let monthly_credit = 0;
    services.forEach(function (asset) {
      monthly_credit += asset.amount;
    });
    return monthly_credit;
  };

  // const getAssetArray = () => {
  //   let assetArray = [];

  //   asset.forEach(function (ass) {
  //     assetArray.push(ass.accrued);
  //   });

  //   return assetArray;
  // };

  // const areaOptions = {
  //   plugins: {
  //     filler: {
  //       propagate: true,
  //     },
  //   },
  // };

  //  form controls//
  const showAddForms = () => {
    setShowAddForm(!showAddForm);
  };

  const handleInputChange = (event) => {
    // console.log(event.target.value);
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setServicesForm({
      ...servicesForm,
      [name]: value,
    });
  };

  const handleDelete = async (item) => {
    const id = item._id;
    await axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API}/services/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        // console.log("asset added successful", response);
        toast.success("services Deleted succeesfully");
      })
      .catch((error) => {
        console.log("cant Delete services", error);
        toast.error("cant add Delete please check your internet");
      });

    window.location.reload();
  };

  const token = getCookie("token");

  const submitHandler = async (e) => {
    e.preventDefault();

    const { name, principal } = servicesForm;
    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/services`,
      data: { name: name, amount: principal },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        // console.log("asset added successful", response);
        toast.success("services added succeesfully");
      })
      .catch((error) => {
        console.log("cant add services", error);
        toast.error("cant add services please check your input");
      });

    setServicesForm({
      ...servicesForm,
      name: "",
      principal: "",
    });

    window.location.reload();
  };

  const { name, principal } = servicesForm;
  const valid = name.length > 0 && principal.length > 0;

  const Form = () => (
    <div className="row card  d-flex justify-content-center mt-5">
      <div className="row mt-3 ml-3">Add Services</div>
      <div className="row pt-4">
        <form>
          <div className="form-row form-group ml-5">
            <div className="col-sm-12 col-lg-6 col-md-6 ">
              <input
                className="form-control form-control-lg"
                type="text"
                style={{ width: 230, marginRight: 50 }}
                placeholder="Description"
                name="name"
                value={name}
                onChange={handleInputChange}
              />
              <small>eg. Bank deposit</small>
            </div>
            <div className="col-sm-12 col-lg-6 col-md-6">
              <input
                className="form-control form-control-lg"
                type="text"
                placeholder="Amount"
                name="principal"
                value={principal}
                onChange={handleInputChange}
              />
              <small>eg. {symbol} 1000</small>
            </div>
          </div>
          <div className="form-row form-group d-flex d-row justify-content-center">
            <div className="col-sm-4 col-xs-4 col-md-4 col-lg-3">
              <button
                className="btn btn-block btn-primary btn-sm"
                style={{ height: 35 }}
                type="submit"
                disabled={!valid}
                onClick={(e) => submitHandler(e)}
              >
                Add Services
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
  const Table = () => (
    <table className="table table-hover align-items-center pb-5">
      <thead>
        <tr>
          <th scope="col">
            <strong>Services</strong>
          </th>
          <th scope="col">&nbsp;</th>
        </tr>
      </thead>
      <tbody className="mt-5">
        {services.map((item, index) => (
          <tr
            key={index}
            style={{ borderTop: "none" }}
            data-tip
            data-for={`item_tooltip_${item.id}`}
            className="bg-white"
          >
            <th>
              <br />
              <NumberFormat
                value={item.amount}
                displayType={"text"}
                thousandSeparator={true}
                prefix={symbol}
                decimalScale={0}
              />
              <br />
            </th>

            <td>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(item)}
              >
                <i className="fa fa-times" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div>
      <ToastContainer />
      <div className="row">
        <Box
          name="Total Income"
          currency={currency}
          amount={getTotalIncome()}
          isPercentage={false}
        />
        <Box
          name="Avg Daily Credi"
          currency={currency}
          amount={getTotalIncome() / 30}
          isPercentage={false}
        />
        <Box
          name="Avg Hour Credit"
          currency={currency}
          amount={getTotalIncome() / 30 / 24}
          isPercentage={false}
        />
        <Box
          name="Your last income"
          currency={currency}
          amount={getLastIncome()}
          isPercentage={false}
        />
        {/* <Box
          name=" Avr Annual Principal"
          currency={currency}
          amount={getTotalEstimatedPrincipal()}
          isPercentage={false}
        /> */}
      </div>
      <div className="row">
        <div className="col-6">{Form()}</div>
        {/* <Area /> */}
        <div className="col-6">{Table()}</div>
      </div>
    </div>
  );
};

export default Asset;
