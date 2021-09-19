import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { pairsReducer } from "./pairs-reducer";

let reducersBatch = combineReducers({
  pairs: pairsReducer,
});

let store = createStore(reducersBatch, applyMiddleware(thunkMiddleware));

export default store;
