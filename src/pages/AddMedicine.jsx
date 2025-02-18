import React, { useState } from "react";
import { Container, Card, Form, Modal, Button } from "react-bootstrap";
import { NavBar } from "../components/sharedComponents/MyNavbar";
import { Footer } from "../components/sharedComponents/MyFooter";
import { AddBtn } from "../components/customComponents/Addbtn";
import {useAddMedicineForm} from "../customHooks/AddMedicine";  

export const AddMedicine = () => {
  const {
    medicineName,
    numPieces,
    expireDate,
    concentration,
    // image,
    errors,
    setMedicineName,
    setNumPieces,
    setExpireDate,
    setConcentration,
    setImage,
    validateForm,
  } = useAddMedicineForm();  

  const [showModal, setShowModal] = useState(false);
 

  
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validateForm()) {

      try {
        const response = await fetch("http://localhost:7777/medicine", {  // Add API endpoint here
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
      
            name: medicineName,
            quantity:  Number(numPieces),
            concentration: concentration,
            expire_date:expireDate,
            //  user_id: { type: 'string' },
          }),
        });
        console.log('req sent')
    
        if (!response.ok) {
          throw new Error(data.message || "Something went wrong!");
          console.log('resp not ok')
        }
    
        const data = await response.json();
        console.log(data)
        setShowModal(true);
        setMedicineName("");
        setNumPieces("");
        setExpireDate("");
        setConcentration("");
        setImage(null);
        document.getElementById("imageInput").value = "";
     
        
    } catch (error) {
        console.log(error.message);
    }
    
  }
   
    }

  return (
    <>
      <Container style={{ marginTop: "50px" }}>
        <Card className="p-4 shadow-sm">
          <h3 className="text-center mb-4">Add Medicine</h3>
          <Form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12 col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Medicine Name:</Form.Label>
                  <Form.Control
                    type="text"
                    value={medicineName}
                    onChange={(e) => setMedicineName(e.target.value)}
                    isInvalid={!!errors.medicineName}
                  />
                  <Form.Control.Feedback type="invalid">{errors.medicineName}</Form.Control.Feedback>
                </Form.Group>
              </div>

              <div className="col-12 col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Number of Pieces:</Form.Label>
                  <Form.Control
                    type="text"
                    value={numPieces}
                    onChange={(e) => setNumPieces(e.target.value)}
                    isInvalid={!!errors.numPieces}
                  />
                  <Form.Control.Feedback type="invalid">{errors.numPieces}</Form.Control.Feedback>
                </Form.Group>
              </div>

              <div className="col-12 col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Expire Date:</Form.Label>
                  <Form.Control
                    type="date"
                    value={expireDate}
                    onChange={(e) => setExpireDate(e.target.value)}
                    isInvalid={!!errors.expireDate}
                  />
                  <Form.Control.Feedback type="invalid">{errors.expireDate}</Form.Control.Feedback>
                </Form.Group>
              </div>

              <div className="col-12 col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Concentration:</Form.Label>
                  <Form.Control
                    type="text"
                    value={concentration}
                    onChange={(e) => setConcentration(e.target.value)}
                    isInvalid={!!errors.concentration}
                  />
                  <Form.Control.Feedback type="invalid">{errors.concentration}</Form.Control.Feedback>
                </Form.Group>
              </div>

              <div className="col-12">
                <Form.Group className="mb-3">
                  <Form.Label>Add Image:</Form.Label>
                  <Form.Control
                    id="imageInput"
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    isInvalid={!!errors.image}
                  />
                  <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
                </Form.Group>
              </div>
            </div>
            
             <div className="text-center d-flex justify-content-end w-25 ms-auto">
              <AddBtn type="submit">Add</AddBtn>
            </div>
          </Form>
        </Card>
      </Container>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>The request has been uploaded successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
