"use server";

import { revalidateTag } from "next/cache";
import { getErrorMessage } from "../../common/util/errors";
import { post, setCookies } from "../../common/util/fetch";
import { Product } from "../interfaces/product.interface";
import { API_URL } from "@/app/common/constants/api";

// TODO try-catch
export default async function createProduct(formData: FormData) {
  const response = await post("products", formData);

  const file = formData.get("image");
  if (file instanceof File && file.size && response.ok) {
    const { id } = (await response.json()) as Product;
    await uploadProductImage(`products/${id}/image`, file);
  }

  if (!response.ok) {
    return { error: true, messages: getErrorMessage(await response.json())[0] };
  }

  revalidateTag("products");
  return { error: false };
}

async function uploadProductImage(path: string, file: File) {
  const formData = new FormData();
  formData.append("image", file);

  return await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: { ...setCookies() },
    body: formData,
  });
}
