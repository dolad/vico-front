import React, { useContext, useState, useEffect } from "react";
import { APIContext } from "../context/Context";
import { getCookie } from "../auth/components/helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import NumberFormat from "react-number-format";
import { setCurrencySymbol } from "../shared/currency_symbol";

import axios from "axios";
import Box from "../shared/Box";

const Expenses = () => {
  const { state } = useContext(APIContext);
  // console.log(state);
  const { expenses } = state;

  const [monthly_income, setMonthlyIncome] = useState(0);
  const [expensesForm, setExpensesForm] = useState({
    name: "",
    principal: "",
  });

  const token = getCookie("token");
  const [accrued_sum, setAccruedSum] = useState(0);
  const [currency, setCurrency] = useState("");
  const [symbol, setSymbol] = useState("");

  // logic //
  useEffect(() => {
    initState();
  }, [expenses]);

  useEffect(() => {
    fetchCurrency();
  }, []);

  // for use cases other than box
  useEffect(() => {
    setSymbol(setCurrencySymbol(currency));
  }, [currency]);

  const initState = () => {
    let accrued_sum_local = 0;
    expenses.map((item) => {
      item.monthly_income = item.amount / 100 / 12;
      return item;
    });

    expenses.map(function (item) {
      let accrued = item.accrued || 0;
      accrued += item.amount / 100;
      item.accrued = accrued;
      accrued_sum_local += accrued;
      return item;
    });
    setAccruedSum(accrued_sum_local);
  };

  // setMonthlyIncome(asset[asset.length - 1].monthly_income);

  // console.log("at init", asset, accrued_sum);

  const getTotalEstimatedPrincipal = () => {
    let total_principal = 0;

    expenses.forEach(function (asset) {
      const estimated_principal = asset.amount * 12 * 100;
      total_principal += estimated_principal;
    });

    return total_principal + accrued_sum;
  };

  const getMonthlyDebit = () => {
    let monthly_debit = 0;
    expenses.forEach(function (asset) {
      monthly_debit += asset.amount;
    });

    return monthly_debit;
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

  const handleInputChange = (event) => {
    // console.log(event.target.value);
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setExpensesForm({
      ...expensesForm,
      [name]: value,
    });
  };

  const handleDelete = async (item) => {
    const id = item._id;
    await axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_API}/expenses/${id}`,
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

  const submitHandler = async (e) => {
    e.preventDefault();
    const { name, principal } = expensesForm;

    await axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/expenses`,
      data: { name: name, amount: principal },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        toast.success("expenses added succeesfully");
      })
      .catch((error) => {
        console.log("cant add asset", error);
        toast.error("cant add asset please check your input");
      });

    setExpensesForm({
      ...expensesForm,
      name: "",
      principal: "",
    });

    window.location.reload();
  };

  const { name, principal } = expensesForm;
  const valid = name.length > 0 && principal.length > 0;

  const Form = () => (
    <div className="row card d-flex justify-content-center align-item-center">
      <div className="col-sm-1- col-lg-10 col-sm-10 p-3 m-3 ">
        <div className="row p-3">Add Expenses here</div>
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
                  type="number"
                  placeholder="Principal"
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
    <table className="table table-hover align-items-center ">
      <thead>
        <tr>
          <th scope="col">
            <strong>Expenses</strong>
          </th>
          <th scope="col">&nbsp;</th>
        </tr>
      </thead>
      {expenses.map((item, index) => (
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
          <tr className="table-divider"></tr>
        </tbody>
      ))}
    </table>
  );

  return (
    <div>
      <ToastContainer />
      <h4>hello</h4>
      <div className="row">
        <Box
          name="Avg Monthly Debit"
          currency={currency}
          amount={getMonthlyDebit()}
          isPercentage={false}
        />
        <Box
          name="Avg Daily Debit"
          currency={currency}
          amount={getMonthlyDebit() / 30}
          isPercentage={false}
        />
        <Box
          name="Avg Hour Debit"
          currency={currency}
          amount={getMonthlyDebit() / 30 / 24}
          isPercentage={false}
        />
        <Box
          name="Avg Yearly Debit"
          currency={currency}
          amount={getMonthlyDebit() * 12}
          isPercentage={false}
        />
        <Box
          name="Avg Est Principal "
          currency={currency}
          amount={getTotalEstimatedPrincipal()}
          isPercentage={false}
        />
      </div>
      <div className="row">
        <div className="col-6 pt-4">{Form()}</div>
        {/* <Area /> */}
        <div className="col-6">{Table()}</div>
      </div>
    </div>
  );
};

export default Expenses;
