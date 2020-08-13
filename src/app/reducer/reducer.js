const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_USER_REQUEST":
      return {
        ...state,
        isFetching: true,
        hasError: false,
      };
    case "FETCH_USER_SUCCESS":
      return {
        ...state,
        usersdata: action.payload,
        isFetching: false,
        hasError: false,
      };
    case "FETCH_USER_FAILURE":
      return {
        ...state,
        isFetching: false,
        hasError: true,
      };
    case "FETCH_ASSET_DATA":
      return {
        ...state,
        asset: action.payload,
        isFetching: false,
        hasError: false,
      };
    case "FETCH_ASSET_FAILURE":
      return {
        ...state,
        isFetching: false,
        hasError: true,
      };
    case "FETCH_SERVICES_SUCCESS":
      return {
        ...state,
        services: action.payload,
        isFetching: false,
        hasError: false,
      };
    case "FETCH_SERVICES_FAILURE":
      return {
        ...state,
        isFetching: false,
        hasError: true,
      };
    case "FETCH_EXPENSES_SUCCESS":
      return {
        ...state,
        expenses: action.payload,
        isFetching: false,
        hasError: false,
      };
    case "FETCH_EXPENSES_FAILURE":
      return {
        ...state,
        isFetching: false,
        hasError: false,
      };
    default:
      return state;
  }
};

export default reducer;
