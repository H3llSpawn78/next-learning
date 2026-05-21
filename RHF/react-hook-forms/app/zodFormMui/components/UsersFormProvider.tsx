"use client";
import Users from "@/app/zodFormMui/components/Users";
import { defaultValues, Schema, schema } from "@/app/zodFormMui/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormProvider, useForm } from "react-hook-form";

export function UsersFormProvider() {
  const methods = useForm<Schema>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues,
  });
  const onSubmit = (data: any) => console.log(data, "Form Submitted");
  return (
    <FormProvider {...methods}>
      <Users />
    </FormProvider>
  );
}
