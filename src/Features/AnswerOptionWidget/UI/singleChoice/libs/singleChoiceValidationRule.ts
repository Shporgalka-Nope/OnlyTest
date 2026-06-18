import { AnswerOption } from "@/state/apiAutogen";

export default function singleChoiceValidationRule(
  answers: AnswerOption[],
): boolean {
  return answers.filter((a) => a.isCorrect).length === 1;
}
