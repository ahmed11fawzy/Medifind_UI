
import { Navbar, Container, Nav, Spinner, Button } from "react-bootstrap";
import { useNavigate, NavLink } from "react-router-dom";
import logo from "../../assets/loge.jpeg";
import { useFetch } from "../../customHooks/useFetch";
import { useDecoded } from "../../customHooks/useDecode";
import "../../styles/navstyle.css";
import "../../styles/sidebar.css";

export const NavBar = () => {
  const navigate = useNavigate();
  const { data: users, isLoading, serverError } = useFetch("http://localhost:7777/users");
  const decodedToken = useDecoded();
  const loggedInUserId = decodedToken?.id;
  const usersArray = Array.isArray(users) ? users : users?.users || [];
  const loggedInUser = usersArray.find(user => user._id === loggedInUserId);
  const userInitial = loggedInUser?.name ? loggedInUser.name.charAt(0).toUpperCase() : "?";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        {/* Logo */}
        <Navbar.Brand
          onClick={() => navigate("/")}
          className="d-flex align-items-center text-brand"
          style={{ cursor: "pointer", color: "var(--main-color)" }}
        >
          <img
            src={logo}
            alt="MediFind Logo"
            width="60"
            height="40"
            className="me-3 rounded-circle"
          />
          MediFind
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          {decodedToken?.role == 'user' && <Nav className="sidebar mx-auto">
            <NavLink to="/home" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Home
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Profile
            </NavLink>
            <NavLink to="/AddMedicine" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Add Medicine
            </NavLink>
            <NavLink to="/RequestMedicine" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Request Medicine
            </NavLink>
            <NavLink to="/need" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Needs
            </NavLink>
            <NavLink to="/donate" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Donation
            </NavLink>
          </Nav>}


          {decodedToken?.role == 'doctor' && <Nav className="ms-auto review ">
            <NavLink to="/home" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Home
            </NavLink>
            <NavLink to="/RequestsReview" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Request
            </NavLink>
            <NavLink to="/offersReview" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Donate
            </NavLink>
          </Nav>}



          {/* User Icon */}
          <div
            className="user-icon ms-3 d-flex align-items-center justify-content-center"
            onClick={() => navigate("/profile")}
          >
            {isLoading ? <Spinner animation="border" size="sm" /> : serverError ? "!" : userInitial}
          </div>

          {/* Logout Button */}
          <div className="logout">
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
