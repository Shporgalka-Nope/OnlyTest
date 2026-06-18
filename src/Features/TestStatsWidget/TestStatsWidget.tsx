import { motion } from "motion/react";
import { TestsWidgetVatiants } from "../TestsWidget/Animations/TestsWidgetVariants";
import PageLoading from "@/Shared/UI/PageLoading/PageLoading";
import { Button, Card, Form, Table } from "react-bootstrap";
import { BsArrowClockwise } from "react-icons/bs";
import {
  apiAutogen,
  useGetTestTestsQuery,
  UserStatisticsDto,
} from "@/state/apiAutogen";
import { useEffect, useState } from "react";

export default function TestStatWidget() {
  const { data, isError, isFetching, refetch } = useGetTestTestsQuery();
  const [getStat] = apiAutogen.endpoints.getTestStatistics.useLazyQuery();
  const [selectedTest, setSelectedTest] = useState<string>();
  const [statsData, setStatsData] = useState<UserStatisticsDto[]>();

  useEffect(() => {
    console.log(selectedTest);
    const GetStats = async () => {
      const data = await getStat({ testId: selectedTest }).unwrap();
      setStatsData(data);
    };

    if (selectedTest) GetStats();
  }, [selectedTest]);

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
              Результаты по тесту
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
            <Form.Label>Выберите тест</Form.Label>
            <Form.Select
              defaultValue={0}
              value={selectedTest}
              onChange={(e) => setSelectedTest(e.target.value)}
            >
              <option key={0}>Выберите тест</option>
              {data?.map((test) => (
                <option key={test.testId} value={test.testId}>
                  {test.testName}
                </option>
              ))}
            </Form.Select>
            <br />
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>№</th>
                  <th>Тест</th>
                  <th>ФИО</th>
                  <th>Дисциплина</th>
                  <th>Баллы</th>
                </tr>
              </thead>
              <tbody>
                {(statsData ?? []).map((test, index) => (
                  <tr key={crypto.randomUUID()}>
                    <td>{index + 1}</td>
                    <td>{test.testName}</td>
                    <td>{test.userName}</td>
                    <td>{test.discipline || ""}</td>
                    <td>{test.score}</td>
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
