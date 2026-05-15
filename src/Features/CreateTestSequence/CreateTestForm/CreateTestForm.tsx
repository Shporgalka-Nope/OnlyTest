import { SubmitHandler, useForm } from "react-hook-form";
import {
  CreateTestFormFields,
  type CreateTestForm,
} from "./Entities/CreateTestFormFields";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "react-bootstrap";
import { motion } from "motion/react";
import { feedbackVariants } from "@/Shared/Animations/FeedbackVariants";
import { useGetUserGetAvailableDisciplinesQuery } from "@/state/apiAutogen";

export default function CreateTestForm() {
  const { data } = useGetUserGetAvailableDisciplinesQuery();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateTestForm>({
    resolver: zodResolver(CreateTestFormFields),
  });

  const onSubmit: SubmitHandler<CreateTestForm> = async (
    data: CreateTestForm,
  ) => {};

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h1>Создание теста</h1>

      {/* title */}
      <Form.Group className="mb-1" controlId="emailControl">
        <Form.Label className="mt-1">Тема теста</Form.Label>
        <Form.Control
          {...register("title")}
          placeholder="Тема теста"
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

      {/* description */}
      <Form.Group className="mb-1" controlId="emailControl">
        <Form.Label className="mt-1">Описание</Form.Label>
        <Form.Control
          {...register("description")}
          placeholder="Короткое описание теста"
          isInvalid={!!errors.description}
        />
        {errors.description && (
          <motion.div
            variants={feedbackVariants}
            initial="initial"
            animate="show"
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Form.Control.Feedback className="d-block" type="invalid">
              {errors.description?.message}
            </Form.Control.Feedback>
          </motion.div>
        )}
      </Form.Group>

      {/* discipline */}
      <Form.Group className="mb-1" controlId="emailControl">
        <Form.Label className="mt-1">Описание</Form.Label>
        <Form.Select
          {...register("disciplineId")}
          isInvalid={!!errors.disciplineId}
        >
          {data?.disciplines.map((discipline) => (
            <option value={discipline.id}>{discipline.title}</option>
          ))}
        </Form.Select>
        {errors.disciplineId && (
          <motion.div
            variants={feedbackVariants}
            initial="initial"
            animate="show"
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Form.Control.Feedback className="d-block" type="invalid">
              {errors.disciplineId?.message}
            </Form.Control.Feedback>
          </motion.div>
        )}
      </Form.Group>
    </Form>
  );
}
