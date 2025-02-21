import { useState } from "react";
import { Container, Card, Form, Modal, Button } from "react-bootstrap";
import { AddBtn } from "../components/customComponents/Addbtn";
import { useAddMedicineForm } from "../customHooks/AddMedicine";
import { useDecoded } from "../customHooks/useDecode";
import axios from "axios";
import "../components/customComponents/toastedbtn"

import { Loader } from "../components/customComponents/Loader/Loader";
export const AddMedicine = () => {
  const [img_path, setPath] = useState('');
  const [showToast, setShowToast] = useState(false); // حالة الـ Toast
  const [isUploading,setUploading]=useState(false);
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "medifined"); // Replace with your Cloudinary Upload Preset
    formData.append("cloud_name", "doxyvufkz");
    setUploading(true) // Replace with your Cloudinary Cloud Name
    try {
        const response = await axios.post(
            "https://api.cloudinary.com/v1_1/doxyvufkz/image/upload",
            formData
        );
        console.log(response.data.secure_url);
        setPath(response.data.secure_url)
        setUploading(false)
      // Pass image URL to parent component
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const decodedToken = useDecoded();
  console.log(decodedToken);

  const {
    medicineName,
    numPieces,
    expireDate,
    concentration,
    errors,
    setMedicineName,
    setNumPieces,
    setExpireDate,
    setConcentration,
    setImage,
    validateForm,
  } = useAddMedicineForm();

  const [showModal, setShowModal] = useState(false);

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        if (img_path && decodedToken) {
          const response = await fetch("http://localhost:7777/medicine", { // Add API endpoint here
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: medicineName,
              quantity: Number(numPieces),
              concentration: concentration,
              expire_date: expireDate,
              examine: false,
              status: false,
              image_path: img_path,
              user_id: decodedToken.id,
            }),
          });

          console.log('req sent');

          if (!response.ok) {
            throw new Error("Something went wrong!");
          }

          const data = await response.json();
          console.log(data);
          setShowModal(true);
          setMedicineName("");
          setNumPieces("");
          setExpireDate("");
          setConcentration("");
          setImage(null);
          document.getElementById("imageInput").value = "";
          setShowToast(true); 
          setTimeout(() => setShowToast(false), 3000);
        } else {
          console.log('something wrong');
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <>
      {isUploading && <Loader/>}
      <Container style={{ marginTop: "50px" }}>
        <Card className="p-4 shadow-sm">
          <h3 className="text-center mb-4">Add Medicine</h3>
          <Form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12 col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Medicine Name:</Form.Label>
                  <Form.Control
                    type="text"
                    value={medicineName}
                    onChange={(e) => setMedicineName(e.target.value)}
                    isInvalid={!!errors.medicineName}
                  />
                  <Form.Control.Feedback type="invalid">{errors.medicineName}</Form.Control.Feedback>
                </Form.Group>
              </div>

              <div className="col-12 col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Number of Pieces:</Form.Label>
                  <Form.Control
                    type="text"
                    value={numPieces}
                    onChange={(e) => setNumPieces(e.target.value)}
                    isInvalid={!!errors.numPieces}
                  />
                  <Form.Control.Feedback type="invalid">{errors.numPieces}</Form.Control.Feedback>
                </Form.Group>
              </div>

              <div className="col-12 col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Expire Date:</Form.Label>
                  <Form.Control
                    type="date"
                    value={expireDate}
                    onChange={(e) => setExpireDate(e.target.value)}
                    isInvalid={!!errors.expireDate}
                  />
                  <Form.Control.Feedback type="invalid">{errors.expireDate}</Form.Control.Feedback>
                </Form.Group>
              </div>

              <div className="col-12 col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Concentration:</Form.Label>
                  <Form.Control
                    type="text"
                    value={concentration}
                    onChange={(e) => setConcentration(e.target.value)}
                    isInvalid={!!errors.concentration}
                  />
                  <Form.Control.Feedback type="invalid">{errors.concentration}</Form.Control.Feedback>
                </Form.Group>
              </div>

              <div className="col-12">
                <Form.Group className="mb-3">
                  <Form.Label>Add Image:</Form.Label>
                  <Form.Control
                    id="imageInput"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleUpload}
                    isInvalid={!!errors.image}
                  />
                  <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
                </Form.Group>
              </div>
            </div>

            <div className="text-center d-flex justify-content-end w-25 ms-auto">
              <AddBtn type="submit" disabled={!img_path}>Add</AddBtn>
            </div>
          </Form>
        </Card>
      </Container>

      {/* Toast Notification */}
      {showToast && (
        <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
            <strong className="me-auto">Congratulations</strong>
            <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
          <div className="toast-body">
            The medicine has been added successfully!
          </div>
        </div>
      )}
    </>
  );
};

































// import {  useState } from "react";
// import { Container, Card, Form, Modal, Button } from "react-bootstrap";
// import { AddBtn } from "../components/customComponents/Addbtn";
// import {useAddMedicineForm} from "../customHooks/AddMedicine";  
// import {useDecoded} from "../customHooks/useDecode"
// import axios from "axios";
// export const AddMedicine = () => {
//   const [img_path,setPath]=useState('')
//   const handleUpload = async (e) => {
//     const file =e.target.files[0] ;
//     console.log(file)
//     if(!file) return;
//     const formData = new FormData();
//     formData.append("file", file     );
//     formData.append("upload_preset", "medifined"); // Replace with your Cloudinary Upload Preset
//     formData.append("cloud_name", "doxyvufkz"); // Replace with your Cloudinary Cloud Name
    

