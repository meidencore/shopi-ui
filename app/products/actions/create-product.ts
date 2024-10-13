"use server";

import { revalidateTag } from "next/cache";
import { getErrorMessage } from "../../common/util/errors";
import { post } from "../../common/util/fetch";

export default async function createProduct(formData: FormData) {
  const response = await post("products", formData);

  const errors = await response.json();

  if (!response.ok) {
    return { error: true, messages: getErrorMessage(errors)[0] };
  }
  revalidateTag("products");
  return { error: false };
}