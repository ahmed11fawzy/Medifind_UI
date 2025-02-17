import React from "react";
import { Card } from "react-bootstrap";
import { AddBtn } from "./Addbtn";

const MedicineCard = ({ image, name, expireDate }) => {
  return (
    <Card className="p-3 shadow-sm" style={{ width: "90%", maxWidth: "600px", backgroundColor: "#D2F3F0", borderRadius: "10px" }}>
      <div className="d-flex align-items-center gap-3">
        <img src={image} alt={name} style={{ width: "80px", height: "120px", objectFit: "contain" }} />
        <div>
          <p className="mb-1"><strong>Expire date:</strong> {expireDate || "N/A"}</p>
          <p className="mb-3"><strong>Name:</strong> {name || "Unknown"}</p>
          <div className="d-flex gap-3">
            <AddBtn bgColor="#2AC728">Add</AddBtn>
            <AddBtn bgColor="#C7282A">Delete</AddBtn>
            <AddBtn bgColor="#1E9694">Examine</AddBtn>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MedicineCard;
