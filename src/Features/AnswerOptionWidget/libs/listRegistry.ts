import { AnswerOption, Question } from "@/state/apiAutogen";
import createSingleChoice from "../UI/singleChoice/createSingleChoice";
import simpleList from "../UI/singleChoice/simpleList";
import { ComponentType } from "react";
import singleChoiceValidationRule from "../UI/singleChoice/libs/singleChoiceValidationRule";
import muntipleChoiceValidationRule from "../UI/singleChoice/libs/muntipleChoiceValidationRule";

export interface ListProps {
  answers: AnswerOption[];
  onEditClick: (answer: AnswerOption | null) => void;
  onDeleteClick: (answerId: string) => void;
}

export interface CreateProps {
  question: Question;
  answer: AnswerOption | null;
  setModalState: (state: boolean) => void;
}

type RegistryItem = {
  ListComponent: ComponentType<ListProps>;
  CreateComponent: ComponentType<CreateProps>;
  ValidationRule: (answers: AnswerOption[]) => boolean;
};

export const listRegistry: Record<string, RegistryItem> = {
  single_choice: {
    ListComponent: simpleList,
    CreateComponent: createSingleChoice,
    ValidationRule: singleChoiceValidationRule,
  },

  muntiple_choice: {
    ListComponent: simpleList,
    CreateComponent: createSingleChoice,
    ValidationRule: muntipleChoiceValidationRule,
  },
};
