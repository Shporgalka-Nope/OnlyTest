import z from "zod";

export const CreateNewDisciplineFormFields = z.object({
  title: z.string().nonempty("Поле не может быть пустым"),
});
export type CreateDisciplineForm = z.infer<
  typeof CreateNewDisciplineFormFields
>;
