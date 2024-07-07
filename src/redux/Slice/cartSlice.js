import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    cartList: [],
};

const cartSlice = createSlice({
    name: "cartList",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const findItem = state.cartList.find((i) => item?.id === i?.id);
            if (findItem) {
                const newCart = {
                    ...state,
                    cartList: state.cartList.map((i) =>
                        i?.id === item?.id ? item : i
                    ),
                };
                toast.info("Khoá học đã có trong giỏ hàng");
                return newCart;
            } else {
                const newCart = {
                    ...state,
                    cartList: [...state.cartList, item],
                };
                toast.success("Đã thêm khoá học vào giỏ hàng");
                return newCart;
            }
        },

        removeFromCart: (state, action) => {
            const item = action.payload;
            const findItem = state.cartList.find((i) => i.id === item.id);
            if (findItem) {
                const newList = state.cartList.filter((i) => i.id !== item.id);
                const newCart = {
                    ...state,
                    cartList: newList,
                };
                return newCart;
            }
        },

        clearCart: (state) => {
            state.cartList = [];
        },
    },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice;
