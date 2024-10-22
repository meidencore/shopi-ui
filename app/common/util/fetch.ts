import { cookies } from "next/headers";
import { API_URL } from "../constants/api";
import { URLSearchParams } from "url";

export function setCookies() {
  return { Cookie: cookies().toString() };
}

export async function post(path: string, data: FormData | object) {
  const body = data instanceof FormData ? Object.fromEntries(data) : data;

  return await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...setCookies() },
    body: JSON.stringify(body),
  });
}

export async function get<T>(
  path: string,
  tags?: string[],
  params?: URLSearchParams,
) {
  const url = params ? `${API_URL}/${path}?${params}` : `${API_URL}/${path}`;
  const res = await fetch(url, {
    headers: { ...setCookies() },
    next: { tags },
  });

  return res.json() as T;
}
