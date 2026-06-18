import { motion } from "motion/react";
import { TestsWidgetVatiants } from "../TestsWidget/Animations/TestsWidgetVariants";
import PageLoading from "@/Shared/UI/PageLoading/PageLoading";
import { Button, Card, Table } from "react-bootstrap";
import { BsArrowClockwise } from "react-icons/bs";
import { useGetUserStatisticsQuery } from "@/state/apiAutogen";

export default function UserStatWidget() {
  const { data, isError, isFetching, refetch } = useGetUserStatisticsQuery();

  return (
    <motion.div
      className="h-100 w-100"
      variants={TestsWidgetVatiants}
      initial="initial"
      animate="show"
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <PageLoading isError={isError} isFetching={isFetching} refetch={refetch}>
        <Card>
          <Card.Header>
            <div className="d-flex justify-content-between align-items-center">
              Результаты тестов
              <Button
                onClick={refetch}
                variant="primary"
                className="d-flex justify-content-center align-items-center"
              >
                <BsArrowClockwise />
              </Button>
            </div>
          </Card.Header>
          <Card.Body className="overflow-y-auto" style={{ height: "540px" }}>
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>№</th>
                  <th>ФИО</th>
                  <th>Тест</th>
                  <th>Дисциплина</th>
                  <th>Баллы</th>
                </tr>
              </thead>
              <tbody>
                {(data ?? []).map((stat, index) => (
                  <tr key={crypto.randomUUID()}>
                    <td>{index + 1}</td>
                    <td>{stat.userName}</td>
                    <td>{stat.testName}</td>
                    <td>{stat.discipline || ""}</td>
                    <td>{stat.score}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </PageLoading>
    </motion.div>
  );
}
