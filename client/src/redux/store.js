import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./userSlice.js"
import postSlice from "./postSlice.js"
import bitzSlice from "./bitzSlice.js"
import dailiezSlice from "./dailiezSlice.js"
import messageSlice from "./messageSlice.js"
import socketSlice from "./socketSlice.js"
// import userSlice from "./userSlice.js"

const store = configureStore({

    reducer: {
        user: userSlice,
        post: postSlice,
        bitz: bitzSlice,
        dailiez: dailiezSlice,
        message:messageSlice,
        socket:socketSlice
    }

})

export default store



