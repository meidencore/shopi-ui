import { cookies } from "next/headers";
import { API_URL } from "../constants/api";

export function setCookies() {
  return { Cookie: cookies().toString() };
}

export async function post(path: string, formData: FormData) {
  return await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...setCookies() },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
}

export async function get<T>(path: string, tags?: string[]) {
  const res = await fetch(`${API_URL}/${path}`, {
    headers: { ...setCookies() },
    next: { tags },
  });

  return res.json() as T;
}
