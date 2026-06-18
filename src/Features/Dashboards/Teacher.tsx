import { Col, Container, Row } from "react-bootstrap";
import TestsWidget from "../TestsWidget/TestsWidget";
import PlayTestsWidget from "../PlayTestsWidget/PlayTestsWidget";
import UserStatWidget from "../UserStatWidget/UserStatWidget";
import TestStatWidget from "../TestStatsWidget/TestStatsWidget";

export default function Teacher() {
  return (
    <Container>
      <Row className="mb-5">
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
