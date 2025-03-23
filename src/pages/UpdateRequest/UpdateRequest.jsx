
import { useState } from "react";
import { Container, Row, Col, Form, Modal, Button, Card } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { AddBtn } from "../../components/customComponents/Addbtn";
import useMedicineForm from "../../customHooks/RequestMedicine";  
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDecoded } from "../../customHooks/useDecode";

export const UpdateRequest = () => {
  // Provide default empty object if state is undefined
  const { state = {} } = useLocation();
  const { id } = useParams();
  // Fallback: if request_id is not provided via state, try to use the id from the URL
  const { request_id = id, url } = state; 
  const navigate = useNavigate();
  const decodedToken = useDecoded();

  // Check if essential data is available
  if (!request_id || !url) {
    return <div>Error: Missing required update information.</div>;
  }
  
  const req_Url = "http://localhost:7777/request";
  const order_Url = "http://localhost:7777/orders";
  
  const {
    formData,
    errors,
    handleChange,
    handleUpload,
    handleDrop,
    validateForm,
    setFormData,
  } = useMedicineForm();  

  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const requestData = {
        req_name: formData.name,
        requested: true,
        req_description: formData.description,
        user_id: decodedToken.id,
        prescription_img: formData.image,
      };
      try {
        const endpoint =
          url === req_Url
            ? `http://localhost:7777/request/${request_id}`
            : `http://localhost:7777/orders/${request_id}`;

        const response = await fetch(endpoint, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Something went wrong!");
        }

        setShowModal(true);
        setFormData({
          name: "",
          description: "",
          image: null,
        });
        setTimeout(() => {
          navigate("/need");
        }, 2000);
      } catch (error) {
        console.error("Submit error:", error);
      }
    }
  };

  return (
    <>
      <Container style={{ marginTop: "50px" }}>
        <Card className="shadow-sm" style={{ padding: "25px 20px", margin: "50px 0px" }}>
          <h3 className="text-center mb-4">Request Medicine</h3>
          <Row>
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
                    src={
                      typeof formData.image === "string"
                        ? formData.image
                        : URL.createObjectURL(formData.image)
                    }
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
                  onChange={handleUpload}
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
                    style={{ backgroundColor: request_id ? "#f8f9fa" : "#fff" }}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description:</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    style={{ backgroundColor: "#ffffff" }}
                    isInvalid={!!errors.description}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description}
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="mt-4 d-flex justify-content-end w-25 ms-auto">
                  <AddBtn style={{ backgroundColor: "var(--main-color)" }} type="submit">
                    {request_id ? "Update Request" : "Add Request"}
                  </AddBtn>
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
        <Modal.Body>
          {request_id
            ? "Request updated successfully!"
            : "Request added successfully!"}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button> 
        </Modal.Footer>
      </Modal>
    </>
  );
};
