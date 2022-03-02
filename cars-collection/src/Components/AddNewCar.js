import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Years from "./Years";
import { CARS_COLLECTION_URL } from "../config/config";
import "../css/AddNewCar.css";

function AddNewCar({
  carsList,
  setCarsList,
  model,
  setModel,
  make,
  setMake,
  registration,
  setRegistration,
  owner,
  setOwner,
}) {
  // Set initial state for modal
  const [showModal, setShowModal] = useState(false);

  // handles closing the modal when either the "cancel" button or the "add" button is clicked
  const handleClose = () => {
    setShowModal(false);
  };

  // handles displaying the modal when the button is clicked
  const handleShow = () => {
    setShowModal(true);
  };

  // handleAddNewCar is called when the "Add a car" button is clicked
  const handleAddNewCar = () => {
    // Trimming away the spaces from the user input
    if (
      make.trim() !== "" &&
      registration.trim() !== "" &&
      owner.trim() !== ""
    ) {
      // If the values are not empty strings the API call is made to create a new car entry
      fetch(`${CARS_COLLECTION_URL}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Passing in the values from the "add a car" modal form
        body: JSON.stringify({
          make: make,
          model: Number(model),
          registration: registration,
          owner: owner,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          setCarsList([...carsList, res]);
          // Reset the state for the next input
          setShowModal(false);
          setMake("");
          setModel(2022);
          setRegistration("");
          setOwner("");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // if any of the fields were empty display an alert with a error
      alert("ERROR: Invalid input. Please complete the form");
    }
  };

  // Function is called when the value in the make input field is changed
  const makeHandler = (e) => {
    // stop page from reloading
    e.preventDefault();
    // set the value of "make" to the value in the input field
    setMake(e.target.value);
  };

  // Same as makeHandler but for the model field
  const modelHandler = (e) => {
    e.preventDefault();
    setModel(e.target.value);
  };

  // Same as makeHandler but for the registration field
  const registrationHandler = (e) => {
    e.preventDefault();
    setRegistration(e.target.value);
  };

  // Same as makeHandler but for the owner field
  const ownerHandler = (e) => {
    e.preventDefault();
    setOwner(e.target.value);
  };

  return (
    <div>
      {/* Add a car button */}
      <Button
        variant="success"
        data-toggle="modal"
        data-target="#addCar"
        onClick={handleShow}
      >
        Add a car
      </Button>
      {/* Modal that pops up on "Add a car" button click containing form for adding a car */}
      <Modal
        id="addCar"
        style={{ opacity: "1", padding: "40vh" }}
        show={showModal}
        onHide={handleClose}
      >
        <Modal.Header>
          <Modal.Title>Add a car</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row style={{ padding: "20px" }}>
              <Col>
                {/* Calls makeHandler */}
                <Form.Control onChange={makeHandler} placeholder="Make" />
              </Col>
              <Col>
                {/* Calls modelHandler */}
                <Form.Select
                  size="lg"
                  onChange={modelHandler}
                  placeholder="Model"
                >
                  {/* Maps through a list of years */}
                  {Years.map((year) => (
                    <option key={year}>{year}</option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
            <Row style={{ padding: "20px" }}>
              <Col>
                {/* Calls registrationHandler */}
                <Form.Control
                  onChange={registrationHandler}
                  placeholder="Registration"
                />
              </Col>
              <Col>
                {/* Calls ownerHandler */}
                <Form.Control onChange={ownerHandler} placeholder="Owner" />
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
          <Button
            variant="success"
            onClick={handleAddNewCar}
            data-dismiss="modal"
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddNewCar;
