import { SET_USER_INFO } from "../actions/actions.js";
import { initialState } from "../store/store.js";
//
export const userReducer = (state = initialState.userInfo, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        name: action.payload.username,
        email: action.payload.email,
        username: action.payload.username,
        _id: action.payload._id,
      };

    default:
      return state;
  }
};
