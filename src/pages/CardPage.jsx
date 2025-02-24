
import { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { CardComponent } from "../components/customComponents/CardComponent";
import { useNavigate } from "react-router-dom";
import { useDecoded } from "../customHooks/useDecode";
import { useGet } from "../customHooks/useGet.js";
import { useDelete } from "../customHooks/useDelete";

export const CardPage = () => {
  // const [requestedItems, setRequestedItems] = useState([]);
  const [requests, setRequests] = useState([]);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const decodedToken = useDecoded();
  const req_Url = "http://localhost:7777/request";
  const order_Url = "http://localhost:7777/orders"; // if needed

  // Helper function to fetch requests (or orders)
  const fetchRequests = async (url, setFunction) => {
    try {
      const response = await fetch(`${url}/${decodedToken.id}`);
      console.log(response);
      if (!response.ok) {
        throw new Error(`Server error: ${response.status} - ${response.statusText}`);
      }
      const result = await response.json();
      const data = result.data;
      setFunction(data);
      console.log("Fetched data:", data);
      return data;
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    if (decodedToken) {
      fetchRequests(req_Url, setRequests);
      // If needed, you can fetch orders similarly:
      fetchRequests(order_Url, setOrders);
    }
  }, [decodedToken]);

  // When requests change, augment each item with a requested flag from localStorage.


  const { deleteRequest } = useDelete(req_Url);

  const handleRemove = async (url,del_id,setFunction) => {
    try {
      await deleteRequest(del_id);
      await fetchRequests(url, setFunction);
      console.log("Request deleted successfully");
    } catch (error) {
      console.error("Failed to delete request:", error);
    }
  };

  // Navigation function that passes required state
  const goToRequestMedicine = (name, medicine_id, request_id) => {
    navigate("/RequestMedicine", {
      state: { medicineName: name, medicine_id, request_id, requested: true },
    });
  };

  return (
    <>
      <Row>
        {
          requests.map((item) =>
              <Col key={item._id} xs={12} md={6} lg={5} className="mb-3">
                <CardComponent
                  requested={item.requested}
                  medicine_id={item.medicine._id}
                  examined={item.examined}
                  status={item.status}
                  request_id={item._id}
                  prescription_img={item.prescription_img || ""}
                  image={item.medicine?.image_path || ""}
                  name={item.medicine?.name || "No name"}
                  quantity={item.medicine?.concentration || ""}
                  onRemove={() => handleRemove(req_Url,item._id,setRequests)}
                  goToRequestMedicine={() =>
                    goToRequestMedicine(item.medicine.name, item.medicine._id, item._id)
                  }
                
                />
              </Col>
                )}
      </Row>
              
      <Row>
        {
          orders.map((item) =>
           
              <Col key={item._id} xs={12} md={6} lg={5} className="mb-3">
                <CardComponent
                  examined={item.examined}
                  status={item.status}
                  request_id={item._id}
                  image={item.prescription_img || ""}
                  name={item.req_name || "No name"}
                  onRemove={() => handleRemove(item._id)}                
                  requested={item.requested}
                  />
              
              </Col>
           
          )
       
        }
      </Row>


    </>
  );
};

