


import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { AddBtn } from "./Addbtn";

  export const CardComponent = ({ image, name, quantity,onProceed, onRemove, request_id ,medicine_id,status }) => {
    const[requested,setRequested]=useState(false)
    const navigate = useNavigate();
    const goToRequestMedicine = () => {
      navigate("/RequestMedicine", {
        state: {
          medicineName: name,
          medicine_id:medicine_id,
          request_id
        }
      });
    };
    // ... rest of the component remains the same

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
              Name :- {name}
            </Card.Title>
            <div className="d-flex align-items-center  mt-2">
              
              <span style={{ fontSize: "16px", fontWeight: "bold", color: "#333" }}>Conc :- {quantity}</span>
              
              
            </div>
           { !(requested&&status)&& <AddBtn onClick={onProceed}  className="ms-auto d-block" style={{ backgroundColor: "#109d89", border: "none", fontSize: "18px",width:"60%" ,marginRight:"150px",marginTop:"10px"}}>Check out</AddBtn>     
              }
          { !(requested&&status)&& <AddBtn onClick={onRemove}
             style={{ backgroundColor: "#ca1e0f", border: "none", width: "60%", marginTop: "10px" }}>Remove</AddBtn>
          } 
          </Card.Body>
        </div>
      </div>
    </Card>
  );
};

