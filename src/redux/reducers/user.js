import { SET_USER_INFO } from "../actions/actions.js";
import { initialState } from "../store/store.js";
import { LOG_USER_OUT } from "../actions/actions.js";
//
export const userReducer = (state = initialState.userInfo, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        email: action.payload.email,
        username: action.payload.username,
        _id: action.payload._id,
        picture: action.payload.picture,
        role: action.payload.role,
      };
    case LOG_USER_OUT:
      return {
        email: "",
        username: "",
        _id: "",
        picture: "",
        role: "",
      };

    default:
      return state;
  }
};
// export const userReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_USER_INFO:
//       return {
//         ...state,
//         userInfo: action.payload,
//       };

//     default:
//       return state;
//   }
// };
