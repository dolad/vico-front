import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import { setCurrencySymbol } from "../shared/currency_symbol";
const Box = (props) => {
  const { name, amount, currency, isPercentage } = props;
  const [symbol, setSymbol] = useState("");

  useEffect(() => {
    setSymbol(setCurrencySymbol(currency));
  }, [currency]);

  return (
    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 grid-margin stretch-card">
      <div className="card card-statistics">
        <div className="card-body">
          <div className="clearfix">
            <div className="float-left">
              <i className="mdi mdi-cube text-danger icon-lg"></i>
            </div>
            <div className="float-right">
              <p className="mb-0 text-right text-dark">{name}</p>
              <div className="fluid-container">
                <h3 className="font-weight-medium text-right mb-0 text-dark">
                  {isPercentage !== true ? (
                    <NumberFormat
                      value={amount}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={symbol}
                      // suffix={"%"}
                      decimalScale={2}
                    />
                  ) : (
                    <NumberFormat
                      value={amount}
                      displayType={"text"}
                      thousandSeparator={true}
                      // prefix={"$"}
                      suffix={"%"}
                      decimalScale={2}
                    />
                  )}
                </h3>
              </div>
            </div>
          </div>
          {/* <p className="text-muted mt-3 mb-0">
            <i className="mdi mdi-alert-octagon mr-1" aria-hidden="true"></i>{" "}
            65% lower growth{" "}
          </p> */}
        </div>
      </div>
    </div>
  );
};

Box.propTypes = {
  name: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  isPercentage: PropTypes.bool.isRequired,
};

export default Box;
