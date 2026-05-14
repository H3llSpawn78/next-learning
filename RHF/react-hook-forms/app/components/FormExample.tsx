"use client";
import { useEffect, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}

interface IFormInput {
  firstName: string;
  lastName: string;
  gender: GenderEnum;
  submit: string;
}

export default function FormExample() {
  //const onSubmit: SubmitHandler<IFormInput> = (data: any) => console.log(data);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "male",
    },
  });

  const renderCount = useRef(0);
  useEffect(() => {
    renderCount.current++;
  }, []);

  console.log(watch());
  console.log(errors);
  return (
    <div className="container mx-auto max-w-xl p-4">
      <form
        className="flex flex-col"
        onSubmit={handleSubmit((data) => {
          console.log(data);
        })}
      >
        <label className="mb-2">First Name</label>
        <input
          placeholder="First Name"
          className="rounded-sm border border-gray-300 border-width: 2px bg-gray-300 text-black p-2 mb-5"
          {...register("firstName", { required: "This is required" })}
        />
        <p className="text-red-500">{errors.firstName?.message}</p>

        <label className="mb-2">Last Name</label>
        <input
          placeholder="Last Name"
          className="rounded-sm border border-gray-300 border-width: 2px bg-gray-300 text-black p-2 mb-5"
          {...register("lastName", {
            required: "This is required",
            minLength: {
              value: 4,
              message: "Must have minimum of 4 characters",
            },
          })}
        />
        <p className="text-red-500">{errors.lastName?.message}</p>

        <label className="mb-2">Gender Selection</label>
        <select
          className="rounded-sm border border-gray-300 border-width: 2px bg-gray-300 text-black p-2 mb-5"
          {...register("gender", {
            required: "This is required",
          })}
          onChange={(e) => console.log(e.target.value)}
        >
          <option value="male">male</option>
          <option value="female">female</option>
          <option value="other">other</option>
        </select>
        <input
          type="submit"
          className="rounded-sm border-2 border-gray-300 bg-gray-500 text-white p-2 mb-5 hover:bg-gray-300 hover:text-black transition-all duration-300 ease-in-out"
        />
      </form>

      <div>Render Count: {renderCount.current}</div>
    </div>
  );
}
