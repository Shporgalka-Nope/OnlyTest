import { listRegistry } from "@/Features/AnswerOptionWidget/libs/listRegistry";
import { addErrNotification } from "@/Features/SelfClosingAlert/notificationStateSlice";
import { apiAutogen, useGetTestPublishQuery } from "@/state/apiAutogen";
import { useAppDispatch, useAppSelector } from "@/state/useStoreHooks";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";

interface ErrorItem {
  id: string;
  source: string;
  message: string;
}

export default function PublishTest() {
  const sessionTest = useAppSelector((state) => state.session.testForm);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [errors, setErrors] = useState<ErrorItem[]>([] as ErrorItem[]);

  const addError = (err: ErrorItem) => setErrors((prev) => [...prev, err]);

  const [publish, { isError, error, isFetching }] =
    apiAutogen.endpoints.getTestPublish.useLazyQuery();

  const publishTest = async () => {
    await publish({ testId: sessionTest.id });
    router.push("/");
  };

  useEffect(() => {
    if (isError) {
      dispatch(addErrNotification(error));
    }
  }, [isError, error]);

  useEffect(() => {
    setErrors([]);
    if ((sessionTest.questions?.length || 0) < 1) {
      addError({
        id: crypto.randomUUID(),
        source: "Тест",
        message: "Тест должен иметь хотя бы 1 вопрос",
      });
      return;
    }

    sessionTest.questions?.forEach((q) => {
      if ((q.answerOptions?.length || 0) < 1) {
        addError({
          id: crypto.randomUUID(),
          source: q.title,
          message: "Вопрос должен иметь хотя бы 1 ответ",
        });
        return;
      }
      const { ValidationRule } = listRegistry[q.type];
      if (!ValidationRule(q.answerOptions!)) {
        addError({
          id: crypto.randomUUID(),
          source: q.title,
          message: "Ошибка валидации ответов на вопрос",
        });
        return;
      }
    });
  }, [sessionTest]);

  return (
    <>
      <h1>Публикация теста</h1>
      <p>
        Перед публикацией теста исправьте все ошибки. Когда будете готовы,
        нажмите на кнопку "Опубликовать".
      </p>
      <p>После публикации тест будет недоступен для редактирования.</p>

      <h3>Ошибки</h3>
      <Table bordered hover>
        <thead>
          <tr>
            <th>№</th>
            <th>Описание</th>
            <th>Источник</th>
          </tr>
        </thead>
        <tbody>
          {errors.length === 0 ? (
            <tr>
              <td colSpan={3}>
                <h5>Ошибок нет!</h5>
              </td>
            </tr>
          ) : (
            errors.map((err, index) => (
              <tr key={err.id}>
                <td>{index + 1}</td>
                <td>{err.message}</td>
                <td>{err.source}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {errors.length === 0 ? (
        <>
          <h3>Информация о тесте</h3>
          <p>Название: {sessionTest.title}</p>
          <p>Описание: {sessionTest.description || "Отсутствует"}</p>
          <p>Дисциплина: {sessionTest.discipline?.title || "Отсутствует"}</p>
          <p>
            Дата создания:{" "}
            {new Date(sessionTest.creationDate).toLocaleDateString()}
          </p>
          <p>Количество вопросов: {sessionTest.questions?.length}</p>
          <p>
            Максимум баллов:{" "}
            {sessionTest.questions?.reduce((sum, q) => {
              return sum + q.score;
            }, 0)}
          </p>

          <Button disabled={isFetching} onClick={publishTest} variant="primary">
            Опубликовать
          </Button>
        </>
      ) : (
        "Для получения данных и публикации решите все ошибки"
      )}
    </>
  );
}
