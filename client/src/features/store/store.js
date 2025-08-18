import ExpanseReducer from "../ExpanseSlice/ExpanseSlice";
import AuthReducer from "../AuthSlice/AuthSlice";
import ThemeReducer from "../themeSlice/ThemeSlice"
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer, PERSIST } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  expanseData: ExpanseReducer,
  Auth: AuthReducer,
  Theme:ThemeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
    }),
});

const persistor = persistStore(store);
export { persistor, store };
