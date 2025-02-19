import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import img1 from "../assets/prescription.png";
import { AddBtn } from "../components/customComponents/Addbtn";
import { data } from "react-router-dom";

export const RequestsReview = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:7777/request");
                if (!response.ok) {
                    throw new Error(`Server error: ${response.status} - ${response.statusText}`);
                }

                const result = await response.json();
                console.log(result.data);
                setRequests(result.data);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        fetchData();
    }, []);

    const handleAccept = async (id) => {
      try {
          const response = await fetch(`http://localhost:7777/request/${id}`, {
              method: "PATCH", // Change from POST to PATCH
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ status: true ,examined:true}),
          });
  
          if (!response.ok) {
              throw new Error(`Failed to accept request: ${response.status}`);
          }
  
          // Remove the accepted request from the state
          setRequests((prevRequests) => prevRequests.filter((request) => request._id !== id));
  
      } catch (error) {
          console.error("Error accepting request:", error);
      }
  };
   async function handleReject(id) {
    try {
      const response = await fetch(`http://localhost:7777/request/${id}`, {
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
      setRequests((prevRequests) => prevRequests.filter((request) => request._id !== id));

    } catch (error) {
      console.error("Error rejecting request:", error);
    }

  }
    return (
        <>
            {requests.map((request, index) => (
               request.examined ? null : <div className="row mb-5 mt-3" key={index}>
                    <div className="col-5">
                        <img
                            src={img1}
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
                                    onClick={() => handleAccept(request._id)}
                                    style={{ width: "30%", marginTop: "10px",
                                        backgroundColor: "#28c742",

                                     }}
                                    
                                >
                                    Accept
                                </AddBtn>
                                <AddBtn
                                    onClick={() => handleReject(request._id)}
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
            ))}
        </>
    );
};
