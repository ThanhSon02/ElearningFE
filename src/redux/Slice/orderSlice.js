import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderList: [],
    orderInfo: null,
};

const orderSlice = createSlice({
    name: "orderList",
    initialState,
    reducers: {
        createOrder: (state, action) => {
            const item = action.payload;
            if (Array.isArray(item)) {
                state.orderList = item;
            } else {
                state.orderList = [...state.orderList, item];
            }
        },

        clearOrder: (state) => {
            state.orderList = [];
        },

        addConfirmOrder: (state, action) => {
            state.orderInfo = action.payload;
        },
    },
});

export const { createOrder, clearOrder, addConfirmOrder } = orderSlice.actions;
export default orderSlice;
