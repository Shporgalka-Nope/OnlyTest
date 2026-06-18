export const translateError: Record<string, string> = {
  // Network errors
  FETCH_ERROR: "Сервер в данный момент недоступен. Попробуйте ещё раз позже",
  ERR_CONNECTION_REFUSED: "Сервер отклонил соединение",

  // Server custom errors
  "user-credentials-are-invalid": "Неверная почта или пароль",
  "user-locked-out": "Вы заблокированы",
  "email-not-confirmed": "Подтвердите почту",
  "no-code": "Неизвестная ошибка",
};
