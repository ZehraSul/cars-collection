import React from "react";
import Button from "react-bootstrap/Button";

function DeleteCar({ id, carsList, setCarsList }) {
  // Call API with the id of the document to delete
  const deleteHandler = () => {
    fetch("http://localhost:8000/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((res) => res.json())
      .then((res) => {
        // update state of the carsList to refresh the table with the deleted document removed
        setCarsList([...carsList.filter((c) => c._id !== id)]);
      })
      .catch((error) => console.log(error));
  };
  return (
    <Button
      type="submit"
      variant="danger"
      className="my-1"
      onClick={deleteHandler}
    >
      {/*Button for each document in the table. When button is clicked deleteHandler called */}
      Delete
    </Button>
  );
}

export default DeleteCar;
