import { Col, Container, Row } from "react-bootstrap";
import UserWidget from "../UserWidget/UserWidget";
import DisciplinesWidget from "../DisciplinesWidget/DisciplinesWidget";
import TestsWidget from "../TestsWidget/TestsWidget";
import PlayTestsWidget from "../PlayTestsWidget/PlayTestsWidget";
import UserStatWidget from "../UserStatWidget/UserStatWidget";
import TestStatWidget from "../TestStatsWidget/TestStatsWidget";

export default function Admin() {
  return (
    <Container>
      <Row className="mb-3">
        <Col md={8}>
          <UserWidget />
        </Col>
        <Col md={4}>
          <DisciplinesWidget />
        </Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <TestsWidget />
        </Col>
        <Col>
          <PlayTestsWidget />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <UserStatWidget />
        </Col>
        <Col>
          <TestStatWidget />
        </Col>
      </Row>
    </Container>
  );
}
