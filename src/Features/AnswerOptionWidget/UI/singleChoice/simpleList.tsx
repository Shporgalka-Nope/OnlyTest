import { Button, Table } from "react-bootstrap";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { ListProps } from "../../libs/listRegistry";

export default function simpleList({
  answers,
  onEditClick,
  onDeleteClick,
}: ListProps) {
  return (
    <Table className="overflow-y-auto" bordered hover responsive>
      <thead>
        <tr>
          <th>№</th>
          <th>Значение</th>
          <th>Ключ</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {answers.map((answer, index) => (
          <tr key={answer.id}>
            <td>{index + 1}</td>
            <td>{answer.payload}</td>
            <td>{answer.isCorrect ? "Да" : ""}</td>

            <td>
              <div className="d-flex justify-content-center align-items-center gap-1">
                <Button
                  onClick={() => onEditClick(answer)}
                  // disabled={isLoadingDeleteTest}
                >
                  <BsFillPencilFill />
                </Button>

                <Button
                  onClick={() => onDeleteClick(answer.id!)}
                  // disabled={isLoadingDeleteTest}
                >
                  <BsFillTrashFill />
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