//     try {
//         const response = await axios.post(
//             "https://api.cloudinary.com/v1_1/doxyvufkz/image/upload",
//             formData
//         );
        
        
//         console.log(response.data.secure_url);
//         setPath(response.data.secure_url)
//       // Pass image URL to parent component
//     } catch (error) {
//         console.error("Upload failed:", error);
        
//     }
// };

// const decodedToken=useDecoded()
  
//   console.log(decodedToken);
  
//   const {
//     medicineName,
//     numPieces,
//     expireDate,
//     concentration,
//     // image,
//     errors,
//     setMedicineName,
//     setNumPieces,
//     setExpireDate,
//     setConcentration,
//     setImage,
//     validateForm,
//   } = useAddMedicineForm();  

//   const [showModal, setShowModal] = useState(false);
 

//   // Handle submit  
//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     if (validateForm()) {

//       try {
//           if(img_path && decodedToken){
//             const response = await fetch("http://localhost:7777/medicine", {  // Add API endpoint here
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({
//                 name: medicineName,
//                 quantity:  Number(numPieces),
//                 concentration: concentration,
//                 expire_date:expireDate,
//                 image_path:img_path,
//                 user_id:decodedToken.id,
//               }),
//             });
//             console.log('req sent')
    
//             if (!response.ok) {
//               throw new Error(data.message || "Something went wrong!");
//             }
        
//             const data = await response.json();
//             console.log(data)
//             setShowModal(true);
//             setMedicineName("");
//             setNumPieces("");
//             setExpireDate("");
//             setConcentration("");
//             setImage(null);
//             document.getElementById("imageInput").value = "";
//           }
//           else{
//             console.log('something wrong')
//           }
//     } catch (error) {
//         console.log(error.message);
//     }
    
//   }
   
//     }

//   return (
//     <>
//       <Container style={{ marginTop: "50px" }}>
//         <Card className="p-4 shadow-sm">
//           <h3 className="text-center mb-4">Add Medicine</h3>
//           <Form onSubmit={handleSubmit}>
//             <div className="row">
//               <div className="col-12 col-md-6">
//                 <Form.Group className="mb-3">
//                   <Form.Label>Medicine Name:</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={medicineName}
//                     onChange={(e) => setMedicineName(e.target.value)}
//                     isInvalid={!!errors.medicineName}
//                   />
//                   <Form.Control.Feedback type="invalid">{errors.medicineName}</Form.Control.Feedback>
//                 </Form.Group>
//               </div>

//               <div className="col-12 col-md-6">
//                 <Form.Group className="mb-3">
//                   <Form.Label>Number of Pieces:</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={numPieces}
//                     onChange={(e) => setNumPieces(e.target.value)}
//                     isInvalid={!!errors.numPieces}
//                   />
//                   <Form.Control.Feedback type="invalid">{errors.numPieces}</Form.Control.Feedback>
//                 </Form.Group>
//               </div>

//               <div className="col-12 col-md-6">
//                 <Form.Group className="mb-3">
//                   <Form.Label>Expire Date:</Form.Label>
//                   <Form.Control
//                     type="date"
//                     value={expireDate}
//                     onChange={(e) => setExpireDate(e.target.value)}
//                     isInvalid={!!errors.expireDate}
//                   />
//                   <Form.Control.Feedback type="invalid">{errors.expireDate}</Form.Control.Feedback>
//                 </Form.Group>
//               </div>

//               <div className="col-12 col-md-6">
//                 <Form.Group className="mb-3">
//                   <Form.Label>Concentration:</Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={concentration}
//                     onChange={(e) => setConcentration(e.target.value)}
//                     isInvalid={!!errors.concentration}
//                   />
//                   <Form.Control.Feedback type="invalid">{errors.concentration}</Form.Control.Feedback>
//                 </Form.Group>
//               </div>

//               <div className="col-12">
//                 <Form.Group className="mb-3">
//                   <Form.Label>Add Image:</Form.Label>
//                   <Form.Control
//                     id="imageInput"
//                     type="file"
//                     accept="image/png, image/jpeg"
//                     onChange={handleUpload}
//                     isInvalid={!!errors.image}
//                   />
//                   <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
//                 </Form.Group>
//               </div>
//             </div>
            
//              <div className="text-center d-flex justify-content-end w-25 ms-auto">
//               <AddBtn type="submit" disabled={!img_path} >Add</AddBtn>
//             </div>
//           </Form>
//         </Card>
//       </Container>
//       <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
//   <div class="toast-header">
//     <strong class="me-auto">Congtatulations</strong>
//      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
//   </div>
//   <div class="toast-body">
//     the medicine has been added successfully
//   </div>
// </div>
//       {/* <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Success</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>The request has been uploaded successfully!</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal> */}
//     </>
//   );
// };
