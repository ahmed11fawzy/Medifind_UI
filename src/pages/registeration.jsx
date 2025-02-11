import {React,use,useEffect,useRef,useState} from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
import{faCheck,faTimes,faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "../styles/registerStyle.css";


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
          <p ref={errorRef} className={errormsg?"errmsg":'offscreen'} aria-live="assertive"> {errormsg}</p>
          
      <Card style={{ width: "400px", borderRadius: "10px" }} className="p-4">
        <h3 className="text-center mb-4">Registration</h3>

        <Form >
           <Form.Group className="mb-3" controlId="formName">
            <Form.Label >Enter your name :
               <span className={validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} /></span> 
                <span className={validName || !user ? "hide" : "invalid"}><FontAwesomeIcon icon={faTimes} / >
                </span> 
                </Form.Label>
            <Form.Control type="text"
             placeholder="Enter your name" 
             className="form-control"
              ref={inputRef}
              onChange={(e) => setUser(e.target.value)}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setuserFocus(true)}
              onBlur={() => setuserFocus(false)}
              />

              <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                {/* <FontAwesomeIcon icon={faInfoCircle} /> */}
                4 to 24 characters.<br />
                Must begin with a letter.<br />
                Letters, numbers, underscores, hyphens allowed.</p>
              </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Enter your email:
              <span className={validMail ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} /></span>
              <span className={validMail || !mail ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} /></span>
            </Form.Label>
            <Form.Control
             type="email"
             placeholder="Enter your email" 
             className="form-control"
             onChange={(e) => setmail(e.target.value)}
             required
             aria-invalid={validMail ? "false" : "true"}
             aria-describedby="emailnote"
             onFocus={() => setmailFocus(true)}
             onBlur={() => setmailFocus(false)}
             />

             <p id="emailnote" className={mailFocus && mail && !validMail ? "instructions" : "offscreen"}>
               <FontAwesomeIcon icon={faInfoCircle} />  
               Enter a valid email address.</p>

             </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Enter your Password:
              <span className={validpwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} /></span>
              <span className={validpwd || !pwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} /></span>
            </Form.Label>
            <Form.Control 
            type="password" 
            placeholder="Enter your Password" 
            className="form-control"
            onChange={(e) => setpwd(e.target.value)}
            required
            aria-invalid={validpwd ? "false" : "true"}
            aria-describedby="pwdnote"
            onFocus={() => setpwdFocus(true)} 
            onBlur={() => setpwdFocus(false)}
             />
            <p id="pwdnote" className={pwdFocus && pwd && !validpwd ? "instructions" : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.<br />
              Must include uppercase and lowercase letters, a number and a special character.<br />
              allowed special characters
            </p>
            </Form.Group>

          <Form.Group className="mb-3" controlId="formConfirmPassword">
            <Form.Label>Confirm your password:
              <span className={validmatchpwd && matchpwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} /></span>
                <span className={validmatchpwd || !matchpwd ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes} /></span>
                            </Form.Label>
            <Form.Control
             type="password" 
             placeholder="Confirm your password" 
             className="form-control" 
             onChange={(e) => setmatchpwd(e.target.value)}
             required
             aria-invalid={validmatchpwd ? "false" : "true"}
             aria-describedby="confirmnote"
             onFocus={() => setmatchpwdFocus(true)}
             onBlur={() => setmatchpwdFocus(false)}
             />
            
             <p id="confirmnote" className={matchpwdFocus && matchpwd && !validmatchpwd ? "instructions" : "offscreen"}>
               <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
             </p>
             </Form.Group>

          <div className="text-center">
            <Button 
            type="submit"
            className="w-100" 
            style={{backgroundColor: "#00796b",border: "none",borderRadius: "5px", }}
            disabled={!(validName && validMail && validpwd && validmatchpwd)}
                >
              Submit
            </Button>
          </div>
          <p>
            already have an account? <br />
            <a href="" >login</a>
            {/* <Link to="/login">Login</Link> */}
          </p>
        </Form>
      </Card>
    </Container>
    </>
  )
}
