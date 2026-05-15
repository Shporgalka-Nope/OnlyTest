import { apiSlice as api } from "./apiSlice";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    postAuthenticationLoginWithPassword: build.mutation<
      PostAuthenticationLoginWithPasswordApiResponse,
      PostAuthenticationLoginWithPasswordApiArg
    >({
      query: (queryArg) => ({
        url: `/Authentication/LoginWithPassword`,
        method: "POST",
        body: queryArg.authenticationDto,
      }),
    }),
    postAuthenticationGetNewAccessToken: build.mutation<
      PostAuthenticationGetNewAccessTokenApiResponse,
      PostAuthenticationGetNewAccessTokenApiArg
    >({
      query: (queryArg) => ({
        url: `/Authentication/GetNewAccessToken`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getEmailSendEmailVerificationLetter: build.query<
      GetEmailSendEmailVerificationLetterApiResponse,
      GetEmailSendEmailVerificationLetterApiArg
    >({
      query: (queryArg) => ({
        url: `/Email/SendEmailVerificationLetter`,
        params: {
          userEmail: queryArg.userEmail,
        },
      }),
    }),
    getUserGetAvailableDisciplines: build.query<
      GetUserGetAvailableDisciplinesApiResponse,
      GetUserGetAvailableDisciplinesApiArg
    >({
      query: () => ({ url: `/User/GetAvailableDisciplines` }),
    }),
    postVerifyTokensLoginWithToken: build.mutation<
      PostVerifyTokensLoginWithTokenApiResponse,
      PostVerifyTokensLoginWithTokenApiArg
    >({
      query: (queryArg) => ({
        url: `/VerifyTokens/LoginWithToken`,
        method: "POST",
        params: {
          userEmail: queryArg.userEmail,
          encodedToken: queryArg.encodedToken,
        },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as apiAutogen };
export type PostAuthenticationLoginWithPasswordApiResponse =
  /** status 200 Successful login; Refresh and Access tokens generated */ UserInfoDto;
export type PostAuthenticationLoginWithPasswordApiArg = {
  /** User credentials object */
  authenticationDto: AuthenticationDto;
};
export type PostAuthenticationGetNewAccessTokenApiResponse = unknown;
export type PostAuthenticationGetNewAccessTokenApiArg = {
  body: string;
};
export type GetEmailSendEmailVerificationLetterApiResponse = unknown;
export type GetEmailSendEmailVerificationLetterApiArg = {
  /** user email as a string */
  userEmail?: string;
};
export type GetUserGetAvailableDisciplinesApiResponse =
  /** status 200 OK */ DisciplinesDto;
export type GetUserGetAvailableDisciplinesApiArg = void;
export type PostVerifyTokensLoginWithTokenApiResponse = unknown;
export type PostVerifyTokensLoginWithTokenApiArg = {
  userEmail?: string;
  encodedToken?: string;
};
export type UserInfoDto = {
  /** The full name of the user. */
  username: string;
  /** The email address of the user. */
  email: string;
  /** The access token for the user. */
  token: string;
  /** The access level (role) of the user. */
  role: string;
};
export type ProblemDetails = {
  type?: string | null;
  title?: string | null;
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
  [key: string]: any;
};
export type AuthenticationDto = {
  /** User email */
  email: string;
  /** User password */
  password: string;
  /** boolean value to keep user signed in for longer period */
  isPersistent?: boolean;
};
export type Discipline = {
  id?: string;
  title: string;
};
export type DisciplinesDto = {
  /** List of disciplines available to the user */
  disciplines: Discipline[];
};
export const {
  usePostAuthenticationLoginWithPasswordMutation,
  usePostAuthenticationGetNewAccessTokenMutation,
  useGetEmailSendEmailVerificationLetterQuery,
  useGetUserGetAvailableDisciplinesQuery,
  usePostVerifyTokensLoginWithTokenMutation,
} = injectedRtkApi;
