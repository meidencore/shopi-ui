import { Grid2 as Grid } from "@mui/material";
import getProducts from "./actions/get-products";
import Product from "./product";

export default async function Products() {
  const products = await getProducts();

  return (
    <Grid container spacing={3} marginBottom={"2rem"}>
      {products.map((product) => {
        return (
          <Grid key={product.id} size={{ sm: 6, lg: 4, xs: 12 }}>
            <Product product={product} />
          </Grid>
        );
      })}
    </Grid>
  );
}
