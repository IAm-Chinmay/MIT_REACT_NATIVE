import { createStore, applyMiddleware } from "redux";
import catReducer from "./reducer";
import commandMiddleware from "./commandMiddleware";

const store = createStore(catReducer, applyMiddleware(commandMiddleware));

export default store;
