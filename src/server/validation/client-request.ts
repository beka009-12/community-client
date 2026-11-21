import { z } from "zod";
import { PROJECT_TYPES } from "@/src/data/services";
import { maxLengthMessage, parseForm, requiredText } from "./form";

// "300 000" → 300000, blank → null: budget is optional and in som.
const budget = z.preprocess(
  (value) => (typeof value === "string" ? value.replace(/\s/g, "") : ""),
  z
    .string()
    .regex(/^\d{0,12}$/, "Укажите сумму цифрами, в сомах")
    .transform((value) => (value === "" ? null : Number(value))),
);

// Field names and limits from the API's ClientRequestCreate.
export const clientRequestSchema = z.object({
  name: requiredText(2, 150, "Имя"),
  company: requiredText(1, 150, "Компания"),
  email: z.email("Введите email в формате name@company.kg").max(254, maxLengthMessage(254)),
  phone: requiredText(1, 128, "Телефон"),
  title: requiredText(2, 150, "Название проекта"),
  description: requiredText(10, 2000, "Описание задачи"),
  project_type: z.enum(PROJECT_TYPES, "Выберите, что нужно сделать"),
  budget,
});

export type ClientRequestFields = z.infer<typeof clientRequestSchema>;

export const parseClientRequest = (formData: FormData) =>
  parseForm(clientRequestSchema, formData);
