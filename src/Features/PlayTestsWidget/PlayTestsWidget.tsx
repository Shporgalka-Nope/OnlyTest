"use client";
import { motion } from "framer-motion";
import { TestsWidgetVatiants } from "../TestsWidget/Animations/TestsWidgetVariants";
import { Button, Card, Table } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { BsArrowClockwise } from "react-icons/bs";
import { useTestsWidgetData } from "./libs/useTestsWidgetData";
import TestPreviewModal from "./UI/TestPreviewModal";
import { useState } from "react";
import { GetPublishedWidgetDto } from "@/state/apiAutogen";

export default function PlayTestsWidget() {
  const router = useRouter();
  const { data, isFetching, refetch } = useTestsWidgetData();

  const [showModal, setModal] = useState(false);
  const [displayTest, setDisplayTest] = useState<
    GetPublishedWidgetDto | undefined
  >(undefined);

  const HandleClick = (test: GetPublishedWidgetDto) => {
    setDisplayTest(test);
    setModal(true);
  };

  return (
    <>
      <TestPreviewModal
        showState={showModal}
        handleClose={() => setModal(false)}
        displayTest={displayTest}
      />

      <motion.div
        className="h-100 w-100"
        variants={TestsWidgetVatiants}
        initial="initial"
        animate="show"
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <Card>
          <Card.Header>
            <div className="d-flex justify-content-between align-items-center">
              Доступные тесты{" "}
              <small className="text-body-secondary">
                Кликните чтобы пройти тест
              </small>
              <div className="d-flex justify-content-center align-items-center gap-1">
                <Button
                  disabled={isFetching}
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
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>№</th>
                  <th>Тема</th>
                  <th>Количество вопросов</th>
                  <th>Дата создания</th>
                  <th>Автор</th>
                  <th>Дисциплина</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((test, index) => (
                  <tr key={test.testId} onClick={() => HandleClick(test)}>
                    <td>{index + 1}</td>
                    <td>{test.title}</td>
                    <td>{test.questionCount}</td>
                    <td>{new Date(test.creationDate).toLocaleString()}</td>
                    <td>{test.authorUserName}</td>
                    <td>{test.disciplineName}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </motion.div>
    </>
  );
}
