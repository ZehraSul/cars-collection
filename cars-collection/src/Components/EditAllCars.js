import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Years from "./Years";
import { CARS_COLLECTION_URL } from "./config/config";

function EditAllCars({ carsList, setCarsList }) {
  // set the initial state of the modals
  const [show, setShow] = useState(false);
  const [field, setfield] = useState("make");
  const [updateText, setUpdateText] = useState("");

  // fieldHandler is called when the dropdown in the Edit all modal is changed
  const fieldHandler = (e) => {
    // set the value of "field" to the value in the input field
    setfield(e.target.value);
    // if the value of field is "model" then also update the state of model
    if (e.target.value === "model") {
      setUpdateText(2022);
    }
  };

  // updatedInfo is called when the input field in the Edit all modal is changed
  const updatedInfo = (e) => {
    // set the value of "updatedInfo" to the value in the input field
    setUpdateText(e.target.value);
  };

  // handles closing the modal when either the "cancel" button or the "edit all" button is clicked
  const handleClose = () => {
    setShow(false);
  };

  // handles displaying the modal when the button is clicked
  const handleShow = () => {
    setShow(true);
  };
  /* handleEditAllCars is called when the "Edit all" button is clicked */
  const handleEditAllCars = () => {
    // Trimming away the spaces from the user input
    if (updateText.trim() !== "") {
      // If the values are not empty strings the API call is made to update
      fetch(`${CARS_COLLECTION_URL}/updateAll`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        // Passing in the values from the edit all modal form
        body: JSON.stringify({ field: field, updateText: updateText }),
      })
        .then((res) => res.json())
        .then((res) => {
          carsList.forEach((c) => (c[field] = updateText));
          setCarsList([...carsList]);
          setShow(false);
        })
        .catch((error) => console.log(error));
    } else {
      // if the input field was empty display an alert with a error
      alert("ERROR: Invalid input");
    }
  };
  return (
    <div>
      <Button
        variant="success"
        data-toggle="modal"
        data-target="#addCar"
        onClick={handleShow}
      >
        Edit all cars
      </Button>
      <Modal
        id="addCar"
        style={{ opacity: "1", padding: "40vh" }}
        show={show}
        onHide={handleClose}
      >
        <Modal.Header>
          <Modal.Title>Edit all cars</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row style={{ padding: "20px" }}>
              <Col>
                <Form.Label>Select field to update</Form.Label>
                <Form.Select size="lg" onChange={fieldHandler}>
                  <option value="make">Make</option>
                  <option value="model">Model</option>
                  <option value="registration">Registration</option>
                  <option value="owner">Owner</option>
                </Form.Select>
              </Col>
            </Row>
            <Row style={{ padding: "20px" }}>
              <Col>
                <Form.Label>Enter new information</Form.Label>
                {field === "model" && (
                  <Form.Select
                    size="lg"
                    onChange={updatedInfo}
                    placeholder="Model"
                  >
                    {Years.map((year) => (
                      <option key={year}>{year}</option>
                    ))}
                  </Form.Select>
                )}
                {field !== "model" && (
                  <Form.Control
                    placeholder="New info"
                    onChange={updatedInfo}
                  ></Form.Control>
                )}
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            data-dismiss="modal"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            onClick={handleEditAllCars}
            data-dismiss="modal"
          >
            Edit All
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditAllCars;
