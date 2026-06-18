import { motion } from "motion/react";
import { Button, Card, Tab, Table, Tabs } from "react-bootstrap";
import { TestsWidgetVatiants } from "./Animations/TestsWidgetVariants";
import {
  BsArrowClockwise,
  BsFillPencilFill,
  BsFillTrashFill,
  BsPlusLg,
} from "react-icons/bs";
import {
  Test,
  TestIdDto,
  useDeleteTestDeleteMutation,
  useGetUserGetOwnedTestsQuery,
} from "@/state/apiAutogen";
import { use, useEffect, useState } from "react";
import { useAppDispatch } from "@/state/useStoreHooks";
import { addErrNotification } from "../SelfClosingAlert/notificationStateSlice";
import { useRouter } from "next/navigation";

export default function TestsWidget() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { refetch, data, isLoading, isFetching } =
    useGetUserGetOwnedTestsQuery();
  const [
    deleteTest,
    {
      isLoading: isLoadingDeleteTest,
      isError: isErrorDeleteTest,
      error: errorDeleteTest,
    },
  ] = useDeleteTestDeleteMutation();

  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [publishedTests, setPublishedTests] = useState<Test[]>([] as Test[]);
  const [unpublishedTests, setUnpublishedTests] = useState<Test[]>(
    [] as Test[],
  );

  const HandleDelete = () => {
    if (!selectedTest) {
      return;
    }
    const testId: TestIdDto = { testId: selectedTest };
    deleteTest({ testIdDto: testId });
    refetch();
  };

  const HandleEdit = () => {
    if (!selectedTest) {
      return;
    }
    const testId: TestIdDto = { testId: selectedTest };
    window.open(
      `/Tests?testid=${testId.testId}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  useEffect(() => {
    if (!data) return;
    setPublishedTests(data?.tests.filter((t) => t.isPublished));
    setUnpublishedTests(data?.tests.filter((t) => !t.isPublished));
  }, [data]);

  useEffect(() => {
    dispatch(addErrNotification(errorDeleteTest));
  }, [isErrorDeleteTest, errorDeleteTest]);

  return (
    <motion.div
      className="h-100 w-100"
      variants={TestsWidgetVatiants}
      initial="initial"
      animate="show"
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      {isLoading || (isFetching && <p>Is loading</p>)}
      {!isLoading && (
        <Card>
          <Card.Header>
            <div className="d-flex justify-content-between align-items-center">
              Созданные тесты
              <div className="d-flex justify-content-center align-items-center gap-1">
                <Button
                  disabled={isLoadingDeleteTest}
                  onClick={() => router.push("/Tests/Create")}
                  variant="primary"
                  className="d-flex justify-content-center align-items-center"
                >
                  <BsPlusLg />
                </Button>

                <Button
                  disabled={isLoadingDeleteTest}
                  onClick={refetch}
                  variant="primary"
                  className="d-flex justify-content-center align-items-center"
                >
                  <BsArrowClockwise />
                </Button>
              </div>
            </div>
          </Card.Header>
          <Card.Body className="overflow-y-auto" style={{ height: "540px" }}>
            <Tabs defaultActiveKey="published">
              <Tab eventKey="published" title="Опубликованные">
                <Table bordered hover responsive>
                  <thead>
                    <tr>
                      <th>№</th>
                      <th>Название</th>
                      <th>Количество вопросов</th>
                      <th>Дата создания</th>
                      <th>Дата публикации</th>
                      <th>Дисциплина</th>
                    </tr>
                  </thead>
                  <tbody>
                    {publishedTests!.map((test, index) => (
                      <tr key={test.id}>
                        <td>{index + 1}</td>
                        <td>{test.title}</td>
                        <td>{test.questions?.length}</td>
                        <td>{new Date(test.creationDate).toLocaleString()}</td>
                        <td>
                          {test.publicationDate
                            ? new Date(test.publicationDate).toLocaleString()
                            : null}
                        </td>
                        <td>{test.discipline?.title}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Tab>

              <Tab eventKey="drafts" title="Черновики">
                <Table bordered hover responsive>
                  <thead>
                    <tr>
                      <th>№</th>
                      <th>Название</th>
                      <th>Количество вопросов</th>
                      <th>Дата и время создания</th>
                      <th>Дисциплина</th>
                    </tr>
                  </thead>
                  <tbody>
                    {unpublishedTests!.map((test, index) => (
                      <tr
                        key={test.id}
                        onMouseEnter={() => setSelectedTest(test.id!)}
                        onMouseLeave={() => setSelectedTest(null)}
                      >
                        <td>{index + 1}</td>
                        <td>{test.title}</td>
                        <td>{test.questions?.length}</td>
                        <td>{new Date(test.creationDate).toLocaleString()}</td>
                        <td>{test.discipline?.title}</td>

                        <td>
                          <div className="d-flex justify-content-center align-items-center gap-1">
                            <Button
                              onClick={HandleEdit}
                              disabled={isLoadingDeleteTest}
                            >
                              <BsFillPencilFill />
                            </Button>

                            <Button
                              disabled={isLoadingDeleteTest}
                              onClick={HandleDelete}
                            >
                              <BsFillTrashFill />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      )}
    </motion.div>
  );
}
