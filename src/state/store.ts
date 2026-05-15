import { configureStore } from "@reduxjs/toolkit";
import userStateReducer from "@/Features/AuthForm/libs/userStateSlice";
import notificationStateReducer from "@/Features/SelfClosingAlert/notificationStateSlice";
import { apiSlice } from "@state/apiSlice";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const persistedUserStateReducer = persistReducer(
  persistConfig,
  userStateReducer,
);

export const store = configureStore({
  reducer: {
    user: persistedUserStateReducer,
    notification: notificationStateReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware);
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
