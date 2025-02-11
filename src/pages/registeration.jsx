import {React,use,useEffect,useRef,useState} from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { AddBtn } from "../Custom/Addbtn";


const nameRegex = /^[A-z][A-z0-9-_]{3,23}$/;
const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const mailRegex=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/

export  function Registeration() {

  const inputRef = useRef(null);   // for focus on name
  const errorRef = useRef(null);


const[user,setUser] = useState('') ; 
const[validName,setvalidName] = useState(false) ; 
const[userFocus,setuserFocus] = useState(false) ; 


const[mail,setmail] = useState('') ; 
const[validMail,setvalidMail] = useState(false) ; 
const[mailFocus,setmailFocus] = useState(false) ; 


const[pwd,setpwd] = useState('') ; 
const[validpwd,setvalidpwd] = useState(false) ; 
const[pwdFocus,setpwdFocus] = useState(false) ; 


const[matchpwd,setmatchpwd] = useState('') ; 
const[validmatchpwd,setvalidmatchpwd] = useState(false) ; 
const[matchpwdFocus,setmatchpwdFocus] = useState(false) ; 

const[errormsg,seterrormsg] = useState('') ;
const[success,setSuccess] = useState('') ;

const[error,setError] = useState('') ;


  
useEffect(() => {
  inputRef.current.focus();
},[]);
  
useEffect(() => {
  const result = nameRegex.test(user); 
  console.log(result);
  console.log(user);
  setvalidName(result);
},[user]);

useEffect(() => {
  const result = mailRegex.test(mail); 
  console.log(result);
  console.log(mail);
  setvalidMail(result);
},[mail]);
  
  
useEffect(() => {
  const result = pwdRegex.test(pwd); 
  console.log(result);
  console.log(pwd);
  setvalidpwd(result);
  const match = pwd === matchpwd; 
  setvalidmatchpwd(match);
},[pwd,matchpwd]);
  


useEffect(() => {
  seterrormsg("");
},[user,pwd,matchpwd]);




  return (
    <>
        <Container className="d-flex justify-content-center align-items-center vh-100" >

      <Card style={{ backgroundColor: "#d6d2d2", maxWidth: "100%", width: "400px", borderRadius: "10px" }} className="p-4 w-md-75 w-lg-50 w-xs-25">
        <h3 className="text-center mb-4 fw-bold">Registration</h3>

        <Form >
           <Form.Group className="mb-3" controlId="formName">
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" className="form-control"/></Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email"placeholder="Enter your email" className="form-control" /></Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter your Password" className="form-control" /></Form.Group>

          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Confirm password</Form.Label>
            <Form.Control type="password" placeholder="Confirm your password" className="form-control" /> </Form.Group>
            <br/>
          <div className="text-center d-flex justify-content-end">
            <AddBtn type="submit">
              Sign Up
            </AddBtn>
          </div>
          <br/>
        </Form>
      </Card>
    </Container>
    </>
 
  ) 
}
