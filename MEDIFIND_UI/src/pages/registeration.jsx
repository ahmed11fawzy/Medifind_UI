import React from "react";
import { Container, Card, Form, Button } from "react-bootstrap";


export  function Registeration() {
  return (
    <>
        <Container className="d-flex justify-content-center align-items-center vh-100" >

      <Card style={{ width: "400px", borderRadius: "10px" }} className="p-4">
        <h3 className="text-center mb-4">Registration</h3>

        <Form>
           <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Enter your name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" className="form-control"/></Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Enter your email</Form.Label>
            <Form.Control type="email"placeholder="Enter your email" className="form-control" /></Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Enter your Password</Form.Label>
            <Form.Control type="password" placeholder="Enter your Password" className="form-control" /></Form.Group>

          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Confirm your password</Form.Label>
            <Form.Control type="password" placeholder="Confirm your password" className="form-control" /> </Form.Group>

          <div className="text-center">
            <Button type="submit"className="w-100" style={{backgroundColor: "#00796b",border: "none",borderRadius: "5px", }}>
              Submit
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
    </>
  )
}
