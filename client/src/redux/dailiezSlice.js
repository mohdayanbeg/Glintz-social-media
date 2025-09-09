import { createSlice } from "@reduxjs/toolkit";

const dailiezSlice=createSlice({
    name:"dailiez",
    initialState:{
        dailiezdata:[],
    },
    reducers:{
        setDailiezData:(state,action)=>{
            state.dailiezdata=action.payload
        }
    }
})

export const {setDailiezData}=dailiezSlice.actions
export default dailiezSlice.reducer