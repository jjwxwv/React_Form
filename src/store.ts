import { configureStore } from "@reduxjs/toolkit";
import controlReducer from "./features/controlSlice";
import dataReducer from "./features/dataSlice";

const store = configureStore({
  reducer: {
    controlState: controlReducer,
    data: dataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
