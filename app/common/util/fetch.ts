import { cookies } from "next/headers";
import { API_URL } from "../constants/api";
import { getErrorMessage } from "./errors";
import { jwtDecode } from "jwt-decode";
import { AUTHENTICATION_COOKIE } from "@/app/auth/auth-cookie";

function setCookies() {
  return { Cookie: cookies().toString() };
}

export async function post(path: string, formData: FormData) {
  return await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...setCookies() },
    body: JSON.stringify(Object.fromEntries(formData)),
  });
}

export async function get(path: string) {
  const res = await fetch(`${API_URL}/${path}`, {
    headers: { ...setCookies() },
  });

  return res.json();
}
