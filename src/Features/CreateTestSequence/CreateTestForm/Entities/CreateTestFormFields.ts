import z from "zod";

export const CreateTestFormFields = z.object({
  id: z.string().optional(),
  title: z.string().nonempty("Поле не может быть пустым"),
  description: z.string().optional(),
  disciplineId: z.string().optional(),
});
export type CreateTestForm = z.infer<typeof CreateTestFormFields>;
