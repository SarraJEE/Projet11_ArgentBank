import axios from "axios";
import {
  loginFail,
  loginSuccess,
  logoutSuccess,
  isToken,
} from "../actions/loginAction";
import {
  userFail,
  userLogout,
  userSuccess,
  userUpdateSuccess,
  userUpdateFail,
} from "../actions/userAction";
//partie Api
const BASE_URL = "http://localhost:3001/api/v1";
/**
 * Login function
 * @param { String } email
 * @param { String } password
 * @param { Boolean } rememberMe
 * @returns { Object }
 */
// Inside your login function
export const login = (email, password, rememberMe) => (dispatch) => {
  axios
    .post(BASE_URL + "/user/login", { email, password })
    .then((response) => {
      const token = response.data.body.token;
      if (rememberMe) {
        localStorage.setItem("token", JSON.stringify(token)); // Stocker dans le localStorage si Remember me est coché
      } else {
        sessionStorage.setItem("token", JSON.stringify(token)); // Stocker dans la sessionStorage sinon
      }
      dispatch(loginSuccess(response.data));
      console.log(response);
      return response.data;
    })
    .catch((err) => {
      dispatch(loginFail(err.response.data.message));
    });
};

/**
 * Get user profile
 * @param {String} token
 */
export const userProfile = (value_token) => (dispatch) => {
  const token =
    localStorage.getItem("token") !== null
      ? localStorage
          .getItem("token")
          .slice(1, localStorage.getItem("token").length - 1)
      : value_token;
  axios
    .post(
      BASE_URL + "/user/profile",
      { token },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((response) => {
      dispatch(userSuccess(response.data));
      dispatch(isToken());
    })
    .catch((err) => {
      dispatch(userFail(err.response));
    });
};

/**
 * Update user profile
 * @param {String} firstName
 * @param {String} lastName
 * @param {String} token
 */

export const updateProfile = (userName, value_token) => (dispatch) => {
  const token =
    localStorage.getItem("token") !== null
      ? localStorage
          .getItem("token")
          .slice(1, localStorage.getItem("token").length - 1)
      : value_token;
  axios
    .put(
      BASE_URL + "/user/profile",
      { userName: userName },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    .then((res) => {
      dispatch(userUpdateSuccess(res.data));
      console.log("dattataat reponse", res.data);
    })
    .catch((err) => {
      dispatch(userUpdateFail(err.response));
    });
};

/**
 * Logout function
 */
export const logout = () => (dispatch) => {
  sessionStorage.clear();
  localStorage.removeItem("token");
  dispatch(userLogout());
  dispatch(logoutSuccess());
};

const auth_service = { login, userProfile, logout };
export default auth_service;
