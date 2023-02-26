import { configureStore } from "@reduxjs/toolkit";
import transReducer from "./transRedux"
import userReducer from "./userRedux"


export const  store = configureStore({
    reducer : {
      user : userReducer,
      trans : transReducer
    }
})
