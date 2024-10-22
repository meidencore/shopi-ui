"use server";

import { get } from "@/app/common/util/fetch";
import { Product } from "../interfaces/product.interface";
import { URLSearchParams } from "url";

export default async function getProducts() {
  return await get<Product[]>(
    "products",
    ["products"],
    new URLSearchParams({ status: "availible" }),
  );
}
