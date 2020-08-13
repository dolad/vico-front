import React, { useEffect, useReducer, createContext } from "react";

import { isAuth, getCookie, signout } from "../auth/components/helper";
import reducer from "../reducer/reducer";
import * as actionsType from "../action/action";

export const APIContext = createContext();

const initialState = {
  usersdata: [],
  asset: [],
  services: [],
  expenses: [],
  isFetching: false,
  hasError: false,
};

const Context = ({ children, history }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const token = getCookie("token");

  useEffect(() => {
    actionsType.fetchData(dispatch, token, history);
    actionsType.fetchAssetData(dispatch, token);
    actionsType.fetchServiceData(dispatch, token);
    actionsType.fetchExpensesData(dispatch, token);
  }, [token]);

  return (
    <div>
      <APIContext.Provider
        value={{
          state,
          dispatch,
        }}
      >
        {children}
      </APIContext.Provider>
    </div>
  );
};

export default Context;
