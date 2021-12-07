export const SET_USER_INFO = "SET_USER_INFO";

export const setUserInfo = (userObj) => ({
  type: SET_USER_INFO,
  payload: userObj,
});
