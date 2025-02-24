



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
  const req_url = "http://localhost:7777/request";
  const order_url = "http://localhost:7777/orders";

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
    <>

      {requests && requests.map((request, index) =>
        (request.examined || !request.req_description) ? null : (
          <div className="row mb-5 mt-3" key={index}>
            <div className="col-5">
              <img
                src={request.prescription_img} // Make sure this matches your API data key
                style={{ width: "100%", height: "100%" }}
                alt="prescription"
              />
            </div>

            <div className="col-6 mt-5 ms-2">
              <div>
                <div className="mb-0 mt-5">
                  <h4>Reason</h4>
                  <span><b>Medicine Name:</b></span> <span>{request.req_name}</span>
                  <div
                    style={{
                      backgroundColor: "#E6E6E6",
                      width: "100%",
                      height: "100%",
                      padding: "10px",
                      borderRadius: "5px",
                      marginTop: "10px",
                    }}
                  >
                    {request.req_description}
                  </div>

                  <AddBtn
                    onClick={() => handleAccept(req_url, request._id,setRequests)}
                    style={{
                      width: "30%",
                      marginTop: "10px",
                      backgroundColor: "#28c742",
                    }}
                  >
                    Accept
                  </AddBtn>
                  <AddBtn
                    onClick={() => handleReject(req_url, request._id,setRequests)}
                    style={{
                      backgroundColor: "#C7282A",
                      marginLeft: "10px",
                      width: "30%",
                      marginTop: "10px",
                    }}
                  >
                    Reject
                  </AddBtn>
                </div>
              </div>
            </div>
            <hr className="mt-5" />
          </div>
        )
      )}

      {orders && orders.map((order, index) =>
        order.examined ? null : (
          <div className="row mb-5 mt-3" key={index}>
            <div className="col-5">
              <img
                src={order.prescription_img} // Again, ensure property name is correct
                style={{ width: "100%", height: "100%" }}
                alt="prescription"
              />
            </div>

            <div className="col-6 mt-5 ms-2">
              <div>
                <div className="mb-0 mt-5">
                  <h4>Reason</h4>
                  <span><b>Medicine Name:</b></span> <span>{order.req_name}</span>
                  <div
                    style={{
                      backgroundColor: "#E6E6E6",
                      width: "100%",
                      height: "100%",
                      padding: "10px",
                      borderRadius: "5px",
                      marginTop: "10px",
                    }}
                  >
                    {order.req_description}
                  </div>

                  <AddBtn
                    onClick={() => handleAccept(order_url, order._id, setOrders)}
                    style={{
                      width: "30%",
                      marginTop: "10px",
                      backgroundColor: "#28c742",
                    }}
                  >
                    Accept
                  </AddBtn>
                  <AddBtn
                    onClick={() => handleReject(order_url, order._id, setOrders)}
                    style={{
                      backgroundColor: "#C7282A",
                      marginLeft: "10px",
                      width: "30%",
                      marginTop: "10px",
                    }}
                  >
                    Reject
                  </AddBtn>
                </div>
              </div>
            </div>
            <hr className="mt-5" />
          </div>
        )
      )}
    </>
  );
};


