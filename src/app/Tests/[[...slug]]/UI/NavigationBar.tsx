import {
  dmsfState,
  setDmsfStep,
} from "@/Features/DynamicMultiStepForm/libs/dmsfSlice";
import { Question } from "@/state/apiAutogen";
import { useAppDispatch, useAppSelector } from "@/state/useStoreHooks";
import { MouseEvent, useEffect } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

interface Props {
  dmsfId: string;
  steps: Question[];
}

export default function NavigationBar({ dmsfId, steps }: Props) {
  const dispatch = useAppDispatch();
  const currentStep =
    useAppSelector(
      (state) =>
        state.session.dmsfState.find((s) => s.id === dmsfId)?.currentStep,
    ) || 0;

  const HandleClick = (e: MouseEvent<HTMLButtonElement>, step: number) => {
    e.preventDefault();
    dispatch(setDmsfStep({ id: dmsfId, currentStep: step }));
  };

  return (
    <div className="d-flex flex-column align-items-center w-100 px-3">
      <h5 className="text-center mt-2">
        Навигация <br />
        <small className="text-body-secondary">Кликните чтобы перейти</small>
      </h5>
      <div
        className="overflow-x-auto w-100"
        style={{ minWidth: "350px", maxWidth: "900px" }}
      >
        <ButtonGroup
          className="flex-nowrap text-nowrap mx-md-auto w-100"
          defaultValue={0}
        >
          <ToggleButton
            id="bt-testInfo"
            type="radio"
            variant="outline-primary"
            value={0}
            checked={currentStep === 0}
            onClick={(e) => HandleClick(e, 0)}
          >
            Информация о тесте
          </ToggleButton>

          {/* Steps */}
          {steps.map((step, index) => (
            <ToggleButton
              key={step.id!}
              id={step.id!}
              type="radio"
              variant="outline-primary"
              value={index + 1}
              checked={currentStep === index + 1}
              onClick={(e) => HandleClick(e, index + 1)}
            >
              Вопрос №{index + 1}
            </ToggleButton>
          ))}

          <ToggleButton
            id="bt-createQuestion"
            type="radio"
            variant="outline-primary"
            value={steps.length + 1}
            checked={currentStep === steps.length + 1}
            onClick={(e) => HandleClick(e, steps.length + 1)}
          >
            Создать новый вопрос
          </ToggleButton>

          <ToggleButton
            id="bt-publishTest"
            type="radio"
            variant="outline-primary"
            value={steps.length + 2}
            checked={currentStep === steps.length + 2}
            onClick={(e) => HandleClick(e, steps.length + 2)}
          >
            Публикация
          </ToggleButton>
        </ButtonGroup>
      </div>
    </div>
  );
}
