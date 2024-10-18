import { get } from "@/app/common/util/fetch";
import { Product } from "../interfaces/product.interface";

export default async function getProduct(id: number) {
  return get<Product>(`products/${id}`);
}
