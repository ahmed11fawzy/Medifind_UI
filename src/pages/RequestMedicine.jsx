import { useState } from "react";
import { Container, Row, Col, Form, Modal, Button, Card } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { NavBar } from "../components/sharedComponents/MyNavbar";
import { Footer } from "../components/sharedComponents/MyFooter";
import { AddBtn } from "../components/customComponents/Addbtn";
import useMedicineForm from "../customHooks/RequestMedicine";  

export const RequestMedicine = () => {
  const {
    formData,
    errors,
    handleChange,
    handleImageUpload,
    handleDrop,
    validateForm,
    setFormData,
  } = useMedicineForm();  

  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validateForm()) {

      
      try {
        const response = await fetch("http://localhost:7777/request", {  // Add API endpoint here
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
      
        req_name: formData.name,
        req_description: formData.description,
        // prescription_img: { type: 'string' },
        // status: { type: 'boolean' },
        // req_date: { type: 'string' },
        // doctor_id: { type: 'string' },
        // user_id: { type: 'string' },
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
      setFormData({
        name: "",
        description: "",
        image: null,
      });
    }
          
   catch (error) {
    console.log(error.message);
}

}

}
  

  return (
    <>
      <Container style={{ marginTop: "150px"}} >
        <Card className="shadow-sm " style={{padding:"25px 20px",margin:"50px 0px"}} >
          <h3 className="text-center mb-4">Request Medicine</h3>
          <Row className="align-items-center">
            <Col md={3} className="d-flex justify-content-center">
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => document.getElementById("fileInput").click()}
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  backgroundColor: "#EAEAEA",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "40px",
                  color: "#666",
                  cursor: "pointer",
                  overflow: "hidden",
                  border: errors.image ? "2px solid red" : "none",
                }}
              >
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <FaPlus />
                )}
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  onChange={handleImageUpload}
                  hidden
                />
              </div>
              {errors.image && <p className="text-danger mt-2">{errors.image}</p>}
            </Col>

            <Col md={9}>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    style={{ backgroundColor: "#fff" }}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description:</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    style={{ backgroundColor: "#fff" }}
                    isInvalid={!!errors.description}
                  />
                  <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                </Form.Group>

                <div className="mt-4 d-flex justify-content-end">
                  <AddBtn type="submit">Add Medicine</AddBtn>
                </div>
              </Form>
            </Col>
          </Row>
        </Card>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Medicine added successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
