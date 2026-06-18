import { AnswerOption } from "@/state/apiAutogen";

export default function muntipleChoiceValidationRule(answers: AnswerOption[]) {
  return answers.filter((a) => a.isCorrect).length >= 1;
}
