import { Container, Row, Col } from "react-bootstrap";
import { AddBtn } from "../customComponents/Addbtn";

export const MySideBar = () => {
  return (
  <div className="sidebar d-flex flex-column p-5">
    <a href="" style={{"textDecoration":'none','paddingBottom':"10px"}}>Needs  </a>
    <a href="" style={{"textDecoration":'none','paddingBottom':"10px"}}>Settings</a>
    <a href="" style={{"textDecoration":'none','paddingBottom':"10px"}}>Help Center </a>
    <a href="" style={{"textDecoration":'none','paddingBottom':"10px"}}>Contact us </a>
     <AddBtn style={{'width':'45%','marginTop':30,'marginLeft':0,'backgroundColor':'#1E9694' }} >Logout</AddBtn>
  </div>
       

  );
};











