import React from "react";
import { Card } from "react-bootstrap";
import { AddBtn } from "./Addbtn";

export const CardComponent = ({ image, name, quantity, pcs, expDate, onRemove }) => {
  return (
    <Card
      style={{
        backgroundColor: "#E6F5EF",
        borderRadius: "10px",
        padding: "10px",
        boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s ease-in-out",
      }}
      className="mb-3"
    >
      <div className="row g-0">
        <div className="col-4 d-flex align-items-center justify-content-center">
          <img
            src={image}
            alt={name}
            style={{
              borderRadius: "5px",
              maxWidth: "100%",
              height: "100%",
            }}
          />
        </div>
        <div className="col-8">
          <Card.Body>
            <Card.Title style={{ fontSize: "16px", fontWeight: "bold", color: "#333" }}>
              Name: {name}
            </Card.Title>
            <div className="d-flex align-items-center mt-2">
              <span style={{ fontSize: "16px", fontWeight: "bold", color: "#333" }}>
                Conc: {quantity}
              </span>
            </div>
            <div style={{ marginTop: "5px", fontSize: "14px", color: "#666" }}>
              No. of pcs: {pcs} | EXP. Date: {expDate}
            </div>
            <AddBtn
              onClick={onRemove}
              style={{
                backgroundColor: "#1E9694",
                border: "none",
                width: "60%",
                marginTop: "10px",
              }}
            >
              Delete 
            </AddBtn>
            <AddBtn
              
              style={{
                backgroundColor: "#1E9694",
                border: "none",
                width: "60%",
                marginTop: "10px",
              }}
            >
              Update 
            </AddBtn>
          </Card.Body>
        </div>
      </div>
    </Card>
  );
};
