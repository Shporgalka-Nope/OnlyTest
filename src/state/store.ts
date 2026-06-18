import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userStateReducer from "@/Features/AuthForm/libs/userStateSlice";
import notificationStateReducer from "@/Features/SelfClosingAlert/notificationStateSlice";
import testFormReducer from "@/Features/CreateTestSequence/CreateTestForm/libs/testFormSlice";
import dmsfStateReducer from "@/Features/DynamicMultiStepForm/libs/dmsfSlice";
import { apiSlice } from "@state/apiSlice";
import storage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/lib/storage/session";
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

// Add config
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["notification", "api"],
};

const sessionConfig = {
  key: "session",
  storage: sessionStorage,
};

// Combine reducers into its own object
const rootReducer = combineReducers({
  user: userStateReducer,
  notification: notificationStateReducer,
});

const sessionRootReducer = combineReducers({
  testForm: testFormReducer,
  dmsfState: dmsfStateReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sessionReducer = persistReducer(sessionConfig, sessionRootReducer);

const combinedReducers = combineReducers({
  local: persistedReducer,
  session: sessionReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const store = configureStore({
  reducer: combinedReducers,
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
