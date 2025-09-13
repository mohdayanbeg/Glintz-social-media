import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./userSlice.js"
import postSlice from "./postSlice.js"
import bitzSlice from "./bitzSlice.js"
import dailiezSlice from "./dailiezSlice.js"
// import userSlice from "./userSlice.js"

const store = configureStore({

    reducer: {
        user: userSlice,
        post: postSlice,
        bitz: bitzSlice,
        dailiez: dailiezSlice,
    }

})

export default store



