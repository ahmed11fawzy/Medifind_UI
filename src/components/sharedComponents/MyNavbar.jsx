
import { Navbar, Container, Nav, Spinner, Button } from "react-bootstrap";
import { useNavigate, NavLink } from "react-router-dom";
import logo from "../../assets/medi3.png";
import { useFetch } from "../../customHooks/useFetch";
import { useDecoded } from "../../customHooks/useDecode";
import "../../styles/navstyle.css";
import "../../styles/sidebar.css";

export const NavBar = () => {
  const navigate = useNavigate();
  const { data: users, isLoading, serverError } = useFetch("https://medifind-production.up.railway.app/users");
  const decodedToken = useDecoded();
  const loggedInUserId = decodedToken?.id;
  const usersArray = Array.isArray(users) ? users : users?.users || [];
  const loggedInUser = usersArray.find((user) => user._id === loggedInUserId);
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
          
          className=""
          style={{ cursor: "pointer", width: "100px", height: "70px" }}
        >
          <img src={logo} alt="Logo" className="w-100  " />
          
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {decodedToken?.role === 'user' && (
            <Nav className="sidebar mx-auto">
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
                Orders
              </NavLink>
              <NavLink to="/donate" className={({ isActive }) => (isActive ? "active-link" : "")}>
                Donation
              </NavLink>
            </Nav>
          )}

          {decodedToken?.role === 'doctor' && (
            <Nav className="ms-auto review">
              <NavLink to="/home" className={({ isActive }) => (isActive ? "active-link" : "")}>
                Home
              </NavLink>
              <NavLink to="/RequestsReview" className={({ isActive }) => (isActive ? "active-link" : "")}>
                Requests
              </NavLink>
              <NavLink to="/OffersReview" className={({ isActive }) => (isActive ? "active-link" : "")}>
                Offers
              </NavLink>
            </Nav>
          )}

          {/* User Icon */}
          <div
            className="user-icon ms-3 d-flex align-items-center justify-content-center"
            onClick={() => navigate("/profile")}
          >
            {isLoading ? <Spinner animation="border" size="sm" /> : serverError ? "!" : userInitial}
          </div>

          {/* Logout Button */}
          <div className="logout">
            <Button className="" onClick={handleLogout}>Logout</Button >
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
