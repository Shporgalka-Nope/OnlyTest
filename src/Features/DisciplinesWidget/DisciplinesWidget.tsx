import { motion } from "motion/react";
import { TestsWidgetVatiants } from "../TestsWidget/Animations/TestsWidgetVariants";
import PageLoading from "@/Shared/UI/PageLoading/PageLoading";
import { Button, Card, Table } from "react-bootstrap";
import { useDisciplines } from "./libs/useDisciplines";
import {
  BsArrowClockwise,
  BsFillPencilFill,
  BsFillTrashFill,
  BsPlusLg,
} from "react-icons/bs";
import DisciplinesModal from "./UI/DisciplinesModal";
import { useEffect, useState } from "react";
import { Discipline } from "@/state/apiAutogen";

export default function DisciplinesWidget() {
  const [showModal, setShowModal] = useState(false);
  const [displayDiscipline, setDisplayDiscipline] = useState<
    Discipline | undefined
  >(undefined);
  const { disciplines, isReadError, isReadFetching, refetch, HandleDelete } =
    useDisciplines();

  const Create = () => {
    setDisplayDiscipline(undefined);
    setShowModal(true);
  };

  const Patch = (disc: Discipline) => {
    setDisplayDiscipline(disc);
    setShowModal(true);
  };

  const Delete = async (id: string) => {
    await HandleDelete(id);
    refetch();
  };

  useEffect(() => {
    if (!showModal) {
      refetch();
    }
  }, [showModal]);
  return (
    <>
      <DisciplinesModal
        showModal={showModal}
        setShowModal={setShowModal}
        displayDiscipline={displayDiscipline}
      />

      <motion.div
        className="h-100 w-100"
        variants={TestsWidgetVatiants}
        initial="initial"
        animate="show"
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <PageLoading
          isError={isReadError}
          isFetching={isReadFetching}
          refetch={refetch}
        >
          <Card>
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                Управление дисциплинами
                <div className="d-flex justify-content-center align-items-center gap-1">
                  <Button
                    onClick={Create}
                    variant="primary"
                    className="d-flex justify-content-center align-items-center"
                  >
                    <BsPlusLg />
                  </Button>

                  <Button
                    onClick={refetch}
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
                    <th>Название</th>
                  </tr>
                </thead>
                <tbody>
                  {(disciplines ?? []).map((disc, index) => (
                    <tr key={disc.id}>
                      <td>{index + 1}</td>
                      <td>{disc.title}</td>

                      <td className="d-flex flex-row justify-content-center align-items-center gap-2">
                        <Button variant="primary" onClick={() => Patch(disc)}>
                          <BsFillPencilFill />
                        </Button>

                        <Button
                          variant="danger"
                          onClick={async () => await Delete(disc.id!)}
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
