import { z } from "zod";
import { patterns } from "@/app/zodFormMui/types/constants";

export const schema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(15, { message: "Too many characters" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    // validate text to be email
    // if true - pass
    // if false - fail
    .refine((email) => patterns.email.test(email), {
      message: "Email not valid",
    }),
  // long-hand version
  //.refine((email) => {
  // return patterns.email.test(email);
  //}),
  states: z
    .array(z.string())
    .min(1, { message: "States is required" })
    .max(2, { message: "Max of 2 items allowed" }),
});

// Export schema as a type
export type Schema = z.infer<typeof schema>;

export const defaultValues: Schema = {
  name: "",
  email: "",
  states: [],
};
