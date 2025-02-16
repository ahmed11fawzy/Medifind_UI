import "../../styles/sidebar.css";
import { Button, ProgressBar } from "react-bootstrap";
// import { Container, Row, Col, ProgressBar } from "react-bootstrap";
import { AddBtn } from "../customComponents/Addbtn";

export const MySideBar = () => {
  return (
    <div className="sidebar d-flex flex-column p-4" >
      <a href="#" >Home</a>

      <div className="progress-container">
        <p>Complete your profile</p>
        <p className="label">completement:</p>

    <ProgressBar now={75} label={`${75}%`} style={{ height: "10px", borderRadius: "5px", width: "100%"}} />

      </div>

      <a href="#">Profile</a>
      <a href="#">Needs</a>
      <a href="#">Settings</a>
      <a href="#">Help Center</a>
      <a href="#">Contact Us</a>
       
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











