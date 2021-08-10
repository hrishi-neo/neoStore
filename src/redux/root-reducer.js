import { combineReducers } from "redux";
import {mainReducer as authReducer} from './reducers'

const reducer = combineReducers({
    auth : authReducer,
})

export {reducer}