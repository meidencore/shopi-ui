"use server";

import { API_URL } from "@/app/constants/api";
import { getErrorMessage } from "@/app/util/errors";
import { redirect } from "next/navigation";

type ErrorResponse = {
  error: boolean;
  emailError?: string;
  passwordError?: string;
  unknownError?: string;
};

export default async function createUser(_prevState: any, formData: FormData) {
  try {
    const res = await fetch(`${API_URL}/users`, {
      method: "POST",
      body: formData,
    });

    const parsedRes = await res.json();

    if (!res.ok) {
      const response: ErrorResponse = { error: true };
      switch (res.status) {
        case 422:
          response.emailError = getErrorMessage(parsedRes);
          break;
        case 400:
          const errorsMessages: Array<string> = getErrorMessage(parsedRes);
          response.emailError = errorsMessages.find((error) =>
            error.startsWith("Email"),
          );
          response.passwordError = errorsMessages.find((error) =>
            error.startsWith("Password"),
          );
          break;
        default:
          response.unknownError = getErrorMessage(parsedRes);
          break;
      }
      return response;
    }
  } catch (err) {
    const response: ErrorResponse = {
      error: true,
      unknownError: getErrorMessage(err),
    };
    return response;
  }
  redirect("/");
}
