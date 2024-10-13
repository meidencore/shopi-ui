"use server";

import { get } from "@/app/common/util/fetch";
import { Product } from "../interfaces/product.interface";

export default async function getProducts() {
  return await get<Product[]>("products", ["products"]);
}