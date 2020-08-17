import React, { useContext, useState, useEffect } from "react";
import { APIContext } from "../context/Context";

import { Line, Bar, Doughnut, Pie, Scatter } from "react-chartjs-2";

const areaOptions = {
  plugins: {
    filler: {
      propagate: true,
    },
  },
};

const Area = () => {
  const { state } = useContext(APIContext);
  const { asset, services, expenses } = state;

  useEffect(() => {
    initAssetData();
  }, []);
  useEffect(() => {
    initExpensesData();
  }, []);
  useEffect(() => {
    initServiceData();
  }, []);

  const initAssetData = () => {
    const myArray = [];
    asset.map((ass) => {
      myArray.push(ass.amount);
    });
    return myArray;
  };
  const initExpensesData = () => {
    const myArray = [];
    expenses.map((exp) => {
      myArray.push(exp.amount);
    });
    return myArray;
  };

  const initServiceData = () => {
    const myArray = [];
    services.map((ser) => {
      myArray.push(ser.amount);
    });
    return myArray;
  };

  console.log("myara", initAssetData());
  const areaData = {
    labels: ["2013", "2014", "2015", "2016", "2017"],
    datasets: [
      {
        label: "Assets",
        data: initAssetData() || [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "Expenses",
        data: initExpensesData() || [33, 25, 35, 51, 54, 76],
        fill: false,
        borderColor: "#742774",
      },
      {
        label: "Services",
        data: initServiceData() || [33, 25, 35, 51, 54, 76],
        fill: false,
        borderColor: "red",
      },
    ],
    // datasets: [
    //   {
    //     label: "Asset",
    //     data: initState() || [12, 19, 3, 5, 2, 3],
    //     backgroundColor: "rgba(255, 99, 132, 0.2)",
    //     borderColor: "rgba(255,99,132,1)",
    //     borderWidth: 1,
    //     fill: true, // 3: no fill
    //   },
    //   {
    //     label: "Expenses",
    //     data: [12, 19, 3, 5, 2, 3],
    //     backgroundColor: "rgba(75,192,192,0.2)",
    //     borderColor: "rgba(205,99,132,1)",
    //     borderWidth: 1,
    //     fill: true, // 3: no fill
    //   },
    // ],
  };

  //   console.log("setting array", initAssetData());

  return (
    <div className="row">
      <div className="col-md-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Area Chart</h4>
            <Line data={areaData} options={areaOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Area;
