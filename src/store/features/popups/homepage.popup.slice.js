import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showHomePagePopup: false,
  wasPopupVisible: false, // ← This flag controls whether popup was shown before
};

export const homepagePopupSlice = createSlice({
  name: "homepagePopup",
  initialState,
  reducers: {
    visibleHomePagePopup: (state) => {
      state.showHomePagePopup = true;
    },

    hideHomePagePopup: (state) => {
      state.showHomePagePopup = false;
    },

    setWasPopupVisible: (state) => {
      state.wasPopupVisible = true;
    },

    resetHomePagePopup: (state) => {
      state.showHomePagePopup = false;
      state.wasPopupVisible = false;
    },
  },
});

export const {
  visibleHomePagePopup,
  hideHomePagePopup,
  setWasPopupVisible,
  resetHomePagePopup,
} = homepagePopupSlice.actions;

export default homepagePopupSlice.reducer;
