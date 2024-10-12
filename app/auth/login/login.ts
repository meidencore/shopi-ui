"use server";

import { post } from "@/app/common/util/fetch";
import { redirect } from "next/navigation";

export default async function login(_prevState: any, formData: FormData) {
  const response = await post("auth/login", formData);

  if (response.error) {
    return response;
  }
  redirect("/");
}
