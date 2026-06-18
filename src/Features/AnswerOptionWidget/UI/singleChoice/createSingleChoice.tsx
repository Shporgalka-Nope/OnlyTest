import { Button, Form, Spinner } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  createSingleChoiceForm,
  createSingleChoiceFormFields,
} from "./Entities/createSingleChoiceFormFields";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { feedbackVariants } from "@/Shared/Animations/FeedbackVariants";
import { useAnswer } from "./libs/useAnswer";
import {
  AnswerOption,
  CreateAnswerOptionDto,
  PatchAnswerOptionDto,
} from "@/state/apiAutogen";
import { CreateProps } from "../../libs/listRegistry";
import { useEffect } from "react";

export default function createSingleChoice({
  question,
  answer,
  setModalState,
}: CreateProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<createSingleChoiceForm>({
    resolver: zodResolver(createSingleChoiceFormFields),
  });

  useEffect(() => {
    if (answer) reset({ value: answer.payload, isCorrect: answer.isCorrect });
  }, [answer]);
  const { createNewAnswer, editAnswer } = useAnswer();

  const onSubmit: SubmitHandler<createSingleChoiceForm> = async (
    data: createSingleChoiceForm,
  ) => {
    let resultAnswer: AnswerOption | undefined = undefined;
    if (answer?.id) {
      const patchAnswerOption: PatchAnswerOptionDto = {
        answerOptionId: answer.id,
        payload: data.value,
        isCorrect: data.isCorrect,
      };
      resultAnswer = await editAnswer(patchAnswerOption);
    } else {
      const newCreateAnswerDTO: CreateAnswerOptionDto = {
        questionId: question.id!,
        type: question.type,
        payload: data.value,
        isCorrect: data.isCorrect,
      };
      resultAnswer = await createNewAnswer(newCreateAnswerDTO);
    }
    if (resultAnswer) setModalState(false);
  };
  return (
    <Form>
      {/* Value */}
      <Form.Group className="mb-1">
        <Form.Label>Значение</Form.Label>
        <Form.Control
          {...register("value")}
          placeholder="Значение ответа"
          isInvalid={!!errors.value}
        />
        {errors.value && (
          <motion.div
            variants={feedbackVariants}
            initial="initial"
            animate="show"
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Form.Control.Feedback className="d-block" type="invalid">
              {errors.value.message}
            </Form.Control.Feedback>
          </motion.div>
        )}
      </Form.Group>

      {/* Is correct */}
      <Form.Group>
        <Form.Label>Верный ответ?</Form.Label>
        <Form.Check {...register("isCorrect")} isInvalid={!!errors.isCorrect} />
        {errors.isCorrect && (
          <motion.div
            variants={feedbackVariants}
            initial="initial"
            animate="show"
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Form.Control.Feedback className="d-block" type="invalid">
              {errors.isCorrect.message}
            </Form.Control.Feedback>
          </motion.div>
        )}
      </Form.Group>

      <div className="d-flex flex-md-row flex-column justify-content-between mt-3 gap-2">
        {/* Submit */}
        <Button
          disabled={isSubmitting}
          onClick={handleSubmit(onSubmit)}
          className="btn btn-primary order-md-2"
        >
          {isSubmitting ? (
            <Spinner size="sm" variant="light" />
          ) : answer?.id ? (
            "Изменить"
          ) : (
            "Создать"
          )}
        </Button>
      </div>
    </Form>
  );
}
