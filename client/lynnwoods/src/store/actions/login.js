import * as actionTypes from "../actions/actionTypes";

export const setLogged = (token) => {
  localStorage.setItem("token", token);
  return {
    type: actionTypes.SET_LOGGED,
    logged: true,
  };
};

export const loggedOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("admin");
  return {
    type: actionTypes.LOGGED_OUT,
    logged: false,
  };
};

export const adminLogin = () => {
  localStorage.setItem("admin", true);
  return {
    type: actionTypes.SET_ADMIN,
  };
};
