export const SET_USER_INFO = "SET_USER_INFO";
export const LOG_USER_OUT = "LOG_USER_OUT";
// export const FETCH_USER = "FETCH_USER";

// REGULAR ACTION CREATORS
// export const setUserInfo = (userObj) => ({
//   type: SET_USER_INFO,
//   payload: userObj,
// });

// export const logUserOut = (userObj) => ({
//   type: LOG_USER_OUT,
//   payload: userObj,
// });

// THUNK ACTION CREATORS
export const setUserInfo = (userObj) => {
  return (dispatch) => {
    dispatch({
      type: SET_USER_INFO,
      payload: userObj,
    });
  };
};

export const logUserOut = (userObj) => {
  return (dispatch) => {
    dispatch({
      type: LOG_USER_OUT,
      payload: userObj,
    });
  };
};

// export const fetchUser = () => {
//   return async (dispatch, getState) => {
//     try {
//       let resp = await fetch(`http://localhost:5000/users/me`);
//       if (resp.ok) {
//         let user = await resp.json();
//         dispatch({
//           type: FETCH_USER,
//           payload: user,
//         });
//       } else {
//         console.log("error");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };
