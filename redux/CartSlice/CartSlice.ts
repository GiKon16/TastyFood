import { createSlice } from "@reduxjs/toolkit";
import { CartSliceTypes } from "./CartSliceTypes";

const initialState:CartSliceTypes = {
    cartItems: [],
    quantity: 0,
    total: 0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addCartItem(state, { payload }) {
            state.cartItems = [...state.cartItems, payload]
            state.quantity += 1
            state.total += payload.generalPrice
        },
        deleteCartItem(state, { payload }) {
            state.cartItems.map(item => {
                if (item._id === payload._id && item.productPrice === payload.productPrice) {
                    state.total -= item.generalPrice
                    state.quantity -= item.productQuantity
                    item.productQuantity = 0
                    item.generalPrice = 0
                }
            })
            state.cartItems = state.cartItems.filter(item => item._id !== payload._id || item.productPrice !== payload.productPrice)  
        },
        upProductAmount(state, { payload }) {
            state.cartItems.map(item => {
                if (item._id === payload._id && item.productPrice === payload.productPrice) {
                    item.productQuantity += 1
                    item.generalPrice = item.productQuantity * item.productPrice
                    state.total += item.productPrice
                    state.quantity += 1
                }
            })
        },
        downProductAmount(state, { payload }) {
            state.cartItems.map(item => {
                if (item._id === payload._id && item.productPrice === payload.productPrice) {
                    item.productQuantity -= 1
                    item.generalPrice = item.productQuantity * item.productPrice
                    state.total -= item.productPrice
                    state.quantity -= 1
                }
                if (item.productQuantity === 0) {
                    state.cartItems = state.cartItems.filter(item => item._id !== payload._id || item.productPrice !== payload.productPrice)
                }
            })
        },
        reset(state) {
            state.cartItems = []
            state.quantity = 0
            state.total = 0
        },
    },
})

export const { addCartItem, deleteCartItem, reset, upProductAmount, downProductAmount } = cartSlice.actions
export default cartSlice.reducer