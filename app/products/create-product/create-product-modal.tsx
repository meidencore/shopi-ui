"use client";

import { Box, Button, Modal, Stack, TextField } from "@mui/material";
import { useState } from "react";
import createProduct from "../actions/create-product";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface CreateProductModalProps {
  open: boolean;
  handleClose: () => void;
}

interface FormResponse {
  error: boolean;
  messages?: string;
}

export default function CreateProductModal({
  open,
  handleClose,
}: CreateProductModalProps) {
  const [response, setResponse] = useState<FormResponse>();

  const onClose = () => {
    setResponse(undefined);
    handleClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <form
          className="w-full max-w-xs"
          action={async (formData) => {
            const response = await createProduct(formData);
            setResponse(response);
            if (!response.error) {
              onClose();
            }
          }}
        >
          <Stack spacing={2}>
            <TextField
              name="name"
              label="Name"
              type="text"
              variant="outlined"
              required
              helperText={response?.messages}
              error={response?.error}
            />
            <TextField
              name="description"
              label="Description"
              type="text"
              variant="outlined"
              required
              helperText={response?.messages}
              error={response?.error}
            />
            <TextField
              name="price"
              label="Price"
              type="text"
              variant="outlined"
              required
              helperText={response?.messages}
              error={response?.error}
            />
            <Button type="submit" variant="outlined">
              Create
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}
