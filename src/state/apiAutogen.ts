import { apiSlice as api } from "./apiSlice";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    postAnswerCreate: build.mutation<
      PostAnswerCreateApiResponse,
      PostAnswerCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/Answer/Create`,
        method: "POST",
        body: queryArg.createAnswerDto,
      }),
    }),
    postAnswerOptionCreate: build.mutation<
      PostAnswerOptionCreateApiResponse,
      PostAnswerOptionCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/AnswerOption/Create`,
        method: "POST",
        body: queryArg.createAnswerOptionDto,
      }),
    }),
    patchAnswerOptionPatch: build.mutation<
      PatchAnswerOptionPatchApiResponse,
      PatchAnswerOptionPatchApiArg
    >({
      query: (queryArg) => ({
        url: `/AnswerOption/Patch`,
        method: "PATCH",
        body: queryArg.patchAnswerOptionDto,
      }),
    }),
    deleteAnswerOptionDelete: build.mutation<
      DeleteAnswerOptionDeleteApiResponse,
      DeleteAnswerOptionDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/AnswerOption/Delete`,
        method: "DELETE",
        params: {
          answerOptionId: queryArg.answerOptionId,
        },
      }),
    }),
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
    getAuthenticationGetNewAccessToken: build.query<
      GetAuthenticationGetNewAccessTokenApiResponse,
      GetAuthenticationGetNewAccessTokenApiArg
    >({
      query: () => ({ url: `/Authentication/GetNewAccessToken` }),
    }),
    postDisciplinesCreate: build.mutation<
      PostDisciplinesCreateApiResponse,
      PostDisciplinesCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/Disciplines/Create`,
        method: "POST",
        body: queryArg.createDisciplineDto,
      }),
    }),
    getDisciplinesGet: build.query<
      GetDisciplinesGetApiResponse,
      GetDisciplinesGetApiArg
    >({
      query: () => ({ url: `/Disciplines/Get` }),
    }),
    patchDisciplinesPatch: build.mutation<
      PatchDisciplinesPatchApiResponse,
      PatchDisciplinesPatchApiArg
    >({
      query: (queryArg) => ({
        url: `/Disciplines/Patch`,
        method: "PATCH",
        body: queryArg.patchDisciplineDto,
      }),
    }),
    deleteDisciplinesDelete: build.mutation<
      DeleteDisciplinesDeleteApiResponse,
      DeleteDisciplinesDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/Disciplines/Delete`,
        method: "DELETE",
        params: {
          disciplineId: queryArg.disciplineId,
        },
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
    postQuestionCreate: build.mutation<
      PostQuestionCreateApiResponse,
      PostQuestionCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/Question/Create`,
        method: "POST",
        body: queryArg.createQuestionDto,
      }),
    }),
    patchQuestionPatch: build.mutation<
      PatchQuestionPatchApiResponse,
      PatchQuestionPatchApiArg
    >({
      query: (queryArg) => ({
        url: `/Question/Patch`,
        method: "PATCH",
        body: queryArg.patchQuestionDto,
      }),
    }),
    deleteQuestionDelete: build.mutation<
      DeleteQuestionDeleteApiResponse,
      DeleteQuestionDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/Question/Delete`,
        method: "DELETE",
        params: {
          questionId: queryArg.questionId,
        },
      }),
    }),
    getQuestionGetAnswersForQuestion: build.query<
      GetQuestionGetAnswersForQuestionApiResponse,
      GetQuestionGetAnswersForQuestionApiArg
    >({
      query: (queryArg) => ({
        url: `/Question/GetAnswersForQuestion`,
        params: {
          questionId: queryArg.questionId,
        },
      }),
    }),
    postTestCreate: build.mutation<
      PostTestCreateApiResponse,
      PostTestCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/Test/Create`,
        method: "POST",
        body: queryArg.createTestDto,
      }),
    }),
    getTestGet: build.query<GetTestGetApiResponse, GetTestGetApiArg>({
      query: (queryArg) => ({
        url: `/Test/Get`,
        params: {
          testId: queryArg.testId,
        },
      }),
    }),
    patchTestPatch: build.mutation<
      PatchTestPatchApiResponse,
      PatchTestPatchApiArg
    >({
      query: (queryArg) => ({
        url: `/Test/Patch`,
        method: "PATCH",
        body: queryArg.editTestInfoDto,
      }),
    }),
    deleteTestDelete: build.mutation<
      DeleteTestDeleteApiResponse,
      DeleteTestDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/Test/Delete`,
        method: "DELETE",
        body: queryArg.testIdDto,
      }),
    }),
    getTestPublish: build.query<
      GetTestPublishApiResponse,
      GetTestPublishApiArg
    >({
      query: (queryArg) => ({
        url: `/Test/Publish`,
        params: {
          testId: queryArg.testId,
        },
      }),
    }),
    getTestGetPublishedWidgetData: build.query<
      GetTestGetPublishedWidgetDataApiResponse,
      GetTestGetPublishedWidgetDataApiArg
    >({
      query: () => ({ url: `/Test/GetPublishedWidgetData` }),
    }),
    getTestStartTest: build.query<
      GetTestStartTestApiResponse,
      GetTestStartTestApiArg
    >({
      query: (queryArg) => ({
        url: `/Test/StartTest`,
        params: {
          testId: queryArg.testId,
        },
      }),
    }),
    getTestGetResultsById: build.query<
      GetTestGetResultsByIdApiResponse,
      GetTestGetResultsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/Test/GetResultsById`,
        params: {
          attemptId: queryArg.attemptId,
        },
      }),
    }),
    getTestStatistics: build.query<
      GetTestStatisticsApiResponse,
      GetTestStatisticsApiArg
    >({
      query: (queryArg) => ({
        url: `/Test/Statistics`,
        params: {
          testId: queryArg.testId,
        },
      }),
    }),
    getTestTests: build.query<GetTestTestsApiResponse, GetTestTestsApiArg>({
      query: () => ({ url: `/Test/Tests` }),
    }),
    getUserGetAvailableDisciplines: build.query<
      GetUserGetAvailableDisciplinesApiResponse,
      GetUserGetAvailableDisciplinesApiArg
    >({
      query: () => ({ url: `/User/GetAvailableDisciplines` }),
    }),
    getUserGetOwnedTests: build.query<
      GetUserGetOwnedTestsApiResponse,
      GetUserGetOwnedTestsApiArg
    >({
      query: () => ({ url: `/User/GetOwnedTests` }),
    }),
    postUserCreate: build.mutation<
      PostUserCreateApiResponse,
      PostUserCreateApiArg
    >({
      query: (queryArg) => ({
        url: `/User/Create`,
        method: "POST",
        body: queryArg.createUserDto,
      }),
    }),
    getUserGetAll: build.query<GetUserGetAllApiResponse, GetUserGetAllApiArg>({
      query: () => ({ url: `/User/GetAll` }),
    }),
    patchUserPatch: build.mutation<
      PatchUserPatchApiResponse,
      PatchUserPatchApiArg
    >({
      query: (queryArg) => ({
        url: `/User/Patch`,
        method: "PATCH",
        body: queryArg.patchUserDto,
      }),
    }),
    deleteUserDelete: build.mutation<
      DeleteUserDeleteApiResponse,
      DeleteUserDeleteApiArg
    >({
      query: (queryArg) => ({
        url: `/User/Delete`,
        method: "DELETE",
        params: {
          userId: queryArg.userId,
        },
      }),
    }),
    getUserLogout: build.query<GetUserLogoutApiResponse, GetUserLogoutApiArg>({
      query: () => ({ url: `/User/Logout` }),
    }),
    getUserStatistics: build.query<
      GetUserStatisticsApiResponse,
      GetUserStatisticsApiArg
    >({
      query: () => ({ url: `/User/Statistics` }),
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
export type PostAnswerCreateApiResponse = unknown;
export type PostAnswerCreateApiArg = {
  createAnswerDto: CreateAnswerDto;
};
export type PostAnswerOptionCreateApiResponse =
  /** status 201 Created */ AnswerOption;
export type PostAnswerOptionCreateApiArg = {
  createAnswerOptionDto: CreateAnswerOptionDto;
};
export type PatchAnswerOptionPatchApiResponse =
  /** status 200 OK */ AnswerOption;
export type PatchAnswerOptionPatchApiArg = {
  patchAnswerOptionDto: PatchAnswerOptionDto;
};
export type DeleteAnswerOptionDeleteApiResponse = unknown;
export type DeleteAnswerOptionDeleteApiArg = {
  answerOptionId?: string;
};
export type PostAuthenticationLoginWithPasswordApiResponse =
  /** status 200 Successful login; Refresh and Access tokens generated */ UserInfoDto;
export type PostAuthenticationLoginWithPasswordApiArg = {
  /** User credentials object */
  authenticationDto: AuthenticationDto;
};
export type GetAuthenticationGetNewAccessTokenApiResponse =
  /** status 200 OK */ string;
export type GetAuthenticationGetNewAccessTokenApiArg = void;
export type PostDisciplinesCreateApiResponse =
  /** status 201 Created */ Discipline;
export type PostDisciplinesCreateApiArg = {
  createDisciplineDto: CreateDisciplineDto;
};
export type GetDisciplinesGetApiResponse = /** status 200 OK */ Discipline[];
export type GetDisciplinesGetApiArg = void;
export type PatchDisciplinesPatchApiResponse = /** status 200 OK */ Discipline;
export type PatchDisciplinesPatchApiArg = {
  patchDisciplineDto: PatchDisciplineDto;
};
export type DeleteDisciplinesDeleteApiResponse = unknown;
export type DeleteDisciplinesDeleteApiArg = {
  disciplineId?: string;
};
export type GetEmailSendEmailVerificationLetterApiResponse = unknown;
export type GetEmailSendEmailVerificationLetterApiArg = {
  /** user email as a string */
  userEmail?: string;
};
export type PostQuestionCreateApiResponse = /** status 201 Created */ Question;
export type PostQuestionCreateApiArg = {
  createQuestionDto: CreateQuestionDto;
};
export type PatchQuestionPatchApiResponse = /** status 200 OK */ Question;
export type PatchQuestionPatchApiArg = {
  patchQuestionDto: PatchQuestionDto;
};
export type DeleteQuestionDeleteApiResponse = unknown;
export type DeleteQuestionDeleteApiArg = {
  questionId?: string;
};
export type GetQuestionGetAnswersForQuestionApiResponse =
  /** status 200 OK */ AnswerOption[];
export type GetQuestionGetAnswersForQuestionApiArg = {
  questionId?: string;
};
export type PostTestCreateApiResponse = /** status 201 Created */ Test;
export type PostTestCreateApiArg = {
  createTestDto: CreateTestDto;
};
export type GetTestGetApiResponse = /** status 201 Created */ Test;
export type GetTestGetApiArg = {
  testId?: string;
};
export type PatchTestPatchApiResponse = /** status 200 OK */ Test;
export type PatchTestPatchApiArg = {
  editTestInfoDto: EditTestInfoDto;
};
export type DeleteTestDeleteApiResponse = unknown;
export type DeleteTestDeleteApiArg = {
  testIdDto: TestIdDto;
};
export type GetTestPublishApiResponse = unknown;
export type GetTestPublishApiArg = {
  testId?: string;
};
export type GetTestGetPublishedWidgetDataApiResponse =
  /** status 200 OK */ GetPublishedWidgetDto[];
export type GetTestGetPublishedWidgetDataApiArg = void;
export type GetTestStartTestApiResponse =
  /** status 200 OK */ GetPublicQuestions;
export type GetTestStartTestApiArg = {
  testId?: string;
};
export type GetTestGetResultsByIdApiResponse = /** status 200 OK */ number;
export type GetTestGetResultsByIdApiArg = {
  attemptId?: string;
};
export type GetTestStatisticsApiResponse =
  /** status 200 OK */ UserStatisticsDto[];
export type GetTestStatisticsApiArg = {
  testId?: string;
};
export type GetTestTestsApiResponse = /** status 200 OK */ GetTestsDto[];
export type GetTestTestsApiArg = void;
export type GetUserGetAvailableDisciplinesApiResponse =
  /** status 200 OK */ DisciplinesDto;
export type GetUserGetAvailableDisciplinesApiArg = void;
export type GetUserGetOwnedTestsApiResponse = /** status 200 OK */ TestsDto;
export type GetUserGetOwnedTestsApiArg = void;
export type PostUserCreateApiResponse = /** status 201 Created */ ReturnUserDto;
export type PostUserCreateApiArg = {
  createUserDto: CreateUserDto;
};
export type GetUserGetAllApiResponse = /** status 200 OK */ ReturnUserDto[];
export type GetUserGetAllApiArg = void;
export type PatchUserPatchApiResponse = /** status 200 OK */ ReturnUserDto;
export type PatchUserPatchApiArg = {
  patchUserDto: PatchUserDto;
};
export type DeleteUserDeleteApiResponse = unknown;
export type DeleteUserDeleteApiArg = {
  userId?: string;
};
export type GetUserLogoutApiResponse = unknown;
export type GetUserLogoutApiArg = void;
export type GetUserStatisticsApiResponse =
  /** status 200 OK */ UserStatisticsDto[];
export type GetUserStatisticsApiArg = void;
export type PostVerifyTokensLoginWithTokenApiResponse = unknown;
export type PostVerifyTokensLoginWithTokenApiArg = {
  userEmail?: string;
  encodedToken?: string;
};
export type CreateAnswerDto = {
  attemptId: string;
  questionId: string;
  payload: string;
};
export type AnswerOption = {
  id?: string;
  questionId: string;
  payload: string;
  type: string;
  isCorrect: boolean;
};
export type ProblemDetails = {
  type?: string | null;
  title?: string | null;
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
  [key: string]: any;
};
export type CreateAnswerOptionDto = {
  questionId: string;
  payload: string;
  type: string;
  isCorrect?: boolean;
};
export type PatchAnswerOptionDto = {
  answerOptionId: string;
  payload: string;
  isCorrect?: boolean;
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
export type CreateDisciplineDto = {
  name: string;
};
export type PatchDisciplineDto = {
  disciplineId: string;
  name: string;
};
export type Question = {
  id?: string;
  title: string;
  order: number;
  description?: string | null;
  score: number;
  testId: string;
  type: string;
  answerOptions?: AnswerOption[] | null;
};
export type CreateQuestionDto = {
  title: string;
  order: number;
  description?: string | null;
  score: number;
  type: string;
  testId: string;
};
export type PatchQuestionDto = {
  questionId: string;
  title: string;
  description?: string | null;
  score: number;
  type: string;
};
export type Test = {
  id?: string;
  title: string;
  description?: string | null;
  isPublished: boolean;
  publicationDate?: string | null;
  creationDate: string;
  authorUserId: string;
  disciplineId?: string | null;
  discipline?: Discipline;
  questions?: Question[] | null;
};
export type CreateTestDto = {
  title: string;
  description?: string | null;
  disciplineId?: string | null;
};
export type EditTestInfoDto = {
  testId: string;
  title: string;
  description?: string | null;
  disciplineId?: string | null;
};
export type TestIdDto = {
  testId: string;
};
export type GetPublishedWidgetDto = {
  testId: string;
  title: string;
  description?: string | null;
  questionCount: number;
  creationDate: string;
  authorUserName: string;
  disciplineName?: string | null;
};
export type PublicAnswerOptionDto = {
  answerOptionId: string;
  payload: string;
};
export type PublicQuestionDto = {
  questionId: string;
  title: string;
  description?: string | null;
  order: number;
  score: number;
  type: string;
  answerOptions: PublicAnswerOptionDto[];
};
export type GetPublicQuestions = {
  attemptId: string;
  questions: PublicQuestionDto[];
};
export type UserStatisticsDto = {
  userName: string;
  testName: string;
  discipline?: string | null;
  score: number;
};
export type GetTestsDto = {
  testId: string;
  testName: string;
};
export type DisciplinesDto = {
  /** List of disciplines available to the user */
  disciplines: Discipline[];
};
export type TestsDto = {
  /** List of tests */
  tests: Test[];
};
export type ReturnUserDto = {
  userId: string;
  userName: string;
  email: string;
  roleName: string;
};
export type CreateUserDto = {
  name: string;
  email: string;
  password: string;
  roleName: string;
};
export type PatchUserDto = {
  userId: string;
  username: string;
  email: string;
  password: string;
  roleName: string;
};
export const {
  usePostAnswerCreateMutation,
  usePostAnswerOptionCreateMutation,
  usePatchAnswerOptionPatchMutation,
  useDeleteAnswerOptionDeleteMutation,
  usePostAuthenticationLoginWithPasswordMutation,
  useGetAuthenticationGetNewAccessTokenQuery,
  usePostDisciplinesCreateMutation,
  useGetDisciplinesGetQuery,
  usePatchDisciplinesPatchMutation,
  useDeleteDisciplinesDeleteMutation,
  useGetEmailSendEmailVerificationLetterQuery,
  usePostQuestionCreateMutation,
  usePatchQuestionPatchMutation,
  useDeleteQuestionDeleteMutation,
  useGetQuestionGetAnswersForQuestionQuery,
  usePostTestCreateMutation,
  useGetTestGetQuery,
  usePatchTestPatchMutation,
  useDeleteTestDeleteMutation,
  useGetTestPublishQuery,
  useGetTestGetPublishedWidgetDataQuery,
  useGetTestStartTestQuery,
  useGetTestGetResultsByIdQuery,
  useGetTestStatisticsQuery,
  useGetTestTestsQuery,
  useGetUserGetAvailableDisciplinesQuery,
  useGetUserGetOwnedTestsQuery,
  usePostUserCreateMutation,
  useGetUserGetAllQuery,
  usePatchUserPatchMutation,
  useDeleteUserDeleteMutation,
  useGetUserLogoutQuery,
  useGetUserStatisticsQuery,
  usePostVerifyTokensLoginWithTokenMutation,
} = injectedRtkApi;
