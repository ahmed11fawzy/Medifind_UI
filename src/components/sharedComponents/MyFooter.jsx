import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

export const Footer = () => {
  return (

    <footer className=" mb-0 bottom-0  " style={{ backgroundColor: "#1E252B", padding: "20px 0" }}>

      <Container>
        <Row className="text-white text-center text-md-start position-relative">
          {/* Brand Name */}
          <Col 
            className="d-flex justify-content-center justify-content-md-start align-items-center mb-3 mb-md-0" 
            md={3} 
            style={{ paddingRight: "20px", position: "relative" }}
          >
            <h3 style={{ color: "#1E9694", fontWeight: "bold" }}>Medifind</h3>
            <div className="vertical-line"></div>
          </Col>

          {/* About Links */}
          <Col 
            md={3} 
            className="mb-3 mb-md-0 " 
            style={{ paddingRight: "20px", paddingLeft: "20px", position: "relative" }}
          >
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">About Us</a></li>
              <li><a href="#" className="text-white text-decoration-none">Contact Us</a></li>
              <li><a href="#" className="text-white text-decoration-none">Media Center</a></li>
            </ul>
            <div className="vertical-line"></div>
          </Col>

          {/* Policy Links */}
          <Col 
            md={3} 
            className="mb-3 mb-md-0" 
            style={{ paddingRight: "20px", paddingLeft: "20px", position: "relative" }}
          >
            <ul className="list-unstyled">
              <li><a href="#" className="text-white text-decoration-none">Policy Library</a></li>
              <li><a href="#" className="text-white text-decoration-none">Privacy</a></li>
            </ul>
            <div className="vertical-line"></div>
          </Col>

          {/* Social Media */}
          <Col 
            md={3} 
            style={{ paddingLeft: "20px" }}
          >
            <p>Follow us</p>
            <div className="d-flex justify-content-center justify-content-md-start gap-3">
              <a href="#"><FaFacebookF color="#1E9694" /></a>
              <a href="#"><FaTwitter color="#1E9694" /></a>
              <a href="#"><FaYoutube color="#1E9694" /></a>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Vertical Line Styling */}
      <style jsx>{`
        .vertical-line {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 75%;
          width: 1px;
          background-color: rgba(255, 255, 255, 0.082);
          transform: translateX(50%);
        }
      `}</style>
    </footer>
  );
};
































// import { Container, Row, Col } from "react-bootstrap";
// import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

// export const Footer = () => {
//   return (
//     <>
//     <footer className="mt-auto py-3" style={{ backgroundColor: "#1E252B" }}>
//       <Container >
//         <Row className="text-white text-center text-md-start">
//           {/* Brand Name */}
//           <Col className="d-flex justify-content-center justify-content-md-start align-items-center mb-3 mb-md-0" md={3}>
//             <h3 style={{ color: "#1E9694", fontWeight: "bold" }}>Medifind</h3>
//           </Col>

//           {/* About Links */}
//           <Col md={3} className="mb-3 mb-md-0">
//             <ul className="list-unstyled">
//               <li><a href="#" className="text-white text-decoration-none">About Us</a></li>
//               <li><a href="#" className="text-white text-decoration-none">Contact Us</a></li>
//               <li><a href="#" className="text-white text-decoration-none">Media Center</a></li>
//             </ul>
//           </Col>

//           {/* Policy Links */}
//           <Col md={3} className="mb-3 mb-md-0">
//             <ul className="list-unstyled">
//               <li><a href="#" className="text-white text-decoration-none">Policy Library</a></li>
//               <li><a href="#" className="text-white text-decoration-none">Privacy</a></li>
//             </ul>
//           </Col>

//           {/* Social Media */}
//           <Col md={3}>
//             <p>Follow us</p>
//             <div className="d-flex justify-content-center justify-content-md-start gap-3">
//               <a href="#"><FaFacebookF color="#1E9694" /></a>
//               <a href="#"><FaTwitter color="#1E9694" /></a>
//               <a href="#"><FaYoutube color="#1E9694" /></a>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </footer>
//     </>
//   );
// };





























// import { Container, Row, Col } from "react-bootstrap";
// import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

// export const Footer = () => {
//   return (
//     <footer  style={{ backgroundColor: "#1E252B", padding: "20px 0"}}>
//       <Container>
//         <Row className="text-white">
//           {/* Brand Name */}
//           <Col className="d-flex align-items-center border-end border-secondary" md={3}>
//             <h3 style={{ color: "#1E9694", fontWeight: "bold" }}>Medifind</h3>
//           </Col>

//           {/* About Links */}
//           <Col md={3} className="border-end border-secondary">
//             <ul className="list-unstyled">
//               <li>About Us</li>
//               <li>Contact Us</li>
//               <li>Media Center</li>
//             </ul>
//           </Col>

//           {/* Policy Links */}
//           <Col md={3} className="border-end border-secondary">
//             <ul className="list-unstyled">
//               <li>Policy Library</li>
//               <li>Privacy</li>
//             </ul>
//           </Col>

//           {/* Social Media */}
//           <Col md={3} >
//             <p>Follow us</p>
//             <div className="d-flex gap-3">
//               <FaFacebookF color="#1E9694" />
//               <FaTwitter color="#1E9694" />
//               <FaYoutube color="#1E9694" />
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </footer>
//   );
// };








// import { Container, Row, Col } from "react-bootstrap";
// import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

// // Border Component
// const Border = () => (
//   <div style={{ borderRight: "1px solid rgba(255, 255, 255, 0.2)", height: "100%" }}></div>
// );

// export const Footer = () => {
//   return (
//     <footer style={{ backgroundColor: "#1E252B", padding: "20px 0" }}>
//       <Container>
//         <Row className="text-white">
//           {/* Medifind Brand */}
//           <Col md={3} className="d-flex align-items-center border-end">
//             <h3 style={{ color: "#1E9694", fontWeight: "bold" }}>Medifind</h3>
//             {/* <Border /> */}
//           </Col>

//           {/* About Links */}
//           <Col className="border-end" md={3}>
//             <ul className="list-unstyled">
//               <li>About Us</li>
//               <li>Contact Us</li>
//               <li>Media Center</li>
//             </ul>
//             {/* <Border /> */}
//           </Col>

//           {/* Policy Links */}
//           <Col md={3} className="border-end">
//             <ul className="list-unstyled">
//               <li>Policy Library</li>
//               <li>Privacy</li>
//             </ul>
//             {/* <Border  /> */}
//           </Col>

//           {/* Social Media */}
//           <Col md={3}>
//             <p>Follow us</p>
//             <div className="d-flex gap-3">
//               <FaFacebookF color="#1E9694" />
//               <FaTwitter color="#1E9694" />
//               <FaYoutube color="#1E9694" />
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </footer>
//   );
// };


