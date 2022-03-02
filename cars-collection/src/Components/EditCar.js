import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Years from "./Years";
import "../css/EditCar.css";
import { CARS_COLLECTION_URL } from "./config/config";

function EditCar({
  carsList,
  setCarsList,
  id,
  make,
  model,
  registration,
  owner,
}) {
  // set the initial state of the modals
  const [showModal, setShowModal] = useState(false);

  // handles closing the modal when either the "cancel" button or the "save" button is clicked
  const handleClose = () => {
    setShowModal(false);
  };

  // handles displaying the modal when the button is clicked
  const handleShow = () => {
    setShowModal(true);
  };

  /* EditHandler is called when one of the edit buttons in each row is clicked */
  const editHandler = () => {
    // Trimming away the spaces from the user input
    if (
      make.trim() !== "" &&
      registration.trim() !== "" &&
      owner.trim() !== ""
    ) {
      // If the values are not empty strings the API call is made to update
      fetch(`${CARS_COLLECTION_URL}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        // Passing in the values from the edit modal form
        body: JSON.stringify({
          id: id,
          make: make,
          model: Number(model),
          registration: registration,
          owner: owner,
        }),
      })
        .then((res) => res.json())
        .then((response) => console.log(response), setShowModal(false))
        .catch((error) => console.log("Error:", error));
    } else {
      // if any of the fields were empty display an alert with a error
      alert("ERROR: Invalid input. Please complete the form");
    }
  };

  // Function is called when the value in the make input field is changed
  const makeHandler = (e) => {
    // stop page from reloading
    e.preventDefault();
    /* Create a currentCar variable and have it equal to car with the same id as the one clicked in the table. Looking in the carsList array passed down from app.js*/
    let currentCar = carsList.find((car) => car._id === id);
    // Assign "make" the value that was input by the user
    make = e.target.value;
    // Add/update "make" in the currentCar variable
    currentCar.make = make;
    // call setCarsList to update the displayed cars, adding the edited car to the bottom of the table
    setCarsList([...carsList.filter((car) => car._id !== id), currentCar]);
  };

  // Same as makeHandler but for the model field
  const modelHandler = (e) => {
    e.preventDefault();
    let currentCar = carsList.find((car) => car._id === id);
    model = e.target.value;
    currentCar.model = model;
    setCarsList([...carsList.filter((car) => car._id !== id), currentCar]);
  };
  // Same as makeHandler but for the registration field
  const registrationHandler = (e) => {
    e.preventDefault();
    let currentCar = carsList.find((car) => car._id === id);
    registration = e.target.value;
    currentCar.registration = registration;
    setCarsList([...carsList.filter((car) => car._id !== id), currentCar]);
  };

  // Same as makeHandler but for the owner field
  const ownerHandler = (e) => {
    e.preventDefault();
    let currentCar = carsList.find((c) => c._id === id);
    owner = e.target.value;
    currentCar.owner = owner;
    setCarsList([...carsList.filter((c) => c._id !== id), currentCar]);
  };

  return (
    <div>
      {/* Edit button display in every row */}
      <Button
        type="submit"
        className="my-1"
        variant="primary"
        data-toggle="modal"
        data-target="#editCar"
        onClick={handleShow}
      >
        Edit
      </Button>
      {/* Modal that pops up on edit button click containing form for editing a car */}
      <Modal
        id="editCar"
        style={{ opacity: "1", padding: "40vh" }}
        show={showModal}
        onHide={handleClose}
      >
        <Modal.Header>
          <Modal.Title>Edit car</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row style={{ padding: "20px" }}>
              <Col>
                <Form.Label>Make</Form.Label>
                {/* Calls makeHandler */}
                <Form.Control onChange={makeHandler} placeholder={make} />
              </Col>
              <Col>
                <Form.Label>Model</Form.Label>
                {/* Calls modelHandler */}
                <Form.Select size="lg" onChange={modelHandler} value={model}>
                  {/* Maps through a list of years */}
                  {Years.map((year) => (
                    <option value={year} key={year}>
                      {year}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
            <Row style={{ padding: "20px" }}>
              <Col>
                {/* Calls registrationHandler */}
                <Form.Label>Registration</Form.Label>
                <Form.Control
                  placeholder={registration}
                  onChange={registrationHandler}
                />
              </Col>
              <Col>
                {/* Calls ownerHandler */}
                <Form.Label>Owner</Form.Label>
                <Form.Control placeholder={owner} onChange={ownerHandler} />
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {/* Cancels the editing by closing the modal */}
          <Button
            variant="secondary"
            data-dismiss="modal"
            onClick={handleClose}
          >
            Cancel
          </Button>
          {/* Calls editHandler to save the new information*/}
          <Button variant="success" onClick={editHandler} data-dismiss="modal">
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditCar;
