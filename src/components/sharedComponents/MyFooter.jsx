import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="fixed-bottom" style={{ backgroundColor: "#1E252B", padding: "20px 0" }}>
      <Container>
        <Row className="text-white">
          {/* Brand Name */}
          <Col className="d-flex align-items-center border-end border-secondary" md={3}>
            <h3 style={{ color: "#1E9694", fontWeight: "bold" }}>Medifind</h3>
          </Col>

          {/* About Links */}
          <Col md={3} className="border-end border-secondary">
            <ul className="list-unstyled">
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Media Center</li>
            </ul>
          </Col>

          {/* Policy Links */}
          <Col md={3} className="border-end border-secondary">
            <ul className="list-unstyled">
              <li>Policy Library</li>
              <li>Privacy</li>
            </ul>
          </Col>

          {/* Social Media */}
          <Col md={3} >
            <p>Follow us</p>
            <div className="d-flex gap-3">
              <FaFacebookF color="#1E9694" />
              <FaTwitter color="#1E9694" />
              <FaYoutube color="#1E9694" />
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};








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


