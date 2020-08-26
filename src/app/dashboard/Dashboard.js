import React, { useContext, useState, useEffect } from "react";
import { APIContext } from "../context/Context";
import Box from "../shared/Box";
import { getCookie } from "../auth/components/helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";
import Area from "../charts/Area";
// import DatePicker from 'react-datepicker';
// import { Dropdown } from 'react-bootstrap';

const Dashboard = () => {
  const { state } = useContext(APIContext);
  const { asset, expenses, services } = state;
  const [selected, setSelected] = useState("");
  const [currency, setCurrency] = useState("");

  const token = getCookie("token");
  const [Form, setForm] = useState({
    name: "",
    principal: "",
  });

  useEffect(() => {
    fetchCurrency();
  }, []);

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

  const handleTextFieldChange = (event) => {
    const query = event.target.value;
    if (query.toLowerCase() === "assets" || "services" || "expenses") {
      setSelected(query.toLowerCase());
      return true;
    } else {
      console.log("return an error here");
      setSelected("");
    }
  };

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setForm({
      ...Form,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (selected !== "") {
      const { name, principal } = Form;
      console.log("set url", `${process.env.REACT_APP_API}/${selected}`);
      await axios({
        method: "POST",
        url: `${process.env.REACT_APP_API}/${selected}`,
        data: { name: name, amount: principal },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          toast.success(" data added succeesfully");
        })
        .catch((error) => {
          console.log("cant add asset", error);
          toast.error("cant add asset please check your input");
        });

      setForm({
        ...Form,
        name: "",
        principal: "",
      });
      window.location.reload();

      return true;
    } else {
      toast.error("You must select a type form the check box");
      return false;
    }
  };

  const getMonthlyAsset = () => {
    let monthly_credit = 0;
    asset.forEach(function (asset) {
      monthly_credit += asset.amount / 12;
    });
    return monthly_credit;
  };

  const getMonthlyExpenses = () => {
    let monthly_debit = 0;
    expenses.forEach(function (asset) {
      monthly_debit += asset.amount;
    });

    return monthly_debit;
  };

  const getMonthlyServices = () => {
    let monthly_credit = 0;
    services.forEach(function (asset) {
      monthly_credit += asset.amount;
    });
    return monthly_credit;
  };

  const { name, principal } = Form;

  return (
    <div>
      <ToastContainer />
      <div className="row">
        <Box
          name="Avg Asset"
          currency={currency}
          amount={getMonthlyAsset()}
          isPercentage={false}
        />
        <Box
          name="Avg Expenses"
          currency={currency}
          amount={getMonthlyExpenses()}
          isPercentage={false}
        />
        <Box
          name="Avg Monthly Services"
          currency={currency}
          amount={getMonthlyServices()}
          isPercentage={false}
        />
        <Box
          name="Avg Daily Serivice"
          currency={currency}
          amount={getMonthlyExpenses() / 30}
          isPercentage={false}
        />
      </div>
      <div className="row">
        <div className="col-md-4 grid-margin">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="card-title mb-0">Add Services</h2>
                <div className="wrapper d-flex"></div>
              </div>
              <div className="chart-container">
                <form>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label for="inputState">Selet Type</label>
                      <select
                        id="inputState"
                        className="form-control"
                        onChange={(event) => handleTextFieldChange(event)}
                      >
                        <option defaultValue>Choose Type</option>
                        <option>Assets</option>
                        <option>Services</option>
                        <option>Expenses</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label for="inputEmail4">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputEmail4"
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label for="inputEmail4">Principal</label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputEmail4"
                        name="principal"
                        value={principal}
                        placeholder="Principl"
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="d-flex justify-content-center align-items-center col-md-12">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={(e) => submitHandler(e)}
                      >
                        submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8  grid-margin">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="card-title mb-0">Graph</h2>
                <div className="wrapper d-flex"></div>
              </div>

              <div className="chart-container">
                <Area />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
