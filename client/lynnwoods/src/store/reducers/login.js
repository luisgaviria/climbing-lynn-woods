import * as actionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
  logged: localStorage.getItem("token") ? true : false,
  admin: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_LOGGED: {
      return {
        ...state,
        logged: action.logged,
      };
    }
    case actionTypes.LOGGED_OUT: {
      return {
        logged: action.logged,
        admin: false,
      };
    }
    case actionTypes.SET_ADMIN: {
      return {
        ...state,
        admin: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
