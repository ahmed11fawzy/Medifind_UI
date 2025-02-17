
import { Navbar, Nav, Container, Dropdown, Form, InputGroup } from "react-bootstrap";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom"; 
import logo from "../../assets/loge.jpeg";
import { Styledbtn } from "../customComponents/Styledbtn";
import { useState } from "react";

export const NavBar = () => {
  const navigate = useNavigate(); 
  const [open, setOpen] = useState(false);
  const items = ["Add Medicine", "Request Medicine"];

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand onClick={() => navigate("/")} className="fw-bold  d-flex align-items-center me-auto" style={{ cursor: "pointer" , color: "#1E9694"}}>
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


            <div className="App">
      <Styledbtn onClick={() => setOpen(!open)}>Add🤝</Styledbtn>
      <ul style={{ overflow: "hidden", transition: "height 0.3s", height: open ? "50px" : "0px" }}>
      <li onClick={() => navigate("/AddMedicine")} style={{ cursor: "pointer" }}>Add Medicine</li>
      <li onClick={() => navigate("/RequestMedicine")} style={{ cursor: "pointer" }}>Request Medicine</li>
          {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
          </ul>
         </div>

            {/* <Dropdown className="ms-auto">
              <Dropdown.Toggle style={{ backgroundColor: "#1E9694", border: "none" }}>Add</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate("/requestMedicine")}>Request Medicine</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate("/addMedicine")}>Add Medicine</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
