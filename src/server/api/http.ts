import "server-only";
import { z, type ZodType } from "zod";
import { ApiError, parseDrfErrors } from "./errors";
import { listOf } from "./schemas";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
  headers?: Record<string, string>;
  timeoutMs?: number;
}

const TIMEOUT_MS = 10_000;
// The public site is Russian only (API.md: /api/{ru|en}/).
const API_PREFIX = "/api/ru";

export function apiUrl(path: string): string {
  const base = process.env.API_URL;
  if (!base) throw new ApiError("unavailable", 0, "API_URL is not set");
  return `${base.replace(/\/+$/, "")}${API_PREFIX}${path}`;
}

async function send(path: string, options: RequestOptions): Promise<Response> {
  const { method = "GET", body, headers: extra, timeoutMs = TIMEOUT_MS } = options;
  const headers: Record<string, string> = { Accept: "application/json", ...extra };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  try {
    return await fetch(apiUrl(path), {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      // A 3xx means the route is shadowed. Surface it instead of following
      // it to an HTML page.
      redirect: "manual",
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError("unavailable", 0, `${method} ${path}: ${String(error)}`);
  }
}

async function readJson(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

async function toError(response: Response, where: string): Promise<ApiError> {
  const { status } = response;
  if (response.type === "opaqueredirect" || (status >= 300 && status < 400)) {
    const location = response.headers.get("location") ?? "";
    return new ApiError("redirected", status, `${where} → ${status} ${location}`.trim());
  }
  if (status === 400) {
    const { message, fieldErrors } = parseDrfErrors(await readJson(response));
    return new ApiError("validation", status, message ?? "", fieldErrors);
  }
  if (status === 401) return new ApiError("unauthorized", status, `${where} → 401`);
  if (status === 403) return new ApiError("forbidden", status, `${where} → 403`);
  if (status === 404) return new ApiError("not_found", status, `${where} → 404`);
  if (status === 429) return new ApiError("rate_limited", status, `${where} → 429`);
  return new ApiError("unavailable", status, `${where} → ${status}`);
}

async function call(path: string, options: RequestOptions): Promise<unknown> {
  const where = `${options.method ?? "GET"} ${path}`;
  const response = await send(path, options);
  if (!response.ok) throw await toError(response, where);
  const text = response.status === 204 ? "" : await response.text();
  if (!text) return undefined;
  try {
    return JSON.parse(text);
  } catch {
    throw new ApiError("bad_response", response.status, `${where}: not JSON`);
  }
}

export async function request<T>(
  path: string,
  schema: ZodType<T>,
  options: RequestOptions = {},
): Promise<T> {
  const data = await call(path, options);
  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    const where = `${options.method ?? "GET"} ${path}`;
    console.error(`Unexpected API response for ${where}`, parsed.error.issues);
    throw new ApiError("bad_response", 200, `${where}: schema mismatch`);
  }
  return parsed.data;
}

export async function requestNoContent(path: string, options: RequestOptions = {}): Promise<void> {
  await call(path, options);
}

// Stops a `next` link that points back at itself.
const MAX_PAGES = 50;

// `next` is an absolute link on the API host: back to a path under API_PREFIX.
const nextPath = (next: string): string => {
  const { pathname, search } = new URL(next);
  return `${pathname.replace(API_PREFIX, "")}${search}`;
};

// Every API list comes in pages of 20 (API.md); the site needs whole lists.
export async function getAll<T>(path: string, item: ZodType<T>): Promise<T[]> {
  const page = z.object({ next: z.string().nullish(), results: listOf(item) });
  const rows: T[] = [];
  let current: string | null = path;
  for (let count = 0; current && count < MAX_PAGES; count++) {
    const data: z.output<typeof page> = await request(current, page);
    rows.push(...data.results);
    current = data.next ? nextPath(data.next) : null;
  }
  return rows;
}
