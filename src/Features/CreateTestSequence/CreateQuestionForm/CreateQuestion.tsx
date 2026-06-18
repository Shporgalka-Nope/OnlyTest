"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateQuestionForm,
  CreateQuestionFormFields,
} from "./Entities/CreateQuestionFormFields";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, Card, Form, Spinner } from "react-bootstrap";
import { motion } from "motion/react";
import { feedbackVariants } from "@/Shared/Animations/FeedbackVariants";
import { QuestionTypes } from "./Entities/QuestionTypes";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/state/useStoreHooks";
import { useCreateQuestion } from "./libs/useCreateQuestion";
import {
  Question,
  useGetQuestionGetAnswersForQuestionQuery,
} from "@/state/apiAutogen";
import AnswerOptionWidget from "@/Features/AnswerOptionWidget/AnswerOptionWidget";
import { listRegistry } from "@/Features/AnswerOptionWidget/libs/listRegistry";
import { useEffect, useState } from "react";

interface Props {
  question?: Question;
}

export default function CreateQuestion({ question }: Props) {
  const sessionTest = useAppSelector((state) => state.session.testForm);
  const router = useRouter();
  const {
    handleCreate,
    handleEdit,
    handleDelete: handleDeleteQuestion,
  } = useCreateQuestion();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<CreateQuestionForm>({
    defaultValues: question && {
      title: question?.title,
      description: question?.description || undefined,
      score: question?.score,
      type: question?.type,
    },
    resolver: zodResolver(CreateQuestionFormFields),
  });

  const type = watch("type");
  const { ValidationRule } = listRegistry[type] || {};

  useEffect(() => {
    if (!question?.id) return;
    clearErrors("form");

    if (
      question?.answerOptions?.filter((a) => a.type === type) &&
      !ValidationRule(question?.answerOptions?.filter((a) => a.type === type))
    ) {
      if (type === "single_choice") {
        setError("form", {
          type: "manual",
          message: "У вопроса должен быть лишь 1 верный ответ",
        });
      } else if (type === "muntiple_choice") {
        setError("form", {
          type: "manual",
          message: "У вопроса должен быть хотя бы 1 верный ответ",
        });
      }
    }
  }, [question?.answerOptions]);

  const handleDelete = async () => {
    await handleDeleteQuestion(question!.id!);
  };

  const onSubmit: SubmitHandler<CreateQuestionForm> = async (
    data: CreateQuestionForm,
  ) => {
    if (!question) {
      await handleCreate({
        testId: sessionTest.id!,
        title: data.title,
        order: sessionTest.questions?.length! + 1,
        score: data.score,
        description: data.description || undefined,
        type: data.type,
      });
      return;
    }
    await handleEdit({
      questionId: question?.id!,
      title: data.title,
      description: data.description,
      score: data.score,
      type: data.type,
    });
  };
  return (
    <>
      <h1>Вопросы</h1>
      <div className="d-flex w-100 justify-content-center">
        <Card bg="light" className="mb-3 w-100">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Card.Header className="d-flex flex-column flex-md-row gap-2">
              {/* title */}
              <Form.Group className="flex-grow-1" controlId="titleControl">
                <Form.Control
                  {...register("title")}
                  placeholder="Текст вопроса"
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
            </Card.Header>
            <Card.Body>
              {/* description */}
              <Form.Group className="mb-1" controlId="descriptionControl">
                <Form.Control
                  as="textarea"
                  rows={3}
                  style={{
                    height: "100px",
                    overflow: "auto",
                    resize: "vertical",
                  }}
                  {...register("description")}
                  placeholder="Дополнительные данные (Опционально)"
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

              <div className="d-flex flex-column flex-md-row gap-2">
                {/* type */}
                <Form.Group className="mb-1" controlId="typeControl">
                  <Form.Label className="mt-1">Тип ответов</Form.Label>
                  <Form.Select {...register("type")} isInvalid={!!errors.type}>
                    {QuestionTypes.map((questionType) => (
                      <option key={questionType.code} value={questionType.code}>
                        {questionType.title}
                      </option>
                    ))}
                  </Form.Select>
                  {errors.type && (
                    <motion.div
                      variants={feedbackVariants}
                      initial="initial"
                      animate="show"
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      <Form.Control.Feedback className="d-block" type="invalid">
                        {errors.type?.message}
                      </Form.Control.Feedback>
                    </motion.div>
                  )}
                </Form.Group>

                {/* score */}
                <Form.Group className="mb-1" controlId="scoreControl">
                  <Form.Label className="mt-1">Баллы</Form.Label>
                  <Form.Control
                    {...register("score", { valueAsNumber: true })}
                    isInvalid={!!errors.score}
                  ></Form.Control>
                  {errors.score && (
                    <motion.div
                      variants={feedbackVariants}
                      initial="initial"
                      animate="show"
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      <Form.Control.Feedback className="d-block" type="invalid">
                        {errors.score?.message}
                      </Form.Control.Feedback>
                    </motion.div>
                  )}
                </Form.Group>
              </div>

              <br />
              {question?.id ? (
                <div className="w-100" style={{ height: "300px" }}>
                  <AnswerOptionWidget
                    question={question}
                    answers={question?.answerOptions || []}
                    selectedType={type}
                  />
                </div>
              ) : (
                <Card className="p-2">
                  Ответы можно добавить после создания вопроса
                </Card>
              )}
              {errors.form && (
                <motion.div
                  variants={feedbackVariants}
                  initial="initial"
                  animate="show"
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <Form.Control.Feedback className="d-block" type="invalid">
                    {errors.form?.message}
                  </Form.Control.Feedback>
                </motion.div>
              )}

              {/* Submit */}
              <div className="d-flex flex-md-row flex-column justify-content-between mt-3 gap-2">
                <button
                  disabled={isSubmitting || !sessionTest.id}
                  type="submit"
                  className="btn btn-primary order-md-2"
                >
                  {isSubmitting ? (
                    <Spinner size="sm" variant="light" />
                  ) : question ? (
                    "Изменить"
                  ) : (
                    "Создать"
                  )}
                </button>
                {question?.id && (
                  <Button
                    disabled={isSubmitting}
                    variant="danger"
                    className="btn btn-primary order-md-2"
                    onClick={handleDelete}
                  >
                    {isSubmitting ? (
                      <Spinner size="sm" variant="light" />
                    ) : (
                      "Удалить"
                    )}
                  </Button>
                )}
              </div>
            </Card.Body>
          </Form>
        </Card>
      </div>
    </>
  );
}
