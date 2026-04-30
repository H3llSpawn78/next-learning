import { FormInput } from "./FormInput/FormInput";
import { formatCurrency } from "../utils/formatCurrency";
import React from "react";

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
const HouseRowMem = React.memo(HouseRow);
export default HouseRow;
// export { HouseRowMem };
