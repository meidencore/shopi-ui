import { Box } from "@mui/material";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Box className="h-screen flex items-center justify-center">{children}</Box>
  );
}
