/** Thin client-side fetch wrapper that unwraps { success, data } / { success, error } responses. */
export class ClientApiError extends Error {
  status: number;
  details?: unknown;
  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export async function apiFetch<T = unknown>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  const isFormData = typeof FormData !== "undefined" && init?.body instanceof FormData;
  if (!isFormData && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(path, {
    ...init,
    headers,
  });
  const json = await res.json().catch(() => null);

  if (!res.ok || !json?.success) {
    const message = json?.error?.message || "Something went wrong. Please try again.";
    throw new ClientApiError(message, res.status, json?.error?.details);
  }
  return json.data as T;
}
