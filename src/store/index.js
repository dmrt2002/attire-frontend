import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice"
import cartReducer from "./cart/cartSlice"
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "redux"; 
import { persistReducer , persistStore } from 'redux-persist'

const reducers = combineReducers({
    user: userReducer, 
    cart: cartReducer 
});
   
   const persistConfig = {
       key: 'root',
       storage
   };
   
   const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store)