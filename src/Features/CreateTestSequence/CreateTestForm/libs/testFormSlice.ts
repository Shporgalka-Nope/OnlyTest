import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AnswerOption, Question, Test } from "@/state/apiAutogen";

const testFormSlice = createSlice({
  name: "testFormState",
  initialState: {} as Test,
  reducers: {
    addTestFormData(state, action: PayloadAction<Test>) {
      return action.payload;
    },
    resetTestFormData(state) {
      return {} as Test;
    },

    setQuestionData(state, action: PayloadAction<Question>) {
      if (!state.questions) {
        state.questions = [action.payload];
        return;
      }

      const foundQuestion = state.questions!.find(
        (q) => q.id === action.payload.id,
      );
      if (!foundQuestion) {
        state.questions.push(action.payload);
        return;
      }

      Object.assign(foundQuestion, action.payload);
    },
    removeQuestionData(state, action: PayloadAction<string>) {
      if (!state.questions) return;

      const foundQuestion = state.questions!.find(
        (q) => q.id === action.payload,
      );
      if (!foundQuestion) return;

      state.questions = state.questions.filter((q) => q.id !== action.payload);
    },

    setAnswerData(state, action: PayloadAction<AnswerOption>) {
      const foundQuestion = state.questions!.find(
        (q) => q.id === action.payload.questionId,
      );
      if (!foundQuestion?.id) return;

      if (!foundQuestion.answerOptions?.length) {
        foundQuestion.answerOptions?.push(action.payload);
        return;
      }

      const foundAnswer = foundQuestion.answerOptions.find(
        (a) => a.id == action.payload.id,
      );
      if (!foundAnswer?.id) {
        foundQuestion.answerOptions?.push(action.payload);
        return;
      }

      Object.assign(foundAnswer, action.payload);
    },
    removeAnswerData(
      state,
      action: PayloadAction<{ questionId: string; answerId: string }>,
    ) {
      if (!state.questions) return;
      const foundQuestion = state.questions.find(
        (q) => q.id === action.payload.questionId,
      );
      if (!foundQuestion) return;

      if (!foundQuestion.answerOptions) return;
      const foundAnswer = foundQuestion.answerOptions.find(
        (a) => a.id === action.payload.answerId,
      );
      if (!foundAnswer) return;

      foundQuestion.answerOptions = foundQuestion.answerOptions.filter(
        (a) => a.id !== action.payload.answerId,
      );
    },
  },
});

export const {
  addTestFormData,
  resetTestFormData,
  setQuestionData,
  removeQuestionData,
  setAnswerData,
  removeAnswerData,
} = testFormSlice.actions;
export default testFormSlice.reducer;
