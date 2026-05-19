"use client";
import { error } from "console";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";

export default function Users() {
  const [input, setInput] = useState("");
  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm<{ email: string }>({ mode: "all" });

  // ...register means that we do not need
  // to add onChange, ref, name,onBlur, isRequired etc etc, as ...regsiter handles all that for us :)

  const onSubmit = (data: { email: string }) => {
    // log input values
    console.log(data, "Form Submitted");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container mx-auto max-w-xl mt-5">
        <div className="flex flex-col p-2">
          {/* Non RHF input example */}
          {/* 
        <label className="mb-2">First Name</label>
        <input
          value={input}
          className="rounded-sm border border-gray-300 border-width: 2px bg-gray-300 text-black p-2 mb-5 mt-4"
          placeholder="Test input"
          type="text"
          onChange={(e) => setInput(e.target.value)}
        /> */}

          {/* RHF implmentation of the above */}
          <label className="mb-2">First Name</label>

          <input
            {...register("email", {
              required: { value: true, message: "Field is required" },
              maxLength: { value: 10, message: "Too many characters" },
            })}
            className="rounded-sm border border-gray-300 border-width: 2px bg-gray-300 text-black p-2 mb-5 mt-4"
            placeholder="Email"
          />
          <p className="text-red-500">{errors.email?.message}</p>

          <input
            type="submit"
            value="submit"
            className="rounded-sm border-2 border-gray-300 bg-gray-500 text-white p-2 mb-5 hover:bg-gray-300 hover:text-black transition-all duration-300 ease-in-out"
          />
        </div>
      </div>
    </form>
  );
}
