import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice/CartSlice";
import authReducer from "./AuthSlice/AuthSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
    },
})

export type TRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch