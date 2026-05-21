import { Autocomplete, Box, Checkbox, TextField } from "@mui/material";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Option } from "@/app/zodFormMui/types/option";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

type Props<T extends FieldValues> = {
  name: Path<T>;
  options: Option[];
  label: string;
};

export function RHFAutocomplete<T extends FieldValues>({
  name,
  options,
  label,
}: Props<T>) {
  const { control, register } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <Autocomplete
          options={options || []}
          //map through the values by id and then find the option that matches it's id and add to array
          // ['1', '2'] => [{id: "1", label: "label value"}, {id: "2", label: "label value 2"}]
          value={value.map((id: string) =>
            options?.find((item) => item.id === id),
          )}
          // convert ["1", "2"] => ["label value", "label value 2"]
          getOptionLabel={(option) =>
            options?.find((item) => item.id === option?.id)?.label ?? ""
          }
          isOptionEqualToValue={(option, newValue) =>
            option?.id === newValue?.id
          }
          onChange={(_, newValue) => {
            onChange(newValue.map((item) => item?.id));
          }}
          disableCloseOnSelect
          multiple
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              inputRef={ref}
              error={!!error}
              helperText={error?.message}
              label={label}
              autoComplete={"false"}
            />
          )}
          renderOption={(props, option, { selected }) => {
            const { key, ...rest } = props;
            return (
              <Box component="li" key={key} {...rest}>
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon />}
                  checkedIcon={<CheckBoxIcon />}
                  checked={selected}
                />
                {option?.label}
              </Box>
            );
          }}
        />
      )}
    />
  );
}
