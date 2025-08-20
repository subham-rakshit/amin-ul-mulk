import { combineReducers, configureStore } from "@reduxjs/toolkit";

import fontResizingReducer from "./features/layoutCustomizer/fontResizingSlice";
import layoutReducer from "./features/layoutCustomizer/layoutCustomizerSlice";
import popupReducer from "./features/popups/homepage.popup.slice";

// This function creates a new persist store for per request
export const makeStore = () => {
  const rootReducer = combineReducers({
    layout: layoutReducer, // Non-persist reducer
    level: fontResizingReducer,
    popup: popupReducer,
  });

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });

  return { store };
};
