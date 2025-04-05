import {React,useState} from "react";
import { Card } from "react-bootstrap";
import { AddBtn } from "./Addbtn";

const MedicineCard = ({ image, name, expireDate, id, medicines, setMedicines, examine }) => {

  // const[reviews,setReviews]=useState({});
  // const[examine,setExamine]=useState(false);


  const handleAccept = async (id) => {
    // setExamine(true)
    try {
        const response = await fetch(`https://medifind-production.up.railway.app/medicine/${id}`, {
            method: "PATCH", // Change from POST to PATCH
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: true ,examine:true}),
        });

        if (!response.ok) {
            throw new Error(`Failed to accept request: ${response.status}`);
        }

        // Remove the accepted request from the state
        setMedicines((prevReview) => prevReview.filter((review) => review._id !== id));

    } catch (error) {
        console.error("Error accepting request:", error);
    }
};
  const handleReject = async (id) => {
    // setExamine(true)
    try {
        const response = await fetch(`https://medifind-production.up.railway.app/medicine/${id}`, {
            method: "PATCH", // Change from POST to PATCH
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: false ,examine:true}),
        });

        if (!response.ok) {
            throw new Error(`Failed to accept request: ${response.status}`);
        }

        // Remove the accepted request from the state
        setMedicines((prevReview) => prevReview.filter((review) => review._id !== id));

    } catch (error) {
        console.error("Error accepting request:", error);
    }
};

  return (
    examine ? null : (
      <Card 
        style={{ 
          width: "90%", 
          maxWidth: "600px", 
          backgroundColor: "#D2F3F0", 
          borderRadius: "10px",
          overflow: "hidden",
          height: "200px",
          boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
        }}
        className="mb-3"
      >
        <div className="row g-0 h-100">
          <div className="col-4 p-0 h-100">
            <img 
              src={image} 
              alt={name} 
              style={{ 
                width: "100%",
                height: "100%",
                // objectFit: "cover",
                // objectPosition: "center",
                display: "block"
              }} 
            />
          </div>
          <div className="col-8 h-100">
            <Card.Body className="p-3 d-flex flex-column h-100">
              <div>
                <p className="mb-2">
                  <strong>Name:</strong> {name || "Unknown"}
                </p>
                <p className="mb-2">
                  <strong>Expire date:</strong> {expireDate || "N/A"}
                </p>
              </div>
              
              <div className="d-flex gap-3 mt-auto">
                <AddBtn 
                  style={{ 
                    backgroundColor: "#2AC728",
                    width: "50%"
                  }} 
                  onClick={() => handleAccept(id)}
                >
                  Accept
                </AddBtn>
                <AddBtn 
                  style={{ 
                    backgroundColor: "#C7282A",
                    width: "50%"
                  }}  
                  onClick={() => handleReject(id)}
                >
                  Reject
                </AddBtn>
              </div>
            </Card.Body>
          </div>
        </div>
      </Card>
    )
  );
};

export default MedicineCard;
