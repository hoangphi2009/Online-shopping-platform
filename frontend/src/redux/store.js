import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
