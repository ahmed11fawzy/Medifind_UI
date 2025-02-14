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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShowModal(true);
      setFormData({
        name: "",
        description: "",
        image: null,
      });
    }
  };

  return (
    <>
      <Container style={{ marginTop: "80px" }}>
        <Card className="shadow-sm" style={{ padding: "30px 40px 40px 0px" }}>
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
