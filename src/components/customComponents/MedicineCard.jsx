import {React,useState} from "react";
import { Card } from "react-bootstrap";
import { AddBtn } from "./Addbtn";

const MedicineCard = ({ image, name, expireDate,id,medicines,setMedicines,examine}) => {

  // const[reviews,setReviews]=useState({});
  // const[examine,setExamine]=useState(false);


  const handleAccept = async (id) => {
    // setExamine(true)
    try {
        const response = await fetch(`http://localhost:7777/medicine/${id}`, {
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
        const response = await fetch(`http://localhost:7777/medicine/${id}`, {
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
     examine ? null :<Card className="p-3 shadow-sm" style={{ width: "90%", maxWidth: "600px", backgroundColor: "#D2F3F0", borderRadius: "10px" }}>
      <div className="d-flex align-items-center gap-3">
        <img src={image} alt={name} style={{ width: "80px", height: "120px", objectFit: "contain" }} />
        <div>
          <p className="mb-1"><strong>Expire date:</strong> {expireDate || "N/A"}</p>
          <p className="mb-3"><strong>Name:</strong> {name || "Unknown"}</p>
          <div className="d-flex gap-3">
        </div>
            <AddBtn style={{ backgroundColor: "#2AC728" ,marginRight:"20px"}} onClick={()=>handleAccept(id)}>Add</AddBtn>
            <AddBtn style={{ backgroundColor: "#C7282A ",marginRight:"10px"}}  onClick={()=>handleReject(id)} >Delete</AddBtn>
          </div>
      </div>
    </Card>
  );
};

export default MedicineCard;
