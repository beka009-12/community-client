"use server";

import { updateTag } from "next/cache";
import { headers } from "next/headers";
import { createClientRequest } from "@/src/server/api/client-requests";
import { apiErrorMessage, isApiError } from "@/src/server/api/errors";
import { parseClientRequest } from "@/src/server/validation/client-request";
import type { FieldErrors } from "@/src/server/validation/form";

export interface RequestFormState {
  ok?: boolean;
  error?: string;
  fieldErrors?: FieldErrors;
  // Echoed back: React resets the form after an action, and a client who
  // mistyped their email shouldn't have to retype the whole brief.
  values?: Record<string, string>;
}

const echo = (formData: FormData): Record<string, string> =>
  Object.fromEntries(
    [...formData.entries()].filter(
      (entry): entry is [string, string] =>
        typeof entry[1] === "string" && !entry[0].startsWith("$"),
    ),
  );

// The API counts requests per address; without this every visitor would
// share our server's limit.
async function visitorIp(): Promise<string | null> {
  const list = await headers();
  return list.get("x-forwarded-for")?.split(",")[0]?.trim() || list.get("x-real-ip") || null;
}

// Public: clients have no account (ТЗ §3), so no session check here.
export async function submitClientRequest(
  _prev: RequestFormState,
  formData: FormData,
): Promise<RequestFormState> {
  const parsed = parseClientRequest(formData);
  if (!parsed.success) {
    return { fieldErrors: parsed.fieldErrors, values: echo(formData) };
  }

  try {
    await createClientRequest(parsed.data, await visitorIp());
  } catch (error) {
    if (isApiError(error, "rate_limited")) {
      return {
        error: "Слишком много заявок с вашего адреса. Попробуйте через час или напишите нам в Telegram.",
        values: echo(formData),
      };
    }
    if (isApiError(error, "validation")) {
      const hasFields = Object.keys(error.fieldErrors).length > 0;
      return {
        fieldErrors: error.fieldErrors,
        error: hasFields ? error.message || undefined : apiErrorMessage(error),
        values: echo(formData),
      };
    }
    console.error("Failed to submit client request", error);
    return {
      error: "Не удалось отправить заявку. Попробуйте ещё раз или напишите нам в Telegram.",
      values: echo(formData),
    };
  }

  // companies_count on /stats/ may have changed.
  updateTag("stats");
  return { ok: true };
}
