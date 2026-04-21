type CurrencyFormatOptions = {
  currency?: string;
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

export function formatCurrency(
  amount: number,
  {
    currency = "GBP",
    locale = "en-GB",
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
  }: CurrencyFormatOptions = {},
) {
  if (typeof amount !== "number") return "";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount);
}

type BaseProps = {
  onChange: (e: React.ChangeEvent<any>) => void;
};

type TextInputProps = BaseProps & {
  type: "text" | "email";
  value: string;
};

type NumberInputProps = BaseProps & {
  type: "number";
  value: number;
};

type TextareaProps = BaseProps & {
  type: "textarea";
  value: string;
};

type CheckboxProps = BaseProps & {
  type: "checkbox";
  value: boolean;
};

type SelectProps = BaseProps & {
  type: "select";
  value?: string;
};

type FormInputProps =
  | TextInputProps
  | NumberInputProps
  | TextareaProps
  | CheckboxProps
  | SelectProps;

function FormInput(props: FormInputProps) {
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

    default:
      return null;
  }
}

type HouseRowProps = {
  house: {
    id: number;
    address: string;
    region: string;
    askingPrice: number;
  };
  id: number;
  address: string;
  region: string;
  askingPrice: number;
  handlePriceChange: (id: number, value: number) => void;
  handleRegionChange: (id: number, value: string) => void;
};

const HouseRow = ({
  house,
  handlePriceChange,
  handleRegionChange,
}: HouseRowProps) => {
  return (
    <tr>
      <td>{house.address}</td>
      <td>
        {house.region}
        <br />
        <FormInput
          type="select"
          value={house.region}
          onChange={(e: any) => handleRegionChange(house.id, e.target.value)}
        />
      </td>
      <td>
        {formatCurrency(house.askingPrice)}
        <br />
        <FormInput
          type="number"
          value={house.askingPrice}
          onChange={(e: any) =>
            handlePriceChange(house.id, parseInt(e.target.value))
          }
        />
      </td>
    </tr>
  );
};

export default HouseRow;
