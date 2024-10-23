"use client";

import { Grid2 as Grid } from "@mui/material";
import Product from "./product";
import { Product as IProduct } from "./interfaces/product.interface";
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { API_URL } from "../common/constants/api";
import revalidateProducts from "./actions/revalidate-products";
import getAuthentication from "../auth/actions/get-authenticacion";

interface ProductsGridProps {
  products: IProduct[];
}

export default function ProductsGrid({ products }: ProductsGridProps) {
  useEffect(() => {
    let socket: Socket;

    const createSocket = async () => {
      socket = io(API_URL, {
        auth: {
          Authentication: await getAuthentication(),
        },
      });

      socket.on("productUpdated", () => {
        revalidateProducts();
      });
    };
    createSocket();

    return () => {
      socket?.disconnect();
    };
  }, []);

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
