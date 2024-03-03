import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import promiseMiddleware from "redux-promise-middleware";
import reducer from "./Reducer";
const store = createStore(reducer, applyMiddleware(thunk, promiseMiddleware));
export default store;