import { createSlice } from "@reduxjs/toolkit";

const dailiezSlice=createSlice({
    name:"dailiez",
    initialState:{
        dailiezData:[],
        allDailiezList:[],
        currentUserDailiez:[]
    },
    reducers:{
        setDailiezData:(state,action)=>{
            state.dailiezData=action.payload
        },
        setAllDailiezList:(state,action)=>{
            state.allDailiezList=action.payload
        },
        setCurrentUserDailiez:(state,action)=>{
        state.currentUserDailiez=action.payload
       } 
    }
})

export const {setDailiezData,setAllDailiezList,setCurrentUserDailiez}=dailiezSlice.actions
export default dailiezSlice.reducer