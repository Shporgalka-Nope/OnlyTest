import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { ProblemDetails } from "./apiAutogen";
import {
  logout,
  updateAccessToken,
} from "@features/AuthForm/libs/userStateSlice";
import { RootState } from "./store";

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: "https://localhost:7059",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const accessToken = state.local.user.AccessToken;

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
      const newAccessToken = await baseQuery(
        {
          url: "/Authentication/GetNewAccessToken",
          method: "GET",
        },
        api,
        extraOptions,
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
