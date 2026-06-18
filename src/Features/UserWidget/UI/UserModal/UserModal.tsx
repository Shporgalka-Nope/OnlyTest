import { CreateUserDto, PatchUserDto, ReturnUserDto } from "@/state/apiAutogen";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Modal } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsFillPencilFill, BsPlusLg } from "react-icons/bs";
import { CreateUserForm, CreateNewUserFormFields } from "./Entity/NewUserForm";
import { motion } from "motion/react";
import { feedbackVariants } from "@/Shared/Animations/FeedbackVariants";
import { useUsers } from "../../libs/useUsers";
import { useEffect } from "react";

interface Props {
  showModal: boolean;
  setShowModal: (data: boolean) => void;
  displayUser?: ReturnUserDto;
}

export default function UserModal({
  showModal,
  setShowModal,
  displayUser,
}: Props) {
  useEffect(() => {
    console.log(displayUser);
    if (displayUser) {
      reset({
        email: displayUser!.email,
        fullname: displayUser!.userName,
        role: displayUser!.roleName,
        password: "",
      });
      return;
    }

    reset({
      email: "",
      fullname: "",
      role: "",
      password: "",
    });
  }, [displayUser]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateUserForm>({
    resolver: zodResolver(CreateNewUserFormFields),
  });

  const { HandleCreate, HandleUpdate } = useUsers();

  const onSubmit: SubmitHandler<CreateUserForm> = async (
    data: CreateUserForm,
  ) => {
    if (!displayUser?.email) {
      const newUser: CreateUserDto = {
        email: data.email,
        name: data.fullname,
        password: data.password,
        roleName: data.role,
      };
      await HandleCreate(newUser);
      setShowModal(false);
      return;
    }

    const patchUser: PatchUserDto = {
      userId: displayUser.userId,
      email: data.email,
      username: data.fullname,
      password: data.password,
      roleName: data.role,
    };
    await HandleUpdate(patchUser);
    setShowModal(false);
    return;
  };
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>Управление пользователем</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* fullname */}
          <Form.Group className="mb-1" controlId="fullnameControl">
            <Form.Label className="mt-1">ФИО Пользователя</Form.Label>
            <Form.Control
              {...register("fullname")}
              placeholder="Мария Маринова Иванова"
              isInvalid={!!errors.fullname}
            />
            {errors.fullname && (
              <motion.div
                variants={feedbackVariants}
                initial="initial"
                animate="show"
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <Form.Control.Feedback className="d-block" type="invalid">
                  {errors.fullname.message}
                </Form.Control.Feedback>
              </motion.div>
            )}
          </Form.Group>

          {/* email */}
          <Form.Group className="mb-1" controlId="emailControl">
            <Form.Label className="mt-1">Электронная почта</Form.Label>
            <Form.Control
              {...register("email")}
              placeholder="example@email.com"
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

          {/* password */}
          <Form.Group className="mb-1" controlId="passwordControl">
            <Form.Label className="mt-1">Пароль</Form.Label>
            <Form.Control
              type="password"
              {...register("password")}
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

          {/* role */}
          <Form.Group className="mb-1" controlId="roleControl">
            <Form.Label className="mt-1">Роль</Form.Label>
            <Form.Select {...register("role")} isInvalid={!!errors.role}>
              <option value="student">Студент</option>
              <option value="teacher">Учитель</option>
              <option value="admin">Администратор</option>
            </Form.Select>
            {errors.role && (
              <motion.div
                variants={feedbackVariants}
                initial="initial"
                animate="show"
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <Form.Control.Feedback className="d-block" type="invalid">
                  {errors.role.message}
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
            {!displayUser ? (
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
