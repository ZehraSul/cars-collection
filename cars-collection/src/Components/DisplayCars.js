import React from "react";
import Table from "react-bootstrap/Table";
import DeleteCar from "./DeleteCar";
import EditCar from "./EditCar";
import DisplayOlderCars from "./DisplayOlderCars";

function DisplayCars({ carsList, setCarsList }) {
  return (
    <div style={{ width: "80%", margin: "auto" }}>
      {/* Creating a table with headers */}
      <Table responsive striped bordered hover variant="primary">
        <thead>
          <tr>
            <th className="col-3 text-center">Make</th>
            <th className="col-1 text-center">Model</th>
            <th className="col-2 text-center">Registration</th>
            <th className="col-3 text-center">Current owner</th>
            <th colSpan={2}>
              {/* Checkbox for displaying only cars only than 5 years */}
              <DisplayOlderCars carsList={carsList} setCarsList={setCarsList} />
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Populating the table by mapping through the carsList array from the API call made using useEffect in app.js. Adding relevant information to each cell */}
          {carsList.map((car) => (
            <tr key={car._id}>
              <td style={{ padding: "0px", verticalAlign: "middle" }}>
                {car.make}
              </td>
              <td style={{ padding: "0px", verticalAlign: "middle" }}>
                {car.model}
              </td>
              <td style={{ padding: "0px", verticalAlign: "middle" }}>
                {car.registration}
              </td>
              <td style={{ padding: "0px", verticalAlign: "middle" }}>
                {car.owner}
              </td>
              <td>
                {/* Adding an edit button to each row */}
                <EditCar
                  carsList={carsList}
                  setCarsList={setCarsList}
                  id={car._id}
                  make={car.make}
                  model={car.model}
                  registration={car.registration}
                  owner={car.owner}
                />
              </td>
              <td>
                {/* Adding an delete button to each row */}
                <DeleteCar
                  id={car._id}
                  carsList={carsList}
                  setCarsList={setCarsList}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default DisplayCars;
