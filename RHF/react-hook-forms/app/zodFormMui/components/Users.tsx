"use client";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { schema, Schema } from "../types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import style from "@emotion/styled";

const StyledTextField = style(TextField)`
    & .MuiInputBase-root{
      background-color: #d1d5dc;
      margin-bottom: 15px;
      color: black;
      
      input{
      padding: 10px;
      }
    }
`;

export default function Users() {
  const { register } = useForm<Schema>({
    mode: "all",
    resolver: zodResolver(schema),
  });

  // ...register means that we do not need
  // to add onChange, ref, name,onBlur, isRequired etc,
  // as ...regsiter handles all that for us along with handling the values etc :)

  return (
    <div className="flex flex-col">
      <StyledTextField
        {...register("name")}
        variant="outlined"
        className="mb-12"
      />
      <StyledTextField {...register("email")} />
    </div>
  );
}
