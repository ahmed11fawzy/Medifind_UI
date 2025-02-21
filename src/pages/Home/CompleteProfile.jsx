import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AddBtn } from "../../components/customComponents/Addbtn";

export const CompleteProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    idNumber: "",
    phoneNumber: "",
    city: "",
    street: "",
    name: "Your Name",
    email: "yourname@gmail.com",
    profileImage: "https://via.placeholder.com/100"
  });

  const [errors, setErrors] = useState({});
  const cities = ["Cairo", "Alexandria", "Giza", "Shubra El Kheima", "Port Said", "Suez", "Luxor", "Asyut", "Mansoura", "Tanta"];

  const validate = () => {
    let tempErrors = {};
    if (!/^[0-9]{14}$/.test(formData.idNumber)) {
      tempErrors.idNumber = "ID Number must be exactly 14 digits";
    }
    if (!/^01[0-2,5]{1}[0-9]{8}$/.test(formData.phoneNumber)) {
      tempErrors.phoneNumber = "Phone Number must be a valid Egyptian number";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setFormData({
        idNumber: "",
        phoneNumber: "",
        city: "",
        street: "",
        name: "",
        email: "",
        profileImage: "https://via.placeholder.com/100"
      });
      navigate("/");
    }
  };

  return (
    <div className="container" style={{ maxWidth: "900px", marginTop: "80px", padding: "40px", backgroundColor: "#ffffff", borderRadius: "10px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
      {/* Profile Image Section */}
      <div className="d-flex mb-3">
        <div className="position-relative d-inline-block" style={{ width: 80, height: 80, border: "1px solid #ccc", borderRadius: "100%" }}>
          <img src={formData.profileImage} alt="Profile" className="rounded-circle img-fluid" />
          <label className="position-absolute bottom-0 end-0 bg-light p-1 rounded-circle border" style={{ cursor: "pointer" }}>
            <i className="bi bi-pencil"></i>
            <input type="file" hidden onChange={handleImageChange} />
          </label>
        </div>
        <div>
          <h5 className="mt-2"><input type="text" name="name" value={formData.name} onChange={handleChange} className="border-0 text-center w-75" /></h5>
          <p className="text-muted"><input type="email" name="email" value={formData.email} onChange={handleChange} className="border-0 text-center w-75" /></p>
        </div>
      </div>
      <hr />
      {/* Form Section */}
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label>ID Number:</Form.Label>
              <Form.Control type="text" name="idNumber" value={formData.idNumber} onChange={handleChange} isInvalid={!!errors.idNumber} />
              <Form.Control.Feedback type="invalid">{errors.idNumber}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Phone Number:</Form.Label>
              <Form.Control type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} isInvalid={!!errors.phoneNumber} />
              <Form.Control.Feedback type="invalid">{errors.phoneNumber}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label>City:</Form.Label>
              <Form.Control as="select" name="city" value={formData.city} onChange={handleChange}>
                <option value="">Select a city</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Street:</Form.Label>
              <Form.Control type="text" name="street" value={formData.street} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>

        <div className="text-center d-flex justify-content-end w-50 ms-auto">
          <AddBtn className="w-75" type="submit">Update</AddBtn>
        </div>
      </Form>
    </div>
  );
};
