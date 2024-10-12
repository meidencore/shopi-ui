"use server";

import { post } from "@/app/common/util/fetch";
import { redirect } from "next/navigation";

export default async function createUser(_prevState: any, formData: FormData) {
  const response = await post("users", formData);

  if (response.error) {
    return response;
  }
  redirect("/");
}
