import { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AddBtn } from "../components/customComponents/Addbtn";
import styles from "./signup/signup.module.css";
import loge from "../assets/loge.jpeg";

export function Login() {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/home");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:7777/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          setErrors({ form: errorData.message || "Invalid email or password" });
          throw new Error("Something went wrong!");
        }
        const data = await response.json();
        const token = await response.headers.get("x-auth-token");
        localStorage.setItem("token", token);

        console.log(data);
        goToHome();
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="vh-100 bg-white d-flex flex-column">
      <header className="text-center pt-3">
        <h1 className={`${styles.title} text-center`}>
          Medi{" "}
          <span>
            <img
              src={loge}
              alt="Logo"
              style={{ width: "50px", height: "50px" }}
              className="img-fluid rounded-circle"
            />
          </span>{" "}
          find
        </h1>
        <h5 className={`${styles.slogan} mx-auto w-50 text-center`}>
          Join the Fight:
        </h5>
      </header>

      {/* Login Section */}
      <div className="flex-grow-1 d-flex align-items-center justify-content-center " style={{lineHeight:"2"}}>
        <div className="container" style={{marginBottom:"150px"}}>
          <div className="row justify-content-end align-items-center">
            {/* login section*/}
            <div className="col-12 col-md-5">
              <div className="p-4 bg-white" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center mb-3">
                   Welcome
                   </h2>
                   
                
                <Form>
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

                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Form.Group controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="Remember Me" />
                    </Form.Group>
                    <span className="text-primary text-info" style={{ cursor: "pointer" }}>
                      Forget Password?
                    </span>
                  </div>
                  <div >
                  <AddBtn type="submit" onClick={handleSubmit}className="w-50 me-auto" >
                    Log In
                  </AddBtn>
                  </div>
                </Form>
              </div>
            </div>

            {/* text section*/}
            <div className="col-12 col-md-6 text-start mt-4 mt-md-0 h-75" >
              <h2 className="text-info"style={{fontFamily: "Inter, serif"}} >Join Us in Spreading Health & Hope!</h2>
              <p className="w-75 text-center p-3" style={{fontFamily: "Inter, serif", lineHeight:"1.8", wordSpacing:"3px"}} >
              
Your support can make a difference! Every login brings us one step closer to providing essential medicines to those in need. Together, we can create a healthier, brighter future for underserved communities. Sign in now and be a part of the change!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
