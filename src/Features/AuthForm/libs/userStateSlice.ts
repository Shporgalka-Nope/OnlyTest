import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { apiAutogen, ProblemDetails } from "@state/apiAutogen";
import User from "../Entities/User";

const userStateInitial: User = {
  Username: null,
  Email: null,
  AccessToken: null,
  Role: null,
  IsEmailConfirmed: null,
};

const userStateSlice = createSlice({
  name: "userState",
  initialState: userStateInitial as User,
  reducers: {
    logout: (state) => {
      console.log("LOGOUT");
      return userStateInitial;
    },
    updateAccessToken: (state, action: PayloadAction<string>) => {
      state.AccessToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Login successful
    builder.addMatcher(
      apiAutogen.endpoints.postAuthenticationLoginWithPassword.matchFulfilled,
      (state, action) => {
        state.Username = action.payload.username;
        state.Email = action.payload.email;
        state.AccessToken = action.payload.token;
        state.Role = action.payload.role;
        state.IsEmailConfirmed = true;
      },
    );

    // Login failed
    builder.addMatcher(
      apiAutogen.endpoints.postAuthenticationLoginWithPassword.matchRejected,
      (state, action) => {
        // Check whether payload exists,
        // if yes - its a server error (4xx-5xx), of no - network error (fetch failed)
        if (action.payload) {
          if (
            (action.payload.data as ProblemDetails).detail ===
            "email-not-confirmed"
          ) {
            state.IsEmailConfirmed = false;
            return;
          }
        }

        return userStateInitial;
      },
    );
  },
});

export const { logout, updateAccessToken } = userStateSlice.actions;
export default userStateSlice.reducer;
