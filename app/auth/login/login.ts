"use server";

import { getErrorMessage } from "@/app/common/util/errors";
import { post } from "@/app/common/util/fetch";
import { redirect } from "next/navigation";
import { AUTHENTICATION_COOKIE } from "../auth-cookie";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { FormErrorResponse } from "../auth-form-error";

export default async function login(
  _prevState: any,
  formData: FormData,
): Promise<FormErrorResponse> {
  try {
    const response: FormErrorResponse = { error: false };
    const res = await post("auth/login", formData);

    const parsedRes = await res.json();

    if (!res.ok) {
      response.error = true;
      const errorsMessages: Array<string> = getErrorMessage(parsedRes);
      if (res.status === 401) {
        response.emailError = errorsMessages[0];
        response.passwordError = errorsMessages[0];
      } else {
        response.unknownError = getErrorMessage(parsedRes)[0];
      }
    }

    if (response.error) {
      return response;
    }

    setAuthCookie(res);
  } catch (error) {
    return { error: true, unknownError: getErrorMessage(error)[0] };
  }

  redirect("/");
}

function setAuthCookie(response: Response) {
  const setCookieHeader = response.headers.getSetCookie();
  const authCookie = setCookieHeader.find((c) =>
    c.startsWith(AUTHENTICATION_COOKIE),
  );
  if (authCookie) {
    const token = authCookie.split(";")[0].split("=")[1];
    cookies().set({
      name: AUTHENTICATION_COOKIE,
      value: token,
      httpOnly: true,
      secure: true,
      expires: new Date(jwtDecode(token).exp! * 1000),
    });
  }
}
