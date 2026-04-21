import React from "react";

type BaseProps = {
  onChange: (e: React.ChangeEvent<any>) => void;
};

export type TextInputProps = BaseProps & {
  type: "text" | "email";
  value: string;
};

export type NumberInputProps = BaseProps & {
  type: "number";
  value: number;
};

export type TextareaProps = BaseProps & {
  type: "textarea";
  value: string;
};

export type CheckboxProps = BaseProps & {
  type: "checkbox";
  value: boolean;
};

export type SelectProps = BaseProps & {
  type: "select";
  value?: string;
};

export type SubmitProps = BaseProps & {
  type: "submit";
  value?: string;
};

export type FormInputProps =
  | TextInputProps
  | NumberInputProps
  | TextareaProps
  | CheckboxProps
  | SelectProps
  | SubmitProps;

export function FormInput(props: FormInputProps) {
  switch (props.type) {
    case "text":
    case "email":
      return (
        <input
          type={props.type}
          value={props.value}
          onChange={props.onChange}
        />
      );
    case "number":
      return (
        <input
          type={props.type}
          value={props.value}
          onChange={props.onChange}
        />
      );

    case "textarea":
      return <textarea value={props.value} onChange={props.onChange} />;

    case "checkbox":
      return (
        <input
          type="checkbox"
          checked={props.value}
          onChange={props.onChange}
        />
      );

    case "select":
      return (
        <select onChange={props.onChange} value={props.value}>
          <option value="England">England</option>
          <option value="Scotland">Scotland</option>
          <option value="Ireland">Ireland</option>
          <option value="Wales">Wales</option>
        </select>
      );

    case "submit":
      return <input type="submit" value="Submit" />;

    default:
      return null;
  }
}
