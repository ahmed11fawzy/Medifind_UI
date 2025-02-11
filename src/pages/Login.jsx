import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission
      console.log('Form submitted successfully');
      // You can add your API call or further logic here
    } else {
      console.log('Form has errors');
    }
  };

  return (
    <div className='vh-100 d-flex justify-content-center align-items-center bg-light'>
      <div className='p-4 bg-white rounded shadow-sm' style={{ maxWidth: '400px', width: '100%' }}>
        <h1 className='text-center mb-4'>Log In</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter Your Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Enter Your Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <div className='d-flex justify-content-between align-items-center mb-3'>
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember Me" />
            </Form.Group>
            <span className='text-primary' style={{ cursor: 'pointer' }}>Forget Password?</span>
          </div>

          <Button 
            type="submit" 
            className="w-100" 
            style={{ 
              backgroundColor: "#00796b", 
              border: "none", 
              borderRadius: "5px", 
              padding: '10px' 
            }}
          >
            Log In
          </Button>
        </Form>
      </div>
    </div>
  );
}