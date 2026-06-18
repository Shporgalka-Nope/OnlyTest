import PageLoading from "@/Shared/UI/PageLoading/PageLoading";
import { useGetTestGetResultsByIdQuery } from "@/state/apiAutogen";
import { useRouter } from "next/navigation";
import { Button, Card } from "react-bootstrap";

interface Props {
  attemptId: string;
}

export default function GetResultsForAttempt({ attemptId }: Props) {
  const { data, isFetching, isError, refetch } = useGetTestGetResultsByIdQuery({
    attemptId: attemptId,
  });

  const router = useRouter();
  return (
    <PageLoading isFetching={isFetching} isError={isError} refetch={refetch}>
      <div className="d-flex justify-content-center align-items-center">
        <Card>
          <Card.Body>
            <Card.Text>Ваш результат: {data} баллов</Card.Text>
          </Card.Body>

          <Card.Footer className="d-flex justify-content-end">
            <Button onClick={() => router.push("/")} variant="primary">
              Выйти в главное меню
            </Button>
          </Card.Footer>
        </Card>
      </div>
    </PageLoading>
  );
}
