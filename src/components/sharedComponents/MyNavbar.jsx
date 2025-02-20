import { Navbar, Nav, Container, Form, InputGroup, Spinner } from "react-bootstrap";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom"; 
import logo from "../../assets/loge.jpeg";
import { Styledbtn } from "../customComponents/Styledbtn";
import { useState } from "react";
import { useFetch } from "../../customHooks/useFetch"; 
import "../../styles/navstyle.css";

export const NavBar = () => {
  const navigate = useNavigate(); 
  const [open, setOpen] = useState(false);

  const { data: user, isLoading, serverError } = useFetch("http://localhost:7777/user/:id"); // ضع رابط API الصحيح هنا
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "U"; 

  const handleNavigation = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm ">
      <Container>
        <Navbar.Brand 
          onClick={() => navigate("/")} 
          className="d-flex align-items-center me-auto text-brand" 
          style={{ cursor: "pointer", color: "var(--main-color)" }}
        >
          <img
            src={logo}
            alt="MediFind Logo"
            width="60"
            height="40"
            className="me-4 rounded-circle"
          />
          MediFind
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100 d-flex align-items-center">
            <Form className="d-flex mx-auto w-50">
              <InputGroup>
                <Form.Control type="text" placeholder="Search" style={{ backgroundColor: "#fff", border: "none" }} />
                <InputGroup.Text style={{ backgroundColor: "#fff", border: "none" }}>
                  <IoSearchOutline style={{ color: "#7d7f7f", fontSize: "1.5rem" }} />
                </InputGroup.Text>
              </InputGroup>
            </Form>

            <div className="App d-flex align-items-center">
              <Styledbtn onClick={() => setOpen(!open)}>Add🤝</Styledbtn>
              <ul className={open ? "show" : ""}>
                <li onClick={() => handleNavigation("/AddMedicine")}>Add Medicine</li>
                <li onClick={() => handleNavigation("/RequestMedicine")}>Request Medicine</li>
              </ul>
              <div 
                className="user-icon ms-3 d-flex align-items-center justify-content-center" 
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#007bff0",
                  color: "#0e0d0d",
                  borderRadius: "50%",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  cursor: "pointer"
                }}
                onClick={() => navigate("/profile")}
              >
                {isLoading ? <Spinner animation="border" size="sm" /> : serverError ? "!" : userInitial}
              </div>

            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
