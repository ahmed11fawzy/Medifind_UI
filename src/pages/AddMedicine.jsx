import { AddBtn } from "../components/customComponents/Addbtn";
import { useAddMedicineForm } from "../customHooks/AddMedicine";
import { useDecoded } from "../customHooks/useDecode";
import axios from "axios";
import { Loader } from "../components/customComponents/Loader/Loader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { Card, Container, Form } from "react-bootstrap";

export const AddMedicine = () => {
  const [img_path, setPath] = useState('');


  


  const [showToast, setShowToast] = useState(false);
  const [isUploading, setUploading] = useState(false);


  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append("file", file);

    formData.append("upload_preset", "medifined");
    formData.append("cloud_name", "doxyvufkz");
    
    setUploading(true);


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
      setUploading(false);
    }
  };

  const decodedToken = useDecoded();

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

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {


        try {
            if (img_path && decodedToken) {
                const response = await fetch("http://localhost:7777/medicine", {
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

                if (!response.ok) throw new Error("Something went wrong!");

                toast.success("Medicine added successfully", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

                setMedicineName("");
                setNumPieces("");
                setExpireDate("");
                setConcentration("");
                setImage(null);
                document.getElementById("imageInput").value = "";

            } else {
                throw new Error("Missing data");
            }
        } catch (error) {
            toast.error("Something went wrong", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
     

        }
    }
  };

  return (
    <>


      <ToastContainer />


      {isUploading && <Loader />}


      <Container >
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

    </>
  );
};

