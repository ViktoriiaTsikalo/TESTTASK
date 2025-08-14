import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { tokenReducer } from "./token/slice";
import { usersReducer } from "./users/slice";
import { positionsReducer } from "./positions/slice";

const tokenPersistConfig = {
  key: "token",
  storage,
  whitelist: ["token"],
};

export const store = configureStore({
  reducer: {
    token: persistReducer(tokenPersistConfig, tokenReducer),
    users: usersReducer,
    positions: positionsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);