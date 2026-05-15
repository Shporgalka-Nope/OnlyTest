import { motion } from "motion/react";
import { Button, Card, Tab, Table, Tabs } from "react-bootstrap";
import { TestsWidgetVatiants } from "./Animations/TestsWidgetVariants";
import { BsArrowClockwise, BsPlusLg } from "react-icons/bs";

interface Props {
  Title: string;

  OnCreate: () => void;
  OnUpdate: () => void;
  OnRefresh: () => void;

  FieldsTitles: string[];
  FieldsToDisplay: string[];
}

export default function TestsWidget({
  Title,
  OnCreate,
  OnUpdate,
  OnRefresh,
  FieldsTitles,
  FieldsToDisplay,
}: Props) {
  return (
    <motion.div
      className="w-100 h-100"
      variants={TestsWidgetVatiants}
      initial="initial"
      animate="show"
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <Card>
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
            {Title}
            <div className="d-flex justify-content-center align-items-center gap-1">
              <Button
                onClick={OnCreate}
                variant="primary"
                className="d-flex justify-content-center align-items-center"
              >
                <BsPlusLg />
              </Button>
              <Button
                onClick={OnRefresh}
                variant="primary"
                className="d-flex justify-content-center align-items-center"
              >
                <BsArrowClockwise />
              </Button>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <Tabs defaultActiveKey="published">
            <Tab eventKey="published" title="Опубликованные">
              <Table bordered hover responsive>
                <thead>
                  <tr>
                    {/* {FieldsTitles.map((title) => (
                  <th>{title}</th>
                ))} */}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Прикол</td>
                    <td>10.02.2026</td>
                    <td>Александр</td>
                    <td>Математика</td>
                  </tr>
                  <tr>
                    <td>Прикол</td>
                    <td></td>
                    <td>Александр</td>
                    <td>Математика</td>
                  </tr>
                </tbody>
              </Table>
            </Tab>

            <Tab eventKey="drafts" title="Черновики">
              <Table bordered hover responsive>
                <thead>
                  <tr>
                    {/* {FieldsTitles.map((title) => (
                  <th>{title}</th>
                ))} */}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Прикол</td>
                    <td>10.02.2026</td>
                    <td>Александр</td>
                    <td>Математика</td>
                  </tr>
                  <tr>
                    <td>Прикол</td>
                    <td></td>
                    <td>Александр</td>
                    <td>Математика</td>
                  </tr>
                </tbody>
              </Table>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </motion.div>
  );
}
