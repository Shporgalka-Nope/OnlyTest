import { zodResolver } from "@hookform/resolvers/zod";
import { Form, Spinner } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "@/Features/AuthForm/libs/useAuth";
import { motion } from "motion/react";
import { feedbackVariants } from "@/Shared/Animations/FeedbackVariants";
import { useEffect } from "react";
import { SignInForm, SignInFormFields } from "./Entities/SignInFormFields";
import { useDMSFContext } from "../DynamicMultiStepForm/libs/useDMSFContext";

export default function AuthForm() {
  const { handleLogin, isEmailConfirmed } = useAuth();
  const { onStepFinish, writeData } = useDMSFContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInForm>({ resolver: zodResolver(SignInFormFields) });

  const onSubmit: SubmitHandler<SignInForm> = async (data: SignInForm) => {
    await handleLogin(data);
    writeData({ email: data.email });
  };

  useEffect(() => {
    if (isEmailConfirmed !== null) {
      writeData({ isEmailVerified: isEmailConfirmed });
      onStepFinish();
    }
  }, [isEmailConfirmed]);

  return (
    <Form
      className="d-flex flex-column justify-content-center align-items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1>Авторизация</h1>
      {/* Email */}
      <Form.Group className="mb-1" controlId="emailControl">
        <Form.Label className="mt-1">Электронная почта</Form.Label>
        <Form.Control
          {...register("email")}
          placeholder="Введите эл. почту"
          isInvalid={!!errors.email}
        />
        {errors.email && (
          <motion.div
            variants={feedbackVariants}
            initial="initial"
            animate="show"
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Form.Control.Feedback className="d-block" type="invalid">
              {errors.email.message}
            </Form.Control.Feedback>
          </motion.div>
        )}
      </Form.Group>

      {/* Password */}
      <Form.Group className="mb-1" controlId="passwordControl">
        <Form.Label className="mt-1">Пароль</Form.Label>
        <Form.Control
          {...register("password")}
          type="password"
          placeholder="Введите пароль"
          isInvalid={!!errors.password}
        />
        {errors.password && (
          <motion.div
            variants={feedbackVariants}
            initial="initial"
            animate="show"
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <Form.Control.Feedback className="d-block" type="invalid">
              {errors.password.message}
            </Form.Control.Feedback>
          </motion.div>
        )}
      </Form.Group>

      <div className="d-flex flex-md-row flex-column justify-content-between mt-3">
        <button
          disabled={isSubmitting}
          type="submit"
          className="btn btn-primary order-md-2"
        >
          {isSubmitting ? <Spinner size="sm" variant="light" /> : "Войти"}
        </button>
        <button type="button" className="btn btn-link">
          Забыл пароль
        </button>
      </div>
    </Form>
  );
}
