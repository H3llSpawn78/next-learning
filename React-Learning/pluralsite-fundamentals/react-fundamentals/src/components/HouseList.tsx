import { useState, useEffect } from "react";
import HouseRow from "./HouseRow.js";
//import { FormInput } from "./FormInput/FormInput.js";
import styles from "./scss/Form.module.scss";

// const housesArray = [
//   {
//     id: 1,
//     address: "12 test street",
//     region: "England",
//     askingPrice: 200000,
//   },
//   {
//     id: 2,
//     address: "24 test avenue",
//     region: "Ireland",
//     askingPrice: 400000,
//   },
//   {
//     id: 3,
//     address: "12 test street",
//     region: "Wales",
//     askingPrice: 200000,
//   },
//   {
//     id: 4,
//     address: "24 test avenue",
//     region: "Scotland",
//     askingPrice: 400000,
//   },
// ];

const HouseList = () => {
  // [prevState, newState]
  const [houseList, setHouseList] = useState([]);

  // Rules of hooks -> https://react.dev/reference/rules/rules-of-hooks
  useEffect(() => {
    const fetchHouses = async () => {
      const response = await fetch("https://localhost:4000/houses");
      const houses = await response.json();
      setHouseList(houses);
    };
    fetchHouses();
  });

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

  const addHouse = () => {
    setHouseList((prevHouseList: any[]) => [
      ...prevHouseList,
      {
        id: prevHouseList.length + 1,
        address: "A new street",
        region: "Scotland",
        askingPrice: 300000,
      },
    ]);
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
          {/* <tr>
            <td>
              <FormInput type="submit" value="Submit" />
            </td>
          </tr> */}
        </tbody>
      </table>
      <button className={styles.addButton} onClick={addHouse}>
        Add House
      </button>
    </>
  );
};

export default HouseList;
