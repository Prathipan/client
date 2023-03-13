import { createSlice } from "@reduxjs/toolkit";


const transSlice = createSlice({
    name : "trans",
    initialState : {
        trans : []
    },
    reducers : {
        getTrans : (state,action) => {
           state.trans = action.payload
        },
        createTrans : (state,action) => {
            state.trans.push(action.payload);
        },
        removeTrans : (state,action) => {
            state.trans.splice(action.payload.removableIndex,1);
        },
        logoutTrans : (state) => {
            state.trans = [];
        }
    }
})

export const {createTrans,removeTrans,getTrans,logoutTrans} = transSlice.actions;
export default transSlice.reducer;