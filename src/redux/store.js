import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import authSlice from "./Slice/authSlice";
import adminSlice from "./Slice/adminSlice";
import appSlice from "./Slice/appSlice";
import cartSlice from "./Slice/cartSlice";
import orderSlice from "./Slice/orderSlice";

const persistConfig = {
    key: "elearning",
    storage,
    version: 1,
};

const rootReducer = combineReducers({
    auth: authSlice.reducer,
    admin: adminSlice.reducer,
    cart: cartSlice.reducer,
    app: appSlice.reducer,
    order: orderSlice.reducer,
}); // create or combine reducer

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export let persistor = persistStore(store);
