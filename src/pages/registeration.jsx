import React from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { AddBtn } from "../Custom/Addbtn";


export  function Registeration() {
  return (
    <>
        <Container className="d-flex justify-content-center align-items-center vh-100" >

      <Card style={{ backgroundColor: "#d6d2d2", maxWidth: "100%", width: "400px", borderRadius: "10px" }} className="p-4 w-md-75 w-lg-50 w-xs-25">
        <h3 className="text-center mb-4 fw-bold">Registration</h3>

        <Form>
           <Form.Group className="mb-3" controlId="formName">
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" className="form-control"/></Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email"placeholder="Enter your email" className="form-control" /></Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter your Password" className="form-control" /></Form.Group>

          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control type="password" placeholder="Confirm your password" className="form-control" /> </Form.Group>
            <br/>
          <div className="text-center d-flex justify-content-end">
            <AddBtn type="submit">
              Sign Up
            </AddBtn>
          </div>
          <br/>
        </Form>
      </Card>
    </Container>
    </>
  )
}
