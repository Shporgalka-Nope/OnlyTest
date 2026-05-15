import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { AppDispatch, RootState } from "./store";
import { Mutex } from "async-mutex";
import {
  apiAutogen,
  ProblemDetails,
  usePostAuthenticationGetNewAccessTokenMutation,
} from "./apiAutogen";
import {
  logout,
  updateAccessToken,
} from "@features/AuthForm/libs/userStateSlice";

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: "https://localhost:7059",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const accessToken = state.user.AccessToken;

    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Make the original fetch
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status !== 401) {
    return result;
  }

  // Check if 401 reason is invalid user creds (means it was a login)
  const problemDetails = result.error.data as ProblemDetails;
  if (problemDetails?.detail === "user-credentials-are-invalid") {
    return result;
  }

  if (!mutex.isLocked()) {
    const release = await mutex.acquire();

    try {
      const state = api.getState() as RootState;
      const userEmail = state.user.Email;
      if (!userEmail) {
        api.dispatch(logout());
        return result;
      }

      const newAccessToken = await api.dispatch(
        apiAutogen.endpoints.postAuthenticationGetNewAccessToken.initiate({
          body: userEmail,
        }),
      );

      if (newAccessToken.data) {
        api.dispatch(updateAccessToken(newAccessToken.data as string));
      } else {
        api.dispatch(logout());
        return result;
      }
    } finally {
      release();
    }
  } else {
    await mutex.waitForUnlock();
  }
  result = await baseQuery(args, api, extraOptions);
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
