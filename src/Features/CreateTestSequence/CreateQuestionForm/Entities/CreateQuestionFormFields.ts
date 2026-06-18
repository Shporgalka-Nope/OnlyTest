import z from "zod";

export const CreateQuestionFormFields = z.object({
  title: z.string().nonempty("Поле не может быть пустым"),
  description: z.string().optional(),
  score: z
    .number("Значение должно быть цифрой")
    .min(1, "Значение должно быть больше 0")
    .nonoptional("Поле не может быть пустым"),
  type: z.string().nonempty("Поле не может быть пустым"),
});
export type CreateQuestionForm = z.infer<typeof CreateQuestionFormFields>;
