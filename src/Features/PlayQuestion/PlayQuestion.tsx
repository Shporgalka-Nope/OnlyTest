import {
  CreateAnswerDto,
  PublicQuestionDto,
  usePostAnswerCreateMutation,
} from "@/state/apiAutogen";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Spinner,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import { useDMSFContext } from "../DynamicMultiStepForm/libs/useDMSFContext";

interface Props {
  displayQuestion: PublicQuestionDto;
  attemptId: string;
  index: number;
}

export default function PlayQuestion({
  displayQuestion: dq,
  index,
  attemptId,
}: Props) {
  const [selectedAnswer, setAnswer] = useState(
    dq.type === "single_choice" ? "" : ([] as string[]),
  );

  useEffect(() => {
    console.log(selectedAnswer);
  }, [selectedAnswer]);
  const [create, { isLoading }] = usePostAnswerCreateMutation();
  const { onStepFinish } = useDMSFContext();

  const HandleSubmit = async () => {
    console.log(selectedAnswer);
    let stringAnswers: string;
    if (dq.type !== "single_choice") {
      stringAnswers = (selectedAnswer as string[]).join(", ");
    } else {
      stringAnswers = selectedAnswer as string;
    }
    const newAnswer: CreateAnswerDto = {
      attemptId: attemptId,
      questionId: dq.questionId,
      payload: stringAnswers,
    };
    try {
      await create({ createAnswerDto: newAnswer }).unwrap();
      onStepFinish();
    } catch (err: any) {
      console.log(err);
    }
  };
  return (
    <Card className="mb-3">
      <Card.Header>
        <Card.Title>Вопрос №{index}</Card.Title>
      </Card.Header>

      <Card.Body>
        <small className="lead">Прочитайте вопрос и выберите ответ ниже</small>
        <Card.Title>{dq.title}</Card.Title>
        {dq.description && <Card.Text>{dq.description}</Card.Text>}

        {dq.type === "single_choice" ? (
          <ToggleButtonGroup
            className="w-100"
            style={{ minWidth: "100px" }}
            type="radio"
            name="answer"
            vertical
            value={selectedAnswer}
            onChange={setAnswer}
          >
            {dq.answerOptions.map((a) => (
              <ToggleButton
                key={a.answerOptionId}
                id={a.answerOptionId}
                value={a.answerOptionId}
              >
                {a.payload}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        ) : (
          <ToggleButtonGroup
            className="w-100"
            style={{ minWidth: "100px" }}
            type="checkbox"
            name="answer"
            vertical
            value={selectedAnswer! as []}
            onChange={setAnswer}
          >
            {dq.answerOptions.map((a) => (
              <ToggleButton
                key={a.answerOptionId}
                id={a.answerOptionId}
                value={a.answerOptionId}
              >
                {a.payload}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        )}
      </Card.Body>
      <Card.Footer className="d-flex justify-content-end">
        <Button
          className="d-flex justify-content-center align-items-center"
          disabled={!selectedAnswer || isLoading}
          onClick={HandleSubmit}
        >
          {isLoading ? <Spinner size="sm" variant="light" /> : "Ответить"}
        </Button>
      </Card.Footer>
    </Card>
  );
}
