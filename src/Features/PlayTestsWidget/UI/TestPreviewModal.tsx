import { GetPublishedWidgetDto } from "@/state/apiAutogen";
import { Button, Modal } from "react-bootstrap";

interface Props {
  showState: boolean;
  handleClose: () => void;
  displayTest?: GetPublishedWidgetDto;
}

export default function TestPreviewModal({
  showState,
  handleClose,
  displayTest,
}: Props) {
  return (
    <Modal show={showState} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Информация о тесте</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Тема: {displayTest?.title}</p>
        {displayTest?.description && <p>Описание: {displayTest.description}</p>}
        <p>Кол-во вопросов: {displayTest?.questionCount}</p>
        {displayTest?.creationDate && (
          <p>
            Дата создания:{" "}
            {new Date(displayTest!.creationDate!).toLocaleDateString()}
          </p>
        )}
        <p>Автор: {displayTest?.authorUserName}</p>
        {displayTest?.disciplineName && (
          <p>Дисциплина: {displayTest?.disciplineName}</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex justify-content-end">
          <Button
            variant="primary"
            onClick={() =>
              window.open(`/Play?testId=${displayTest?.testId}`, "_blank")
            }
          >
            Пройти тест
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
