import { Col, Container, Row } from "react-bootstrap";
import PlayTestsWidget from "../PlayTestsWidget/PlayTestsWidget";
import UserStatWidget from "../UserStatWidget/UserStatWidget";

export default function Student() {
  return (
    <Container>
      <Row className="mb-5">
        <Col></Col>
        <Col>
          <PlayTestsWidget />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <UserStatWidget />
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
