import { API_URL } from "../common/constants/api";

export default function getProductImage(id: number) {
  return `${API_URL}/images/products/${id}.jpg`;
}
