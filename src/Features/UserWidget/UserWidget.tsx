import { motion } from "motion/react";
import { Button, Card, Modal, Table } from "react-bootstrap";
import {
  BsArrowClockwise,
  BsFillPencilFill,
  BsFillTrashFill,
  BsPlus,
  BsPlusLg,
} from "react-icons/bs";
import { TestsWidgetVatiants } from "../TestsWidget/Animations/TestsWidgetVariants";
import { useUsers } from "./libs/useUsers";
import PageLoading from "@/Shared/UI/PageLoading/PageLoading";
import { useAppSelector } from "@/state/useStoreHooks";
import { useEffect, useState } from "react";
import UserModal from "./UI/UserModal/UserModal";
import { ReturnUserDto } from "@/state/apiAutogen";

export default function UserWidget() {
  const roleNames = {
    student: "Студент",
    teacher: "Учитель",
    admin: "Администратор",
  };

  const [showModal, setShowModal] = useState(false);
  const [displayUser, setDisplayUser] = useState<ReturnUserDto | undefined>();
  const loggedUserEmail = useAppSelector((state) => state.local.user.Email);
  const {
    users,
    isUsersError,
    isUsersFetching,
    refetchUsers,
    HandleDelete,
    isDeleteLoading,
  } = useUsers();

  const Create = () => {
    setDisplayUser(undefined);
    setShowModal(true);
  };

  const Patch = (user: ReturnUserDto) => {
    setDisplayUser(user);
    setShowModal(true);
  };

  const Delete = async (userId: string) => {
    await HandleDelete(userId);
    refetchUsers();
  };

  useEffect(() => {
    if (!showModal) {
      refetchUsers();
    }
  }, [showModal]);

  return (
    <>
      <UserModal
        showModal={showModal}
        setShowModal={setShowModal}
        displayUser={displayUser}
      />

      <motion.div
        className="h-100 w-100"
        variants={TestsWidgetVatiants}
        initial="initial"
        animate="show"
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <PageLoading
          isError={isUsersError}
          isFetching={isUsersFetching}
          refetch={refetchUsers}
        >
          <Card>
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                Управление пользователями
                <div className="d-flex justify-content-center align-items-center gap-1">
                  <Button
                    disabled={isDeleteLoading}
                    onClick={Create}
                    variant="primary"
                    className="d-flex justify-content-center align-items-center"
                  >
                    <BsPlusLg />
                  </Button>

                  <Button
                    disabled={isDeleteLoading}
                    onClick={refetchUsers}
                    variant="primary"
                    className="d-flex justify-content-center align-items-center"
                  >
                    <BsArrowClockwise />
                  </Button>
                </div>
              </div>
            </Card.Header>
            <Card.Body className="overflow-y-auto" style={{ height: "540px" }}>
              <Table bordered hover responsive>
                <thead>
                  <tr>
                    <th>№</th>
                    <th>ФИО</th>
                    <th>Роль</th>
                    <th>Эл. Почта</th>
                  </tr>
                </thead>
                <tbody>
                  {(users ?? [])
                    .filter((user) => user.email !== loggedUserEmail)
                    .map((user, index) => (
                      <tr key={user.userId}>
                        <td>{index + 1}</td>
                        <td>{user.userName}</td>
                        <td>{roleNames[user.roleName]}</td>
                        <td>{user.email}</td>

                        <td className="d-flex flex-row justify-content-center align-items-center gap-2">
                          <Button variant="primary" onClick={() => Patch(user)}>
                            <BsFillPencilFill />
                          </Button>

                          <Button
                            variant="danger"
                            onClick={async () => await Delete(user.userId)}
                          >
                            <BsFillTrashFill />
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </PageLoading>
      </motion.div>
    </>
  );
}
