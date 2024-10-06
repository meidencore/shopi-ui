"use client";

import { Button, Link, Stack, TextField } from "@mui/material";
import NextLink from "next/link";
import { useFormState } from "react-dom";
import login from "./login";

export default function Login() {
  const [state, formAction] = useFormState(login, { error: false });
  return (
    <form action={formAction} className="w-full max-w-xs">
      <Stack spacing={2}>
        <TextField
          name="email"
          label="Email"
          type="email"
          variant="outlined"
          helperText={state.emailError}
          error={state.error}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          helperText={state.emailError}
          error={state.error}
        />
        <Button type="submit" variant="outlined">
          Login
        </Button>
        <Link component={NextLink} href="/auth/signup" className="self-center">
          Signup
        </Link>
      </Stack>
    </form>
  );
}
