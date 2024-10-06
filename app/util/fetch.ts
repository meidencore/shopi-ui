import { cookies } from "next/headers";
import { API_URL } from "../constants/api";
import { getErrorMessage } from "./errors";
import { jwtDecode } from "jwt-decode";

type ErrorResponse = {
  error: boolean;
  emailError?: string;
  passwordError?: string;
  unknownError?: string;
};

function setCookies() {
  return { Cookie: cookies().toString() };
}

function setAuthCookie(response: Response) {
  const setCookieHeader = response.headers.getSetCookie();
  const authCookie = setCookieHeader.find((c) =>
    c.startsWith("Authentication"),
  );
  if (authCookie) {
    const token = authCookie.split(";")[0].split("=")[1];
    cookies().set({
      name: "Authentication",
      value: token,
      httpOnly: true,
      secure: true,
      expires: new Date(jwtDecode(token).exp! * 1000),
    });
  }
}

export async function post(
  path: string,
  formData: FormData,
): Promise<ErrorResponse> {
  const response: ErrorResponse = { error: false };

  try {
    const res = await fetch(`${API_URL}/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...setCookies() },
      body: JSON.stringify(Object.fromEntries(formData)),
    });

    const parsedRes = await res.json();

    if (!res.ok) {
      response.error = true;
      const errorsMessages: Array<string> = getErrorMessage(parsedRes);
      switch (res.status) {
        case 422:
          response.emailError = getErrorMessage(parsedRes)[0];
          break;
        case 400:
          response.emailError = errorsMessages.find((error) =>
            error.startsWith("Email"),
          );
          response.passwordError = errorsMessages.find((error) =>
            error.startsWith("Password"),
          );
          break;
        case 401:
          response.emailError = errorsMessages[0];
          response.passwordError = errorsMessages[0];
          break;
        default:
          response.unknownError = getErrorMessage(parsedRes)[0];
          break;
      }
    }

    if (path === "auth/login" && !response.error) setAuthCookie(res);
    return response;
  } catch (err) {
    response.error = true;
    response.unknownError = getErrorMessage(err)[0];

    return response;
  }
}

export async function get(path: string) {
  const res = await fetch(`${API_URL}/${path}`, {
    headers: { ...setCookies() },
  });

  return res.json();
}
