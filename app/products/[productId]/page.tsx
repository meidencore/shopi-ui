import { Grid2 as Grid, Stack, Typography } from "@mui/material";
import getProduct from "./get-product";
import Image from "next/image";
import getProductImage from "../product-image";

interface SingleProductProps {
  params: { productId: string };
}

export default async function SingleProduct({ params }: SingleProductProps) {
  const product = await getProduct(+params.productId);
  return (
    <Grid container marginBottom={"2rem"} rowGap={3}>
      {product.imageExists && (
        <Grid size={{ md: 6, sm: 12 }}>
          <Image
            src={getProductImage(product.id)}
            alt="Image of the product"
            width="0"
            height="0"
            className="w-full sm:w-3/4 h-auto"
            sizes="100vw"
          />
        </Grid>
      )}
      <Grid size={{ md: 6, sm: 12 }}>
        <Stack gap={3}>
          <Typography variant="h2">{product.name}</Typography>
          <Typography>{product.description}</Typography>
          <Typography variant="h4">${product.price}</Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}
