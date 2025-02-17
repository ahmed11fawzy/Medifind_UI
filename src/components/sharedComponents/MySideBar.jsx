import "../../styles/sidebar.css";
import { Button, ProgressBar } from "react-bootstrap"
import { NavLink} from "react-router-dom";

export const MySideBar = () => {
  return (

    <div className="sidebar d-flex flex-column p-4" >
        <NavLink to="/home" className={({ isActive }) => isActive ? "active-link" : ""}>Home</NavLink>

      <div className="progress-container">
        <p>Complete profile</p>
        <p className="label">completement:</p>

    <ProgressBar now={75} label={`${75}%`} style={{ height: "10px", borderRadius: "5px", width: "100%"}} />


      </div>

      <NavLink to="/needs" className={({ isActive }) => isActive ? "active-link" : ""}>Needs</NavLink>
      <NavLink to="/profile" className={({ isActive }) => isActive ? "active-link" : ""}>Profile</NavLink>
      <NavLink to="/settings" className={({ isActive }) => isActive ? "active-link" : ""}>Settings</NavLink>
      <NavLink to="/help-center" className={({ isActive }) => isActive ? "active-link" : ""}>Help Center</NavLink>
      <NavLink to="/contact-us" className={({ isActive }) => isActive ? "active-link" : ""}>Contact Us</NavLink>
       
      <Button>Logout</Button>
    </div>
  );
};





































// import { Container, Row, Col } from "react-bootstrap";
// import { AddBtn } from "../customComponents/Addbtn";

// export const MySideBar = () => {
//   return (
//   <div className="sidebar d-flex flex-column p-5">
//     <a href="" style={{textDecoration:'none',paddingBottom:"10px"}}>Needs  </a>
//     <a href="" style={{textDecoration:'none',paddingBottom:"10px"}}>Settings</a>
//     <a href="" style={{textDecoration:'none',paddingBottom:"10px"}}>Help Center </a>
//     <a href="" style={{textDecoration:'none',paddingBottom:"10px"}}>Contact us </a>
//      <AddBtn >Logout</AddBtn>
//   </div>
       

//   );
// };











