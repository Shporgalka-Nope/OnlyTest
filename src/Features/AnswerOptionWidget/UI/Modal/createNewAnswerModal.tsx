import { Modal } from "react-bootstrap";

interface Props {
  children: React.ReactNode;
  show: boolean;
  onHide: (state: boolean) => void;
}

export default function CreateNewAnswerModal({
  children,
  show,
  onHide,
}: Props) {
  return (
    <Modal show={show} onHide={() => onHide(false)}>
      <Modal.Header>
        <Modal.Title>Управление ответом</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}
