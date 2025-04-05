import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaEnvelope, FaHeartbeat } from 'react-icons/fa';
import './Login.css';

export function Login() {
  const mailRegex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
  const pwdRegex = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$";
  
  const navigate = useNavigate();
  const goToHome = () => navigate("/home");

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

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
      try {
        setIsLoading(true);
        const response = await fetch("https://medifind-production.up.railway.app/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setErrors({ form: errorData.message || "Invalid email or password" });
          throw new Error("Something went wrong!");
        }

        const data = await response.json();
        const token = response.headers.get('x-auth-token');
        localStorage.setItem('token', token);
        
        console.log(data);
        goToHome();
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="login-container">
      {/* 3D Animated Objects */}
      <div className="scene">
        <div 
          className="floating-shape shape1" 
          style={{ 
            transform: `translate3d(${mousePosition.x * 30}px, ${mousePosition.y * 30}px, 0)` 
          }}
        ></div>
        <div 
          className="floating-shape shape2" 
          style={{ 
            transform: `translate3d(${mousePosition.x * -20}px, ${mousePosition.y * -20}px, 0)` 
          }}
        ></div>
        <div 
          className="floating-shape shape3" 
          style={{ 
            transform: `translate3d(${mousePosition.x * 15}px, ${mousePosition.y * 15}px, 0)` 
          }}
        ></div>
        <div className="pulse-circle"></div>
      </div>

      {/* Logo & Branding */}
      <div 
        className="brand-container"
        style={{ 
          transform: `translate3d(${mousePosition.x * -10}px, ${mousePosition.y * -10}px, 0)` 
        }}
      >
        <div className="brand-logo">
          <div className="heartbeat-icon">
            <FaHeartbeat />
          </div>
          <h1>MediFind</h1>
        </div>
        <p className="brand-tagline">Your Healthcare Companion</p>
      </div>

      {/* Login Card */}
      <div 
        className="login-content"
        style={{ 
          transform: `translate3d(${mousePosition.x * 10}px, ${mousePosition.y * 10}px, 0)` 
        }}
      >
        <div className="login-card">
          <div className="login-heading">
            <h2>Welcome</h2>
            <div className="login-pill">
              <span className="active">Login</span>
              <span>Register</span>
            </div>
          </div>

          <Form onSubmit={handleSubmit}>
            <div className="form-floating-label">
              <Form.Group className="input-group">
                <div className="input-icon">
                  <FaEnvelope />
                </div>
                <Form.Control
                  type="email"
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isInvalid={!!errors.email}
                />
                <Form.Label>Email Address</Form.Label>
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>
            </div>

            <div className="form-floating-label">
              <Form.Group className="input-group">
                <div className="input-icon">
                  <FaLock />
                </div>
                <Form.Control
                  type="password"
                  placeholder=" "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isInvalid={!!errors.password}
                />
                <Form.Label>Password</Form.Label>
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              </Form.Group>
            </div>

            <div className="form-options">
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember me" />
              </Form.Group>
              <a href="#" className="forgot-link">Forgot Password?</a>
            </div>

            <div className="form-submit">
              <button 
                type="submit" 
                className="login-button" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="spinner"></span>
                ) : (
                  <>Sign In<span className="btn-arrow">→</span></>
                )}
              </button>
            </div>

            {errors.form && (
              <div className="error-message">
                {errors.form}
              </div>
            )}
          </Form>

          <div className="login-footer">
            <p>Don&apos;t have an account? <a href="#">Create Account</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
