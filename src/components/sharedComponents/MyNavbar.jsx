
import { Navbar, Nav, Container, Dropdown, Form, InputGroup } from "react-bootstrap";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom"; 
import logo from "../../assets/loge.jpeg";

export const NavBar = () => {
  const navigate = useNavigate(); 

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand onClick={() => navigate("/")} className="d-flex align-items-center me-auto text-brand" style={{ cursor: "pointer" , color: "var(--main-color)"}}>
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

            <Dropdown className="ms-auto">
              <Dropdown.Toggle style={{ backgroundColor: "#1E9694", border: "none" }}>Add</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate("/request-medicine")}>Request Medicine</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate("/add-medicine")}>Add Medicine</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
