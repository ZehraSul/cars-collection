import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { CARS_COLLECTION_URL } from "../config/config";

function DisplayOlderCars({ setCarsList }) {
  // Set initial state of cars to be displayed
  const [older, setOlder] = useState(false);

  // Function is called when check is ticked
  const handleShowOlderCars = () => {
    // set cars to be displayed to the opposite of it's previous state
    setOlder((prevState) => !prevState);
  };

  useEffect(() => {
    // if the checkbox value is true make an API call to display the older cars
    if (older) {
      fetch(`${CARS_COLLECTION_URL}/displayOlder`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then(
          (data) => {
            // use setCarsList with the response from API which now has only cars older than 5 years
            setCarsList(data);
          },
          (err) => {
            console.log(err);
          }
        );
    } else {
      // if the checkbox value is false make an API call to display all cars
      fetch("http://localhost:8000/displayAll", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          return res.json();
        })
        .then(
          (data) => {
            // use setCarsList with the response from API which now has all the cars
            setCarsList(data);
          },
          (err) => {
            console.log(err);
          }
        );
    }
    // set older and setCarsList as useEffect dependencies so react will rerun above code if either of them change
  }, [older, setCarsList]);

  return (
    <div>
      {/* Check button */}
      <Form.Check
        type="checkbox"
        id="fivePlusYearsOld"
        label="Show cars older than 5 years"
        onClick={handleShowOlderCars}
      />
    </div>
  );
}

export default DisplayOlderCars;
