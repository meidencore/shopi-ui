"use server";

import { post } from "@/app/common/util/fetch";
import { StripeCustomCheckoutSession } from "@stripe/stripe-js";

export default async function checkout(productId: number) {
  const response = await post("checkout/session", { productId });
  return (await response.json()) as StripeCustomCheckoutSession;
}
