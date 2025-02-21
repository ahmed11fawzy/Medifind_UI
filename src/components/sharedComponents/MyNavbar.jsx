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

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0" />
        <Navbar.Collapse id="basic-navbar-nav">
  
           <Nav className="sidebar ms-auto">
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
          </Nav>
           

                {/* <Nav className="ms-auto review ">
                <NavLink to="/home" className={({ isActive }) => (isActive ? "active-link" : "")}>
                 Home
              </NavLink>
              <NavLink to="/offersReview" className={({ isActive }) => (isActive ? "active-link" : "")}>
                 Request
            </NavLink>
           <NavLink to="/donateReview" className={({ isActive }) => (isActive ? "active-link" : "")}>
                Donate
             </NavLink>
            </Nav> */}
       
          <div
            className="user-icon ms-3 d-flex align-items-center justify-content-center"
            onClick={() => navigate("/profile")}
          >
            {isLoading ? <Spinner animation="border" size="sm" /> : serverError ? "!" : userInitial}
          </div>

          <div className="logout">
            <Button onClick={handleLogout}>Logout</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};






























// import { Navbar, Container, Spinner, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom"; 
// import logo from "../../assets/loge.jpeg";
// import { useFetch } from "../../customHooks/useFetch"; 
// import "../../styles/navstyle.css";
// import "../../styles/sidebar.css";
// import { NavLink } from "react-router-dom";
// import {useDecoded} from "../../customHooks/useDecode"

// export const NavBar = () => {
//   const navigate = useNavigate(); 
//   const { data: users, isLoading, serverError } = useFetch("http://localhost:7777/users"); 
//   const decodedToken = useDecoded(); 
//   const loggedInUserId = decodedToken?.id; 
//   const usersArray = Array.isArray(users) ? users : users?.users || []; 
//   const loggedInUser = usersArray.find(user => user._id === loggedInUserId);
//   const userInitial = loggedInUser?.name ? loggedInUser.name.charAt(0).toUpperCase() : "?";
  
//   const handleLogout = () => {
//     localStorage.clear(); 
//     navigate("/login");
//   };

//   return (
//     <Navbar bg="light" expand="lg" className="shadow-sm ">
//       <Container>
//         <Navbar.Brand 
//           onClick={() => navigate("/")} 
//           className="d-flex align-items-center me-auto text-brand" 
//           style={{ cursor: "pointer", color: "var(--main-color)" }}
//         >
//           <img
//             src={logo}
//             alt="MediFind Logo"
//             width="60"
//             height="40"
//             className="me-4 rounded-circle"
//           />
//           MediFind
//         </Navbar.Brand>

//         <div className="sidebar">
//           <NavLink to="/home" className={({ isActive }) => (isActive ? "active-link" : "")}>
//             Home
//           </NavLink>
//           <NavLink to="/profile" className={({ isActive }) => (isActive ? "active-link" : "")}>
//             Profile
//           </NavLink>
//           <NavLink to="/AddMedicine" className={({ isActive }) => (isActive ? "active-link" : "")}>
//             Add Medicine
//           </NavLink>
//           <NavLink to="/RequestMedicine" className={({ isActive }) => (isActive ? "active-link" : "")}>
//             Request Medicine
//           </NavLink>
//           <NavLink to="/need" className={({ isActive }) => (isActive ? "active-link" : "")}>
//             Needs
//           </NavLink>
//           <NavLink to="/donate" className={({ isActive }) => (isActive ? "active-link" : "")}>
//             Donation
//           </NavLink>
//         </div>

//         {/* <div className="review">
//           <NavLink to="/home" className={({ isActive }) => (isActive ? "active-link" : "")}>
//             Home
//           </NavLink>
//           <NavLink to="/offersReview" className={({ isActive }) => (isActive ? "active-link" : "")}>
//             Request
//           </NavLink>
//           <NavLink to="/donateReview" className={({ isActive }) => (isActive ? "active-link" : "")}>
//             Donate
//           </NavLink>
//         </div> */}

//         <div 
//           className="user-icon ms-3 d-flex align-items-center justify-content-center" 
//           style={{
//             width: "40px",
//             height: "40px",
//             backgroundColor: "#26cac7",
//             color: "#fff",
//             borderRadius: "50%",
//             fontSize: "1.2rem",
//             fontWeight: "bold",
//             cursor: "pointer"
//           }}
//           onClick={() => navigate("/profile")}
//         >
//           {isLoading ? <Spinner animation="border" size="sm" /> : serverError ? "!" : userInitial}
//         </div>

//         <div className="logout">
//           <Button onClick={handleLogout}>Logout</Button>
//         </div>
//       </Container>
//     </Navbar>
//   );
// };
