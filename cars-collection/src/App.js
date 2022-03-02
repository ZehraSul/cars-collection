import "./css/App.css";
import { useState, useEffect } from "react";
import AddNewCar from "./Components/AddNewCar";
import DisplayCars from "./Components/DisplayCars";
import EditAllCars from "./Components/EditAllCars";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Logo from "../src/images/car.png";
import { CARS_COLLECTION_URL } from "./config/config";

function App() {
  /* Setting initial state */
  const [carsList, setCarsList] = useState([]);
  const [make, setMake] = useState("");
  const [model, setModel] = useState(2022);
  const [registration, setRegistration] = useState("");
  const [owner, setOwner] = useState("");

  /* Using useEffect to make the initial call to my api to display any documents that already exist in the database*/
  useEffect(() => {
    fetch(`${CARS_COLLECTION_URL}/displayAll`, {
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
          // use the data to change the state of carsList
          setCarsList(data);
        },
        (err) => {
          console.log(err);
        }
      );
  }, []);
  return (
    <div className="App">
      <img src={Logo} alt="car" />
      {/* Table with list of cars is my DisplayCars component */}
      <DisplayCars
        carsList={carsList}
        setCarsList={setCarsList}
        make={make}
        setMake={setMake}
        model={model}
        setModel={setModel}
        registration={registration}
        setRegistration={setRegistration}
        owner={owner}
        setOwner={setOwner}
      />
      <Row>
        <Col>
          {/* Add new car button component */}
          <AddNewCar
            carsList={carsList}
            setCarsList={setCarsList}
            make={make}
            setMake={setMake}
            model={model}
            setModel={setModel}
            registration={registration}
            setRegistration={setRegistration}
            owner={owner}
            setOwner={setOwner}
          />
        </Col>
        <Col>
          {/* Edit all cars button component */}
          <EditAllCars carsList={carsList} setCarsList={setCarsList} />
        </Col>
      </Row>
    </div>
  );
}

export default App;
