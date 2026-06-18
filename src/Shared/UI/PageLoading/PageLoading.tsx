import { ReactNode } from "react";
import { Button, Spinner } from "react-bootstrap";

interface Props {
  isFetching: boolean;
  isError: boolean;
  refetch: () => any;
  children: ReactNode;
}

export default function PageLoading({
  isFetching,
  isError,
  refetch,
  children,
}: Props) {
  return (
    <>
      {isFetching ? (
        <div className="d-flex justify-content-center align-items-center ">
          <Spinner animation="border" variant="primary"></Spinner>
        </div>
      ) : isError ? (
        <div>
          <h3>
            Произошла ошибка при загрузке страницы{" "}
            <small className="text-body-secondary">
              Нажмите на кнопку ниже для перезагрузки
            </small>
          </h3>
          <Button disabled={isFetching} onClick={refetch}>
            Перезагрузить
          </Button>
        </div>
      ) : (
        children
      )}
    </>
  );
}
