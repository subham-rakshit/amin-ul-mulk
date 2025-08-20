import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fontLevel: 1, // ✅ valid value (0, 1, or 2)
};

export const fontResizingSlice = createSlice({
  name: "level",
  initialState,
  reducers: {
    increaseLevel: (state) => {
      const currentLevel = state.fontLevel;

      if (currentLevel < 2) {
        state.fontLevel++;
      }
    },

    decreaseLevel: (state) => {
      const currentLevel = state.fontLevel;

      if (currentLevel > 0) {
        state.fontLevel--;
      }
    },
  },
});

export const { increaseLevel, decreaseLevel } = fontResizingSlice.actions;

export default fontResizingSlice.reducer;
