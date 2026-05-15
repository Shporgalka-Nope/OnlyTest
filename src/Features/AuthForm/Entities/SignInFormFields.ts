import z from "zod";

export const SignInFormFields = z.object({
  email: z.email("Неверный формат почты").nonempty("Поле не может быть пустым"),
  password: z.string().nonempty("Поле не может быть пустым"),
});
export type SignInForm = z.infer<typeof SignInFormFields>;
