import React, { useContext } from "react";
import { Line } from "react-chartjs-2";
import { APIContext } from "../context/Context";
import Box from "../shared/Box";
import NumberFormat from "react-number-format";

// import DatePicker from 'react-datepicker';
// import { Dropdown } from 'react-bootstrap';

const Dashboard = () => {
  const { state } = useContext(APIContext);

  const { asset, expenses, services } = state;

  // areaData = {
  //   labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  //   datasets: [
  //     {
  //       label: "Product-1",
  //       data: [3, 3, 8, 5, 7, 4, 6, 4, 6, 3],
  //       backgroundColor: "#2196f3",
  //       borderColor: "#0c83e2",
  //       borderWidth: 1,
  //       fill: true,
  //       datasetKeyProvider: "key1",
  //     },
  //     {
  //       label: "Product-2",
  //       data: [7, 5, 14, 7, 12, 6, 10, 6, 11, 5],
  //       backgroundColor: "#19d895",
  //       borderColor: "#15b67d",
  //       borderWidth: 1,
  //       fill: true,
  //       datasetKeyProvider: "key2",
  //     },
  //   ],
  // };

  // areaOptions = {
  //   responsive: true,
  //   maintainAspectRatio: true,
  //   scales: {
  //     yAxes: [
  //       {
  //         gridLines: {
  //           color: "#F2F6F9",
  //         },
  //         ticks: {
  //           beginAtZero: true,
  //           min: 0,
  //           max: 20,
  //           stepSize: 5,
  //         },
  //       },
  //     ],
  //     xAxes: [
  //       {
  //         gridLines: {
  //           color: "#F2F6F9",
  //         },
  //         ticks: {
  //           beginAtZero: true,
  //         },
  //       },
  //     ],
  //   },
  //   legend: {
  //     display: false,
  //   },
  //   elements: {
  //     point: {
  //       radius: 2,
  //     },
  //   },
  //   layout: {
  //     padding: {
  //       left: 0,
  //       right: 0,
  //       top: 0,
  //       bottom: 0,
  //     },
  //   },
  //   stepsize: 1,
  // };

  const getMonthlyAsset = () => {
    let monthly_credit = 0;
    asset.forEach(function (asset) {
      monthly_credit += (asset.amount * asset.apr) / 100 / 12;
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

  // toggleProBanner() {
  //   document.querySelector(".proBanner").classList.toggle("hide");
  // }

  return (
    <div>
      <div className="row">
        <Box
          name="Avg Monthly Asset"
          amount={getMonthlyAsset()}
          isPercentage={false}
        />
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 grid-margin stretch-card">
          <div className="card card-statistics">
            <div className="card-body">
              <div className="clearfix">
                <div className="float-left">
                  <i className="mdi mdi-receipt text-warning icon-lg"></i>
                </div>
                <div className="float-right">
                  <p className="mb-0 text-right text-dark">
                    Avg Monthly Expenses
                  </p>
                  <div className="fluid-container">
                    <h3 className="font-weight-medium text-right mb-0 text-dark">
                      <NumberFormat
                        value={getMonthlyExpenses()}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                        // suffix={"%"}
                        decimalScale={2}
                      />
                    </h3>
                  </div>
                </div>
              </div>
              <p className="text-muted mt-3 mb-0">
                <i
                  className="mdi mdi-bookmark-outline mr-1"
                  aria-hidden="true"
                ></i>{" "}
                Average Monthly Expenses{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 grid-margin stretch-card">
          <div className="card card-statistics">
            <div className="card-body">
              <div className="clearfix">
                <div className="float-left">
                  <i className="mdi mdi-poll-box text-success icon-lg"></i>
                </div>
                <div className="float-right">
                  <p className="mb-0 text-right text-dark">
                    Avg Monthly Services
                  </p>
                  <div className="fluid-container">
                    <h3 className="font-weight-medium text-right mb-0 text-dark">
                      <NumberFormat
                        value={getMonthlyServices()}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                        // suffix={"%"}
                        decimalScale={2}
                      />
                    </h3>
                  </div>
                </div>
              </div>
              <p className="text-muted mt-3 mb-0">
                <i className="mdi mdi-calendar mr-1" aria-hidden="true"></i>{" "}
                Monthly Expenses{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 grid-margin stretch-card">
          <div className="card card-statistics">
            <div className="card-body">
              <div className="clearfix">
                <div className="float-left">
                  <i className="mdi mdi-account-box-multiple text-info icon-lg"></i>
                </div>
                <div className="float-right">
                  <p className="mb-0 text-right text-dark">
                    Avg Daily Expenses
                  </p>
                  <div className="fluid-container">
                    <h3 className="font-weight-medium text-right mb-0 text-dark">
                      <NumberFormat
                        value={getMonthlyExpenses() / 30}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                        // suffix={"%"}
                        decimalScale={2}
                      />
                    </h3>
                  </div>
                </div>
              </div>
              <p className="text-muted mt-3 mb-0">
                <i className="mdi mdi-reload mr-1" aria-hidden="true"></i>{" "}
                Product-wise sales{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 grid-margin">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="card-title mb-0">Product Analysis</h2>
                <div className="wrapper d-flex">
                  <div className="d-flex align-items-center mr-3">
                    <span className="dot-indicator bg-success"></span>
                    <p className="mb-0 ml-2 text-muted">Product</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <span className="dot-indicator bg-primary"></span>
                    <p className="mb-0 ml-2 text-muted">Resources</p>
                  </div>
                </div>
              </div>
              <div className="chart-container">
                {/* <Line
                  data={this.areaData}
                  options={this.areaOptions}
                  datasetKeyProvider={this.datasetKeyProvider}
                  height={80}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
