import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface dmsfState {
  id: string;
  currentStep: number;
}

const dmsfSlice = createSlice({
  name: "dmsfState",
  initialState: [] as dmsfState[],
  reducers: {
    setDmsfStep(state, action: PayloadAction<dmsfState>) {
      const formState = state.find((s) => s.id === action.payload.id);
      if (formState) {
        formState.currentStep = action.payload.currentStep;
      } else {
        state.push(action.payload);
      }
    },
    resetDmsfStep(state, action: PayloadAction<dmsfState>) {
      const formState = state.find((s) => s.id === action.payload.id);
      if (formState) {
        formState.currentStep = 0;
      } else {
        return;
      }
    },
  },
});

export const { resetDmsfStep, setDmsfStep } = dmsfSlice.actions;
export default dmsfSlice.reducer;
