import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import localStorage from "redux-persist/es/storage";
import thunk from "redux-thunk";
// import { chatsReducer } from "../reducer/chat";
// import { socketReducer } from "../reducer/socket";
import { userReducer } from "../reducers/user.js";
import { teamReducer } from "../reducers/team.js";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const initialState = {
  userInfo: {
    _id: "",
    email: "",
    username: "",
    picture: "",
    role: "",
  },
  teams: { favorites: [] },
};

const mainReducer = combineReducers({
  userInfo: userReducer,
  teams: teamReducer,
});

//PERSISTANCE
const persistConfigs = {
  key: "root",
  storage: localStorage,
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_KEYENCRIPTION,
      onError: function (error) {
        // Handle the error.
      },
    }),
  ],
};
const persistedReducer = persistReducer(persistConfigs, mainReducer);
const configureStore = createStore(
  persistedReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);
const persistor = persistStore(configureStore);

export { configureStore, persistor };

//SIMPLER ONE FOR NOW
// const configureStore = createStore(
//   mainReducer,
//   initialState,
//   composeEnhancers(applyMiddleware(thunk))
// );

// export default configureStore;
