import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AddBtn } from '../components/customComponents/Addbtn';

export function Login() {
  const mailRegex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
  const pwdRegex = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$";
  
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!RegExp(mailRegex).test(email)) {
      newErrors.email = 'Email address is invalid';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (!RegExp(pwdRegex).test(password)) {
      newErrors.password = 'Password must be at least 8 characters, including a letter, a number, and a special character.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:7777/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setErrors({ form: errorData.message || "Invalid email or password" });
          throw new Error("Something went wrong!");
        }

        await response.json();
        const token = response.headers.get('x-auth-token');
        
        // Store token and trigger storage event
        localStorage.setItem('token', token);
        window.dispatchEvent(new Event('storage'));

        // Navigate after a small delay to ensure state updates
        setTimeout(() => {
          navigate("/home");
        }, 100);

      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="p-4 bg-white rounded shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <h1 className="text-center mb-4">Log In</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter Your Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!errors.email}
              disabled={isLoading}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Enter Your Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!!errors.password}
              disabled={isLoading}
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember Me" disabled={isLoading} />
            </Form.Group>
            <span className="text-primary text-info" style={{ cursor: 'pointer' }}>Forget Password?</span>
          </div>

          <AddBtn type="submit" className="w-100" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Log In'}
          </AddBtn>
        </Form>

        {errors.form && <p className="text-danger p-2 mt-3 text-center fs-4">{errors.form}</p>}
      </div>
    </div>
  );
}
