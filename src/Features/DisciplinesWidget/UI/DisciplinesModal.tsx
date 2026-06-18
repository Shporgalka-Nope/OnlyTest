import {
  CreateDisciplineDto,
  Discipline,
  PatchDisciplineDto,
} from "@/state/apiAutogen";
import { Button, Form, Modal } from "react-bootstrap";
import {
  CreateDisciplineForm,
  CreateNewDisciplineFormFields,
} from "./CreateDisciplineFields";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDisciplines } from "../libs/useDisciplines";
import { useEffect } from "react";
import { motion } from "motion/react";
import { feedbackVariants } from "@/Shared/Animations/FeedbackVariants";
import { BsFillPencilFill, BsPlusLg } from "react-icons/bs";

interface Props {
  showModal: boolean;
  setShowModal: (state: boolean) => void;
  displayDiscipline?: Discipline;
}

export default function DisciplinesModal({
  showModal,
  setShowModal,
  displayDiscipline,
}: Props) {
  const { HandleCreate, HandlePatch } = useDisciplines();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateDisciplineForm>({
    resolver: zodResolver(CreateNewDisciplineFormFields),
  });

  useEffect(() => {
    if (displayDiscipline?.id) {
      reset({ title: displayDiscipline.title });
    }
  }, [displayDiscipline]);

  const onSubmit: SubmitHandler<CreateDisciplineForm> = async (
    data: CreateDisciplineForm,
  ) => {
    if (!displayDiscipline?.id) {
      const newDisc: CreateDisciplineDto = {
        name: data.title,
      };
      await HandleCreate(newDisc);
      setShowModal(false);
      return;
    }

    const patchDisc: PatchDisciplineDto = {
      disciplineId: displayDiscipline.id,
      name: data.title,
    };
    await HandlePatch(patchDisc);
    setShowModal(false);
    return;
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>Управление дисциплиной</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* title */}
          <Form.Group className="mb-1" controlId="titleControl">
            <Form.Label className="mt-1">Название</Form.Label>
            <Form.Control
              {...register("title")}
              placeholder="Алгебра"
              isInvalid={!!errors.title}
            />
            {errors.title && (
              <motion.div
                variants={feedbackVariants}
                initial="initial"
                animate="show"
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <Form.Control.Feedback className="d-block" type="invalid">
                  {errors.title.message}
                </Form.Control.Feedback>
              </motion.div>
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            variant="primary"
            className="d-flex justify-content-center align-items-center gap-2"
          >
            {!displayDiscipline ? (
              <>
                Создать
                <BsPlusLg />
              </>
            ) : (
              <>
                Изменить
                <BsFillPencilFill />
              </>
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
