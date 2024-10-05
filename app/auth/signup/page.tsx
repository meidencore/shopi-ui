"use client";

import { Button, Link, Stack, TextField } from "@mui/material";
import NextLink from "next/link";
import { useFormState } from "react-dom";
import createUser from "./create-user";

export default function Signup() {
  const [state, formAction] = useFormState(createUser, { error: false });

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
        ></TextField>
        <TextField
          name="password"
          label="Password"
          type="password"
          variant="outlined"
          helperText={state.passwordError}
          error={state.error}
        ></TextField>
        <Button type="submit" variant="outlined">
          Signup
        </Button>
        <Link component={NextLink} href="/auth/login" className="self-center">
          Login
        </Link>
      </Stack>
    </form>
  );
}
