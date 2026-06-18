import z from "zod";

export const CreateNewUserFormFields = z.object({
  fullname: z.string().nonempty("Поле не может быть пустым"),
  email: z
    .email("Некорректный адресс почты")
    .nonempty("Поле не может быть пустым"),
  password: z.string().nonempty("Поле не может быть пустым"),
  role: z.string().nonempty("Поле не может быть пустым"),
});
export type CreateUserForm = z.infer<typeof CreateNewUserFormFields>;
