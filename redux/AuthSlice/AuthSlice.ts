import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthSliceTypes, IRequestUserInfo } from "./AuthSliceTypes";
import { instanceAxiosClose } from "../api/instances";

export const getUserInfo = createAsyncThunk<any, IRequestUserInfo>("users", async (payload:any) => {
    try {
        const { data } = await instanceAxiosClose().get("users/" + payload)
        console.log(data)
        return data
    } catch (err) {
        console.log(err)
    }
})

const initialState:AuthSliceTypes = {
    token: null,
    _id: null,
    userInfo: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAccessToken(state, { payload }) {
            state.token = payload
        },
        setId(state, { payload }) {
            state._id = payload
        },
        setUserInfo(state, { payload }) {
            state.userInfo = payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUserInfo.fulfilled, (state, action) => {
            state.userInfo = action?.payload?.data
        })
    }
})

export const { setAccessToken, setId, setUserInfo } = authSlice.actions
export default authSlice.reducer