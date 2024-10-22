"use client";

import { Button } from "@mui/material";
import checkout from "./actions/checkout";
import getStripe from "./stripe";

interface CheckoutProps {
  productId: number;
}

export default function Checkout({ productId }: CheckoutProps) {
  async function handleCheckout() {
    const session = await checkout(productId);
    const stripe = await getStripe();
    await stripe?.redirectToCheckout({ sessionId: session.id });
  }

  return (
    <Button
      variant="contained"
      className="max-w-[25%]"
      onClick={handleCheckout}
    >
      Buy Now
    </Button>
  );
}
