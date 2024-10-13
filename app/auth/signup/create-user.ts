"use server";

import { getErrorMessage } from "@/app/common/util/errors";
import { post } from "@/app/common/util/fetch";
import { redirect } from "next/navigation";
import { FormErrorResponse } from "../auth-form-error";

export default async function createUser(
  _prevState: any,
  formData: FormData,
): Promise<FormErrorResponse> {
  try {
    const response: FormErrorResponse = { error: false };
    const res = await post("users", formData);

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
        default:
          response.unknownError = getErrorMessage(parsedRes)[0];
          break;
      }
    }
    if (response.error) {
      return response;
    }
  } catch (error) {
    return { error: true, unknownError: getErrorMessage(error)[0] };
  }

  redirect("/");
}
