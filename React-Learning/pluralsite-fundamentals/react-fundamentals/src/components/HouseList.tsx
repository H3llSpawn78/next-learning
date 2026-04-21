import { useState } from "react";
import HouseRow from "./HouseRow.js";

const houses = [
  {
    id: 1,
    address: "12 test street",
    region: "England",
    askingPrice: 200000,
  },
  {
    id: 2,
    address: "24 test avenue",
    region: "Ireland",
    askingPrice: 400000,
  },
  {
    id: 3,
    address: "12 test street",
    region: "Wales",
    askingPrice: 200000,
  },
  {
    id: 4,
    address: "24 test avenue",
    region: "Scotland",
    askingPrice: 400000,
  },
];

const HouseList = () => {
  const [houseList, setHouseList] = useState(houses);
  const handlePriceChange = (id: number, value: number) => {
    setHouseList((prevHouseList: any[]) =>
      prevHouseList.map((house) => {
        if (house.id === id) {
          return { ...house, askingPrice: value };
        }
        return house;
      }),
    );
  };

  const handleRegionChange = (id: number, value: string) => {
    setHouseList((prevHouseList: any[]) =>
      prevHouseList.map((house) => {
        if (house.id === id) {
          return { ...house, region: value };
        }
        return house;
      }),
    );
  };
  return (
    <>
      <h1>House List</h1>
      <table>
        <thead>
          <tr>
            <th>Address</th>
            <th>Region</th>
            <th>Asking Price</th>
          </tr>
        </thead>
        <tbody>
          {houseList.map((house) => (
            <HouseRow
              {...house}
              key={house.id}
              house={house}
              handlePriceChange={handlePriceChange}
              handleRegionChange={handleRegionChange}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default HouseList;
