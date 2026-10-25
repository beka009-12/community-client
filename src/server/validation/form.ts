import { z } from "zod";
import { plural } from "@/src/lib/plural";

export type FieldErrors = Partial<Record<string, string>>;

export type ParseResult<T> =
  | { success: true; data: T }
  | { success: false; fieldErrors: FieldErrors };

// An empty field reports «Заполните поле» first: parseForm keeps only the
// first message per field.
export const requiredText = (min: number, max: number, label: string) => {
  const empty = `Заполните поле «${label}»`;
  return z
    .string({ error: empty })
    .trim()
    .min(1, empty)
    .min(min, `Минимум ${min} ${plural(min, "символ", "символа", "символов")}`)
    .max(max, `Не больше ${max} символов`);
};

export function parseForm<S extends z.ZodType>(
  schema: S,
  formData: FormData,
): ParseResult<z.infer<S>> {
  const result = schema.safeParse(Object.fromEntries(formData));
  if (result.success) return { success: true, data: result.data };
  const flat = z.flattenError(result.error).fieldErrors as Record<string, string[] | undefined>;
  const fieldErrors: FieldErrors = {};
  for (const [key, messages] of Object.entries(flat)) {
    if (messages?.[0]) fieldErrors[key] = messages[0];
  }
  return { success: false, fieldErrors };
}

// Blank → null: the API clears a nullable URL only when it receives null.
export const nullableUrl = (max = 200) =>
  z.preprocess(
    (value) => (typeof value === "string" && value.trim() === "" ? null : value),
    z.url("Введите ссылку целиком, с https://").max(max, `Не больше ${max} символов`).nullable(),
  );
