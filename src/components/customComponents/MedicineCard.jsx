import React from "react";
import { Card, Button } from "react-bootstrap";
import { AddBtn } from "./Addbtn";

const MedicineCard = ({ image, name, expireDate }) => {
  return (
    <Card className="p-3 shadow-sm" style={{ width: "90%", maxWidth: "500px", backgroundColor: "#D2F3F0", borderRadius: "10px" }}>
      <div className="d-flex align-items-center gap-3">
        <img src={image} alt={name} style={{ width: "80px", height: "120px", objectFit: "contain" }} />
        <div>
          <p className="mb-1"><strong>Expire date:</strong> {expireDate}</p>
          <p className="mb-3"><strong>Name:</strong> {name}</p>
          <div className="d-flex gap-3">
            <AddBtn style={{ backgroundColor: "#2AC728", border: "none", width: "100px" }}>Add</AddBtn>
            <AddBtn style={{ backgroundColor: "#C7282A", border: "none", width: "100px"  }}>Delete</AddBtn>
            <AddBtn style={{ backgroundColor: "#1E9694", border: "none" , width: "100px" }}>Examine</AddBtn>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MedicineCard;
