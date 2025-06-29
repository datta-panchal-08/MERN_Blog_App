import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from './reducers/AuthSlice.js';
import storage from 'redux-persist/lib/storage';
import PostReducer from './reducers/PostSlice.js';
import {persistReducer} from 'redux-persist';
import persistStore from "redux-persist/es/persistStore";
const persistConfig={
  key:"root",
  storage
}

const PersistReducer=persistReducer(persistConfig,AuthReducer)

const Store = configureStore({
    reducer:{
      auth:PersistReducer,
      post:PostReducer
    }
});
export default Store;
export const persister = persistStore(Store);

