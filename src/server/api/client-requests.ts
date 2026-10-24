import "server-only";
import { requestNoContent } from "./http";

export interface ClientRequestWrite {
  name: string;
  company: string;
  email: string;
  phone: string;
  title: string;
  description: string;
  project_type: string;
  budget: number | null;
}

// Clients have no account, so this goes out without a token. Any 2xx means
// saved. The API limits requests per address and sees only our server, so
// the visitor's own IP travels along.
export async function createClientRequest(data: ClientRequestWrite, clientIp: string | null): Promise<void> {
  await requestNoContent("/client-requests/", {
    method: "POST",
    body: data,
    headers: clientIp ? { "X-Forwarded-For": clientIp } : undefined,
  });
}
