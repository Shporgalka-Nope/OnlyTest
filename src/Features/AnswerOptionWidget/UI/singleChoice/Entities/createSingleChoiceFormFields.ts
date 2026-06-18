import z from "zod";

export const createSingleChoiceFormFields = z.object({
  value: z
    .string()
    .trim()
    .nonempty("Поле не должно быть пустым")
    .nonoptional("Поле обязательно для заполнения"),
  isCorrect: z.boolean(),
});

export type createSingleChoiceForm = z.infer<
  typeof createSingleChoiceFormFields
>;
