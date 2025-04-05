import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Modal, Button, Card } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { AddBtn } from "../components/customComponents/Addbtn";
import useMedicineForm from "../customHooks/RequestMedicine";  

import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
// Removed unused import: { data } from "react-router-dom"

export const RequestsReview = () => {
  const [requests, setRequests] = useState([]);
  const [orders, setOrders] = useState([]);
  const req_url = "https://medifind-production.up.railway.app/request";
  const order_url = "https://medifind-production.up.railway.app/orders";

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Server error: ${response.status} - ${response.statusText}`);
      }
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchData(req_url).then((data) => {
      if (data) setRequests(data);
    });
    fetchData(order_url).then((data) => {
      if (data) setOrders(data);
    });
  }, []);

  const handleAccept = async (url, id, setFunction) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: true, examined: true }),
      });

      if (!response.ok) {
        throw new Error(`Failed to accept request: ${response.status}`);
      }

      // Remove the accepted request from the state
      setFunction((prevRequests) => prevRequests.filter((request) => request._id !== id));
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  async function handleReject(url, id, setFunction) {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: false, examined: true }),
      });

      if (!response.ok) {
        throw new Error(`Failed to reject request: ${response.status}`);
      }

      // Remove the rejected request from the state    
      setFunction((prevRequests) => prevRequests.filter((request) => request._id !== id));
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  }

  return (
    <Container className="py-4">
      <Row className="g-4">
        {requests && requests.map((request, index) =>
          (request.examined || !request.req_description) ? null : (
            <Col key={index} xs={12} md={6}>
              <Card 
                className="h-100"
                style={{ 
                  backgroundColor: "#D2F3F0",
                  borderRadius: "10px",
                  overflow: "hidden",
                  height: "200px",
                  boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="row g-0 h-100">
                  <div className="col-4 p-0 h-100">
                    <img
                      src={request.prescription_img}
                      alt="prescription"
                      style={{ 
                        width: "100%",
                        height: "100%",
                        
                      }}
                    />
                  </div>
                  <div className="col-8 h-100">
                    <Card.Body className="p-3 d-flex flex-column h-100">
                      <div>
                        <h4 className="mb-3">Reason</h4>
                        <p className="mb-2">
                          <strong>Medicine Name:</strong> {request.req_name}
                        </p>
                        <div
                          style={{
                            backgroundColor: "#E6E6E6",
                            padding: "10px",
                            borderRadius: "5px",
                            marginBottom: "10px",
                            fontSize: "0.9rem",
                            maxHeight: "60px",
                            overflowY: "auto"
                          }}
                        >
                          {request.req_description}
                        </div>
                      </div>
                      
                      <div className="d-flex gap-3 mt-auto">
                        <AddBtn
                          onClick={() => handleAccept(req_url, request._id, setRequests)}
                          style={{
                            backgroundColor: "#28c742",
                            width: "50%"
                          }}
                        >
                          Accept
                        </AddBtn>
                        <AddBtn
                          onClick={() => handleReject(req_url, request._id, setRequests)}
                          style={{
                            backgroundColor: "#C7282A",
                            width: "50%"
                          }}
                        >
                          Reject
                        </AddBtn>
                      </div>
                    </Card.Body>
                  </div>
                </div>
              </Card>
            </Col>
          )
        )}

        {orders && orders.map((order, index) =>
          order.examined ? null : (
            <Col key={index} xs={12} md={6}>
              <Card 
                className="h-100"
                style={{ 
                  backgroundColor: "#D2F3F0",
                  borderRadius: "10px",
                  overflow: "hidden",
                  height: "200px",
                  boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div className="row g-0 h-100">
                  <div className="col-4 p-0 h-100">
                    <img
                      src={order.prescription_img}
                      alt="prescription"
                      style={{ 
                        width: "100%",
                        height: "100%",
                      
                      }}
                    />
                  </div>
                  <div className="col-8 h-100">
                    <Card.Body className="p-3 d-flex flex-column h-100">
                      <div>
                        <h4 className="mb-3">Reason</h4>
                        <p className="mb-2">
                          <strong>Medicine Name:</strong> {order.req_name}
                        </p>
                        <div
                          style={{
                            backgroundColor: "#E6E6E6",
                            padding: "10px",
                            borderRadius: "5px",
                            marginBottom: "10px",
                            fontSize: "0.9rem",
                            maxHeight: "60px",
                            overflowY: "auto"
                          }}
                        >
                          {order.req_description}
                        </div>
                      </div>
                      
                      <div className="d-flex gap-3 mt-auto">
                        <AddBtn
                          onClick={() => handleAccept(order_url, order._id, setOrders)}
                          style={{
                            backgroundColor: "#28c742",
                            width: "50%"
                          }}
                        >
                          Accept
                        </AddBtn>
                        <AddBtn
                          onClick={() => handleReject(order_url, order._id, setOrders)}
                          style={{
                            backgroundColor: "#C7282A",
                            width: "50%"
                          }}
                        >
                          Reject
                        </AddBtn>
                      </div>
                    </Card.Body>
                  </div>
                </div>
              </Card>
            </Col>
          )
        )}
      </Row>
    </Container>
  );
};


