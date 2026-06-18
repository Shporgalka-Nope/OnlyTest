import { motion } from "motion/react";
import { Button, Card } from "react-bootstrap";
import { BsPlusLg } from "react-icons/bs";
import { useState } from "react";
import { AnswerOptionVatiants } from "./Animations/AnswerOptionVatiants";
import { AnswerOption, Question } from "@/state/apiAutogen";
import { listRegistry } from "./libs/listRegistry";
import CreateNewAnswerModal from "./UI/Modal/createNewAnswerModal";
import { useAnswer } from "./UI/singleChoice/libs/useAnswer";

interface Props {
  question: Question;
  answers: AnswerOption[];
  selectedType: string;
}

export default function AnswerOptionWidget({
  question,
  answers,
  selectedType,
}: Props) {
  // List to display answers and create form for modal
  const { ListComponent, CreateComponent } = listRegistry[selectedType];
  const { deleteAnswer } = useAnswer();
  const [showModal, setModal] = useState<boolean>(false);

  const [selectedOption, setSelectedOption] = useState<AnswerOption | null>(
    null,
  );

  const handleDelete = async (answerId: string) => {
    await deleteAnswer(answerId, question.id!);
  };

  const handleAdd = () => {
    setSelectedOption(null);
    setModal(true);
  };

  const handleClick = (answer: AnswerOption | null) => {
    setSelectedOption(answer);
    setModal(true);
  };
  return (
    <motion.div
      className="h-100 w-100"
      variants={AnswerOptionVatiants}
      initial="initial"
      animate="show"
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <>
        <CreateNewAnswerModal show={showModal} onHide={setModal}>
          <CreateComponent
            question={question}
            answer={selectedOption}
            setModalState={setModal}
          />
        </CreateNewAnswerModal>

        <Card className="w-100 h-100">
          <Card.Header>
            <div className="d-flex justify-content-between align-items-center">
              Управление ответами
              <div className="d-flex justify-content-center align-items-center gap-1">
                <Button
                  // disabled={}
                  onClick={handleAdd}
                  variant="primary"
                  className="d-flex justify-content-center align-items-center"
                >
                  <BsPlusLg />
                </Button>
              </div>
            </div>
          </Card.Header>
          <Card.Body className="overflow-y-auto">
            {ListComponent ? (
              <ListComponent
                answers={answers}
                onEditClick={handleClick}
                onDeleteClick={handleDelete}
              />
            ) : null}
          </Card.Body>
        </Card>
      </>
      {/* <PageLoading isError={isError} isFetching={isFetching} refetch={refetch}>
      </PageLoading> */}
    </motion.div>
  );
}
