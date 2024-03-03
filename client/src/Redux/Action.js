import {
  LOGIN_USER,
  LOGIN_USER_REJECTED,
  LOGIN_USER_FULFILLED,
  USER_LOGIN_STATUS_REJECTED,
  USER_LOGIN_STATUS_FULFILLED,
  REGISTER_USER,
} from "./ActionTypes";
import axios from "axios";
export const registerUser = (user, navigate) => {
  return (dispatch) => {
    dispatch({
      type: REGISTER_USER,
      payload: axios
        .post("http://localhost:9000/api/auth/signup", user, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          return res.data;
        })
        .catch((err) => {
          console.log(err);
        }),
    });
  };
};
export const loginUser = (email, password, navigate) => {
  const user = {
    email,
    password,
  };
  localStorage.clear();
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    axios
      .post("http://localhost:9000/api/auth/login", user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        dispatch({ type: LOGIN_USER_FULFILLED, payload: res });
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => {
        dispatch({ type: LOGIN_USER_REJECTED, payload: err });
      });
  };
};
export const validateLoginStatus = (navigate, componentPath) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return (dispatch) => {
      dispatch({
        type: USER_LOGIN_STATUS_REJECTED,
        payload: { message: "Sorry you are not authenticated" },
      });
      navigate("/login");
    };
  } else {
    return (dispatch) => {
      axios
        .get("http://localhost:9000/api/auth/validtoken", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          dispatch({ type: USER_LOGIN_STATUS_FULFILLED, payload: res.data });
          navigate(componentPath ? componentPath : "/");
        })
        .catch((err) => {
          dispatch({
            type: USER_LOGIN_STATUS_REJECTED,
            payload: { message: "Sorry You are not authenticated" },
          });
          navigate("/login");
        });
    };
  }
};
