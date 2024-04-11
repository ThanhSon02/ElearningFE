import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import authSlice from "./Slice/authSlice";

const persistConfig = {
    key: "elearning",
    storage,
    version: 1,
};

const rootReducer = combineReducers({
    auth: authSlice.reducer,
}); // create or combine reducer

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export let persistor = persistStore(store);
