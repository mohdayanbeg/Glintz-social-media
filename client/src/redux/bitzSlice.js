import { createSlice } from "@reduxjs/toolkit";

const bitzSlice=createSlice({
    name:"bitz",
    initialState:{
        bitzData:[],
    },
    reducers:{
        setBitzData:(state,action)=>{
            state.bitzData=action.payload
    }
    }
})

export const {setBitzData}= bitzSlice.actions;
export default bitzSlice.reducer