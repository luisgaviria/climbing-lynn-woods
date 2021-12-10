import * as actionTypes from "../actions/actionTypes";

const INITIAL_STATE = {
  logged: localStorage.getItem("token") ? true : false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_LOGGED: {
      return {
        logged: action.logged,
      };
    }
    case actionTypes.LOGGED_OUT: {
      return {
        logged: action.logged,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
