"use client";
import { InputLabel, Stack, TextField } from "@mui/material";
import { useForm, useFormContext } from "react-hook-form";
import { schema, Schema } from "../types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "@emotion/styled";
import { RHFAutocomplete } from "@/app/zodFormMui/components/RHFAutocomplete";

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiFormLabel-root.Mui-focused": {
    padding: 5,
    backgroundColor: theme.palette.gray.main,
  },
  "& .MuiInputBase-root": {
    backgroundColor: theme.palette.gray.main,
    marginBottom: "10px",
    color: "black",

    input: {
      padding: "15px",
    },

    " &.Mui-error fieldset": {
      borderWidth: 3,
    },
  },

  //Remove autofill bg
  "& input:-webkit-autofill": {
    WebkitBoxShadow: `0 0 0 1000px transparent inset`,
    WebkitTextFillColor: "inherit",
    transition: "background-color 9999s ease-in-out 0s",
  },
}));

export default function Users() {
  // ...register means that we do not need
  // to add onChange, ref, name,onBlur, isRequired etc,
  // as ...regsiter handles all that for us along with handling the values etc :)
  const {
    register,
    formState: { errors },
  } = useFormContext<Schema>();
  return (
    <Stack sx={{ gap: 2 }}>
      <InputLabel>Name</InputLabel>
      <StyledTextField
        {...register("name")}
        variant="outlined"
        error={!!errors.name}
        helperText={errors.name?.message}
        placeholder="Name"
      />
      <InputLabel>Email</InputLabel>
      <StyledTextField
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
        variant="outlined"
        placeholder="Email"
      />
      <RHFAutocomplete<Schema>
        name="states"
        label="States"
        options={[
          { id: "1", label: "Alabama" },
          { id: "2", label: "Alaska" },
          { id: "3", label: "Texas" },
        ]}
      />
    </Stack>
  );
}
