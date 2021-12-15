export const SET_USER_INFO = "SET_USER_INFO";
export const LOG_USER_OUT = "LOG_USER_OUT";

export const setUserInfo = (userObj) => ({
  type: SET_USER_INFO,
  payload: userObj,
});

export const logUserOut = (userObj) => ({
  type: LOG_USER_OUT,
  payload: userObj,
});
