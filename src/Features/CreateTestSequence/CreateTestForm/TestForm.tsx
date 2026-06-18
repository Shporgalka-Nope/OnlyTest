import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Spinner } from "react-bootstrap";
import { motion } from "motion/react";
import { feedbackVariants } from "@/Shared/Animations/FeedbackVariants";
import { useTestForm } from "./libs/useTestForm";
import {
  CreateTestForm,
  CreateTestFormFields,
} from "./Entities/CreateTestFormFields";
import { useDMSFContext } from "@/Features/DynamicMultiStepForm/libs/useDMSFContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PageLoading from "@/Shared/UI/PageLoading/PageLoading";
import { useAvailableDisciplines } from "./libs/useAvailableDisciplines";
import { useAppDispatch, useAppSelector } from "@/state/useStoreHooks";
import { CreateTestDto, EditTestInfoDto } from "@/state/apiAutogen";
import { resetTestFormData } from "./libs/testFormSlice";

export default function TestForm() {
  const router = useRouter();
  const sessionTest = useAppSelector((state) => state.session.testForm);
  const dispatch = useAppDispatch();
  const [mode, setMode] = useState<"create" | "edit">("create");
  const { onStepFinish } = useDMSFContext();
  const { HandleCreate, HandleEdit, FindById } = useTestForm();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateTestForm>({
    resolver: zodResolver(CreateTestFormFields),
  });
  const {
    disciplines,
    isError: isDisError,
    isFetching,
    refetch,
  } = useAvailableDisciplines();

  const params = useSearchParams();
  const testId = params.get("testid");
  useEffect(() => {
    const findByIdStarter = async () => {
      await FindById(testId!);
    };

    if (!testId) {
      dispatch(resetTestFormData());
      return;
    }

    if (!sessionTest || sessionTest.id !== testId) {
      findByIdStarter();
    }
  }, [testId]);

  // Update session storage
  useEffect(() => {
    if (sessionTest.id) {
      setMode("edit");
      reset({
        id: sessionTest.id,
        title: sessionTest.title,
        description: sessionTest.description ?? undefined,
        disciplineId: sessionTest.disciplineId ?? undefined,
      });
      return;
    }
    setMode("create");
    reset({
      id: undefined,
      description: undefined,
      disciplineId: undefined,
      title: undefined,
    });
  }, [sessionTest]);

  const onSubmit: SubmitHandler<CreateTestForm> = async (
    data: CreateTestForm,
  ) => {
    if (mode === "create") {
      const createNewTest: CreateTestDto = {
        title: data.title,
        description: data.description,
        disciplineId: data.disciplineId,
      };
      const test = await HandleCreate(createNewTest);
      router.push(`/Tests/Create?testid=${test.id}`);
    } else {
      const editTest: EditTestInfoDto = {
        testId: data.id!,
        title: data.title,
        description: data.description,
        disciplineId: data.disciplineId,
      };
      await HandleEdit(editTest);
    }
  };

  const Skip = () => {
    onStepFinish();
  };

  return (
    <>
      <PageLoading
        isFetching={isFetching}
        isError={isDisError}
        refetch={refetch}
      >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h1>Тест</h1>

          {/* test id */}
          <Form.Control hidden {...register("id")} />

          {/* title */}
          <Form.Group className="mb-1" controlId="titleControl">
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
            <Form.Label className="mt-1">Дисциплина</Form.Label>
            <Form.Select
              {...register("disciplineId")}
              isInvalid={!!errors.disciplineId}
              defaultValue=""
            >
              <option value="none">Без дисциплины</option>
              {disciplines?.map((discipline) => (
                <option key={discipline.id} value={discipline.id}>
                  {discipline.title}
                </option>
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

          <div className="d-flex flex-md-row flex-column justify-content-between mt-3 gap-2">
            <button
              disabled={isSubmitting}
              type="submit"
              className="btn btn-primary order-md-2"
            >
              {isSubmitting ? (
                <Spinner size="sm" variant="light" />
              ) : mode === "create" ? (
                "Создать"
              ) : (
                "Изменить"
              )}
            </button>
          </div>
        </Form>
      </PageLoading>
    </>
  );
}
