import React from "react";
import { Card } from "react-bootstrap";
import { AddBtn } from "./Addbtn";

export const CardNeeds = ({
  image,
  prescription_img,
  name,
  quantity,
  onRemove,
  request_id,
  medicine_id,
  examined,
  status,
  setRequested,
  requested,
  goToRequestMedicine,
  goToUpdateRequest,
})=>{

  const bgColor = requested
  ? (!examined ? "#d9dedc" : (status ? "#bef5be" : "#f9c8c1"))
  : "#f4fcf9";

  return (
    <Card
      style={{
        backgroundColor: bgColor,
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.2s ease-in-out",
        height: "200px",
        width: "100%"
      }}
      className="mb-3"
    >
      <div className="row g-0 h-100">
        <div className="col-4 p-0 h-100">
          <img
            src={image||prescription_img}
            alt={name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block"
            }}
          />
        </div>
        <div className="col-8 h-100">
          <Card.Body className="p-3 d-flex flex-column h-100">
            <div>
              <Card.Title
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#333",
                  marginBottom: "8px"
                }}
              >
                Name: {name}
              </Card.Title>
              <div className="d-flex align-items-center">
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#000",
                  }}
                >
                  {quantity}
                </span>
              </div>
            </div>

            <div className="flex-grow-1 d-flex flex-column justify-content-center">
              {/* Only display "Check out" button if not requested */}
              {!requested && !examined && !status && (
                <AddBtn
                  onClick={goToRequestMedicine}
                  className="ms-auto"
                  style={{
                    backgroundColor: "#52b431",
                    border: "none",
                    fontSize: "16px",
                    width: "60%",
                  }}
                >
                  Check out
                </AddBtn>
              )}
              {requested && !status && !examined && (
                <p className='text-muted mb-0' style={{ fontSize: "16px" }}>
                  status: <b>waiting for approval</b>
                </p>
              )}
              {requested && examined && status && (
                <p className="text-success mb-0" style={{ fontSize: "16px" }}>
                  status: <b>Accepted</b>
                </p>
              )}
              {requested && examined && !status && (
                <p className="text-danger mb-0" style={{ fontSize: "16px" }}>
                  status: <b>Rejected</b>
                </p>
              )}
            </div>

            <div className="d-flex gap-3 mt-auto">
              <AddBtn
                onClick={onRemove}
                style={{
                  backgroundColor: "#ca1e0f",
                  border: "none",
                  width: "60%",
                }}
              >
                Delete 
              </AddBtn>
              {!examined && (
                <AddBtn
                  onClick={goToUpdateRequest}
                  style={{
                    backgroundColor: "#1E9694",
                    border: "none",
                    width: "60%",
                  }}
                >
                  Update 
                </AddBtn>
              )}
            </div>
          </Card.Body>
        </div>
      </div>
    </Card>
  );
};

